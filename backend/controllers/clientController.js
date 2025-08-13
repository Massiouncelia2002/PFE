
// const { Client } = require("../models");
// const xlsx = require("xlsx");

// // Ajouter un client avec génération automatique de codeClient
// exports.createClient = async (req, res) => {
//     try {
//         const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

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
//             telType,
//             codeDepot  // Enregistrer le codeDepot ici
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
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'],  // Ajout de codeDepot ici
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
//             attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'],  // Ajout de codeDepot ici
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
//         const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

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
//         client.telType = telType;
//         client.codeDepot = codeDepot;  // Mise à jour du codeDepot

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
//                 telType: row.telType,
//                 codeDepot: row.codeDepot  // Assurer l'importation de codeDepot
//             };
//         });

//         await Client.bulkCreate(clients, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: clients.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };















const { Client,Depot } = require("../models");
const xlsx = require("xlsx");

// // Ajouter un client avec génération automatique de codeClient
// exports.createClient = async (req, res) => {
//     try {
//         const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

//         // Vérifier que tous les champs sont présents
//         if (!nomClient || !email || !adress || !tel || !telType || !codeDepot) {
//             return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel, telType, codeDepot) sont obligatoires" });
//         }

//         // Vérifier que l’adresse contient au moins une lettre (accentuée ou non)
//         if (!/[a-zA-Z\u00C0-\u017F]/.test(adress)) {
//             return res.status(400).json({ message: "L'adresse doit contenir au moins une lettre (même accentuée)" });
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
//             telType,
//             codeDepot
//         });

//         res.status(201).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };





// Ajouter un client
exports.createClient = async (req, res) => {
    try {
        const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

        // Vérification des champs obligatoires
        const requiredFields = ['nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: "Champs obligatoires manquants",
                missingFields
            });
        }

        // Validation de l'adresse
        if (!/[a-zA-ZÀ-ÿ]/.test(adress)) {
            return res.status(400).json({ 
                message: "L'adresse doit contenir au moins une lettre"
            });
        }

        // Validation du dépôt
        const depotExists = await Depot.findByPk(codeDepot);
        if (!depotExists) {
            return res.status(400).json({ 
                message: "Le dépôt spécifié n'existe pas"
            });
        }

        // Génération du code client
        const prefix = adress.replace(/\s+/g, '').substring(0, 3).toUpperCase();
        const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

        const client = await Client.create({
            codeClient,
            nomClient,
            email,
            adress,
            tel,
            telType,
            codeDepot
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ 
            error: "Erreur serveur",
            details: error.message 
        });
    }
};





// Récupérer tous les clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'],
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
            attributes: ['codeClient', 'nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'],
        });

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Modifier un client
// exports.updateClient = async (req, res) => {
//     try {
//         const { codeClient } = req.params;
//         const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

//         // Vérifier que tous les champs sont présents
//         if (!nomClient || !email || !adress || !tel || !telType || !codeDepot) {
//             return res.status(400).json({ message: "Tous les champs (nomClient, email, adresse, tel, telType, codeDepot) sont obligatoires" });
//         }

//         // Vérifier que l’adresse contient au moins une lettre
//         if (!/[a-zA-Z\u00C0-\u017F]/.test(adress)) {
//             return res.status(400).json({ message: "L'adresse doit contenir au moins une lettre (même accentuée)" });
//         }

//         const client = await Client.findByPk(codeClient);
//         if (!client) {
//             return res.status(404).json({ message: "Client non trouvé" });
//         }

//         client.nomClient = nomClient;
//         client.email = email;
//         client.adress = adress;
//         client.tel = tel;
//         client.telType = telType;
//         client.codeDepot = codeDepot;

//         await client.save();
//         res.status(200).json(client);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// Modifier un client
exports.updateClient = async (req, res) => {
    try {
        const { codeClient } = req.params;
        const { nomClient, email, adress, tel, telType, codeDepot } = req.body;

        // Vérification des champs obligatoires
        const requiredFields = ['nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: "Champs obligatoires manquants",
                missingFields
            });
        }

        // Validation de l'adresse
        if (!/[a-zA-ZÀ-ÿ]/.test(adress)) {
            return res.status(400).json({ 
                message: "L'adresse doit contenir au moins une lettre"
            });
        }

        // Validation du dépôt
        const depotExists = await Depot.findByPk(codeDepot);
        if (!depotExists) {
            return res.status(400).json({ 
                message: "Le dépôt spécifié n'existe pas"
            });
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
        client.codeDepot = codeDepot;

        await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ 
            error: "Erreur serveur",
            details: error.message 
        });
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
//             if (!row.nomClient || !row.email || !row.adress || !row.tel || !row.telType || !row.codeDepot) {
//                 throw new Error("Tous les champs (nomClient, email, adresse, tel, telType, codeDepot) doivent être remplis dans le fichier Excel");
//             }

