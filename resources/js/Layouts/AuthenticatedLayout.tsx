import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { InertiaLink, Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js'
import { UserInterface } from '@/Interface/Interface';

interface Props {
    auth: {
        user: UserInterface
      }
      errors: {
        [key: string]: any | null
      }
      header: JSX.Element
}

export default function Authenticated({ errors, header, children }: React.PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-100 grid grid-cols-5">
          <div
            className={`
              min-h-screen
              bg-white
              py-4
              px-6
              col-span-2
              md:col-span-1
            `}
          >
            <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-center w-full inline-block"
              >
                <div className={'w-full mb-2'}>
                  <img src={'/assets/logo.png'} className={'h-2/4 max-h-8 mx-auto'} />
                </div>
                <div>
                  <h6>Dashboard</h6>
                  <h6 className={'text-sm'}>Dinas Pemberdayaan Masyarakat dan Desa Daerah</h6>
                  <h6 className="text-sm">Kabupaten Morowali Utara</h6>
                  <span className={'text-xs'}>Versi 1.0</span>
                </div>
              </a>
              <div className="flex flex-col">
                <hr className="my-4 min-w-full" />
                <ul className="flex-col min-w-full flex list-none">
                  <li className="rounded-lg mb-4">
                    <NavLink
                      href={route('dashboard')}
                      className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                      active={route().current('dashboard')}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('banner.index')} active={route().current('banner.*')}>
                      Banner
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('pengumuman.index')} active={route().current('pengumuman.*')}>
                      Pengumuman
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('welcome.index')} active={route().current('welcome.*')}>
                      Selamat Datang
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('vision.index')} active={route().current('vision.*')}>
                      Visi & Misi
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('profile.index')} active={route().current('profile.*')}>
                      Profil
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
    
                    <NavLink href={route('structure.index')} active={route().current('structure.*')}>
                      Struktur Organisasi
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('member.index')} active={route().current('member.*')}>
                      PNS
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('phl.index')} active={route().current('phl.*')}>
                      PHL
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
    
                    <NavLink href={route('activity.index')} active={route().current('activity.*')}>
                      Aktifitas
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('job.index')} active={route().current('job.*')}>
                      Tugas Pokok & Fungsi
                    </NavLink>
                  </li>
                  <li className={"rounded-lg mb-4"}>
                    <NavLink href={route('archive.index')} active={route().current('archive.*')}>
                      Arsip
                    </NavLink>
                  </li>
                  <hr className="my-4 min-w-full" />
    
                  <li className={"rounded-lg mb-4"}>
    
                    <InertiaLink
                      method='post'
                      as={'button'}
                      href={route('logout')}
                    >
                      Logout
                    </InertiaLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-4">
            {header && (
              <header className="bg-kemenag shadow">
                <div className="max-w-7xl text-white mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
              </header>
            )}
    
            {
              Object.keys(errors).length > 0 && Object.values(errors).map((v, i) => (<div key={i} id="alert-1" className="flex p-4 mt-6 ml-6 mr-6 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                <svg className="flex-shrink-0 w-5 h-5 text-red-700 dark:red-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                  {v}
                </div>
              </div>))
            }
            <main>{children}</main>
          </div>
        </div>
      );
}
