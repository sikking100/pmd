import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'
import { ErrorText } from '@/Components/Error'

interface PropsForm {
  total: string
  men: string
  women: string
  kk: string
}

interface Props {
  auth: any
  errors: any
  counter?: {
    id: number
    total: string
    men: string
    women: string
    kk: string
  }
}

export default function Counter(props: Props) {

  const { flash } = usePage().props
  const f = flash as { message: string }

  const [showAlert, setShowAlert] = React.useState(true);


  const { data, setData, errors, post, put } = useForm<PropsForm>({
    total: props.counter?.total ?? '',
    men: props.counter?.men ?? '',
    women: props.counter?.women ?? '',
    kk: props.counter?.kk ?? '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setShowAlert(true)
    if (props.counter !== null) {
      put(route('counter.update', props.counter?.id))
      return
    }
    post(route('counter.store'))
  }

  const title = props.counter !== null ? "Ubah" : "Simpan"
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Counter</h2>}
    >
      <Head title="Live Counter" />
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form className="w-full p-6" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Total Penduduk
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    type='text'
                    value={data.total}
                    onChange={(e) => setData('total', e.target.value)}
                  />
                  <ErrorText
                    message={errors.total}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Total Kartu Keluarga
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    type='text'
                    value={data.kk}
                    onChange={(e) => setData('kk', e.target.value)}

                  />
                  <ErrorText
                    message={errors.kk}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Jumlah Perempuan
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    type='text'
                    value={data.women}

                    onChange={(e) => setData('women', e.target.value)}

                  />
                  <ErrorText
                    message={errors.women}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Jumlah Laki - Laki
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    type='text'
                    value={data.men}

                    onChange={(e) => setData('men', e.target.value)}

                  />
                  <ErrorText
                    message={errors.men}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  {title}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
