import type { UserCaseStage } from '../../api/models'

export function visibleStages(stages: UserCaseStage[], selectedId?: number) {
    const index = Math.max(
        0,
        stages.findIndex((stage) => stage.id === selectedId),
    )
    const start = Math.max(0, Math.min(index - 1, stages.length - 3))
    return stages.slice(start, start + 3)
}
