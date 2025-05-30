
import Image from 'next/image';
import { updateGuest } from '../_lib/actions';
import { guestProps } from '../_type/type';
import { ActionButton } from './ActionButton';
import SelectCountry from './SelectCountry';

interface ProfileProp{
  guest: guestProps
}

export default function ProfileForm({guest}:ProfileProp) {
 const {fullName, email, countryFlag, nationalID, nationality} = guest
 
  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    action={updateGuest}>
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled defaultValue={fullName} name='fullName'
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled defaultValue={email} name='email'
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            {countryFlag && <Image
              src={countryFlag}
              alt="Country flag"
              width={5}
              height={5}
              className="rounded-sm h-7 w-10"
            />
            }
          </div>

          <SelectCountry
            name="nationality"
            id="nationality"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={nationality || 'Select country'}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID" defaultValue={nationalID}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <ActionButton pendingLabel='Updating'>Update Guest</ActionButton>
        </div>
      </form>
  )
}