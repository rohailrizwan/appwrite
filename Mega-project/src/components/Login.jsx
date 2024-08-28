import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../slice/authslice'
import { Link, useNavigate } from 'react-router-dom'
import Button from './button'

function Login() {
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const postLogin = async (data) => {
        setError('')
        try {
            const result = await authService.Login(data)
            if (result) {
                const userdata = await authService.getCurrentuser()
                if (userdata) {
                    dispatch(login(userdata))
                }
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full my-2'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        Logo
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(postLogin)} className='mt-8'>
                    <div className='space-y-5'>
                       <div className='my-2 w-full flex flex-col'>
                        <label >Email</label>
                       <input
                            placeholder="Enter Your Email"
                            type='email'
                            className='p-2 rounded-lg'
                            {...register('email',{required:true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || 'Please enter a valid email address'
                                }
                            })}
                        />
                       </div>
                       <div className='my-2 w-full flex flex-col'>
                        <label>Passowrd</label>
                        <input
                            placeholder="Enter Your Password"
                            type='password'
                            className='p-2 rounded-lg'
                            {...register('password',{required:true
                            })}
                        />
                       </div>
                        <Button
                            type='submit'
                            className='w-full'
                            children={"Sign In"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
