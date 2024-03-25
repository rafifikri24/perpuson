import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react"
import axios from "axios"

const Edit = () =>{
    const router = useRouter()
    const { editpinjam } = router.query
    const [noinduk, setNoinduk] = useState('');
    const [kodebuku,setKodebuku] = useState('')
    const [jumlahpinjam, setJumlahpinjam] = useState('');
    const [tanggalpinjam, setTanggalpinjam] = useState('');
    const [tanggalkembali, setTanggalkembali] = useState('');
    const tanggal_Pinjam = new Date(tanggalpinjam).toLocaleDateString('id-ID')
    const tanggal_Kembali = new Date(tanggalkembali).toLocaleDateString('id-ID')
    console.log(editpinjam)
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
            const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/trx/${editpinjam}`)
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
},[editpinjam])

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = { 
        no_induk : noinduk,
        kode_buku : kodebuku,
        jumlah_pinjam : jumlahpinjam,
        tanggal_pinjam : tanggalpinjam, 
        tanggal_kembali : tanggalkembali,
    }
    const token = localStorage.getItem('tokenjwt');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}

    try {
        const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/trx/${editpinjam}`,data,config);
        window.location='/admin/pinjam/daftarpeminjaman'
    } catch (error) {
        alert(error)
        console.error(error);
    }
   

    
 };

    return (
        <>
            <AdminLayout>
                <form onSubmit={handleSubmit}>
                    <h1>Form Edit Data Peminjmanan Buku</h1>
                    
                    <div class="mb-3">
                        <label for="Nama" class="form-label">No Induk</label>
                        <input type="text" class="form-control" id="Nama" placeholder="No Induk"value={noinduk} onChange={(a) => setNoinduk(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Kode Buku</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="Kode Buku"value={kodebuku} onChange={(a) => setKodebuku(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Jumlah Pinjam</label>
                        <input type="text" class="form-control" id="Prodi" placeholder="Jumlah Pinjam"value={jumlahpinjam} onChange={(a) => setJumlahpinjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Pinjam</label>
                        <input type="date" class="form-control" id="Prodi" placeholder="Tanggal Pinjam"value={tanggalpinjam} onChange={(a) => setTanggalpinjam(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Tanggal Kembali</label>
                        <input type="date" class="form-control" id="Prodi" placeholder="Tanggal Kembali"value={tanggalkembali} onChange={(a) => setTanggalkembali(a.target.value)}/>
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

