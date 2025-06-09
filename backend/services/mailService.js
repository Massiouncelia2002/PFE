
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'servicecomptescevital@gmail.com',
    pass: 'aggz eezh xocg lgax', 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Erreur SMTP:', error);
  } else {
    console.log('✅ Connexion SMTP réussie');
  }
});


const envoyerEmailUtilisateur = async (email, prenom, nom, mdpTemporaire) => {
  const nomComplet = `${prenom} ${nom}`;

  const mailOptions = {
    from: '"Service Comptes CEVITAL" <servicecomptescevital@gmail.com>',
    to: email,
    replyTo: "servicecomptescevital@gmail.com",
    subject: "Création de votre compte utilisateur",

    text: `
Bonjour ${nomComplet},

Votre compte a été créé avec succès.

Voici vos identifiants de connexion :
- Email : ${email}
- Mot de passe temporaire : ${mdpTemporaire}

Merci de vous connecter et de changer votre mot de passe dès que possible.

Pour garantir la bonne réception de nos emails, ajoutez cette adresse à vos contacts : servicecomptescevital@gmail.com

Cordialement,
L'équipe CEVITAL
    `,

    
    html: `
      <p>Bonjour <strong>${nomComplet}</strong>,</p>
      <p>Votre compte a été <strong>créé avec succès</strong>.</p>
      <p>Voici vos identifiants de connexion :</p>
      <ul>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Mot de passe temporaire :</strong> ${mdpTemporaire}</li>
      </ul>
      <p>Veuillez vous connecter et changer votre mot de passe dès que possible.</p>
      <p style="margin-top: 20px; font-size: 13px; color: #555;">
        📩 Pour garantir la bonne réception de nos emails, ajoutez cette adresse à vos contacts :
        <strong>servicecomptescevital@gmail.com</strong>
      </p>
      <br>
      <p>Cordialement,<br>L'équipe <strong>CEVITAL</strong></p>
    `,
    headers: {
      "X-Mailer": "NodeMailer",
      "X-Priority": "3"
    }
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé à :", info.accepted);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
  }
};

module.exports = envoyerEmailUtilisateur;
