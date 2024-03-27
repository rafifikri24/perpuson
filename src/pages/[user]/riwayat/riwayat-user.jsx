import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import Navbar from "@/components/user/navbar"



const Daftarpeminjaman = () =>{
    const router = useRouter()
    const[trx,setTrx]=useState([])
    const [query, setQuery] = useState('')

    const { user } = router.query

    useEffect(() => {
      const username = localStorage.getItem('username')
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      axios.get(`https://perpus-smk-delta.vercel.app/riwayat-user/${username}`,config)
      .then((response)=>{
        setTrx(response.data)
        localStorage.setItem('riwayat_pinjam',trx)
      })
      .catch((error)=>{
        console.log(error)
      })
    }else {
      console.log('not login')
      router.push('/');
    }
  },[])

    const kembalikanBuku = (id) => {
      const token = localStorage.getItem('tokenjwt');

      if (result) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}

      if (result) {
        axios
        .delete(`https://perpus-smk-delta.vercel.app/hapus/trx/${id}`,config)
        .then((response) => {
          console.log(response.data);
          setTrx(trx.filter((item) => item.kode_transaksi !== id));
        })
        .catch((error) => {
          console.log(error);
        });
      };
    }
  }

  const searchPinjam = () => {

    try {
      const res = axios.post(`https://perpus-smk-delta.vercel.app/searchPinjamUser/${user}?s=${query}`)
      res.then(result =>{
        setTrx(result.data)
      })
      .catch(err=>{console.log(err)})
    } catch (error) {
      console.log(error)
    }
    
  };

  
    return (
        <>
            <Navbar/>
                <header className="navbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 " style={{ height: '3rem', zIndex: 1, padding :'10px',justifyContent: 'center', display:'flex',marginBottom:10 }}>        
                <input
                  className="form-control form-control-dark"
                  type="text"
                  placeholder="Cari Data Pinjaman Buku"
                  aria-label="Search"
                  style={{width:'95%',backgroundColor:"#c6ffcf"}}
                  onChange={(e)=> {
                    searchPinjam()
                    setQuery(e.target.value)
                  }}
                  />
                </header>
                <div className="p-4">
                <button onClick={() => {window.print(); return false}} className="btn btn-success">Cetak Laporan</button>
                  <div className="table-responsive">
                  <Table striped bordered hover className="no-print" style={{marginTop:'5px'}}>
                    <thead>
                      <tr>
                        <th>Kode Transaksi</th>
                        <th>No Induk</th>
                        <th style={{width:'100%'}}>Nama Peminjam</th>
                        <th style={{width:'100%'}}>Judul Buku</th>
                        <th>Jumlah Pinjam</th>
                        <th>Jumlah Buku Kembali</th>
                        <th>Tanggal Pinjam</th>
                        <th>Tanggal Kembali</th>
                        <th>Status Peminjaman</th>
                        <th>Status Pengembalian</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {trx.map((item)=>{
                        const today = new Date();
                        const tenggat = new Date(item.tanggal_kembali)
                        const tanggalPinjam = new Date(item.tanggal_pinjam).toLocaleDateString('id-ID')
                        const tanggalKembali = new Date(item.tanggal_kembali).toLocaleDateString('id-ID')
                        const checkTanggal = tenggat - today
                        const durasiPinjam = Math.floor(checkTanggal / (1000 * 60 * 60 * 24));
                        let status 
                        let color
                        let statusPinjam
                        let colorPinjam

                        if (item.jumlah_pinjam === item.jumlah_kembali){
                          status = 'Sudah Kembali'
                          color = '#28a745'
                        }else{            
                          status = 'Belum Kembali'
                          color = '#444444'
                          if (status == 'Belum Kembali' && durasiPinjam < 0) {
                            status = 'Harus Kembali'
                            color = '#D21312'
                          }          
                        }
                        if (item.status_pinjam === 0){
                          statusPinjam = 'Buku Sudah Siap'
                          color = '#28a745'
                        }else{
                            statusPinjam = 'Buku Tidak Siap'
                            color = '##D21312'
                        }
                        return(
                          <tr key={item.kode_transaksi} >
                            <td>{item.kode_transaksi}</td>
                            <td>{item.no_induk}</td>
                            <td>{item.nama}</td>
                            <td><p style={{width:'500px'}}>{item.judul_buku}</p></td>
                            <td className="text-center">{item.jumlah_pinjam}</td>
                            <td className="text-center">{item.jumlah_kembali}</td>
                            <td>{tanggalPinjam}</td>
                            <td>{tanggalKembali}</td>
                            <td className="text-center text-light fw-bold" style={{backgroundColor:colorPinjam}}>{statusPinjam}</td>
                            <td style={{backgroundColor:color,width:'100px',height:'50px', textShadow:'-1px -1px 0 #000,	1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000',fontSize:'15px',fontWeight:'bold', color:'white'}}>
                              <div className="d-flex align-items-center text-center" style={{height:'100%'}}>{status}</div></td>
                            <td>
                              <div>
                              <button type="submit" className="btn btn-primary" onClick={() => kembalikanBuku(item.kode_transaksi)}> Kembalikan </button>
                              </div>
                            </td>
                            <td>                
                              <Link href={`/admin/pinjam/print/${item.kode_transaksi}`}><button type="submit" className="btn">Cetak</button></Link>
                            </td>
                          </tr>
                        )

                      })}
                      
                    </tbody>
                  </Table>

                  </div>
                </div>

    <style>
  {`
  .print-section {display: none}
  
  @page {
    size: A4 landscape;
  }
  @media print {
    body * {
      visibility: hidden;
    }
    .print-section,
    .print-section * {
      visibility: visible;
    }
    .print-section {
      display: block;
      font-size: 12px;
      margin-top: 0%;
      position: absolute;
      left: 0;
      top: 0;
      /* ... properti lainnya ... */
    }
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    th,td{
      text-align: center; 
      vertical-align: middle;
    }
    .no-print {
      display: none;
    }
  }
  `}
</style>
        </>
    )
}

export default Daftarpeminjaman

