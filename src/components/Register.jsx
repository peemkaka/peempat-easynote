import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      console.log("User Registered Successfully!!");
      window.location.href = "/login";
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Create an Account</h1>
		<form onSubmit={handleRegister}>
			<div className="flex gap-4">
      <div className="mb-4">
				<label for="fname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First name</label>
				<input 
        onChange={(e) => setFname(e.target.value)}
        type="fname" 
        id="fname" 
        className=" shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your firstname" required/>
			</div>
      <div className="mb-4">
				<label for="lname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last name</label>
				<input 
        onChange={(e) => setLname(e.target.value)}
        type="lname" 
        id="lname" 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your lastname" required/>
			</div>
      </div>
			<div className="mb-4">
				<label for="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your email</label>
				<input 
        onChange={(e) => setEmail(e.target.value)}
        type="email" 
        id="email" 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required/>
			</div>
			<div className="mb-4">
				<label for="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input 
        onChange={(e) => setPassword(e.target.value)}
        type="password" 
        id="password" 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required/>

			</div>
			<div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-[16px]">
          <p className="text-white/50">Already have a account</p> 
          <a href="/login" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login here</a>
        </div>
       
			</div>
			<button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Account
      </button>
		</form>
	</div>
</div>
  );
}
export default Register;