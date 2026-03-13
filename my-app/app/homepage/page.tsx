'use client'
import React, { SyntheticEvent } from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
    //data
    const router = useRouter(); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setisLoading] = useState(false);
    const [formData, setFormData] = useState ({
        original: '',
    })

    const hasValue = formData.original.trim() !== "";
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target; 
        setFormData( prev => ({
          ...prev, 
          [name] : value,
        }));
    }

    const handleSubmit = async (e: SyntheticEvent) =>{
        e.preventDefault();
        setError('')
        setSuccess('')
        setisLoading(true)

        try{
          const res = await fetch('/api/link', {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
          })

          const data = await res.json();
          if(!res.ok){ 
              throw new Error(data.error || data.message || "Login failed")
          }
          const shortUrl = data.short_url;
          
          setSuccess('Login successfully');
          router.push (`/dashboard?short=${shortUrl}`)
        }catch (err: unknown) {
          if(err instanceof Error) {
              setError(err.message)
          }else{
              setError('Something went wrong. Try again!');
          }  
        }finally {
          setisLoading(false)
        }
    }
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center space-y-5">
        <p className="text-7xl font-semibold">Shorten your links</p> 
        <p className="text-xl text-gray-500">Create short, trackable links in seconds</p>
      </div>

      <form className="flex space-x-4"      
            onSubmit={handleSubmit}>

        <input className="w-full p-4 border rounded-2xl
        outline-none transition-colors duration-100 focus:border-[#3eb489] focus:ring-4 forcus: ring-[#3eb489]/20"
        onChange={handleChange}
        name="original"
        value={formData.original}
        placeholder="Past your long URL here..."
        type="text"/>

        <button className= {`p-4 border-[#9cd8c2] rounded-2xl transition-colors 
        ${hasValue ? "bg-[#3eb489]" : "bg-[#9cd8c2]"}`}
        type='submit'
   
        disabled ={loading}
        >{loading ? "Shortening... ": "Shorten" }</button>


      </form>
        <div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>} 
        </div>  
    </div>
  )
}

export default HomePage