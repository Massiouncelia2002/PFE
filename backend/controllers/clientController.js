// const Client = require("../models/Client");
// const xlsx = require("xlsx");

// // Ajouter 
// exports.createClient = async (req, res) => {
//     try {
//         const { codeClient, nomClient, email, adress, tel } = req.body;

//         const client = await Client.create({
//             codeClient,
//             nomClient,
//             email,
//             adress,
//             tel
//         });

//         res.status(201).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer 
// exports.getClients = async (req, res) => {
//     try {
//         const clients = await Client.findAll({
//             attributes: ['idClient', 'codeClient', 'nomClient', 'email', 'adress', 'tel'],
//         });

//         res.status(200).json(clients);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// //  Récupérer  par ID
// exports.getClientById = async (req, res) => {
//     try {
//         const { idClient } = req.params;

//         const client = await Client.findByPk(idClient, {
//             attributes: ['idClient', 'codeClient', 'nomClient', 'email', 'adress', 'tel'],
//         });

//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Modifier 
// exports.updateClient = async (req, res) => {
//     try {
//         const { idClient } = req.params;
//         const { codeClient, nomClient, email, adress, tel } = req.body;

//         const client = await Client.findByPk(idClient);
//         if (!client) {
//             return res.status(404).json({ message: "client non trouvé" });
//         }

//         client.codeClient = codeClient;
//         client.nomClient = nomClient;
//         client.email = email || null;
//         client.adress = adress || null;
//         client.tel = tel || null;

//         await client.save();
//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Supprimer
// exports.deleteClient = async (req, res) => {
//     try {
//         const { idClient } = req.params;

//         const client = await Client.findByPk(idClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         await client.destroy();
//         res.status(200).json({ message: "Client supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Importer via Excel
// exports.importClientsFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const clients = data.map(row => ({
//             codeClient: row.codeClient,
//             nomClient: row.nomClient,
//             email: row.email || null,
//             adress: row.adress || null,
//             tel: row.tel || null,
//         }));

//         await Client.bulkCreate(clients, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: clients.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };








// const Client = require("../models/Client");
// const xlsx = require("xlsx");

// // Ajouter un client avec génération automatique de codeClient
// exports.createClient = async (req, res) => {
//     try {
//         const { nomClient, email, adress, tel } = req.body;

//         if (!adress) {
//             return res.status(400).json({ message: "L'adresse est requise pour générer le codeClient" });
//         }

//         // Générer codeClient à partir de l'adresse
//         const prefix = adress.trim().substring(0, 3).toUpperCase();
//         const timestamp = Date.now().toString().slice(-5); // 5 chiffres pour rendre unique
//         const codeClient = `${prefix}${timestamp}`;

//         const client = await Client.create({
//             codeClient,
//             nomClient,
//             email,
//             adress,
//             tel
//         });

//         res.status(201).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer tous les clients
// exports.getClients = async (req, res) => {
//     try {
//         const clients = await Client.findAll({
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel'],
//         });

//         res.status(200).json(clients);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer un client par codeClient
// exports.getClientById = async (req, res) => {
//     try {
//         const { codeClient } = req.params;

//         const client = await Client.findByPk(codeClient, {
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel'],
//         });

//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Modifier un client
// exports.updateClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;
//         const { nomClient, email, adress, tel } = req.body;

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         client.nomClient = nomClient;
//         client.email = email || null;
//         client.adress = adress || null;
//         client.tel = tel || null;

//         await client.save();
//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Supprimer un client
// exports.deleteClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         await client.destroy();
//         res.status(200).json({ message: "Client supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Importer depuis un fichier Excel
// exports.importClientsFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const clients = data.map(row => {
//             const prefix = (row.adress || "XXX").trim().substring(0, 3).toUpperCase();
//             const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

//             return {
//                 codeClient,
//                 nomClient: row.nomClient,
//                 email: row.email || null,
//                 adress: row.adress || null,
//                 tel: row.tel || null
//             };
//         });

