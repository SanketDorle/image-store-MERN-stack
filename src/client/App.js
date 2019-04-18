import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
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
      toUplodDocuments : [],
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
      this.setState({ imagesList: res.data.data })
    })
  }

  uploadAttachments(files){
    var docList = this.state.toUplodDocuments;
    var uploadError = this.state.uploadError;

		files.forEach((file)=>{
      if(file.type == "image/png" || file.type == "image/jpeg"){
        const reader = new FileReader();
        
        reader.onload = (event) => {
          docList.push({
            "imageBase64" : event.target.result,
            "fileType" : file.type
          });
        };

        reader.readAsDataURL(file);
        
      }else{
        toast.error(`Your File ${file.name} is not image, Please upload only PNG,JEPG,JPG file type`);
      }
		})
    this.setState({
      toUplodDocuments : docList,
    })
  }

  uploadImages(files){
    var toUplodDocuments = this.state.toUplodDocuments;

    axios.post(`/upload-image`, {imageData : toUplodDocuments})
    .then(res => {
      console.log(res);
      this.getAllImage();
      this.setState({ toUplodDocuments: [] })
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

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    var {toUplodDocuments, imagesList} = this.state;
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
          <Row>
            {  toUplodDocuments.map((image)=>{
              <Col className="col-4">
                <img src={image.imageBase64} alt="Smiley face" width="100" height="100"/>
              </Col>
            })}
          </Row>
          <Row>
            <Col>
              <Button onClick={this.uploadImages}>Upload</Button>
            </Col>
          </Row>
        </Row>
        <Row align="center">Image List</Row>
        <Row>
          {  imagesList.map((image)=>{
            <Col className="col-4">
              <img src={image.imageString} alt="Smiley face" width="100" height="100"/>
              <Button onClick={()=>this.deleteImage(image)}>Delete</Button>
            </Col>
          })}
        </Row>
      </div>
    );
  }
}
