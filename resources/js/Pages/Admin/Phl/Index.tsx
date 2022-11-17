import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'
import {UserInterface} from '@/Interface/Interface'

export interface Phl {
  id: number
  image?: any
  name: string
  jabatan: string
}

interface Props {
    auth: {
        user: UserInterface
    },
    errors:{
        [key:string]: any
    }
  phl?: Array<Phl>
}

export default function Member(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);

  const list: any = []
  props.phl?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className='p-4 border border-slate-700'>
          {i + 1}
        </td>
        <td className='p-4 border border-slate-700'>
          {e.name}
        </td>
        <td className='p-4 border border-slate-700'>
          {e.jabatan}
        </td>
        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">
            <Link
              href={route('phl.show', e.id)}
              className={'bg-blue-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Lihat
            </Link>
            <Link
              href={route('phl.edit', e.id)}
              className={'bg-yellow-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Ubah
            </Link>
            <button
              onClick={(ef) => {
                ef.preventDefault()
                if (confirm("Are you sure you want to delete this user?")) {
                  setShowAlert(true)
                  Inertia.delete(route('phl.destroy', e.id));
                }
              }}
              className={'bg-red-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}
            >
              Hapus
            </button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Pegawai Harian Lepas</h2>}
    >
      <Head title="Pegawai Harian Lepas" />
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {props.phl?.length === 0 ?
              <div className='container mx-auto p-6'>
                <div>
                  <Link
                    className='text-kemenag'
                    href={route('phl.create')}>
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
                    className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}
                    href={route('phl.create')}>
                    Tambah data
                  </Link>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-slate-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className='p-4 border border-slate-600'>No</th>
                      <th className='p-4 border border-slate-600'>Nama</th>
                      <th className='p-4 border border-slate-600'>Jabatan</th>
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
