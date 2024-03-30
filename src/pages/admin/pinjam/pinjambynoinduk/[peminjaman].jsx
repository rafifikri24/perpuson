import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState,useEffect} from "react"
import axios from "axios"

const Peminjaman = () =>{
    const router = useRouter()
    const { peminjaman } = router.query
    const [noinduk, setNoinduk] = useState('');
    const [jumlahpinjam, setJumlahpinjam] = useState('');
    const [tanggalpinjam, setTanggalpinjam] = useState('');
    const [tanggalkembali, setTanggalkembali] = useState('');
    const [nextId, setNextId] = useState('');
    const [namaPeminjam,setNamaPeminjam] = useState('')
    const [judul, setJudul] = useState('');
    const [pengarang, setPengarang] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [tahunterbit, setTahunterbit] = useState('');
    const [kode, setKode] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('tokenjwt');
        if (!token){
            router.push('/')
        }

    })

    useEffect(() => {

        const getNextIdFromDatabase = async () => {
    
          const lastId = await fetch('https://perpus-smk-delta.vercel.app/tampil/idtrx');
          const lastIdJson = await lastId.json();
          console.log(lastIdJson[0])
          
    
          const nextNumber = parseInt(lastIdJson[0].kode_transaksi.substr(2)) + 1;
          const nextId = `PI${nextNumber.toString().padStart(4, '0')}`;
    
          setNextId(nextId);
        };
    
        getNextIdFromDatabase();
      }, []);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/siswa/${peminjaman}`)
                setNamaPeminjam(response.data[0].nama)
                setNoinduk(response.data[0].no_induk)
                console.log(kode)
            } catch (error){
                console.log(error)
            }
        };
        fetchData();
    },[peminjaman])

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = {
        kode_transaksi : nextId,
        no_induk : noinduk,
        nama_peminjam : namaPeminjam,
        kode_buku : kode,
        judul_buku :judul,
        pengarang : pengarang,
        penerbit : penerbit,
        tahun_terbit : tahunterbit,
        status_pinjam : 1,
        jumlah_pinjam : jumlahpinjam,
        tanggal_pinjam : tanggalpinjam,
        tanggal_kembali : tanggalkembali,

    }
    const token = localStorage.getItem('tokenjwt');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    console.log(data)

    try {
      const response = await axios.post("https://perpus-smk-delta.vercel.app/tambah/trx", data,config);
      console.log(response.data);
      setNextId('')
      setKode('')
      setJudul('')
      setPengarang('')
      setPenerbit('')
      setTahunterbit('')
      setJumlahpinjam('')
      setTanggalpinjam('')
      setTanggalkembali('')
      setNoinduk('')
      setNamaPeminjam('')
      window.location='/admin/pinjam/daftarpeminjaman'
      // Tambahkan tindakan setelah upload berhasil, misalnya menampilkan pesan sukses
    } catch (error) {
        if(error.response.status === 400){
            alert(error.response.data[0].message)
        }else(
            alert("Data Peminjam Tidak Sesuai")
        )
    }
  };

  const fetchIdentitasBuku = async (kode) => {
    try {
      const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/book/${kode}`);
      setJudul(response.data[0].judul_buku)
        setPengarang(response.data[0].pengarang)
        setPenerbit(response.data[0].penerbit)
        setTahunterbit(response.data[0].tahun_terbit)
    } catch (error) {
      console.error('Error fetching nama peminjam:', error);
      setJudul('Tidak Ditemukan')
      setPengarang('Tidak Ditemukan')
      setPenerbit('Tidak Ditemukan')
      setTahunterbit('Tidak Ditemukan')
    }
  };
    return (
        <>
            <AdminLayout>
                <form onSubmit={handleSubmit}>
                    <h1>Form Peminjaman Buku</h1>
                    <div class="mb-3">
                        <label for="No" class="form-label">Kode Transaksi</label>
                        <input type="text" class="form-control" id="No" placeholder="Kode Transaksi" value={nextId} onChange={(a) => setNextId(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Kode Peminjam</label>
                        <input disabled type="text" class="form-control" id="Nama" placeholder="No Induk"value={noinduk} onChange={(a) => setNoinduk(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Nama Peminjam</label>
                        <input disabled type="text" class="form-control" id="Nama" placeholder="Nama Peminjam"value={namaPeminjam} onChange={(a) => setNamaPeminjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Kode Buku</label>
                        <input required type="text" class="form-control" id="Prodi" placeholder="Kode Buku"value={kode} onChange={(a) => {setKode(a.target.value);fetchIdentitasBuku(a.target.value)}}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Judul Buku</label>
                        <input disabled type="text" class="form-control" id="Prodi" placeholder="Judul Buku"value={judul} onChange={(a) => setJudul(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Pengarang Buku</label>
                        <input disabled type="text" class="form-control" id="Prodi" placeholder="Pengarang Buku"value={pengarang} onChange={(a) => setPengarang(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Penerbit Buku</label>
                        <input disabled type="text" class="form-control" id="Prodi" placeholder="Penerbit Buku"value={penerbit} onChange={(a) => setPenerbit(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tahun Terbit</label>
                        <input disabled type="text" class="form-control" id="Prodi" placeholder="Tahun Terbit"value={tahunterbit} onChange={(a) => setTahunterbit(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Jumlah Pinjam</label>
                        <input required type="text" class="form-control" id="Prodi" placeholder="Jumlah Pinjam"value={jumlahpinjam} onChange={(a) => setJumlahpinjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Pinjam</label>
                        <input required type='date' class="form-control" id="Prodi" placeholder="Tanggal Pinjam"value={tanggalpinjam} onChange={(a) => setTanggalpinjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Kembali</label>
                        <input required type='date' class="form-control" id="Prodi" placeholder="Tanggal Kembali"value={tanggalkembali} onChange={(a) => setTanggalkembali(a.target.value)}/>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" required/>
                        <label class="form-check-label" for="exampleCheck1">Anda Yakin Sudah Benar ?</label>
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form>
            </AdminLayout>
        </>
    )
}

export default Peminjaman
