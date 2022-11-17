import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'
import { ErrorText } from '@/Components/Error'

interface PropsForm {
  text: string
}

interface Props {
  auth: any
  errors: any
  running?: {
    id?: number
    text?: string
  }
}

export default function RunningText(props: Props) {

  const { flash } = usePage().props
  const f = flash as { message: string }

  const [showAlert, setShowAlert] = React.useState(true);


  const { data, setData, errors, post, put } = useForm<PropsForm>(
    {
      text: props.running?.text ?? ''
    }
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlert(true)
    if (props.running !== null) {
      put(route('pengumuman.update', props.running?.id))
      return
    }
    post(route('pengumuman.store'))
  }

  const title = props.running !== null ? "Ubah" : "Simpan"
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Pengumuman</h2>}
    >
      <Head title="Pengumuman" />
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
      {errors.text && <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12" role="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Kesalahan
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{errors.text}</p>
        </div>
      </div>}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form className="w-full p-6" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Teks Pengumuman
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    name="text"
                    value={data.text}
                    onChange={(e) => setData('text', e.target.value)}
                  />
                  <ErrorText
                    message={errors.text}
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
