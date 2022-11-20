import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'
import { FlashProps } from '@/Interface/Interface'

export interface Job {
  id: number
  position: string
  detail: string
  parent?: number
}

interface Props {
  auth: any
  errors: any
  jobs?: Array<Job>
}

export default function Job(props: Props) {
  const { flash } = usePage<FlashProps>().props
  console.log(flash.message)
  const list: any = []
  props.jobs?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className='p-4 border border-slate-700'>
          {i + 1}
        </td>
        <td className='p-4 border border-slate-700'>
          {e.position}
        </td>

        <td className='p-4 border border-slate-700'>
          <Link
            href={route('job.show', e.id)}
            className={'bg-blue-500 hover:bg-cold text-white font-bold py-2 px-4 rounded'}>
            Lihat
          </Link>
        </td>
      </tr>
    )
  })

  const [showAlert, setShowAlert] = React.useState(true);

  React.useEffect(() => {
    console.log('initialize interval')
    if (showAlert == false) {
      setShowAlert(true)
    }
    const interval = setInterval(() => {
      if (showAlert == true) {
        setShowAlert(false)
      }
      return
    }, 5000)
    return () => {
      console.log('clearing interval')
      clearInterval(interval)
    }
  }, [])


  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Tugas Pokok dan Fungsi</h2>}
    >
      <Head title="Tupoksi" />
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={flash.message}
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {props.jobs?.length === 0 ?
              <div className='container mx-auto p-6'>

                <div>
                  Tidak ada data
                </div>

              </div> :
              <div className='container mx-auto p-6'>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-slate-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className='p-4 border border-slate-600'>No</th>
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
