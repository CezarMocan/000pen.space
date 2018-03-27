import config from './config.json'

class Api {
  constructor() {
    this.apiServer = config.API_SERVER
    console.log('API server is: ', this.apiServer)
  }
  save(data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.apiServer}/new`, true);
    xhr.setRequestHeader('Content-Type', 'application/json')

    console.log(xhr)

    xhr.onreadystatechange = function(e) {
      // console.log(e)
    }

    xhr.onload = function(e) {
      console.log(JSON.parse(xhr.response))
    }

    // xhr.onload = success
    // xhr.onerror = error
    // xhr.onabort = error
    // xhr.addEventListener('progress', (evt) => {
    //   console.log('Progress: ', evt)
    // })

    console.log('Sending http request: ', JSON.stringify(data))

    xhr.send(JSON.stringify({ versionData: data }))
  }
  getLatest(success, error) {

  }
  getVersion(versionId, success, error) {

  }
}

export default new Api()