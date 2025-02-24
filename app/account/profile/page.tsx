import ProfileForm from "@/app/_components/ProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { guestProps } from "@/app/_type/type";

export const metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await auth()
  const guest:guestProps = await getGuest(session?.user?.email as string)
  
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <ProfileForm guest= {guest}/>
    </div>
  );
}
