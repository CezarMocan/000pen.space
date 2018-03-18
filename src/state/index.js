const EDITING_MODES = {
  LINE: 'LINE',
  BOX: 'BOX',
  MOVE: 'MOVE',
  REMOVE: 'REMOVE',
  IMAGE: 'IMAGE',
  TEXT: 'TEXT'
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
  get isRemoveEditingMode() { return this._state.editingMode === this.EDITING_MODES.REMOVE }
  get isImageEditingMode() { return this._state.editingMode === this.EDITING_MODES.IMAGE }
  get isTextEditingMode() { return this._state.editingMode === this.EDITING_MODES.TEXT }

  pointInMenu(x, y) { return this._menuController.pointInMenu(x, y) }
  
  startEditing(editingMode) {
    if (!this._state.editing) {
      this._state.editing = true
      this._state.editingMode = editingMode

      this._editController.onStartEditing()
      this._menuController.onStartEditing()

      this.currentContents = this._mainController.getAndClearContents()
      this._editController.setContents(this.currentContents.childrenToEdit)
      this._mainController.redraw()
    } else {
      console.log('change editing mode')
      this._state.editingMode = editingMode
      this._menuController.redraw()
    }
  }
  saveEditing() {
    const contentView = this._editController.getContents()
    this._state.editing = false
    this._state.editingMode = null    
    this._mainController.setContents(contentView.children)
    this._mainController.onDoneEditing()
    this._editController.onDoneEditing()
    this._menuController.onDoneEditing()

    // Remove old views that were stored in case the user tapped cancel
    delete this.currentContents.oldChildren
  }
  cancelEditing() {
    this._state.editing = false
    this._state.editingMode = null
    this._mainController.setContents(this.currentContents.oldChildren)
    this._mainController.onDoneEditing()
    this._editController.onDoneEditing()
    this._menuController.onDoneEditing()

    // Remove newly created children
    delete this.currentContents.childrenToEdit
  }
}

export default new GlobalState()