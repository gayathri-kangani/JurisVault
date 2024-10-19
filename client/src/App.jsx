import "./App.css"
import { useEffect, useState } from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from './utils/endpoints';


import { BrowserRouter } from "react-router-dom";
import Layout from './components/shared/Layout';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components/Landing_pages";
import {Calendar, Dashboard, Files, Kanban, LoginPage, MyFiles, Profile, Share, Transactions, Metamask, Support} from './components'

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${account}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchUserData();
  }, [account]);

  // Set role once userData is fetched
  useEffect(() => {
    if (userData) {
      setRole(userData.role);
    }
  }, [userData]);

  useEffect(() => {
    connectMetamask();
  }, []); // Empty dependency array to ensure it runs only once on mount

  const connectMetamask = async () => {
    try {
      console.log("this is connectMetamask");
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          // Redirect to login page if account changes
          window.location.href = "/login";
        });
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log(account);
        setIsConnected(true); 
        console.log("isConnected:",isConnected);
        const contract = new ethers.Contract(
          contractAddress, contractAbi, signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask not detected");
      }
    } catch (error) {
      console.error("Error connecting to Metamask:", error.message);
    }
  };

  function LandingLayout() {
    return (
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        {/* <Works />
        <Feedbacks /> */}
        <div className='relative z-0'>
          <Contact />
        </div>
      </div>
      
    
    );
  }

  
  return (
      <div className="App text-black">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<LandingLayout />} />
            <Route path="/metamask" element={<Metamask />} />
            <Route path="/login" element={<LoginPage />} />
  
            {/* Private Route */}
            <Route path="/" element={<Layout account={account} />}>
                <Route index element={<Dashboard account={account} />} />
                
                {/* Common routes for all roles */}
                <Route path="profile" element={<Profile account={account} />} />
                <Route path="share" element={<Share />} />
                <Route path="history" element={<Transactions contractAddress={contract} account={account} contractAbi={contractAbi} />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="support" element={< Support/>} />
  
                {/* Conditionally render routes based on the role */}
                {role === "lawyer" && (
                  <>
                    <Route path="myFiles" element={<MyFiles account={account} contract={contract} provider={provider} />} />
                    <Route path="files" element={<Files account={account} contract={contract} provider={provider} />} />
                    <Route path="tasks" element={<Kanban />} />
                  </>
                )}
  
                {role === "client" && (
                  <>
                    <Route path="myFiles" element={<MyFiles account={account} contract={contract} provider={provider} />} />
                    <Route path="tasks" element={<Kanban />} />
                  </>
                )}
  
                {role === "judge" && (
                  <>
                    <Route path="files" element={<Files account={account} contract={contract} provider={provider} />} />
                    <Route path="tasks" element={<Kanban />} />
                  </>
                )}
              </Route>
            
          </Routes>
        </Router>
      </div>
    
    
  

    // <main className="flex h-screen">
    //   <Routes>
      //{/* Public Routes */}
      // <Route path="/" element={<LandingLayout />} /> 
      // <Route
      //   path="/login"
      //   element={<LoginPage account={account} />}
      // /> 

    //  {/* Private Routes */}
      // {isConnected ? (
      //   <>
      //     <Route path="/main/*" element={<Layout account={account} />}>
      //       <Route index element={<Dashboard account={account}/>} />
      //       <Route path="profile" element={<Profile account={account}/>} />
      //       <Route path="share" element={<Share />} />
      //       <Route path="myFiles" element={<MyFiles account={account} contract={contract} provider={provider}/>} />
      //       <Route path="files" element={<Files account={account} contract={contract} provider={provider}/>} />
      //       <Route path="history" element={<Transactions account={account} contract={contract} provider={provider}/>} />
      //     </Route>
      //     <Route path="*" element={<Navigate to="/main" />} />
      //   </>
      // ) : (
      //   <Route path="*" element={<Navigate to="/login" />} />
      // )}

    //  {/* Fallback Route */}
     // {/* <Route path="*" element={<Navigate to="/" />} /> */}
    // </Routes>
      
    // </main>
  );
}

export default App;
