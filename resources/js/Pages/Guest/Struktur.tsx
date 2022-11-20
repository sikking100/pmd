import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/inertia-react'

interface Props {
  struktur: {
    id: string
    image: string
  }
}

export default function Struktur(props: Props) {
  console.log(props)
  return (
    <>
      <Guest>
        <Head title="Struktur Organisasi" />
        <div>
          <img src={`../../storage/photos/${props.struktur.image}`} />
        </div>
      </Guest>
    </>
  )
}
