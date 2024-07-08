import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/');
  }
  return (
    <>
      <h1>Sign in</h1>
      <a href='/api/auth/github'>Sign in with GitHub</a>
    </>
  );
}
