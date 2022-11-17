import React, { useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia';
import route from 'ziggy-js';
import ValidationErrors from '@/Components/ValidationErrors';
import ReCAPTCHA from "react-google-recaptcha";

interface Props extends Page<PageProps> {
    props: {
      siteKey: string
      errors: Errors & ErrorBag
    }
  
  }

interface FormProps {
    email: string
    password: string
    captcha: string
}

export default function Login({ status }: any) {
    const { data, setData, post, processing, errors, } = useForm<FormProps>({
        email: '',
        password: '',
        captcha: '',
    });

    

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        type keys = keyof FormProps 
        setData(event.target.name as keys, event.target.value);
    };

    const submit = (e: any) => {
        e.preventDefault();

        post(route('login'));
    };

    const { siteKey } = usePage<Props>().props

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-mint">
          <div className={'text-white w-full flex flex-col place-items-center'}>
            <img src={'/assets/logo.png'} className={'h-40 mb-2'} />
            <div className='text-navy flex flex-col items-center'>
              <h6 className={'mx-auto'}>Login Dashboard</h6>
              <h6 className={'text-sm mx-auto'}>Dinas Pemberdayaan Masyarakat dan Desa Daerah</h6>
              <h6 className="text-sm mx-auto">Kabupaten Morowali Utara</h6>
              <span className={'text-xs mx-auto'}>Versi 1.0</span>
            </div>
          </div>
          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-teal shadow-md overflow-hidden sm:rounded-lg">
            <Head title="Log in" />
    
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
    
            <ValidationErrors errors={errors} />
    
    
    
            <form onSubmit={submit}>
              <div>
                <InputLabel forInput="email" value="Email" className={'text-navy'} />
    
                <TextInput
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
                <InputLabel forInput="password" value="Password" className={'text-navy'} />
    
                <TextInput
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
    
                <PrimaryButton type="submit" className="ml-4" processing={processing}>
                  Log in
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      );
}
