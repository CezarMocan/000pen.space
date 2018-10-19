import State from './state'
import { copyToClipboard, isMobile, sleep } from './utils'

const BUTTONS = {
  VERSION_HISTORY: "#version-history",
  ABOUT_THIS_WEBSITE: "#about-this-website",
  SHARE_SCREEN: "#share-screen",
  CANCEL_BUTTON: "#cancel-button",
  SAVE_BUTTON: "#save-button",
  TEXT_BUTTON: "#text-button",
  IMAGE_BUTTON: "#image-button",
  BOX_BUTTON: "#box-button",
  LINE_BUTTON: "#line-button",
  MOVE_BUTTON: "#move-button",
  REMOVE_BUTTON: "#remove-button",
  VERSION_WARNING_BUTTON: "#editing-disabled"
}

const OVERLAYS = {
  MOBILE: "#mobile-window-overlay",
  VERSIONS: "#versions-window-overlay",
  ABOUT: "#about-window-overlay",
  VERSIONS_CLOSE: "#versions-window-overlay-close",
  ABOUT_CLOSE: "#about-window-overlay-close"
}

const HIGHLIGHT_BUTTONS = [BUTTONS.TEXT_BUTTON, BUTTONS.IMAGE_BUTTON, BUTTONS.BOX_BUTTON, BUTTONS.LINE_BUTTON, BUTTONS.MOVE_BUTTON, BUTTONS.REMOVE_BUTTON]
const STATE_CONTROL_BUTTONS = [BUTTONS.SAVE_BUTTON, BUTTONS.CANCEL_BUTTON]

let isLatestVersion = true

export const setCoordinates = (x, y) => {
  const elX = $('#x-coord')
  const elY = $('#y-coord')
  if (!elX || !elY) return
  elX.html(`${-x},`)
  elY.html(-y)
}

export const setVersionNumber = (version) => {
  const elVersion = $('#current-version')
  if (!elVersion) return
  elVersion.html(version)
}

export const setDateAndTime = () => {
  const date = new Date()
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' }
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  const formattedDate = date.toLocaleDateString("en-US", optionsDate)
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime)
  const elDate = $('#formatted-date')
  const elTime = $('#formatted-time')

  elDate.html(formattedDate)
  elTime.html(formattedTime)
}

export const setIsLatestVersion = (isLatest) => {
  isLatestVersion = isLatest
  updateIsLatestVersion()
}

const updateIsLatestVersion = () => {
  if (isLatestVersion) {
    HIGHLIGHT_BUTTONS.forEach(b => $(b).removeClass('disabled'))
    $(BUTTONS.VERSION_WARNING_BUTTON).addClass('disabled')
  } else {
    HIGHLIGHT_BUTTONS.forEach(b => $(b).addClass('disabled'))
    $(BUTTONS.VERSION_WARNING_BUTTON).removeClass('disabled')
  }
} 

const setupDateAndTime = () => {
  setDateAndTime()
  setInterval(setDateAndTime, 1000)
}

const onShareScreenTap = (evt) => {
  const url = State.getCurrentURL()
  copyToClipboard(url)
  alert(`Your URL (${url}) has been copied to clipboard!`)
}

const showStateControlButtons = () => {
  STATE_CONTROL_BUTTONS.forEach(b => $(b).removeClass('hidden'))
}

const hideStateControlButtons = () => {
  STATE_CONTROL_BUTTONS.forEach(b => $(b).addClass('hidden'))
}

const removeAllHighlight = () => {
  HIGHLIGHT_BUTTONS.forEach(b => $(b).removeClass('highlight'))
}

const onCancelTap = (evt) => {
  State.cancelEditing()
  removeAllHighlight()
  hideStateControlButtons()
}

const onSaveTap = (evt) => {
  State.saveEditing()
  removeAllHighlight()
  hideStateControlButtons()
}

const onTextTap = (evt) => {
  State.startEditing(State.EDITING_MODES.TEXT)
  removeAllHighlight()
  $(BUTTONS.TEXT_BUTTON).addClass('highlight')
  showStateControlButtons()
}

const onImageTap = (evt) => {
  State.startEditing(State.EDITING_MODES.IMAGE)
  removeAllHighlight()
  $(BUTTONS.IMAGE_BUTTON).addClass('highlight')
  showStateControlButtons()
}

const onBoxTap = (evt) => {
  State.startEditing(State.EDITING_MODES.BOX)
  removeAllHighlight()
  $(BUTTONS.BOX_BUTTON).addClass('highlight')
  showStateControlButtons()
}

const onLineTap = (evt) => {
  State.startEditing(State.EDITING_MODES.LINE)
  removeAllHighlight()
  $(BUTTONS.LINE_BUTTON).addClass('highlight')
  showStateControlButtons()
}

const onMoveTap = (evt) => {
  State.startEditing(State.EDITING_MODES.MOVE)
  removeAllHighlight()
  $(BUTTONS.MOVE_BUTTON).addClass('highlight')
  showStateControlButtons()
}

const onRemoveTap = (evt) => {
  State.startEditing(State.EDITING_MODES.REMOVE)
  removeAllHighlight()
  $(BUTTONS.REMOVE_BUTTON).addClass('highlight')
  showStateControlButtons()
}

const onVersionWarningTap = (evt) => {
  State.navigateLatestWithPosition()
}

const onVersionHistoryTap = async (evt) => {
  $(OVERLAYS.VERSIONS).removeClass('disabled')
  await sleep(50)
  $(OVERLAYS.VERSIONS).addClass('animated-visible')
}

const onVersionsWindowClose = async (evt) => {
  $(OVERLAYS.VERSIONS).removeClass('animated-visible')
  await sleep(200)
  $(OVERLAYS.VERSIONS).addClass('disabled')
}

const onAboutTap = async (evt) => {
  $(OVERLAYS.ABOUT).removeClass('disabled')
  await sleep(50)
  $(OVERLAYS.ABOUT).addClass('animated-visible')
}

const onAboutWindowClose = async (evt) => {
  $(OVERLAYS.ABOUT).removeClass('animated-visible')
  await sleep(200)
  $(OVERLAYS.ABOUT).addClass('disabled')
}

const setupListeners = () => {
  $(document).ready(() => {
    if (isMobile()) {
      $(OVERLAYS.MOBILE).removeClass('disabled')
    }
    $(BUTTONS.VERSION_HISTORY).click(onVersionHistoryTap)
    $(BUTTONS.ABOUT_THIS_WEBSITE).click(onAboutTap)
    $(BUTTONS.SHARE_SCREEN).click(onShareScreenTap)
    $(BUTTONS.CANCEL_BUTTON).click(onCancelTap)
    $(BUTTONS.SAVE_BUTTON).click(onSaveTap)
    $(BUTTONS.TEXT_BUTTON).click(onTextTap)
    $(BUTTONS.IMAGE_BUTTON).click(onImageTap)
    $(BUTTONS.BOX_BUTTON).click(onBoxTap)
    $(BUTTONS.LINE_BUTTON).click(onLineTap)
    $(BUTTONS.MOVE_BUTTON).click(onMoveTap)
    $(BUTTONS.REMOVE_BUTTON).click(onRemoveTap)
    $(BUTTONS.VERSION_WARNING_BUTTON).click(onVersionWarningTap)
    $(OVERLAYS.ABOUT_CLOSE).click(onAboutWindowClose)
    $(OVERLAYS.VERSIONS_CLOSE).click(onVersionsWindowClose)
    setupDateAndTime()
    updateIsLatestVersion()
  })
}

setupListeners()
