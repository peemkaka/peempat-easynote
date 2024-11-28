import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from './Firebase'
import Swal from 'sweetalert2'

const AddNote = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [userDetails, setUserDetails] = useState(null);
  // creating Database Ref
  const dbref = collection(db, "Notes")
  // stroing data to database

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        // console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const createNote = async () => {
    const note = {
      title: title,
      category: category,
      description: description,
      email : userDetails.email
    }
    const success = await addDoc(dbref,note)
    if(success){
      Swal.fire({
        icon: "success",
        title: "Your note has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      setTitle("")
      setCategory('')
      setDescription("")
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      }); 
    }
  }

  const reset = () =>{
      console.log('hi')
      setTitle("")
      setCategory('')
      setDescription("")
  }

  return (
    <>
      <div className='bg-white overflow-hidden shadow-2xl rounded-md border mx-auto min-h-[400px] xl:w-[60vh]'>
        <h2 className='w-full h-[50px] flex items-center p-4 bg-blue-500 text-xl text-white'>Create your note</h2>
        {/* <form> */}
        <div className='shadow-sm rounded-md w-full px-3 py-2'>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='title' autoComplete='off' className='w-full outline-none h-[30px] border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div className='shadow-sm rounded-md w-full px-3 py-2'>
          <input onChange={(e) => setCategory(e.target.value)} value={category} type="text" placeholder='category' autoComplete='off' className='w-full outline-none h-[30px] border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div className='shadow-sm rounded-md w-full px-3 py-2'>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="description" rows="4" cols="50" className='w-full outline-none min-h-[130px] border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div className='flex gap-2 p-4'>
          <button onClick={createNote} className='bg-green-500 p-4 rounded-lg hover:bg-green-600 text-white font-semibold'>Create</button>
          <button onClick={reset} className='bg-red-500 p-4 rounded-lg hover:bg-red-600 text-white font-semibold'>Reset</button>
        </div>
        {/* </form> */}
      </div>
    </>
  )
}

export default AddNote