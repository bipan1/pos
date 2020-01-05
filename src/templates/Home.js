import React from 'react';
import Slider from "react-slick";
import { loadModels, getFullFaceDescription} from '../api/face';
import axios from 'axios';
import Product1 from '../image/product1.png'
import Product2 from '../image/product2.png'
import Product3 from '../image/product3.png'
import Product4 from '../image/product4.png'
import Product5 from '../image/product5.png'
import ProductNavigation from "../components/ProductNavigation";
import Webcam from 'react-webcam';
import { Redirect } from 'react-router-dom';

const inputSize = 160;

class Home extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      fullDescription: null,
      primaryList : [],
      secondaryList : [],
      flag : false,    //flag to render slider child
      toCategory : false
       
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  }

  componentWillMount(){
    loadModels();
  }

  initFaceDetection = () => {
    this.interval = setInterval(() => {
      this.handleProcessing();
    }, 2000);
  }
  componentDidMount() {
    this.initFaceDetection()
  }

  handleProcessing = async() => {     // function to detect face
    await getFullFaceDescription(
        this.webcam.getScreenshot(),
        inputSize
    ).then(fullDesc => {
        this.setState({
            fullDescription : fullDesc
        })
        console.log(this.state.fullDescription)
        if(this.state.fullDescription.length === 0){
            console.log("Face not detected.")
        }
        else {
          this.callAiApi(); //Ai api is called once the face is detected.
        }
    });
  }

  callAiApi = () => {     //Ai api called when face is detected.
    const list = [];
    clearInterval(this.interval);
    for (let i=0; i<3; i++){
        list.push(this.webcam.getScreenshot())
    }

    console.log(list)
    //base64 to image file conversion.
    const base64ToBlob = (image, fileName) => {
        const byteString = atob(image);
        const fileType = 'image/'+fileName.split(".")[fileName.split(".").length -1];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let img = new Blob([ia], { type: fileType });
        return img;
    }
    const file = list.map((image) => base64ToBlob(image.split(',')[1], 'file.png'))
    console.log(file[0])

    // from data 
    let formdata = new FormData();

    formdata.append('file', file[0])
    formdata.append('file', file[1])
    formdata.append('file', file[2])
    console.log(formdata)
    //AI api call
    axios.post("http://192.168.80.20:8001/gender",formdata)
    .then(response => {
      console.log(response.data)
      this.setState({
        primaryList : response.data[0],
        secondaryList : response.data[1],
        toCategory : true
      });
      console.log(this.state.primaryList)
    })
    .catch(error => {
      this.initFaceDetection()
      console.log(error)
    })
  }
  
  handleClick = () => {
    this.setState({
      flag : true
    })
  }
  
  render () {

    if(this.state.flag === true) {
      return <Redirect to={{
        pathname : '/category',
        state : {
          primaryList : this.state.primaryList
        }
      }}/>
    }

    const videoConstraints = {
      width: 720,
      height: 720,
      facingMode: "user"
    };
  
    return (
      <main className="home">
  
        <h6 className="message-home">
          Welcome
        </h6>
  
        <div className="imgbox">
          <Webcam
            audio={false} videoConstraints={videoConstraints} ref={this.setRef} > 
          </Webcam>
        </div>
  
        <div className="container">
  
          <div className="row align-items-center">
            <div className="col-10">
              <Slider
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
                arrows={false}
                centerMode={false}
                className="slick-thumb slick-thumb_home"
              >
                <div className="item">
                  <ProductNavigation image={Product1} />
                </div>
                <div className="item">
                  <ProductNavigation image={Product2} />
                </div>
                <div>
                  <ProductNavigation image={Product3} />
                </div>
                <div>
                  <ProductNavigation image={Product4} />
                </div>
                <div>
                  <ProductNavigation image={Product5} />
                </div>
  
              </Slider>
  
            </div>
            {this.state.toCategory && <div className="col-2">
              <button onClick={this.handleClick} className="btn btn-warning text-white ">View more</button>
            </div>}
          </div>
        </div>
      </main>
    )
  }
}
export default Home;