const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importe o módulo cors

const app = express();
const PORT = 3000;

app.use(cors()); // Use o middleware cors aqui

// Restante do seu código


// Configuração do armazenamento temporário dos arquivos enviados
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Ex: Gmail, Outlook
    auth: {
        user: 'dicatexteste@gmail.com',
        pass: 'dica@123'
    }
});

// Rota para enviar o e-mail com anexo
app.post('/sendEmail', upload.single('file'), (req, res) => {
    const { email, subject, body } = req.body;
    const file = req.file;

    const mailOptions = {
        from: 'seu_email',
        to: email,
        subject: subject,
        text: body,
        attachments: [
            {
                filename: file.originalname,
                content: file.buffer
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar o e-mail.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('E-mail enviado com sucesso.');
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
