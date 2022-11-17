import React from 'react'
import { useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Activity } from './Index'
import { Editor } from '@tinymce/tinymce-react'
import { defImage } from '@/Components/Constant'
import { ErrorText } from '@/Components/Error'
import { Inertia } from '@inertiajs/inertia'
import { BackButton } from '@/Components/PrimaryButton'
import { GlobalProps } from '@/Interface/Interface'

interface Props {
  isPost: boolean
  data?: Activity
}

interface FormProps {
  image: File | null
  title: string
  description: string
}

export default function MemberForm(props: Props) {
  const { data, setData, errors, post } = useForm<FormProps>({
    description: props.data?.description ?? '',
    image: null,
    title: props.data?.title ?? ''
  })

  const { tinyKey } = usePage<GlobalProps>().props;


  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
  const [preview, setPreview] = React.useState<string>()
  React.useEffect(() => {
    if (!selectedFile) {
      if (!props.isPost) {
        setPreview(props.data?.image == null ? defImage : `../../../../storage/activities/${props.data?.image}`)
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
        post(route('activity.store'))
        return
      } else {
        Inertia.post(route('activity.update', props.data?.id), {
          'image': data.image,
          'description': data.description,
          'title': data.title,
          '_method': 'PUT',
        })
        return
      }
    }}>
      <BackButton
        route={'activity'}
      />
      <div className='grid grid-rows-3 grid-flow-col gap-6'>
        <div className='row-span-3'>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Judul
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                type={'text'}
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
              <ErrorText message={errors.title} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Deskripsi
              </label>
              <Editor
                apiKey={tinyKey}
                onEditorChange={(e) => setData('description', e)}
                value={data.description}
              />
              <ErrorText message={errors.description} />
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
