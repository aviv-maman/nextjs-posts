'use server';

import { getSession } from '@/lib/actions';
import { artificialDelay } from '@/lib/utils';

const ProfileBlock: React.FC = async () => {
  //const { user, accounts } = await getSession();
  const [{ user, accounts }, isLoaded] = await Promise.all([await getSession(), await artificialDelay(3000)]);
  return user ? (
    <div>
      <h1>Hi, {user?.username}!</h1>
      <p>Your last login was on {String(user?.lastLogin)}.</p>
      <p>Provider Name: {accounts?.[0].provider_name}</p>
      <p>User ID:{accounts?.[0].user_id}</p>
    </div>
  ) : null;
};

export default ProfileBlock;
