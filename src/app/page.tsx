import { ConfigPanel } from "@/components/config/ConfigPanel"
import { Scene } from "@/components/cabinet/Scene"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-row gap-4 p-4">
      <ConfigPanel />
      <div className="flex-1">
        <Scene />
      </div>
    </div>
  )
}
