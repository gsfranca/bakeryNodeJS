// Importação do Express
const { app } = require("./config.js")

// Configuração de Rotas (Front-End)

    // Criar Pedido
        app.get("/", function(req, res)
        {
            res.render("create");
        })

    // Visualizar Pedido
        app.get("/read", function(req, res)
        {
            res.render("read");
        })

    // Editar Pedido
        app.get("/edit", function(req, res)
        {
            res.render("edit");
        })
// Fim da Configuração de Rotas (Front-End)