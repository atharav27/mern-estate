import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {app} from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();



  useEffect(() => {
    if(file) {
      handleFileUpload();
    }
  }, [file]);

  

  const handleFileUpload = () =>{
    const storage = getStorage(app); 
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const  progrss = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progrss));
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) =>
          setFormData({...formData, avatar: downloadURL}) 
        )

      });
  }


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async (e) =>{
    try {
      dispatch(deleteUserStart());
      const res  = await fetch(`api/user/delete/${currentUser._id}`,{
        method: 'DELETE', 
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(error.message));
      }
      dispatch(deleteUserSuccess(data))
     } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image" />
        <img
          onClick={() => fileRef.current.click()}
          src={ formData.avatar ||currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover  cursor-pointer self-center mt-2 "
        />
        <p className=" self-center text-sm">
          {fileUploadError ? (<span className="text-red-700">Error image upload</span>) : filePerc > 0 && filePerc < 100 ? (<span className="text-slate-700">{`uploading ${filePerc}
          %`}</span>) : filePerc === 100 ? (<span className="text-green-700">Image Sucessfully Uploaded! </span>) : ""}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}

        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
         {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">
        {console.log('Error:', error)}
        {error ? error : '' }

      </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
};

export default Profile;
