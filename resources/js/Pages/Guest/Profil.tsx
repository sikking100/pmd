import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import parse from 'html-react-parser'
import { Head } from '@inertiajs/inertia-react'
import { defImage } from '@/Components/Constant'


interface Props {
  profile: {
    image: string | null
    description: string
  }
}

export default function Profil(props: Props) {
  const image = props.profile.image == null ? defImage : `../../storage/photos/${props.profile.image}`
  return (
    <>
      <Guest>
        <Head title="Profil Disdukcapil Kab. Morowali Utara" />
        <div>
          <img src={image} />
        </div>
        <div className="my-6">
          {parse(props.profile.description)}
        </div>
      </Guest>
    </>
  )
}
