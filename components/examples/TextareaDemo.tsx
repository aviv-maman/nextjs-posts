import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function TextareaDemo() {
  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor='message'>Your message</Label>
      <Textarea placeholder='Type your message here.' id='message' className='resize-none' />
      <p className='text-sm text-muted-foreground'>Your message will be copied to the support team.</p>
      <Button>Send message</Button>
    </div>
  );
}
