import FeaturedSection from '@/components/FeaturedSection'
import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'

const Home = () => {

    const { isLoading, featuredSongs, madeForYouSongs, trendingSongs, fetchfeaturedSongs, fetchmadeForYouSongs, fetchtrendingSongs } = useMusicStore()


    useEffect(() => {
        fetchfeaturedSongs()
        fetchmadeForYouSongs()
        fetchtrendingSongs()
    }, [fetchfeaturedSongs, fetchmadeForYouSongs, fetchtrendingSongs])
    return (
        <div className='rounded-md overflow-hidden '>
            <Topbar />
            <FeaturedSection />
        </div>
    )
}

export default Home