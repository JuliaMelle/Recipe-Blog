import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FirebaseConfig";
import "./styles/index.css";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/iconLogo.png";
import background from "../src/assets/background2.jpg";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        database,
        email,
        password
      );
      console.log(userCredential, "authData");
      history("/recipe");
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setAlertMessage(
          "Invalid credentials. Please check your email and password."
        );
      } else if (error.code === "auth/invalid-credential") {
        setAlertMessage(
          "Invalid email or password. Please make sure you entered them correctly."
        );
      } else {
        console.error(error);
      }
      setAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="bg-[#EEE4B1] h-lvh">
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
                      className="text-lg leading-6 font-medium text-gray-900 ml-5 mt-1"
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
        {" "}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="p-12 bg-white rounded-lg shadow-lg">
            <img
              className="mx-auto h-20 w-auto"
              src={logo}
              alt="Gourmetgathering"
            />
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <h2 className="mb-5 text-center text-2xl font-light leading-9 tracking-tight text-gray-900">
                Login
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                      autoComplete="email"
                      required
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-custom-purple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-darkpurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-custom-purple hover:text-custom-brown"
                >
                  Sign up here!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