//             if (!/[a-zA-Z\u00C0-\u017F]/.test(row.adress)) {
//                 throw new Error(`L'adresse "${row.adress}" doit contenir au moins une lettre (même accentuée)`);
//             }

//             const prefix = row.adress.trim().substring(0, 3).toUpperCase();
//             const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

//             return {
//                 codeClient,
//                 nomClient: row.nomClient,
//                 email: row.email,
//                 adress: row.adress,
//                 tel: row.tel,
//                 telType: row.telType,
//                 codeDepot: row.codeDepot
//             };
//         });

//         await Client.bulkCreate(clients, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: clients.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };






// // Importer depuis Excel
// exports.importClientsFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const clientsToCreate = [];
//         const errors = [];
//         const seenEmails = new Set();

//         // Validation des données Excel
//         data.forEach((row, index) => {
//             const lineNumber = index + 2;
//             try {
//                 // Vérification des champs obligatoires
//                 const requiredFields = ['nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'];
//                 const missingFields = requiredFields.filter(field => !row[field]);
                
//                 if (missingFields.length > 0) {
//                     throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
//                 }

//                 // Validation de l'adresse
//                 if (!/[a-zA-ZÀ-ÿ]/.test(row.adress)) {
//                     throw new Error("L'adresse doit contenir au moins une lettre");
//                 }

//                 // Validation du téléphone
//                 if (row.telType === "cellulaire" && !/^0[567]\d{8}$/.test(row.tel)) {
//                     throw new Error("Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres");
//                 } else if (row.telType === "fixe" && !/^\d{9}$/.test(row.tel)) {
//                     throw new Error("Numéro fixe invalide. Doit contenir exactement 9 chiffres");
//                 }

//                 // Vérification des doublons dans le fichier
//                 if (seenEmails.has(row.email.toLowerCase())) {
//                     throw new Error("Email en doublon dans le fichier");
//                 }
//                 seenEmails.add(row.email.toLowerCase());

//                 // Génération du code client
//                 const prefix = row.adress.replace(/\s+/g, '').substring(0, 3).toUpperCase();
//                 const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

//                 clientsToCreate.push({
//                     codeClient,
//                     nomClient: row.nomClient,
//                     email: row.email,
//                     adress: row.adress,
//                     tel: row.tel,
//                     telType: row.telType,
//                     codeDepot: row.codeDepot
//                 });
//             } catch (error) {
//                 errors.push({
//                     line: lineNumber,
//                     message: error.message,
//                     details: row
//                 });
//             }
//         });

//         // Vérification des dépôts et emails existants
//         if (clientsToCreate.length > 0) {
//             // Vérification des dépôts
//             const depotCodes = [...new Set(clientsToCreate.map(c => c.codeDepot))];
//             const existingDepots = await Depot.findAll({
//                 where: { codeDepot: depotCodes }
//             });
//             const existingDepotCodes = new Set(existingDepots.map(d => d.codeDepot));

//             // Vérification des emails existants
//             const existingEmails = await Client.findAll({
//                 where: { 
//                     email: clientsToCreate.map(c => c.email) 
//                 },
//                 attributes: ['email']
//             });
//             const existingEmailSet = new Set(existingEmails.map(e => e.email));

//             // Filtrage final
//             const validClients = [];
//             clientsToCreate.forEach(client => {
//                 if (!existingDepotCodes.has(client.codeDepot)) {
//                     errors.push({
//                         line: data.findIndex(row => row.email === client.email) + 2,
//                         message: `Dépôt ${client.codeDepot} n'existe pas`,
//                         details: client
//                     });
//                 } else if (existingEmailSet.has(client.email)) {
//                     errors.push({
//                         line: data.findIndex(row => row.email === client.email) + 2,
//                         message: `Email ${client.email} existe déjà`,
//                         details: client
//                     });
//                 } else {
//                     validClients.push(client);
//                 }
//             });

//             // Importation des clients valides
//             if (validClients.length > 0) {
//                 const result = await Client.bulkCreate(validClients, { validate: true });

//                 if (errors.length > 0) {
//                     return res.status(207).json({
//                         message: `Import partiel: ${result.length} créés, ${errors.length} erreurs`,
//                         created: result.length,
//                         errors: errors.map(e => `Ligne ${e.line}: ${e.message}`),
//                         detailedErrors: errors
//                     });
//                 }

