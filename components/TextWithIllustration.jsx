import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../sanity/lib/client'

export default function TextWithIllustration({
  heading,
  body,
  link,
  image,
  tagline,
  flipLayout = false,
}) {
  const imageProps = useNextSanityImage(sanityClient(), image)
  return (
    <div className="relative">
      <div
        className={clsx(
          flipLayout ? 'md:right-0' : 'md:left-0',
          'relative h-80 overflow-hidden md:absolute md:h-full md:w-1/3 lg:w-1/2'
        )}
      >
        {/* <img className="h-full w-full object-cover" src={imgsrc} alt="" /> */}
        <Image
          alt="Seattle Skyline"
          src={imageProps.src}
          loader={imageProps.loader}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]"
        >
          <path
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl py-16 sm:py-24 lg:py-32 lg:px-8">
        <div
          className={clsx(
            flipLayout
              ? 'md:mr-auto md:pr-16 lg:pr-24 lg:pl-0 xl:pr-32'
              : 'md:ml-auto md:pl-16 lg:pl-24 lg:pr-0 xl:pl-32',
            'pr-6 pl-6  md:w-2/3 lg:w-1/2'
          )}
        >
          <p className="font-body text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-200">
            {tagline}
          </p>
          <h2 className="mt-2 font-heading text-5xl font-bold tracking-wider dark:text-indigo-100">
            {heading}
          </h2>
          <p className="mt-6 font-body text-base leading-7 text-gray-900 dark:text-gray-200">
            {body}
          </p>
          <div className="mt-8">
            <Link
              href={link.href}
              className="inline-flex rounded-md bg-indigo-800/80 px-3.5 py-1.5 font-body text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-indigo-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-indigo-500/80 hover:dark:bg-indigo-600 hover:dark:shadow-lg"
            >
              {link.linkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
