import React from 'react'

function CompanyInfo() {
  return (
    <div className='pt-3 px-4'>
      {/* company profile div */}
			<div className='flex justify-center text-[25px] md:text-[35px]'>Company Details</div>
      <div className='flex justify-center'>
        <span className='text-[25px]'>
          ABC Company
        </span>
      </div>
      {/* company details div */}
      <div className="grid grid-cols-2 gap-4 m-1 md:m-6">
        <div className='w-[90%] text-sm md:text-lg border border-gray-400 p-2'>Owner Name: Prajwal K.C.</div>
        <div className='w-[90%] text-sm md:text-lg border border-gray-400 p-2'>Address: Pulchowk</div>
        <div className='w-[90%] text-sm md:text-lg border border-gray-400 p-2'>Contact: 9822222222</div>
        <div className='w-[90%] text-sm md:text-lg border border-gray-400 p-2'>No. of Vehicles: 32</div>
        <div className='w-[90%] text-sm md:text-lg border border-gray-400 p-2'>No. of Drivers: 30</div>
      </div>
    </div>
  )
}

export default CompanyInfo
