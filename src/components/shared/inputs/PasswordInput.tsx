import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input, { type InputProps } from './Input'
import IconButton from '../buttons/IconButton'

export default function PasswordInput(props: Omit<InputProps, 'secureTextEntry' | 'right'>) {
    const [visible, setVisible] = useState(false)
    const { t } = useTranslation()
    return <Input icon={require('../../../../assets/system_icons/auth/key-white.png')} {...props} secureTextEntry={!visible}
        right={<IconButton size={44} iconSize={22} backgroundColor="transparent" disabled={props.editable === false}
            accessibilityLabel={t(visible ? 'auth.hidePassword' : 'auth.showPassword')}
            icon={visible ? require('../../../../assets/system_icons/auth/eye-off-white.png') : require('../../../../assets/system_icons/auth/eye-white.png')}
            onPress={() => setVisible(!visible)} />}
    />
}
