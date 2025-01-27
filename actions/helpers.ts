import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const isUserExist = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // check existing user
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) return false;
    return user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};
