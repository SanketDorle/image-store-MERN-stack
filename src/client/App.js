import React, { Component } from 'react';
import './app.css';
import {
	Row, Col,
	Button
} from 'reactstrap';
import Dropzone from 'react-dropzone';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
		super(props);
    this.state = { 
      imagesList : [],
      uploadError : [],
     };
    this.uploadAttachments = this.uploadAttachments.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount() {
    this.getAllImage();
      
  }

  getAllImage(){
    axios.get(`/get-all-images`)
    .then(res => {
      console.log(res);
      var sortData = this.sortByIndex(res.data.data);
      this.setState({ imagesList: sortData })
    })
  }

  uploadAttachments(files){
    var docList = this.state.toUplodDocuments;
    var uploadError = this.state.uploadError;

		files.forEach((file)=>{
      if(file.type == "image/png" || file.type == "image/jpeg"){
        const reader = new FileReader();
        
        reader.onload = (event) => {
          this.uploadImages({
            "imageBase64" : event.target.result,
            "fileType" : file.type
          });
        };

        reader.readAsDataURL(file);
        
      }else{
        toast.error(`Your File ${file.name} is not image, Please upload only PNG,JEPG,JPG file type`);
      }
		})
  }

  uploadImages(file){

    axios.post(`/upload-image`, file)
    .then(res => {
      console.log(res);
      this.getAllImage();
      debugger
    })
  }

  deleteImage(item){
    axios.post(`/delete-image`, {id : item._id})
    .then(res => {
      console.log(res);
      this.getAllImage();
      debugger
    })
  }

  sortByIndex(array) {
		return array.sort(function (a, b) {
			var x = a['uploadedTime']; 
			var y = b['uploadedTime'];
			return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		});	
	}

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    var { imagesList} = this.state;
    return (
      <div>
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <Row>
          <Dropzone onDrop={acceptedFiles => this.uploadAttachments(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className ="drop-zone-section">
                <div {...getRootProps() } className="full-height">
                  <input {...getInputProps() } />
                  <p className="drag-drop-text">Drag 'n' drop some files here, or click here to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </Row>
        <Row align="center" className="image-list-header">Image List</Row>
        <Row>
          {  imagesList.map((image)=>{
            return(
              <Col className="each-image-col">
                <img src={image.imageString} alt="Smiley face" width="150" height="150"/>
                <Button className="delete-button" onClick={()=>this.deleteImage(image)}>Delete</Button>
              </Col>
            )
          })}
        </Row>
      </div>
    );
  }
}
