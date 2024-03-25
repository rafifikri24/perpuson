import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState} from "react"
import axios from "axios"

const Edit = () =>{
    const router = useRouter()
    const { editbuku } = router.query
    const [judul, setJudul] = useState('');
    const [kategori,setKategori] = useState('')
    const [isbn, setISBN] = useState('');
    const [stok, setStok] = useState('');
    const [pengarang, setPengarang] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [tahunterbit, setTahunterbit] = useState('');
 ////////////////

 useEffect(() => {
    const token = localStorage.getItem('tokenjwt');
    if (!token){
        router.push('/')
    }

})
 useEffect(()=>{
    const fetchData = async()=>{
    
        try{
            const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/book/${editbuku}`)
            setJudul(response.data[0].judul_buku)
            setKategori(response.data[0].kategori)
            setISBN(response.data[0].isbn)
            setStok(response.data[0].stok)
            setPengarang(response.data[0].pengarang)
            setPenerbit(response.data[0].penerbit)
            setTahunterbit(response.data[0].tahun_terbit)

            console.log(judulbuku)
        } catch (error){
            console.log(error)
        }
    };
    fetchData();

},[editbuku])

const handleSubmit =async(a)=>{
    confirm("Apakah Anda ingin merubah Data buku?")
    a.preventDefault();
    const data = {
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
          }}

    try {
        const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/book/${editbuku}`,data,config);
        window.location='/admin/buku/daftarbuku'
    } catch (error) {
        console.error(error);
    
}
   

    
 };

    return (
        <>

            <AdminLayout>
                <form onSubmit={handleSubmit}>
                    <h1>Edit</h1>

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
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Anda Yakin Sudah Benar ?</label>
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form>
            </AdminLayout>
        </>
    )
}

export default Edit