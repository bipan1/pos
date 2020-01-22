import React, { Component } from "react";
import Slider from "react-slick";
import {connect} from 'react-redux';
import ProductHighLight from '../components/ProductHighLight';
import ProductNavigation from "../components/ProductNavigation";
import ProductSelection from '../components/ProductSelection';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Bubble from '../image/bubble.png';
import {addToBag, calculateCost} from '../redux';
import axios from 'axios';

class ProductDescription extends Component {
  state = {
    id : 0,
    sliderResponse : null,
    flag : false,
    itemRes : null,
    nav1: null,
    nav2: null,
    quantity:1,
    selctedAttributes : [{
      size:"",
      color:""
    }],
    openProductSelection : false,
    idNo : 0,
    index : 0
  };

  changeFlag = () => {  //function to be passed as prob to toggle producctSelection page
    this.setState({
      openProductSelection : false
    })
  }

  handleClick =(i) => {        //set the index of product in index state
    this.setState({
      index : i
    })
  }

  componentDidMount() {
    this.setState({
      nav2: this.slider2,
      id : this.props.itemId
    });
    axios.get(`http://192.168.40.170:8000/products/?id=${this.props.itemId}`)
    .then(res => {
      this.setState({
        itemRes : res.data
      })
    })
    axios.get(`api_root_address_id=${this.props.itemId}`)
    .then(resOne => {
      const recommendList = resOne.data
      axios.get(`http://192.168.40.170:8000/products/?id=${recommendList}`)
      .then(resTwo => {
        this.setState({
          sliderResponse : resTwo.data,
          flag : true
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleRecommendClick = (id) => {
    axios.get(`http://192.168.40.170:8000/products/?id=${id}`)
    .then(res => {
      this.setState({
        id :id,
        itemRes : res.data,
        flag : false
      })
    })
    axios.get(`api_root_address_id=${id}`)
    .then(resOne => {
      const recommendList = resOne.data
      axios.get(`http://192.168.40.170:8000/products/?id=${recommendList}`)
      .then(resTwo => {
        this.setState({
          sliderResponse : resTwo.data,
          flag : true
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  

  increaseQuantity= ()=>{             //increase the quantity of selected product
    let arr = this.state.selctedAttributes
    arr.push({
        size:"",
        color:""
      })
    this.setState((prevState)=>{
        return{
          quantity:prevState.quantity + 1,
          openProductSelection:true, 
          selctedAttributes : arr        //when quantity is greather than one then navigate to anoter page flag.
        }
    })
  }
  
  decreaseQuantity= ()=>{              //decrease the quantity of selected product
    this.setState((prevState)=>{
      if(prevState.quantity !== 1){
        let arr = this.state.selctedAttributes
        arr.pop()
        return{
          quantity:prevState.quantity - 1,
          selctedAttributes : arr
        }
      }
    })
  }

  nextClick = (e) => {       // function to get the index of product selected at present moment from slider. 
    this.setState({
      idNo : e
    })
  }

  handleSizeChange = (event, index=0) => {     //function to hadle change in size radio buttons.
    let arr = [...this.state.selctedAttributes]
    arr[index].size = event.target.value
    this.setState({
      selctedAttributes : arr
    })
  }

  handleColorChange = (event, index=0) => {     //handle the change in color of selcted product
    let arr = [...this.state.selctedAttributes]
    arr[index].color = event.target.value
    this.setState({
      selctedAttributes : arr
    })
  }

  addToBag = (image, price) => {     // Add the contents to bag. (click handler)
    let array = [];
    this.state.selctedAttributes.map(item => {
      let obj = {
        "image" : image,
        "price" : price,
        "id" : this.state.id,
        "size" : item.size,
        "color" : item.color
      }
      array.push(obj);
      return {}
    })
    this.props.addToBag(array);
    this.props.calculateCost();
  }

  render() {
    return (
      <>
      <Header heading="Product Detail"/>
      <div className="mt-3 position-relative">
        <img src={Bubble} alt="Layout Design" className="img-bubble"/>
       
      {this.state.openProductSelection ?<ProductSelection changeFlag={this.changeFlag} 
        quantity={this.state.quantity} 
        image={this.state.productList[this.state.idNo]}
        increaseQuantity={this.increaseQuantity}
        decreaseQuantity={this.decreaseQuantity}
        handleSizeChange={this.handleSizeChange}
        handleColorChange={this.handleColorChange}
        selctedAttributes={this.state.selctedAttributes}
        handleClick={this.handleClick}
        index={this.state.index}
        />
      :null}

          {this.state.flag && 
          <div>
            <div className="item">
            <ProductHighLight image={this.state.itemRes.results[0].images[0].image} addToBag={this.addToBag} price = {200} url="/home" />
          </div>

      <div className="container">
        <div className="product">
          <h6 className="product-name">
            Black Fur Top Jacket
          </h6>

          <div className="product-description">
            <span className="heading">Material</span>
            <div className="description">Synthetic Leather</div>
          </div>
          <form onSubmit={this.handleSubmit}>
          <div className="product-description">
            <span className="heading">Size & Fit</span>
            <div className="description">
              <div className="radio-size">
                <input type="radio" 
                  id="small" 
                  value="small"
                  checked={this.state.selctedAttributes[0].size === "small"}
                  onChange={this.handleSizeChange}
                  name="sizeRadio"/>
                <label htmlFor="small">S</label>
              </div>
              <div className="radio-size">
                <input type="radio" 
                  id="medium" 
                  value="medium"
                  checked={this.state.selctedAttributes[0].size === "medium"}
                  onChange={this.handleSizeChange}
                  name="sizeRadio"/>
                <label htmlFor="medium">M</label>
              </div>
              <div className="radio-size">
                <input type="radio" 
                  id="large" 
                  value="large"
                  checked={this.state.selctedAttributes[0].size === "large"}
                  onChange={this.handleSizeChange} 
                  name="sizeRadio"/>
                <label htmlFor="large">L</label>
              </div>
              <div className="radio-size">
                <input type="radio" 
                  id="extralarge" 
                  value="extralarge"
                  checked={this.state.selctedAttributes[0].size === "extralarge"}
                  onChange={this.handleSizeChange} 
                  name="sizeRadio"/>
                <label htmlFor="extralarge">XL</label>
              </div>
            </div>
          </div>
          </form>
          

          <div className="product-description">
            <span className="heading">Colors</span>
            <div className="description">
              <div className="radio-color">
                <input type="radio" 
                  id="black"
                  value="black"
                  checked={this.state.selctedAttributes[0].color === "black"}
                  onChange={this.handleColorChange}
                  name="colorRadio"/>
                <label htmlFor="black" style={{backgroundColor:'#000'}}></label>
              </div>
              <div className="radio-color">
                <input type="radio" 
                  id="white"
                  value="white"
                  checked={this.state.selctedAttributes[0].color === "white"}
                  onChange={this.handleColorChange}
                  name="colorRadio"/>
                <label htmlFor="white" style={{backgroundColor:'#fff'}} ></label>
              </div>
              <div className="radio-color">
                <input type="radio"  
                  id="orange"
                  value="orange"
                  checked={this.state.selctedAttributes[0].color === "orange"}
                  onChange={this.handleColorChange} 
                  name="colorRadio" />
                <label htmlFor="orange" style={{backgroundColor:'red'}} ></label>
              </div>
            

             
            </div>
          </div>

          <div className="product-description align-items-center">
            <span className="heading">Quantity</span>
            <div className="description">
              <button className="btn-quantity mr-3" onClick={this.decreaseQuantity}><i className="ic-minus"></i></button>
              <div className="input-product">
                <label htmlFor="" className="mb-0">{this.state.quantity}</label>
                <input type="hidden" value={this.state.quantity}/>
              </div>
              <button className="btn-quantity ml-3" onClick={this.increaseQuantity}>
                <i className="ic-add"></i>
              </button>
            </div>
          </div>

        </div>
      </div>

        <Slider
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          arrows={false}
          centerMode={true}
          className="slick-thumb"
        >
          {
            this.state.sliderResponse.map(product => {
              return (
                <div className="item" key={product.id}>
                  <ProductNavigation id={product.id} click={this.handleRecommendClick} image={product.images[0].image}/>
                </div>
              )
            })
          }
        </Slider>
        </div>}

        <Footer/>
      
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemId : state.var.itemId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToBag : (array) => dispatch(addToBag(array)),
    calculateCost : () => dispatch(calculateCost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);