import { canvasSize, grid } from '../../Config'
import Button from '../../core/Button'
import State from '../../state'

export default class CancelButton extends Button {
  constructor(x, y, text) {
    super(x, y, 'cancel')
  }
  onClick() {
    console.log('Cancelling...')
    State.cancelEditing()
  }
}