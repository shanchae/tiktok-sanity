import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
    
  }, [fetchAllUsers])
  

  return (
    <div className='xl:border-b-2 border-gray-2 pb-4'>
      <p>Suggested Accounts</p>
      <div>
        {allUsers.slice(0,6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  src={user.image}
                  width={62}
                  height={62}
                  className='rounded-full'
                  alt='user profile'
                  layout='responsive'
                />
                </div>
                <div>
                  <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                    {user.userName.replaceAll(' ', '')}
                    <GoVerified className='text-blue-400'/>
                  </p>
                  <p className='capialize text-gray-400'>
                    {user.userName}
                  </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts