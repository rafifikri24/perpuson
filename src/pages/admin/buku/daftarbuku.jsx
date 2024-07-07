import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import QRCode from 'qrcode.react';
import  Modal  from "react-bootstrap/Modal";



const Daftarbuku = () =>{
    const router = useRouter()
    const [buku,setBuku] = useState([])
    const [show, setShow] = useState(false);
    const [judul,setJudulBuku] = useState('')
    const [kode,setKodeBuku] = useState('')
    const [quantity, setQuantity] = useState(0);

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
    const handleClose = () => setShow(false);
    const handleShow = (kode_buku) => {
      setShow(true);
      const selectedBook = buku.find(item => item.kode_buku === kode_buku);
      setJudulBuku(selectedBook.judul_buku)
      setKodeBuku(selectedBook.kode_buku)
    }
    

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
                <button type="submit" className="btn btn-success" style={{marginBottom:15}} onClick={() => router.push(`/admin/buku/cetak/printall/semua`)}>Cetak Semua</button>
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
                            <td>
                              <button 
                                type="submit" 
                                className="btn btn-primary" 
                                onClick={() => {
                                  if (item.stok === 0) {
                                    alert('Stok habis! Tidak bisa meminjam.');
                                  } else {
                                    router.push(`/admin/pinjam/pinjambuku/${item.kode_buku}`);
                                  }
                                }}
                              >
                                Pinjam
                              </button>
                            </td>
                            <td><button type="submit" className="btn btn-danger" onClick={() => deletePmnjm(item.kode_buku)}>Hapus</button></td>
                            <td>                
                              <Link href={`/admin/buku/${item.kode_buku}`}><button type="submit" className="btn btn-secondary">Edit</button></Link>
                            </td>
                            <td>
                            <button type="submit" className="btn btn-success" onClick={() => handleShow(item.kode_buku)}>Cetak</button>
                            {/* <button type="submit" className="btn btn-success" onClick={() => router.push(`/admin/buku/cetak/${item.kode_buku}`)}>Cetak</button> */}
                            </td>
                              
                          </tr>
                        )

                      })}
                      
                    </tbody>
                  </Table>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Cetak Stiker</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="mb-3">
                        <label htmlFor="judul" className="form-label">Judul Buku</label>
                        <input type="text" className="form-control" id="judul" placeholder="Judul Buku" value={judul} disabled/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Jumlah yang ingin dicetak</label>
                        <input type="number" className="form-control" id="quantity" placeholder="Jumlah stiker" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                      </div>
                      <div className="d-flex flex-wrap align-items-center justify-content-end">
                        <button className="btn btn-primary mx-2" onClick={() => router.push(`/admin/buku/cetak/printbyid/${kode}?quantity=${quantity}`)}>Cetak</button>
                        <button variant="secondary" className="btn btn-secondary mx-2" onClick={handleClose}>Close</button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </AdminLayout>
        </>
    )
}

export default Daftarbuku
