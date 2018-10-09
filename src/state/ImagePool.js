class ImagePool {
  constructor() {
    this._images = {}
    this._domImages = {}
    this._loading = {}
    this._scrollOffset = { x: -1000000000, y: -1000000000 }
  }

  get loadWindowWidth() {
    return window.innerWidth || 1000
    // return 300
  }

  get loadWindowHeight() {
    return window.innerHeight || 1000
    // return 300
  }

  register(id, imgObject, loadCallback, unloadCallback, p5) {
    if (this._images[id]) return
    this._images[id] = {
      id: id,
      obj: imgObject,
      loadCallback: loadCallback,
      unloadCallback: unloadCallback,
      p5: p5
    }
  }

  load(id) {
    const imgObject = this._images[id]
    if (!imgObject) {
      console.warn('Image ', id, ' not registered!')
      return
    }

    const url = imgObject.obj.url
    const loadCallback = imgObject.loadCallback
    const p5 = imgObject.p5
    if (this._domImages[url]) {
      if (!this._loading[url]) setTimeout(loadCallback, 100)
      return this._domImages[url]
    }

    this._domImages[url] = p5.createImg(url, '', () => {
      delete this._loading[url]
      loadCallback()
    })
    this._domImages[url].hide()
    this._loading[url] = true
    return this._domImages[url]
  }

  unload(id) {
    const imgObject = this._images[id]
    if (!imgObject) {
      console.warn('Image ', id, ' not registered!')
      return
    }

    const url = imgObject.obj.url
    const unloadCallback = imgObject.unloadCallback

    if (this._domImages[url]) {
      this._domImages[url].remove()
      delete this._domImages[url]
      unloadCallback()
    }
  }

  getDomElement(id) {
    const imgObject = this._images[id]
    if (!imgObject) {
      console.warn('Image ', id, ' not registered!')
      return
    }

    return this._domImages[imgObject.obj.url]
  }

  pointInRect(p, r) {
    if (p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) return true
    return false
  }

  updateLoadedImages(newScrollOffset, oldScrollOffset) {
    Object.values(this._images).forEach(i => {
      const isLoaded = i.obj._loaded

      const currIn = this.pointInRect(
        { x: i.obj.x, y: i.obj.y }, 
        { x: newScrollOffset.x - this.loadWindowWidth, 
          y: newScrollOffset.y - this.loadWindowHeight, 
          w: 3 * this.loadWindowWidth,
          h: 3 * this.loadWindowHeight
        })

      if (isLoaded && !currIn) {
        this.unload(i.id)
      } else if (!isLoaded && currIn) {
        this.load(i.id)
      }
    })
  }

  updateScrollPosition(newNegX, newNegY, force) {
    const newX = -newNegX
    const newY = -newNegY
    if (force || Math.abs(newX - this._scrollOffset.x) + Math.abs(newY - this._scrollOffset.y) >= 200) {
      this.updateLoadedImages({ x: newX, y: newY }, { x: this._scrollOffset.x, y: this._scrollOffset.y })
      this._scrollOffset = { x: newX, y: newY }
    } 
  }
}

export default new ImagePool()