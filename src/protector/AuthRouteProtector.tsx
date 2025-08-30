'use client'
import Loading from '@/components/Loading'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"


export default function AuthRouteProtector({ children }: { children: React.ReactNode }){
    const router = useRouter()
    const auth = useSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        console.log(auth.loading , auth.user)
        if(!auth.loading && auth.user){
            
        router.push('/')
        }else if(!auth.loading && !auth.user){
            setLoading(auth.loading)
        }
        return ()=>{
            if(!auth.loading && auth.user){
            
        setLoading(auth.loading)
        
        }
        }
    },[auth.loading])

    if(loading){
        return <Loading />
    }

    return (<>{children}</>)
}