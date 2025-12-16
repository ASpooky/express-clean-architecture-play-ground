import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views','src/views')

app.get('/',(req,res)=>{
    console.log('hi!')
    res.sendFile(path.join(__dirname,'views/index.html'))
})

app.listen(PORT,()=>{
    console.log(`Server start ! http://${HOST}:${PORT}`)
})