import { useState } from "react";
import { useRouter } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.css"
import Link from "next/link";
import axios from 'axios'
const Register = () => {

    const navigasi = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [no_induk, setNoinduk] = useState('');
    const [nama, setNama] = useState('');
    const [prodi, setProdi] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('https://perpus-smk-delta.vercel.app/register-user', { username, password, no_induk, nama, prodi });
    
          if (response.status === 200) {
            window.location='/user/buku/daftarbuku'
          } else {
            console.error('Registrasi gagal:', response.data.message);
          }
        } catch (error) {
        if (error.response && error.response.status === 400) {
        alert('Username Sudah ada')
        }
          console.error('Terjadi kesalahan:', error);
        }
    }
    
    return ( 
        <section className="bg-gray-50 dark:bg-gray-900">
        
        <div className="flex flex-col items-center justify-center px-3 py-8 md:h-screen lg:py-0" style={{height: '50em'}}>
            <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
                  <button>
                    <Link href="/" className="text-light" ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg></Link>
                  </button>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                  Register your account as Student
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}> 
                    <div>
                        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Username</label>
                        <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your username" required />
                    </div>
                    <div>
                        <label htmlFor="No" className="block mb-2 text-sm font-medium text-gray-900 text-white">No Induk</label>
                        <input value={no_induk} onChange={(e)=> setNoinduk(e.target.value)} type="number" name="no_induk" id="No" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your No Induk" required />
                    </div>
                    <div>
                        <label htmlFor="Nama" className="block mb-2 text-sm font-medium text-gray-900 text-white">Full Name</label>
                        <input value={nama} onChange={(e)=> setNama(e.target.value)} type="text" name="nama" id="Nama" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Full Name" required />
                    </div>
                    <div>
                        <label htmlFor="Prodi" className="block mb-2 text-sm font-medium text-gray-900 text-white">Kelas</label>
                        <input value={prodi} onChange={(e)=> setProdi(e.target.value)} type="text" name="prodi" id="Prodi" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Class" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-90 text-white">Password</label>
                        <input value={password} onChange={(e)=> setPassword(e.target.value)}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-primary">Register</button>
                  </form>
              </div>           
            </div>
        </div>
        </section>

     );
}
 
export default Register;
