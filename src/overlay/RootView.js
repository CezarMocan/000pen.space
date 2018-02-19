import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Logo from './Logo'
import Version from './Version'
import Toolbox from './Toolbox'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.logo = this.addView(new Logo())
    this.version = this.addView(new Version(1))
    this.toolbox = this.addView(new Toolbox())

    console.log(this)
  }
}