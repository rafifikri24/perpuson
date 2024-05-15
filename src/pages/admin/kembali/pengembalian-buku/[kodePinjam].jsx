import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState,useEffect} from "react"
import axios from "axios"

const Pengembalian = () =>{
    const router = useRouter()
    const { kodePinjam } = router.query
    const [idpengembalian, setIdpengembalian] = useState('');
    const [kodetransaksi, setKodetransaksi] = useState('');
    const [tanggalkembali,setTanggalkembali] = useState('')
    const [jumlahkembali,setJumlahkembali] = useState('')
    const [judulBuku,setJudulBuku] = useState('')
    const [jumlahPinjam,setJumlahpinjam] = useState('')
    const [namaPeminjam,setNamaPeminjam] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('tokenjwt');
        if (!token){
            router.push('/')
        }

    })  

    useEffect(() => {

        const getNextIdFromDatabase = async () => {
          const lastId = await fetch('https://perpus-smk-delta.vercel.app/tampil/idkembali');
          const lastIdJson = await lastId.json();
          console.log(lastIdJson[0])

          const nextNumber = parseInt(lastIdJson[0].id_pengembalian.substr(2)) + 1;
          const nextId = `BC${nextNumber.toString().padStart(4, '0')}`;
    
          setIdpengembalian(nextId);
        };
    
        getNextIdFromDatabase();
      }, []);

      useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/trx/${kodePinjam}`)
                setKodetransaksi(response.data[0].kode_transaksi)
                setJudulBuku(response.data[0].judul_buku)
                setNamaPeminjam(response.data[0].nama)
                setJumlahpinjam(response.data[0].jumlah_pinjam)
            } catch (error){
                console.log(error)
            }
        };
        fetchData();
    },[kodePinjam])

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = {
        id_pengembalian: idpengembalian ,
        kode_transaksi : kodetransaksi,
        tanggal_kembali : tanggalkembali,
        jumlah_kembali : jumlahkembali,
        judul_buku : judulBuku
    }
    const token = localStorage.getItem('tokenjwt');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    console.log(data)

    try {
      const response = await axios.post("https://perpus-smk-delta.vercel.app/tambah/kembali",data,config);
      console.log(response.data);
      setIdpengembalian('')
      setKodetransaksi('')
      setTanggalkembali('')
      setJumlahkembali('')
      window.location='/admin/pinjam/daftarpeminjaman'
      // Tambahkan tindakan setelah upload berhasil, misalnya menampilkan pesan sukses
    } catch (error) {
        alert('Kode Transaksi Ini Sudah Kembali atau Tidak Ada dalam Riwayat')
      console.error('Upload failed:', error);
      // Tambahkan tindakan setelah upload gagal, misalnya menampilkan pesan error
    }
  };

    return (
        <>
            <AdminLayout>
                <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <h1>Form Pengembalian Buku</h1>
                    <div class="mb-3">
                        <label for="No" class="form-label">Id Pengembalian</label>
                        <input type="text" class="form-control" id="No" placeholder="Id Pengembalian" value={idpengembalian} onChange={(a) => setIdpengembalian(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="No" class="form-label">Kode Transaksi</label>
                        <input disabled type="text" class="form-control" id="No" placeholder="Kode Transaksi" value={kodetransaksi} onChange={(a) => setKodetransaksi(a.target.value)}/>
                    </div>
                     <div class="mb-3">
                        <label for="No" class="form-label">Judul Buku</label>
                        <input disabled type="text" class="form-control" id="No" placeholder="Kode Transaksi" value={judulBuku} onChange={(a) => setJudulBuku(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="No" class="form-label">Nama Peminjam</label>
                        <input disabled type="text" class="form-control" id="No" placeholder="Kode Transaksi" value={namaPeminjam} onChange={(a) => setNamaPeminjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="No" class="form-label">Jumlah Buku Yang di Pinjam</label>
                        <input disabled type="text" class="form-control" id="No" placeholder="Kode Transaksi" value={jumlahPinjam} onChange={(a) => setIdpengembalian(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Kembali</label>
                        <input required type="date" class="form-control" id="Prodi" placeholder="Stock"value={tanggalkembali} onChange={(a) => setTanggalkembali(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="No" class="form-label">Jumlah Kembali</label>
                        <input required type="text" class="form-control" id="No" placeholder="Jumlah Buku" value={jumlahkembali} onChange={(a) => setJumlahkembali(a.target.value)}/>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" required/>
                        <label required class="form-check-label" for="exampleCheck1">Anda Yakin Sudah Benar ?</label>
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form>
                </div>
            </AdminLayout>
        </>
    )
}

export default Pengembalian
