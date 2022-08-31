import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'
import useAuthStore from '../../store/authStore'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'

const Search = ({videos}: {videos: Video[]}) => {
    const [isAccounts, setIsAccounts] = useState(false)
    const router = useRouter()
    const { searchTerm }: any = router.query
    const { allUsers } = useAuthStore()

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400' 
    const searchedAccounts = allUsers.filter((user : IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w-full'>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>
            Accounts
          </p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>
            Videos
          </p>
        </div>

        { isAccounts ? (
            <div className='md:mt-16'>
              { searchedAccounts.length > 0 ? (
                searchedAccounts.map((user: IUser, idx: number) => (
                  <Link href={`/profile/${user._id}`} key={user._id}>
                    <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                      <div className='w-8 h-8'>
                        <Image
                          src={user.image}
                          width={62}
                          height={62}
                          className='rounded-full'
                          alt='user profile'
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
                ))) : (
                  <NoResults 
                    text={`No user results for ${searchTerm}`}
                  />
                )}
            </div>
        ) : (
            <div className='md:mt-16 flex flex-wrap gap6 md:justify-start'>
              {videos.length ? (
                videos.map((video: Video, idx) => (
                  <VideoCard 
                    post={video}
                    key={idx}
                  />
                ))
              ) : (
                <NoResults 
                  text={`No video results for ${searchTerm}`}
                />
              ) }
            </div>
        )}
    </div>
  )
}

export const getServerSideProps = async ({
    params: { searchTerm }
} : {
    params: { searchTerm: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
      props: { videos: res.data }
    }
}

export default Search