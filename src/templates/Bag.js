import React from 'react'
import Avatar from '../image/avatar.png'
import Bubble from '../image/bubble.png'

import Header from '../components/Header'
import { Redirect } from 'react-router-dom'

class Bag extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      flag : false,
      toHome : false
    }
  }
  
  homeClickHandler = () => {
    this.setState({
      toHome : true
    })
  }

  handleClick = (i) => {
    this.props.location.state.bagList.splice(i,1)
    this.setState({
      flag : true
    })
  }

  render () {
    if(this.state.toHome === true) {
      return (
        <Redirect to = '/home' />
      )
    }

    return (
      <>
  
      <Header/>
  
        <div className="position-relative">
        <img src={Bubble} alt="Layout Design" className="img-bubble" />
        <div className="container mt-4 mb-3 d-flex justify-content-between">
          <div className="img-avatar">
            <img src={Avatar} alt="User name" />
          </div>
          <div className="product-total">
            <h6>TOTAL</h6>
            <h4>${this.props.location.state.totalcost}</h4>
          </div>
        </div>
  
       
  
        <div className="shadow-top"></div>
        <section className="section-scrollable">
          <div className="container">
            <ul className="cartlist">
              {
                this.props.location.state.bagList.map((item, i)=> {
                  return (
                    <li className="card-cart mt-3">
                <div className="imgbox">
                  <img src={item.image} alt="" />
                </div>
                <div className="description">
                  <h6>Fur Coats</h6>
                  <h5>Black Fur Top Jacket</h5>
  
  
                  <div className="description-overview">
                    <h4>${item.price}</h4>
                    <h4>{item.size}</h4>
                    <div className="radio-color pl-3">
                      <input type="radio" id="orange" name="colorRadio" checked="true" />
                      <label htmlFor="orange" style={{ backgroundColor: item.color }} ></label>
                    </div>
                  </div>
  
                </div>
  
                <div className="close">
                  <i onClick={() => this.handleClick(i)} className="ic-close"></i>
                </div>
              </li>
                  )
                })
              }
            </ul>
          </div>
        </section>
        <div className="shadow-bottom"></div>
        <footer className="footer-checkout">
          <button onClick={this.homeClickHandler} className="btn btn-warning rounded-pill">Back to Home</button>
          <button className="btn btn-primary rounded-pill">Checkout</button>
        </footer>
  
      </div>
    
    
      </>
    
    )
  }
  
}


export default Bag