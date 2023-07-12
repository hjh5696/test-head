'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
// import { Translate } from '../_components/translation/Translate';
import './create-schedule.css'

const CreateSchedule = () => {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  console.log(type)
  
  return <div className={`${type === 'match' ? 'container-red' : 'container-green'}`}>
    {/* <Translate stringKey='general.cancel'></Translate> */}
    {'\ntest createSchedule'}
  </div>
}

const Container = () => {
  <Suspense fallback={<p>Loading feed...</p>}>
    <CreateSchedule></CreateSchedule>
  </Suspense>
}

export default Container