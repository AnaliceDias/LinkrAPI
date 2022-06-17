import app from "./src/app/index.js"
import dotenv from "dotenv"


dotenv.config()

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("Server is running")
})