import IconButton, { type IconButtonProps } from './IconButton'

export default function PlusButton(props: Omit<IconButtonProps, 'icon'>) {
    return <IconButton icon={require('../../../../assets/system_icons/nav_icons/plus-white.png')} {...props} />
}
