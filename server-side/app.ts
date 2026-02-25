import express from 'express';
import router from './routes/candidate.route';
import cors from 'cors';
const app = express();      
const port : number = 4040 ; 

app.use(cors({
    origin: 'http://localhost:3000',          // exato origin do teu Next.js
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(router);


app.listen(port , (err) =>{
    if(err) console.log('Erro iniciar a aplicação! \n Motivo do erro : ' + err);
    console.log('Server rodando na porta ' , port);
})




















