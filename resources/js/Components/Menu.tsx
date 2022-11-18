import React, { useState, useEffect, useRef } from 'react'
import { MenuItemProps } from '@/Interface/Interface'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Transition } from '@headlessui/react'


interface Props {
  items: MenuItemProps
  depthLevel: number
}

export function MenuItems({ items, depthLevel }: Props) {
  const arrow = <svg
    className="ml-2 -mr-0.5 h-4 w-4 inline-block"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  const right = <svg xmlns="http://www.w3.org/2000/svg" className="float-right h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
  const [dropdown, setDropdown] = useState(false)
  let ref = useRef() as React.MutableRefObject<HTMLLIElement>

  useEffect(() => {
    const handler = (_: Event) => {
      if (dropdown && ref.current) {
        setDropdown(false)
      }
    }

    console.log(dropdown)
    // document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  const onClick = (url: string | null) => {
    if (url == null) return
    if (!url.includes('https')) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const check = window.innerWidth < 960
  const routess = items.route != null ? items.route.includes('https') ? items.route : route(items.route) : '/#'

  return (

    <li
      className="relative z-20"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>

          <Link
            href={routess}
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            as='button'
            className="bg-transparent w-full text-left p-4 hover:bg-kemenag-dark hover:text-white"
          >
            {items.title}
            {depthLevel > 0 ? right : arrow}
          </Link>


          <Dropdowns
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (

        <Link href={routess} className="block text-left p-4 hover:bg-kemenag-dark hover:text-white" onClick={() => onClick(items.route)}>{items.title}</Link>
      )
      }
    </li >

  )
}

interface PropsDropdown {
  submenus: MenuItemProps[] | null
  dropdown: boolean
  depthLevel: number
}

export function Dropdowns({ submenus, dropdown, depthLevel }: PropsDropdown) {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "absolute left-full -top-2" : "absolute left-0 left-auto ";
  return (
    <ul className={`shadow-xl text-sm z-50 bg-white w-max rounded ${dropdownClass} ${dropdown ? 'block' : 'hidden'} text-black`}>
      {submenus != null ? submenus?.map((e, index) => {
        return <MenuItems items={e} key={index} depthLevel={depthLevel} />
      }) : <></>}
    </ul>
  )
}

export function MobileMenu({ items, depthLevel }: Props) {
  let ref = useRef() as React.MutableRefObject<HTMLLIElement>

  const routess = items.route != null ? items.route.includes('https') ? items.route : route(items.route) : '/#'
  const [dropdown, setDropdown] = useState(false)

  const arrow = <svg
    className="ml-2 -mr-0.5 h-4 w-4 inline-block"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  const right = <svg xmlns="http://www.w3.org/2000/svg" className="float-right h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>

  useEffect(() => {
    const handler = (_: Event) => {
      if (dropdown && ref.current) {
        setDropdown(false)
      }
    }

    console.log(dropdown)
    // document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  const onClick = (url: string | null) => {
    if (url == null) return
    if (!url.includes('https')) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <li
      ref={ref}
      className="relative z-20"
      onClick={() => setDropdown(prevState => !prevState)}
    >
      {items.submenu ? (
        <>

          <button
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            className="bg-transparent w-full text-left p-4 hover:bg-kemenag-dark hover:text-white"
          >
            {items.title}
            {depthLevel > 0 ? right : arrow}
          </button>

          <Transition
            show={dropdown}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MobileDropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
          </Transition>
        </>
      ) : (

        <Link href={routess} className="block text-left p-4 hover:bg-kemenag-dark hover:text-white" onClick={() => onClick(items.route)}>{items.title}</Link>
      )
      }
    </li >
  )
}

export function MobileDropdown({ submenus, dropdown, depthLevel }: PropsDropdown) {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "left-5 -top-2" : "absolute left-0 left-auto "
  return (
    <div className={`ml-5`}>
      <ul >
        {
          submenus != null ? submenus.map((v, i) => {
            const routesss = v.route != null ? route(v.route) : '/#'

            return (
              <MobileMenu items={v} key={i} depthLevel={depthLevel} />
            )
          }) : <></>
        }
      </ul>
    </div>

  )
}
