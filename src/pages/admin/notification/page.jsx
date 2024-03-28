import AdminLayout from "@/components/admin/AdminLayout"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react"
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function Notification() {
    const [notif, setNotif] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedNotifId, setSelectedNotifId] = useState(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const token = localStorage.getItem('tokenjwt');
        
        if (isLoggedIn && token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
    
          axios.get("https://perpus-smk-delta.vercel.app/notif", config)
            .then((response) => {
              setNotif(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('not login')
          router.push('/');
        }
      }, [])

    const handleOpenModal = async (notifId) => {
        setSelectedNotifId(notifId);
        setModalShow(true);

        const data = {
          read_status : '1'
        }

        const token = localStorage.getItem('tokenjwt');
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }

        try{
          await axios.put(`https://perpus-smk-delta.vercel.app/readStatus/${notifId}`,data,config);
        }
        catch (error) {
        console.error('Upload failed:', error);
      }
    };

    useEffect(() => {
      const token = localStorage.getItem('tokenjwt');
      if (!token){
          router.push('/')
      }
  
  })

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
      setData(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }else {
    console.log('not login')
    router.push('/');
  }
},[])

    const handleSetuju = async (notifId) => {

      setModalShow(false);

      try{
        await axios.put(`https://localhhost:5000/statusPinjam/setuju/${notifId}`);
      }
      catch (error) {
      console.error('Upload failed:', error);
    }
  };
    const handleTidakSetuju = async (notifId) => {

      setModalShow(false);

      try{
        await axios.put(`https://localhhost:5000/statusPinjam/tidak-setuju/${notifId}`);
      }
      catch (error) {
      console.error('Upload failed:', error);
    }
  };

function ModalFunction(props) {
  if (!selectedNotifId) {
    return null;
  }
  const selectedTransaction = data.find(item => item.kode_transaksi === selectedNotifId);
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
       <Button onClick={() => handleSetuju(selectedNotifId)}>Setuju</Button>
      <Button onClick={() => handleTidakSetuju(selectedNotifId)}>Tidak Setuju</Button>
      </Modal.Footer>
    </Modal>
  );
}
return(
  <AdminLayout>
      <div className="p-3 ">
        <table className="table">
          <tbody>
            {notif.map((item) => {
              const tanggal_notif = new Date(item.creation_time).toLocaleDateString('id-ID');
              return(
                <tr key={item.id}>
                  <th style={{ fontWeight: item.read_status === 0 ? 'bold' : 'normal' }}>{item.message}</th>
                  <th style={{ fontWeight: item.read_status === 0 ? 'bold' : 'normal' }}>{tanggal_notif}</th>
                  <td>
                    <Button variant="primary" onClick={() => handleOpenModal(item.kode_transaksi)}>
                      Baca
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalFunction
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              window.location.reload();
            }}
        />
      </div>
  </AdminLayout>
);

}
