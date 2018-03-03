import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

import sketch from './sketch';
import edit from './edit'
import grid from './grid'
import overlay from './overlay'

new p5(grid, 'grid');
new p5(sketch, 'content');
new p5(edit, 'edit');
new p5(overlay, 'overlay');

