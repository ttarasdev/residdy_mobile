import { View } from 'react-native'
import Text from '../typography/Text'
import { contentStyles as s } from './content.styles'
type Node = {
    type?: string
    text?: string
    content?: Node[]
    marks?: { type: string }[]
}
function render(
    node: Node,
    key: number,
    depth = 0,
    light = false,
): React.ReactNode {
    if (depth > 15) return null
    if (node.type === 'text')
        return (
            <Text
                key={key}
                style={
                    node.marks?.some((mark) => mark.type === 'bold')
                        ? [s.title, light && { color: '#111D25' }]
                        : undefined
                }
            >
                {node.text}
            </Text>
        )
    if (node.type === 'hardBreak') return '\n'
    const children = node.content?.map((child, i) =>
        render(child, i, depth + 1, light),
    )
    if (node.type === 'paragraph' || node.type === 'heading')
        return (
            <Text
                key={key}
                style={[
                    node.type === 'heading' ? s.heading : s.body,
                    light && {
                        color: node.type === 'heading' ? '#111D25' : '#607386',
                        fontSize: node.type === 'heading' ? 20 : 14,
                        lineHeight: node.type === 'heading' ? 28 : 23,
                    },
                ]}
            >
                {children}
            </Text>
        )
    if (node.type === 'blockquote')
        return (
            <View key={key} style={{ borderLeftWidth: 3, borderLeftColor: light ? '#8298AB' : '#AFC9DB', padding: 16, gap: 12, backgroundColor: light ? 'rgba(64,85,104,0.05)' : 'rgba(255,255,255,0.06)', borderRadius: 12 }}>
                {children}
            </View>
        )
    if (node.type === 'listItem')
        return (
            <View key={key} style={[s.row, { alignItems: 'flex-start' }]}>
                <Text style={[s.body, light && { color: '#607386' }]}>•</Text>
                <View style={{ flex: 1 }}>{children}</View>
            </View>
        )
    return (
        <View key={key} style={{ gap: 12 }}>
            {children}
        </View>
    )
}
export default function RichText({
    content,
    light = false,
}: {
    light?: boolean
    content: Record<string, unknown>
}) {
    return render(content as Node, 0, 0, light)
}
