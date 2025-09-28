import { useState } from 'react';
import { Controller, useFieldArray, type useForm } from 'react-hook-form';
import type { DeliveryConfig, DeliveryOption } from '@/types/deliveryOption';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Eye, Plus, Edit3, Trash2, Truck } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function DeliveryConfig({
  form,
}: {
  form: ReturnType<typeof useForm<DeliveryConfig>>;
}) {
  const { register } = form;
  const {
    fields: options,
    append,
    remove,
    update,
  } = useFieldArray({
    name: 'options',
    control: form.control,
  });

  // Dialog state
  const [showPreview, setShowPreview] = useState(false);
  const [editing, setEditing] = useState<DeliveryOption | null>(null);

  const openAddDialog = () =>
    setEditing({
      id: new Date().getTime().toString(),
      label: '',
      value: '',
      typePricing: 'is_fixed',
      price: 0,
    });
  const openEditDialog = (opt: DeliveryOption) => setEditing(opt);

  const saveOption = (opt: DeliveryOption) => {
    const index = options.findIndex((o) => o.id === opt.id);
    if (index >= 0) {
      update(index, opt);
    } else {
      append(opt);
    }
    setEditing(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <CardTitle>Delivery Options Configuration</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Title & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Delivery Options Title</Label>
              <Input
                placeholder="e.g., Delivery Method"
                {...register('title')}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Choose your delivery method (optional)"
                {...register('description')}
              />
            </div>
          </div>

          {/* Delivery Options List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold">
                  Delivery Options
                </Label>
                {options.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({options.length} total)
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  disabled={options.length === 0}
                >
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openAddDialog}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Option
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Pricing Type</TableHead>
                    <TableHead>Estimated Time</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {options.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground"
                      >
                        No delivery options yet. Please add some.
                      </TableCell>
                    </TableRow>
                  ) : (
                    options.map((opt, idx) => (
                      <TableRow key={opt.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell className="font-medium">
                          {opt.label}
                        </TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-1 py-0.5 text-sm">
                            {opt.value}
                          </code>
                        </TableCell>
                        <TableCell className="text-right">
                          {opt.price > 0 ? `$${opt.price.toFixed(2)}` : 'Free'}
                        </TableCell>
                        <TableCell>
                          {opt.typePricing == 'is_fixed'
                            ? 'Fixed'
                            : 'Multiplier'}
                        </TableCell>
                        <TableCell>{opt.estimated_time ?? '-'}</TableCell>
                        <TableCell className="max-w-[320px] truncate">
                          {opt.description ?? '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(opt)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => remove(idx)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      {/* Add/Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing?.id && options.find((o) => o.id === editing.id)
                ? 'Edit Delivery Option'
                : 'Add Delivery Option'}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={editing.label}
                  placeholder="i.e Standard Shipping"
                  onChange={(e) => {
                    const newLabel = e.target.value;
                    setEditing({
                      ...editing,
                      label: newLabel,
                      value: slugify(newLabel),
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  value={editing.value}
                  placeholder="i.e standard_shipping"
                  onChange={(e) =>
                    setEditing({ ...editing, value: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 0.00 for Free"
                  value={editing.price}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Estimated Time</Label>
                <Input
                  placeholder="e.g., 3-5 Business Days"
                  value={editing.estimated_time ?? ''}
                  onChange={(e) =>
                    setEditing({ ...editing, estimated_time: e.target.value })
                  }
                />
              </div>

              <Controller
                control={form.control}
                name={`options.${options.findIndex(
                  (o) => o.id === editing.id
                )}.typePricing`}
                render={({ field }) => (
                  <Select
                    onValueChange={(val: 'is_fixed' | 'is_multipler') => {
                      field.onChange(val); // update RHF
                      setEditing({ ...editing, typePricing: val }); // update local state too
                    }}
                    value={editing.typePricing} // use editing state instead of field.value
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is_fixed">Fixed</SelectItem>
                      <SelectItem value="is_multipler">Multiplier</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Optional description"
                  value={editing.description ?? ''}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </div>

              <DialogFooter>
                <Button type="button" onClick={() => saveOption(editing)}>
                  Save
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Delivery Options</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="flex justify-between border rounded p-2"
              >
                <span>{opt.label}</span>
                <span>
                  {opt.price > 0 ? `$${opt.price.toFixed(2)}` : 'Free'}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
