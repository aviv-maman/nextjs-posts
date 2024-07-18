'use client';

import * as FormPrimitive from '@radix-ui/react-form';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/** Contains all the parts of a form.
 */
export const FormRoot = forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ ...props }, ref) => {
  return <FormPrimitive.Root ref={ref} {...props} />;
});
FormRoot.displayName = 'FormRoot';

/** The wrapper for a field. It handles id/name and label accessibility automatically.
 */
export const FormField = forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(({ className, ...props }, ref) => {
  return <FormPrimitive.Field ref={ref} className={cn('space-y-2', className)} {...props} />;
});
FormField.displayName = 'FormField';

/** A label element which is automatically wired when nested inside a Field part.
 */
export const FormLabel = forwardRef<
  React.ElementRef<typeof FormPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <FormPrimitive.Label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[invalid]:text-destructive data-[valid]:text-green-400',
        className,
      )}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

/** A control element (by default an input) which is automatically wired when nested inside a Field part.
 */
//export const FormControl = FormPrimitive.Control;
export const FormControl = forwardRef<
  React.ElementRef<typeof FormPrimitive.Control>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Control>
>(({ asChild = true, className, ...props }, ref) => {
  return (
    <FormPrimitive.Control
      ref={ref}
      asChild={asChild}
      className={cn(
        'data-[invalid]:border-destructive data-[valid]:border-green-400 data-[invalid]:text-destructive data-[valid]:text-green-400',
        className,
      )}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

/** A validation message which is automatically wired (functionality and accessibility) to a given control when nested inside a Field part. It can be used for built-in and custom client-side validation, as well as server-side validation. When used outside a Field you must pass a name prop matching a field.
Form.Message accepts a match prop which is used to determine when the message should show. It matches the native HTML validity state (ValidityState on MDN) which validates against attributes such as required, min, max. The message will show if the given match is true on the control’s validity state.
You can also pass a function to match to provide custom validation rules.
*/
//export const FormMessage = FormPrimitive.Message;
export const FormMessage = forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, ...props }, ref) => {
  return (
    <FormPrimitive.Message ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props} />
  );
});
FormMessage.displayName = 'FormMessage';

/** Use this render-prop component to access a given field’s validity state in render (see ValidityState on MDN). A field's validity is available automatically when nested inside a Field part, otherwise you must pass a name prop to associate it.
 */
export const FormValidityState = FormPrimitive.ValidityState;

/** The submit button.
 */
export const FormSubmit = forwardRef<
  React.ElementRef<typeof FormPrimitive.Submit>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Submit>
>(({ asChild = true, ...props }, ref) => {
  return <FormPrimitive.Submit ref={ref} asChild={asChild} {...props} />;
});
FormSubmit.displayName = 'FormSubmit';

export const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
  },
);
FormDescription.displayName = 'FormDescription';
