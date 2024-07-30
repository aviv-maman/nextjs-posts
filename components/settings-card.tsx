import { Languages, SunMoon } from '@/assets/icons';
import LanguageSelect from '@/components/language-select';
import ThemeSelect from '@/components/theme-select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const SettingsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl md:text-2xl'>General</CardTitle>
        <CardDescription>Change general settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-3'>
          {/* <div className='grid gap-3'>
            <div className='flex items-center gap-x-2'>
              <Languages className='size-5' />
              <Label htmlFor='category'>Language</Label>
            </div>
            <LanguageSelect />
          </div> */}
          <div className='grid gap-3'>
            <div className='flex items-center gap-x-2'>
              <SunMoon className='size-5' />
              <Label htmlFor='subcategory'>Theme</Label>
            </div>
            <ThemeSelect />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
