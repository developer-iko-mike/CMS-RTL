import React from 'react'
import './comments.css'
import Error from '../../AllRoute_Components/error/Error'

export default function Comments() {
  return (
    <div className='mt2'>
        <h1 className="comment_headerTiTle mb1-5">لیست کامنت ها</h1>

      <Error title={"هیچ کامنتی پیدا نشد"}/>
    </div>
  )
}
