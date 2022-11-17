import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';


interface Props {
  auth: any
  errors: any
  counter?: {
    kk: string
    total: string
    men: string
    women: string
  }
}

export default function Dashboard(props: Props) {

  const data = [
    { name: 'Analisis Data Penduduk', Puan: props.counter?.women, Laki: props.counter?.men, Total: props.counter?.total, Kk:props.counter?.kk, amt: -4500, bmk: -4301, time: 1, uvError: [100, 50], LakiError: [110, 20] },
  ];

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="bar-chart-wrapper">
                <div className="bar-chart-wrapper">
                  Selamat Datang
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
