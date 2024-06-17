import React from 'react'

function CompanyInfo() {
  return (
    <div className='pt-3 px-4'>
      {/* company profile div */}
			<div className='flex justify-center text-[25px] md:text-[35px]'>Company Details</div>
      <div className='flex justify-center'>
        <span className='text-[18px] md:text-[25px]'>
          ABC Company
        </span>
      </div>
      {/* company details div */}
      <div className="grid grid-cols-2 gap-1 mt-3 md:m-5">
        <div className='text-sm md:text-lg'>Owner Name: Prajwal K.C.</div>
        <div className='text-sm md:text-lg'>Address: Pulchowk</div>
        <div className='text-sm md:text-lg'>Contact: 9822222222</div>
        <div className='text-sm md:text-lg'>No. of Vehicles: 32</div>
        <div className='text-sm md:text-lg'>No. of Drivers: 30</div>
      </div>
    </div>
  )
}

export default CompanyInfo
