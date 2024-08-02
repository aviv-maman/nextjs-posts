'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { LoaderCircle, Trash2, TriangleAlert } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteGenericItem } from '@/lib/items/actions';

interface DeleteItemDialogProps {
  id: string;
}

const DeleteItemDialog: React.FC<DeleteItemDialogProps> = ({ id }) => {
  const deleteGenericItemWithId = deleteGenericItem.bind(null, id);
  const [actionState, formAction] = useFormState(deleteGenericItemWithId, undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size='icon' className='size-8' aria-label='Delete'>
          <Trash2 className='size-4' />
        </Button>
      </DialogTrigger>
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
          {/* <DialogClose asChild>
            <Button type='button' variant='secondary' className='w-fit'>
              Cancel
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemDialog;

const DeleteButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} aria-disabled={pending} variant='destructive' className='w-fit'>
      {pending ? <LoaderCircle className='mr-2 size-4 animate-spin' /> : <TriangleAlert className='mr-2 size-4' />}
      <span>Delete</span>
    </Button>
  );
};
