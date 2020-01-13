import React from 'react'


const CategoryCard = ({title,image,background,click})=>{
  return(
    <div className={'card card-category '+background}>
      <div className="imgbox">
        <img onClick={() => click(title)} src={image} alt={title}/>
      </div>
      <h4>{title}</h4>
    </div>
  )
}

export default CategoryCard;