import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Page, PageProps, Errors, ErrorBag } from '@inertiajs/inertia'
import route from 'ziggy-js'
import ReCAPTCHA from 'react-google-recaptcha'

interface Props extends Page<PageProps> {
  props: {
    siteKey: string
    errors: Errors & ErrorBag
  }

}

export default function Login({ status, canResetPassword, auth }: any) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    captcha: '',
  });


  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event: any) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e: any) => {
    e.preventDefault();
    post(route('login'));
  };


  const { siteKey } = usePage<Props>().props


  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-kemenag">
      <div className={'text-white w-full flex flex-col place-items-center'}>
        <img src={'/assets/logo.png'} className={'h-40 mb-2'} />
        <h6 className={'mx-auto'}>Login Dashboard</h6>
        <h6 className={'text-sm mx-auto'}>Disdukcapil Kab. Morowali Utara</h6>
        <span className={'text-xs mx-auto'}>Versi 1.0</span>
      </div>
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <Head title="Log in" />

        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        <ValidationErrors errors={errors} />



        <form onSubmit={submit}>
          <div>
            <Label forInput="email" value="Email" />

            <Input
              type="text"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              handleChange={onHandleChange}
            />
          </div>

          <div className="mt-4">
            <Label forInput="password" value="Password" />

            <Input
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              handleChange={onHandleChange}
            />
          </div>

          <div className="block mt-4">
            <ReCAPTCHA
              sitekey={siteKey}
              className='flex items-center justify-center'
              onChange={(e) => {
                console.log(e)
                if (e !== null) {
                  setData('captcha', e)
                  return
                }
                return
              }} />
          </div>

          <div className="flex items-center justify-center mt-4">
            {/*{canResetPassword && (*/}
            {/*  <Link*/}
            {/*    href={route('password.request')}*/}
            {/*    className="underline text-sm text-gray-600 hover:text-gray-900"*/}
            {/*  >*/}
            {/*    Forgot your password?*/}
            {/*  </Link>*/}
            {/*)}*/}

            <Button type="submit" className="ml-4" processing={processing}>
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
