const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const app = express();
const port = 4000;

app.use(cors());

// Middleware for serving static files (optional)
app.use("/", express.static("public"));
app.use(fileUpload());

app.get('/products', (req, res) => {
  res.send('Hello World from Node.js Server');
});

app.post("/extract-text", (req, res) => {
     // Check if a file is uploaded
     if (!req.files || !req.files.pdfFile) {
       res.status(400).end();
       return;
     }
   
     // Read and parse the PDF file
     const pdfFile = req.files.pdfFile;
     pdfParse(pdfFile.data).then(result => {
       // Send the extracted text back to the client
       res.send(result.text);
     }).catch(error => {
       console.error("Error parsing PDF:", error);
       res.status(500).send("Error extracting text from PDF");
     });
   });
    

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
