import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import { defImage } from '@/Components/Constant'
import { BackButton } from '@/Components/PrimaryButton'
import { Phl } from '@/Pages/Admin/Phl/Index'
import { Application } from './Index'

interface Props {
  isPost: boolean
  data?: Application | null
}

interface FormProps {
  image: File | null
  name: string
  description: string
  url: string

}

export default function Form(props: Props) {
  const { data, setData, errors, post, } = useForm<FormProps>({
    image: null,
    name: props.data?.name ?? '',
    description: props.data?.description ?? '',
    url: props.data?.url ?? ''
  })

  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
  const [preview, setPreview] = React.useState<string>()
  React.useEffect(() => {
    if (!selectedFile) {
      if (!props.isPost) {
        setPreview(`../../../../storage/applications/${props.data?.image}`)
        return
      }
      setPreview(defImage)
      return
    }


    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    const file = e.target.files[0]
    setSelectedFile(file)

    setData('image', file)
  }

  const title = props.isPost ? 'Simpan' : 'Perbaharui'


  return (
    <form className="w-full p-6" onSubmit={(e) => {
      e.preventDefault()
      if (props.isPost) {
        post(route('application.store'))
        return
      } else {
        Inertia.post(route('application.update', props.data?.id),
          {
            'image': data.image,
            'description': data.description,
            'url': data.url,
            'name': data.name,
            '_method': 'PUT',
          })
        return
      }
    }}>
      <BackButton
        route={'application'}
      />
      <div className='grid grid-rows-3 grid-flow-col gap-6'>
        <div className='row-span-3'>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nama
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                type={'text'}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Url
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                type={'text'}
                value={data.url}
                onChange={(e) => setData('url', e.target.value)}
              />
              {errors.url && <p className="text-red-500 text-xs italic">{errors.url}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Keterangan
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                type={'text'}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
            </div>
          </div>
        </div>
        <div className="row-span-3 flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Gambar
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading tight"
              type='file'
              onChange={onSelectFile}
            />
            {errors.image && <p className="text-red-500 text-xs italic mb-3">{errors.image}</p>}

            <img src={preview} style={{ maxHeight: 200, minHeight: 0 }} />

          </div>
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
  )
}
