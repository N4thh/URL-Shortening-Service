'use client'

import { useSearchParams } from "next/navigation"

const Dashboard = () => {
  const searchParam = useSearchParams();
  const shortUrl = searchParam.get("short");

  return (
    <div className="p-10 space-y-5">
      <h1 className="text-4xl font-bold">Your Short URL</h1>
      {shortUrl ? (
        <div> 
          {`http://localhost:3000/api/link/${shortUrl}`}
        </div>
      ) : (
      <p>No URL </p>
      )}
    </div>
  )
}

export default Dashboard