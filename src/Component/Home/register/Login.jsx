import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import signupImage from '/img/register.jpeg';

function Login() {
  const { loading, setloading } = useData();

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  // User Login Function

  const userloginfunction = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required")
    }

    setloading(true)

    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

      try {
        const q = query(
          collection(fireDB, "user"),
          where('uid', '==', users?.user?.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem("users", JSON.stringify(user))

          setUserLogin({
            email: "",
            password: ""
          })
          toast.success("Login Successfully");
          setloading(false);
          console.log(user)
          if (user && user.role === "user") {
            navigate('/userdashboard')
          } else if (user && user.role === "admin") {
            navigate('/admindashboard')
          } else {
            console.log("User role not found or invalid:", user.role);
          }
        });

        return () => data;
      }
      catch (error) {
        console.log(error)
        setloading(false);
      }
    }
    catch (error) {
      console.log(error)
      setloading(true);
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img src={signupImage} alt="Signup" className="h-auto md:max-h-full md:max-w-full w-[40rem]" />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 flex justify-center items-center p-8">
          {loading && <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"><Loader /></div>}
          <div className="w-full max-w-md">
            <h2 className="text-2xl mb-8 font-semibold text-gray-800">Log in to Snap<span className='text-secondary'>Market</span></h2>
            <form onSubmit={userloginfunction}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={userLogin.email} onChange={(e) => { setUserLogin({ ...userLogin, email: e.target.value }) }} required />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={userLogin.password} onChange={(e) => { setUserLogin({ ...userLogin, password: e.target.value }) }} required />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-secondary hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={userloginfunction}>Log In</button>
              </div>
              <div className="flex justify-center pt-3">
                <h3>Don't Have an account ?<span className='px-2 underline cursor-pointer text-secondary hover:text-red-400'><Link to={'/signup'}>Signup</Link></span></h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
