import SideBar from "./SideBar"
import Navbar from "./navbar"
import Head from "next/head"
import useAuth from "./protector"
import {useEffect} from "react"
import axios from "axios"
const AdminLayout = ({children}) => {
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
