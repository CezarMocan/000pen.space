const EDITING_MODES = {
  LINE: 'LINE',
  BOX: 'BOX',
  MOVE: 'MOVE'
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
  get isBoxEditingMode() { return this._state.editingMode === this.EDITING_MODES.BOX }
  get isMoveEditingMode() { return this._state.editingMode === this.EDITING_MODES.MOVE }

  pointInMenu(x, y) { return this._menuController.pointInMenu(x, y) }
  
  startEditing(editingMode) {
    if (!this._state.editing) {
      this._state.editing = true
      this._state.editingMode = editingMode

      this._editController.onStartEditing()
      this._menuController.onStartEditing()

      this.currentContents = this._mainController.getAndClearContents()
      console.log('Start editing: ', this.currentContents)
      this._editController.setContents(this.currentContents)
      // console.log(this._mainController.getContents())
    } else {
      this._state.editingMode = editingMode
    }
  }
  saveEditing() {
    const contentView = this._editController.getContents()
    this._state.editing = false
    this._state.editingMode = null
    console.log('save editing: ', contentView.children)
    this._mainController.setContents(contentView.children)
    this._mainController.onDoneEditing()
    this._editController.onDoneEditing()
    this._menuController.onDoneEditing()
  }
  cancelEditing() {
    this._state.editing = false
    this._state.editingMode = null
    this._mainController.setContents(this.currentContents)
    this._editController.onDoneEditing()
    this._menuController.onDoneEditing()
  }
}

export default new GlobalState()