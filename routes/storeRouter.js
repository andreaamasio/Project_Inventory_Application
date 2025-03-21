const { Router } = require("express")
const storeController = require("../controllers/storeController")
storeRouter = Router()

storeRouter.get("/", storeController.getProducts)
storeRouter.get("/product/:id", storeController.getProduct)
storeRouter.get("/category/:id", storeController.getCategory)
storeRouter.get("/new_product", storeController.getNewProduct)
storeRouter.post("/new_product", storeController.postNewProduct)

module.exports = storeRouter
