import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import parse from 'html-react-parser'
import { Head } from '@inertiajs/inertia-react'

interface Props {
  job: {
    position: string
    detail: string
  }
}

export default function Tupoksi(props: Props) {
  return (
    <>
      <Guest>
        <Head title="Tupoksi" />
        <div className="mb-6">
          <span className="block text-xl font-bold mb-6">
            {props.job.position}
          </span>
          <span className="block">
            {parse(props.job.detail)}
          </span>
        </div>
      </Guest>
    </>
  )
}
