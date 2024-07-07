import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState,useEffect} from "react"
import axios from "axios"

const Peminjaman = () =>{
    const router = useRouter()
    const getReturnDate = (tanggalpinjam, jumlahHari) => {
        const returnDate = new Date(tanggalpinjam);
        returnDate.setDate(returnDate.getDate() + jumlahHari);
        return returnDate
      };
    const currentDate = new Date().toISOString().slice(0, 10);
    const [jumlahHari, setJumlahHari ] = useState('')
    const [noinduk, setNoinduk] = useState('');
    const [kodebuku,setKodebuku] = useState('')
    const [jumlahpinjam, setJumlahpinjam] = useState('');
    const [tanggalpinjam, setTanggalpinjam] = useState(currentDate);
    const [tanggalkembali, setTanggalkembali] = useState(getReturnDate(currentDate, jumlahHari));
    const kembali = tanggalkembali.toISOString().split('T')[0]
    const [nextId, setNextId] = useState('');
    const [namaPeminjam,setNamaPeminjam] = useState('')
    const [judul, setJudul] = useState('');
    const [pengarang, setPengarang] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [tahunterbit, setTahunterbit] = useState('');
    function handledayschange(event) {
        const hari = parseInt(event.target.value);
        setJumlahHari(hari);
        setTanggalkembali(getReturnDate(tanggalpinjam, hari))
    }

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
        jumlah_pinjam : 1,
        tanggal_pinjam : tanggalpinjam,
        tanggal_kembali : kembali,

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
      console.log(data)
      console.log(response.data);
      setNextId('')
      setNoinduk('')
      setNamaPeminjam('')
      setKodebuku('')
      setJudul('')
      setPengarang('')
      setPenerbit('')
      setTahunterbit('')
      setJumlahpinjam('')
      setTanggalpinjam('')
      // setTanggalkembali('')
      window.location='/admin/pinjam/daftarpeminjaman'
    } catch (error) {
      alert(error)
      console.error('Upload failed:', error);
    }
  };

  const fetchNamaPeminjam = async (noInduk) => {
    try {
      const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/siswa/${noInduk}`);
      const namaPeminjamFromApi = response.data[0].nama;
      setNamaPeminjam(namaPeminjamFromApi);
    } catch (error) {
      console.error('Error fetching nama peminjam:', error);
      setNamaPeminjam(''); // Clear nama peminjam jika terjadi error
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
      setNamaPeminjam(''); // Clear nama peminjam jika terjadi error
    }
  };

    return (
        <>
            <AdminLayout>
              <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <h1>Form Peminjaman Buku</h1>
                    <div className="mb-3">
                        <label for="No" className="form-label">Kode Transaksi</label>
                        <input type="text" className="form-control" id="No" placeholder="Kode Transaksi" value={nextId} onChange={(a) => setNextId(a.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="Nama" className="form-label">No Induk</label>
                        <input required type="text" className="form-control" id="Nama" placeholder="No Induk"value={noinduk} onChange={(a) => {setNoinduk(a.target.value);fetchNamaPeminjam(a.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label for="Nama" className="form-label">Nama Peminjam</label>
                        <input disabled type="text" className="form-control" id="Nama" placeholder="Nama Peminjam"value={namaPeminjam} onChange={(a) => setNamaPeminjam(a.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="Prodi" className="form-label">Kode Buku</label>
                        <input required type="text" className="form-control" id="Prodi" placeholder="Kode Buku"value={kodebuku} onChange={(a) => {setKodebuku(a.target.value);fetchIdentitasBuku(a.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label for="Prodi" className="form-label">Judul Buku</label>
                        <input disabled type="text" className="form-control" id="Prodi" placeholder="Judul Buku"value={judul} onChange={(a) => setJudul(a.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="Prodi" className="form-label">Pengarang Buku</label>
                        <input disabled type="text" className="form-control" id="Prodi" placeholder="Pengarang Buku"value={pengarang} onChange={(a) => setPengarang(a.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="Prodi" className="form-label">Penerbit Buku</label>
                        <input disabled type="text" className="form-control" id="Prodi" placeholder="Penerbit Buku"value={penerbit} onChange={(a) => setPenerbit(a.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="Prodi" className="form-label">Tahun Terbit</label>
                        <input disabled type="text" className="form-control" id="Prodi" placeholder="Tahun Terbit"value={tahunterbit} onChange={(a) => setTahunterbit(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Pinjam <span><small>(Bulan / Tanggal / Tahun)</small></span></label>
                        <input required type='date' class="form-control" id="Prodi" placeholder="Tanggal Pinjam" value={tanggalpinjam} disabled min={currentDate} onChange={(a) => setTanggalpinjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                    <label for="Prodi" class="form-label">Lama Peminjaman</label>
                        <select class="form-select" aria-label="Default select example" value={jumlahHari} onChange={handledayschange}>
                            <option selected value="" >Pilih</option>
                            <option value={3}>3 hari</option>
                            <option value={5}>5 hari</option>
                            <option value={10}>10 hari</option>
                            <option value={15}>15 hari</option>
                            <option value={20}>20 hari</option>
                            <option value={30}>1 Bulan</option>
                            <option value={60}>2 Bulan</option>
                            <option value={90}>3 Bulan</option>
                            <option value={120}>4 Bulan</option>
                            <option value={150}>5 Bulan</option>
                            <option value={180}>6 Bulan</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Kembali <span><small>(Bulan / Tanggal / Tahun)</small></span></label>
                        <input required type='date' class="form-control" id="Prodi" placeholder="Tanggal Kembali" disabled value={kembali} onChange={(a) => setTanggalkembali(a.target.value)}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                        <label className="form-check-label" for="exampleCheck1">Anda Yakin Sudah Benar ?</label>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
              </div>
            </AdminLayout>
        </>
    )
}

export default Peminjaman
