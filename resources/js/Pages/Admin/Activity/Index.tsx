import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import {Head, Link, usePage} from '@inertiajs/inertia-react'
import {Inertia} from '@inertiajs/inertia'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'
import HTMLReactParser from 'html-react-parser'

export interface Activity {
    id: number
    title: string
    description: string
    image: string
}

interface Props {
    auth: any
    errors: any
    activity?: Array<Activity>
}

export default function Activity(props: Props) {
    const {flash} = usePage().props
    const f = flash as { message: string }
    const list: any = []
    props.activity?.forEach((e, i) => {
        list.push(
            <tr key={i}>
                <td className='p-4 border border-slate-700'>
                    {i + 1}
                </td>
                <td className='p-4 border border-slate-700 max-w-sm'>
                    {e.title}
                </td>
                <td className='p-4 border border-slate-700'>
                    {HTMLReactParser(e.description.substring(0, 50))}
                </td>
                <td className='p-4 border border-slate-700'>
                    <div className={'flex flex-row gap-2'}>
                        <Link
                            href={route('activity.show', e.id)}
                            className={'bg-blue-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
                            Lihat
                        </Link>
                        <Link
                            href={route('activity.edit', e.id)}
                            className={'bg-yellow-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
                            Ubah
                        </Link>
                        <button
                            onClick={(ef) => {
                                ef.preventDefault()
                                if (confirm("Yakin ingin mengahpus data?")) {
                                    setShowAlert(true)
                                    Inertia.delete(route('activity.destroy', e.id));
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

    const [showAlert, setShowAlert] = React.useState(true)


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Aktivitas</h2>}
        >
            <Head title="Aktifitas"/>
            <Alert
                message={f.message}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {props.activity?.length === 0 ?
                            <div className='container mx-auto p-6'>
                                <div>
                                    <Link
                                        className='text-kemenag'
                                        href={route('activity.create')}>
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
                                        href={route('activity.create')}>
                                        Tambah data
                                    </Link>
                                </div>
                                <table
                                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-slate-500">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className='p-4 border border-slate-600'>No</th>
                                        <th className='p-4 border border-slate-600 max-w-sm'>Judul</th>
                                        <th className='p-4 border border-slate-600'>Deskripsi</th>
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
