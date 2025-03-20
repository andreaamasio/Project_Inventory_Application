const { body, validationResult } = require("express-validator")
const db = require("../db/queries")

async function getProducts(req, res) {
  const products = await db.getAllProducts()
  console.log(`Products:`, products)
  res.send("Products: " + products.map((product) => product.name).join(", "))
}

module.exports = { getProducts }
