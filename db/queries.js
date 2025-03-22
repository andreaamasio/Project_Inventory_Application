const pool = require("./pool")

async function getAllProducts() {
  //const { rows } = await pool.query("SELECT * FROM products")
  const { rows } = await pool.query(
    "SELECT p.id, p.name, c.name AS categoryid, pr.name AS producerid, p.price, p.quantity, p.best_before_date, p.image_url FROM products p LEFT JOIN categories c ON p.categoryid = c.id LEFT JOIN producers pr ON p.producerid = pr.id"
  )
  return rows
}
async function getProduct(id) {
  //const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id,])
  const { rows } = await pool.query(
    "SELECT p.id, p.name, c.name AS categoryid, pr.name AS producerid, p.price, p.quantity, p.best_before_date, p.image_url FROM products p LEFT JOIN categories c ON p.categoryid = c.id LEFT JOIN producers pr ON p.producerid = pr.id WHERE p.id = $1",
    [id]
  )
  return rows
}
async function getProductsForCategory(id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE categoryid = $1",
    [id]
  )
  return rows
}
async function insertProduct(
  name,
  categoryid,
  producerid,
  price,
  quantity,
  best_before_date,
  image_url
) {
  await pool.query(
    "INSERT INTO products (name, CategoryID, ProducerID, Price, Quantity, Best_Before_Date, Image_URL) VALUES  ($1,$2,$3,$4,$5,$6,$7)",
    [name, categoryid, producerid, price, quantity, best_before_date, image_url]
  )
  return
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductsForCategory,
  insertProduct,
}
