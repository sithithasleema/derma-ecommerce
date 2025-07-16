import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    const {
      id,
      name,
      email,
      image,
      role,
      createdAt,
      updatedAt,
      emailVerified,
    } = currentUser;

    return {
      id,
      name,
      email,
      image,
      role,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      emailVerified: emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
