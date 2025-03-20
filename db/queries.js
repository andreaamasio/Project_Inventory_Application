const pool = require("./pool")

async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM products")
  return rows
}
async function getProduct(id) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ])
  return rows
}
async function getProductsForCategory(id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE categoryid = $1",
    [id]
  )
  return rows
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductsForCategory,
}
