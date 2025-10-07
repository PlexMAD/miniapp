import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const cards = await prisma.cards.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await prisma.cards.findUnique({ where: { id: Number(id) } });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/get-cards-by-game/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cards = await prisma.cards.findMany({
      where: { gameId: Number(id) },
    });

    if (!cards) {
      return res.status(404).json({ error: "Cards not found" });
    }
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
