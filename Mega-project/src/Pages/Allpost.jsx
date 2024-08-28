import React, { useEffect, useState } from 'react'
import Service from '../appwrite/Configuration'
import Container from '../components/Container'
import Postcard from '../components/Postcard'


function Allpost() {
    const [post, setPost] = useState([])

    useEffect(() => {
    }, [])
    Service.getPosts((post) => {
        try {
            if (post) {
                setPost(post)
            }
        } catch (error) {

        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div>
                    {
                        post?.map((post) => {
                            return (
                                <div>
                                    <Postcard post={post} />
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Allpost
