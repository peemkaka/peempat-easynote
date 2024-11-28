import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const CardPage = ({ title, email, description, id,category ,updateUser }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [userDetails, setUserDetails] = useState(null);

  const cancelBtn = () =>{
    setNewTitle("")
    setNewCategory("")
    setNewDescription("")
    setIsEditMode(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const note = {
      id:id,
      title: newTitle === "" ? title : newTitle ,
      category: newCategory === "" ? category : newCategory,
      description: newDescription === "" ? description : newDescription,
      email:email,
    }
    if (!newTitle.trim()|| !newCategory.trim() || !newDescription.trim()) {
      setIsEditMode(false)
    }
    updateUser(note);
    setNewTitle("")
    setNewCategory("")
    setNewDescription("")
    setIsEditMode(false)
  }

 
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        return
        // console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="mt-6 min-w-[600px] shadow-xl rounded-sm bg-white p-6 gap-4">
      {<>
        {!isEditMode && <div>
        <div className="flex justify-between">
          <div className="flex flex-row w-full gap-2 items-center">
            <h1 className="font-bold text-2xl">
              {title} -
            </h1 >
            <div className="font-bold text-2xl text-blue-500 cursor-pointer">
              #{category}
            </div>
          </div>
          { userDetails && !isEditMode && userDetails.email === email && <button onClick={()=>setIsEditMode(true)}>
            <Pencil />
          </button>}

        </div>

        <div className="text-sm text-gray-800/80">
          {email}
        </div>
        <div className="pt-[16px] text-[16px]">
          {description}
        </div>
      </div>}
      {isEditMode && <div className='overflow-hidden mx-auto min-h-[400px] '>
        <h2 className='w-full h-[50px] flex items-center p-4 bg-blue-500 text-xl text-white'>Edit your note</h2>
        <form onSubmit={handleSubmit}>
        <div className='shadow-sm rounded-md w-full px-3 py-2'>
          <input onChange={(e) => setNewTitle(e.target.value)} type="text" placeholder='title' value={newTitle||title} autoComplete='off' className='w-full outline-none h-[30px] border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div className='shadow-sm rounded-md w-full px-3 py-2'>
          <input onChange={(e) => setNewCategory(e.target.value)} type="text" placeholder='category' value={newCategory||category} autoComplete='off'  className='w-full outline-none h-[30px] border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div className='shadow-sm rounded-md w-full px-3 py-2'>
          <textarea onChange={(e) => setNewDescription(e.target.value)} placeholder="description" value={newDescription||description} rows="4" cols="50" className='w-full outline-none min-h-[130px] border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div className='flex gap-2 p-4'>
          <button type="submit" className='bg-green-500 p-4 rounded-lg hover:bg-green-600 text-white font-semibold'>Save</button>
          <button onClick={cancelBtn}  className='bg-red-500 p-4 rounded-lg hover:bg-red-600 text-white font-semibold'>Cancel</button>
        </div>
        </form>
      </div>}
      </>
      }
    </div>
  )
}

export default CardPage