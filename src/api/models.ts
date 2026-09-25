/** JSON fields from src/modules/user-modules/user/user.model.ts. */
export interface User {
    id: number
    accountId: number
    account?: Partial<Account> | null
    parentId?: number | null
    parent?: Partial<User> | null
    name?: string | null
    surname?: string | null
    phone?: string | null
    location?: string | null
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    level: number
    profileCompletedAt?: string | null
    onboardingCompletedAt?: string | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/account-modules/account/account.model.ts. */
export interface Account {
    id: number
    email: string
    avatarId?: number | null
    status: 'active' | 'pending' | 'blocked' | 'archived'
    type?: 'USERS' | 'MANAGERS' | 'PARTNERS' | 'SPECIALISTS' | null
    archivedAt?: string | null
    archivedByAccountId?: number | null
    lastLoginAt?: string | null
    user?: Partial<User> | null
    specialist?: Partial<Specialist> | null
    partner?: Partial<Partner> | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/specialist-modules/specialists/specialist.model.ts. */
export interface Specialist {
    id: number
    accountId: number
    account?: Partial<Account> | null
    name?: string | null
    surname?: string | null
    location?: string | null
    phone?: string | null
    rating?: string | null
    verified: boolean
    info?: Partial<SpecialistInfo> | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/specialist-modules/specialists-info/specialist-info.model.ts. */
export interface SpecialistInfo {
    websiteUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    tiktokUrl?: string | null
    linkedinUrl?: string | null
    youtubeUrl?: string | null
    telegramUrl?: string | null

    titlePl?: string | null
    titleUa?: string | null
    titleEn?: string | null
    titleRu?: string | null
    aboutPl?: string | null
    aboutUa?: string | null
    aboutEn?: string | null
    aboutRu?: string | null
    specializationPl?: string | null
    specializationUa?: string | null
    specializationEn?: string | null
    specializationRu?: string | null
    educationPl?: string | null
    educationUa?: string | null
    educationEn?: string | null
    educationRu?: string | null
    servicesSummaryPl?: string | null
    servicesSummaryUa?: string | null
    servicesSummaryEn?: string | null
    servicesSummaryRu?: string | null

