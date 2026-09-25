import IconButton, { type IconButtonProps } from './IconButton'

export default function CloseButton(props: Omit<IconButtonProps, 'icon'>) {
    return <IconButton icon={require('../../../../assets/system_icons/nav_icons/close-white.png')} {...props} />
}
