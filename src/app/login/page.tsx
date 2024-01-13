import LoginForm from "@/components/UI/LoginForm"
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Login() {

  const session = await getServerSession(authOptions);

  if (session) redirect('/rendelesek');

  return (
    <LoginForm />
  )
}
