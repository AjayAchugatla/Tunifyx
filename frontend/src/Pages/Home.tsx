import FeaturedSection from '@/components/FeaturedSection'
import SectionGrid from '@/components/SectionGrid'
import Topbar from '@/components/Topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMusicStore } from '@/stores/useMusicStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'react'

const Home = () => {

    const { isLoading, featuredSongs, madeForYouSongs, trendingSongs, fetchfeaturedSongs, fetchmadeForYouSongs, fetchtrendingSongs } = useMusicStore()

    const { initializeQueue } = usePlayerStore()

    useEffect(() => {
        fetchfeaturedSongs()
        fetchmadeForYouSongs()
        fetchtrendingSongs()
    }, [fetchfeaturedSongs, fetchmadeForYouSongs, fetchtrendingSongs])


    useEffect(() => {
        if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
            const allSong = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
            initializeQueue(allSong)
        }
    }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs])

    return (
        <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
            <Topbar />
            <ScrollArea className='h-[calc(100vh-180px)]'>
                <div className='p-4 sm:p-6'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good Afternoon</h1>
                    <FeaturedSection />

                    <div className='space-y-8'>
                        <SectionGrid title='Made for you' songs={madeForYouSongs} isLoading={isLoading} />
                        <SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
                        <SectionGrid title='Featured Songs' songs={featuredSongs} isLoading={isLoading} />
                    </div>
                </div>
            </ScrollArea>
        </main>
    )
}

export default Home