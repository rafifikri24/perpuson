import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState} from "react"
import axios from "axios"

const Edit = () =>{
    const router = useRouter()
    const { editsiswa } = router.query
    const [nama, setNama] = useState('');
    const [prodi,setProdi] = useState('')
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
            const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/siswa/${editsiswa}`)
            setNama(response.data[0].nama)
            setProdi(response.data[0].prodi)

        } catch (error){
            console.log(error)
        }
    };
    fetchData();
},[editsiswa])

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = { 
        nama : nama,
        prodi : prodi,

    }
    console.log(data)
    const token = localStorage.getItem('tokenjwt');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}

    try {
        const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/siswa/${editsiswa}`,data,config);
        window.location='/admin/siswa/siswa'
    } catch (error) {
        alert(error)
        console.error(error);
    }
   

    
 };

    return (
        <>
        <AdminLayout>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="Nama" class="form-label">Nama Peminjam</label>
                <input type="text" class="form-control" id="Nama" placeholder="Enter Nama Siswa" value={nama} onChange={(a) => setNama(a.target.value)}/>
            </div>
            <div class="mb-3">
                <label for="Prodi" class="form-label">Prodi</label>
                <input type="text" class="form-control" id="Prodi" placeholder="Enter Prodi" value={prodi} onChange={(a) => setProdi(a.target.value)}/>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Sudah Benar ?</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </AdminLayout>
        </>
    )
}

export default Edit