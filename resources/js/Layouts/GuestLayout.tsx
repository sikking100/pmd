import React from "react"
import { GlobalProps } from "@/Interface/Interface"
import { usePage } from '@inertiajs/inertia-react'
import { menuItems } from '@/Interface/Interface'
import { MenuItems, MobileMenu } from '@/Components/Menu'
import { Transition } from '@headlessui/react'
import Marquee from "react-fast-marquee";


interface Props {
  children: React.ReactNode
}

export default function Guest({ children }: Props) {
  const { announcement, banner } = usePage<GlobalProps>().props
  const [show, setShow] = React.useState(false)

  const toggleOpen = () => {
    setShow((previousState) => !previousState);
  };

  const handleOnClick = (params: string) => {
    window.open(params)
  }
  return (
    <div className="bg-gray-100">
      <div className="w-full bg-gray-300">
        <div className="p-4">
          <div className={"flex flex-col lg:flex-row"}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+6282240502211</span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:ml-4 mr-2 inline-block"
                fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>dpmdmorut@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-wrap items-center justify-between">
        <img src={"../../storage/banner/" + banner.image} />
      </div>
      <div className="z-20 bg-cold px-6 text-white">
        <div className={`lg:hidden`}>
          <button

            onClick={toggleOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <Transition
          show={show}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref: React.LegacyRef<HTMLDivElement>) => (
            <div className={'lg:hidden'}>
              <div ref={ref}>
                <ul>
                  {
                    menuItems.map((v, i) => {
                      const depthLevel = 0;
                      return <MobileMenu items={v} key={i} depthLevel={depthLevel} />
                    })
                  }
                </ul>
              </div>
            </div>
          )}
        </Transition>
        <div className={"hidden lg:block"}>
          <ul className={`flex flex-col lg:flex-row flex-wrap`}>
            {menuItems.map((v, i) => {
              const depthLevel = 0;
              return <MenuItems items={v} key={i} depthLevel={depthLevel} />
            })}
          </ul>
        </div>
      </div>
      <div className="z-0">
        <Marquee
          speed={70}>
          <div className="text-red-500">{announcement.text}</div>
        </Marquee>
      </div>
      <div className="z-0 px-6 overflow-hidden">
        <div className="w-full mb-6 lg:mb-0">
          {children}
        </div>

      </div>
      <footer>
        <div className="px-6 mt-6 pt-5 pb-5 text-white bg-teal">
          <div className="grid grid-flow-row-dense lg:grid-cols-4 space-y-4">
            <div className="">
              <img alt={"logo-dukacpil-morowali-utara"} src="/assets/logo.png" className="max-h-32" /><br /><br />
              Kompleks Perkantoran Jln. Bumi Nangka Kel. Bahoue Kec. Petasia Kab. Morowali Utara Sulawesi Tengah Kode Pos 94971

            </div>
            <div className="">
              <span className="text-xl font-semibold mb-6 block">Link Terkait</span>
              <button onClick={() => handleOnClick('http://binapemdes.kemendagri.go.id/')}
                className="block mb-2">DITJEN BINAPEMDES KEMENDAGRI
              </button>
              <button
                onClick={() => handleOnClick('https://www.kemendesa.go.id/ ')}
                className="block mb-2">KEMENDESA
              </button>
              <button onClick={() => handleOnClick('https://dpmd.sultengprov.go.id/')}
                className="block mb-2">DPMD PROVINSI SULAWESI TENGAH
              </button>
              <button onClick={() => handleOnClick('https://morowaliutarakab.go.id/')}
                className="block mb-2">PEMERINTAH KABUPATEN MOROWALI UTARA
              </button>

            </div>
            <div className="">
              <span className="text-xl font-semibold mb-6 block">Link Media Sosial</span>
              <button onClick={() => handleOnClick('http://www.youtube.com/@dpmdmorowaliutara1364')}
                className="block mb-2">Youtube
              </button>
            </div>
            <div className="">
              <span className="text-xl font-semibold mb-6 block">Jam Pelayanan</span>
              <span className="block">Senin – Kamis 08.00 – 16.00</span>
              <span className="block">Jumat  08.00 – 16.30</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-cold">
        <div className="px-5 text-white py-6">
          Copyright &copy;2022 Dinas Pemberdayaan Masyarakat dan Desa Daerah Kabupaten Morowali Utara - CV. Buana Power
        </div>
      </div>
    </div>
  );
}
