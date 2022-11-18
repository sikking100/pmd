import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import parse from 'html-react-parser'
import { Head } from '@inertiajs/inertia-react'
import { Aktivity } from '@/Interface/Interface'
import { defImage } from '@/Components/Constant'


interface Props {
  activity: Aktivity
}

export default function VisiMisi(props: Props) {
  const image = props.activity.image == null ? defImage : `../../storage/activities/${props.activity.image}`
  return (
    <>
      <Guest>
        <Head title="Aktivitas" />
        <span className='text-xl font-bold'>
          {props.activity.title}
        </span>
        <div className="my-6">
          <img
            src={image}
            className="w-full slg:w-3/12"
          />
        </div>
        <div className="mb-6">
          {parse(props.activity.description)}
        </div>
      </Guest>
    </>
  )
}
