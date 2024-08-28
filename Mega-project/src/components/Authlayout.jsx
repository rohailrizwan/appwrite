import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

function Authlayout({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus == authentication){
            navigate('/login')
        }
        else{
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
  return (
    <div>
        {loader?<Loader/>:<>{children}</>}
    </div>
  )
}

export default Authlayout
