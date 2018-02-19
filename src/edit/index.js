import EditController from './EditController'
import State from '../state'

export default function edit(s) {
  EditController.p5 = s
  EditController.start()
  State.registerEditController(EditController)
}