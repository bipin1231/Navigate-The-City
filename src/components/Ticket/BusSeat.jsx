import React from 'react'

function BusSeat({id,selected,onSelect}) {
  const handleClick=()=>{
    onSelect(id);
    console.log(id);
    console.log(selected);
  }
  return (
   
    <div
    className={`w-12 h-12 rounded-xl ${selected ? "bg-blue-600" : "bg-gray-300"} flex items-center justify-center cursor-pointer`}
    onClick={handleClick}
  >
    {/* Replace with dynamic SVG loading */}
    <img src={`../${selected ? 'blueSeat.png' : 'whiteSeat.png'}`} alt={`Seat ${id}`} />
  </div>

    
  )
}

export default BusSeat
