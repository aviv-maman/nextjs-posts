import { AlertCircle, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertDemo() {
  return (
    <section className='flex flex-col gap-y-4'>
      <Alert>
        <Terminal className='size-4' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>

      <Alert variant='destructive'>
        <AlertCircle className='size-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </section>
  );
}
