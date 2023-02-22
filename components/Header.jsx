import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment } from 'react'

import OSLogoIcon from './OSLogoIcon'

const features = [
  {
    name: 'Volunteer',
    href: '/volunteer',
    description: '',
  },
  {
    name: 'Partner',
    href: '/partner',
    description: '',
  },
  {
    name: 'About',
    href: '/about',
    description: '',
  },
]

export default function Header() {
  return (
    <Popover className="relative z-20 bg-gray-100 text-black shadow dark:bg-gray-700 dark:text-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-2 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="">
              <span className="sr-only">Open Seattle</span>
              <OSLogoIcon
                className="h-12 w-auto rounded-sm fill-black dark:fill-gray-100 sm:h-14 md:h-16"
                src="/OS_logo.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <nav className="hidden space-x-10 md:flex">
            {features.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md p-2 font-body text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700 dark:text-gray-100">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <OSLogoIcon
                    className="h-12 w-auto fill-black dark:fill-gray-100 sm:h-14 md:h-16"
                    src="/OS_logo.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {features.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 font-body hover:bg-indigo-400/10"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
