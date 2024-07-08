'use client';

import { AccordionDemo } from '@/components/examples/AccordionDemo';
import { AlertDemo } from '@/components/examples/AlertDemo';
import { AlertDialogDemo } from '@/components/examples/AlertDialogDemo';
import { AspectRatioDemo } from '@/components/examples/AspectRatioDemo';
import { AvatarDemo } from '@/components/examples/AvatarDemo';
import { BadgeDemo } from '@/components/examples/BadgeDemo';
import { BreadcrumbDemo } from '@/components/examples/BreadcrumbDemo';
import { ButtonDemo } from '@/components/examples/ButtonDemo';
import { CalendarDemo } from '@/components/examples/CalendarDemo';
import { CardDemo } from '@/components/examples/CardDemo';
import { ChartDemo } from '@/components/examples/ChartDemo';
import { CheckboxReactHookFormSingle as CheckboxDemo } from '@/components/examples/CheckboxDemo';
import { CollapsibleDemo } from '@/components/examples/CollapsibleDemo';
import { ComboboxDemo } from '@/components/examples/ComboboxDemo';
import { CommandDialogDemo } from '@/components/examples/CommandDialogDemo';
import { ContextMenuDemo } from '@/components/examples/ContextMenuDemo';
import { DateRangePickerDemo } from '@/components/examples/DateRangePickerDemo';
import { DrawerDialogDemo } from '@/components/examples/DrawerDialogDemo';
import { DropdownMenuDemo } from '@/components/examples/DropdownMenuDemo';
import { HoverCardDemo } from '@/components/examples/HoverCardDemo';
import { InputOTPDemo } from '@/components/examples/InputOTPPattern';
import { LabelDemo } from '@/components/examples/LabelDemo';
import { MenubarDemo } from '@/components/examples/MenubarDemo';
import { NavigationMenuDemo } from '@/components/examples/NavigationMenuDemo';
import { PaginationDemo } from '@/components/examples/PaginationDemo';
import { PopoverDemo } from '@/components/examples/PopoverDemo';
import { ProgressDemo } from '@/components/examples/ProgressDemo';
import { RadioGroupDemo } from '@/components/examples/RadioGroupDemo';
import { ResizableDemo } from '@/components/examples/ResizableDemo';
import { ScrollAreaDemo } from '@/components/examples/ScrollAreaDemo';
import { SelectScrollable } from '@/components/examples/SelectScrollable';
import { SeparatorDemo } from '@/components/examples/SeparatorDemo';
import { SheetDemo } from '@/components/examples/SheetDemo';
import { SkeletonDemo } from '@/components/examples/SkeletonDemo';
import { SliderDemo } from '@/components/examples/SliderDemo';
import { SonnerDemo } from '@/components/examples/SonnerDemo';
import { SwitchDemo } from '@/components/examples/SwitchDemo';
import { TabsDemo } from '@/components/examples/TabsDemo';
import { TextareaDemo } from '@/components/examples/TextareaDemo';
import { ToastDemo } from '@/components/examples/ToastDemo';
import { ToggleDemo } from '@/components/examples/ToggleDemo';
import { ToggleGroupDemo } from '@/components/examples/ToggleGroupDemo';
import { TooltipDemo } from '@/components/examples/TooltipDemo';
import { useSession } from '@/components/session-provider';
import { logout } from '@/lib/helpers';

export default function Home() {
  const { session, user, accounts, isLoading, error } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-start gap-y-10'>
      {session && (
        <div>
          <h1>Hi, {user?.username}!</h1>
          <p>Your last login was on {String(user?.lastLogin)}.</p>
          <p>Provider Name: {accounts?.[0].provider_name}</p>
          <p>User ID:{accounts?.[0].user_id}</p>
          <form action={logout}>
            <button>Sign out</button>
          </form>
        </div>
      )}

      <AccordionDemo />
      <AlertDemo />
      <AlertDialogDemo />
      <AspectRatioDemo />
      <AvatarDemo />
      <BadgeDemo />
      <BreadcrumbDemo />
      <ButtonDemo />
      <CalendarDemo />
      <CardDemo />
      <ChartDemo />
      <CheckboxDemo />
      <CollapsibleDemo />
      <ComboboxDemo />
      <CommandDialogDemo />
      <ContextMenuDemo />
      <DateRangePickerDemo />
      <DrawerDialogDemo />
      <DropdownMenuDemo />
      <HoverCardDemo />
      <InputOTPDemo />
      <LabelDemo />
      <MenubarDemo />
      <NavigationMenuDemo />
      <PaginationDemo />
      <PopoverDemo />
      <ProgressDemo />
      <RadioGroupDemo />
      <ResizableDemo />
      <ScrollAreaDemo />
      <SelectScrollable />
      <SeparatorDemo />
      <SheetDemo />
      <SkeletonDemo />
      <SliderDemo />
      <SonnerDemo />
      <SwitchDemo />
      <TabsDemo />
      <TextareaDemo />
      <ToastDemo />
      <ToggleDemo />
      <ToggleGroupDemo />
      <TooltipDemo />
    </div>
  );
}
