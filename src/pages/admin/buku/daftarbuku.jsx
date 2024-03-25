import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import QRCode from 'qrcode.react';



const Daftarbuku = () =>{
    const router = useRouter()
    const[buku,setBuku]=useState([])

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
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

    const deletePmnjm = (id) => {
      var result = confirm("Apakah Anda ingin menghapus buku?")
      const token = localStorage.getItem('tokenjwt');

      if (result) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}
        axios
        .delete(`https://perpus-smk-delta.vercel.app/hapus/book/${id}`,config)
        .then((response) => {
          console.log(response.data);
          setBuku(buku.filter((item) => item.kode_buku !== id));
        })
        .catch((error) => {
          console.log(error);
        });
      };
    }

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
            <AdminLayout>
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
                <button type="submit" class="btn btn-success" style={{marginBottom:15}} onClick={() => router.push(`/admin/buku/cetak/semua`)}>Cetak Semua</button>
                <div className="table-responsive">
                  <Table striped bordered hover>
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
                            <td><button type="submit" class="btn btn-primary" onClick={() => router.push(`/admin/pinjam/pinjambuku/${item.kode_buku}`)}>Pinjam</button></td>
                            <td><button type="submit" class="btn btn-danger" onClick={() => deletePmnjm(item.kode_buku)}>Hapus</button></td>
                            <td>                
                              <Link href={`/admin/buku/${item.kode_buku}`}><button type="submit" class="btn btn-secondary">Edit</button></Link>
                            </td>
                            <td>
                            <button type="submit" class="btn btn-success" onClick={() => router.push(`/admin/buku/cetak/${item.kode_buku}`)}>Cetak</button>
                            </td>
                              
                          </tr>
                        )

                      })}
                      
                    </tbody>
                  </Table>
                </div>
              </div>
            </AdminLayout>
        </>
    )
}

export default Daftarbuku