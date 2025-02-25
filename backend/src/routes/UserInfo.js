import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.userId; // Ensure this is set by the middleware

    if (!userId) {
      throw new Error("You are not authorized to access this route");
    }

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch balance
    const balance = await prisma.balance.findFirst({
      where: {
        userId: userId,
      },
    });

    const userBalance = balance ? balance.balance : "0";

    res.send({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: userBalance,
        upiId: user.UpiId, // Match case-sensitive field name
      },
    });
  } catch (e) {
    console.error(e); // Log the full error for debugging
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
});

export default router;
