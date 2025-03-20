const { body, validationResult } = require("express-validator")
const db = require("../db/queries")

async function getProducts(req, res) {
  const products = await db.getAllProducts()
  console.log(`Products:`, products)
  res.send("Products: " + products.map((product) => product.name).join(", "))
}

async function getProduct(req, res) {
  let productID = req.params.id
  //console.log(productID)
  const product = await db.getProduct(productID)

  console.log(`Product:`, product[0])
  res.send("Product: " + product[0].name)
}
async function getCategory(req, res) {
  let categoryID = req.params.id
  const category = await db.getProductsForCategory(categoryID)

  res.send("Category: " + category.map((product) => product.name).join(", "))
}
module.exports = { getProducts, getProduct, getCategory }
