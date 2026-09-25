import type { Ref } from 'react'
import { TextInput as NativeTextInput, type TextInputProps } from 'react-native'

type Props = Omit<TextInputProps, 'allowFontScaling' | 'maxFontSizeMultiplier'> & { ref?: Ref<NativeTextInput> }
type TextInput = NativeTextInput
function TextInput(props: Props) {
    return <NativeTextInput {...props} allowFontScaling={false} maxFontSizeMultiplier={1} />
}
export default TextInput
