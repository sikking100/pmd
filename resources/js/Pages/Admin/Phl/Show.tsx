import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Phl } from './Index'
import route from 'ziggy-js'
import { Head, Link } from '@inertiajs/inertia-react'

interface Props {
  auth: any
  errors: any
  phl: Phl
}

export default function MemberShow(props: Props) {
  const { auth, errors, phl } = props
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Pegawai Harian Lepas</h2>}
    >
      <Head title="Pegawai Harian Lepas" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className='container p-6'>
              <Link
                className="text-teal"
                href={route('phl.index')}>
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
                      {phl.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Jabatan
                    </label>
                    <p className='font-semibold text-xl'>
                      {phl.jabatan}
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
                    src={`../../../storage/phl/${phl.image}`}
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
