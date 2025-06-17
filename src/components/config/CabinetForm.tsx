'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './ConfigPanel';

interface CabinetFormProps {
  form: UseFormReturn<FormValues>;
}

export function CabinetForm({ form }: CabinetFormProps) {
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
        name='shelfCount'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Shelves: {field.value}</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={5}
                step={1}
                value={[field.value ?? 0]}
                onValueChange={([value]) => field.onChange(value)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
