import React from 'react'
import {useForm, usePage} from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Archive } from './Index'
import { Editor } from '@tinymce/tinymce-react'
import { ErrorText } from '@/Components/Error'
import { Inertia } from '@inertiajs/inertia'
import { BackButton } from '@/Components/PrimaryButton'
import {GlobalProps} from '@/Interface/Interface'

interface Props {
  isPost: boolean
  data?: Archive
}

interface FormProps {
  title: string
  description: string
  file: File | string | null
}

export default function ArchiveForm(props: Props) {
  const { data, setData, errors, post } = useForm<FormProps>({
    title: props.data?.title ?? '',
    description: props.data?.description ?? '',
    file: props.data?.file ?? null
  })

  const title = props.isPost ? 'Simpan' : 'Perbaharui'

    const {tinyKey} = usePage<GlobalProps>().props;


    return (
    <form className="w-full p-6" onSubmit={(e) => {
      e.preventDefault()
      if (props.isPost) {
        post(route('archive.store'))
        return
      } else {
        Inertia.post(route('archive.update', props.data?.id), {
          'title': data.title,
          'description': data.description,
          'file': data.file,
          '_method': 'put',
        })
        return
      }
    }}>
      <BackButton
        route={'archive'}
      />
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
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            File
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
            type={'file'}
            onChange={(e) => {
              const file = e.target?.files
              if (file == null) {
                return
              }
              console.log(file[0])
              setData('file', file[0])
              return
            }}
          />
          <ErrorText message={errors.file} />
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
