import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../Container';
import { Link, useNavigate } from 'react-router-dom';
import Logoutbtn from './Logoutbtn';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  console.log(authStatus);
  const navigate=useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: authStatus == false,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: authStatus == false,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus == true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus == true,
    },
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              Logo
            </Link>
          </div>
          <ul className='flex ml-auto'>
              {navItems?.map((item,index)=>
              item.active?(
                <li key={index}><button className='inline-block px-6 py-2 rounded-full duration-200 hover:bg-blue-100' onClick={()=>navigate(item?.slug)}>{item?.name}</button></li>
              ):
              (null))
              }
              {
                authStatus && (
                  <li><Logoutbtn/></li>
                )
              }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
