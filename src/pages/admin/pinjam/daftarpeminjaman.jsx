import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const Daftarpeminjaman = () =>{
    const router = useRouter()
    const[trx,setTrx]=useState([])
    const [query, setQuery] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [selectedNotifId, setSelectedNotifId] = useState(null);
    const [formData, setFormData] = useState({
      startDate: '',
      endDate: ''
    });

    const handleOpenModal = async (notifId) => {
      console.log(notifId)
      setSelectedNotifId(notifId);
      setModalShow(true);
    }

    useEffect(() => {
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      axios.get("https://perpus-smk-delta.vercel.app/tampil/stok/all-history",config)
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

  function ModalFunction(props) {
    if (!selectedNotifId) {
      return null;
    }
    const selectedTransaction = trx.find(item => item.kode_transaksi === selectedNotifId);
    const tanggal_Pinjam = new Date(selectedTransaction.tanggal_pinjam).toLocaleDateString('id-ID')
    const tanggal_Kembali = new Date(selectedTransaction.tanggal_kembali).toLocaleDateString('id-ID')
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reservasi Peminjaman Buku
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Dari : {selectedTransaction.nama}</h4>
            <table class="table">
              <tbody>            
                    
                      <tr>
                      <th scope="row">Kode Tranasaksi Pinjam</th>
                      <td>{selectedTransaction.kode_transaksi}</td>
                    </tr>
                    <tr>
                      <th scope="row">No induk Peminjam</th>
                      <td>{selectedTransaction.no_induk}</td>
                    </tr>
                    <tr>
                      <th scope="row">Nama Peminjam</th>
                      <td>{selectedTransaction.nama}</td>
                    </tr>
                    <tr>
                      <th scope="row">Prodi</th>
                      <td>{selectedTransaction.prodi}</td>
                    </tr>
                    <tr>
                      <th scope="row">Kode Buku Yang di Pinjam</th>
                      <td>{selectedTransaction.kode_buku}</td>
                    </tr>
                    <tr>
                      <th scope="row">Judul Buku</th>
                      <td>{selectedTransaction.judul_buku}</td>
                    </tr>
                    <tr>
                      <th scope="row">Jumlah Pinjam</th>
                      <td>{selectedTransaction.jumlah_pinjam}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tangal Pinjam</th>
                      <td>{tanggal_Pinjam}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tangal Kembali</th>
                      <td>{tanggal_Kembali}</td>
                    </tr>
              </tbody>
            </table>
        </Modal.Body>
       <Modal.Footer>
          <Button>Buku Siap</Button>
          <Button>Buku Tidak Siap</Button>
        </Modal.Footer>
      </Modal>
    );
  }
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
                  <button onClick={() => {window.print(); return false}} className="btn btn-success">Cetak Laporan</button>
                  <button onClick={() => {router.push('/admin/pinjam/daftarMerah')}} className="btn btn-danger">Daftar Buku Harus Kembali</button>
                  </div>
                  <div className="table-responsive">
                  <Table striped bordered hover className="no-print" style={{marginTop:'5px'}}>
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
                        <th>Status Buku</th>
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

                        let statusPinjam
                        let colorPinjam

                        if (item.status_pinjam === 0){
                          statusPinjam = 'Buku Sudah Siap'
                          colorPinjam = '#28a745'
                        }else{
                            statusPinjam = 'Buku Tidak Siap'
                            colorPinjam = '#D21312'
                        }

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
                            <td className="text-center text-light fw-bold" style={{backgroundColor:colorPinjam,width:'100px',height:'50px'}}>{statusPinjam}</td>
                           
                            <td style={{backgroundColor:color,width:'100px',height:'50px', textShadow:'-1px -1px 0 #000,	1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000',fontSize:'15px',fontWeight:'bold', color:'white'}}>
                              <div className="d-flex align-items-center text-center" style={{height:'100%'}}>{status}</div></td>
                            <td><button type="submit" className="btn btn-primary" onClick={() => deleteTrx(item.kode_transaksi)}>hapus</button></td>
                            <td><button className="btn btn-primary"  onClick={() => handleOpenModal(item.kode_transaksi)}>Lihat</button></td>
                            <td>                
                              <Link href={`/admin/pinjam/print/${item.kode_transaksi}`}><button type="submit" className="btn">Cetak</button></Link>
                            </td>
                          </tr>
                        )

                      })}
                      
                    </tbody>
                  </Table>
                  <ModalFunction
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              window.location.reload();
            }}
        />

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

          return(
            <tr key={item.kode_transaksi}>
              <td>{item.kode_transaksi}</td>
              <td>{item.no_induk}</td>
              <td><p style={{width:'120px'}}>{item.nama}</p></td>
              <td><p style={{width:'100px'}}>{item.kode_buku}</p></td>
              <td><p style={{width:'250px'}}>{item.judul_buku}</p></td>
              <td><p style={{width:'150px'}}>{item.pengarang}</p></td>
              <td>{item.penerbit}</td>
              <td>{item.tahun_terbit}</td>
              <td>{item.jumlah_pinjam}</td>
              <td>{item.jumlah_kembali}</td>
              <td>{tanggalPinjam}</td>
              <td>{tanggalKembali}</td>
              <td><p style={{width:'50px'}}>{status}</p></td>
            </tr>
          )

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
