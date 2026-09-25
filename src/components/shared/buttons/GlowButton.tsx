import Button, { type ButtonProps } from './Button'

export default function GlowButton({ style, ...props }: ButtonProps) {
    return (
        <Button
            backgroundColor="rgba(255,255,255,0.12)"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.35)"
            gradient={{
                colors: ['rgba(255,255,255,0.22)', 'rgba(164,187,212,0.07)'],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 1 },
            }}
            style={(state) => [
                { boxShadow: '0 0 16px rgba(164,187,212,0.3)' },
                typeof style === 'function' ? style(state) : style,
            ]}
            {...props}
        />
    )
}
