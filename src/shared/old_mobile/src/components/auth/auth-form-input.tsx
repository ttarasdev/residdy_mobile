// import { RefObject, useState } from 'react'
// import {
// 	Text,
// 	TextInput,
// 	View,
// 	StyleSheet,
// 	Image,
// 	ImageSourcePropType,
// 	TextInputProps,
// } from 'react-native'
// 
// type Props = {
// 	labelTitle: string
// 	value: string | null
// 	onChange: (v: string) => void
// 	placeholder?: string
// 	iconPath: ImageSourcePropType
// 	activeIconPath?: ImageSourcePropType
// 	secureTextEntry?: boolean
// 	keyboardType?: TextInputProps['keyboardType']
// 	textContentType?: TextInputProps['textContentType']
// 	returnKeyType?: TextInputProps['returnKeyType']
// 	onSubmitEditing?: TextInputProps['onSubmitEditing']
// 	inputRef?: RefObject<TextInput | null>
// }
// 
// export default function AuthFormInput({
// 	labelTitle,
// 	value,
// 	onChange,
// 	placeholder,
// 	iconPath,
// 	activeIconPath,
// 	secureTextEntry,
// 	keyboardType,
// 	textContentType,
// 	returnKeyType,
// 	onSubmitEditing,
// 	inputRef,
// }: Props) {
// 	const [focused, setFocused] = useState(false)
// 
// 	const currentIcon = focused && activeIconPath ? activeIconPath : iconPath
// 
// 	return (
// 		<View style={[s.container, focused && s.containerFocused]}>
// 			<View style={s.icon__container}>
// 				<Image source={currentIcon} style={s.icon} />
// 			</View>
// 			<View style={[s.branch, focused && s.branchFocused]}></View>
// 			<View style={s.body}>
// 				<Text style={s.label}>{labelTitle}</Text>
// 				<TextInput
// 					value={value ?? ''}
// 					onChangeText={onChange}
// 					placeholder={placeholder ?? ''}
// 					placeholderTextColor="#B8B8B8"
// 					autoCapitalize="none"
// 					style={s.input}
// 					onFocus={() => setFocused(true)}
// 					onBlur={() => setFocused(false)}
// 					secureTextEntry={secureTextEntry}
// 					keyboardType={keyboardType}
// 					textContentType={textContentType}
// 					returnKeyType={returnKeyType}
// 					onSubmitEditing={onSubmitEditing}
// 					ref={inputRef}
// 				/>
// 			</View>
// 		</View>
// 	)
// }
// 
// const s = StyleSheet.create({
// 	container: {
// 		width: '100%',
// 		height: 80,
// 		borderRadius: 15,
// 		borderColor: '#000',
// 		borderWidth: 1,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		padding: 10,
// 	},
// 	containerFocused: {
// 		borderColor: '#260DB2',
// 	},
// 	branchFocused: {
// 		backgroundColor: '#260DB2',
// 	},
// 	icon__container: {
// 		width: 60,
// 		height: 60,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	icon: {
// 		width: 40,
// 		height: 40,
// 	},
// 	branch: {
// 		width: 1,
// 		height: 50,
// 		backgroundColor: '#000',
// 		marginRight: 20,
// 		marginLeft: 10,
// 	},
// 	body: {
// 		flex: 1,
// 		justifyContent: 'center',
// 	},
// 	label: {
// 		marginTop: 20,
// 	},
// 	input: {
// 		width: '100%',
// 		fontSize: 16,
// 		height: 42,
// 		lineHeight: 20,
// 		color: '#000',
// 		paddingLeft: 0,
// 	},
// })
