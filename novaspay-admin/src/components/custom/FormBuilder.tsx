import {
  useFieldArray,
  Controller,
  type UseFormReturn,
  // useWatch,
} from 'react-hook-form';
import {
  type FormSchemaConfig,
  type FormField,
  //   type FieldOption,
} from '@/types/others';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Trash2,
  Edit,
  Settings,
  Type,
  Hash,
  Mail,
  Lock,
  List,
  CheckSquare,
  Circle,
  Sliders as SliderIcon,
  FileText,
  //   Save,
} from 'lucide-react';
import { useState, useCallback, memo, useMemo } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const fieldTypes = [
  { value: 'text', label: 'Text', icon: Type },
  { value: 'textarea', label: 'Textarea', icon: FileText },
  { value: 'number', label: 'Number', icon: Hash },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'password', label: 'Password', icon: Lock },
  { value: 'select', label: 'Select Dropdown', icon: List },
  { value: 'radio', label: 'Radio Group', icon: Circle },
  { value: 'checkbox', label: 'Checkbox Group', icon: CheckSquare },
  { value: 'range', label: 'Range Slider', icon: SliderIcon },
] as const;

const FieldEditor = memo(
  ({
    index,
    control,
    errors,
    // setValue,
    fieldType, // NEW PROP: Pass the current field type here
  }: {
    index: number;
    control: UseFormReturn<FormSchemaConfig>['control'];
    errors: UseFormReturn<FormSchemaConfig>['formState']['errors'];
    setValue: UseFormReturn<FormSchemaConfig>['setValue'];
    fieldType: FormField['type']; // Define type for the new prop
  }) => {
    const needsOptions = useMemo(
      () => ['select', 'radio', 'checkbox'].includes(fieldType),
      [fieldType]
    );
    const needsRange = useMemo(
      () => fieldType === 'range' || fieldType === 'number',
      [fieldType]
    );
    // const typePricing = useWatch({
    //   control,
    //   name: `fields.${index}.typePricing`,
    // });

    // useEffect(() => {
    //   if (typePricing === 'is_fixed') {
    //     setValue(`fields.${index}.typePricingValue`, 0);
    //   }
    // }, [typePricing, index, setValue]);

    if (errors.fields && !(index in errors.fields)) {
      console.warn('errors', errors);
    }

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`field-label-${index}`}>Label *</Label>
            <Controller
              control={control}
              name={`fields.${index}.label`}
              render={({ field }) => (
                <Input
                  id={`field-label-${index}`}
                  placeholder="Enter field label"
                  {...field}
                  className={
                    errors.fields?.[index]?.label ? 'border-red-500' : ''
                  }
                />
              )}
            />
            {errors.fields?.[index]?.label && (
              <p className="text-sm text-red-500">
                {errors.fields[index].label.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`field-name-${index}`}>Name *</Label>
            <Controller
              control={control}
              name={`fields.${index}.name`}
              render={({ field }) => (
                <Input
                  id={`field-name-${index}`}
                  placeholder="field_name"
                  {...field}
                  className={
                    errors.fields?.[index]?.name ? 'border-red-500' : ''
                  }
                />
              )}
            />
            {errors.fields?.[index]?.name && (
              <p className="text-sm text-red-500">
                {errors.fields[index].name.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Field Type</Label>
          <Controller
            control={control}
            name={`fields.${index}.type`}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {errors.fields?.[index]?.type && (
          <p className="text-sm text-red-500">
            {errors.fields[index].type?.message as string}
          </p>
        )}

        <div className="space-y-2">
          <Label>Placeholder</Label>
          <Controller
            control={control}
            name={`fields.${index}.placeholder`}
            render={({ field }) => (
              <Input placeholder="Enter placeholder text" {...field} />
            )}
          />
        </div>
        {errors.fields?.[index]?.placeholder && (
          <p className="text-sm text-red-500">
            {errors.fields[index].placeholder?.message as string}
          </p>
        )}

        <div className="flex gap-4">
          <div className="space-y-2">
            <Label>Required</Label>
            <Controller
              control={control}
              name={`fields.${index}.required`}
              render={({ field }) => (
                <Select
                  defaultValue="false"
                  onValueChange={(val) => field.onChange(val === 'true')}
                  value={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select if required" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.fields?.[index]?.required && (
            <p className="text-sm text-red-500">
              {errors.fields[index].required.message as string}
            </p>
          )}

          <div className="space-y-2">
            <Label>Pricing Type</Label>
            <Controller
              control={control}
              name={`fields.${index}.typePricing`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || 'is_fixed'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="is_fixed">Fixed</SelectItem>
                    <SelectItem value="is_multipler">Multiplier</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.fields?.[index]?.typePricing && (
            <p className="text-sm text-red-500">
              {errors.fields[index].typePricing.message as string}
            </p>
          )}
          {/* {typePricing == 'is_multipler' && (
            <div className="space-y-2">
              <Label>Pricing Value</Label>
              <Controller
                control={control}
                name={`fields.${index}.typePricingValue`}
                render={({ field }) => (
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? ''}
                  />
                )}
              />
            </div>
          )}
          {errors.fields?.[index]?.typePricingValue && (
            <p className="text-sm text-red-500">
              {errors.fields[index].typePricingValue.message as string}
            </p>
          )} */}
        </div>

        {needsRange && (
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Min</Label>
              <Controller
                control={control}
                name={`fields.${index}.min`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? ''}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Max</Label>
              <Controller
                control={control}
                name={`fields.${index}.max`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? ''}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Step</Label>
              <Controller
                control={control}
                name={`fields.${index}.step`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? ''}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Base Price</Label>
              <Controller
                control={control}
                name={`fields.${index}.base_price`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? ''}
                  />
                )}
              />
            </div>
          </div>
        )}
        {needsOptions && (
          <div className="space-y-2">
            <Label>Options</Label>
            <Controller
              control={control}
              name={`fields.${index}.options`}
              render={({ field }) => (
                <div className="space-y-3">
                  {(field.value || []).map((opt, optIndex) => (
                    <div
                      key={optIndex}
                      className="grid grid-cols-4 gap-2 items-center"
                    >
                      <div className="flex items-center gap-2">
                        <Controller
                          control={control}
                          name={`fields.${index}.defaultValue`}
                          render={({ field: defaultField }) => (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Input
                                    type="radio"
                                    className="size-4"
                                    value={opt.value}
                                    checked={defaultField.value === opt.value}
                                    onChange={() =>
                                      defaultField.onChange(opt.value)
                                    }
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  Set as default value
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        />
                        <Input
                          placeholder="Label"
                          value={opt.label}
                          onChange={(e) => {
                            const newOptions = [...(field.value || [])];
                            newOptions[optIndex] = {
                              ...newOptions[optIndex],
                              label: e.target.value,
                            };
                            field.onChange(newOptions);
                          }}
                        />
                      </div>

                      <Input
                        placeholder="Value"
                        value={opt.value}
                        onChange={(e) => {
                          const newOptions = [...(field.value || [])];
                          newOptions[optIndex] = {
                            ...newOptions[optIndex],
                            value: e.target.value,
                          };
                          field.onChange(newOptions);
                        }}
                      />

                      <Input
                        type="number"
                        placeholder="Price"
                        value={opt.price ?? ''}
                        onChange={(e) => {
                          const newOptions = [...(field.value || [])];
                          newOptions[optIndex] = {
                            ...newOptions[optIndex],
                            price:
                              e.target.value === ''
                                ? undefined
                                : Number(e.target.value),
                          };
                          field.onChange(newOptions);
                        }}
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newOptions = (field.value || []).filter(
                            (_: any, i: number) => i !== optIndex
                          );
                          field.onChange(newOptions);
                        }}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={() =>
                      field.onChange([
                        ...(field.value || []),
                        { label: '', value: '', price: undefined },
                      ])
                    }
                  >
                    + Add Option
                  </Button>
                </div>
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

export default function DynamicFormBuilder({
  form,
}: {
  form: UseFormReturn<FormSchemaConfig>;
}) {
  const {
    control,
    // handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const [editingField, setEditingField] = useState<number | null>(null);

  const addField = useCallback(() => {
    const newField: FormField = {
      id: new Date().getTime().toString(),
      type: 'text',
      label: `Field ${fields.length + 1}`,
      name: `field_${fields.length + 1}`,
      placeholder: '',
      required: false,
      typePricing: 'is_fixed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    append(newField);
    setEditingField(fields.length); // This will be the index of the newly added field
  }, [append, fields.length]);

  const getFieldIcon = useCallback((type: string) => {
    const fieldType = fieldTypes.find((ft) => ft.value === type);
    return fieldType?.icon || Type;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Form Builder</h2>
          <p className="text-muted-foreground">
            Create and customize your dynamic form fields
          </p>
        </div>
        <Button onClick={addField}>
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <div className="space-y-4">
        {fields.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Type className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="font-semibold mt-4">No fields yet</h3>
              <p className="text-sm text-muted-foreground">
                Get started by adding your first form field
              </p>
              <Button onClick={addField} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Field
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => {
              const watchedField = watch(`fields.${index}`);
              const Icon = getFieldIcon(watchedField.type);
              const isEditing = editingField === index;

              return (
                <Card
                  key={field.id}
                  className={`transition-all ${
                    isEditing ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-sm font-medium">
                            {watchedField.label || 'Untitled Field'}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {watchedField.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setEditingField(isEditing ? null : index)
                          }
                        >
                          {isEditing ? (
                            <Settings className="h-4 w-4" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isEditing && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <FieldEditor
                        index={index}
                        control={control}
                        setValue={form.setValue}
                        errors={errors}
                        fieldType={watchedField.type} // Pass the *value* of the field type
                      />
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* {fields.length > 0 && (
          <div className="flex justify-between pt-6">
            <div className="text-sm text-muted-foreground">
              {fields.length} field{fields.length !== 1 ? 's' : ''} configured
            </div>
            <Button type="submit" className="min-w-32">
              <Save className="h-4 w-4 mr-2" />
              Save Form Config
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
