import { Suspense } from "react"
import CreateSchedule from "./_components/CreateSchedule"
import './create-schedule.css'

const Container = () => {
  return <CreateSchedule></CreateSchedule>
  
  // return <Suspense fallback={<p>Loading feed...</p>}>
  //   <CreateSchedule></CreateSchedule>
  // </Suspense>
}

export default Container