import React from 'react'
import './offs.css'
import Error from '../../AllRoute_Components/error/Error'

export default function Offs() {
  return (
        <div className='mt2'>
          <h1 className="off_headerTiTle mb1-5">لیست تخفیف ها</h1>
    
          <Error title={"هیچ تخفیفی پیدا نشد"}/>
        </div>
  )
}
