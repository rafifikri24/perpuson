import { useEffect, useReducer, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import { useRouter } from "next/router"
import  Modal  from "react-bootstrap/Modal";

export default function Navbar() {
    const [userName, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')
    const [nama, setNama] = useState('');
    const [prodi,setProdi] = useState('')
    const [noInduk,setNoInduk] = useState('')
    
    const router = useRouter()
    const [show, setShow] = useState(false);

    const { user } = router.query
    

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/siswa/${user}`)
                setNoInduk(response.data[0].no_induk)
                setNama(response.data[0].nama)
                setProdi(response.data[0].prodi)
                setUsername(response.data[0].username)
    
            } catch (error){
                console.log(error)
            }
        };
        fetchData();
    },[user])

    const handleSubmit = async(a)=> {
        a.preventDefault();
        const data = {
            no_induk : noInduk,
            nama : nama,
            prodi : prodi,
            username : userName,
            password : passwd
        }
        const token = localStorage.getItem('tokenjwt');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(data)

        try {
            const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/siswa/${user}`, data, config);
            console.log(response.data);
            setNoInduk('')
            setNama('')
            setProdi('')
            setUsername('')
            setPasswd('')
            window.location.reload();
        } catch (error) {
            if(error.response.status === 400){
                alert(error.response.data[0].message)
            }else(
                alert("Data Peminjam Tidak Sesuai")
            )
          console.error('Upload failed:', error);
          // Tambahkan tindakan setelah upload gagal, misalnya menampilkan pesan error
        }
    }
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    return (
        <>
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
                                <Dropdown.Item onClick={handleShow}>Profil</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="Nama" class="form-label">No Induk</label>
                    <input type="text" class="form-control" id="Nama" placeholder="No Induk" value={noInduk} onChange={(a) => setUsername(a.target.value)} disabled/>
                </div>
                <div class="mb-3">
                    <label for="Nama" class="form-label">Nama Peminjam</label>
                    <input type="text" class="form-control" id="Nama" placeholder="Nama Peminjam" value={nama} onChange={(a) => setNama(a.target.value)} required/>
                </div>
                <div class="mb-3">
                    <label for="Prodi" class="form-label">Prodi</label>
                    <input type="text" class="form-control" id="Prodi" placeholder="Prodi" value={prodi} onChange={(a) => setProdi(a.target.value)} required/>
                </div>
                <div class="mb-3">
                    <label for="Prodi" class="form-label">Username</label>
                    <input type="text" class="form-control" id="Prodi" placeholder="Username" value={userName} onChange={(a) => setUsername(a.target.value)} required/>
                </div>
                <div class="mb-3">
                    <label for="Prodi" class="form-label">Password</label>
                    <input type="password" class="form-control" id="Prodi" placeholder="Password" onChange={(a) => setPasswd(a.target.value)} required/>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-end">
                    <button type="submit" class="btn btn-primary mx-2">Submit</button>
                    <button variant="secondary" class="btn btn-secondary mx-2" onClick={handleClose}>Close</button>
                </div>
            </form>
        </Modal.Body>
        </Modal>
        </>
    )
};
