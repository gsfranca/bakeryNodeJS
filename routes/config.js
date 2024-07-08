const { initializeApp } = require("firebase-admin");
const { express, handlebars, bodyParser, path, admin, getFirestore, serviceAccount } = require("./imports.js")

// Instância do Express
    const app = express()
    

// Configuração da View Engine
    app.use(express.static('public'));
    
    app.engine('handlebars', handlebars({
        helpers: {
            formatPrice: function(price) {
                return parseFloat(price).toFixed(2);
            },
            formatPedidoId: function(id) {
                return 'Pedido ' + id;
            },
            JSONstringify: function (context) {
                return JSON.stringify(context);
            }
        },
        defaultLayout: 'main'
      }));

    // Utilização da View Engine
        app.set("view engine", "handlebars")

    // Pasta padrao de views
        app.set('views', path.join(__dirname, '../views'));

    // Pasta padrao de css
        app.use(express.static(path.join(__dirname, '../public')));

// Configuração do Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

// Config Acesso
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })

// Config Firestore
    const db = getFirestore()

module.exports = { app, db }