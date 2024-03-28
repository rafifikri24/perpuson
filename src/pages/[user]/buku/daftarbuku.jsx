import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import QRCode from 'qrcode.react';
import Navbar from "@/components/user/navbar"



const DaftarBuku = () =>{
    const router = useRouter()
    const[buku,setBuku]=useState([])
    const { user } = router.query


    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const token = localStorage.getItem('tokenjwt');
      
      if (isLoggedIn && token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
  
        axios.get("https://perpus-smk-delta.vercel.app/tampil/book", config)
          .then((response) => {
            setBuku(response.data); // Assuming setBuku is a function to set your book data
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('not login')
        router.push('/');
      }
    }, [])


    const [query, setQuery] = useState('')
  
    const searchBook = () => {

      try {
        const res = axios.post(`https://perpus-smk-delta.vercel.app/searchBook?s=${query}`)
        res.then(result =>{
          setBuku(result.data)
        })
        .catch(err=>{console.log(err)})
      } catch (error) {
        console.log(error)
      }
      
    };

       return (
        <>
          <Navbar/>
            <header className="navbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 " style={{ height: '3rem', zIndex: 1, padding :'10px',justifyContent: 'center', display:'flex',marginBottom:5}}>        
              <input
                className="form-control form-control-dark"
                type="text"
                placeholder="Cari Buku"
                aria-label="Search"
                style={{width:'95%',backgroundColor:"#c6ffcf"}}
                onChange={(e)=> {
                  searchBook()
                  setQuery(e.target.value)
                }}
            />
            </header>
            
          <div className="p-4">
            <div className="table-responsive mirror">
              <Table striped bordered hover className="mirror">
                <thead>
                  <tr>
                    <th>Kode Buku</th>
                    <th>Barcode</th>
                    <th>Judul Buku</th>
                    <th>Kategori</th>
                    <th>ISBN</th>
                    <th>Stock</th>
                    <th>Pengarang</th>
                    <th>Penerbit</th>
                    <th>Tahun Terbit</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {buku.map((item)=>{
                    const qrValue = `${item.kode_buku}`
                    return(
                      <tr key={item.kode_buku}>
                        <td>{item.kode_buku}</td>
                        <td>{<QRCode value={qrValue} />}</td>
                        <td>{item.judul_buku}</td>
                        <td>{item.kategori}</td>
                        <td>{item.isbn}</td>
                        <td>{item.stok}</td>
                        <td>{item.pengarang}</td>
                        <td>{item.penerbit}</td>
                        <td>{item.tahun_terbit}</td>
                        <td><button type="submit" class="btn btn-primary" onClick={() => router.push(`/${user}/pinjam/${item.kode_buku}`)}>Pinjam</button></td>                             
                      </tr>
                    )

                  })}
                  
                </tbody>
              </Table>
            </div>
          </div>

        </>
    )
}

export default DaftarBuku
