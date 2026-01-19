import { Prisma } from "@prisma/client";

export function handlePrismaError(err: any) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return { status: 409, message: "Email already in use" };
      case "P2025":
        return { status: 404, message: "Resource not found" };
    }
  }
  return null;
}
