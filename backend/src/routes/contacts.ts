import { Router } from "express";
import prisma from "../prisma";
import { validateContact } from "../validators/contact";

const router = Router();

/**
 * GET /contacts
 */
router.get("/", async (_req, res) => {
  const contacts = await prisma.contact.findMany();
  res.json(contacts);
});

/**
 * GET /contacts/:id
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const contact = await prisma.contact.findUnique({
    where: { id }
  });

  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.json(contact);
});

/**
 * POST /contacts
 */
router.post("/", async (req, res) => {
  try {
    validateContact(req.body);

    const contact = await prisma.contact.create({
      data: req.body
    });

    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /contacts/:id
 */
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    validateContact(req.body);

    const contact = await prisma.contact.update({
      where: { id },
      data: req.body
    });

    res.json(contact);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /contacts/:id
 */
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.contact.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(400).json({ error: "Unable to delete contact" });
  }
});

export default router;
