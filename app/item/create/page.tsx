import type { Metadata } from 'next';
import { CreateItemForm } from '@/components/create-item-form';

export const metadata: Metadata = {
  title: 'Create New Item',
};

export default async function CreateItemPage() {
  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center space-y-4 p-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <CreateItemForm />
    </section>
  );
}
