import '@/styles/spinkit.css';

const SpinnerWave: React.FC = () => {
  return (
    <div className='flex justify-center' aria-label='loading'>
      <div className='sk-wave'>
        <div className='sk-wave-rect'></div>
        <div className='sk-wave-rect'></div>
        <div className='sk-wave-rect'></div>
        <div className='sk-wave-rect'></div>
        <div className='sk-wave-rect'></div>
      </div>
    </div>
  );
};

export default SpinnerWave;
