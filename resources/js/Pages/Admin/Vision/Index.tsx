import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Editor } from '@tinymce/tinymce-react'
import {ErrorText} from '@/Components/Error'
import Alert from '@/Components/Alert'
import {GlobalProps} from '@/Interface/Interface'

interface PropsForm {
  content: string
}

interface Props {
  auth: any
  errors: any
  vision?: {
    id: number
    content: string
  }
}

export default function Vision(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }

  const { data, errors, setData, post, put } = useForm<PropsForm>({
    content: props.vision?.content ?? ''
  })

  const [showAlert, setShowAlert] = React.useState(true);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlert(true)
    if (props.vision !== null) {
      put(route('vision.update', props.vision?.id))
      return
    }
    post(route('vision.store'))
  }

  const title = props.vision !== null ? "Ubah" : "Simpan"
    const {tinyKey} = usePage<GlobalProps>().props;

    return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Visi & Misi</h2>}
    >
      <Head title="Visi & Misi" />
      <Alert
      setShowAlert={setShowAlert}
      showAlert={showAlert}
        message={f.message}
       />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form className="w-full p-6" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Isi
                  </label>

                  <Editor
                    value={data.content}
                    apiKey={tinyKey}
                    onEditorChange={(e) => setData('content', e)}
                  />
                  <ErrorText
                    message={errors.content}
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
