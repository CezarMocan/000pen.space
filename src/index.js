import 'babel-polyfill'
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import Navigo from 'navigo'

import sketch from './sketch';
import edit from './edit'
import grid from './grid'
import overlay from './overlay'

import State from './state'
import api from './api/api.js'

new p5(grid, 'grid');
new p5(sketch, 'content');
new p5(edit, 'edit');
new p5(overlay, 'overlay');

const router = new Navigo(null, true, '#');

router.on('/', async () => {
  const latestVersion = await api.getLatest()
  State.setContents(latestVersion)
}).resolve()

router.on('/version/:id', (params) => {
  console.log('version route: ', params)
}).resolve()