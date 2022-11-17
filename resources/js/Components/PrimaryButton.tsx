import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import route from 'ziggy-js';

interface BackProps {
    route: string
  }

export function BackButton(routes: BackProps) {
    return (
      <div className='container pb-3'>
        <Link
          className="text-kemenag"
          href={route(`${routes.route}.index`)}>
          Kembali
        </Link>
      </div>
    )
  }

export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }: any) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
