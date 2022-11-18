import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import parse from 'html-react-parser'
import { Head } from '@inertiajs/inertia-react'

interface Props {
  visimisi: {
    content: string
  }
}

export default function VisiMisi(props: Props) {
  return (
    <>
      <Guest>
        <Head title="Visi & Misi" />
        <div className="mb-6">
          {parse(props.visimisi.content)}
        </div>
      </Guest>
    </>
  )
}
