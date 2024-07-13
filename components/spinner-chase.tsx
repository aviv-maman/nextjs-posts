import '@/styles/spinkit.css';

const SpinnerChase: React.FC = () => {
  return (
    <div className='flex justify-center' aria-label='loading'>
      <div className='sk-chase'>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
      </div>
    </div>
  );
};

export default SpinnerChase;
