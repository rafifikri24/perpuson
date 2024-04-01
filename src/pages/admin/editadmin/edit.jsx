import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react"
import axios from "axios"

const Edit = () =>{
    const router = useRouter()
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [chatId, setChatId] = useState('');
 ////////////////

 useEffect(() => {
    const token = localStorage.getItem('tokenjwt');
    if (!token){
        router.push('/')
    }

})
 useEffect(()=>{
    const fetchData = async()=>{
        const token = localStorage.getItem('tokenjwt');
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }}
        try{
            const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/admin`,config)
            setUser(response.data[0].username)
            setPass(response.data[0].password)
            setChatId(response.data[0].chatId)

        } catch (error){
            console.log(error)
        }
    };
    fetchData();
},[])

const handleSubmit =async(a)=>{
    confirm("Apakah Anda ingin merubah Username dan Password?")
    a.preventDefault();
    const data = { 
        username : user,
        chatId : chatId,
        password : pass
    }
    console.log(data)
    const token = localStorage.getItem('tokenjwt');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}

    try {
        const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/admin/1`,data,config);
        window.location='/admin/home'
    } catch (error) {
        console.error(error);
    }
   

    
 };

    return (
        <>
        <AdminLayout>
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="Nama" class="form-label">Username</label>
                        <input type="text" class="form-control" id="Username" placeholder="Username" value={user} onChange={(a) => setUser(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Telegram" class="form-label">Chat ID Telegram</label>
                        <input type="text" class="form-control" id="Telegram" placeholder="Chat ID Telegram" value={user} onChange={(a) => setUser(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Password</label>
                        <input type="text" class="form-control" id="Password" placeholder="Password" onChange={(a) => setPass(a.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </AdminLayout>
        </>
    )
}

export default Edit
