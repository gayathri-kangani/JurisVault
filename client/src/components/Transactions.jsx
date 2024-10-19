import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Header } from '../components/shared';

function Transactions({ contractAddress, account, contractAbi }) {
  const [transactions, setTransactions] = useState([]);
  const endPointAPI = "MBTPY12M48PCGN39H2XTH9GKPVD4ZT5S7E";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const URL = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&contractaddress=${contractAddress}&address=${account}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${endPointAPI}`;
        const response = await axios.get(URL);
        if (response.data.status === "1") {
          setTransactions(response.data.result);
        } else {
          console.error("Error fetching transactions:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, [contractAddress, account, endPointAPI]);

  const decodeMethodID = (input) => {
    if (!input || input.length <= 2) return "No input data"; // Check if input data is empty
    if (!contractAbi) return "ABI not provided";
    const iface = new ethers.utils.Interface(contractAbi);
    const method = iface.parseTransaction({ data: input });
    return method ? method.name : "Unknown";
};

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="m-2 md:m-10 mt-15 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Transactions" />
      <h1 className="font-bold text-3xl m-3 mb-5 text-white">Transaction History</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Block No</th>
            <th className="px-4 py-2">Transaction Hash</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2">{transaction.blockNumber}</td>
              <td className="px-4 py-2 truncate max-w-xs">{truncateText(transaction.hash, 10)}</td>
              <td className="px-4 py-2 truncate max-w-xs">{truncateText(transaction.from, 10)}</td>
              <td className="px-4 py-2 truncate max-w-xs">{truncateText(transaction.to, 10)}</td>
              <td className="px-4 py-2 truncate max-w-xs">{transaction.value}</td>
              <td className="px-4 py-2 truncate max-w-xs">{decodeMethodID(transaction.input)}</td>
              <td className="px-4 py-2">{new Date(parseInt(transaction.timeStamp) * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
