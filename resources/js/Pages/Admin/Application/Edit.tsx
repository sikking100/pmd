import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import { Application } from './Index'
import Form from './Form'

interface Props {
  auth: any
  errors: any
  application: Application
}

export default function MemberCreate(props: Props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Ubah Aplikasi</h2>}
    >
      <Head title="Aplikasi" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <Form
              isPost={false}
              data={props.application}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
