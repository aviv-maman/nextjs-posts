'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { Ellipsis, LoaderCircle, TriangleAlert } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteGenericItem } from '@/lib/items/actions';

export function DataTableRowActions({ itemId }: { itemId: string }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex size-8 p-0 data-[state=open]:bg-muted'>
            <Ellipsis className='size-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href={`/item/${itemId}`}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href={`/item/${itemId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem className='cursor-pointer'>
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteItemAction itemId={itemId} />
    </Dialog>
  );
}

const DeleteItemAction: React.FC<{ itemId: string }> = ({ itemId }) => {
  const deleteGenericItemWithId = deleteGenericItem.bind(null, itemId);
  const [actionState, formAction] = useFormState(deleteGenericItemWithId, undefined);

  return (
    <DialogContent className='max-w-sm rounded-lg sm:max-w-md'>
      <DialogHeader>
        <DialogTitle className='text-start'>Deletion Confirmation</DialogTitle>
        <DialogDescription className='pt-2 text-start'>
          Are you sure you would like to delete this item?
          <br />
          This operation can not be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className='flex flex-row'>
        <form action={formAction} className='flex w-full flex-col gap-y-2'>
          <DeleteButton />
          <span className='text-sm font-medium text-destructive'>{actionState?.errors.general}</span>
        </form>
      </DialogFooter>
    </DialogContent>
  );
};

const DeleteButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} aria-disabled={pending} variant='destructive' className='w-fit'>
      {pending ? <LoaderCircle className='mr-2 size-4 animate-spin' /> : <TriangleAlert className='mr-2 size-4' />}
      <span>Delete</span>
    </Button>
  );
};
