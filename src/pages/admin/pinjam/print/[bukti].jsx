import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react"
import axios from "axios"

function BuktiPinjam() {
    const router = useRouter()
    const { bukti } = router.query
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
        const token = localStorage.getItem('tokenjwt');
        if (!token){
            router.push('/')
        }
    
    })
     useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/trx/${bukti}`)
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
    },[bukti])

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

      const handlePrint = () => {
        window.print();
      };
      useEffect(() => {
        if (buku.length > 0) {
          handlePrint();
        }
      }, [buku]);
  
      useEffect(() => {
        const handlePrintEvent = () => {
          router.back();
        };  
        window.addEventListener('afterprint', handlePrintEvent);
        return () => {
          window.removeEventListener('afterprint', handlePrintEvent);
        };
      }, []);
  return (
    <>
    <Card style={{maxWidth:'300px'}}>
      <Card.Header>Perpustakaan SMK PGRI Banyuwangi</Card.Header>
      <Card.Body>
            Kode Tranasaksi Pinjam :<div className='alignR'>{bukti}</div>
           No induk Peminjam :<div className='alignR'>{noinduk}</div>
           Nama Peminjam :<div className='alignR'>{nama}</div>
           Prodi :<div className='alignR'>{prodi}</div>
           Kode Buku Yang di Pinjam :<div className='alignR'>{kodebuku}</div>
           Judul Buku :<div className='alignR'>{buku}</div>
           Jumlah Pinjam :<div className='alignR'>{jumlahpinjam}</div>
           Tangal Pinjam :<div className='alignR'>{tanggal_Pinjam}</div>
           Tanggal Kembali :<div className='alignR'>{tanggal_Kembali}</div>        
      </Card.Body>
    </Card>

<style>
{`
    body * {
        font-size: 12px
      }
    .alignR{
        text-align: right
    }
`}
</style>
</>
  );
}

export default BuktiPinjam;

