import React from 'react'
import './orders.css'
import Error from '../../AllRoute_Components/error/Error'

export default function Orders() {
  return (
    <div className='mt2'>
      <h1 className="order_headerTiTle mb1-5">لیست سفارشات</h1>

      <Error title={"هیچ سفارشی پیدا نشد"}/>
    </div>
  )
}
