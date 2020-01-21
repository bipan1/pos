import React from 'react';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Jacket from '../images/male/Coats&Jackets/Jacket.jpeg'
import Hoodie from '../images/male/Hoodies/Hoodie.jpg'
import Jeans from '../images/male/Shirts/Shirt.jpg'
import Shirts from '../images/male/Shirts/Shirt.jpg'
import Sweater from '../images/male/Sweaters/Sweater.jpeg'
import Tshirt from '../images/male/Tshirts/TShirt.jpeg'
import Tuxedo from '../images/male/Tuxedos/Tuxedos.jpg'

import Boots from '../images/female/Boots/Boots.jpg';
import FJackets from '../images/female/Jackets/Jacket.jpeg';
import FJeans from '../images/female/Jeans/Jeans.jpg';
import PartyDress from '../images/female/PartyDresses/PartyDress.jpeg';
import Skirts from '../images/female/Skirts/Skirt.jpg';
import FSweaters from '../images/female/Sweaters/Sweater.jpeg';
import Tops from '../images/female/Tops/Tops.jpg'

class Category extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      category : '',
      color : ["bg-brown", "bg-info", "bg-pitch", "bg-orange", "bg-pink", "bg-light"],
      male : [
        {
            category : "Coats & Jackets",
            image : Jacket
        },
        {
            category : "Hoodies",
            image : Hoodie
        },
        {
            "category" : "Jeans",
            image : Jeans
        },
        {
            "category" : "Shirts",
            image : Shirts
        },
        {
            category : "Sweaters",
            image : Sweater
        },
        {
            category : "T-Shirts",
            image : Tshirt
        },
        {
            category : "Tuxedos",
            image : Tuxedo
        }
    ],
      toItems : false,
      female : [
        {
            category : "Boots",
            image : Boots
        },
        {
            category : "Jackets",
            image : FJackets
        },
        {
            category : "Jeans",
            image : FJeans
        },
        {
            category : "Party Dress",
            image : PartyDress
        },
        {
            category : "Skirts",
            image : Skirts
        },
        {
            category : "Sweaters",
            image : FSweaters
        },
        {
            category : "Tops",
            image : Tops
        }
    ]
    }
  }

  handleCardClick = (title) => {
    this.setState({
      toItems : true,
      category : title
    })
  }
  
  render() {
    const {color} = this.state;
    let primaryList = []
    if(this.props.genderData === "Male")
    {
      primaryList = this.state.male
    }
    else{
      primaryList = this.state.female
    }

    let newList = []
    newList = [...primaryList]
    newList.shift();

    if(this.state.toItems === true) {
      return <Redirect to = {{
        pathname : '/items',
        state : {
          category : this.state.category
        }
      }} />
    }

    return (
      <>
        <Header heading="Categories"/>
          <div className="container mt-4">
          <div className="row">
            <div className="col">
              <CategoryCard 
                click={this.handleCardClick} 
                title={primaryList[0].category} 
                image={primaryList[0].image} 
                background={color[Math.floor(Math.random()*color.length)]}
              />
            </div>
          </div>


          <div className="row">
            {
              newList.map((item,i) =>{
                return(
                  <div key={item.category} className="col-6">
                    <CategoryCard 
                      title={item.category} 
                      image={item.image}
                      click={this.handleCardClick} 
                      background={color[Math.floor(Math.random()*color.length)]}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    genderData : state.home.gender
  }
}

export default connect(mapStateToProps, null)(Category);