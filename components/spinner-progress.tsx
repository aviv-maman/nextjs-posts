import '@/styles/progress.css';

const SpinnerProgressBar: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div className='progress-container' aria-label='loading' {...props}>
      <div className='progress-bar'>
        <div className='progress-bar-value' />
      </div>
    </div>
  );
};

export default SpinnerProgressBar;
