import SideNav from '@/components/side-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id='layout-profile' className='flex w-full flex-col justify-between'>
      <SideNav />
      {children}
    </div>
  );
}
