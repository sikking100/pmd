import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Activity } from './Index'
import route from 'ziggy-js'
import { Head, Link } from '@inertiajs/inertia-react'
import HTMLReactParser from 'html-react-parser'

interface Props {
  auth: any
  errors: any
  activity: Activity
}

export default function MemberShow(props: Props) {
  const { auth, errors, activity } = props
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Aktivitas</h2>}
    >
      <Head title="Aktivitas" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className='container p-6'>
              <Link
                className="text-teal"
                href={route('activity.index')}>
                Kembali
              </Link>
            </div>
            <div className='grid grid-rows-3 grid-flow-col gap-6'>
              <div className='row-span-3 pl-6 pr-6 pb-6'>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Judul
                    </label>
                    <p className='font-semibold text-xl'>
                      {activity.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Deskripsi
                    </label>
                    <p className='font-semibold text-xl'>
                      {HTMLReactParser(activity.description.substring(0, 50))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row-span-3 flex flex-wrap -mx-3 mb-2 pl-6 pr-6 pb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Gambar
                  </label>
                  <img
                    src={activity.image == null ? 'https://www.chanchao.com.tw/images/default.jpg' : `../../../storage/activities/${activity.image}`}
                    style={{ maxHeight: 200 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
