import AdminLayout from "@/components/admin/AdminLayout"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import Modal from 'react-bootstrap/Modal';



const Daftarpengembalian = () =>{
    const router = useRouter()
    const[kembali,setKembali]=useState([])
    const [query, setQuery] = useState('')
    const [modalShow, setModalShow] = useState(false);    
    const [selectedNotifId, setSelectedNotifId] = useState(null);

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
  
  const handleOpenModal = async (notifId) => {
    console.log(notifId)
    setSelectedNotifId(notifId);
    setModalShow(true);
  }

  function ModalFunction(props) {
    if (!selectedNotifId) {
      return null;
    }
    const selectedTransaction = kembali.find(item => item.kode_transaksi === selectedNotifId);
    const tanggal_Pinjam = new Date(selectedTransaction.tanggal_pinjam).toLocaleDateString('id-ID')
    const tanggal_Kembali = new Date(selectedTransaction.tanggal_kembali).toLocaleDateString('id-ID')
    let status
    let colorText
    if (selectedTransaction.jumlah_pinjam != selectedTransaction.jumlah_kembali){
      status = '(Jumlah Tidak Sesuai)'
      colorText = 'red'
    }
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Data Pengembalian Buku
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
                      <th scope="row">Jumlah Kembali</th>
                      <td style={{color:colorText}}>{selectedTransaction.jumlah_kembali} {status}</td>
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
      </Modal>
    );
  }
  
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
            <div className="p-4">
                <div className="table-responsive mirror">
                  <Table striped bordered hover className="mirror">
                    <thead>
                      <tr>
                        <th>Kode Transaksi</th>
                        <th>Tanggal Kembali</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {kembali.map((item)=>{
                        const tanggalKembali = new Date(item.tanggal_kembali).toLocaleDateString('en-US')
                        return(
                          <tr key={item.id_pengembalian}>
                            <td>{item.kode_transaksi}</td>
                            <td>{tanggalKembali}</td>
                            <td><button className="btn btn-primary"  onClick={() => handleOpenModal(item.kode_transaksi)}>Lihat</button></td>
                            <td><button type="submit" class="btn btn-primary" onClick={() => deleteKembali(item.id_pengembalian)}>hapus</button></td>
                            <td>                
                              <Link href={`/admin/kembali/${item.id_pengembalian}`}><button type="submit" class="btn btn-primary">Edit</button></Link>
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
            }}
        />
                </div>
            </div>
            </AdminLayout>
        </>
    )
}

export default Daftarpengembalian
