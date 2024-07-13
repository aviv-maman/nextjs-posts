import SpinnerWave from '@/components/spinner-wave';

export default function Loading() {
  return (
    <section className='container relative flex min-h-[calc(100vh-150px)] flex-col items-center justify-around p-6 sm:min-h-[calc(100vh-142px)] sm:justify-evenly sm:px-8'>
      <SpinnerWave />
      <div />
    </section>
  );
}
