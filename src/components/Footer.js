import React from 'react';
import { Redirect } from 'react-router-dom';




class Footer extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       toBag : false
    }
  }
  

  handleClick = () => {
    this.setState({
      toBag : true
    })
  }

  render () {

    if(this.state.toBag === true){
      return (
        <Redirect to = '/bag' />
      )
    }
    return (
      <footer className="footer">
        <div className="footer-home">
          <i className="ic-windows"></i>
          <span>Home</span>
        </div>
  
        <div className="footer-cart">
          <div className="icon">
            <i className="ic-bag "></i>
          </div>
          <div className="item">
            <h6>My Bag</h6>
            <p>0 items</p>
          </div>
  
  
          <div className="item">
            <h6>Cost</h6>
            <p>$ 0.00</p>
          </div>
  
          <div className="ml-auto">
            <button className="btn btn-warning" onClick={this.handleClick}>View</button>
          </div>
  
        </div>
      </footer>
    )
  }
}


export default Footer