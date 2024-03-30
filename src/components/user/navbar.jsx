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
    const router = useRouter()
    const [modalShow, setModalShow] = useState(false);

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
    const handleOpenModal = () => {
        setModalShow(true);
      }
    

    function ModalFunction(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Ganti Password
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Username</label>
                        <input type="text" class="form-control" id="Username" placeholder="Username" value='' />
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Password</label>
                        <input type="text" class="form-control" id="Password" placeholder="Password" value='' />
                    </div>
                    <Modal.Footer>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </Modal.Footer>
                </form>
            </Modal.Body>

          </Modal>
        );
      }
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
                                <Dropdown.Item onClick={handleOpenModal}>Ganti Password</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
        <ModalFunction
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
        />

        </>
    )
};
