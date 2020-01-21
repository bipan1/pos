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

import Product1 from '../image/product1.png'   
import Product2 from '../image/product2.png'
import Product3 from '../image/product3.png'
import Product4 from '../image/product4.png'
import Product5 from '../image/product5.png'

class ProductDescription extends Component {
    state = {
      nav1: null,
      nav2: null,
      quantity:1,
      selctedAttributes : [{
        size:"",
        color:""
      }],
      openProductSelection : false,
      productList : [Product2, Product3, Product4, Product5],
      idNo : 0,
      bag : [],
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
        nav1: this.slider1,
        nav2: this.slider2
      });
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

  addToBag = (price, id) => {     // Add the contents to bag. (click handler)
    let array = [];
    this.state.selctedAttributes.map(item => {
      let image  = this.state.productList[this.state.idNo - 1]
      let obj = {
        "image" : image,
        "price" : price,
        "id" : id,
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

        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          arrows={false}
          afterChange = {this.nextClick}
        >
          <div className="item">
            <ProductHighLight image={Product1} addToBag={this.addToBag} price = {200} url="/home" />
          </div>
          
          {
            this.state.productList.map(product => {
              return (
                <div className="item" key={product}>
                  <ProductHighLight image={product} addToBag={this.addToBag} price = {200} url="/home" />
                </div>
              )
            })
          }
        </Slider>
        
        
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
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          arrows={false}
          centerMode={true}
          className="slick-thumb"
        >
          <ProductNavigation image={Product1}/>
          {
            this.state.productList.map(product => {
              return (
                <div className="item" key={product}>
                <ProductNavigation image={product}/>
              </div>
              )
            })
          }
        </Slider>

        <Footer bag = {this.state.bag}/>
      
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToBag : (array) => dispatch(addToBag(array)),
    calculateCost : () => dispatch(calculateCost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);