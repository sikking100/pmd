import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import parse from 'html-react-parser'
import { Head } from '@inertiajs/inertia-react'

interface Props {
  welcome: {
    image: string
    description: string
  }
}

export default function Sambutan(props: Props) {
  return (
    <>
      <Guest>
        <Head title="Sambutan Kepala Dinas" />
        <div>
          <img src={`../../storage/photos/${props.welcome.image}`} />
        </div>
        <div className="my-6">
          {parse(props.welcome.description)}
        </div>
      </Guest>
    </>
  )
}
