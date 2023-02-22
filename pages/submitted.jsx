import Link from 'next/link'
import Layout from '../components/Layout'

export default function SubmittedPage() {
  return (
    <Layout>
      <div className="flex min-h-full lg:relative">
        <div className="flex flex-grow flex-col">
          <main className="flex flex-grow flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8">
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-200">
                  Application Received
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  Thank you for applying!
                </h1>
                <p className="mt-2 text-base dark:text-gray-300">
                  Once we have reviewed your application, we will reach out by
                  email with any further questions or next steps.
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
        <div className="hidden lg:relative lg:inset-y-0 lg:right-0 lg:block lg:w-3/4">
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
