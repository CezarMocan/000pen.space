import pify from 'pify'
import config from './config.json'

const xhrGet = (url, contentType, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('Content-Type', contentType)

  xhr.onload = () => { callback(null, JSON.parse(xhr.response)) }
  xhr.onerror = () => { callback(xhr.response) }
  xhr.onabort = () => { callback(xhr.response) }

  xhr.send()
}

const xhrPost = (url, contentType, data, success, error) => {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', contentType)

  xhr.onload = () => { success(JSON.parse(xhr.response)) }
  xhr.onerror = () => { error(xhr.response) }
  xhr.onabort = () => { error(xhr.response) }

  xhr.send(data)  
}

class Api {
  constructor() {
    this.apiServer = config.API_SERVER
    console.log('API server is: ', this.apiServer)
  }

  save(data, success, error) {
    const endpoint = `${this.apiServer}/new`
    const contentType = 'application/json'
    const postData = JSON.stringify({ versionData: data })

    xhrPost(endpoint, contentType, postData, success, error)
  }

  async getLatest() {
    const endpoint = `${this.apiServer}/version/latest`
    const contentType = 'application/json'

    const latest = await pify(xhrGet)(endpoint, contentType)

    return latest
  }

  async getVersion(versionId, success, error) {
    const endpoint = `${this.apiServer}/version/${versionId}`
    const contentType = 'application/json'

    const version = await pify(xhrGet)(endpoint, contentType)

    return version
  }
}

export default new Api()