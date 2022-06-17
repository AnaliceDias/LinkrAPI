import { Router } from "express";
import {getUser} from "../controllers/headerController.js";

const headerRouter = Router()

headerRouter.get("/search/users/:character", getUser)

export default headerRouter;