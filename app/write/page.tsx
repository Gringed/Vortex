import { signIn } from "next-auth/react";
import { WriteForm } from "./WriteForm";
import { createPost } from "./write.action";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export default async function page() {
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

  return (
    <div className="w-full">
      <WriteForm user={user} onSubmit={createPost} />
    </div>
  );
}
