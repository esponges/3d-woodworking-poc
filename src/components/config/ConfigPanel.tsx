'use client'

import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { WOOD_TYPES, CabinetConfig } from "@/types/cabinet"
import { useCabinetStore } from "@/lib/store/cabinet"

interface FormValues extends Omit<CabinetConfig, 'dimensions'> {
  width: number;
  depth: number;
  height: number;
}

export function ConfigPanel() {
  const { config, setDimensions, setWoodType, setShelfCount } = useCabinetStore()
  const form = useForm<FormValues>({
    defaultValues: {
      width: config.dimensions.width,
      depth: config.dimensions.depth,
      height: config.dimensions.height,
      woodType: config.woodType,
      shelfCount: config.shelfCount,
    },
  })

  const onSubmit = (data: FormValues) => {
    setDimensions(data.width, data.depth, data.height)
    setWoodType(data.woodType)
    setShelfCount(data.shelfCount)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Cabinet Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      value={[field.value]}
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
