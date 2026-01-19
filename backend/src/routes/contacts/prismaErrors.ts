import { Prisma } from "@prisma/client";

export function handlePrismaError(err: unknown): {
  status: number;
  message: string;
} | null {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        const target = err.meta?.target as string[] | undefined;

        if (target?.includes("email")) {
          return {
            status: 409,
            message: "A contact with this email already exists"
          };
        }

        if (target?.includes("contact")) {
          return {
            status: 409,
            message: "A contact with this phone number already exists"
          };
        }

        return {
          status: 409,
          message: "Unique constraint violation"
        };
      }

      case "P2025":
        return {
          status: 404,
          message: "Contact not found"
        };
    }
  }

  return null;
}
