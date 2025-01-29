import { useMusicStore } from '@/stores/useMusicStore'
import React from 'react'
import FeaturedGridSkeleton from './skeletons/FeatureGridSkeleton'

const FeaturedSection = () => {
    const { isLoading, error, featuredSongs } = useMusicStore()
    if (isLoading) return <FeaturedGridSkeleton />
    return (
        <div>FeaturedSection</div>
    )
}

export default FeaturedSection