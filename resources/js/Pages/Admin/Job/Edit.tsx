import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import MemberForm from './Form'
import { Job } from './Index'

interface Props {
  auth: any
  errors: any
  job: Job
  jobs: Array<Job>
}

export default function MemberCreate(props: Props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Ubah Tugas Pokok dan Fungsi</h2>}
    >
      <Head title="Tupoksi" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <MemberForm
              jobs={props.jobs}
              isPost={false}
              data={props.job}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
