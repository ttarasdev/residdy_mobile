import Card from '../shared/cards/Card'
import { useTranslation } from 'react-i18next'
import Button from '../shared/buttons/Button'

export default function AuthTabs({ mode, onChange }: { mode: 'login' | 'register'; onChange: (mode: 'login' | 'register') => void }) {
    const { t } = useTranslation()
    return <Card padding={5} radius={18} backgroundColor="rgba(8,22,34,0.65)" borderWidth={1} borderColor="rgba(255,255,255,0.10)" style={{ flexDirection: 'row', gap: 4 }} accessibilityRole="tablist">
        {(['login', 'register'] as const).map((tab) => <Button key={tab}
            accessibilityRole="tab" accessibilityState={{ selected: mode === tab }}
            style={{ flex: 1 }} height={56} padding={12} radius={14}
            backgroundColor={mode === tab ? '#FFFFFF' : 'transparent'}
            color={mode === tab ? '#182630' : '#FFFFFF'} textStyle={{ fontSize: 14 }}
            onPress={() => { if (mode !== tab) onChange(tab) }}>
            {t(`navigation.${tab}`)}
        </Button>)}
    </Card>
}
