import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { contractAbi, contractAddress } from '../utils/endpoints';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Header } from '../components/shared';


const Share = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState('');
    const [provider, setProvider] = useState('');
    const [sharedAddress, setSharedAddress] = useState([]);
    const [myAccess, setMyAccess] = useState([]);

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const loadProvider = async () => {
                if (provider) {
                    window.ethereum.on('chainChanged', () => {
                        window.location.reload();
                    })
                    window.ethereum.on('accountsChanged', () => {
                        window.location.reload();
                    })
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setAccount(address);
                    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
                    setContract(contract);
                    setProvider(provider);
                }
                else {
                    console.log("MetaMask is not installed");
                }
            }
            provider && loadProvider();
        }
        else {
            alert('Please Install Metamask');
        }
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            const accessList = async () => {
                if (provider) {
                    const addressList = await contract.shareAccess();
                    setSharedAddress(addressList);
                    const myAccessList = await contract.getMyAccess();
                    setMyAccess(myAccessList);
                }
            };
            contract && accessList();
        }
    }, [contract]);

    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        window.location.reload();
    };

    const removAccess = async (address) => {
        await contract.disallow(address);
        window.location.reload();
    };

    return (
        <div className="m-2 md:m-10 mt-15 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Access Control" />
            <div id='files' className="bg-white bg-opacity-75 mx-auto max-w-7xl sm:px-6 lg:px-8 py-5 md:py-10 my-5">
                <div className="text-3xl font-bold shadow-sm text-black border-bottom-1">Shared Files With Accounts</div><br/>
                <p style={{ color: "white" }}>
                    {account ? '' : "Please connect your MetaMask account to view"}
                </p>
                <div className="grid grid-cols-5 w-full gap-2 left mb-10 ">
                    <input
                        type="text"
                        placeholder="Enter Others Address "
                        className="address w-full p-5 col-span-2 rounded-xl bg-slate-100"
                    />
                    <button className="button w-64 rounded-lg ml-10 font-semibold bg-blue-400 col-span-1" onClick={() => sharing()}>
                        Share
                    </button>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-1 gap-1">
                    {sharedAddress.map((address, id) => (
                        <li key={id} className="flex justify-between items-center gap-x-1  py-3 px-2">
                            <div className="flex min-w-0 gap-x-1 ">
                                <div className="text-sm font-semibold leading-6 text-black whitespace-normal break-words mb-1">
                                    <span className='font-bold'>Account {id + 1}:</span> {address.user}, Access: {address.access ? "Allowed" : "Denied"}
                                </div>
                                <span className="bg-red-400 ml-10 text-white font-semibold p-3 rounded-lg cursor-pointer"
                                    onClick={() => removAccess(address.user)}>
                                    Remove Access
                                    {/* <TrashIcon className="h-4 w-4 text-red-900  " />   */}
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className="text-3xl font-bold shadow-sm text-black border-bottom-1 mt-5 mb-5">My Access</div>
                <ol className="grid grid-cols-1 md:grid-cols-1 gap-1">
                    {myAccess.map((access, id) => (
                        <li key={id} className="flex justify-between gap-x-1 bg-white bg-opacity-20 py-0 px-2">
                            <div className="flex min-w-0 gap-x-1">
                                <div className="text-sm font-semibold leading-6 text-black whitespace-normal break-words p-5 bg-slate-100 rounded-lg mb-1">
                                    <span className='font-bold'>Account {id + 1}:</span> {access.user}, Access: {access.access ? "Allowed" : "Denied"}
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Share;
