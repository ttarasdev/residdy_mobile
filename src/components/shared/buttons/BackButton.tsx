import IconButton, { type IconButtonProps } from './IconButton'

export default function BackButton(props: Omit<IconButtonProps, 'icon'>) {
    return <IconButton icon={require('../../../../assets/system_icons/nav_icons/arrow-left-white.png')} {...props} />
}
