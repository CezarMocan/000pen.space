export const setCoordinates = (x, y) => {

}

export const setVersionNumber = (version) => {

}

const onVersionHistoryTap = (evt) => {
  console.log('onVersionHistoryTap', evt)
}

const onAboutTap = (evt) => {

}

const onShareScreenTap = (evt) => {

}

const onCancelTap = (evt) => {

}

const onSaveTap = (evt) => {

}

const onTextTap = (evt) => {

}

const onLargeTextTap = (evt) => {

}

const onImageTap = (evt) => {

}

const onBoxTap = (evt) => {

}

const onLineTap = (evt) => {

}

const onMoveTap = (evt) => {

}

const onRemoveTap = (evt) => {

}

const setupListeners = () => {
  $(document).ready(() => {
    $("#version-history").click(onVersionHistoryTap)
    $("#about-this-website").click(onAboutTap)
    $("#share-screen").click(onShareScreenTap)
    $("#cancel-button").click(onCancelTap)
    $("#save-button").click(onSaveTap)
    $("#text-button").click(onTextTap)
    $("#large-text-button").click(onLargeTextTap)
    $("#image-button").click(onImageTap)
    $("#box-button").click(onBoxTap)
    $("#line-button").click(onLineTap)
    $("#move-button").click(onMoveTap)
    $("#remove-button").click(onRemoveTap)
  })
}

setupListeners()
