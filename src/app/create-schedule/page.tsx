import { Suspense } from "react"
import CreateSchedule from "./_components/CreateSchedule"

const Container = () => {
  <Suspense fallback={<p>Loading feed...</p>}>
    <CreateSchedule></CreateSchedule>
  </Suspense>
}

export default Container