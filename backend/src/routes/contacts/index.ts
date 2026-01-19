import { Router } from "express";
import prisma from "../../prisma";
import { validateContact } from "../../validators/contact";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "./prismaErrors";

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
    const { id, ...data } = req.body;
    validateContact(data);

    const contact = await prisma.contact.create({
      data
    });

    res.status(201).json(contact);
  } catch (err: any) {
    console.log('Unable to create contact:', err);
    const prismaError = handlePrismaError(err);

    if (prismaError) {
      return res
        .status(prismaError.status)
        .json({ error: prismaError.message });
    }
    res.status(400).json({ error: "Unable to create contact" });
  }
});

/**
 * PUT /contacts/:id
 */
router.put("/:id", async (req, res) => {
  const idUpdate = Number(req.params.id);

  try {
    validateContact(req.body);

    const { id, ...data } = req.body;

    const contact = await prisma.contact.update({
      where: { id: idUpdate },
      data
    });

    res.json(contact);
  } catch (err: any) {
    console.log('Unable to update contact:', err);
    const prismaError = handlePrismaError(err);

    if (prismaError) {
      return res
        .status(prismaError.status)
        .json({ error: prismaError.message });
    }
    res.status(400).json({ error: "Unable to update contact" });
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
 console.log('Unable to delete contact:', err);
    const prismaError = handlePrismaError(err);

    if (prismaError) {
      return res
        .status(prismaError.status)
        .json({ error: prismaError.message });
    }
    res.status(400).json({ error: "Unable to delete contact" });
  }
});

export default router;
