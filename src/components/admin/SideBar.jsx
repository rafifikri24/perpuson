import { useState,useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";




const SideBar = ({ children }) => {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [user, setUser] = useState('')

    useEffect(() => {
        const username = localStorage.getItem('username');
        setUser(username)
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
    // const [collapsed, setCollapsed] = useState(false);

    // const toggleSidebar = () => {
    //   setCollapsed(!collapsed);
    // };
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar-multi-level-sidebar');
        if (sidebar) {
          sidebar.classList.toggle('-translate-x-full');
        }
      };

    return (
        <>
            <div>
                <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleSidebar}>
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                    </svg>
                </button>
                <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div  className="h-full px-3 py-3 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
                        <div className="d-flex justify-content-end">
                            <button
                            data-drawer-target="sidebar-multi-level-sidebar"
                            data-drawer-toggle="sidebar-multi-level-sidebar"
                            aria-controls="sidebar-multi-level-sidebar"
                            type="button"
                            className="text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" // or adjust margin accordingly
                            onClick={toggleSidebar}
                            >
                            <span className="sr-only">Close sidebar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/></svg>
                            </button>
                        </div>

                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link href="/admin/home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-decoration-none">
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>
                                    <span className="ml-3 ">Dashboard</span>
                                </Link>
                            </li>
                            
                            <li>
                                <button type="button" className="flex items-center w-full p-2 text-gray-900 transition 
                                                                duration-75 rounded-lg group hover:bg-gray-100 dark:text-white
                                                                dark:hover:bg-gray-700" aria-controls="dropdown-example"
                                    data-collapse-toggle="dropdown-example" onClick={() => { setShow1(!show1) }}>
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zm-5-9V7H8v2h8z"/> </g></svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap" >Buku</span>
                                    <svg  className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>

                                </button>

                                <ul id="dropdown-example" className={`${show1 ? '' : 'hidden'} py-2 space-y-2`}>
                                    <li>
                                        <Link href="/admin/buku/daftarbuku" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Daftar Buku</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/buku/mahasiswa" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Tambah Buku</Link>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <button type="button" className="flex items-center w-full p-2 text-gray-900 transition 
                                                                duration-75 rounded-lg group hover:bg-gray-100 dark:text-white
                                                                dark:hover:bg-gray-700" aria-controls="dropdown-example"
                                    data-collapse-toggle="dropdown-example" onClick={() => { setShow2(!show2) }}>
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
                                    </svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap" >User</span>
                                    <svg  className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>

                                </button>

                                <ul id="dropdown-example" className={`${show2 ? '' : 'hidden'} py-2 space-y-2`}>
                                    <li>
                                        <Link href="/admin/siswa/siswa" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Daftar User</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/siswa/tambahsiswa" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Tambah User</Link>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <button type="button" className="flex items-center w-full p-2 text-gray-900 transition 
                                                                duration-75 rounded-lg group hover:bg-gray-100 dark:text-white
                                                                dark:hover:bg-gray-700" aria-controls="dropdown-example"
                                    data-collapse-toggle="dropdown-example" onClick={() => { setShow3(!show3) }}>
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.354.146a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l1 1a.5.5 0 0 0 .708 0L7 4.207V12H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9V4.207l.646.647a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708l-3-3z"/> <path d="M1 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5a.5.5 0 0 0 0-1H1V8h4.5a.5.5 0 0 0 0-1H1zm9.5 0a.5.5 0 0 0 0 1H15v2h-4.5a.5.5 0 0 0 0 1H15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4.5z"/></svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap" >Peminjaman dan<br/>Pengembalian</span>
                                    <svg  className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>

                                </button>

                                <ul id="dropdown-example" className={`${show3 ? '' : 'hidden'} py-2 space-y-2`}>
                                    <li>
                                        <Link href="/admin/pinjam/daftarpeminjaman" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Riwayat Peminjman Buku</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/pinjam/peminjaman" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Pinjam Buku</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/kembali/pengembalian" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Pengembalian Buku</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/kembali/daftarpengembalian" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-decoration-none">Data Pengembalian Buku</Link>
                                    </li>
                                   
                                </ul>

                            </li>

                    </ul>
                        <hr/>
                            <div className="dropdown-hidden-sidebar">
                            <Dropdown as={ButtonGroup} style={{left:'30%'}}>
                                    <Button variant="success">Admin</Button>

                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                <Dropdown.Item>{user}</Dropdown.Item>
                                <hr/>
                                <Dropdown.Item href="/admin/notification/page">Notifikasi</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                <Dropdown.Item href="/admin/editadmin/edit">Ganti Password</Dropdown.Item>
                                <Dropdown.Item href="/auth/register">Tambah Akun</Dropdown.Item>
                            </Dropdown.Menu>
                                </Dropdown>
                            </div>
                     
                        
                    </div>
                    
                </aside>
                <div className="sm:ml-64">
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
            <style>
        {`  
            .dropdown-hidden-sidebar {
                display: none;
            }
            @media (max-width: 640px) {
                .dropdown-hidden-sidebar {
                    display: block;
                }
            }
        `}
        </style>

        </>
    );
}

export default SideBar;