import React from 'react'


const ProductNavigation = ({id, image, click})=>{
  return(
    <div className="product-navigation">
      <img onClick={() => click(id)} src={image} alt="Fur Coats Navigation"/>
    </div>
  )
}

export default ProductNavigation;