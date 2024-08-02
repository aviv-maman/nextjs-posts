import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { EditItemForm } from '@/components/edit-item-form';
import { fetchGenericItemById } from '@/lib/items/data';

export const revalidate = 60;

type MetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: item } = await fetchGenericItemById(params.id);

  return {
    title: `Edit Item: ${item?.title}`,
  };
}

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const { data: item } = await fetchGenericItemById(params.id);

  if (!item) {
    notFound();
  }

  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <Suspense fallback={<div>Loading Form...</div>}>{params.id && <EditItemForm item={item} />}</Suspense>
    </section>
  );
}
