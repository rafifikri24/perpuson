import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";



const Daftarpengembalian = () =>{
    const router = useRouter()
    const[kembali,setKembali]=useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      axios.get("https://perpus-smk-delta.vercel.app/tampil/kembali",config)
      .then((response)=>{
        setKembali(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    } else {
      console.log('not login')
      router.push('/');
    }
    },[])

    const deleteKembali = (id) => {
      var result = confirm("Apakah Anda ingin menghapus data pengembalian buku?")
      const token = localStorage.getItem('tokenjwt');

      if (result) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}
      if (result) {
        axios
        .delete(`https://perpus-smk-delta.vercel.app/hapus/kembali/${id}`,config)
        .then((response) => {
          console.log(response.data);
          setKembali(kembali.filter((item) => item.id_pengembalian !== id));
        })
        .catch((error) => {
          console.log(error);
        });
      };
    }
  }
  const searchKembali = () => {

    try {
      const res = axios.post(`https://perpus-smk-delta.vercel.app/searchKembali?s=${query}`)
      res.then(result =>{
        setKembali(result.data)
      })
      .catch(err=>{console.log(err)})
    } catch (error) {
      console.log(error)
    }
    
  };
  
    return (
        <>
            <AdminLayout>
            <header className="nnavbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 " style={{ height: '3rem', zIndex: 1, padding :'10px',justifyContent: 'center', display:'flex',marginBottom:30 }}>        
            <input
              className="form-control form-control-dark"
              type="text"
              placeholder="Cari Data Siswa"
              aria-label="Search"
              style={{width:'95%',backgroundColor:"#c6ffcf"}}
              onChange={(e)=> {
                searchKembali()
                setQuery(e.target.value)
              }}
               />
            </header>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Kode Transaksi</th>
                    <th>Tanggal Kembali</th>
                    <th>Jumlah Buku Kembali</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {kembali.map((item)=>{
                    const tanggalKembali = new Date(item.tanggal_kembali).toLocaleDateString('en-US')
                    return(
                      <tr key={item.id_pengembalian}>
                        <td>{item.kode_transaksi}</td>
                        <td>{tanggalKembali}</td>
                        <td>{item.jumlah_kembali}</td>
                        <td><button type="submit" class="btn btn-primary" onClick={() => deleteKembali(item.id_pengembalian)}>hapus</button></td>
                        <td>                
                          <Link href={`/admin/kembali/${item.id_pengembalian}`}><button type="submit" class="btn btn-primary">Edit</button></Link>
                        </td>
                      </tr>
                    )

                  })}
                  
                </tbody>
              </Table>
            </div>
            </AdminLayout>
        </>
    )
}

export default Daftarpengembalian