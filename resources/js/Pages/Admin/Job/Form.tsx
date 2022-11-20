import React from 'react'
import { useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Job } from './Index'
import { Editor } from '@tinymce/tinymce-react'
import { ErrorText } from '@/Components/Error'
import { BackButton } from '@/Components/PrimaryButton'
import { GlobalProps } from '@/Interface/Interface'

interface Props {
  isPost: boolean
  data?: Job
  jobs: Array<Job>
}

interface FormProps {
  position: string
  detail: string
  parent?: number
}

export default function MemberForm(props: Props) {
  const { data, setData, errors, post, put } = useForm<FormProps>({
    detail: props.data?.detail ?? '',
    position: props.data?.position ?? '',
    parent: props.data?.parent ?? undefined
  })

  const title = props.isPost ? 'Simpan' : 'Perbaharui'
  const { tinyKey } = usePage<GlobalProps>().props;


  return (
    <form className="w-full p-6" onSubmit={(e) => {
      e.preventDefault()
      if (props.isPost) {
        post(route('job.store'))
        return
      } else {
        put(route('job.update', props.data?.id))
        return
      }
    }}>
      <BackButton
        route={'job'}
      />
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Parent
          </label>
          <select
            value={data.parent}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
            onChange={(e) => {
              if (e.target.value !== '') {
                return setData('parent', Number.parseInt(e.target.value))
              }
            }}
          >
            <option value={undefined}>-- Silakan Pilih Parent --</option>
            {
              props.jobs && props.jobs?.map((j, i) => {
                return <option value={j.id}>{j.position}</option>
              })
            }
          </select>
          <ErrorText message={errors.parent} />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Jabatan
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
            type={'text'}
            value={data.position}
            onChange={(e) => setData('position', e.target.value)}
          />
          <ErrorText message={errors.position} />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Deskripsi
          </label>
          <Editor
            apiKey={tinyKey}
            onEditorChange={(e) => setData('detail', e)}
            value={data.detail}
          />
          <ErrorText message={errors.detail} />
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
