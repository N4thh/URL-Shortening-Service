'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

type CountItem = {
  _count: { country: number } | { deviceType: number };
};

type VisitData = {
  ip: string | null;
  country: string | null;
  browser: string | null;
  os: string | null;
  deviceType: string | null;
  createdAt: string;
};

type AnalyticsData = {
  shortUrl: string;
  originalUrl: string;
  totalVisits: number;
  visit: VisitData[] | null;
  countCountry: { country: string | null; _count: { country: number } }[];
  countDeviceType: { deviceType: string | null; _count: { deviceType: number } }[];
};

const Dashboard = () => {
  const searchParam = useSearchParams();
  const shortUrl = searchParam.get("short");
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);  useEffect(() =>{
    
    const fetchAnalytics = async () => {
      if(!shortUrl) return; 
      
      setLoading(true); 
      try{
        const res = await fetch(`/api/link/${shortUrl}/analytics`, {
          method: 'GET', 
          headers: {'Content-Type' : 'application/json'},
        })
        const data = await res.json(); 

        if(!res.ok) { 
          throw new Error(data.error || data.message || "Get visit information failed") 
        }
        setAnalytics(data.data)

      } catch(err: unknown) { 
          if(err instanceof Error) {
              setError(err.message)
          }        
      } finally { 
        setLoading(false)
      }
    };
    fetchAnalytics();
  }, [shortUrl])

  return (
    <div className="p-10 space-y-5">
      <h1 className="text-4xl font-bold">Link Analytics</h1>    
      {/* URL border */}
      <div className="border rounded-xl p-4 space-y-4">
        <div>
          <p>Short URL</p>
          {shortUrl ? (
            <div className="text-[#3eb489] bg-[#e8f5f0] border rounded-lg p-2 w-fit ">
              {`http://localhost:3000/api/link/${shortUrl}`}
            </div>
          ) : (
            <p>No URL </p>
          )}
        </div>
        
        <div className="space-y-2">
          <p>Original URL</p>
          {analytics && <div>{analytics.originalUrl}</div>}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>
            {analytics?.visit?.[1]?.createdAt
              ? `Created ${new Date(analytics.visit[1].createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}`
              : "—"}
          </span>
        </div>
      </div>
      {/* 3 */}
      <div className="flex space-x-12">
        <div className="border rounded-xl flex-1 p-4 space-y-4">
          <p>Total Clicks</p>
          <p className="font-semibold text-3xl text-[#3eb489]">{analytics?.totalVisits ?? 0}</p>
        </div>

        <div className="border rounded-xl flex-1 p-4 space-y-4">
          <p>Device Types</p>
          <p className="font-semibold text-3xl">{analytics?.countCountry?.length ?? 0}</p>
        </div>

        <div className="border rounded-xl flex-1 p-4 space-y-4">
          <p>Location</p>
          <p className="font-semibold text-3xl">{analytics?.countDeviceType?.length ?? 0}</p>
        </div>
      </div>
                
      <div className="flex space-x-12">
        <div className="border rounded-3xl flex-1 p-4 space-y-2">
          <div className="space-y-3">
            <p className="font-semibold text-2xl px-4">Devices</p>
            <hr />
          </div>

          <div className="space-y-2">
            {analytics?.visit?.length ? analytics.visit.map((v, index) => (
              <div key={index}>
                <p>{v.deviceType}</p>
              </div>
            )) : <p className="text-gray-400 text-sm">No device data yet</p>}
          </div>
        </div>

        <div className="border rounded-3xl flex-1 p-4 space-y-2">
          <div className="space-y-3">
            <p className="font-semibold text-2xl px-4">Locations</p>
            <hr />
          </div>

          <div className="space-y-2">
            {analytics?.visit?.length ? analytics.visit.map((v, index) => (
              <div key={index}>
                <p>{v.country}</p>
              </div>
            )) : <p className="text-gray-400 text-sm">No location data yet</p>}
          </div>
        </div>
      </div>

      <div className="flex space-x-12">
        <div className="border rounded-3xl flex-1 p-4 space-y-2">
          <div className="space-y-3">
            <p className="font-semibold text-2xl px-4">Browsers</p>
            <hr/>
          </div>
  
          <div className="space-y-2">
            {analytics?.visit?.length ? analytics.visit.map((v, index) => (
              <div key={index}>
                <p>{v.browser}</p>
              </div>
            )) : <p className="text-gray-400 text-sm">No browser data yet</p>}
          </div>
        </div>

        <div className="border rounded-3xl flex-1 p-4 space-y-2">
          <div className="space-y-3">
            <p className="font-semibold text-2xl px-4">Operating Systems</p>
            <hr/>
          </div>

          <div className="space-y-2">
            {analytics?.visit?.length ? analytics.visit.map((v, index) => (
              <div key={index}>
                <p>{v.os}</p>
              </div>
            )) : <p className="text-gray-400 text-sm">No operating system data yet</p>}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard