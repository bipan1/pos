import React from 'react';
import Slider from "react-slick";
import {connect} from 'react-redux';
import {fetchApi} from '../redux';
import { loadModels, getFullFaceDescription} from '../api/face';
import ProductNavigation from "../components/ProductNavigation";
import Webcam from 'react-webcam';
import { Redirect } from 'react-router-dom';


// import Product1 from '../image/product1.png'
// import Product2 from '../image/product2.png'
// import Product3 from '../image/product3.png'
// import Product4 from '../image/product4.png'
// import Product5 from '../image/product5.png'


const inputSize = 160;

class Home extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      flag : false,
      toCategory : false
    }
  }

  onRecommendClick = () => {

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
    }, 3000);
  }

  componentDidMount() {
    this.initFaceDetection()
  }

  handleProcessing = async() => {     // function to detect face
    await getFullFaceDescription(
        this.webcam.getScreenshot(),
        inputSize
    ).then(fullDesc => {
        const fullDescription = fullDesc
        if(fullDescription.length === 0){
            console.log("Face not detected.")
        }
        else {
          console.log("face detected")
          clearInterval(this.interval);
          this.callAiApi();       //Ai api is called once the face is detected.
        }
    });
  }

  callAiApi = () => {     //Ai api called when face is detected.
    const list = [];
    list.push(this.webcam.getScreenshot())
    list.push(this.webcam.getScreenshot())
    list.push(this.webcam.getScreenshot())

    console.log(list)
    
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
    
    // from data 
    let formdata = new FormData();

    formdata.append('file', file[0])
    formdata.append('file', file[1])
    formdata.append('file', file[2])
    //AI api call
    this.props.fetchApi(formdata, this.initFaceDetection);
  }
  
  handleClick = () => {
    this.setState({
      toCategory : true
    })
  }
  
  render () {

    if(this.state.toCategory === true) {
      return <Redirect to='/category'/>
    }

    if(this.props.apidata.flag){
      let imgbox = document.querySelector('.home .imgbox')
      imgbox.style.height='32rem';
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

        {this.props.apidata.flag && 
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
                  {this.props.apidata.recommendList.map(item => {
                    if(item.images.length > 0)
                    return (
                      <div key={item.id} className="item">
                        <ProductNavigation onClick={this.onRecommendClick} image={item.images[0].image} />
                      </div> 
                    )
                    return null
                  })}
                </Slider>   
              </div>
              <div className="col-2">
                <button onClick={this.handleClick} className="btn btn-warning text-white ">View more</button>
              </div>
            </div>
          </div>
        }
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
      apidata : state.home
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchApi : (formdata, initFaceDetection) => dispatch(fetchApi(formdata, initFaceDetection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);