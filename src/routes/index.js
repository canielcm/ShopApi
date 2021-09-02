const {Router} = require('express');
const router = Router();
const {getCostumers, getCostumerById, updateCostumerById, addCostumer, deleteCostumerById} = require('../controllers/costumer.controller');
const {getProducts, getProductById, addProduct, updateProductById, deleteProductById, getProductsData, getProductsDataByCategory}= require('../controllers/product.controller');
const {getCart, addToCart, updateCartProduct, deleteCartProduct, deleteCart}= require('../controllers/cart.controller');
const {makePurchase, getPurchasesById, getPurchases, getPurchasesByCostumerId, updatePurchaseStatus}= require('../controllers/purchase.controller');
const {addHome, getHomeById, getHomeByAddress} = require('../controllers/home.controller');
const {getproviders, getproviderById, updateProviderById, addProvider}= require('../controllers/provider.controller');
// costumer routes
router.get('/costumers', getCostumers);
router.get('/costumers/:id', getCostumerById);
router.post('/costumers', addCostumer);
router.put('/costumers/:id', updateCostumerById);
router.delete('/costumers/:id',deleteCostumerById);

// product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', addProduct);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);
  // productData (additional queries)
  router.get('/productsdata', getProductsData)
  router.get('/productsdata/:category', getProductsDataByCategory);

// cart routes
router.get('/cart/:idcostumer', getCart);
router.post('/cart',addToCart);
router.put('/cart', updateCartProduct);
router.delete('/cart/:idcostumer/:idproduct', deleteCartProduct)
router.delete('/cart/:idcostumer', deleteCart);

// purchase routes
router.get('/purchase', getPurchases);
router.get('/purchase/:id', getPurchasesById);
router.get('/purchase/costumer/:idcostumer', getPurchasesByCostumerId)
router.post('/purchase',makePurchase);
router.put('/purchase/:id', updatePurchaseStatus)

// home routes
router.get('/home/:id', getHomeById);
router.get('/home/:city/:homeaddress', getHomeByAddress);
router.post('/home', addHome);

// provider routes
router.get('/provider', getproviders);
router.get('/provider/:id', getproviderById);
router.post('/provider', addProvider);
router.put('/provider/:id', updateProviderById);

module.exports = router;