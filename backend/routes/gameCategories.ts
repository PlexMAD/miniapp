import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const gameCategories = await prisma.gameCategories.findMany();
    res.json(gameCategories);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
