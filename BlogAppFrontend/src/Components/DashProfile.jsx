import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Call the useState hook and store the result in a variable

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);


  //as we'll click on the profile image it should open the the input file
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    // as we are uploading only one file, so we are putting 0
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      // the below line is used to create the file url
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const uploadImage = async () => {
    // // allow write: if firestore.get(
    // //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //        allow write:if
    //         request.resource.size<2*1024*1024 &&
    //         request.resource.contentType.matches('image/.*')

    //     }
    //   }
    // }

    //the app is the file we have exported from firebase
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on("state_changed",
     (snapshot) => {
      //this creates the uploading effect while we change the image
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUploadProgress(progress.toFixed(0)),
        (error) => {
          setImageFileUploadError(
            "could not upload image (File must be less than 2MB)"
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          });
        }
    });
  };

  //console.log(imageFile, imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  console.log(imageFileUploadError);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" action="">
        {/* "image/*" this shows us all type of image   */}
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
        />

        {/*as we'll click on this div it will initiate the input*/}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >

            {imageFileUploadProgress &&imageFileUploadProgress<100 &&  (
                <CircularProgressbar value={imageFileUploadProgress || 0} 
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                    root:{
                        width:'100%',
                        height:'100%',
                        position:'absolute',
                        top:0,
                        left:0
                    },
                    path:{
                        stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`,
                    }

                }}
                />
            ) }
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'} w-full h-full object-cover border-8 border-[lightgray] rounded-full `}
          />
        </div>
        {imageFileUploadError && 
          <Alert color="failure">{imageFileUploadError}</Alert>
        }

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="text"
          id="password"
          placeholder="password"
          defaultValue="*********"
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 ">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
