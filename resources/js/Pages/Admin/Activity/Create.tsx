import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import MemberForm from './Form'

interface Props {
  auth: any
  errors: any
}

export default function MemberCreate(props: Props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Tambah Aktivitas</h2>}
    >
      <Head title="Aktifitas" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <MemberForm
              isPost={true}
              data={undefined}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
