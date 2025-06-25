'use client'

import { ConfigPanel } from "@/components/config/ConfigPanel"
import { Cabinet } from "@/components/cabinet/Cabinet"
import { Table } from "@/components/table/Table"
import { Chair } from "@/components/chair/Chair"
import { Scene } from "@/components/layout/Scene"
import { useFurnitureStore } from "@/lib/store/furniture"
import { FurnitureType } from "@/types/furniture"

const FURNITURE_COMPONENTS: Record<FurnitureType, React.ComponentType> = {
  cabinet: Cabinet,
  table: Table,
  chair: Chair,
}

const SCENE_CONFIGS = {
  cabinet: {
    className: "relative w-full h-full bg-background/80",
    lightPosition: [5, 5, 5] as [number, number, number],
  },
  table: {},
  chair: {},
}

export default function Home() {
  const { selectedType } = useFurnitureStore()
  const FurnitureComponent = FURNITURE_COMPONENTS[selectedType] || FURNITURE_COMPONENTS.cabinet
  const sceneConfig = SCENE_CONFIGS[selectedType] || {}

  return (
    <div className="flex min-h-screen flex-row gap-4 p-4">
      <ConfigPanel />
      <div className="flex-1">
        <Scene {...sceneConfig}>
          <FurnitureComponent />
        </Scene>
      </div>
    </div>
  )
}