//                 return res.status(201).json({
//                     message: "Importation réussie",
//                     total: result.length
//                 });
//             }
//         }

//         // Cas où tout échoue
//         if (errors.length > 0) {
//             return res.status(400).json({
//                 message: "Aucun client créé - erreurs dans le fichier",
//                 totalErrors: errors.length,
//                 errors: errors.map(e => `Ligne ${e.line}: ${e.message}`),
//                 detailedErrors: errors
//             });
//         }

//         return res.status(400).json({ message: "Aucune donnée valide à importer" });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ 
//             error: "Erreur serveur lors de l'import",
//             details: error.message 
//         });
//     }
// };




// Importer depuis Excel
exports.importClientsFromExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier envoyé" });
        }

        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        const clientsToCreate = [];
        const errors = [];
        const seenEmails = new Set();

        // Validation initiale
        data.forEach((row, index) => {
            const lineNumber = index + 2;
            try {
                // Vérifier champs obligatoires
                const requiredFields = ['nomClient', 'email', 'adress', 'tel', 'telType', 'codeDepot'];
                const missingFields = requiredFields.filter(field => !row[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
                }

                // Adresse : doit contenir au moins une lettre (accentuées incluses)
                if (!/[a-zA-ZÀ-ÿ]/.test(row.adress)) {
                    throw new Error("L'adresse doit contenir au moins une lettre");
                }

                // Téléphone : format selon type
                if (row.telType === "cellulaire" && !/^0[567]\d{8}$/.test(row.tel)) {
                    throw new Error("Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres");
                } else if (row.telType === "fixe" && !/^\d{9}$/.test(row.tel)) {
                    throw new Error("Numéro fixe invalide. Doit contenir exactement 9 chiffres");
                }

                // Doublon dans le fichier
                const emailLower = row.email.toLowerCase();
                if (seenEmails.has(emailLower)) {
                    throw new Error("Email en doublon dans le fichier");
                }
                seenEmails.add(emailLower);

                // Génération du code client
                const prefix = row.adress.replace(/\s+/g, '').substring(0, 3).toUpperCase();
                const codeClient = `${prefix}${Date.now().toString().slice(-5)}`;

                clientsToCreate.push({
                    codeClient,
                    nomClient: row.nomClient,
                    email: row.email,
                    adress: row.adress,
                    tel: row.tel,
                    telType: row.telType,
                    codeDepot: row.codeDepot
                });
            } catch (error) {
                errors.push({
                    line: lineNumber,
                    message: error.message,
                    details: row
                });
            }
        });

        if (clientsToCreate.length === 0) {
            return res.status(400).json({
                message: "Aucune donnée valide à importer",
                totalErrors: errors.length,
                detailedErrors: errors
            });
        }

        // Vérification en base
        const depotCodes = [...new Set(clientsToCreate.map(c => c.codeDepot))];
        const existingDepots = await Depot.findAll({
            where: { codeDepot: depotCodes }
        });
        const existingDepotCodes = new Set(existingDepots.map(d => d.codeDepot));

        const existingEmails = await Client.findAll({
            where: {
                email: clientsToCreate.map(c => c.email)
            },
            attributes: ['email']
        });
        const existingEmailSet = new Set(existingEmails.map(e => e.email.toLowerCase()));

        // Filtrage des clients valides
        const validClients = [];
        clientsToCreate.forEach(client => {
            const lineNumber = data.findIndex(row => row.email === client.email) + 2;

            if (!existingDepotCodes.has(client.codeDepot)) {
                errors.push({
                    line: lineNumber,
                    message: `Dépôt ${client.codeDepot} n'existe pas`,
                    details: client
                });
            } else if (existingEmailSet.has(client.email.toLowerCase())) {
                errors.push({
                    line: lineNumber,
                    message: `Email ${client.email} existe déjà en base`,
                    details: client
                });
            } else {
                validClients.push(client);
            }
        });

        if (validClients.length > 0) {
            const result = await Client.bulkCreate(validClients, { validate: true });

            return res.status(errors.length > 0 ? 207 : 201).json({
                message: errors.length > 0
                    ? `Import partiel: ${result.length} créés, ${errors.length} erreurs`
                    : "Importation réussie",
                created: result.length,
                errors: errors.map(e => `Ligne ${e.line}: ${e.message}`),
                detailedErrors: errors
            });
        }

        // Aucune insertion réussie
        return res.status(400).json({
            message: "Aucun client inséré",
            totalErrors: errors.length,
            detailedErrors: errors
        });

    } catch (error) {
        console.error("Erreur import Excel:", error);
        return res.status(500).json({
            error: "Erreur serveur",
            details: error.message
        });
    }
};