//         await Client.bulkCreate(clients, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: clients.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };







// const Client = require("../models/Client");
// const xlsx = require("xlsx");

// // Ajouter un client avec génération automatique de codeClient
// exports.createClient = async (req, res) => {
//     try {
//         const { nomClient, email, adress, tel } = req.body;

//         // Vérifier que tous les champs sont présents
//         if (!nomClient || !email || !adress || !tel) {
//             return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel) sont obligatoires" });
//         }

//         // Générer codeClient à partir de l'adresse
//         const prefix = adress.trim().substring(0, 3).toUpperCase();
//         const timestamp = Date.now().toString().slice(-5); // 5 chiffres pour rendre unique
//         const codeClient = `${prefix}${timestamp}`;

//         const client = await Client.create({
//             codeClient,
//             nomClient,
//             email,
//             adress,
//             tel
//         });

//         res.status(201).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer tous les clients
// exports.getClients = async (req, res) => {
//     try {
//         const clients = await Client.findAll({
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel'],
//         });

//         res.status(200).json(clients);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer un client par codeClient
// exports.getClientById = async (req, res) => {
//     try {
//         const { codeClient } = req.params;

//         const client = await Client.findByPk(codeClient, {
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel'],
//         });

//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Modifier un client
// exports.updateClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;
//         const { nomClient, email, adress, tel } = req.body;

//         // Vérifier que tous les champs sont présents
//         if (!nomClient || !email || !adress || !tel) {
//             return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel) sont obligatoires" });
//         }

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         client.nomClient = nomClient;
//         client.email = email;
//         client.adress = adress;
//         client.tel = tel;

//         await client.save();
//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Supprimer un client
// exports.deleteClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         await client.destroy();
//         res.status(200).json({ message: "Client supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Importer depuis un fichier Excel
// exports.importClientsFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const clients = data.map(row => {
//             if (!row.nomClient || !row.email || !row.adress || !row.tel) {
//                 throw new Error("Tous les champs (nomClient, email, adresse, tel) doivent être remplis dans le fichier Excel");
//             }

//             const prefix = (row.adress || "XXX").trim().substring(0, 3).toUpperCase();
//             const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

//             return {
//                 codeClient,
//                 nomClient: row.nomClient,
//                 email: row.email,
//                 adress: row.adress,
//                 tel: row.tel
//             };
//         });

//         await Client.bulkCreate(clients, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: clients.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };









// const {Client,Depot} = require("../models");
// const xlsx = require("xlsx");

// // Ajouter un client avec génération automatique de codeClient
// exports.createClient = async (req, res) => {
//     try {
//         const { nomClient, email, adress, tel, telType } = req.body;

//         // Vérifier que tous les champs sont présents
//         if (!nomClient || !email || !adress || !tel || !telType) {
//             return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel, telType) sont obligatoires" });
//         }

//         // Générer codeClient à partir de l'adresse
//         const prefix = adress.trim().substring(0, 3).toUpperCase();
//         const timestamp = Date.now().toString().slice(-5); // 5 chiffres pour rendre unique
//         const codeClient = `${prefix}${timestamp}`;

//         const client = await Client.create({
//             codeClient,
//             nomClient,
//             email,
//             adress,
//             tel,
//             telType  // Ajout du champ telType ici
//         });

//         res.status(201).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer tous les clients
// exports.getClients = async (req, res) => {
//     try {
//         const clients = await Client.findAll({
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType'],  // Ajout de telType ici
//         });

//         res.status(200).json(clients);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Récupérer un client par codeClient
// exports.getClientById = async (req, res) => {
//     try {
//         const { codeClient } = req.params;

//         const client = await Client.findByPk(codeClient, {
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType'],  // Ajout de telType ici
//         });

//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Modifier un client
// exports.updateClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;
//         const { nomClient, email, adress, tel, telType } = req.body;

