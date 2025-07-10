import React from 'react'
import './users.css'
import Error from '../../AllRoute_Components/error/Error'

export default function Users() {
  return (
        <div className='mt2'>
          <h1 className="orderTiTle mb1-5">لیست کاربرها</h1>
    
          <Error title={"هیچ کاربری پیدا نشد"}/>

        </div>
  )
}
