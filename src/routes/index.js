const { Router } = require("express");
const router = Router();

const { login } = require("../controllers/auth.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
  getCostumers,
  getCostumerById,
  updateCostumerById,
  addCostumer,
  deleteCostumerById,
} = require("../controllers/costumer.controller");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getProductsData,
  getProductsDataByCategory,
} = require("../controllers/product.controller");
const {
  getCart,
  addToCart,
  updateCartProduct,
  deleteCartProduct,
  deleteCart,
} = require("../controllers/cart.controller");
const {
  makePurchase,
  getPurchasesById,
  getPurchases,
  getPurchasesByCostumerId,
  updatePurchaseStatus,
} = require("../controllers/purchase.controller");
const {
  addHome,
  getHomeById,
  getHomeByAddress,
} = require("../controllers/home.controller");
const {
  getproviders,
  getproviderById,
  updateProviderById,
  addProvider,
} = require("../controllers/provider.controller");
const {
  getCategories,
  getCategoryById,
  getCategoryByName,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

//auth costumer
router.post("/login", login);

// costumer routes
router.get("/costumers", getCostumers);
router.get("/costumers/:id", getCostumerById);
router.post("/costumers", addCostumer);
router.put("/costumers/:id", updateCostumerById);
router.delete("/costumers/:id", deleteCostumerById);

// product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", deleteProductById);
// productData (additional queries)
router.get("/productsdata", getProductsData);
router.get("/productsdata/:category", getProductsDataByCategory);

// cart routes
router.get("/cart/:idcostumer", [validateJWT], getCart);
router.post("/cart", addToCart);
router.put("/cart", updateCartProduct);
router.delete("/cart/:idcostumer/:idproduct", [validateJWT], deleteCartProduct);
router.delete("/cart/:idcostumer", [validateJWT], deleteCart);

// purchase routes
router.get("/purchase", [validateJWT], getPurchases);
router.get("/purchase/:id",  [validateJWT], getPurchasesById);
router.get("/purchase/costumer/:idcostumer", [validateJWT], getPurchasesByCostumerId);
router.post("/purchase", [validateJWT], makePurchase);
router.put("/purchase/:id", [validateJWT], updatePurchaseStatus);

// home routes
router.get("/home/:id", getHomeById);
router.get("/home/:city/:homeaddress", getHomeByAddress);
router.post("/home", addHome);

// provider routes
router.get("/provider", getproviders);
router.get("/provider/:id", getproviderById);
router.post("/provider", addProvider);
router.put("/provider/:id", updateProviderById);

// category routes
router.get("/category", getCategories);
router.get("/category/:id", getCategoryById);
router.get("/category/name/:name", getCategoryByName);
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
