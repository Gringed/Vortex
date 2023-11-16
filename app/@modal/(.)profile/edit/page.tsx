import { ProfileForm } from "@/app/profile/edit/ProfileForm";
import { editProfile } from "@/app/profile/edit/edit-profile.action";
import { getUserEdit } from "@/app/src/query/user.query";

import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { EditProfileModal } from "./EditProfileModal";

export default async function EditUser() {
  const session = await getAuthSession();

  const userId = session?.user._id;
  if (!userId) {
    notFound();
    return;
  }

  const user = await getUserEdit(userId);

  if (!user) {
    notFound();
    return;
  }

  return <EditProfileModal user={user} editProfile={editProfile} />;
}
