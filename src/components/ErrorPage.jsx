import React, { useState,useEffect } from 'react'
import { Button } from './ui/button'

export default function ErrorPage() {
    const [reloadPage, setReloadPage] = useState(false);

  const handleClick = () => {
    // Set reloadPage state to true to trigger the effect
    setReloadPage(true);
  };

  useEffect(() => {
    if (reloadPage) {
      // Reload the page
      window.location.reload();
    }
  }, [reloadPage]);
  return (
    <div className='p-5 w-full h-screen flex items-center justify-center flex-col'>
       <h1 className='text-5xl font-extrabold tracking-tight'>OOPS!</h1> 
       <p className='capitalize my-3 bg-red-600 px-2'>something went wrong!</p>
       <button  className="underline" onClick={handleClick}>Try again!</button>
    </div>
  )
}
