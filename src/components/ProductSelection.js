import React from 'react'
import Avatar from '../image/avatar.png'



const ProductSelection = (props) => {
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
          <button className="btn-quantity mr-3" onClick={props.decreaseQuantity}><i className="ic-minus"></i></button>
          <div className="input-product">
            <label htmlFor="" className="mb-0">{props.quantity}</label>
            <input type="hidden" value="2" />
          </div>
          <button className="btn-quantity ml-3" onClick={props.increaseQuantity}>
            <i className="ic-add"></i>
          </button>
        </div>
      </div>

      <h6  className="mt-3">Select the product to customize your buy</h6>

      <ul className="nav nav-pills tab-product mb-3" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="pills-product1-tab" data-toggle="pill" href="#pills-product1" role="tab" aria-controls="pills-product1" aria-selected="true">
            <div className="imgbox">
              <img src={props.index} alt="" />
            </div>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="pills-product2-tab" data-toggle="pill" href="#pills-product2" role="tab" aria-controls="pills-product2" aria-selected="false">
            <div className="imgbox">
              <img src={props.index} alt="" />
            </div>
          </a>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-product1" role="tabpanel" aria-labelledby="pills-product1-tab">
          
        <div className="product-description">
            <span className="heading">Size & Fit</span>
            <div className="description">
              <div className="radio-size">
                <input type="radio" id="small" name="sizeRadio"/>
                <label htmlFor="small">S</label>
              </div>
              <div className="radio-size">
                <input type="radio" id="medium" name="sizeRadio"/>
                <label htmlFor="medium">M</label>
              </div>
              <div className="radio-size">
                <input type="radio" id="large" name="sizeRadio"/>
                <label htmlFor="large">L</label>
              </div>
              <div className="radio-size">
                <input type="radio" id="extralarge" name="sizeRadio"/>
                <label htmlFor="extralarge">XL</label>
              </div>

             
            </div>
          </div>

          <div className="product-description">
            <span className="heading">Colors</span>
            <div className="description">
              <div className="radio-color">
                <input type="radio" id="black" name="colorRadio"/>
                <label htmlFor="black" style={{backgroundColor:'#000'}}></label>
              </div>
              <div className="radio-color">
                <input type="radio" id="white" name="colorRadio"/>
                <label htmlFor="white" style={{backgroundColor:'#fff'}} ></label>
              </div>
              <div className="radio-color">
                <input type="radio" id="orange" name="colorRadio" />
                <label htmlFor="orange" style={{backgroundColor:'red'}} ></label>
              </div>
            

             
            </div>
          </div>


        </div>
        <div className="tab-pane fade" id="pills-product2" role="tabpanel" aria-labelledby="pills-product2-tab">
          
        <div className="product-description">
            <span className="heading">Size & Fit</span>
            <div className="description">
              <div className="radio-size">
                <input type="radio" id="small" name="sizeRadio"/>
                <label htmlFor="small">S</label>
              </div>
              <div className="radio-size">
                <input type="radio" id="medium" name="sizeRadio"/>
                <label htmlFor="medium">M</label>
              </div>
              <div className="radio-size">
                <input type="radio" id="large" name="sizeRadio"/>
                <label htmlFor="large">L</label>
              </div>
              <div className="radio-size">
                <input type="radio" id="extralarge" name="sizeRadio"/>
                <label htmlFor="extralarge">XL</label>
              </div>

             
            </div>
          </div>

          <div className="product-description">
            <span className="heading">Colors</span>
            <div className="description">
              <div className="radio-color">
                <input type="radio" id="black" name="colorRadio"/>
                <label htmlFor="black" style={{backgroundColor:'#000'}}></label>
              </div>
              <div className="radio-color">
                <input type="radio" id="white" name="colorRadio"/>
                <label htmlFor="white" style={{backgroundColor:'#fff'}} ></label>
              </div>
              <div className="radio-color">
                <input type="radio" id="orange" name="colorRadio" />
                <label htmlFor="orange" style={{backgroundColor:'red'}} ></label>
              </div>
            

             
            </div>
          </div>


        </div>

      </div>




      <button className="btn btn-primary" onClick={props.changeFlag}>Done</button> 
    </div>
  )
}

export default ProductSelection