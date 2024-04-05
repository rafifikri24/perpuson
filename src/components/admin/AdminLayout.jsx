import SideBar from "./SideBar"
import Navbar from "./navbar"
import Head from "next/head"
import {useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/router'
const AdminLayout = ({children}) => {
  const router = useRouter()
  
    useEffect(() => {
    const token = localStorage.getItem('tokenjwt');    
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios.get("https://perpus-smk-delta.vercel.app/get-me", config)
        .then((response) => {
          const isAdmin = response.data.roleToken
            if(isAdmin != 'admin'){
              router.push('/authorized')}
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('not login')
      router.push('/');
    }
  }, [])
    return (
        <>   <Head>
                <title>Perpustakan SMK PGRI 1 Banyuwangi</title>
                <link rel="icon" type="image/png" href="/smkpgri1banyuwangi.png" sizes="32x32" />
                <meta name='description' content='SMK PGRI 1 BANYUWANGI memiliki 4 bidang kejuruan yaitu Teknik Pemesinan, Teknik Kendaraan Ringan, Teknik Elektronika Industri dan AKUNTANSI KEUANGAN dan LEMBAGA.' />
            </Head>
            <SideBar>
                <Navbar/>
                {children}
            </SideBar>
        </>
    )
}

export default AdminLayout
