import express from "express";
import { createOrder, getOrderById, getOrdersByUser } from "../application/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(createOrder);
ordersRouter.route("/:id").get(getOrderById);
ordersRouter.route("/user/:userId").get(getOrdersByUser); // Add this route

export default ordersRouter;