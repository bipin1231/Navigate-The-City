import React from 'react'

function BusSeat({id,selected,onSelect}) {
  const handleClick=()=>{
    onSelect(id);
    console.log(id);
    console.log(selected);
  }
  return (
   
    <div
    className={`w-10 h-10 flex items-center justify-center cursor-pointer`}
    onClick={handleClick}
  >
    <img src={`../${selected ? 'selectedSeat.png' : 'availableSeat.png'}`} alt={`Seat ${id}`} />
  </div>

    
  )
}

export default BusSeat
