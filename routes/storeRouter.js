const { Router } = require("express")
const storeController = require("../controllers/storeController")
storeRouter = Router()

storeRouter.get("/", storeController.getProducts)
storeRouter.get("/product/:id", storeController.getProduct)
storeRouter.get("/category/:id", storeController.getCategory)

module.exports = storeRouter
