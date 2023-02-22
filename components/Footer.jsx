import Link from 'next/link'

const navigation = {
  main: [
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Partner', href: '/partner' },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Privacy Policy',
      href: '/privacy-policy',
    },
  ],
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-700 dark:border-gray-600">
      <div className="mx-auto max-w-7xl overflow-hidden py-8 px-6 sm:py-10 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6 text-center">
              <Link
                href={item.href}
                className="font-body text-sm leading-6 text-gray-300 hover:text-gray-100"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 Open Seattle
        </p>
      </div>
    </footer>
  )
}
