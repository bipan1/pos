import React from 'react';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';

class Category extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
      color : ["bg-brown", "bg-info", "bg-pitch", "bg-orange", "bg-pink", "bg-light"]
    }
  }
  
  render() {
    const {color} = this.state;
    console.log(this.props.location.state.primaryList)
    const {primaryList} = this.props.location.state;
    let newList = []
    newList = [...this.props.location.state.primaryList]
    newList.shift();

    return (
      <>
        <Header/>
          <div className="container mt-4">
          <div className="row">
            <div className="col">
              <CategoryCard title={primaryList[0].category} image={primaryList[0].image} 
                background={color[Math.floor(Math.random()*color.length)]}/>
            </div>
          </div>

          <div className="row">
            {
              newList.map(item =>{
                return(
                  <div className="col-6">
                    <CategoryCard title={item.category} image={item.image} 
                      background={color[Math.floor(Math.random()*color.length)]}/>
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
export default Category;