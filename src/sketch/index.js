import MainController from './MainController'
import State from '../state'

export default function sketch(s) {
  MainController.p5 = s
  MainController.start()
  State.registerMainController(MainController)
}
