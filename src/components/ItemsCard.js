import React from 'react'


const ItemsCard = ({id, title,image,background,click})=>{
  return(
    <div className={'card card-category '+background}>
      <div className="imgbox">
        <img onClick={() => click(id)} src={image} alt={title}/>
      </div>
      <h6>{title}</h6>
    </div>
  )
}

export default ItemsCard;