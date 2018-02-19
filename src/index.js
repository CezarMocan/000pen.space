import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

import sketch from './sketch';
import grid from './grid'
import overlay from './overlay'

new p5(grid);
new p5(sketch);
new p5(overlay);

