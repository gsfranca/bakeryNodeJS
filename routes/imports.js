// Importação de Dependências

    // Import Express
    const express = require('express')

    // Import Handlebars
        const handlebars = require('express-handlebars').engine

    // Import bodyParser
        const bodyParser = require('body-parser')

    // Import Path
        const path = require('path');

    // Import Firebase Admin
        const admin = require('firebase-admin')

    // Import Firebase Firestore
        const { getFirestore } = require('firebase-admin/firestore')

    // Import Chave de Acesso
        const serviceAccount = require('./serviceAccount.json')

// Fim das Importações

module.exports = {express, handlebars, bodyParser, path, admin, getFirestore, serviceAccount}