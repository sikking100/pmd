import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Job } from './Index'
import route from 'ziggy-js'
import { Head, Link } from '@inertiajs/inertia-react'
import HTMLReactParser from 'html-react-parser'

interface Props {
  auth: any
  errors: any
  job: Job
}

export default function MemberShow(props: Props) {
  const { auth, errors, job } = props
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Tugas Pokok dan Fungsi</h2>}
    >
      <Head title="Tupoksi" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className='container p-6'>
              <Link
                className="text-teal"
                href={route('job.index')}>
                Kembali
              </Link>
            </div>
            <div className="flex flex-wrap mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Judul
                </label>
                <p className='font-semibold text-xl'>
                  {job.position}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Detail
                </label>
                <p className='font-semibold text-xl'>
                  {HTMLReactParser(job.detail)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
