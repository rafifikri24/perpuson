import AdminLayout from "@/components/admin/AdminLayout"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react"
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const Edit = () =>{
    const router = useRouter()
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [chatId, setChatId] = useState('');
    const [show, setShow] = useState(false);
 

 useEffect(() => {
    const token = localStorage.getItem('tokenjwt');
    if (!token){
        router.push('/')
    }

})
 useEffect(()=>{
    const fetchData = async()=>{
        const token = localStorage.getItem('tokenjwt');
        const username = localStorage.getItem('username');
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }}
        try{
            const response = await axios.get(`https://perpus-smk-delta.vercel.app/tampil/admin/${username}`,config)
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
    const username = localStorage.getItem('username');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }}

    try {
        const response = await axios.put(`https://perpus-smk-delta.vercel.app/edit/admin/${username}`,data,config);
        localStorage.setItem('username',user)
        window.location='/admin/home'
    } catch (error) {
        console.error(error);
    }

    
};

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                        <label for="Telegram" class="form-label">Chat ID Telegram
                        <span className="pe-auto" style={{display: "inline-block", padding: "0 5px", cursor: "help"}} onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="#666666" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"/></svg>
                        </span> 
                        </label>
                        <input type="text" class="form-control" id="Telegram" placeholder="Chat ID Telegram" value={chatId} onChange={(a) => setChatId(a.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="Prodi" class="form-label">Password</label>
                        <input type="text" class="form-control" id="Password" placeholder="Password" onChange={(a) => setPass(a.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cara mendapatkan Chat ID Telegram
                    </Modal.Title>
                </Modal.Header>
                    <div className="modal-dialog modal-dialog-scrollable" style={{ padding: "0 10px"}}>
                        <label class="form-label">1. Buka aplikasi Telegram.</label>
                        <br />
                        <label class="form-label">2. Klik tombol search/pencarian.</label>
                        <img src="/tutor1.jpg" className="rounded" alt="tutorial" style={{ marginRight: "10px" }} width={350} height={350}/>
                        <br />
                        <label class="form-label">3. Ketik {"'Get My ID'"} pada kolom pencarian lalu pilih bot Get My ID seperti dibawah.</label>
                        <img src="/tutor2.jpg" className="rounded" alt="tutorial" style={{ marginRight: "10px" }} width={350} height={350}/>
                        <br />
                        <label class="form-label">4. Ketik {"'/start'"} dan kirim. User ID/Chat ID berhasil di dapatkan.</label>
                        <img src="/tutor3.jpg" className="rounded" alt="tutorial" style={{ marginRight: "10px" }} width={350} height={350}/>
                    </div>
            </Modal>
        </AdminLayout>
        </>
    )
}

export default Edit
