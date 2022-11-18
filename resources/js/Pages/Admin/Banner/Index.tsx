import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import Alert from '@/Components/Alert'
import { Inertia } from '@inertiajs/inertia'
import { ErrorText } from '@/Components/Error'

interface PropsForm {
  image: File
}

interface Props {
  auth: any
  errors: any
  banner?: {
    id: number
    image: string | null
  }
}

export default function Banner(props: Props) {

  const { data, setData, errors, post } = useForm<PropsForm>()
  const { flash } = usePage().props
  const f = flash as { message: string }

  const [showAlert, setShowAlert] = React.useState(true);


  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
  const [preview, setPreview] = React.useState<string>()
  const [disabled, setDisabled] = React.useState<boolean>(true)

  console.log(props.banner !== null)
  React.useEffect(() => {
    if (!selectedFile) {
      if (props.banner !== null) {
        setPreview(`../../../storage/banner/${props.banner?.image}`)
        return
      }
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    if (selectedFile != null) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    const file = e.target?.files[0]
    setSelectedFile(file)
    setData({ 'image': file })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlert(true);
    if (props.banner !== null) {
      Inertia.post(route('banner.update', props.banner?.id), {
        '_method': 'PUT',
        'image': data.image
      })
      return
    }
    post(route('banner.store'))
  }

  const title = props.banner !== null ? "Ubah" : "Simpan"
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-white leading-tight">Banner</h2>}
    >
      <Head title="Banner" />
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form className="w-full p-6" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Gambar
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    type='file'
                    onChange={onSelectFile}
                  />
                  <ErrorText
                    message={errors.image}
                  />
                  <img src={preview} />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <button
                  disabled={disabled}
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
