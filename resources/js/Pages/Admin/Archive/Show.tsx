import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Archive } from './Index'
import route from 'ziggy-js'
import { Link } from '@inertiajs/inertia-react'
import HTMLReactParser from 'html-react-parser'

interface Props {
  auth: any
  errors: any
  archive: Archive
}

export default function MemberShow(props: Props) {
  const { auth, errors, archive } = props
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Arsip</h2>}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className='container p-6'>
              <Link
                className="text-teal"
                href={route('archive.index')}>
                Kembali
              </Link>
            </div>
            <div className="flex flex-wrap mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Judul
                </label>
                <p className='font-semibold text-xl'>
                  {archive.title}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Detail
                </label>
                <div className='font-semibold text-xl'>
                  {HTMLReactParser(archive.description)}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  File
                </label>
                <p className='font-semibold text-xl'>
                  <a href={`../../storage/archive/${archive.file}`} target={'_blank'}>Lihat</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
