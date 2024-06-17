import React from 'react';

function DriverInfo() {
  return (
    <div className='pt-2 px-4'>
          <div className='flex justify-center pb-3 text-[25px] md:text-[35px]'>
            Driver Profile
          </div>
      <div className='flex flex-col md:flex-row items-center justify-around'>
        <div className=' w-[40%]'>
          {/* driver profile div */}
          <div className='flex justify-center'>
            <span className='text-[80px]'>
              <ion-icon name="person-circle-outline"></ion-icon>
            </span>
          </div>
        </div>
        <div className='md:w-[60%]'>
          {/* driver details div */}
          <div className="grid grid-cols-2 gap-1 mx-1 md:mx-6">
            <div className='text-sm md:text-md'>Driver Name: Prajwal K.C.</div>
            <div className='text-sm md:text-md'>License No.: 1248358</div>
            <div className='text-sm md:text-md'>Address: Pulchowk</div>
            <div className='text-sm md:text-md'>Contact: 9822222222</div>
            <div className='text-sm md:text-md'>Age: 32</div>
            <div className='text-sm md:text-md'>Vehicle No.: 01 Ba 11 3912</div>
            <div className='text-sm md:text-md'>Exp: 5 years</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverInfo;
