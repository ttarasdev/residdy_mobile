import IconButton, { type IconButtonProps } from './IconButton'

export default function NextButton(props: Omit<IconButtonProps, 'icon'>) {
    return <IconButton icon={require('../../../../assets/system_icons/nav_icons/chevron-right-white.png')} {...props} />
}
