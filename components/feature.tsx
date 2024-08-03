import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  icon?: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, ...props }) => {
  return (
    <Card {...props}>
      <CardHeader className='p-4'>
        <CardTitle className='text-md break-words'>
          {icon}&nbsp;{title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Feature;
