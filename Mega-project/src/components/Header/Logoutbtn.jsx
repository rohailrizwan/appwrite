import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../slice/authslice'
function Logoutbtn() {
    const dispatch=useDispatch()

    const logouthandler=()=>{
        authService.Logout().then((res)=>{
                console.log(res);
                dispatch(logout())
        })
    }
    return (
        <button className='duration-200 px-6 py-2 inline-block rounded-full hover:bg-blue-500'>Logout</button>
    )
}

export default Logoutbtn
