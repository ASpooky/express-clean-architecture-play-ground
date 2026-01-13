import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PostgresClient } from '../postgres/client.js';

const app = express()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views','src/interface/views') // いまのとこ効いてない

app.get('/checkdb',async(req,res)=>{
    console.log('hi postgres')
    const pgClient = new PostgresClient()
    await pgClient.client.connect()
    const pgRes = await pgClient.client.query("select 'Hello world!' as hello")
    res.send({
        query:"select 'Hello world!' as hello",
        result: pgRes.rows[0].hello
    })
})

app.get('/',(req,res)=>{
    console.log('hi!')
    res.sendFile(path.join(__dirname,'interface/views/index.html'))
})

app.listen(PORT,()=>{
    console.log(`Server start ! http://${HOST}:${PORT}`)
})