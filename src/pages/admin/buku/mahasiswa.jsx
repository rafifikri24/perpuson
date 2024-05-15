import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState,useEffect} from "react"
import axios from "axios"

const Mahasiswa = () =>{
    const router = useRouter()
    const [kodebuku, setKodebuku] = useState('');
    const [judul, setJudul] = useState('');
    const [kategori,setKategori] = useState('')
    const [isbn, setISBN] = useState('');
    const [stok, setStok] = useState('');
    const [pengarang, setPengarang] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [tahunterbit, setTahunterbit] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('tokenjwt');
        if (!token){
            router.push('/')
        }

    }) 

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = {
        kode_buku : kodebuku,
        judul_buku : judul,
        kategori : kategori,
        isbn : isbn,
        stok : stok,
        pengarang : pengarang,
        penerbit : penerbit,
        tahun_terbit : tahunterbit,

    }
    const token = localStorage.getItem('tokenjwt');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }
  
    try {
      const response = await axios.post("https://perpus-smk-delta.vercel.app/tambah/book", data,config);
      console.log(response.data);
      setKodebuku('')
      setJudul('')
      setKategori('')
      setISBN('')
      setStok('')
      setPengarang('')
      setPenerbit('')
      setTahunterbit('')
      window.location='/admin/buku/daftarbuku'
      // Tambahkan tindakan setelah upload berhasil, misalnya menampilkan pesan sukses
    } catch (error) {
        alert(error)
      console.error('Upload failed:', error);
      // Tambahkan tindakan setelah upload gagal, misalnya menampilkan pesan error
    }
  };

    return (
        <>
            <AdminLayout>
                <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <h1>Tambah Buku</h1>
                    <div class="mb-3">
                        <label for="No" class="form-label">Kode Buku</label>
                        <input type="text" class="form-control" id="No" placeholder="Kode Buku" value={kodebuku} onChange={(a) => setKodebuku(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Judul</label>
                        <input type="text" class="form-control" id="Nama" placeholder="Judul Buku"value={judul} onChange={(a) => setJudul(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Kategori</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="Kategori"value={kategori} onChange={(a) => setKategori(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">ISBN</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="ISBN"value={isbn} onChange={(a) => setISBN(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Stock</label>
                        <input type='number' class="form-control" id="Prodi" placeholder="Stock"value={stok} onChange={(a) => setStok(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Pengarang</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="Pengarang"value={pengarang} onChange={(a) => setPengarang(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Penerbit</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="Penerbit"value={penerbit} onChange={(a) => setPenerbit(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tahun Terbit</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="Tahun Terbit"value={tahunterbit} onChange={(a) => setTahunterbit(a.target.value)}/>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" required/>
                        <label class="form-check-label" for="exampleCheck1">Anda Yakin Sudah Benar ?</label>
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form>
                </div>

            </AdminLayout>
        </>
    )
}

export default Mahasiswa
