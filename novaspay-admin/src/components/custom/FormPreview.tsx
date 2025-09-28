import { type FormSchemaConfig } from '@/types/others'; // Import formSchemaConfig for Zod resolver
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as Slider from '@radix-ui/react-slider'; // Import all from Radix Slider
// import { useCallback } from 'react';
// import { Button } from '@/components/ui/button';
import { useForm, Controller, useWatch } from 'react-hook-form'; // Import react-hook-form hooks
import { zodResolver } from '@hookform/resolvers/zod'; // Import Zod resolver
import { Separator } from '@/components/ui/separator';
// import { toast } from 'sonner'; // Assuming you have a toast notification component
import z from 'zod';

type FormPreviewProps = {
  formConfig: FormSchemaConfig;
};

export default function FormPreview({ formConfig }: FormPreviewProps) {
  // Dynamically create a Zod schema for the preview form based on formConfig
  const previewSchema = formConfig.fields.reduce((acc: any, field) => {
    let fieldZodSchema: any;

    // Determine base schema type
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'textarea':
        fieldZodSchema = z.string();
        break;
      case 'number':
      case 'range':
        // For 'range' and 'number', if min/max are defined, we apply them here.
        // The .min() and .max() methods are called on the number schema directly.
        let numberSchema = z.number();
        if (field.min !== undefined) {
          numberSchema = numberSchema.min(
            field.min,
            `Must be at least ${field.min}`
          );
        }
        if (field.max !== undefined) {
          numberSchema = numberSchema.max(
            field.max,
            `Must be at most ${field.max}`
          );
        }
        fieldZodSchema = numberSchema.optional().nullable();
        break;
      case 'select':
      case 'radio':
        fieldZodSchema = z.string(); // Select and radio return a single string value
        break;
      case 'checkbox':
        fieldZodSchema = z.array(z.string()); // Checkbox group returns an array of strings
        break;
      default:
        fieldZodSchema = z.any(); // Fallback for unknown types
    }

    // Apply 'required' rule if specified
    if (field.required) {
      // Custom message for required fields
      fieldZodSchema = fieldZodSchema.refine((val: any) => {
        if (field.type === 'checkbox') {
          // For checkboxes, check if the array is not empty
          return Array.isArray(val) && val.length > 0;
        }
        // For other types, check for non-empty string or defined number
        return val !== undefined && val !== null && val !== '';
      }, `${field.label} is required`);
    } else {
      // If not required, ensure it's optional
      fieldZodSchema = fieldZodSchema.optional().nullable();
    }

    // Add validation pattern if exists (for text, email, password, textarea)
    if (
      field.validation?.pattern &&
      ['text', 'email', 'password', 'textarea'].includes(field.type)
    ) {
      const regex = new RegExp(field.validation.pattern);
      fieldZodSchema = fieldZodSchema.refine((val: string | undefined) => {
        if (!val) return true; // Don't validate pattern if field is empty and not required
        return regex.test(val);
      }, field.validation.message || `Invalid format for ${field.label}`);
    }

    acc[field.name] = fieldZodSchema;
    return acc;
  }, {});

  const {
    control,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: zodResolver(z.object(previewSchema)),
    // Optionally set default values from formConfig.fields[x].defaultValue
    defaultValues: formConfig.fields.reduce((acc: any, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        acc[field.name] = []; // Default for checkbox group is an empty array
      } else if (field.type === 'number' || field.type === 'range') {
        acc[field.name] = null; // Default for number/range can be null or undefined
      } else {
        acc[field.name] = ''; // Default for text-based inputs
      }
      return acc;
    }, {}),
  });

  //   const onSubmit = useCallback(
  //     (data: any) => {
  //       console.log('Form Submitted Data:', data);
  //       toast.success('Form submitted successfully!', {
  //         description: JSON.stringify(data, null, 2),
  //         duration: 5000,
  //       });
  //       // You could send this data to an API here
  //       reset(); // Reset form after submission
  //     },
  //     [reset]
  //   );

  if (!formConfig || !formConfig.fields || formConfig.fields.length === 0) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Form Preview</CardTitle>
          <CardDescription>No fields configured yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Start adding fields in the Form Builder to see your form here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>{'Preview Your Form'}</CardTitle>
        <CardDescription>
          {'This is how your form will look to users.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {formConfig.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Controller
                control={control}
                name={field.name}
                render={({ field: controllerField }) => {
                  const commonProps = {
                    id: field.name,
                    placeholder: field.placeholder,
                    ...controllerField, // Spreads onChange, onBlur, value, name, ref
                    className: errors[field.name] ? 'border-red-500' : '',
                  };

                  switch (field.type) {
                    case 'text':
                    case 'email':
                    case 'password':
                      return <Input type={field.type} {...commonProps} />;
                    case 'number':
                      return (
                        <Input
                          type="number"
                          step={field.step || 1}
                          min={field.min}
                          max={field.max}
                          {...commonProps}
                          value={controllerField.value ?? ''} // Handle null/undefined for number inputs
                          onChange={(e) => {
                            controllerField.onChange(
                              e.target.value === ''
                                ? null
                                : Number(e.target.value)
                            );
                          }}
                        />
                      );
                    case 'textarea':
                      return <Textarea {...commonProps} />;
                    case 'select':
                      return (
                        <Select
                          onValueChange={controllerField.onChange}
                          value={controllerField.value || ''}
                          name={controllerField.name} // Pass name explicitly
                        >
                          <SelectTrigger
                            className={
                              errors[field.name] ? 'border-red-500' : ''
                            }
                          >
                            <SelectValue
                              placeholder={
                                field.placeholder || 'Select an option'
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option, idx) => (
                              <SelectItem
                                key={idx}
                                value={option.label || idx.toString()}
                              >
                                {option.label}
                                {option.price !== undefined &&
                                  ` ($${option.price})`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    case 'radio':
                      return (
                        <RadioGroup
                          onValueChange={controllerField.onChange}
                          value={controllerField.value || ''}
                          name={controllerField.name} // Pass name explicitly
                          className="flex flex-col space-y-2"
                        >
                          {field.options?.map((option, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={`${field.name}-${idx}`}
                              />
                              <Label htmlFor={`${field.name}-${idx}`}>
                                {option.label}
                                {option.price !== undefined &&
                                  ` ($${option.price})`}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      );
                    case 'checkbox':
                      const checkedValues = useWatch({
                        control,
                        name: field.name,
                        defaultValue: [], // Ensure default is an empty array
                      });

                      return (
                        <div className="flex flex-col gap-2">
                          {field.options?.map((option, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`${field.name}-${idx}`}
                                value={option.value}
                                checked={checkedValues?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  let newValues: string[] = Array.isArray(
                                    checkedValues
                                  )
                                    ? [...checkedValues]
                                    : [];
                                  if (checked) {
                                    newValues.push(option.value);
                                  } else {
                                    newValues = newValues.filter(
                                      (val) => val !== option.value
                                    );
                                  }
                                  controllerField.onChange(newValues);
                                }}
                              />
                              <Label htmlFor={`${field.name}-${idx}`}>
                                {option.label}
                                {option.price !== undefined &&
                                  ` ($${option.price})`}
                              </Label>
                            </div>
                          ))}
                        </div>
                      );
                    case 'range':
                      const currentSliderValue =
                        controllerField.value ?? field.min ?? 0;
                      return (
                        <div className="flex items-center space-x-4">
                          <Slider.Root
                            className="relative flex w-full touch-none select-none items-center"
                            min={field.min}
                            max={field.max}
                            step={field.step || 1}
                            value={[currentSliderValue]}
                            onValueChange={(val: number[]) =>
                              controllerField.onChange(val[0])
                            }
                            name={controllerField.name}
                          >
                            <Slider.Track className="relative h-2 w-full grow rounded-full bg-secondary">
                              <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
                            </Slider.Track>
                            <Slider.Thumb className="block h-5 w-5 rounded-full bg-primary shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />
                          </Slider.Root>
                          <span className="w-12 text-right">
                            {currentSliderValue}
                          </span>
                        </div>
                      );
                    default:
                      return (
                        <p className="text-red-500">
                          Unsupported Field Type: {field.type}
                        </p>
                      );
                  }
                }}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[field.name]?.message as string}
                </p>
              )}
              {field.typePricing === 'is_multipler' &&
                field.typePricingValue !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    Price multiplier: x{field.typePricingValue}
                  </p>
                )}
              {field.typePricing === 'is_fixed' &&
                field.typePricingValue !== undefined &&
                field.typePricingValue > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Fixed price: ${field.typePricingValue}
                  </p>
                )}
            </div>
          ))}
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
}
