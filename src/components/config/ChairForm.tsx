'use client';

import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './ConfigPanel';

interface ChairFormProps {
  form: UseFormReturn<FormValues>;
}

export function ChairForm({ form }: ChairFormProps) {
  return (
    <>
      <FormField
        control={form.control}
        name='seatWidth'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seat Width (inches)</FormLabel>
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
        name='seatDepth'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seat Depth (inches)</FormLabel>
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
        name='seatHeight'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seat Height (inches)</FormLabel>
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
        name='backHeight'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Back Height (inches)</FormLabel>
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
        name='hasArmrests'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Has Armrests</FormLabel>
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

      <FormField
        control={form.control}
        name='style'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Style</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select style' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='modern'>Modern</SelectItem>
                  <SelectItem value='traditional'>Traditional</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
