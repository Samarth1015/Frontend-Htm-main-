import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Uploadfile({ subj }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    setFile(selectedFile); // Set the file state
    convertToBase64(selectedFile); // Convert file to Base64
  };

  // Function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as Data URL (Base64)
      reader.onload = () => {
        setBase64(reader.result); // Set Base64 string to state
        resolve(reader.result); // Resolve with Base64 string
      };
      reader.onerror = (error) => reject(error); // Reject on error
    });
  };
  let handleSubmit = async (e) => {
    console.log("submited");
    e.preventDefault();
    //flask server to send the req;
    await axios.post("", base64);
    router.push("/questions");
  };

  return (
    <div className="mt-44 w-screen ">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center bg-slate-800 w-fit mx-auto rounded-xl h-80">
          <div>
            <h1 className="text-4xl underline text-center">
              Upload Para of book{" "}
            </h1>
            <div className="flex justify-center">
              <img src="/book.png" alt="" className="h-1/2 " />
            </div>
          </div>
        </div>
        <input
          type="file"
          name="file"
          accept="image/*" // Optional: to restrict to image files
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
