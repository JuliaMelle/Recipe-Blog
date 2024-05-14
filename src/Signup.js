import "./styles/index.css";
import React, { useState } from "react";
import { database } from "./FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

import logo from "../src/assets/iconLogo.png";
import background from "../src/assets/background2.jpg";
function SignUp() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useNavigate();
  const closeAlert = () => {
    setAlertVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        database,
        email,
        password
      );
      // .then((data) => {
      //   console.log(data, "authData");
      //   history("/recipe/:id");
      // })
      console.log(userCredential, "authData");
      history("/recipe");
    } catch (error) {
      console.error(error);
      // Display a user-friendly message based on the error code
      if (error.code === "auth/weak-password") {
        setAlertMessage(
          "Error: Your password is too weak. It should be at least 6 characters."
        );
      } else {
        setAlertMessage("An error occurred. Please try again.");
      }
      setAlertVisible(true);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    //logo
    <>
      {alertVisible && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="min-h-screen pt-32 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <CiWarning className="w-100 text-3xl bg-red-100 text-red-600 rounded-lg " />

                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 ml-10 mt-1"
                      id="modal-title"
                    >
                      {alertMessage}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeAlert}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex  h-[100vh] flex-1 flex-col justify-center px-6 py-0 lg:px-8
        screen-full"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-cover bg-center">
          <div className="p-12 bg-white rounded-lg shadow-lg">
            <img
              className="mx-auto h-20 w-auto"
              src={logo}
              alt="Your Company"
            />
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <h2 className="mb-5 text-center text-1xl font-light leading-9 tracking-tight text-gray-900">
                Join us and start sharing recipes today!
              </h2>
            </div>
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={250}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      maxLength={250}
                      type={isPasswordVisible ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 focus:outline-none"
                    >
                      {isPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-custom-purple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-darkpurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default SignUp;
