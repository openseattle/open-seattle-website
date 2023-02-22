import Link from 'next/link'
import Layout from '../components/Layout'

export default function Page404() {
  return (
    <Layout>
      <div className="flex min-h-full flex-col lg:relative">
        <div className="flex flex-grow flex-col">
          <main className="flex flex-grow flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8">
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-200">
                  404
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-2 text-base dark:text-gray-300">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="text-base font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 hover:dark:text-indigo-400"
                  >
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="seattle_3.jpg"
            alt=""
          />
        </div>
      </div>
    </Layout>
  )
}
