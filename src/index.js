import 'babel-polyfill'
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import Navigo from 'navigo'

import MainController from './sketch/MainController';
import EditController from './edit/EditController'
import GridController from './grid/GridController'
import OverlayController from './overlay/OverlayController'

import State from './state'
import api from './api/api.js'

let noP5Initialized = 0
const noP5Total = 4

const onP5Initialized = () => {
   noP5Initialized++
   console.log('onSetupDone')  
}

// Create p5 canvas for grid
new p5((s) => {
  GridController.p5 = s
  GridController.onSetupDone = onP5Initialized
  GridController.start()
  State.registerGridController(GridController)
}, 'grid')

// Create p5 for main canvas
new p5((s) => {
  MainController.p5 = s
  MainController.onSetupDone = onP5Initialized
  MainController.start()
  State.registerMainController(MainController)
}, 'content')

// Create p5 for editing canvas
new p5((s) => {
  EditController.p5 = s
  EditController.onSetupDone = onP5Initialized
  EditController.start()
  State.registerEditController(EditController)
}, 'edit')

// Create p5 for overlay canvas (version number, toolbox)
new p5((s) => {
  OverlayController.p5 = s
  OverlayController.onSetupDone = onP5Initialized
  OverlayController.start()
  State.registerMenuController(OverlayController)
}, 'overlay')


const pollInitialized = (resolve, reject) => {
  if (noP5Initialized == noP5Total) {
    resolve()
    return
  } else {
    setTimeout(() => { pollInitialized(resolve, reject) }, 250)
  }
}

const waitForInit = new Promise(pollInitialized)

const router = new Navigo(null, true, '#');

router.on('/', async () => {
  await waitForInit
  const latestVersion = await api.getLatest()
  State.setContents(latestVersion)
}).resolve()

router.on('/version/:id', async (params) => {
  await waitForInit
  const version = await api.getVersion(params.id)
  State.setContents(version)
}).resolve()