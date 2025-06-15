'use client'

import { ConfigPanel } from "@/components/config/ConfigPanel"
import { Scene as CabinetScene } from "@/components/cabinet/Scene"
import { TableScene } from "@/components/table/Scene"
import { ChairScene } from "@/components/chair/Scene"
import { useFurnitureStore } from "@/lib/store/furniture"

export default function Home() {
  const { selectedType } = useFurnitureStore()

  const renderScene = () => {
    switch (selectedType) {
      case 'cabinet':
        return <CabinetScene />
      case 'table':
        return <TableScene config={useFurnitureStore.getState().tableConfig} />
      case 'chair':
        return <ChairScene config={useFurnitureStore.getState().chairConfig} />
      default:
        return <CabinetScene />
    }
  }

  return (
    <div className="flex min-h-screen flex-row gap-4 p-4">
      <ConfigPanel />
      <div className="flex-1">
        {renderScene()}
      </div>
    </div>
  )
}
