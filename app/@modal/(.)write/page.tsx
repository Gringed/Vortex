import { createPost } from "@/app/write/write.action";

import { signIn } from "next-auth/react";
import { WriteModal } from "./WriteModal";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export default async function Modal() {
  const session = await getAuthSession();

  if (!session?.user._id) {
    await signIn();
  }

  const user = await prisma.users.findUnique({
    where: {
      id: session?.user._id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return <WriteModal user={user} createPost={createPost} />;
}
