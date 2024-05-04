import React from 'react'

function BusSeat({id,selected,onSelect}) {
  const handleClick=()=>{
    onSelect(id);
    console.log(id);
    console.log(selected);
  }
  return (
   
    <div className={` w-12 h-12 rounded-xl ${selected?"bg-blue-600":"bg-gray-300 "} items-center cursor-pointer align-middle flex justify-center`}
    onClick={handleClick}
    >
      {id}

    </div>

    
  )
}

export default BusSeat
