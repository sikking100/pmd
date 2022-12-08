import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/inertia-react'
import { Application } from '../Admin/Application/Index'


interface Props {
  applications: Array<Application> | null
}

export default function Aplikasi(props: Props) {
  return (
    <>
      <Guest>
        <Head title="Pegawai Harian Lepas" />
        <div className="mb-6 flex flex-col lg:flex-row lg:flex-wrap gap-4">
          {
            props.applications === null || props.applications.length === 0 ? <span>Tidak ada data</span>
              :
              <>
                {
                  props.applications.map((application, index) =>
                    <div
                      key={index}
                      className={'bg-teal w-full md:w-[22rem] lg:w-[15.5rem] rounded h-full ease-in duration-300'}
                    >
                      <img src={`../../storage/applications/${application.image}`}
                        className={'object-cover h-full md:h-72 lg:h-60 min-w-full rounded-t bg-white ease-in duration-300'}
                      />
                      <div
                        className={'p-4 md:h-28 ease-in duration-300'}
                      >
                        <h5 className="text-lg font-bold tracking-tight text-white dark:text-white">
                          {application.name}
                        </h5>
                        <a href={application.url} target='_blank' className='text-blue-400'>{application.url}</a>
                        <p className="font-normal text-gray-200 dark:text-gray-400">
                          {application.description}
                        </p>
                      </div>
                    </div>
                  )
                }
              </>
          }
        </div>
      </Guest>
    </>
  )
}
