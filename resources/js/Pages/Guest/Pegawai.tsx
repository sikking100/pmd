import React from 'react'
import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/inertia-react'

interface Pegawai {
  nip: string
  name: string
  golongan: string
  pangkat: string
  jabatan: string
  image: string
}

interface Props {
  members: Array<Pegawai> | null
}

export default function Pegawai(props: Props) {
  return (
    <>
      <Guest>
        <Head title="Pegawai" />
        <div className="mb-6 flex flex-col md:flex-row md:flex-wrap gap-4">
          {
            props.members === null || props.members.length === 0 ? <span>Tidak ada data</span>
              :
              <>
                {
                  props.members.map((member, index) =>
                    <div
                      key={index}
                      className={'bg-teal w-full md:w-[22rem] lg:w-[15.5rem] rounded h-full ease-in duration-300'}
                    >
                      <img src={`../../storage/members/${member.image}`}
                        className={'object-cover h-full md:h-72 lg:h-60 min-w-full rounded-t bg-white ease-in duration-300'}
                      />
                      <div
                        className={'p-4 md:h-32 ease-in duration-300'}
                      >
                        <h5 className="text-lg font-bold tracking-tight text-white dark:text-white">
                          {member.name}
                        </h5>
                        <p className="font-normal text-gray-200 dark:text-gray-400">
                          {member.jabatan}
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
