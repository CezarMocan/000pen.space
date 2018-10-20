import './main.css'

import 'babel-polyfill'
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

import MainController from './sketch/MainController';
import EditController from './edit/EditController'
import GridController from './grid/GridController'
import OverlayController from './overlay/OverlayController'

import State from './state'
import api from './api/api.js'
import Menu, { setIsLatestVersion, disableOverlays } from './menu.js'
import router from './router.js'

let noP5Initialized = 0
const noP5Total = 4

const sleep = async (ms) => { return new Promise((resolve, reject) => setTimeout(() => resolve(), ms)) }

const onP5Initialized = () => {
   noP5Initialized++
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
// TOOD (remove this.)
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
const LATEST = 'latest'

router.on('/', async () => {
  await waitForInit
  router.navigate(`/version/${LATEST}/x/0/y/0`)
  // const latestVersion = await api.getLatest()
  // router.navigate(`/version/${latestVersion.version}/x/0/y/0`)
}).resolve()

router.on('/version/:id', async (params) => {
  await waitForInit
  router.navigate(`/version/${params.id}/x/0/y/0`)
}).resolve()

router.on('/x/:x/y/:y', async (params) => {
  await waitForInit
  router.navigate(`/version/${LATEST}/x/${params.x}/y/${params.y}`)
}).resolve()

router.on('/version/:id/x/:x/y/:y', async (params) => {
  await waitForInit
  console.log(window.history)
  // window.history.deleteAll()
  disableOverlays()
  const latestVersion = await api.getLatest()
  console.log(latestVersion)
  let version
  if (params.id == LATEST) {
    version = latestVersion
  } else {
    version = await api.getVersion(params.id)
  }

  State.setContents(version)
  State.setInitialScroll(parseInt(params.x), parseInt(params.y))

  // TOOD (cezar): Any race conditions here?
  setIsLatestVersion(version.version == latestVersion.version)

  router.pause(true)
  router.navigate('/')
  await sleep(250)
  router.pause(false)
}).resolve()