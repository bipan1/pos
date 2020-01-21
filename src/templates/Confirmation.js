import React from 'react';
import Avatar from '../image/avatar.png';
import Bubble from '../image/bubble.png';
import Bag from '../image/bag.png';
import { QRCode } from 'react-qr-svg';
import {connect} from 'react-redux';

import Header  from '../components/Header'

class  Confirmation extends React.Component{
  render () {
    return (
      <>
  
      <Header/>
      <div className="position-relative">
        <img src={Bubble} alt="Layout Design" className="img-bubble" />
        <img src={Bag} alt="Shopping Bag" className="img-bag"/>
          
        <div className="message-confirmation">
          <h4>Please scan this bar code</h4>
          <QRCode
            level="Q"
            style={{ width: 512 }}
            value={JSON.stringify({
              products : this.props.bagState.bagList,
              total : this.props.bagState.totalCost
            })}
          />
          <br />
          <br />
          <h4>Thank you for shopping</h4>
          <div className="imgbox">
            <img src={Avatar} alt="User Avatar"/>
          </div>
          <p>Please collect your bag at the counter</p>
        </div>
      </div>
      </>
   
   )
  }
}

const mapStateToProps = (state) => {
  return {
    bagState : state.bag
  }
}

export default connect(mapStateToProps, null)(Confirmation);