import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

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
            <p>{this.props.bagState.bagList.length} items</p>
          </div>
  
  
          <div className="item">
            <h6>Cost</h6>
            <p>$ {this.props.bagState.totalCost}</p>
          </div>
  
          <div className="ml-auto">
            <button className="btn btn-warning" onClick={this.handleClick}>View</button>
          </div>
  
        </div>
      </footer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bagState : state.bag
  }
}

export default connect(mapStateToProps, null)(Footer)