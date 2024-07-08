import { Copy } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DialogDemo() {
  return (
    <section className='flex flex-col gap-y-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' defaultValue='Pedro Dual' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input id='username' defaultValue='@pedro' className='col-span-3' />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Share</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Input id='link' defaultValue='https://ui.shadcn.com/docs/installation' readOnly />
            </div>
            <Button type='submit' size='sm' className='px-3'>
              <span className='sr-only'>Copy</span>
              <Copy className='size-4' />
            </Button>
          </div>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
