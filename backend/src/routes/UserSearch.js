import express from "express";
import prisma from "../db/index.js";


const router = express.Router();

// Search route with authentication
router.get("/:name?", async (req, res) => {
  const { name = "" } = req.params;
  const searchName = name.trim().toLowerCase();

  try {
    const users = await prisma.user.findMany({
      where: searchName
        ? {
            OR: [
              {
                firstName: {
                  startsWith: searchName,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  startsWith: searchName,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}, // If no search term, return all users
    });

    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "An error occurred while fetching users",
      message: error.message,
    });
  }
});

export default router;
