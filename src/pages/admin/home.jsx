
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/admin/AdminLayout'
import "bootstrap/dist/css/bootstrap.css"
import { useState,useEffect} from "react"
import { Container, Row, Col, Card } from 'react-bootstrap'



const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router = useRouter()
  useEffect(() => {    
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log(isLoggedIn)
    if (!isLoggedIn){
        router.push('/')
    }

})  

  return (
    <>

      <AdminLayout>

      <div class="bg-center bg-cover h-screen p-2 bg-no-repeat bg-blend-multiply">
        <h1>PERPUSTAKAAN SMK PGRI 1 BANYUWANGI</h1>
        <div class="col-md-15 p-5 pt-2">
          <h3><i class="fas fa-tachometer-alt mr-2"></i>Dashboard</h3><hr/>
          <div>
          </div>

          <div>
          <Container fluid className="mt-5"> 
            <Row className="justify-content-normal"> 
                <Col xs={12} md={6} lg={3}> 
                    <Card>                     
                        <Card.Body className='bg-success'> 
                            <Card.Title className="card-title text-white">Daftar Buku</Card.Title> 
                            <Link href="/admin/buku/daftarbuku" className='text-decoration-none'><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></Link>
                        </Card.Body> 
                    </Card> 
                </Col> 
                <Col xs={12} md={6} lg={3}> 
                    <Card> 
                        <Card.Body className='bg-success'> 
                            <Card.Title className="card-title text-white">Tambah Buku</Card.Title>
                            <Link href="/admin/buku/mahasiswa" className='text-decoration-none'><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></Link>
                        </Card.Body> 
                    </Card> 
                </Col>
                <Col xs={12} md={6} lg={3}> 
                    <Card> 
                        <Card.Body className='bg-success'> 
                            <Card.Title className="card-title text-white">Peminjaman Buku</Card.Title>
                            <Link href="/admin/pinjam/peminjaman" className='text-decoration-none'><p className="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></Link>
                        </Card.Body> 
                    </Card> 
                </Col>
                <Col xs={12} md={6} lg={3}> 
                    <Card> 
                        <Card.Body className='bg-success'> 
                            <Card.Title className="card-title text-white">Pengembalian Buku</Card.Title>
                            <Link href="/admin/kembali/pengembalian" className='text-decoration-none'><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></Link>
                        </Card.Body> 
                    </Card> 
                </Col>

            </Row> 
          </Container> 
          </div>

                
          
      
    
          </div>
        </div>
        {/* <div class="flex flex-row text-white">
            <div class="card bg-success" width="18rem">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-user-graduate mr-2"></i>
                </div>
                <h5 class="card-title text-white">Daftar Buku</h5>
                <div class="display-4"></div>
                <a href="/admin/buku/daftarbuku"><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></a>
              </div>
            </div>
            
            <div class="card bg-success ml-3" width="18rem">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-user-graduate mr-2"></i>
                </div>
                <h5 class="card-title text-white">Tambah Buku</h5>
                <div class="display-4"></div>
                <a href="/admin/buku/mahasiswa"><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></a>
              </div>
            </div>
            <div class="card bg-success ml-3" width="18rem">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-user-graduate mr-2"></i>
                </div>
                <h5 class="card-title text-white">Peminjaman Buku</h5>
                <div class="display-4"></div>
                <a href="/admin/pinjam/peminjaman"><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></a>
              </div>
            </div>
            <div class="card bg-success ml-3" width="18rem">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-user-graduate mr-2"></i>
                </div>
                <h5 class="card-title text-white">Pengembalian Buku</h5>
                <div class="display-4"></div>
                <a href="/admin/kembali/pengembalian"><p class="card-text text-white">Lihat Detail<i class="fas fa-angle-double-right ml-2"></i></p></a>
              </div>
            </div>
          </div> */}
        {/* <div className='flex flex-row justify-around mt-5 w-[50%] m-auto py-5  '>
        
          <button className='custom-button bg-blue-600 text-white px-4 py-2'
                  onClick={()=>{router.push('/admin/daftarbuku')}}
          >Daftar Buku</button>
          <button className='bg-blue-600 text-white px-4 py-2'
                  onClick={()=>{router.push('/admin/mahasiswa')}}
          >Tambah Buku</button>
          <button className='bg-blue-600 text-white px-4 py-2'
                  onClick={()=>{router.push('/user/mahasiswa')}}
          >Peminjaman Buku</button>
          <button className='bg-blue-600 text-white px-4 py-2'
                  onClick={()=>{router.push('/user/mahasiswa')}}
          >Pengembalian Buku</button>
        </div> */}
      </AdminLayout>
    </>
  )
}



//App.use(cors({
//  origin: 'http://localhost:5173',
//  Credentials: true,
//}));
