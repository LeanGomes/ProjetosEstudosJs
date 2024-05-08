const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

//Configuração multer que lida com o upload de arquivos
const upload = multer ({dest: ' upload/'});

//Rota para renderizar o formulario

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

});

// ROta para lidar com o envio do arquivo
app.post('/enviar-arquivo', upload.single('arquivo'), (req, res) => {
    const arquivo = req.file;
    //Verifica se o qruivo foi enviado
    if (!arquivo) {
        res.status(400).send('Por favor, selecione um arquivo.');
        return;
    }

    //Configuração do Nodemailer para o envio do email
    const transporter = nodemailer.createTransport({
        service: 'Serviço de email',
        auth: {
            user: 'seu_email',
            pass: 'sua_senha'
        }
    });
    const mailOptions = {
        from: 'seu_email',
        to: 'destinatario_email',
        subject: 'Arquivo enviado por formulário',
        text: 'Por favor, encontre em anexo o arquivo enviado.',
        attachments: [
            {
                filename: arquivo.originalname,
                path: arquivo.path
            }
        ]
    };

    // Envie o e-mail com o arquivo anexado
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o e-mail:', error);
            res.status(500).send('Ocorreu um erro ao enviar o e-mail.');
        } else {
            console.log('E-mail enviado:', info.response);
            res.send('O arquivo foi enviado com sucesso por e-mail.');
        }

        // Exclua o arquivo temporário após o envio do e-mail
        fs.unlinkSync(arquivo.path);
    });
});

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
