import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import "bootstrap/dist/css/bootstrap.css"
import { useState,useEffect} from "react"
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import NavbarLanding from '@/components/admin/navbarLand'
import axios from 'axios'

export default function Home() {
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
            window.location.href = response.data
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
    <>
      <div>
        <Head>
          <title>Perpustakan SMK PGRI 1 Banyuwangi</title>
          <link rel="icon" type="image/png" href="smkpgri1banyuwangi.png" sizes="32x32" />
          <meta name='description' content='SMK PGRI 1 BANYUWANGI memiliki 4 bidang kejuruan yaitu Teknik Pemesinan, Teknik Kendaraan Ringan, Teknik Elektronika Industri dan AKUNTANSI KEUANGAN dan LEMBAGA.' />
        </Head>
        <NavbarLanding />
        <section className="cover-section">
          <div className="background-image"></div>
          <Container>
            <div className="cover-content">
              <h1>Perpustakan SMK PGRI 1 Banyuwangi</h1>
              <p>Selamat datang di Perpustakaan Online SMK PGRI 1 Banyuwangi! Temukan koleksi buku kami secara cepat dan mudah. Pesan dan nikmati buku yang anda pinjam. Mulailah perjalanan literasi Anda sekarang!</p>
              
              <div className="d-flex align-items-center flex-column gap-3">
              <Button variant='primary' className="custom-button"><a href="login" className="text-decoration-none text-light">Log In</a></Button>
              <Button variant='success'><a href="https://drive.usercontent.google.com/download?id=1NgLi_eZBmHsVN42ovErzElhnTEU---5g&export=download&authuser=0" className="text-decoration-none text-light d-flex align-items-center"><label className="px-2" style={{cursor: 'pointer'}}>Unduh APK</label><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="white" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></a></Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="about-section">
          <Container>
            <h2>Tentang Kami</h2>
            <p>SMK PGRI 1 Banyuwangi memiliki 4 bidang kejuruan yaitu Teknik Pemesinan, Teknik Kendaraan Ringan, Teknik Elektronika Industri dan Akuntansi Keuangan dan Lembaga.</p>
          </Container>
        </section>

        <footer>
          <Container>
            <p>&copy; 2024 Perpustakaan Online SMK PGRI 1 Banyuwangi</p>
          </Container>
        </footer>

        <style jsx>{`
          .cover-section {
            position: relative;
            color: white;
            padding: 100px 0;
          }

          .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/cover.png'); 
            background-size: cover;
            background-position: center;
            filter: brightness(0.5); 
            z-index: -1; 
          }

          .cover-content {
            text-align: center;
            position: relative;
            z-index: 1;
          }

          .about-section {
            padding-top: 3em;
            padding-bottom: 3em;
            background-color: #f8f9fa;
          }

          footer {
            background-color: #343a40;
            color: white;
            text-align: center;
            padding: 20px 0;
          }
        `}</style>
      </div>
    </>
  )
}



//App.use(cors({
//  origin: 'http://localhost:5173',
//  Credentials: true,
//}));
