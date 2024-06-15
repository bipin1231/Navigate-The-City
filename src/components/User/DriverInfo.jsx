import React from 'react';

function DriverInfo() {
  return (
    <div className='pt-3 px-4'>
      {/* driver profile div */}
			<div className='flex justify-center text-[35px]'>Driver Info</div>
      <div className='flex justify-center'>
        <span className='text-[80px]'>
          <ion-icon name="person-circle-outline"></ion-icon>
        </span>
      </div>
      {/* driver details div */}
      <div className="grid grid-cols-2 gap-4 mx-6">
        <div className='w-[90%] text-lg border border-gray-400 p-2'>Driver Name: Prajwal K.C.</div>
        <div className='w-[90%] text-lg border border-gray-400 p-2'>License No.: 1248358</div>
        <div className='w-[90%] text-lg border border-gray-400 p-2'>Address: Pulchowk</div>
        <div className='w-[90%] text-lg border border-gray-400 p-2'>Contact: 9822222222</div>
        <div className='w-[90%] text-lg border border-gray-400 p-2'>Age: 32</div>
        <div className='w-[90%] text-lg border border-gray-400 p-2'>Vehicle No.: 01 Ba 11 3912</div>
        <div className='w-[90%] text-lg border border-gray-400 p-2'>Exp: 5 years</div>
      </div>
    </div>
  );
}

export default DriverInfo;
