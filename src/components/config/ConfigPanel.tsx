'use client'

import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { WOOD_TYPES, WoodType } from "@/types/cabinet"
import { useCabinetStore } from "@/lib/store/cabinet"
import { useFurnitureStore } from "@/lib/store/furniture"

type FormValues = {
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
}

export function ConfigPanel() {
  const { config: cabinetConfig, setDimensions: setCabinetDimensions, setWoodType: setCabinetWoodType, setShelfCount } = useCabinetStore()
  const { selectedType, tableConfig, chairConfig, setSelectedType, updateTableConfig, updateChairConfig } = useFurnitureStore()
  
  const getDefaultValues = () => {
    switch (selectedType) {
      case 'cabinet':
        return {
          width: cabinetConfig.dimensions.width,
          depth: cabinetConfig.dimensions.depth,
          height: cabinetConfig.dimensions.height,
          woodType: cabinetConfig.woodType,
          shelfCount: cabinetConfig.shelfCount,
        }
      case 'table':
        return {
          width: tableConfig.dimensions.width,
          depth: tableConfig.dimensions.depth,
          height: tableConfig.dimensions.height,
          woodType: tableConfig.woodType,
          topThickness: tableConfig.dimensions.topThickness,
          hasApron: tableConfig.hasApron,
        }
      case 'chair':
        return {
          seatWidth: chairConfig.dimensions.seatWidth,
          seatDepth: chairConfig.dimensions.seatDepth,
          seatHeight: chairConfig.dimensions.seatHeight,
          backHeight: chairConfig.dimensions.backHeight,
          woodType: chairConfig.woodType,
          hasArmrests: chairConfig.hasArmrests,
          style: chairConfig.style,
        }
    }
  }

  const form = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  })

  const onSubmit = (data: FormValues) => {
    switch (selectedType) {
      case 'cabinet':
        setCabinetDimensions(data.width!, data.depth!, data.height!)
        setCabinetWoodType(data.woodType as WoodType)
        if (data.shelfCount !== undefined) setShelfCount(data.shelfCount)
        break
      case 'table':
        updateTableConfig({
          dimensions: {
            width: data.width!,
            depth: data.depth!,
            height: data.height!,
            topThickness: data.topThickness!
          },
          woodType: data.woodType as WoodType, // todo: fix this cast
          hasApron: data.hasApron
        })
        break
      case 'chair':
        updateChairConfig({
          dimensions: {
            seatWidth: data.seatWidth!,
            seatDepth: data.seatDepth!,
            seatHeight: data.seatHeight!,
            backHeight: data.backHeight!
          },
          woodType: data.woodType as WoodType, // todo: fix this cast
          hasArmrests: data.hasArmrests!,
          style: data.style!
        })
        break
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <Select onValueChange={setSelectedType} defaultValue={selectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select furniture type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cabinet">Cabinet</SelectItem>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="chair">Chair</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Common Fields */}
            <FormField
              control={form.control}
              name="woodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wood Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wood type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {WOOD_TYPES.map((wood) => (
                        <SelectItem key={wood.value} value={wood.value}>
                          {wood.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Cabinet Fields */}
            {selectedType === 'cabinet' && (
              <>
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="depth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shelfCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Shelves</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Table Fields */}
            {selectedType === 'table' && (
              <>
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="depth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topThickness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top Thickness (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasApron"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has Apron</FormLabel>
                      <FormControl>
                        <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value?.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Chair Fields */}
            {selectedType === 'chair' && (
              <>
                <FormField
                  control={form.control}
                  name="seatWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat Width (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="seatDepth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat Depth (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seatHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat Height (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Back Height (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasArmrests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has Armrests</FormLabel>
                      <FormControl>
                        <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value?.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="traditional">Traditional</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="shelfCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Shelves: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={5}
                      step={1}
                      value={[field.value!]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
