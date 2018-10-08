import { canvasSize, grid, buttons } from '../Config'
import View from '../core/View'
import Logo from './Logo'
import Version from './Version'
import Toolbox from './Toolbox'
import State from '../state'
import SaveButton from './menu/SaveButton'
import CancelButton from './menu/CancelButton'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()
    this.root = phalanxRoot
    // this.logo = this.addView(new Logo())
    // this.version = this.addView(new Version(State.version))
    // this.toolbox = this.addView(new Toolbox())

    // const btnY = window.innerHeight - (buttons.height + 1) * grid.pointDistance 
    // const btnRightX = window.innerWidth - (buttons.width + 1) * grid.pointDistance
    // const btnLeftX = btnRightX - (buttons.width + 1) * grid.pointDistance
    // this.saveButton = this.addView(new SaveButton(btnLeftX, btnY))
    // this.cancelButton = this.addView(new CancelButton(btnRightX, btnY))

    // this.hideButtons()
  }
  showButtons() {
    this.saveButton.disabled = this.cancelButton.disabled = false
  }
  hideButtons() {
    this.saveButton.disabled = this.cancelButton.disabled = true
  }
  pointInMenu(x, y) { return this.toolbox.pointInView(x, y) || this.saveButton.pointInView(x, y) || this.cancelButton.pointInView(x, y) }
  
  setVersion(version) { 
    this.version.versionNumber = version 
    this.p5.redraw()
  }
}