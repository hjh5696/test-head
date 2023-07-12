'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { Translate } from '../_components/translation/Translate';
import './create-schedule.css'

export const dynamic = 'force-dynamic'

const CreateSchedule = () => {
  // const searchParams = useSearchParams();
  // const type = searchParams?.get('type');
  // console.log(type)
  
  const type = 'match'
  return <div className={`${type === 'match' ? 'container-red' : 'container-green'}`}>
    {/* <Translate stringKey='general.cancel'></Translate> */}
    {'\ntest createSchedule'}
  </div>
}

export default CreateSchedule