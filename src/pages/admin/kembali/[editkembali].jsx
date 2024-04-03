import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react"
import axios from "axios"

const Editpengembalian = () =>{
    const router = useRouter()
    const { editkembali } = router.query
    const [kodetransaksi, setKodetransaksi] = useState('');
    const [tanggalkembali,setTanggalkembali] = useState('');
    const [jumlahkembali,setJumlahkembali] = useState('')
    
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
            const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/kembali/${editkembali}`)
            setKodetransaksi (response.data[0].kode_transaksi)
            setTanggalkembali (response.data[0].tanggal_kembali)
            setJumlahkembali (response.data[0].jumlah_kembali)

        } catch (error){
            alert(error)
            console.log(error)
        }
    };
    fetchData();
},[editkembali])

const handleSubmit =async(a)=>{
    a.preventDefault();
    const data = { 
        kode_transaksi : kodetransaksi,
        tanggal_kembali : tanggalkembali,
        jumlah_kembali 	: jumlahkembali

    }
    const token = localStorage.getItem('tokenjwt');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}

    try {
        const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/kembali/${editkembali}`,data,config);
        window.location='/admin/kembali/daftarpengembalian'
    } catch (error) {
        alert(error)
        console.error(error);
    }
   

    
 };

    return (
        <>
            <AdminLayout>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <h1>Form Edit Pengembalian Buku</h1>
                        <div class="mb-3">
                            <label for="No" class="form-label">Kode Transaksi</label>
                            <input type="text" class="form-control" id="No" placeholder="Kode Transaksi" value={kodetransaksi} onChange={(a) => setKodetransaksi(a.target.value)}/>
                        </div>
                        <div class="mb-3">
                            <label for="Prodi" class="form-label">Tanggal Kembali</label>
                            <input type="date" class="form-control" id="Prodi" placeholder="Stock"value={tanggalkembali} onChange={(a) => setTanggalkembali(a.target.value)}/>
                        </div>
                        <div class="mb-3">
                            <label for="No" class="form-label">Jumlah Pengembalian</label>
                            <input type="text" class="form-control" id="No" placeholder="Id Pengembalian" value={jumlahkembali} onChange={(a) => setJumlahkembali(a.target.value)}/>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                            <label class="form-check-label" for="exampleCheck1">Anda Yakin Sudah Benar ?</label>
                        </div>
                        <button type="submit" class="btn btn-primary" >Submit</button>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}

export default Editpengembalian
