import IconButton, { type IconButtonProps } from './IconButton'

export default function SearchButton(props: Omit<IconButtonProps, 'icon'>) {
    return <IconButton icon={require('../../../../assets/system_icons/nav_icons/search-white.png')} {...props} />
}
