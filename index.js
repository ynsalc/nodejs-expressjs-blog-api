const express = require('express')
const app = express()
const port = 5000
const user = require("./routers/user")
const category = require("./routers/category")
const post = require("./routers/post")
const errorHandling = require("./middlewares/errorHandling");

app.use(express.json())

app.use("/user", user)
app.use("/category", category)
app.use('/image', express.static('upload/images'))
app.use("/post", post)

app.use(errorHandling)

app.listen(port, () => {
    console.log(`http://localhost:${port} adresinden istekler dinleniyor..`)
})