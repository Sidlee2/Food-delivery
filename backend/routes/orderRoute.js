import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder } from "../controllers/orderController.js"

//now using this express we'll create the router
const orderRouter = express.Router();

//Now using this Router we'll create multiple endpoints
orderRouter.post("/place",authMiddleware,placeOrder);

export default orderRouter;
