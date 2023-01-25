import clsx from 'clsx'

export default function TextAreaFormGroup({
  name,
  defaultValue,
  helperText,
  label = name,
  autoComplete,
  placeholder,
  register,
  errors,
  expand,
}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <textarea
          id={name}
          placeholder={placeholder}
          name={name}
          rows={3}
          className={clsx(
            'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-900 sm:text-sm',
            !expand && 'sm:max-w-xs'
          )}
          defaultValue={defaultValue}
        />
        {helperText && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {helperText}
          </p>
        )}
        {errors && (
          <span className="mt-2 text-sm text-red-700 dark:text-red-300">
            {errors}
          </span>
        )}
      </div>
    </div>
  )
}