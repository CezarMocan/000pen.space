import { canvasSize, grid } from '../../Config'
import Button from '../../core/Button'
import State from '../../state'

export default class SaveButton extends Button {
  constructor(x, y, text) {
    super(x, y, 'save')
  }
  onClick() {
    console.log('Saving...')
    State.saveEditing()
  }
}