import express from "express";
import prisma from "../db/index.js"; // Assuming Prisma is set up
import { z } from "zod";

const router = express.Router();

// Define the user signup schema with Zod validation
const userSignupSchema = z.object({
  firstName: z.string().nonempty("First name is required."),
  lastName: z.string().nonempty("Last name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long."),
  WalletPin: z.string().length(4, "Wallet Pin must be 4 digits long."),
});

// POST request to handle signup
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, WalletPin } = req.body;

  try {
    // Validate the incoming request using Zod schema
    userSignupSchema.parse(req.body);
  } catch (error) {
    // Return the validation error message
    return res.status(400).json({ error: error.errors[0].message });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  // Check if email is already taken
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken. Please choose another." });
    }

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password, // Hash the password in production
        WalletPin,
        UpiId: email + ".upi",
      },
    });

    // Simulate a random balance for the user
    const randomBalance = Math.floor(Math.random() * 200) + 1;
    const randomBalanceString = randomBalance.toString(); // Store balance as string

    // Create the balance record for the user
    const balance = await prisma.balance.create({
      data: {
        balance: randomBalanceString,
        userId: user.id,
      },
    });

    // Send success response
    res.json({
      message: "User created successfully. You can now log in.",
      user,
      balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the user. Please try again later.",
      message: error.message,
    });
  }
});

export default router;
