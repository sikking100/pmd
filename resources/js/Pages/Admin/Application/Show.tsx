import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import route from 'ziggy-js'
import { Head, Link } from '@inertiajs/inertia-react'
import { Application } from './Index'

interface Props {
  auth: any
  errors: any
  application: Application
}

export default function Show(props: Props) {
  const { auth, errors, application } = props
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Applikasi</h2>}
    >
      <Head title="Applikasi" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className='container p-6'>
              <Link
                className="text-teal"
                href={route('application.index')}>
                Kembali
              </Link>
            </div>
            <div className='grid grid-rows-3 grid-flow-col gap-6'>
              <div className='row-span-3 pl-6 pr-6 pb-6'>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama
                    </label>
                    <p className='font-semibold text-xl'>
                      {application.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Url
                    </label>
                    <p className='font-semibold text-xl'>
                      {application.url}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Keterangan
                    </label>
                    <p className='font-semibold text-xl'>
                      {application.description}
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
                    src={`../../../storage/applications/${application.image}`}
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
