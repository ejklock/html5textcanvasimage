import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import{FacebookShareButton,FacebookIcon,WhatsappIcon,WhatsappShareButton,TwitterIcon,TwitterShareButton} from 'react-share'
import getImage from './Components/Images'
import './assets/css/app.css';
import saveAs from 'file-saver'
import CanvasComponent from './Components/CanvasComponent';
library.add(faDownload)
class App extends Component {
  constructor(props) {
    try {
      var isFileSaverSupported = !!new Blob;
  } catch (e) {
    console.log(e)
    require('../src/assets/js/blob')
  }
    super(props);
    this.state = { value: '', dataURL:'', name:'',image:getImage('img1'), 
                shareUrl:"http://yourshareurl.com",
                shareText:"Your share text",
                hashTag:[ '#your', '#share', '#tag'],
                blob:''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleDataURLChange = this.handleDataURLChange.bind(this)
    this.handleImageChange=this.handleImageChange.bind(this)
    this.downloadImg=this.downloadImg.bind(this)   
    
  }

  convertBase64ToFile(image){
    const byteString = atob(image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    const newBlob = new Blob([ab], {type: 'image/png'});
    
    return newBlob;
  }
  
  downloadImg(event){
    
    saveAs(this.state.blob,`canvas-image-text-${this.state.name}.png`,true)
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleImageChange(event){
  this.setState({image:getImage(event.target.value)})
  }

  handleDataURLChange(dataURL, name) {
    this.setState({ dataURL, name, blob: this.convertBase64ToFile(dataURL)})
  }

  render() {
    return (
      <div className="mt-5">
        <div className="row">
          <div className="col-md-4">
            <CanvasComponent text={this.state.value} onImageChange={this.handleImageChange}  onDataURLChange={this.handleDataURLChange} image={this.state.image} dataURL={this.state.dataURL}/>
          </div>
          <div className="col-md-8">
            <div className="jumbotron">
              <h1 className="display-4 text-center">HTML CANVAS IMAGE TEXT GENERATOR</h1>
              <p className="lead">Enter your name to appear in the image beside</p>
              <p className="lead">1 - Your Name.</p>
              <div className="form-group">
                <input type="text" placeholder="Ex: João da Silva" className="form-control" onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <p className="lead mt-3">2 - Type of Image:</p>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked={this.state.image===getImage('img1')} onChange={this.handleImageChange} value="img1"/>
                <label className="form-check-label" htmlFor="inlineRadio1">Image 1</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" checked={this.state.image===getImage('img2')} onChange={this.handleImageChange} value="img2"/>
                <label className="form-check-label" htmlFor="inlineRadio2">Image 2</label>
                </div>
              </div>
                  <p className="lead">3 - Download Image</p>
              
                  <div className="justify-content-center text-center">
                      <a title="Baixar Imagem"className="text-center" href="javascript:void(0)" rel="noopener noreferrer" target="_blank" id="download" onClick={this.downloadImg}>
                          <FontAwesomeIcon size="3x" icon="download" />
                      </a>
                  </div>
                  <p className="lead mt-2">4 - Share image on social medias</p>
                  <div className="d-flex flex-row bd-highlight justify-content-center m-5">
                    <div className="p-2 bd-highlight">
                        <FacebookShareButton url={this.state.shareUrl} quote={this.state.shareText} hashtag='#your #text #tag'>
                          <FacebookIcon size={50} round />
                        </FacebookShareButton>
                    </div>
                    <div className="p-2 bd-highlight">
                        <TwitterShareButton url={this.state.shareUrl} title={this.state.shareText} hashtags={this.hashTag}>
                          <TwitterIcon size={50} round />
                        </TwitterShareButton>
                    </div>
                    <div className="p-2 bd-highlight">
                        <WhatsappShareButton url={this.state.shareUrl} title={this.state.shareText} separator=":: " hashtag="#your #text #tag">
                            <WhatsappIcon size={50} round/>
                        </WhatsappShareButton>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
