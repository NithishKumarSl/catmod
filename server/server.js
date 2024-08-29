const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())
app.post('/create-folder', (req, res) => {
  const { projectName } = req.body;
  if (!projectName || projectName.trim() === '') {
    return res.status(400).send('Project name is required');
  }
  const folderPath = path.join(__dirname, 'projects', projectName);
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
      return res.status(500).send('Failed to create folder');
    }
    const files = [
      {
        name: 'index.html',
        content: `<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n<title>${projectName}</title>\n</head>\n<body>\n\n</body>\n<script src="script.js"></script>\n</html>`,
      },
      {
        name: 'style.css',
        content: `/* ${projectName} Styles */\nbody {\n    margin: 0;\n    font-family: Arial, sans-serif;\n}`,
      },
      {
        name: 'script.js',
        content: `// ${projectName} JavaScript\nconsole.log('Hello, ${projectName}!');`,
      },
    ];
    files.forEach((file)=>{
      const filePath = path.join(folderPath, file.name);
      fs.writeFile(filePath, file.content, (err) => {
        if (err) {
          console.error(`Error creating ${file.name}:`, err)
        }
      });
    });
    res.status(200).send('Folder created successfully');
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});