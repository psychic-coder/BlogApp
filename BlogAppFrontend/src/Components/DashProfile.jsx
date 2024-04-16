import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";

import app from "../firebase";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '', // You might want to remove this line if you don't intend to update the password through this form
    profilePicture: currentUser.profilePicture
  });
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image (File must be less than 2MB)");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData(prevState => ({
            ...prevState,
            profilePicture: downloadURL
          }));
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    if(imageFileUploading){
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || formData.profilePicture}
            alt="user"
            className={`${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'} w-full h-full object-cover border-8 border-[lightgray] rounded-full `}
          />
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* You may or may not want to allow password update */}
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        /> 
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 ">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
     {updateUserSuccess && (
      <Alert color="success" className="mt-5">
        {updateUserSuccess}
      </Alert>
     )}
     {
      updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )
     }
    </div>
  );
};

export default DashProfile;
