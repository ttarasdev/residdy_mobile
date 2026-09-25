import Button, { type ButtonProps } from './Button'

export default function OutlineButton(props: ButtonProps) {
    return <Button borderWidth={1} borderColor="#8298AB" {...props} />
}
