import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import { Editor } from "@tinymce/tinymce-react";
import { Inertia } from "@inertiajs/inertia";
import Alert from "@/Components/Alert";
import { ErrorText } from "@/Components/Error";
import { GlobalProps } from '@/Interface/Interface'

interface PropsForm {
  image: File | null;
  description: string;
}

interface Props {
  auth: any;
  errors: any;
  welcome?: {
    id: number;
    image?: any;
    description: string;
  };
}

export default function Welcome(props: Props) {
  const { flash } = usePage().props;
  const f = flash as { message: string };

  const [showAlert, setShowAlert] = React.useState(true);

  const { data, setData, errors, post } = useForm<PropsForm>({
    description: props.welcome?.description ?? "",
    image: null,
  });

  const values = {
    image: data.image ?? null,
    description: data.description,
    _method: "put",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlert(true);
    if (props.welcome !== null) {
      Inertia.post(route("welcome.update", props.welcome?.id), values);
      return;
    }
    post(route("welcome.store"));
  }

  const title = props.welcome !== null ? "Ubah" : "Simpan";

  const [selectedFile, setSelectedFile] = React.useState<
    Blob | MediaSource
  >();
  const [preview, setPreview] = React.useState<string>();
  React.useEffect(() => {
    if (!selectedFile) {
      if (props.welcome !== null) {
        setPreview(`../../../storage/images/${props.welcome?.image}`);
        return;
      }
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const file = e.target.files[0];
    setSelectedFile(file);
    setData("image", file);
  };

  const { tinyKey } = usePage<GlobalProps>().props;


  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-white leading-tight">
          Sambutan Kepala Dinas Dukcapil Kab. Morowali Utara
        </h2>
      }
    >
      <Head title="Sambutan" />
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
                    Ucapan Selamat Datang
                  </label>
                  <Editor
                    apiKey={tinyKey}
                    onEditorChange={(e) =>
                      setData("description", e)
                    }
                    value={data.description}
                  />
                  <ErrorText message={errors.description} />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Gambar
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                    type="file"
                    onChange={onSelectFile}
                  />
                  <ErrorText message={errors.image} />
                  <img
                    src={preview}
                    style={{ maxHeight: 200, minHeight: 0 }}
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
  );
}
