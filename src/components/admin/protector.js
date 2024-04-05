import { useRouter } from 'next/router'
import { useState,useEffect} from "react"

const useAuth = (isAdmin) =>{
  const router = useRouter()
  useEffect(() => {
    if(isAdmin != 'admin'){
    router.push('/authorized')
    }
  },[isAdmin,router])
  return
}
export default useAuth
