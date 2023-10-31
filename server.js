import express from 'express'
import { ProductManager } from './productmanager';

const app = express();
const productManager = new ProductManager('./products.json');
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
// get products
app.get('/products', async (req, res) => {
    const {limit} = req.query;
    try {
        const products = await productManager.getProducts();
        if (limit){
            res.json(products.slice(0, parseInt(limit)));
        } else{
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
// limit
app.get("/products/limit=10", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products.slice(0,5));
    } catch (error){
        res.status(500).json({error: error.message});
    }
});
// products / number id
app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params;
    const pIdNumber = Number(pid)
    try {
        const product = await productManager.getProductById(pIdNumber);
        res.json(product);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});
// port
app.listen(PORT, () => {
    console.log(`Server express activo en puerto ${PORT}`);
});