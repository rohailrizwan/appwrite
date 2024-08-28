import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Service from '../appwrite/Configuration'
import Container from '../components/Container'
import Postform from '../components/Postform/Postform'

function Edit() {
    const [post,setPost]=useState(null)
    const param=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(param?.slug){
            Service.getPosts(param?.slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])
  return (
    <div>
        {
            post?(
                <Container>
                    <Postform/>
                </Container>
            ):""
        }
    </div>
  )
}

export default Edit
