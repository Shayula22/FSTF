import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Terminal.css'
import './fontawesome';

const Terminal = () => {
     const [port, setPort] = useState(null);
     const [dataToSend, setDataToSend] = useState('');
     const [connected, setConnected] = useState(false);
     const [selectedBaudRate, setSelectedBaudRate] = useState(null);
     const [show, setShow] = useState(false);
     const [baudRate, setBaudRate] = useState(9600);

     const handleShow = () => setShow(true);
     const handleClose = () => setShow(false);
   
     const handleFileChange = async (e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
               handleUpload(selectedFile);
          }
        };
   
     const connectToSerialPort = async () => {
       try {
         const serialPort = await navigator.serial.requestPort();
         await serialPort.open({ baudRate: baudRate });
         console.log('this one', baudRate)
         setPort(serialPort);
         setConnected(true);
       } catch (error) {
         console.error('Error connecting to serial port:', error);
       }
     };

     const disconnectFromSerialPort = async () => {
          try {
               await port.close()
               setPort(null)
               setConnected(false)
          } catch (error){
               console.log('Error disconnecting from serial port:', error)
          }
     }
   
     const modifyOutput = (value) => {
       const alphabet = ['ა', 'a', 'ბ', 'b', 'გ', 'g', 'დ', 'd', 'ე', 'e', 'ვ', 'w', 'ზ', 'z', 'თ', 'f', 'ი', 'i', 'კ', 'k', 'ლ', 'l', 'მ', 'm', 'ნ', 'n', 'ო', 'o', 'პ', 'p', 'ჟ', 'j', 'რ', 'r', 'ს', 's', 'ტ', 't', 'უ', 'u', 'ფ', 'v', 'ქ', '9', 'ღ', '10', 'ყ', '13', 'შ', '32', 'ჩ', 'q', 'ც', 'c', 'ძ', 'y', 'წ', '0', 'ჭ', 'x', 'ხ', 'h', 'ჯ', '8', 'ჰ', '4'];
   
       let modifiedText = '';
       let inputValue = value;
       for (let i = 0; i < inputValue.length; i++) {
         let index = alphabet.indexOf(inputValue[i]);
         if (index !== -1 && index % 2 === 0) {
           modifiedText += alphabet[index + 1];
         } else {
           modifiedText += inputValue[i];
         }
       }
       return modifiedText;
     }
   
     const handleUpload = async (selectedFile) => {
       const formData = new FormData();
       formData.append('pdfFile', selectedFile);
   
       try {
         const response = await fetch('http://localhost:4000/extract-text', {
           method: 'POST',
           body: formData
         });
   
         if (!response.ok) {
           throw new Error('Failed to upload file');
         }
   
         const result = await response.text();
         setDataToSend(modifyOutput(result));
       } catch (error) {
         console.error('Error uploading file:', error);
       }
     };
   
     const sendData = async () => {
       if (!port || !dataToSend) return;
       try {
         const writer = port.writable.getWriter();
         await writer.write(new TextEncoder().encode(dataToSend));
         console.log('Data sent:', dataToSend);
         setDataToSend('');
         writer.releaseLock();
       } catch (error) {
         console.error('Error sending data:', error);
       }
     };
   
     const handleInputChange = (event) => {
       setDataToSend(modifyOutput(event.target.value));
     };

     const handleBaudRateChange = (event) => {
       const selectedValue = event.target.value;
       setSelectedBaudRate(selectedValue);
     };
     
     const handleSaveChanges = () => {
          setBaudRate(selectedBaudRate);
          notifySuccess()
     }

     const handleReset = () => {
          setBaudRate(9600);
          setSelectedBaudRate(baudRate);
          notifyReset()
     }

     const notifySuccess = () => {
          toast.success('🦄 Wow so easy!', {
               position: "bottom-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: "colored",
          });
     }

     const notifyReset = () => {
          toast.error('🦄 Settings have been reset', {
               position: "bottom-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: "colored",
          });
     }

     return (
          <div className='outer-container'>
            <ToastContainer />
            {!connected && (
               <div className='connectionArea'>
                    <button className='connectBtn' onClick={connectToSerialPort}>Connect</button>
                    <div className='instructions-outer'>
                         <div className='instructions-inner'>
                              <p>🔗 1. Click connect</p>
                              <p>🤔 2. Choose the port</p>
                              <p>✔️ 3. Click connect again</p>
                         </div>
                         <FontAwesomeIcon onClick={handleShow} className='gearIcon' icon={['fas', 'gear']} />
                         <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                   <Modal.Title>Settings</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                   <div className="dropdown">
                                        <select value={selectedBaudRate} onChange={handleBaudRateChange}>
                                             <option value="">Baud Rate</option>
                                             <option value="110">110</option>
                                             <option value="300">300</option>
                                             <option value="600">600</option>
                                             <option value="1200">1200</option>
                                             <option value="2400">2400</option>
                                             <option value="4800">4800</option>
                                             <option value="9600">9600</option>
                                             <option value="14400">14400</option>
                                             <option value="19200">19200</option>
                                             <option value="38400">38400</option>
                                             <option value="57600">57600</option>
                                             <option value="115200">115200</option>
                                             <option value="128000">128000</option>
                                             <option value="256000">256000</option>
                                        </select>
                                   </div>
                              </Modal.Body>
                              <Modal.Footer>
                                   <Button variant="danger" onClick={handleReset}>Reset</Button>
                                   <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                                   <Button variant="secondary" onClick={handleClose}>Close</Button>
                              </Modal.Footer>
                         </Modal>
                    </div>
               </div>
            )}
            {connected && (
              <div className='inner-container'>
               <button onClick={disconnectFromSerialPort}>Disconnect</button>
                <input type="text" value={dataToSend} onChange={handleInputChange} />
                <button onClick={sendData}>Send Data</button>
                <label htmlFor="fileInput" style={{ border: '1px solid grey', borderRadius: '3px', padding: '2px' }}>Select File</label>
                <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>
            )}
          </div>
        );
}

export default Terminal;