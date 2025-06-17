'use client';

import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSelect } from '@/components/ui/form-select';
import { WOOD_TYPES, WoodType } from '@/types/cabinet';
import { useFurnitureStore } from '@/lib/store/furniture';
import { CabinetForm } from './CabinetForm';
import { TableForm } from './TableForm';
import { ChairForm } from './ChairForm';

export type FormValues = {
  width: number;
  depth: number;
  height: number;
  woodType: string;
  shelfCount?: number;
  topThickness?: number;
  hasApron?: boolean;
  seatWidth?: number;
  seatDepth?: number;
  seatHeight?: number;
  backHeight?: number;
  hasArmrests?: boolean;
  style?: 'modern' | 'traditional';
};

export function ConfigPanel() {
  const {
    selectedType,
    cabinetConfig,
    tableConfig,
    chairConfig,
    setSelectedType,
    updateCabinetConfig,
    updateTableConfig,
    updateChairConfig,
  } = useFurnitureStore();

  const getDefaultValues = React.useCallback(() => {
    switch (selectedType) {
      case 'cabinet':
        return {
          width: cabinetConfig.dimensions.width,
          depth: cabinetConfig.dimensions.depth,
          height: cabinetConfig.dimensions.height,
          woodType: cabinetConfig.woodType,
          shelfCount: cabinetConfig.shelfCount,
          // Set other fields to undefined to avoid uncontrolled input warnings
          topThickness: undefined,
          hasApron: undefined,
          seatWidth: undefined,
          seatDepth: undefined,
          seatHeight: undefined,
          backHeight: undefined,
          hasArmrests: undefined,
          style: undefined,
        };
      case 'table':
        return {
          width: tableConfig.dimensions.width,
          depth: tableConfig.dimensions.depth,
          height: tableConfig.dimensions.height,
          woodType: tableConfig.woodType,
          topThickness: tableConfig.dimensions.topThickness,
          hasApron: tableConfig.hasApron,
          // Set other fields to undefined
          shelfCount: undefined,
          seatWidth: undefined,
          seatDepth: undefined,
          seatHeight: undefined,
          backHeight: undefined,
          hasArmrests: undefined,
          style: undefined,
        };
      case 'chair':
        return {
          seatWidth: chairConfig.dimensions.seatWidth,
          seatDepth: chairConfig.dimensions.seatDepth,
          seatHeight: chairConfig.dimensions.seatHeight,
          backHeight: chairConfig.dimensions.backHeight,
          woodType: chairConfig.woodType,
          hasArmrests: chairConfig.hasArmrests,
          style: chairConfig.style,
          // Set other fields to undefined
          width: undefined,
          depth: undefined,
          height: undefined,
          shelfCount: undefined,
          topThickness: undefined,
          hasApron: undefined,
        };
    }
  }, [selectedType, cabinetConfig, tableConfig, chairConfig]);

  const form = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  });

  // Reset form when furniture type changes
  useEffect(() => {
    const values = getDefaultValues();
    Object.keys(values).forEach((key) => {
      form.setValue(key as keyof FormValues, values[key as keyof FormValues]);
    });
  }, [selectedType, form, getDefaultValues]);

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted with data:', data);
    switch (selectedType) {
      case 'cabinet':
        updateCabinetConfig({
          dimensions: {
            width: data.width!,
            depth: data.depth!,
            height: data.height!,
          },
          woodType: data.woodType as WoodType,
          ...(data.shelfCount !== undefined && { shelfCount: data.shelfCount }),
        });
        break;
      case 'table':
        updateTableConfig({
          dimensions: {
            width: data.width!,
            depth: data.depth!,
            height: data.height!,
            topThickness: data.topThickness!,
          },
          woodType: data.woodType as WoodType,
          hasApron: data.hasApron,
        });
        break;
      case 'chair':
        updateChairConfig({
          dimensions: {
            seatWidth: data.seatWidth!,
            seatDepth: data.seatDepth!,
            seatHeight: data.seatHeight!,
            backHeight: data.backHeight!,
          },
          woodType: data.woodType as WoodType,
          hasArmrests: data.hasArmrests!,
          style: data.style!,
        });
        break;
    }
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>
          <Select onValueChange={setSelectedType} defaultValue={selectedType}>
            <SelectTrigger>
              <SelectValue placeholder='Select furniture type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='cabinet'>Cabinet</SelectItem>
              <SelectItem value='table'>Table</SelectItem>
              <SelectItem value='chair'>Chair</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Common Fields */}
            <FormSelect
              form={form}
              name="woodType"
              label="Wood Type"
              options={WOOD_TYPES}
              placeholder="Select wood type"
            />

            {/* Furniture Type Specific Fields */}
            {selectedType === 'cabinet' && <CabinetForm form={form} />}
            {selectedType === 'table' && <TableForm form={form} />}
            {selectedType === 'chair' && <ChairForm form={form} />}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
