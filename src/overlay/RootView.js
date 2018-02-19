import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Logo from './Logo'
import Version from './Version'
import Toolbox from './Toolbox'
import State from '../state'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.logo = this.addView(new Logo())
    this.version = this.addView(new Version(State.version))
    this.toolbox = this.addView(new Toolbox())
  }
}