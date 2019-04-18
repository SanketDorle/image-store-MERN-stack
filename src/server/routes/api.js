// Dependencies
const express = require('express');
const router = express.Router();

// Models
var imageStorage = require('../models/schema');

//Routes

router.get('/get-all-images', function (req, res) {
    imageStorage.find({}, function (err, result) {
        if (err) {
            res.send({
                "success": false,
                "error": err
            });
        } else {
            res.send({
                "success": true,
                "data": result
            });
        }
    })
})

// function decodeBase64Image(dataString) {
//     var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//     var response = {};

//     if (matches.length !== 3) {
//         return new Error('Invalid input string');
//     }

//     response.type = matches[1];
//     response.data = new Buffer(matches[2], 'base64');

//     return response;
// }

router.post('/upload-image', function (req, res) {
    var date = new Date();
    

    /* store image file in system or server*/

    // // Regular expression for image type:
    // // This regular image extracts the "jpeg" from "image/jpeg"
    // var imageTypeRegularExpression = /\/(.*?)$/;

    // // Generate random string
    // var crypto = require('crypto');
    // var seed = crypto.randomBytes(20);
    // var uniqueSHA1String = crypto
    //     .createHash('sha1')
    //     .update(seed)
    //     .digest('hex');

    // var base64Data = req.body.imageBase64;

    // var imageBuffer = decodeBase64Image(base64Data);
    // var userUploadedFeedMessagesLocation = './public/img/upload/';

    // var uniqueRandomImageName = 'image-' + uniqueSHA1String;
    // // This variable is actually an array which has 5 values,
    // // The [1] value is the real image extension
    // var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

    // var userUploadedImagePath = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];

    // // Save decoded binary image to disk

    // require('fs').writeFile(userUploadedImagePath, imageBuffer.data,function (err,succ) {
    //         console.log(err);
    //         console.log(succ);
    //         console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
    
    
        var currentTimeStamp = date.getTime();
        var data = {
            imageString: req.body.imageBase64,    // store base64 in database
            // imageString: userUploadedImagePath,  // store file path in database
            uploadedTime: currentTimeStamp,
        }

        if (req.body.fileType == "image/png" || req.body.fileType == "image/jpeg") {
            imageStorage.create(data, function (err, succ) {
                if (err) {
                    res.send({
                        "success": false,
                        "error": "Failed uploading image"
                    });
                } else {
                    res.send({
                        "success": true,
                        "message": "Image uploaded successfully"
                    });
                }
            })
        } else {
            res.send({
                "success": false,
                "error": "Invalid file type, Please upload only PNG,JEPG,JPG file type"
            });
        }
    // });
})

router.post('/delete-image', (req, res) => {
    var id = req.body.id;
    imageStorage.findOne({ _id: id }, function (err, imageData) {
        if (imageData) {
            imageData.remove(function (err, result) {
                if (err) {
                    res.send({
                        "success": false,
                        "error": err.message
                    });
                } else {
                    res.json({
                        success: true,
                        _id: imageData._id,
                        message: 'Delete Image Successfully'
                    });
                }
            });
        } else {
            res.send({
                "success": false,
                "error": "Invalid image id"
            });
        }
    })
});

// Return router
module.exports = router;