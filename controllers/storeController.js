const { body, validationResult } = require("express-validator")
require("dotenv").config()
const db = require("../db/queries")
const emptyErr = "cannot be empty."
const validateProduct = [
  body("name").trim().notEmpty().withMessage(`Name: ${emptyErr}`),
  body("categoryid")
    .trim()
    .notEmpty()
    .withMessage(`CategoryID: ${emptyErr}`)
    .isInt()
    .withMessage("Quantity must be an integer"),
  body("producerid")
    .trim()
    .notEmpty()
    .withMessage(`ProducerID: ${emptyErr}`)
    .isInt()
    .withMessage("Quantity must be an integer"),
  body("price")
    .notEmpty()
    .withMessage(`Price: ${emptyErr}`)
    .isCurrency({ digits_after_decimal: [2], symbol: "€" })
    .withMessage("Price: must be currency"),
  body("quantity")
    .notEmpty()
    .withMessage(`Quantity: ${emptyErr}`)
    .isInt()
    .withMessage("Quantity must be an integer"),
  body("best_before_date")
    //.toDate()
    .isDate()
    .withMessage("Best Before: is not a date")
    .isAfter()
    .withMessage(
      "Date: must be a valid date in YYYY-MM-DD format and after today"
    ),
  //new Date().toISOString().split("T")[0]

  body("admin_password")
    .matches(process.env.ADMIN_PASSWORD)
    .withMessage("Admin Password: not correct."),
]
async function getProducts(req, res) {
  const products = await db.getAllProducts()

  res.render("index", { products: products })
  //res.send("Products: " + products.map((product) => product.name).join(", "))
}

async function getProduct(req, res) {
  let productID = Number(req.params.id) + 1
  //console.log(productID)
  const product = await db.getProduct(productID)

  console.log(`Product:`, product[0])
  if (product[0] === undefined) {
    res.render("productNotFound")
  }
  res.render("productDetails", { product: product[0] })
}
async function getCategory(req, res) {
  let categoryID = req.params.id
  const category = await db.getProductsForCategory(categoryID)

  res.send("Category: " + category.map((product) => product.name).join(", "))
}
async function getNewProduct(req, res) {
  res.render("newProductForm", {
    title: "New Product Form",
  })
}
const postNewProduct = [
  validateProduct,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors found")
      return res.status(400).render("newProductForm", {
        title: "newProductForm",
        errors: errors.array(),
      })
    }
    const {
      name,
      categoryid,
      producerid,
      price,
      quantity,
      best_before_date,
      image_url,
    } = req.body

    await db.insertProduct(
      name,
      categoryid,
      producerid,
      price,
      quantity,
      best_before_date,
      image_url
    )
    console.log("product inserted")
    res.redirect("/")
  },
]
module.exports = {
  getProducts,
  getProduct,
  getCategory,
  getNewProduct,
  postNewProduct,
}
