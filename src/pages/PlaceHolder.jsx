import React, { useContext, useState } from 'react'
import Title from '../Component/Title'
import CartTotal from '../Component/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'

const PlaceHolder = () => {

  const [method, setMethod] = useState('');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] boder-t'>

      { /*---------------Left Sides-----------  */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-2">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="Email" placeholder='abcd@gmail.com' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className="flex gap-3">
        <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
        <input type="number" placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="phone" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* Right side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80"> 
          <CartTotal/> 
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHODS'}/>
        </div>
        
        {/* PAYMENT METHOD */}

        <div className="flex gap-3 flex-col lg:flex-row">

          <div onClick={() => setMethod('strip')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'strip' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.stripe_logo} alt="Strip_logo" className='h-5 mx-4'/>
          </div>
          <div onClick={() => setMethod('razopay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razopay' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.razorpay_logo} alt="razorpay_logo" className='h-5 mx-4'/>
          </div>
          <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400 ': ''}`}></p>
           <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button onClick={() => navigate('/order')} className='bg-black text-white py-3 px-12 text-sm'>PLACE ORDER</button>
        </div>

      </div>
    </div>
  )
}

export default PlaceHolder