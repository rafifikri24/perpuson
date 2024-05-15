import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect} from "react"
import axios from "axios"

const Tambahsiswa = () =>{
    const router = useRouter()
    const [noinduk, setNoinduk] = useState('');
    const [nama, setNama] = useState('');
    const [prodi, setProdi] = useState('')
    const [password, setPassword]= useState('')
    const [username, setUsername]= useState('')

    useEffect(() => {
        const token = localStorage.getItem('tokenjwt');
        if (!token){
            router.push('/')
        }

    }) 
    

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = {
        no_induk : noinduk,
        nama : nama,
        prodi : prodi,
        password : password,
        username : username

    }
    const token = localStorage.getItem('tokenjwt');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    console.log(data) 
    
    try {
      const response = await axios.post("https://perpus-smk-delta.vercel.app/register-user", data,config);
      console.log(response.data);
      setNoinduk('')
      setNama('')
      setProdi('')
      setPassword('')
      setUsername('')
      window.location='/admin/siswa/siswa'
      // Tambahkan tindakan setelah upload berhasil, misalnya menampilkan pesan sukses
    } catch (error) {
        alert('No Peminjam Sudah Ada')
      console.error('Upload failed:', error);
      // Tambahkan tindakan setelah upload gagal, misalnya menampilkan pesan error
    }
  };
    return (
        <>
            <AdminLayout>
                <div className="p-4">
                <h1>Tambah Data  Peminjam</h1>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="No" class="form-label">No Peminjam</label>
                        <input required type="number" class="form-control" id="No" placeholder="Enter No.Induk" value={noinduk} onChange={(a) => setNoinduk(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Nama Username</label>
                        <input required type="text" class="form-control" id="Nama" placeholder="Enter Username" value={username} onChange={(a) => setUsername(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Nama Peminjam</label>
                        <input required type="text" class="form-control" id="Nama" placeholder="Enter Nama Siswa" value={nama} onChange={(a) => setNama(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Prodi</label>
                        <input required type="text" class="form-control" id="Prodi" placeholder="Enter Prodi" value={prodi} onChange={(a) => setProdi(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Password</label>
                        <input required type="password" class="form-control" id="Prodi" placeholder="Enter Password" value={password} onChange={(a) => setPassword(a.target.value)}/>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" required/>
                        <label class="form-check-label" for="exampleCheck1">Apakah yakin anda sudah benar ?</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </div>

            </AdminLayout>
        </>
    )
}

export default Tambahsiswa