    id: number
    specialistId: number
    specialist?: Partial<Specialist> | null
    title?: string | null
    about?: string | null
    languages?: Array<'UA' | 'PL' | 'EN' | 'RU'> | null
    specialization?: string | null
    experienceYears?: number | null
    education?: string | null
    certificates?: Array<Partial<string>> | null | null
    servicesSummary?: string | null
    socialLinks?: Record<string, string> | null
    website?: string | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/partners-modules/partners/partner.model.ts. */
export interface Partner {
    id: number
    accountId: number
    account?: Partial<Account> | null
    name?: string | null
    surname?: string | null
    location?: string | null
    phone?: string | null
    companies?: Array<Partial<PartnerCompany>> | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/partners-modules/partner-companies/partner-company.model.ts. */
export interface PartnerCompany {
    id: number
    partnerId: number
    partner?: Partial<Partner> | null
    companyName: string
    contactEmail?: string | null
    phone?: string | null
    logoId?: number | null
    logo?: Partial<PrivateVariant> | null
    status: 'draft' | 'active' | 'blocked' | 'archived'
    info?: Partial<PartnerCompanyInfo> | null
    banners?: Array<Partial<PartnerBanner>> | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/media-modules/private-variants/private-variant.model.ts. */
export interface PrivateVariant {
    id: number
    bucket:
        | 'instruction_headers'
        | 'instruction_images'
        | 'blog_images'
        | 'manager_files'
        | 'account_ava'
        | 'legal_document_drafts'
        | 'gdoc_templates'
        | 'user_docs'
        | 'consultation_files'
        | 'partner_logos'
        | 'partner_main'
        | 'partner_adv'
    originalName: string
    ownerAccountId: number
    createdByAccountId: number
    visibility:
        | 'private'
        | 'owner_and_managers'
        | 'managers'
        | 'admins'
        | 'all_accounts'
    isPopular: boolean
    smallAssetId: number
    smallAsset?: PrivateAsset
    mediumAssetId: number
    mediumAsset?: PrivateAsset
    largeAssetId: number
    largeAsset?: PrivateAsset
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/media-modules/private-assets/private-asset.model.ts. */
export interface PrivateAsset {
    id: number
    expiresAt?: string | null
    fileDeletedAt?: string | null
    bucket:
        | 'instruction_headers'
        | 'instruction_images'
        | 'blog_images'
        | 'manager_files'
        | 'account_ava'
        | 'legal_document_drafts'
        | 'gdoc_templates'
        | 'user_docs'
        | 'consultation_files'
        | 'partner_logos'
        | 'partner_main'
        | 'partner_adv'
    relPath: string
    originalName: string
    isPopular: boolean
    ownerAccountId: number
    createdByAccountId: number
    visibility:
        | 'private'
        | 'owner_and_managers'
        | 'managers'
        | 'admins'
        | 'all_accounts'
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/partners-modules/partner-company-info/partner-company-info.model.ts. */
export interface PartnerCompanyInfo {
    id: number
    companyId: number
    company?: Partial<PartnerCompany> | null
    mainPhotoId?: number | null
    mainPhoto?: Partial<PrivateVariant> | null
    websiteUrl?: string | null
    shortDescriptionUa?: string | null
    shortDescriptionEn?: string | null
    shortDescriptionPl?: string | null
    shortDescriptionRu?: string | null
    descriptionUa?: string | null
    descriptionEn?: string | null
    descriptionPl?: string | null
    descriptionRu?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    tiktokUrl?: string | null
    linkedinUrl?: string | null
    youtubeUrl?: string | null
    telegramUrl?: string | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/partners-modules/partner-banners/partner-banner.model.ts. */
export interface PartnerBanner {
    /** Computed by the backend JSON serializer. */
    ctr: number
    id: number
    companyId: number
    company?: Partial<PartnerCompany> | null
    photoId: number
    photo?: Partial<PrivateVariant> | null
    titleUa: string
    titleEn: string
    titlePl: string
    titleRu: string
    subtitleUa: string
    subtitleEn: string
    subtitlePl: string
    subtitleRu: string
    linkUrl: string
    type: 'big' | 'small'
    status:
        | 'draft'
        | 'pending_review'
        | 'approved'
        | 'rejected'
        | 'active'
        | 'finished'
    startDate?: string | null
    endDate?: string | null
    viewsCount: number
    clicksCount: number
    maxViews?: number | null
    rejectReason?: string | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/consultation-modules/consultation-bookings/consultation-booking.model.ts. */
export interface ConsultationBooking {
    id: number
    paymentProvider: string
    paidAt?: string | null
    withdrawalUntil?: string | null
    earlyServiceConsentAt?: string | null
    originalStartsAt?: string | null
    canceledAt?: string | null
    refundStatus: 'none' | 'pending' | 'succeeded' | 'failed'
    refundReference?: string | null
    refundedAt?: string | null
    meetingStatus: 'none' | 'pending' | 'ready' | 'canceled' | 'failed'
    meetingProvider?: string | null
    meetingId?: string | null
    meetingUrl?: string | null
    revision: number
    subscriptionPlanId?: number | null
    subscriptionDiscountPercent: number
    userId: number
    specialistId: number
    consultationSlotId: number
    specialistConsultationId: number
    price: string
    originalPrice: string
    discount: string
    promocodeId?: number | null
    promocodeCode?: string | null
    userFileAssetId?: number | null
    durationMinutes: number
    startsAt: string
    endsAt: string
    currency: string
    status:
        | 'awaiting_payment'
        | 'paid'
        | 'canceled'
        | 'completed'
        | 'no_show'
        | 'refunded'
    expiresAt?: string | null
    userText: string
    userFileName?: string | null
    user?: Partial<User> | null
    specialist?: Partial<Specialist> | null
    consultationSlot?: Partial<ConsultationSlot> | null
    specialistConsultation?: Partial<SpecialistConsultation> | null
    consultationReview?: Partial<ConsultationReview> | null
    createdAt: string
    updatedAt: string
}

/** JSON fields from src/modules/consultation-modules/consultation-slots/consultation-slot.model.ts. */
export interface ConsultationSlot {
    id: number
    specialistId: number
    specialistConsultationId: number
    startsAt: string
    endsAt: string
    status: 'open' | 'held' | 'booked' | 'canceled'
    specialist?: Partial<Specialist> | null
    specialistConsultation?: Partial<SpecialistConsultation> | null
    createdAt: string
    updatedAt: string
}

/** JSON fields from src/modules/consultation-modules/specialist-consultations/specialist-consultation.model.ts. */
export interface SpecialistConsultation {
    id: number
    specialistId: number
    consultationCategoryId: number
    titleUa: string
    titlePl: string
    titleEn: string
    titleRu: string
    descriptionUa: string
    descriptionPl: string
    descriptionEn: string
    descriptionRu: string
    durationMinutes: number
    price: string
    lans: Array<'UA' | 'PL' | 'EN' | 'RU'>
    status: 'draft' | 'active' | 'inactive' | 'archived'
    specialist?: Partial<Specialist> | null
    consultationCategory?: Partial<ConsultationCategory> | null
    consultationSlots?: Array<Partial<ConsultationSlot>> | null
    consultationBookings?: Array<Partial<ConsultationBooking>> | null
    createdAt: string
    updatedAt: string
}

/** JSON fields from src/modules/consultation-modules/consultation-categories/consultation-category.model.ts. */
export interface ConsultationCategory {
    id: number
    titleUa: string
    titlePl: string
    titleEn: string
    titleRu: string
    assetId: number
    isActive: boolean
    isPopular: boolean
    specialistConsultations?: Array<Partial<SpecialistConsultation>> | null
    createdAt: string
    updatedAt: string
    icon?: Partial<PublicAsset> | null
}

/** JSON fields from src/modules/media-modules/public-assets/public-asset.model.ts. */
export interface PublicAsset {
    id: number
    bucket: 'icons' | 'system_files' | 'legal_documents'
    relPath: string
    originalName: string
    isPopular: boolean
    createdByAccountId?: number | null
    url: string
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/consultation-modules/consultation-reviews/consultation-review.model.ts. */
export interface ConsultationReview {
    id: number
    userId: number
    specialistId: number
    consultationBookingId: number
    rating: number
    comment: string
    status: 'pending_moderation' | 'published' | 'rejected'
    rejectionReason?: string | null
    user?: Partial<User> | null
    specialist?: Partial<Specialist> | null
    consultationBooking?: Partial<ConsultationBooking> | null
    createdAt: string
    updatedAt: string
}

/** JSON fields from src/modules/subscription-modules/subscription-plans/subscription-plan.model.ts. */
export interface SubscriptionPlan {
    id: number
    code: string
    version: number
    name: string
    rank: number
    documentsPerMonth: number
    openCases: number
    consultationDiscountPercent: number
    retentionMonths: number
    available: boolean
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/subscription-modules/user-subscriptions/user-subscription.model.ts. */
export interface UserSubscription {
    id: number
    userId: number
    planId: number
    priceId?: number | null
    status: 'trial' | 'active' | 'expired' | 'revoked'
    periodStart: string
    periodEnd: string
    usageAnchor: string
    trialUsed: boolean
    autoRenew: boolean
    nextPriceId?: number | null
    nextChangeAt?: string | null
    lastEventAt?: string | null
    trialReminderFor?: string | null
    trialStartedAt?: string | null
    firstPaidAt?: string | null
    legalAcceptanceId?: string | null
    nextLegalAcceptanceId?: string | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/subscription-modules/subscription-prices/subscription-price.model.ts. */
export interface SubscriptionPrice {
    id: number
    planId: number
    plan?: SubscriptionPlan
    provider: 'dev' | 'apple' | 'google'
    interval: 'monthly' | 'yearly'
    productId: string
    basePlanId: string
    available: boolean
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/subscription-modules/user-subscriptions/user-subscription.model.ts. */
export interface SubscriptionEvent {
    id: number
    subscriptionId: number
    eventId: string
    action: string
    occurredAt: string
    actorAccountId: number
    fingerprint: string
    snapshot: Record<string, unknown>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/subscription-modules/subscription-usage/subscription-usage.model.ts. */
export interface SubscriptionUsage {
    id: number
    subscriptionId: number
    periodStart: string
    periodEnd: string
    documents: number
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/blog-modules/blog-posts/blog-post.model.ts. */
export interface BlogPost {
    id: number
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    title: string
    contentJson: Record<string, unknown>
    variantId: number
    variant?: Partial<PrivateVariant> | null
    status: 'draft' | 'scheduled' | 'published' | 'archived'
    isPinned: boolean
    isPopular: boolean
    scheduledAt?: string | null
    publishedAt?: string | null
    categories?: Array<Partial<BlogCategory>> | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/blog-modules/blog-categories/blog-category.model.ts. */
export interface BlogCategory {
    id: number
    name_ua: string
    name_pl: string
    name_ru: string
    name_en: string
    sort_key: number
    posts?: Array<Partial<BlogPost>> | null
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/g-doc-modules/g-user-docs/g-user-doc.model.ts. */
export interface GUserDoc {
    id: number
    subscriptionPlanId?: number | null
    userId: number
    gDocTemplateId: number
    assetId: number
    user?: User
    template?: GDocTemplate
    asset?: PrivateAsset
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/g-doc-modules/g-doc-templates/g-doc-template.model.ts. */
export interface GDocTemplate {
    id: number
    gDocTypeId: number
    iconId: number
    titleUA: string
    titlePL: string
    titleEN: string
    titleRU: string
    assetId: number
    asset?: Partial<PrivateAsset> | null
    status: 'active' | 'inactive'
    type?: GDocType
    icon?: PublicAsset
    variables?: Array<GDocVar>
    userDocs?: Array<GUserDoc>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/g-doc-modules/g-doc-types/g-doc-type.model.ts. */
export interface GDocType {
    id: number
    iconId: number
    titleUA: string
    titlePL: string
    titleEN: string
    titleRU: string
    isPopular: boolean
    status: 'active' | 'inactive'
    icon?: PublicAsset
    templates?: Array<GDocTemplate>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/g-doc-modules/g-doc-vars/g-doc-var.model.ts. */
export interface GDocVar {
    id: number
    key: string
    labelUA: string
    labelPL: string
    labelEN: string
    labelRU: string
    templates?: Array<GDocTemplate>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/user-cases-modules/user-cases/user-case.model.ts. */
export interface UserCase {
    id: number
    userId: number
    templateCaseId: number
    activeStageNo: number
    status: 'active' | 'completed' | 'archived'
    user?: User
    template?: Cases
    stages?: Array<UserCaseStage>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/cases/case.model.ts. */
export interface Cases {
    id: number
    typeId: number
    status: 'draft' | 'active' | 'archived'
    title: string
    subtitle: string
    version: number
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    iconId: number
    icon?: PublicAsset
    isPopular: boolean
    caseType?: CaseType
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/case-types/case-types.model.ts. */
export interface CaseType {
    id: number
    title: string
    description: string
    status: 'active' | 'draft' | 'archived'
    iconId: number
    isPopular: boolean
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    icon?: PublicAsset
    cases?: Array<Cases>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/user-cases-modules/user-case-stages/user-case-stage.model.ts. */
export interface UserCaseStage {
    id: number
    userCaseId: number
    templateStageId: number
    status: 'locked' | 'active' | 'done'
    userCase?: UserCase
    template?: CaseStage
    tasks?: Array<UserCaseTask>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/case-stages/case-stage.model.ts. */
export interface CaseStage {
    id: number
    caseId: number
    stageNo: number
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    title: string
    iconId: number
    icon?: PublicAsset
    case?: Cases
    tasks?: Array<CaseStageTask>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/case-stage-tasks/case-stage-task.model.ts. */
export interface CaseStageTask {
    id: number
    stageId: number
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    title: string
    subtitle: string
    type: 'with_date' | 'info' | 'text'
    reminderId?: number | null
    instructionId?: number | null
    sortKey: number
    iconId: number
    stage?: CaseStage
    reminder?: CaseReminder
    icon?: PublicAsset
    instruction?: CasesInstruction
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/case-reminders/case-reminder.model.ts. */
export interface CaseReminder {
    id: number
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    topic: string
    text: string
    sendInApp: boolean
    sendEmail: boolean
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/case-instructions/case-instruction.model.ts. */
export interface CasesInstruction {
    id: number
    title: string
    status: 'draft' | 'active' | 'archived'
    description: string
    lan: 'UA' | 'PL' | 'EN' | 'RU'
    headerIconId?: number | null
    isPopular: boolean
    headerIcon?: Partial<PublicAsset> | null
    headerVariantId?: number | null
    headerVariant?: Partial<PrivateVariant> | null
    blocks?: Array<CaseInstructionBlock>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/cases-modules/case-instruction-blocks/case-instruction-blocks.model.ts. */
export interface CaseInstructionBlock {
    id: number
    instructionId: number
    contentJson?: Record<string, unknown> | null
    type: 'text' | 'photo'
    sortKey: number
    variantId?: number | null
    variant?: Partial<PrivateVariant> | null
    instruction?: CasesInstruction
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/user-cases-modules/user-case-tasks/user-case-task.model.ts. */
export interface UserCaseTask {
    id: number
    userCaseId: number
    userCaseStageId: number
    templateTaskId: number
    status: 'locked' | 'open' | 'done'
    selectedDate?: string | null
    doneAt?: string | null
    userCase?: UserCase
    stage?: UserCaseStage
    template?: CaseStageTask
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/user-notification-modules/user-notifications/user-notification.model.ts. */
export interface UserNotification {
    id: number
    userId: number
    subject: string
    text: string
    status: 'unread' | 'read' | 'archived'
    readAt?: string | null
    user?: User
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/user-reminder-modules/user-reminders/user-reminder.model.ts. */
export interface UserReminder {
    id: number
    userId: number
    userTaskId?: number | null
    topic: string
    text: string
    targetAt: string
    sendInApp: boolean
    sendEmail: boolean
    status: 'active' | 'cancelled'
    createdByAccountId?: number | null
    user?: User
    createdBy?: Partial<Account> | null
    task?: Partial<UserCaseTask> | null
    events?: Array<UserReminderEvent>
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/user-reminder-modules/user-reminder-events/user-reminder-event.model.ts. */
export interface UserReminderEvent {
    id: number
    reminderId: number
    kind: '7_days_before' | '1_day_before' | '2_hours_before'
    triggerAt: string
    status: 'scheduled' | 'processing' | 'done' | 'cancelled' | 'failed'
    error?: string | null
    claimedAt?: string | null
    inAppPending: boolean
    reminder?: UserReminder
    createdAt?: string
    updatedAt?: string
}

/** JSON fields from src/modules/legal-modules/legal-document-acceptances/legal-document-acceptance.model.ts. */
export interface LegalDocumentAcceptance {
    id: string
    accountId: number
    placement:
        | 'registration'
        | 'subscription_checkout'
        | 'consultation_checkout'
        | 'specialist'
        | 'partner'
    resourceKey: string
    versionIds: Array<number>
    acceptedAt?: string | null
    consumedAt?: string | null
    details: Record<string, unknown>
    createdAt: string
    updatedAt: string
}
