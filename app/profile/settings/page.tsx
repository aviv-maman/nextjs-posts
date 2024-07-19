import type { Metadata } from 'next';
import SettingsCard from '@/components/settings-card';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  return (
    <div className='flex flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-semibold'>Settings</h1>
        </div>
        <SettingsCard />
      </main>
    </div>
  );
}
