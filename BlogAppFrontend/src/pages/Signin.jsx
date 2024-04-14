import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice";
import {  useDispatch,useSelector } from "react-redux";
import OAuth from "../Components/OAuth";

function Signin() {
  const [formData, setFormData] = useState([]);
  
  //user is the name we have given in the userSlice.js file
  const {loading,error:errorMessage}=useSelector(state=>state.user)

  const dispatch=useDispatch();

  //this hook is used to navigate to a different page
  const navigate = useNavigate();

  //in the below we are getting hold of the value we are typing in the  input box
  //.trim is used to remove the extra spaces between the letters
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //console.log(formData)
  const handleSubmit = async (e) => {
    //when we'll click on the submit button the page gets refreshed
    //so to stop it from refreshing
    //we're successfully logging in the user
    e.preventDefault();

    //if the form is empty we are returning inplace of submiting the data
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all the fields'));
    }

    //overhere we are sending the data to the backenend server of the page
    try {
     /* setLoading(true);
      setErrorMessage(null);*/


      //in the below we are using the functions from the store.js
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //the below we're checking if the data entered is already been added or not
      //for this we're are using the "success" we are receiving from the customMiddleware we created in the app.js
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      
      //if the response is ok , then we are navigating to the sign in page
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/");
      }
    } catch (error) {
      //the below error is in the client-side , this error takes place if the user is not having interned or something
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20  ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 ">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Rohit's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">
            This is a demo project . You can sign in with your email and
            password or with Google .
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                className="w-full"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**************"
                className="w-full"
                id="password"
                onChange={handleChange}
              />
            </div>
            {/*while we're loading the page the below button is gonna get disabled*/}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </div>
              ) : (
                "SignIn"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an Account ?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
