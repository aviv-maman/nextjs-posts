'use server';

import { Suspense } from 'react';
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
// import { CarouselDemo } from '@/components/examples/CarouselDemo';
import { ChartDemo } from '@/components/examples/ChartDemo';
import { CheckboxReactHookFormSingle as CheckboxDemo } from '@/components/examples/CheckboxDemo';
import { CollapsibleDemo } from '@/components/examples/CollapsibleDemo';
import { ComboboxDemo } from '@/components/examples/ComboboxDemo';
import { CommandDialogDemo } from '@/components/examples/CommandDialogDemo';
import { ContextMenuDemo } from '@/components/examples/ContextMenuDemo';
import { DatePickerDemo } from '@/components/examples/DatePickerDemo';
import { DateRangePickerDemo } from '@/components/examples/DateRangePickerDemo';
import { DialogDemo } from '@/components/examples/DialogDemo';
import { DrawerDialogDemo } from '@/components/examples/DrawerDialogDemo';
import { DropdownMenuDemo } from '@/components/examples/DropdownMenuDemo';
import { FormDemo } from '@/components/examples/FormDemo';
import { FormRadixDemo } from '@/components/examples/FormRadixDemo';
import { HoverCardDemo } from '@/components/examples/HoverCardDemo';
import { InputOTPDemo } from '@/components/examples/InputOTPPattern';
import { LabelDemo } from '@/components/examples/LabelDemo';
import { MenubarDemo } from '@/components/examples/MenubarDemo';
import { PaginationDemo } from '@/components/examples/PaginationDemo';
import { PopoverDemo } from '@/components/examples/PopoverDemo';
import { ProgressDemo } from '@/components/examples/ProgressDemo';
import { RadioGroupDemo } from '@/components/examples/RadioGroupDemo';
import { ResizableDemo } from '@/components/examples/ResizableDemo';
import { ScrollAreaDemo } from '@/components/examples/ScrollAreaDemo';
import { SelectDemo } from '@/components/examples/SelectDemo';
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
//import { validateProtectedRoute } from '@/lib/actions';
import ProfileBlock from '@/components/profile-block';

export default async function HomePage() {
  //const { session, user, accounts, isLoading, error } = useAuth();
  //const { user, accounts } = await validateProtectedRoute({ role: 'guest', redirectUrl: '/login' });

  return (
    <section className='container relative flex min-h-[calc(100vh-150px)] flex-col items-center space-y-4 p-6 sm:min-h-[calc(100vh-142px)] sm:px-8'>
      <Suspense fallback={<div>Loading User...</div>}>
        <ProfileBlock />
      </Suspense>

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
      {/* <CarouselDemo /> */}
      <ChartDemo />
      <CheckboxDemo />
      <CollapsibleDemo />
      <ComboboxDemo />
      <CommandDialogDemo />
      <ContextMenuDemo />
      <DatePickerDemo />
      <DateRangePickerDemo />
      <DialogDemo />
      <DrawerDialogDemo />
      <DropdownMenuDemo />
      <FormDemo />
      <FormRadixDemo />
      <HoverCardDemo />
      <InputOTPDemo />
      <LabelDemo />
      <MenubarDemo />
      <PaginationDemo />
      <PopoverDemo />
      <ProgressDemo />
      <RadioGroupDemo />
      <ResizableDemo />
      <ScrollAreaDemo />
      <SelectDemo />
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
    </section>
  );
}
