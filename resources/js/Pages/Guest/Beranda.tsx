import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import { Carousel } from 'flowbite-react'
import TimeAgo from 'react-timeago'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

interface Activity {
  id: number
  title: string
  description: string
  created_at: Date
  image: string
}



interface Props {
  activities: Array<Activity>
  banners: Array<Activity>

  
}

export default function Beranda(props: Props) {

  return (
    <>
      <Guest>
        <div
          className="h-56 sm:h-64 xl:h-screen"
        >
          <Carousel
          >
            {props.banners.map((e, index) =>

              <img
                key={index}
                className="object-cover h-full w-full"
                src={`../../storage/activities/${e.image}`}
                alt={e.title}
              />
            )}
          </Carousel>
        </div>
        <div className="mt-6">
          <span className="text-2xl border-b-4">
            Aktifitas
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {
            props.activities.map((e, i) =>
              <div
                key={i}
                className="flex flex-col xl:flex-row shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer">
                <img
                  className="object-cover w-full lg:w-48 h-full"
                  src={`../../storage/activities/${e.image}`}
                  alt={e.title}
                />
                <div className="p-4">
                  <Link
                    href={route('aktifitas-detail', e.id)}
                  >
                    <h3 className="text-base md:text-xl font-medium text-gray-800">
                      {`${e.title.substring(0, 40)} ...`}
                    </h3>
                  </Link>

                  <p className="mt-4 text-base md:text-lg text-gray-600">
                    <TimeAgo date={e.created_at} />
                  </p>
                </div>
              </div>
            )
          }
        </div>
      </Guest>
    </>
  )
}
