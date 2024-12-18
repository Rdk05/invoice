import React, { useState } from "react";
import { toast } from "react-toastify";
import { storeData, generatePDF, generateZIP } from "../Apis/Api";

const StoreData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [endpoint, setEndpoint] = useState("medi");
  const [totalDocuments, setTotalDocuments] = useState(null);
  const [isStoreData, setIsStoreData] = useState(false);
  const [isPDFGenerated, setIsPDFGenerated] = useState(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const [zipFileURL, setZipFileURL] = useState(null); // State to hold the ZIP file URL

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEndpointChange = (event) => {
    setEndpoint(event.target.value);
  };

  const handleStoreData = async () => {
    if (!selectedFile || !endpoint) {
      if (!selectedFile) toast.error("File is required!");
      if (!endpoint) toast.error("Please select an API endpoint!");
      return;
    }

    toast.info("Storing data, please wait...");

    try {
      const response = await storeData(endpoint, selectedFile);

      if (response.message === "Success") {
        setTotalDocuments(response.TotalStoreDocoment);
        toast.success(`Success: ${response.message}`);
        setIsStoreData(true);
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error storing data!");
    }
  };

  const handleGeneratePDF = async () => {
    if (!isStoreData) {
      toast.error("Please store the data first!");
      return;
    }

    toast.info("Generating PDF, please wait...");
    setIsLoadingPDF(true);

    try {
      const pdfResponse = await generatePDF(endpoint);
      if (pdfResponse) {
        toast.success("PDF generated successfully!");
        setIsPDFGenerated(true);
      }
    } catch (error) {
      toast.error("Error generating PDF!");
    } finally {
      setIsLoadingPDF(false);
    }
  };

  const handleGenerateZIP = async () => {
    if (!isPDFGenerated) {
      toast.error("Please generate the PDF first!");
      return;
    }

    toast.info("Generating ZIP file, please wait...");

    try {
      const zipBlob = await generateZIP(endpoint); // Call the updated generateZIP function
      const zipUrl = URL.createObjectURL(zipBlob); // Create a URL for the blob
      setZipFileURL(zipUrl); // Store the generated ZIP URL in state
      
      // Automatically trigger download by creating an anchor tag
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "data.zip"; // Name of the downloaded ZIP file
      link.click();

      toast.success("ZIP file generated and downloading!");
    } catch (error) {
      toast.error("Error generating ZIP!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        value={endpoint}
        onChange={handleEndpointChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select API Endpoint
        </option>
        <option value="medi">MEDITERRANCE PRIVATE LIMITED</option>
        <option value="amg">AMG INFOTECH SOLUTION LLP</option>
        <option value="mindmatrix">MINDMATRIXCARE PRIVATE LIMITED</option>
        <option value="suncare">SUNCARESHINING SOLUTION PRIVATE LIMITED</option>
        <option value="impact">IMPACTPEAK PRIVATE LIMITED</option>
        <option value="nearason">NEARASON SOLUTIONS PRIVATE LIMITED</option>
      </select>

      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        accept=".xlsx"
      />

      {isLoadingPDF && (
        <div className="flex justify-center">
          <span className="loader">Generating PDF...</span>
        </div>
      )}

      <div className="flex space-x-4 justify-center">
        <button
          onClick={handleStoreData}
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
          disabled={!selectedFile || !endpoint}
        >
          Store Data
        </button>

        <button
          onClick={handleGeneratePDF}
          className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer ${!isStoreData ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isStoreData}
        >
          Generate PDF
        </button>

        <a
          onClick={handleGenerateZIP}
          className={`p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 cursor-pointer ${!isPDFGenerated ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isPDFGenerated}
        >
          Generate ZIP
        </a>
      </div>

      {totalDocuments !== null && (
        <div className="mt-4 p-4 border rounded-md border-gray-300">
          <p>Total Store Document: {totalDocuments}</p>
        </div>
      )}
    </div>
  );
};

export default StoreData;
