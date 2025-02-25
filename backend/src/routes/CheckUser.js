import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// Check if a user exists by email or UPI ID
router.get("/", async (req, res) => {
  const { userEmail } = req.query;

 
  if (!userEmail) {
    return res.status(400).send({
      success: false,
      message: "User email or UPI ID is required",
    });
  }

  try {
    // Find the user by email or UPI ID
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: userEmail }, { UpiId : userEmail }],
      },
    });

    if (user) {
      return res.send({
        success: true,
        message: "User already exists",
      });
    }

    return res.status(404).send({
      success: false,
      message: "User does not exist",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
