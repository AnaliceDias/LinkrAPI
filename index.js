import app from "./src/app/index.js"
import dotenv from "dotenv"
import getMetaData from "metadata-scraper";

dotenv.config()

const data = await getMetaData('https://github.com/BetaHuhn/metadata-scraper')
console.log("metadatas ---> ",data)
console.log("image --->" ,data.image)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("Server is running")
})
