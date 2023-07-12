'use client';
import { useSearchParams } from 'next/navigation';
// import { Translate } from '../_components/translation/Translate';
// import './create-schedule.css'

const CreateSchedule = () => {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  console.log(type)
  return <div className={`${type === 'match' ? 'container-red' : 'container-green'}`}>
    {/* <Translate stringKey='general.cancel'></Translate> */}
    {'\ntest createSchedule'}
  </div>
}

export default CreateSchedule