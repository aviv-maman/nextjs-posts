import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  return (
    <main>
      <div>Settings Page</div>
    </main>
  );
}
