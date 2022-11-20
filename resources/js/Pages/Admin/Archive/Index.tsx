import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'

export interface Archive {
  id: number
  title: string
  description: string
  file: string
}

interface Props {
  auth: any
  errors: any
  archives?: Array<Archive>
}

export default function Job(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const list: any = []
  props.archives?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className='p-4 border border-slate-700'>
          {i + 1}
        </td>
        <td className='p-4 border border-slate-700 max-w-sm'>
          {e.title}
        </td>
        <td className='p-4 border border-slate-700'>
          <Link
            href={route('archive.show', e.id)}
            className={'bg-blue-500 hover:bg-cold text-white font-bold py-2 px-4 rounded'}>
            Lihat
          </Link>
          <Link
            href={route('archive.edit', e.id)}
            className={'ml-4 bg-yellow-500 hover:bg-cold text-white font-bold py-2 px-4 rounded'}>
            Ubah
          </Link>
          <button
            onClick={(ef) => {
              ef.preventDefault()
              if (confirm("Yakin ingin mengahpus data?")) {
                setShowAlert(true)
                Inertia.delete(route('archive.destroy', e.id));
              }
            }}
            className={'ml-4 bg-red-500 hover:bg-cold text-white font-bold py-2 px-4 rounded'}
          >
            Hapus
          </button>
        </td>
      </tr>
    )
  })

  const [showAlert, setShowAlert] = React.useState(true);


  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Arsip</h2>}
    >
      <Head title="Arsip" />
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {props.archives?.length === 0 ?
              <div className='container mx-auto p-6'>
                <div>
                  <Link
                    className='text-teal'
                    href={route('archive.create')}>
                    Tambah data
                  </Link>
                </div>
                <div>
                  Tidak ada data
                </div>

              </div> :
              <div className='container mx-auto p-6'>
                <div className={'mb-6'}>
                  <Link
                    className={'bg-teal hover:bg-cold text-white font-bold py-2 px-4 rounded'}
                    href={route('archive.create')}>
                    Tambah data
                  </Link>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-slate-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className='p-4 border border-slate-600'>No</th>
                      <th className='p-4 border border-slate-600 max-w-sm'>Judul</th>
                      <th className='p-4 border border-slate-600'>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
