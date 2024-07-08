// Importação do Express
const { app, db } = require("./config.js")

// Configuração de Rotas (Front-End)

    // Criar Pedido
        app.get("/", async function(req, res)
        {

            var estoque = await db.collection('Estoque').get()

            var paes = []

            estoque.forEach((doc) => {
                paes.push({
                    Nome: doc.get('Nome'),
                    Descricao: doc.get('Descricao'),
                    Valor: doc.get('Valor'),
                    Imagem: doc.get('Imagem')
                })
            })

            res.render("create", {paes});
        })

    // Guardar Pedido
    app.post('/create_pedido', async (req, res) => {
        try {
        // Verifica se cartData está presente e é um objeto válido
        if (!req.body.cartData) {
            return res.status(400).json({ error: 'Dados do carrinho estão faltando' });
        }
    
        const cartData = JSON.parse(req.body.cartData); // Parse the cart data from the request
    
        // Verifica se o carrinho está vazio
        if (Object.keys(cartData).length === 0) {
            return res.status(400).json({ error: 'O carrinho está vazio' });
        }
    
        // Create a new order object
        const newOrder = {
            items: cartData,
            total: parseFloat(req.body.total_ordering) || 0, // Total amount passed in the form, defaults to 0
            createdAt: new Date().toISOString() // Adding a timestamp
        };
    
        // Save the order to the Firestore collection "Pedidos"
        const docRef = await db.collection('Pedidos').add(newOrder);
    
        // Send a response back to the client
        res.json(newOrder)
        
        } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
        }
    });

    /// Rota para listar pedidos
    app.get('/listar_pedidos', async (req, res) => {
        try {
        // Obtém os pedidos ordenados por createdAt
        const snapshot = await db.collection('Pedidos').orderBy('createdAt', 'desc').get();
    
        const pedidos = [];
        snapshot.forEach((doc) => {
            // Para cada documento, monta o objeto pedido com um formato de ID personalizado
            const pedido = {
            id: doc.id, // ID do documento no Firebase
            pedidoId: pedidos.length + 1, // Número sequencial do pedido
            items: [], // Inicializa array de itens
            total: doc.data().total // Total do pedido
            };
    
            // Verifica se há itens no documento antes de iterar sobre eles
            if (doc.data().items) {
            // Adiciona cada item do pedido ao array de itens do pedido
            Object.keys(doc.data().items).forEach((key) => {
                const item = doc.data().items[key];
                pedido.items.push({
                quantity: item.quantity,
                name: key, // Nome do item é a chave do objeto
                price: item.price
                });
            });
            }
    
            pedidos.push(pedido);
        });
    
        // Renderiza o template Handlebars com os dados dos pedidos
        res.render('read', { pedidos });
        } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro ao listar pedidos' });
        }
    });

    // Editar Pedido


// Fim da Configuração de Rotas (Front-End)