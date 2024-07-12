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
                    <Link href="/" className="navbar text-dark text-decoration-none">Perpustakaan SMK PGRI 1 Banyuwangi</Link>
                    </h5>
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
