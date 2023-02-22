import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Container from '../components/Container'
import NumberFormGroup from '../components/form/NumberFormGroup'
import SelectInputGroup from '../components/form/SelectInputGroup'
import TextAreaFormGroup from '../components/form/TextAreaFormGroup'
import TextFormGroup from '../components/form/TextFormGroup'
import TextFormGroupWithAddon from '../components/form/TextFormGroupWithAddon'
import Layout from '../components/Layout'

export default function VolunteerForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    try {
      const endpoint = 'api/volunteer'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()
      if (result.data) {
        router.push('/submitted')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 divide-y divide-gray-200 dark:divide-gray-500"
        >
          <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-500 sm:space-y-5">
            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
              <div>
                <h3 className="text-lg font-medium leading-6">
                  Volunteer Interest Form
                </h3>
                <p className="mt-1 max-w-prose text-sm text-gray-500 dark:text-gray-300">
                  You&apos;re one step closer to becoming an Open Seattle
                  volunteer! Our goal is to match you with projects that align
                  with your skills and interests.
                </p>
                <p className="mt-1 max-w-prose text-sm text-gray-500 dark:text-gray-300">
                  Fill out this form and a member of our team will be in touch
                  regarding next steps.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <TextFormGroup
                  label="First Name"
                  name="fldxfCtWrtqY0xvhb"
                  autoComplete="given-name"
                  register={register}
                  maxLength={80}
                  required
                />

                <TextFormGroup
                  label="Last Name"
                  name="fldLZZyHB1CReg5rB"
                  autoComplete="family-name"
                  register={register}
                  maxLength={80}
                  required
                />

                <TextFormGroup
                  label="Email Address"
                  name="fldcHyXbNRrlaydaA"
                  autoComplete="email"
                  placeholder="example@example.com"
                  register={register}
                  maxLength={80}
                  expand
                  required
                />
                <TextFormGroup
                  label="Phone Number"
                  name="fldNeCS6DUJQzrn08"
                  autoComplete="phone"
                  placeholder="555-123-4567"
                  register={register}
                />
                <SelectInputGroup
                  label="Country"
                  name="fldX2HlFnILQhy198"
                  autoComplete="country-name"
                  options={['United States', 'Canada', 'Mexico']}
                  register={register}
                />

                <TextFormGroup
                  label="City"
                  name="fldpXLyy7S6JjzNKN"
                  autoComplete="address-level-2"
                  register={register}
                />

                <TextFormGroup
                  label="State / Province"
                  name="fld7yj5Eit1VWf1u3"
                  autoComplete="address-level-1"
                  register={register}
                />

                <TextFormGroup
                  label="Zip / Postal Code"
                  name="fldQ5IfVLlnzOA7sU"
                  autoComplete="postal-code"
                  register={register}
                />
                <TextFormGroupWithAddon
                  label="LinkedIn Profile"
                  name="fldeWyimMJAzbrsNv"
                  addon="https://"
                  expand
                  placeholder="linkedin.com/in/your-profile"
                  register={register}
                />
                <TextAreaFormGroup
                  label="About"
                  name="fldhaLAhMWfsIVpyJ"
                  helperText="Why are you interested in volunteering?"
                  expand
                  register={register}
                />
                <SelectInputGroup
                  label="Disciplines"
                  name="flddDkCfgabv3PsiS"
                  options={[
                    'UX/UI Design',
                    'Program Management',
                    'Content Writing',
                    'Product',
                    'Software Development',
                    'Research',
                    'Graphic Design',
                    'Data Science',
                    'Marketing/Community Engagment',
                  ]}
                  multiple
                  helperText="What skills do you have that could benefit Open Seattle or another project? You may select more than one. (hold ctrl -> click)"
                  register={register}
                />
                <NumberFormGroup
                  label="Weekly Commitment"
                  name="fldGtErVFJm2V6l5b"
                  helperText="How many hours per week could you commit to Open Seattle or another project?"
                  register={register}
                  min={0}
                  max={40}
                  required
                />
                <SelectInputGroup
                  label="Duration"
                  name="fld9zk0f14ojcVPFj"
                  options={['Yes', 'No']}
                  helperText="Can you commit to helping regularly for at least three (3) months?"
                  register={register}
                />
              </div>
            </div>
          </div>

          <div className="pt-5 pb-5">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex rounded-md bg-gray-800/80 px-3.5 py-1.5 font-body text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-indigo-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-gray-500/60 hover:dark:bg-gray-600 hover:dark:shadow-lg"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex rounded-md bg-indigo-800/80 px-3.5 py-1.5 font-body text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-indigo-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-indigo-500/80 hover:dark:bg-indigo-600 hover:dark:shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Layout>
  )
}
