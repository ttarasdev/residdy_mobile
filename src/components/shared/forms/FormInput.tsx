import Input, { type InputProps } from '../inputs/Input'

/** Compact dark field from Figma's document popup; keeps Input's focus/error behavior. */
export default function FormInput({ fieldStyle, ...props }: InputProps) {
    return (
        <Input
            {...props}
            fieldStyle={[
                {
                    minHeight: 48,
                    borderRadius: 16,
                    backgroundColor: 'rgba(12,24,34,0.36)',
                    paddingHorizontal: 14,
                },
                fieldStyle,
            ]}
        />
    )
}
