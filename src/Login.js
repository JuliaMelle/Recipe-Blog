import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FirebaseConfig";
import "./styles/index.css";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/iconLogo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const LogIn = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(database, email, password)
  //     .then((userCredential) => {
  //       console.log(userCredential);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.email.value);

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(database, email, password).then((data) => {
      console.log(data, "authData");
      history("/recipe/:id");
    });
  };

  return (
    <div class="bg-[#EEE4B1] h-lvh">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logo}
            alt="Gourmetgathering"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hello!
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
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="bg-custom-purple">
              <button
                type="submit"
                className="bg-custom-purple flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
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
  );
}