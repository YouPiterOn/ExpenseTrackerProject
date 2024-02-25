const { Product } = require("../models/product");

async function getProductListController (req, res) {
    try {
        const products = await Product.find();
        res.render('list', { products });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function getProductNewController (req, res) {
    try {
        res.render('new');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postProductNewController (req, res) {
    try {
        const { id, name, price, description, stock } = req.body;
        await Product.create({ id, name, price, description, stock });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProductIdController (req, res) {
    try {
        const product = await Product.findOne({ id: req.params.id });
    
        if (!product) {
          return res.status(404).send('Product not found');
        }
    
        res.render('product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getProductIdController,
    getProductListController,
    getProductNewController,
    postProductNewController
};