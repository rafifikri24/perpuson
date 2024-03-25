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

    const [noinduk, setNoinduk] = useState('');
    const [kodebuku,setKodebuku] = useState('')
    const [nama, setNama] = useState('');
    const [prodi,setProdi] = useState('')
    const [jumlahpinjam, setJumlahpinjam] = useState('');
    const [tanggalpinjam, setTanggalpinjam] = useState('');
    const [tanggalkembali, setTanggalkembali] = useState('');
    const[buku,setBuku]=useState([])
    const tanggal_Pinjam = new Date(tanggalpinjam).toLocaleDateString('id-ID')
    const tanggal_Kembali = new Date(tanggalkembali).toLocaleDateString('id-ID')

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
   useEffect(()=>{
      const fetchData = async()=>{
          try{
              const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/trx/${selectedNotifId}`)
              setNoinduk(response.data[0].no_induk)
              setKodebuku(response.data[0].kode_buku)
              setJumlahpinjam(response.data[0].jumlah_pinjam)
              setTanggalpinjam(response.data[0].tanggal_pinjam)
              setTanggalkembali(response.data[0].tanggal_kembali)
          } catch (error){
              console.log(error)
          }
      };
      fetchData();
  },[selectedNotifId])

  useEffect(()=>{
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      axios.get(`https://perpus-smk-delta.vercel.app/tampil/siswa/${noinduk}`,config)
      .then((response)=>{
          setNama(response.data[0].nama)
          setProdi(response.data[0].prodi)
      })
      .catch((error)=>{
        console.log(error)
      })
    } else {
      console.log('not login')
      router.push('/');
    }
  },[noinduk])

  useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
  
        axios.get(`https://perpus-smk-delta.vercel.app/tampil/book/${kodebuku}`, config)
          .then((response) => {
            setBuku(response.data[0].judul_buku); // Assuming setBuku is a function to set your book data
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('not login')
        router.push('/');
      }
    }, [])

    function ModalFunction(props) {
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
        <h4>Dari : {nama}</h4>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Kode Tranasaksi Pinjam</th>
                <td>{selectedNotifId}</td>
              </tr>
              <tr>
                <th scope="row">No induk Peminjam</th>
                <td>{noinduk}</td>
              </tr>
              <tr>
                <th scope="row">Nama Peminjam</th>
                <td>{nama}</td>
              </tr>
              <tr>
                <th scope="row">Prodi</th>
                <td>{prodi}</td>
              </tr>
              <tr>
                <th scope="row">Kode Buku Yang di Pinjam</th>
                <td>{kodebuku}</td>
              </tr>
              <tr>
                <th scope="row">Judul Buku</th>
                <td>{buku}</td>
              </tr>
              <tr>
                <th scope="row">Jumlah Pinjam</th>
                <td>{jumlahpinjam}</td>
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
        <Button>Setuju</Button>
        <Button>Tidak Setuju</Button>
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
                        const status = item.read_status
                        if (status === 0) {
                          return(
                            <tr key={item.id}>
                            <th>{item.message}</th>
                            <th>{item.creation_time}</th>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(item.kode_transaksi)}>
                                    Baca
                                </Button>
                            </td>
                        </tr>
                        )
                        }else{
                          return(
                            <tr key={item.id}>
                            <td>{item.message}</td>
                            <td>{item.creation_time}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(item.kode_transaksi)}>
                                    Baca
                                </Button>
                            </td>
                        </tr>
                        )
                        }
                                                   
                        
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
    )
}
