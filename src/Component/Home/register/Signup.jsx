import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import Loader from '../loader/Loader';
import signupImage from '/img/register.jpeg';

function Signup() {
  const {loading , setloading} = useData();
  
  const navigate = useNavigate();

  const [userSignup , setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })

  // user signup function

  const userSignupFunction = async (e) => {
    e.preventDefault(); 
    // validation 
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
        toast.error("All Fields are required")
    }
    setloading(true)
    try {
        const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
        console.log("fkkfk")
        // create user object
        const user = {
            name: userSignup.name,
            email: users.user.email,
            uid: users.user.uid,
            role: userSignup.role,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }

        // create user Refrence
        const userRefrence = collection(fireDB, "user")

        // Add User Detail
        addDoc(userRefrence, user);

        setUserSignup({
            name: "",
            email: "",
            password: ""
        })

        toast.success("Signup Successfully");

        setloading(false);
        navigate('/login')
    } catch (error) {
        console.log(error);
        setloading(false);
    }

}
  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img src={signupImage} alt="Signup" className="h-auto max-h-full max-w-full" />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 flex justify-center items-center p-8">
        {loading && <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"><Loader /></div>}
          <div className="w-full max-w-md">
            <h2 className="text-2xl mb-8 font-semibold text-gray-800">Create an account</h2>
            <form onSubmit={userSignupFunction}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                <input type="text" id="username" name="username" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required  value={userSignup.name} onChange={(e) => setUserSignup({...userSignup , name: e.target.value})}/>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required value={userSignup.email} onChange={(e) => setUserSignup({...userSignup , email: e.target.value})}/>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required value={userSignup.password} onChange={(e) => setUserSignup({...userSignup , password: e.target.value})}/>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-secondary hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={userSignupFunction}>Create Account</button>
              </div>
              <div className="flex justify-center pt-3">
                <h3>Already have account ?<span className='px-2 underline cursor-pointer text-secondary hover:text-red-400'><Link to={'/login'}>Login</Link></span></h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
