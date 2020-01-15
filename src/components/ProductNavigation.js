import React from 'react'


const ProductNavigation = ({image, onClick})=>{
  return(
    <div className="product-navigation">
      <img onClick={onClick} src={image} alt="Fur Coats Navigation"/>
    </div>
  )
}

export default ProductNavigation;