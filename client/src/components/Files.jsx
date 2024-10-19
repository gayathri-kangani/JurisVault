import { useState } from "react"
import pdf from "../assets/pdf.png"

export default function Files({ contract, account, title }) {


  const [allfiles, setAllFiles] = useState([])
  const [otherAddress, setOtherAddress] = useState("");

  console.log('files:contract', contract)
  console.log('files:account', account)


  const GetAllFiles = async () => {
 
    const Otheraddress = document.querySelector(".address").value;
    try {

        let files;
        if(!Otheraddress){
          alert('Enter The Address')
        } else{
          
        files = await contract.display(Otheraddress)
        }
        console.log('files', files)
        // Parse the files array into URL and filename pairs
      const pairs = [];
      for (let i = 0; i < files.length; i += 2) {
        pairs.push({ url: files[i], filename: files[i + 1] });
      }
      setAllFiles(pairs);
    } catch (e) {
      alert("You don't have access");
      setAllFiles([]);
    }
  

  }
 

  return (
    <div className="m-2 md:m-10 mt-15 p-2 md:p-10 bg-white rounded-3xl">

    <div className="text-3xl font-bold  shadow-sm text-dark mb-10  border-bottom-1">Other Files </div>
      
      <div className='p-3 bg-gray-100 rounded-md w-3/4 mb-10'>
                <input
                        type="text"
                        placeholder="Enter Others Address "
                        className="address mx-10 px-5 py-2 rounded-md bg-slate-200 w-1/2"
                    />

                    <button className="w-32 bg-blue-400 text-white font-semibold rounded-lg px-5 py-2"  onClick={GetAllFiles}>
                        Load Files
                    </button> 
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
  )
}


 