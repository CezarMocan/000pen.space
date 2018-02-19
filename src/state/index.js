class GlobalState {
  constructor() {
    this._state = {
      editing: false,
      version: 0
    }
    this._editController = null
  }
  registerEditController(e) {
    this._editController = e
  }  
  get isEditing() { return this._state.editing }
  get version() { return this._state.version }
  startEditing() {    
    this._state.editing = true
    this._editController.onStartEditing()
  }
  saveEditing() {
    this._state.editing = false
    this._editController.onDoneEditing()
  }
  cancelEditing() {
    this._state.editing = false
    this._editController.onDoneEditing()
  }
}

export default new GlobalState()