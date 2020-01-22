import React from 'react'


const ProductHighLight = ({ image, price, url, addToBag }) => {
  let id = 20
  return (
    <div className="product-highlight">
      <div className="imgbox">
        <img src={image} alt="Fur Coats" className="mx-auto" />
      </div>
      <h6>${price}</h6>
      <button onClick={() => addToBag(image, price, id)} className="btn btn-primary d-flex">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1.5rem" fill="white" className="mr-2"><path d="M21.6 20.8L20.2 5.2c0-.3-.3-.5-.6-.5h-2.9C16.7 2.1 14.6 0 12 0S7.3 2.1 7.3 4.7H4.4c-.3 0-.6.2-.6.5L2.4 20.8v.1C2.4 22.6 4 24 6 24h12c2 0 3.6-1.4 3.6-3.2zM12 1.2c1.9 0 3.5 1.6 3.5 3.5h-7c0-1.9 1.6-3.5 3.5-3.5zm6 21.6H6c-1.3 0-2.3-.9-2.4-1.9l1.3-15h2.4V8c0 .3.3.6.6.6s.6-.3.6-.6V5.9h7V8c0 .3.3.6.6.6s.6-.3.6-.6V5.9h2.4l1.3 15c0 1-1.1 1.9-2.4 1.9z" /></svg> <div>Add<span className="d-block">to bag</span> </div></button>
    </div>
  )
}

export default ProductHighLight;