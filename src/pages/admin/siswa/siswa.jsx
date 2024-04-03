import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";



const Mahasiswa = () =>{
    const router = useRouter()
    const nim = router.query.nim
    const[siswa,setSiswa]=useState([])
    const [query, setQuery] = useState('')

    useEffect(()=>{
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      axios.get("https://perpus-smk-delta.vercel.app/tampil/siswa",config)
      .then((response)=>{
        setSiswa(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    } else {
      console.log('not login')
      router.push('/');
    }
  },[])

    const deleteSiswa = (id) => {
      var result = confirm("Apakah Anda ingin menghapus siswa?")
      const token = localStorage.getItem('tokenjwt');

      if (result) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}
        axios
        .delete(`https://perpus-smk-delta.vercel.app/hapus/siswa/${id}`,config)
        .then((response) => {
          console.log(response.data);
          setSiswa(siswa.filter((item) => item.no_induk !== id));
        })
        .catch((error) => {
          console.log(error);
        });
      };
    }

    const searchSiswa = () => {

      try {
        const res = axios.post(`https://perpus-smk-delta.vercel.app/searchSiswa?s=${query}`)
        res.then(result =>{
          setSiswa(result.data)
        })
        .catch(err=>{console.log(err)})
      } catch (error) {
        console.log(error)
      }
      
    };
  
    return (
        <>
            <AdminLayout>
            <header className="navbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 " style={{ height: '3rem', zIndex: 1, padding :'10px',justifyContent: 'center', display:'flex',marginBottom:10 }}>        
            <input
              className="form-control form-control-dark"
              type="text"
              placeholder="Cari Data Siswa"
              aria-label="Search"
              style={{width:'95%',backgroundColor:"#c6ffcf"}}
              onChange={(e)=> {
                searchSiswa()
                setQuery(e.target.value)
              }}
               />
            </header>
            <div className="p-4">
              <div className="table-responsive mirror">
                <Table striped bordered hover className="mirror">
                  <thead>
                    <tr>
                      <th>No Peminjam</th>
                      <th>Nama Peminjam</th>
                      <th>Prodi</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswa.map((item)=>{
                      return(
                        <tr key={item.no_induk}>
                          <td>{item.no_induk}</td>
                          <td>{item.nama}</td>
                          <td>{item.prodi}</td>
                          <td>{item.username}</td>
                          <td><button type="submit" class="btn btn-primary" onClick={() => deleteSiswa(item.no_induk)}>hapus</button></td>
                          <td><button type="submit" class="btn btn-primary" onClick={() => router.push(`/admin/pinjam/pinjambynoinduk/${item.no_induk}`)}>Pinjam</button></td>
                          <td>                
                            <Link href={`/admin/siswa/${item.no_induk}`}><button type="submit" class="btn btn-primary">Edit</button></Link>
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

export default Mahasiswa
