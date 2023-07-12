'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
// import { Translate } from '../_components/translation/Translate';

const CreateSchedule = () => {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  console.log(type)
  
  return <Suspense><div className={`${type === 'match' ? 'container-red' : 'container-green'}`}>
    {/* <Translate stringKey='general.cancel'></Translate> */}
    {'\ntest createSchedule'}
  </div></Suspense>
}

export default CreateSchedule