import { getUser } from '@/app/lib/getuser';
import { auth } from '@/auth';
import SideNavClient from './sidenav-client';

export default async function SideNav() {
  const session = await auth();
  let user = null;

  if (session && session.user && session.user.email) {
    user = await getUser(session.user.email);
  }

  return <SideNavClient />

}