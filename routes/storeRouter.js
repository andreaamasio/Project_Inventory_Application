const { Router } = require("express")
const storeController = require("../controllers/storeController")
storeRouter = Router()

storeRouter.get("/", storeController.getProducts)

module.exports = storeRouter
