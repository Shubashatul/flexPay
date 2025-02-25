import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { receiverEmail, amount, walletPin } = req.body; // Include walletPin from request
  const senderId = req.userId; // Auth middleware will set `req.userId`

  const amountFloat = parseFloat(amount);
 

  

  if (!receiverEmail || !amount || !walletPin) {
    return res.status(400).send({
      success: false,
      message: "Receiver email, amount, and wallet PIN are required",
    });
  }

  try {
    // Verify wallet PIN
    const sender = await prisma.user.findUnique({
      where: { id: senderId },
    });

    if (!sender) {
      return res.status(404).send({
        success: false,
        message: "Sender not found",
      });
    }

    if (sender.WalletPin !== walletPin.toString()) {
      return res.status(403).send({
        success: false,
        message: "Invalid wallet PIN",
      });
    }

    const result = await prisma.$transaction(async (prisma) => {
      // Fetch sender balance (it is stored as string)
      const senderBalance = await prisma.balance.findFirst({
        where: { userId: senderId },
      });

      if (!senderBalance) {
        throw new Error("Sender balance not found");
      }

      // Convert sender balance from string to number for comparison
      const senderBalanceAmount = parseFloat(senderBalance.balance);

      if (senderBalanceAmount < amountFloat) {
        throw new Error("Insufficient balance");
      }

      // Fetch receiver details
      const receiver = await prisma.user.findFirst({
        where: {
          OR: [{ email: receiverEmail }, { UpiId: receiverEmail }],
        },
      });

      if (!receiver) {
        throw new Error("Receiver not found");
      }

      // Fetch receiver's balance (it is stored as string)
      const receiverBalance = await prisma.balance.findFirst({
        where: { userId: receiver.id },
      });

      if (!receiverBalance) {
        throw new Error("Receiver balance not found");
      }

      // Convert receiver balance from string to number for calculation
      const receiverBalanceAmount = parseFloat(receiverBalance.balance);

      // Update sender's balance: subtract amount
      const newSenderBalance = (senderBalanceAmount - amountFloat).toString(); // Convert back to string

      await prisma.balance.update({
        where: { id: senderBalance.id }, // Use `id` for unique identification
        data: { balance: newSenderBalance },
      });

      // Only update the receiver's balance if sender and receiver are not the same
      if (senderId !== receiver.id) {
        const newReceiverBalance = (receiverBalanceAmount + amountFloat).toString(); // Convert back to string

        await prisma.balance.update({
          where: { id: receiverBalance.id }, // Use `id` for unique identification
          data: { balance: newReceiverBalance },
        });
      }

      // Log the transaction
      const transaction = await prisma.transaction.create({
        data: {
          senderId,
          receiverId: receiver.id,
          amount: amountFloat,
        },
      });

      // Optional: Reverse transaction log for the receiver as well
      if (senderId !== receiver.id) {
        await prisma.transaction.create({
          data: {
            senderId: receiver.id,
            receiverId: senderId,
            amount: amountFloat,
          },
        });
      }

      return {
        success: true,
        message: "Money transferred successfully",
        transactionId: transaction.id, // Optional: Return transaction ID
      };
    });

    return res.send(result);
  } catch (error) {
    console.error("Error transferring money:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
