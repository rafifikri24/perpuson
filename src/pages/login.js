import { useState } from "react";
import { useRouter } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.css"
import Head from "next/head";
import axios from 'axios'
const FormLogin = () => {

    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    }
    
    let Login
    if (role == "admin"){
        Login = async(e) => {

            e.preventDefault()
            try {
                const res = await axios.post('https://perpus-smk-delta.vercel.app/login',{
                    username: username,
                    password: password,            
                    
                })
                const ty = res.data.success
    
              if (res.data.success) {
                // Redirect ke halaman dashboard
                localStorage.setItem('isLoggedIn',true)
                localStorage.setItem('tokenjwt',res.data.token)
                localStorage.setItem('username',username)
                alert("BERHASIL LOGIN")
                window.location.href = res.data.redirectUrl;
              } else {
                alert('Email atau Password Salah')
              }      
    
            } catch (error) {
                alert("TERJADI KESALAHAN SAAT LOGIN")
                console.log(error)
    
              }
        }
    }
    if (role == "student"){
        Login = async(e) => {

            e.preventDefault()
            try {
                const res = await axios.post('https://perpus-smk-delta.vercel.app/login-user',{
                    username: username,
                    password: password,            
                    
                })
                const ty = res.data.success
    
              if (res.data.success) {
                // Redirect ke halaman dashboard
                localStorage.setItem('isLoggedIn',true)
                localStorage.setItem('tokenjwt',res.data.token)
                localStorage.setItem('username',username)
                alert("BERHASIL LOGIN")
                console.log("Username", username, "Password", password);
                window.location.href = res.data.redirectUrl;
              } else {
                alert('Email atau Password Salah')
              }      
    
            } catch (error) {
                alert("TERJADI KESALAHAN SAAT LOGIN")
                console.log(error)
    
              }
        }
    }
    
    
    return ( 
        <>
            <Head>
                <title>Log In Perpustakan SMK PGRI 1 Banyuwangi</title>
                <link rel="icon" type="image/png" href="smkpgri1banyuwangi.png" sizes="32x32" />
                <meta name='description' content='SMK PGRI 1 BANYUWANGI memiliki 4 bidang kejuruan yaitu Teknik Pemesinan, Teknik Kendaraan Ringan, Teknik Elektronika Industri dan AKUNTANSI KEUANGAN dan LEMBAGA.' />
            </Head>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    
                    </a>
                    <div className="w-full bg-success rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                        Log In to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={Login}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Username</label>
                                <input  value={username} onChange={(e)=> setUsername(e.target.value)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Username" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                                <input value={password} onChange={(e)=> setPassword(e.target.value)}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 text-white">Login Sebagai : </label>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="admin"
                                        value="admin"
                                        checked={role === 'admin'}
                                        onChange={() => handleRoleChange('admin')}
                                        className="mr-2"
                                        />
                                    <label htmlFor="admin" className="text-gray-900 text-white">Admin</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="student"
                                        value="student"
                                        checked={role === 'student'}
                                        onChange={() => handleRoleChange('student')}
                                        className="mr-2"
                                    />
                                    <label htmlFor="student" className="text-gray-900 text-white">Student</label>
                                </div>
                            </div>
                            <div className="d-flex column-gap-3">
                                <button type="submit" style={{backgroundColor:"rgb(23, 93, 61)"}} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log In</button>
                                <button type="button" style={{backgroundColor:"rgb(23, 93, 61)"}} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"><a href="auth/registerstudent" className="text-decoration-none text-light">Register</a></button>
                            </div>      
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </>

     );
}
 
export default FormLogin;
