import { useEffect, useReducer, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router"

export default function Navbar() {
    const [user, setUser] = useState('')
    const[count,setCount]=useState([])
    const router = useRouter()
    useEffect(() => {
        const username = localStorage.getItem('username');
        setUser(username)
    })

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const token = localStorage.getItem('tokenjwt');
        
        if (isLoggedIn && token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
    
          axios.get("https://perpus-smk-delta.vercel.app/count-notif", config)
            .then((response) => {
              setCount(response.data); // Assuming setCount is a function to set your book data
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('not login')
          router.push('/');
        }
      }, [])

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
        <nav className="navbar bg-light" style={{ paddingBottom: "20px" }}>
            <div className="container-fluid">
                <h5><Link href="/admin/home" className="navbar text-dark text-decoration-none">Perpustakaan SMK PGRI Banyuwangi</Link></h5>
                <div className="d-flex gap-0 column-gap-3">
                {/* <button className="notification">
                    <h6 className="count position-absolute">
                        20
                    </h6>
                    <Link href="/admin/notification/page" className="text-success" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c4.97 0 9 4.043 9 9.031V20H3v-8.969C3 6.043 7.03 2 12 2M9.5 21h5a2.5 2.5 0 0 1-5 0"/></svg>
                    </Link>
                </button> */}

          <div className="me-2 notification">
              <button type="button" className="position-relative">
                  <Link href="/admin/notification/page" className="text-success">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12 2c4.97 0 9 4.043 9 9.031V20H3v-8.969C3 6.043 7.03 2 12 2M9.5 21h5a2.5 2.5 0 0 1-5 0" />
                      </svg>
                  </Link>
                  {count.map((item) => (
                      <span key={item.id} className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger mt-2">
                          {item.Jumlah !== 0 ? (
                              <>{item.Jumlah}<span className="visually-hidden">unread messages</span></>
                          ) : null}
                      </span>
                  ))}
              </button>
          </div>


                    <div className="dropdown-hidden-md">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="success">Admin</Button>

                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                            <Dropdown.Menu>
                                <Dropdown.Item>{user}</Dropdown.Item>
                                <hr/>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                <Dropdown.Item href="/admin/editadmin/edit">Ganti Password</Dropdown.Item>
                                <Dropdown.Item href="/auth/register">Tambah Akun</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
        <style>
        {`
            @media (max-width: 640px) {
                .dropdown-hidden-md {
                    display: none;
                }
                .notification {
                    display: none;
                }
            }
        `}
        </style>
        </>
    )
}
