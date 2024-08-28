import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Service from'../appwrite/Configuration'
import Postcard from '../components/Postcard'
import Container from '../components/Container'
function Home() {
    const [post,setPost]=useState()

    useEffect(()=>{
        Service?.getPosts().then((post)=>{
            if(post){
                setPost(post?.documents)
            }
        })
    },[])
  return (
    <div className='py-8 w-full'>
      <Container>
        <div className='flex flex-wrap'>
            {
                post?.map((post)=>{
                    return(
                        <div key={post?.$id}>
                            <Postcard post={post}/>
                        </div>
                    )
                })
            }
        </div>
      </Container>
    </div>
  )
}

export default Home
