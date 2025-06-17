'use client';

import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './ConfigPanel';

interface TableFormProps {
  form: UseFormReturn<FormValues>;
}

export function TableForm({ form }: TableFormProps) {
  return (
    <>
      <FormField
        control={form.control}
        name='width'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Width (inches)</FormLabel>
            <FormControl>
              <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='depth'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Depth (inches)</FormLabel>
            <FormControl>
              <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='height'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Height (inches)</FormLabel>
            <FormControl>
              <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='topThickness'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Top Thickness (inches)</FormLabel>
            <FormControl>
              <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='hasApron'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Has Apron</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(value === 'true')}
                defaultValue={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select option' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='true'>Yes</SelectItem>
                  <SelectItem value='false'>No</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
