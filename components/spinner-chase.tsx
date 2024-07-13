import '@/styles/spinkit.css';

const SpinnerChase: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div className='flex justify-center' aria-label='loading' {...props}>
      <div className='sk-chase'>
        <div className='sk-chase-dot' />
        <div className='sk-chase-dot' />
        <div className='sk-chase-dot' />
        <div className='sk-chase-dot' />
        <div className='sk-chase-dot' />
        <div className='sk-chase-dot' />
      </div>
    </div>
  );
};

export default SpinnerChase;
