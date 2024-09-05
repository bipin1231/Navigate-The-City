import React from 'react'

function Card(
  {
    header,
    imgSrc,
    para
  }
) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 h-96">
    <img src={imgSrc} alt="Feature 1" className="mb-6 rounded-lg" />
    <h3 className="text-2xl font-semibold mb-4">{header}</h3>
    <p>{para}</p>
  </div>
  )
}

export default Card
