import express from "express";
import { PrismaClient, Prisma } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { name, statusId } = req.body;
    const user = await prisma.users.create({ data: { name, statusId } });
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({ error: "Email already in use." });
      }
    }
    res.status(500).json({ error: "Could not create user." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve users." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, statusId } = req.body;
    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, statusId },
    });
    res.json(updatedUser);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "User not found for update." });
      }
      if (err.code === "P2002") {
        return res.status(409).json({ error: "Email already in use." });
      }
    }
    res.status(500).json({ error: "Could not update user." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.users.delete({ where: { id: Number(id) } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "User not found for deletion." });
      }
    }
    res.status(500).json({ error: "Could not delete user." });
  }
});

export default router;
