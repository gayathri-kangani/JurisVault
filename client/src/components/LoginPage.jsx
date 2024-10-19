import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import { useNavigate, Link } from "react-router-dom";
import login from "../assets/login.webp";
import signup from "../assets/signup.webp"

function LoginPage() {
  
  const weurl = "http://localhost:5000/auth";

  const history = useNavigate();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("lawyer");
  const [metamaskId, setMetamaskId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  useEffect(() => {
    // Check if Metamask is installed
    if (window.ethereum) {
      // Initialize Metamask
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        // Set initial Metamask ID
        setMetamaskId(accounts[0]);
        console.log("first account in login:",metamaskId);
        // Listen for changes in Metamask account
        window.ethereum.on('accountsChanged', (newAccounts) => {
          // Update Metamask ID when account changes
          setMetamaskId(newAccounts[0]);
          console.log("new account in login:",metamaskId);
        });
      }).catch(error => {
        // Handle error if Metamask is not installed or user denies access
        console.error('Error accessing Metamask:', error);
      });
    }
  }, []);
  
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await axios
        .post(weurl, { username, metamaskId, password })
        .then((res) => {
          if (res.data == "exists") {
            history("/", { state: { id: metamaskId, username } });
          } else if (res.data == "Wrong Password") {
            alert("Wrong Password");
          } else if (res.data == "not exists") {
            alert("User not found");
          } else if (res.data == "Username not exists") {
            alert("Username not exists");
          } else if (res.data == "MetamaskId not exists") {
            alert("MetamaskId not exists");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await axios
        .post(weurl, {
          username,
          email,
          role,
          metamaskId,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data == "exists") {
            alert("User already exists");
          } else if (res.data == "not exists") {
            history("/", { state: { id: metamaskId } });
          }
          else if (res.data == "passwords do not match"){
            alert("passwords do not match");
          }
          else if (res.data == "Please fill in all required fields"){
            alert("Please fill in all required fields");
          }
          else if (res.data == "Please enter a valid email address"){
            alert("Please enter a valid email address");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }


  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`loginContainer bg-hero-pattern bg-cover bg-no-repeat bg-center ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">

          <form action="POST" className="sign-in-form loginForm">
            <h2 className=" font-bold text-white text-5xl my-10">Sign in</h2>

          {/* ------------- Username ----------- */}
          <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
            <input className='LoginInput leading-tight focus:outline-none focus:shadow-outline bg-transparent appearance-none' type="text" 
            onChange={(e) => {setUsername(e.target.value)}} 
            name='username'
            placeholder="Username" 
            required />
            </div>

          {/* ------------- MetamaskId ----------- */}
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" 
              value={metamaskId || ''}
              onChange={(e) => { setMetamaskId(e.target.value); }}
              name='metamaskId'
              placeholder="Metamask ID" 
              required />
            </div>

          {/* ------------- Password ----------- */}
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input className='LoginInput' type="password" 
              onChange={(e) => { setPassword(e.target.value); }}
              name='password'
              placeholder="Password" 
              required />
            </div>

          {/* ------------- Login Submit ----------- */}
            <input 
              className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-9 py-3 mt-6 text-white font-bold text-lg rounded-3xl border-2 border-black hover:border-white transition ease-in-out '
              type='submit'
              onClick={handleSignIn}
              defaultValue="Login"
              />
      
          </form>

{/*=========================== Sign Up ============================== */}

          <form action="POST" className="sign-up-form loginForm">
            <h2 className=" font-bold text-white text-5xl my-10">Sign up</h2>

          {/* ------------- Username ----------- */}
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
            <input className='LoginInput leading-tight focus:outline-none focus:shadow-outline bg-transparent appearance-none' type="text" 
            onChange={(e) => {setUsername(e.target.value)}} 
            name='username'
            placeholder="Username" />
            </div>

          {/* ------------- Email ----------- */}
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto'/>
              <input className='LoginInput' type="email" 
              onChange={(e) => {setEmail(e.target.value); }} 
              name='email'
              placeholder="Email" />
            </div>

          {/* ------------- Role ----------- */}
            <div className='input-fields '>
            <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <label htmlFor="role" className=' font-semibold text-gray-400 text-center '>Role:</label>
              <select id="role" name='role' value={role} onChange={(e) => {setRole(e.target.value);}} className='focus:outline-none active:outline-none border-none bg-transparent w-64'>
                <option value="client">Client</option>
                <option value="lawyer">Lawyer</option>
                <option value="judge">Judge</option>
              </select>
            </div>

          {/* ------------- MetamaskId ----------- */}
          <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" 
              value={metamaskId || ''}
              onChange={(e) => { setMetamaskId(e.target.value); }}
              name='metamaskId'
              placeholder="Metamask ID" />
            </div>

          {/* ------------- Password ----------- */}
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input className='LoginInput' type="password" 
              onChange={(e) => {setPassword(e.target.value); }} 
              name='password'
              placeholder="Password" />
            </div>

           {/* ------------- Confirm Password ----------- */}
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input className='LoginInput' type="password" 
              onChange={(e) => {setConfirmPassword(e.target.value); }} 
              name='confirmPassword'
              placeholder="Confirm password" />
            </div>

          {/* ------------- Register Submit ----------- */}
          <input
                type="submit"
                onClick={handleSignUp}
                className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-9 py-3 mt-6 text-white font-bold text-lg rounded-3xl border-2 border-black hover:border-white transition ease-in-out '
                defaultValue="Sign up"
              />

          </form>
        </div>
      </div>


      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className='loginh3'>New here?</h3>
            <p className='loginp'>
              Create an account to explore our new world of justice with blockchain technology
            </p>
            <button className="btn transparent hover:bg-tertiary" onClick={handleSignUpClick}>
              Sign up
              </button>
          </div>
          <img src={login} class="image" alt="Login" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className='loginh3'>One of us ?</h3>
            <p className='loginp'>
            Unlock new adventures, login to your account. Your journey awaits with just a click. Let's explore together!            </p>
            <button onClick={handleSignInClick}
              className="btn transparent hover:bg-tertiary" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={signup} class="image" alt="" />
        </div>
      </div>
    </div>
  )}

  export default LoginPage