import { useState, useEffect } from "react";
import axios from "axios";
import { API_Key, API_Secret } from "../utils/endpoints";
import pdf from "../assets/pdf.png"
import { Header } from '../components/shared';


const MyFiles = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: API_Key,
            pinata_secret_api_key: API_Secret,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        const filename = prompt("Enter filename for the image:");

        // If the filename is provided, add the image URL and filename to the blockchain
        if (filename) {
          contract.add(account, ImgHash, filename);
          alert("Image uploaded successfully");
        } else {
          alert("Filename not provided. Image not uploaded.");
        }

        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        console.error("Error uploading image to Pinata:", error);
        alert("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const [allfiles, setAllFiles] = useState([]);

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        let files;
        files = await contract.display(account);
        console.log('files', files);

        // Parse the files array into URL and filename pairs
        const pairs = [];
        for (let i = 0; i < files.length; i += 2) {
          pairs.push({ url: files[i], filename: files[i + 1] });
        }
        setAllFiles(pairs);
      } catch (e) {
        //alert("You don't have access");
        console.log("you dont have access");
        setAllFiles([]);
    }
  };

    getAllFiles(); // Fetch files when component mounts
  }, [contract, account]); // Run effect when contract or account changes

  return (
    <div className="m-2 md:m-10 mt-15 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="My Files" />
    <div className="bg-slate-50 shadow-inner hover:shadow-lg p-10 m-5 rounded-lg w-fit mx-auto">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="bg-blue-500 px-8 py-4 font-semibold text-dark rounded-lg m-10">Choose File</label>
        {/* <span>Account: {account}</span> */}
        <input
        
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
       
        <span className="textArea mx-10">File Name : {fileName}</span>
        <br/><br/>
        <button type="submit" className="bg-blue-500 px-8 py-4 ml-56 font-semibold text-dark rounded-lg" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>

<div className="text-3xl font-bold text-dark border-bottom-3 border-black my-10 mx-5">

</div>
<ul role="list" className="grid grid-cols-1 md:grid-cols-8">
{allfiles.map((file, index) => (
  <li key={index} className="flex justify-between gap-x-1 py-2 px-4">
    <div className="flex min-w-0 gap-x-4">
    <a href={file.url} target="_blank" rel="noopener noreferrer">
      <img src={pdf} alt="Image" className="w-24"/>
      <div className="min-w-0">
          <p className="text-sm w-24 font-semibold leading-6 text-gray-900 whitespace-normal break-words mb-1"> {file.filename}</p>
      </div>
        </a>
      </div>
    
  </li>
))}
</ul>
</div>
  );
};
export default MyFiles;