// Dependencies
const express = require('express');
const router = express.Router();

// Models
var imageStorage = require('../models/schema');

//Routes

router.get('/get-all-images', function (req, res) {
    imageStorage.find({}, function(err, result){
        if(err){
            res.send({
                "success": false,
                "error":err
            });
        }else{
            res.send({
                "success": true,
                "data": result
            });
        }
    })
})

router.post('/upload-image', function (req, res) {
    var date = new Date();
    var currentTimeStamp = date.getTime();
    var data ={
        imageString: req.body.imageBase64,
        uploadedTime : currentTimeStamp,
    }
    if(req.body.fileType == "image/png" || req.body.fileType == "image/jpeg"){
        imageStorage.create(data, function(err,succ){
            if(err){
                res.send({
                    "success": false,
                    "error":"Failed uploading image"
                });
            }else{
                res.send({
                    "success": true,
                    "message":"Image uploaded successfully"
                });
            }
        })
    }else{
        res.send({
            "success": false,
            "error":"Invalid file type, Please upload only PNG,JEPG,JPG file type"
        });
    }
})
	
router.post('/delete-image',(req,res)=>{
    var id = req.body.id;
    imageStorage.findOne({_id:id},function(err,imageData){
        if(imageData){
            imageData.remove(function(err, result) {
                if(err){
                    res.send({
                        "success": false,
                        "error": err.message
                    });
                }else{
                    res.json({
                        success: true,
                        _id: imageData._id,
                        message: 'Delete Image Successfully' 
                    });
                }
            });
        }else{
            res.send({
                "success": false,
                "error":"Invalid image id"
            });
        }
    })
});

// Return router
module.exports = router;