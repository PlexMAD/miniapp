import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const configs = await prisma.gameConfigs.findMany();
    res.json(configs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch game configs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const config = await prisma.gameConfigs.findUnique({
      where: { id: Number(id) },
    });

    if (!config) {
      return res.status(404).json({ error: "Config not found" });
    }

    res.json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch config" });
  }
});

export default router;
