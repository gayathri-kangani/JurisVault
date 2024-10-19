import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components/shared';
import pic from '../data/avatar.jpg';

const Profile = ({ account }) => {


  const [userData, setUserData] = useState(null);

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

  return (
    <div className="m-2 md:m-10 mt-15 p-2 md:p-10 bg-white rounded-3xl">
  <Header title="My Profile" />
  <div className='bg-gray-50 p-5 flex gap-16 rounded-lg'>
    <div>
      <img src={pic} alt="Profile pic" className='bg-gray-50 w-64 rounded-lg' />
    </div>
    <div className="text-white text-2xl flex-1">
      {userData ? (
        <div>
          <p className="text-3xl my-5 font-extrabold tracking-tight text-slate-900">{userData.role}</p>
          <p className="text-black my-5 mb-2 font-bold">Username : <span className="text-black font-semibold">{userData.username}</span></p>
          <p className="text-black font-bold my-5 mb-2">Email: <span className="text-black font-semibold">{userData.email}</span></p>
          <p className="text-black font-bold mb-2 my-5">MetaMask ID: <span className="text-black font-semibold">{userData.metamaskId}</span></p>
          <p className="text-black font-bold mb-2 my-5">Operations Can be performed are:
          {userData.role === "lawyer" && (
                <>
                    
                    <ul type="circle">
                        <li>Upload Documents</li>
                        <li>See Others' Files</li>
                    </ul>
                </>
            )}
            {userData.role === "client" && (
                <>
                    <span>Upload Documents</span>
                    <ul>
                        {/* List items specific to client */}
                    </ul>
                </>
            )}
            {userData.role === "judge" && (
                <>
                    <ul>
                        <li>See Others' Files</li>
                    </ul>
                </>
            )}
          </p>
          {/* Avoid displaying password in the UI */}
        </div>
      ) : (
        <p className="text-lg">Loading user data...</p>
      )}
    </div>
  </div>
</div>

  );
};

export default Profile;
