import React,{useEffect,useState} from 'react'
import service from '../../appwrite/config'


function ViewBusList() {
const [bus,setBus]=useState([]);


useEffect(()=>{
  const fetchBusInfo = async () => {
  
    const data = await service.fetchBus();

   setBus(data.documents)
   
  }

  fetchBusInfo();
},[])
console.log(bus);
  return (
    <div>

 {bus.map((b,index)=>(
<div key={index}>
Driver Name : {b.driver}
Bus Number : {b.busNo}
Owner Name : {b.ownerName}
Route : {b.route}
</div>
  )
)}
</div>
  )
}

export default ViewBusList
