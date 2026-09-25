import Skeleton, { SkeletonGroup } from '../shared/loading/Skeleton'

/** Keeps the feed's card footprint while a category loads. */
export default function BlogSkeleton() {
    return (
        <SkeletonGroup>
            <Skeleton height={442} radius={28} />
            <Skeleton height={442} radius={28} />
        </SkeletonGroup>
    )
}
