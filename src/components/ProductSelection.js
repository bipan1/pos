import React from 'react'
import Avatar from '../image/avatar.png'

class ProductSelection extends React.Component {
  render () {
    const myMap = Array.apply(null, Array(this.props.quantity)).map((item,i) => {
      return (
        <li className="nav-item">
            <button className="nav-link active" id={`pills-product${i}-tab`} data-toggle="pill" onClick={() =>{this.props.handleClick(i)}} role="tab" aria-controls="pills-product1" aria-selected="true">
              <div className="imgbox">
                <img src={this.props.image} alt="" />
              </div>
            </button>
        </li>
      )
    }
    )
  
    const myMapSec = Array.apply(null, Array(this.props.quantity)).map((item,i)=> {
      if(this.props.index === i)
      return (
        <div className={`tab-pane fade show active`} id={`pills-product${i}`} role="tabpanel" aria-labelledby={`pills-product-${i}tab`}>
          <div className="product-description">
              <span className="heading">Size & Fit</span> 
              <div className="description">
                <div className="radio-size">
                  <input 
                    type="radio" 
                    id="small" 
                    value="small"
                    checked={this.props.selctedAttributes[i].size === "small"}
                    onChange={(e) => {this.props.handleSizeChange(e,i)}}
                    name="sizeRadio"/>
                  <label htmlFor="small">S</label>
                </div>
                <div className="radio-size">
                  <input 
                    type="radio" 
                    id="medium"
                    value="medium"
                    checked={this.props.selctedAttributes[i].size === "medium"}
                    onChange={(e) => {this.props.handleSizeChange(e,i)}} 
                    name="sizeRadio"/>
                  <label htmlFor="medium">M</label>
                </div>
                <div className="radio-size">
                  <input 
                    type="radio" 
                    id="large"
                    value="large"
                    checked={this.props.selctedAttributes[i].size === "large"}
                    onChange={(e) => {this.props.handleSizeChange(e,i)}} 
                    name="sizeRadio"/>
                  <label htmlFor="large">L</label>
                </div>
                <div className="radio-size">
                  <input 
                    type="radio" 
                    id="extralarge"
                    value="extralarge"
                    checked={this.props.selctedAttributes[i].size === "extralarge"}
                    onChange={(e) => {this.props.handleSizeChange(e,i)}}
                    name="sizeRadio"/>
                  <label htmlFor="extralarge">XL</label>
                </div>
              </div>
            </div>

            <div className="product-description">
              <span className="heading">Colors</span>
              <div className="description">
                <div className="radio-color">
                  <input 
                    type="radio" 
                    id="black"
                    value="black"
                    checked={this.props.selctedAttributes[i].color === "black"}
                    onChange={(e) => {this.props.handleColorChange(e,i)}} 
                    name="colorRadio"/>
                  <label htmlFor="black" style={{backgroundColor:'#000'}}></label>
                </div>
                <div className="radio-color">
                  <input 
                    type="radio" 
                    id="white"
                    value="white"
                    checked={this.props.selctedAttributes[i].color === "white"}
                    onChange={(e) => {this.props.handleColorChange(e,i)}} 
                    name="colorRadio"/>
                  <label htmlFor="white" style={{backgroundColor:'#fff'}} ></label>
                </div>
                <div className="radio-color">
                  <input 
                    type="radio" 
                    id="orange"
                    value="orange"
                    checked={this.props.selctedAttributes[i].color === "orange"}
                    onChange={(e) => {this.props.handleColorChange(e,i)}} 
                    name="colorRadio" />
                  <label htmlFor="orange" style={{backgroundColor:'red'}} ></label>
                </div>
              </div>
            </div>
          </div>
      )
    })
  

    return (
      <div className="product-selection">
  
        <div className="d-flex justify-content-between">
          <div className="img-avatar">
            <img src={Avatar} alt="User name" />
          </div>
          <div className="product-total">
            <h6>TOTAL</h6>
            <h4>$300.00</h4>
          </div>
        </div>
  
  
        <h6 className="product-name">Black Fur Top Jacket</h6>
  
        <div className="product-description align-items-center">
          <span className="heading">Quantity</span>
          <div className="description">
            <button className="btn-quantity mr-3" onClick={this.props.decreaseQuantity}><i className="ic-minus"></i></button>
            <div className="input-product">
              <label htmlFor="" className="mb-0">{this.props.quantity}</label>
              <input type="hidden" value={this.props.quantity}/>
            </div>
            <button className="btn-quantity ml-3" onClick={this.props.increaseQuantity}>
              <i className="ic-add"></i>
            </button>
          </div>
        </div>
        <h6  className="mt-3">Select the product to customize your buy</h6>
  
  
  
        <ul className="nav nav-pills tab-product mb-3" id="pills-tab" role="tablist">
          {myMap}
        </ul>
  
        <div className="tab-content" id="pills-tabContent">
          {myMapSec}
        </div>
  
        <button className="btn btn-primary" onClick={this.props.changeFlag}>Done</button> 
      </div>
    )
  }
}

export default ProductSelection;