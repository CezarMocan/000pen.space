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
  registerEditController(c) {
    this._editController = c
  }
  registerMenuController(c) {
    this._menuController = c
  }
  registerMainController(c) {
    this._mainController = c
  }
  get version() { return this._state.version }
  get EDITING_MODES() {
    return EDITING_MODES
  }
  get isEditing() { return this._state.editing }
  get isLineEditingMode() { return this._state.editingMode === this.EDITING_MODES.LINE }

  
  startEditing(editingMode) {
    if (!this._state.editing) {
      this._state.editing = true
      this._state.editingMode = editingMode
      this._editController.onStartEditing()
      this._menuController.onStartEditing()
    } else {
      this._state.editingMode = editingMode
    }
  }
  saveEditing() {
    const contentView = this._editController.getContents()
    this._state.editing = false
    this._state.editingMode = null
    this._mainController.addContents(contentView)
    this._mainController.onDoneEditing()
    this._editController.onDoneEditing()
    this._menuController.onDoneEditing()
  }
  cancelEditing() {
    this._state.editing = false
    this._state.editingMode = null
    this._editController.onDoneEditing()
    this._menuController.onDoneEditing()
  }
}

export default new GlobalState()