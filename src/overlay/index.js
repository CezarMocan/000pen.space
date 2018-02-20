import OverlayController from './OverlayController'
import State from '../state'

export default function overlay(s) {
  OverlayController.p5 = s
  OverlayController.start()
  State.registerMenuController(OverlayController)
}