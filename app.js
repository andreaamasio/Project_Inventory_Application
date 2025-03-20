const express = require("express")
const app = express()
const storeRouter = require("./routes/storeRouter")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use("/", storeRouter)

app.listen(3000, () => {
  console.log(`Express app listening on port 3000`)
})