//         // Vérifier que tous les champs sont présents
//         if (!nomClient || !email || !adress || !tel || !telType) {
//             return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel, telType) sont obligatoires" });
//         }

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         client.nomClient = nomClient;
//         client.email = email;
//         client.adress = adress;
//         client.tel = tel;
//         client.telType = telType;  // Ajout de telType ici

//         await client.save();
//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Supprimer un client
// exports.deleteClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         await client.destroy();
//         res.status(200).json({ message: "Client supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Importer depuis un fichier Excel
// exports.importClientsFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const clients = data.map(row => {
//             if (!row.nomClient || !row.email || !row.adress || !row.tel || !row.telType) {
//                 throw new Error("Tous les champs (nomClient, email, adresse, tel, telType) doivent être remplis dans le fichier Excel");
//             }

//             const prefix = (row.adress || "XXX").trim().substring(0, 3).toUpperCase();
//             const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

//             return {
//                 codeClient,
//                 nomClient: row.nomClient,
//                 email: row.email,
//                 adress: row.adress,
//                 tel: row.tel,
//                 telType: row.telType  // Ajout du champ telType ici
//             };
//         });

//         await Client.bulkCreate(clients, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: clients.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };





const { Client } = require("../models");
const xlsx = require("xlsx");

// Ajouter un client avec génération automatique de codeClient
exports.createClient = async (req, res) => {
    try {
        const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

        // Vérifier que tous les champs sont présents
        if (!nomClient || !email || !adress || !tel || !telType) {
            return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel, telType) sont obligatoires" });
        }

       

        // Générer codeClient à partir de l'adresse
        const prefix = adress.trim().substring(0, 3).toUpperCase();
        const timestamp = Date.now().toString().slice(-5); // 5 chiffres pour rendre unique
        const codeClient = `${prefix}${timestamp}`;

        const client = await Client.create({
            codeClient,
            nomClient,
            email,
            adress,
            tel,
            telType,
            codeDepot  // Enregistrer le codeDepot ici
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'],  // Ajout de codeDepot ici
        });

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un client par codeClient
exports.getClientById = async (req, res) => {
    try {
        const { codeClient } = req.params;

        const client = await Client.findByPk(codeClient, {
            attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'],  // Ajout de codeDepot ici
        });

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un client
exports.updateClient = async (req, res) => {
    try {
        const { codeClient } = req.params;
        const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

        // Vérifier que tous les champs sont présents
        if (!nomClient || !email || !adress || !tel || !telType) {
            return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel, telType) sont obligatoires" });
        }

        const client = await Client.findByPk(codeClient);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        client.nomClient = nomClient;
        client.email = email;
        client.adress = adress;
        client.tel = tel;
        client.telType = telType;
        client.codeDepot = codeDepot;  // Mise à jour du codeDepot

        await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
    try {
        const { codeClient } = req.params;

        const client = await Client.findByPk(codeClient);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        await client.destroy();
        res.status(200).json({ message: "Client supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Importer depuis un fichier Excel
exports.importClientsFromExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier envoyé" });
        }

        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        const clients = data.map(row => {
            if (!row.nomClient || !row.email || !row.adress || !row.tel || !row.telType) {
                throw new Error("Tous les champs (nomClient, email, adresse, tel, telType) doivent être remplis dans le fichier Excel");
            }

            const prefix = (row.adress || "XXX").trim().substring(0, 3).toUpperCase();
            const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

            return {
                codeClient,
                nomClient: row.nomClient,
                email: row.email,
                adress: row.adress,
                tel: row.tel,
                telType: row.telType,
                codeDepot: row.codeDepot  // Assurer l'importation de codeDepot
            };
        });

        await Client.bulkCreate(clients, { validate: true });

        res.status(201).json({ message: "Importation réussie", total: clients.length });
    } catch (error) {
        console.error("Erreur import Excel:", error);
        res.status(500).json({ error: error.message });
    }
};
