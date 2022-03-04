'use strict'
var Vimeo = require('vimeo').Vimeo; //npm install vimeo


try { // Load credentials
    var config = require('./config.json')
} catch (error) {
    console.error('Credentials not found')
}

//Vimeo client to upload content
var client = new Vimeo(config.client_id, config.client_secret, config.access_token)

//Min params to upload a videods
var params = {
    'name': 'Test video',
    'description': "Video for testing vimeo upload"
}

var finalUri = ''
client.upload(
    config.filePath/*Full path to video file*/,
    params,
    function (uri) {// Whet the upload is completed, return video uri (This can be saved into training-database)
        finalUri = uri
        console.log('Video URI: ' + finalUri);
    },
    function (bytes_uploaded, bytes_total) {// While the video is uplading, for render process
        var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
        console.log(bytes_uploaded, bytes_total, percentage + '%')
    },
    function (error) {// In case of failure
        console.log('Failed because: ' + error)
    }
)