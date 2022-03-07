var axios = require("axios");
var fs = require("fs");

try {
  // Load credentials
  var config = require("./config.json");
} catch (error) {
  console.error("Credentials not found");
}

config["Upload-Offset"];
var path = config.filePath;
var file = fs.createReadStream(path);
var size = fs.statSync(path).size;

const headers = {
  Authorization: "bearer " + config.access_token,
  "Content-Type": "application/json",
  Acept: "application/vnd.vimeo.*+json;version=3.4",
};

const data = {
  upload: {
    approach: "tus",
    size: size,
  },
};

axios
  .post("https://api.vimeo.com/me/videos", data, {
    headers: headers,
  })
  .then((response) => {
    upload(response.data.upload.upload_link, 0);
  })
  .catch((error) => {
    console.error(error);
  });

function upload(upload_link, point) {
  axios
    .patch(upload_link, file, {
      headers: {
        "Tus-Resumable": "1.0.0",
        "Upload-Offset": point,
        "Content-Type": "application/offset+octet-stream",
        Acept: "application/vnd.vimeo.*+json;version=3.4",
      },
    })
    .then((response) => {
      var partialUpload = Number(response.headers["upload-offset"]);

      if (partialUpload != size) {
        upload(upload_link, partialUpload);
      } else {
        console.info("Upload success");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
