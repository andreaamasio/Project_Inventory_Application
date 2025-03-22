const express = require("express")
const app = express()
const path = require("node:path")
const assetsPath = path.join(__dirname, "public")
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static("public"))
const storeRouter = require("./routes/storeRouter")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use("/", storeRouter)

app.listen(3000, () => {
  console.log(`Express app listening on port 3000`)
})
