import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";



const Daftarpeminjaman = () =>{
    const router = useRouter()
    const[trx,setTrx]=useState([])
    const [query, setQuery] = useState('')
    const [formData, setFormData] = useState({
      startDate: '',
      endDate: ''
    });

    useEffect(() => {
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      axios.get("https://perpus-smk-delta.vercel.app/tampil/stok/red-history",config)
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

    const deleteTrx = (id) => {
      var result = confirm("Apakah Anda ingin menghapus data peminjaman buku?")
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
      const res = axios.post(`https://perpus-smk-delta.vercel.app/searchPinjam?s=${query}`)
      res.then(result =>{
        setTrx(result.data)
      })
      .catch(err=>{console.log(err)})
    } catch (error) {
      console.log(error)
    }
    
  };
  
  const handleFilterTanggal =async(a)=>{
    a.preventDefault();
    const token = localStorage.getItem('tokenjwt');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }


    try {
      const response = await axios.post('https://perpus-smk-delta.vercel.app/tampil/trxbytgl', formData,config);
      setTrx(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
    return (
        <>
            <AdminLayout>
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
                <form onSubmit={handleFilterTanggal} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginLeft: '10px' }}>
                  <div style={{ margin:10,}}>
                    <input
                      required
                      type="date"
                      name="startDate"
                      style={{ border: 'solid 1px black', width:'15em', borderRadius: '10px', padding: '5px' }}
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <span style={{ margin: '0 10px' }}>Sampai</span>
                  <div style={{ margin: 10,}}>
                    <input
                      required
                      type="date"
                      name="endDate"
                      style={{ border: 'solid 1px black', width:'15em' ,borderRadius: '10px', padding: '5px' }}
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success" style={{ margin:'10px' }}>Submit</button>
                </form>

                <div className="p-4">
                    <div className="d-flex gap-3">
                        <button onClick={() => {window.print(); return false}} className="btn btn-success"> Cetak Laporan </button>
                        <button onClick={() => {router.push('/admin/pinjam/daftarpeminjaman')}} className="btn btn-success"> Daftar Riwayat Peminjaman Buku </button>
                    </div>
                    <div className="table-responsive mirror">
                        <Table striped bordered hover className="no-print mirror" style={{marginTop:'5px'}}>
                            <thead>
                              <tr>
                                <th>Kode Transaksi</th>
                                <th>No Induk</th>
                                <th>Nama Peminjam</th>
                                <th>Kode Buku</th>
                                <th>Judul Buku</th>
                                <th>Pengarang Buku</th>
                                <th>Penerbit Buku</th>
                                <th>Tahun Terbit Buku</th>
                                <th>Jumlah Pinjam</th>
                                <th>Jumlah Buku Kembali</th>
                                <th>Tanggal Pinjam</th>
                                <th>Tanggal Kembali</th>
                                <th>Status</th>
                                
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
                                  if(status == 'Harus Kembali'){
                                    return(
                                  <tr key={item.kode_transaksi}>
                                    <td>{item.kode_transaksi}</td>
                                    <td>{item.no_induk}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.kode_buku}</td>
                                    <td><p style={{width:'500px'}}>{item.judul_buku}</p></td>
                                    <td>{item.pengarang}</td>
                                    <td>{item.penerbit}</td>
                                    <td>{item.tahun_terbit}</td>
                                    <td>{item.jumlah_pinjam}</td>
                                    <td>{item.jumlah_kembali}</td>
                                    <td>{tanggalPinjam}</td>
                                    <td>{tanggalKembali}</td>
                                    <td style={{backgroundColor:color,width:'100px',height:'50px', textShadow:'-1px -1px 0 #000,	1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000',fontSize:'15px',fontWeight:'bold', color:'white'}}>
                                      <div className="d-flex align-items-center text-center" style={{height:'100%'}}>{status}</div></td>
                                    <td><button type="submit" className="btn btn-primary" onClick={() => deleteTrx(item.kode_transaksi)}>hapus</button></td>
                                    <td>                
                                      <Link href={`/admin/pinjam/print/${item.kode_transaksi}`}><button type="submit" className="btn">Cetak</button></Link>
                                    </td>
                                  </tr>
                                  )
                                  }else{
                                    return null
                                  }
        
                              })}
                              
                            </tbody>
                          </Table>
                    </div>

                  </div>
            </AdminLayout>

  {/* for Print */}
  <center>
    <table className="print-section">   
    
      <thead>
        <tr>
          <th>Kode Transaksi</th>
          <th>No Induk</th>
          <th>Nama Peminjam</th>
          <th>Kode Buku</th>
          <th>Judul Buku</th>
          <th>Pengarang Buku</th>
          <th>Penerbit Buku</th>
          <th>Tahun Terbit Buku</th>
          <th>Jumlah Pinjam</th>
          <th>Jumlah Buku Kembali</th>
          <th>Tanggal Pinjam</th>
          <th>Tanggal Kembali</th>
          <th>Status</th>
          
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
              if(status == 'Harus Kembali'){
                return(
              <tr key={item.kode_transaksi}>
                <td>{item.kode_transaksi}</td>
                <td>{item.no_induk}</td>
                <td>{item.nama}</td>
                <td>{item.kode_buku}</td>
                <td><p style={{width:'500px'}}>{item.judul_buku}</p></td>
                <td>{item.pengarang}</td>
                <td>{item.penerbit}</td>
                <td>{item.tahun_terbit}</td>
                <td>{item.jumlah_pinjam}</td>
                <td>{item.jumlah_kembali}</td>
                <td>{tanggalPinjam}</td>
                <td>{tanggalKembali}</td>
                <td style={{backgroundColor:color,width:'100px',height:'50px', textShadow:'-1px -1px 0 #000,	1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000',fontSize:'15px',fontWeight:'bold', color:'white'}}>
                  <div className="d-flex align-items-center text-center" style={{height:'100%'}}>{status}</div></td>
                <td><button type="submit" className="btn btn-primary" onClick={() => deleteTrx(item.kode_transaksi)}>hapus</button></td>
                <td>                
                  <Link href={`/admin/pinjam/print/${item.kode_transaksi}`}><button type="submit" className="btn">Cetak</button></Link>
                </td>
              </tr>
              )
              }else{
                return null
              }

          })}
          
        </tbody>
      
    </table>
    </center>
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

