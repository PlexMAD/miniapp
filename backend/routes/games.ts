import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const games = await prisma.games.findMany();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await prisma.games.findUnique({ where: { id: Number(id) } });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
