var axios = require('axios');

try { // Load credentials
    var config = require('./config.json')
} catch (error) {
    console.error('Credentials not found')
}

const headers = {
    'Authorization': 'bearer ' + config.access_token,
    'Content-Type': 'application/json',
    'Acept': 'application/vnd.vimeo.*+json;version=3.4'
}

const data = {
    "upload": {
        "approach": "tus",
        "size": "1055736"
    }
}

axios.post('https://api.vimeo.com/me/videos', data, {
    headers: headers
})
    .then(upload(response))
    .catch((error) => {
        console.error(error)
    })

function upload(response) {
    console.log(response)
    // To upload thye video file
}