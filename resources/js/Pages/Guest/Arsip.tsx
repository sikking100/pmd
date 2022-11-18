import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import parse from 'html-react-parser'
import { Head, Link } from '@inertiajs/inertia-react'

interface Archive {
  title: string
  description: string
  file: string
}

interface Props {
  archive: Array<Archive>
}

export default function Tupoksi(props: Props) {

  const handleOnClick = (params: string) => {
    window.open(params)
  }

  return (
    <>
      <Guest>
        <Head title="Arsip" />
        {props.archive.length != 0 ?
          <>
            <div className="">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-slate-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className='p-4 border border-slate-600'>File</th>
                  </tr>
                </thead>
                <tbody>
                  {props.archive.map((law, index) =>
                    <tr
                      key={index}
                    >
                      <td
                        className="p-6"
                      >
                        <Link
                          target='_blank'
                          href="#"
                          onClick={() => handleOnClick(`../../storage/archive/${law.file}`)}
                          rel="noopener noreferrer"
                        >
                          <span className="block text-xl font-bold">
                            {law.title}
                          </span>
                          <span className="block">
                            {parse(law.description)}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
          : <div>Tidak ada data</div>
        }
      </Guest>
    </>
  )
}
