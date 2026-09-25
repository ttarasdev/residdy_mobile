import type { Ref } from 'react'
import { Text as NativeText, type TextProps } from 'react-native'

type Props = Omit<TextProps, 'allowFontScaling' | 'maxFontSizeMultiplier'> & { ref?: Ref<NativeText> }
/** App typography uses design sizes, independent of the system font-size setting. */
export default function Text(props: Props) {
    return <NativeText {...props} allowFontScaling={false} maxFontSizeMultiplier={1} />
}
