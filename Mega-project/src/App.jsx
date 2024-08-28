
import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import {login,logout} from './slice/authslice'
import Loader from './components/Loader'
import Home from './Pages/Home'
import Authlayout from './components/Authlayout'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {  
    const [loading,setLoading]=useState(true)
    const dispatch=useDispatch()
    
    useEffect(()=>{
        authService.getCurrentuser((userdata)=>{
            if(userdata){
              dispatch(login(userdata))
            }
            else{
              dispatch(logout())
            }
        }).finally(()=>(setLoading(false)))
    },[])
  return (
    <>
      {
        loading?<Loader/>:
        <>
          <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
            <div className='w-full'>
              <Header/>
              <main>
                <Outlet/>
              </main>
              <Footer/>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default App
