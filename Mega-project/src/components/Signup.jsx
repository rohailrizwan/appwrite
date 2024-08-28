import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import Button from './button'
import { login } from '../slice/authslice'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const postSignup = async (data) => {
        console.log(data);
        setError('')
        try {
            const result = await authService.createAccount(data)    
            if (result) {
                const userdata = await authService.getCurrentuser()
                console.log(userdata);
                
                if (userdata) {
                    dispatch(login(userdata))
                }
            }
        } catch (error) {
                console.log(error);
                
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        Logo
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(postSignup)}>
                    <div className='space-y-5'>
                        <div className='flex w-100 flex-col'>
                            <label >Name :</label>
                            <input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                className='p-2 rounded-lg'
                                {...register("name", { required: true })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label >Email</label>
                            <input
                                placeholder="Enter your email"
                                type="email"
                                className='p-2 rounded-lg'
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                    }
                                })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label >Password</label>
                            <input
                                type="password"
                                 className='p-2 rounded-lg'
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />
                        </div>

                        <Button type="submit" className="w-full" children={'Create Account'} />

                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup
