import axios from 'axios';

export const storeData = async (endpoint, selectedFile) => {
  const url = `http://invoice.collectguru.in/v1/${endpoint}/storeData`;
  const formData = new FormData();
  formData.append('sheet', selectedFile); 

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, formData, config);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error storing data');
  }
};


export const generatePDF = async (endpoint) => {
    const url = `http://invoice.collectguru.in/v1/${endpoint}/generatePDF`;
  
    try {
      const response = await axios.get(url); 
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error generating PDF');
    }
  };

  export const generateZIP = async (endpoint) => {
    const url = `http://invoice.collectguru.in/v1/${endpoint}/generateZip`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/zip',
        },
        responseType: 'blob', // Set response type to blob for binary data
      });
  
      // Return the response data (the ZIP file)
      return response.data;
    } catch (error) {
      console.error('Error generating ZIP:', error);
      throw new Error(error.response ? error.response.data.message : 'Error generating ZIP');
    }
  };
  