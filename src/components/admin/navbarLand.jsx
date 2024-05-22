import { useEffect, useReducer, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router"

export default function NavbarLanding() {
   
    return (
        <>
        <nav className="navbar bg-light" style={{ paddingBottom: "20px" }}>
            <div className="container" style={{ justifyContent: "space-between"}}>
                <div className="d-flex align-items-center">
                    <img src="smkpgri1banyuwangi.png" alt="Logo" style={{ marginRight: "10px" }} width={50} height={50}/>
                    <h5 style={{margin: 0}}>
                    <Link href="/" className="navbar text-dark text-decoration-none">Perpustakaan SMK PGRI Banyuwangi</Link>
                    </h5>
                </div>
                <div className="d-flex">
                    <Button variant="success"><a href="login" className="text-decoration-none text-light d-flex align-items-center"><label className="px-2">Unduh APK</label><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="white" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></a></Button>
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
                h5 {
                    font-size : 1.15em
                }
            }
        `}
        </style>
        </>
    )
}
