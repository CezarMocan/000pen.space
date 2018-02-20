const EDITING_MODES = {
  LINE: 'LINE'
}

class GlobalState {
  constructor() {
    this._state = {
      editing: false,
      editingMode: null,
      version: 0
    }
    this._editController = null
  }
  registerEditController(e) {
    this._editController = e
  }
  get version() { return this._state.version }
  get isEditing() { return this._state.editing }
  get EDITING_MODES() {
    return EDITING_MODES
  }
  get isLineEditingMode() { return this._state.editingMode === this.EDITING_MODES.LINE }

  
  startEditing(editingMode) {
    if (!this._state.editing) {
      this._state.editing = true
      this._editController.onStartEditing()
    }
    this._state.editingMode = editingMode
  }
  saveEditing() {
    this._state.editing = false
    this._state.editingMode = null
    this._editController.onDoneEditing()
  }
  cancelEditing() {
    this._state.editing = false
    this._state.editingMode = null
    this._editController.onDoneEditing()
  }
}

export default new GlobalState()