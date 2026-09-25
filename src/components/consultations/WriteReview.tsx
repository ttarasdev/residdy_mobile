import { useState } from 'react'
import { View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { consultationReviewsApi } from '../../api/consultation-reviews/consultation-reviews.api'
import DetailScreen from '../shared/layout/DetailScreen'
import QueryState from '../shared/content/QueryState'
import FormInput from '../shared/forms/FormInput'
import Button from '../shared/buttons/Button'
import BlueButton from '../shared/buttons/BlueButton'
import { contentStyles as s } from '../shared/content/content.styles'
function ReviewForm({
    bookingId,
    reviewId,
    initialRating = 5,
    initialComment = '',
}: {
    bookingId: number
    reviewId?: number
    initialRating?: number
    initialComment?: string
}) {
    const { options } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const [rating, setRating] = useState(initialRating)
    const [comment, setComment] = useState(initialComment)
    const mutation = useMutation({
        mutationFn: () =>
            reviewId
                ? consultationReviewsApi.updateMy(
                      reviewId,
                      { rating, comment: comment.trim() },
                      options,
                  )
                : consultationReviewsApi.create(
                      {
                          consultationBookingId: bookingId,
                          rating,
                          comment: comment.trim(),
                      },
                      options,
                  ),
        onSuccess: async () => {
            await Promise.all(
                [
                    'consultation-reviews',
                    'my-review',
                    'consultation-booking',
                ].map((key) => client.invalidateQueries({ queryKey: [key] })),
            )
            router.back()
        },
    })
    return (
        <>
            <QueryState error={mutation.error} />
            <View style={s.row}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                        key={value}
                        height={44}
                        padding={8}
                        accessibilityLabel={`${value}/5`}
                        accessibilityState={{ selected: value === rating }}
                        onPress={() => setRating(value)}
                    >
                        {value <= rating ? '★' : '☆'}
                    </Button>
                ))}
            </View>
            <FormInput
                label={t('consultationFlow.reviewText')}
                multiline
                value={comment}
                onChangeText={setComment}
                maxLength={5000}
                style={{ minHeight: 130, textAlignVertical: 'top' }}
            />
            <BlueButton
                loading={mutation.isPending}
                disabled={!comment.trim()}
                onPress={() => mutation.mutate()}
            >
                {t('consultationFlow.saveReview')}
            </BlueButton>
        </>
    )
}
export default function WriteReview() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { account, options } = useApi()
    const { t } = useTranslation()
    const valid = Number.isSafeInteger(Number(id)) && Number(id) > 0
    const query = useQuery({
        queryKey: ['my-review', account?.account.id, id],
        enabled: valid,
        queryFn: ({ signal }) =>
            consultationReviewsApi.findMy(
                { consultationBookingId: Number(id), limit: 1 },
                { ...options, signal },
            ),
    })
    const review = query.data?.rows[0]
    return (
        <DetailScreen title={t('consultationFlow.writeReview')}>
            <QueryState
                loading={valid && query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {query.isSuccess && (
                <ReviewForm
                    key={review?.id ?? 'new'}
                    bookingId={Number(id)}
                    reviewId={review?.id}
                    initialRating={review?.rating}
                    initialComment={review?.comment}
                />
            )}
        </DetailScreen>
    )
}
