import { createOrderDto } from "./dto/orders.js";
import Order from "../infrastructure/schemas/Order.js";

export const createOrder = async (req, res) => {
  const order = createOrderDto.safeParse(req.body);

  if (!order.success) {
    return res.status(400).json({ message: `${order.error.message}` });
  }

  try {
    const newOrder = await Order.create({
      userId: order.data.userId,
      orderProducts: order.data.orderProducts,
      address: req.body.address, // Add address field
      paymentStatus: "PENDING", // Default status
      deliveryStatus: "Pending", // Default status
    });
    await newOrder.populate({
      path: "orderProducts.productId",
      model: "Product",
    });
    return res.status(201).json(newOrder); // Return the created order
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error creating order" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate({
      path: "orderProducts.productId",
      model: "Product",
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error fetching order" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate({
      path: "orderProducts.productId",
      model: "Product",
    });

    return res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error fetching orders" });
  }
};