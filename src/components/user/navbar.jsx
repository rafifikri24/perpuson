import { useEffect, useReducer, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Head from "next/head"
import axios from "axios";
import { useRouter } from "next/router"

export default function Navbar() {
    const [userName, setUsername] = useState('')
    const router = useRouter()

    const { user } = router.query

    useEffect(() => {
        const username = localStorage.getItem('username');
        setUsername(username)
    })

    const handleLogout = async () => {
        const token = localStorage.getItem('tokenjwt');
        try {
          const response = await axios.post('https://perpus-smk-delta.vercel.app/logout', {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.status === 200) {
            // Lakukan langkah-langkah logout lokal, seperti menghapus token dari penyimpanan lokal
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('tokenjwt');
            window.location='/'
            // Redirect atau tindakan lain sesuai kebutuhan
          } else {
            console.error('Gagal logout');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    return (
        <>
        <Head>
            <title>Perpustakan SMK PGRI 1 Banyuwangi</title>
            <link rel="icon" type="image/png" href="/smkpgri1banyuwangi.png" sizes="32x32" />
            <meta name='description' content='SMK PGRI 1 BANYUWANGI memiliki 4 bidang kejuruan yaitu Teknik Pemesinan, Teknik Kendaraan Ringan, Teknik Elektronika Industri dan AKUNTANSI KEUANGAN dan LEMBAGA.' />
        </Head>
        <nav className="navbar bg-light" style={{ paddingBottom: "20px" }}>
            <div className="container-fluid">
                <a className="navbar-brand text-dark" href={`/${user}/buku/daftarbuku`} >Perpustakaan SMK PGRI Banyuwangi</a>
                <div className="d-flex gap-0 column-gap-3">
                    <div className="dropdown-hidden-md">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="success">{userName}</Button>

                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                            <Dropdown.Menu>
                            <Dropdown.Item href={`/${user}/riwayat/riwayat-user`}>Riwayat Pinjam Buku</Dropdown.Item>
                                <Dropdown.Item href="/admin/editadmin/edit">Ganti Password</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
        <style>
{/*         {`
            @media (max-width: 640px) {
                .dropdown-hidden-md {
                    display: none;
                }
            }
        `} */}
        </style>
        </>
    )
}
