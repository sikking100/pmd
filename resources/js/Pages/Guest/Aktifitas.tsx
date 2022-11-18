import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import route from 'ziggy-js'
import { Head, Link } from '@inertiajs/inertia-react'
interface Aktivity {
  id: number
  title: string
  description: string
  image: string
}

interface Props {
  activities: Array<Aktivity> | null
}

export default function Pegawai(props: Props) {
  return (
    <>
      <Guest>
        <Head title="Aktivitas" />
        <div className="mb-6 flex flex-col lg:flex-row lg:flex-wrap gap-4">
          {
            props.activities === null ? <span>Tidak ada data</span>
              :
              <>
                {
                  props.activities.map((activity, index) =>

                    <Link
                      key={index}
                      href={route('aktifitas-detail', activity.id)}
                    >

                      <div
                        className={'bg-kemenag w-full lg:w-[15.5rem] rounded h-full'}
                      >
                        <img src={`../../storage/activities/${activity.image}`}
                          className={'object-cover h-full lg:h-60 min-w-full rounded-t bg-white'}
                        />
                        <h5 className="text-xl font-bold tracking-tight text-white dark:text-white break-words p-4">
                          {activity.title}
                        </h5>
                      </div>
                    </Link>
                  )
                }
              </>
          }
        </div>
      </Guest>
    </>
  )
}
