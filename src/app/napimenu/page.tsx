import Napimenu from "@/components/NapiMenu/Napimenu"
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function NapimenuPage() {

  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');
  if (session?.user?.role !== "admin") {
    
    return (
    <div className="flex justify-center items-center w-full h-[100vh]">
    <p>Nincs jogosultságod az oldal megtekintésére</p>
    </div>
    )
  }

  return (
    <Napimenu />
  )
}