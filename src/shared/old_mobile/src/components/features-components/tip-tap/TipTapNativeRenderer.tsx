// import React, { useMemo } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// 
// interface Props {
// 	contentJson: Record<string, any> | string | null | undefined
// }
// 
// const TipTapNativeRenderer: React.FC<Props> = ({ contentJson }) => {
// 	const parsedContent = useMemo(() => {
// 		if (!contentJson) return null
// 
// 		if (typeof contentJson !== 'string') return contentJson
// 
// 		try {
// 			return JSON.parse(contentJson)
// 		} catch {
// 			return null
// 		}
// 	}, [contentJson])
// 
// 	if (!parsedContent) return null
// 
// 	return <View style={styles.container}>{renderNode(parsedContent)}</View>
// }
// 
// const renderNode = (node: any, index = 0): React.ReactNode => {
// 	if (!node) return null
// 
// 	if (node.type === 'doc') {
// 		return node.content?.map((child: any, i: number) =>
// 			renderNode(child, i),
// 		)
// 	}
// 
// 	if (node.type === 'paragraph') {
// 		return (
// 			<Text key={index} style={styles.paragraph}>
// 				{node.content?.map((child: any, i: number) =>
// 					renderNode(child, i),
// 				)}
// 			</Text>
// 		)
// 	}
// 
// 	if (node.type === 'heading') {
// 		const level = node.attrs?.level ?? 2
// 
// 		return (
// 			<Text key={index} style={[styles.heading, getHeadingStyle(level)]}>
// 				{node.content?.map((child: any, i: number) =>
// 					renderNode(child, i),
// 				)}
// 			</Text>
// 		)
// 	}
// 
// 	if (node.type === 'bulletList') {
// 		return (
// 			<View key={index} style={styles.list}>
// 				{node.content?.map((child: any, i: number) =>
// 					renderListItem(child, i, '•'),
// 				)}
// 			</View>
// 		)
// 	}
// 
// 	if (node.type === 'orderedList') {
// 		return (
// 			<View key={index} style={styles.list}>
// 				{node.content?.map((child: any, i: number) =>
// 					renderListItem(child, i, `${i + 1}.`),
// 				)}
// 			</View>
// 		)
// 	}
// 
// 	if (node.type === 'listItem') {
// 		return (
// 			<View key={index}>
// 				{node.content?.map((child: any, i: number) =>
// 					renderNode(child, i),
// 				)}
// 			</View>
// 		)
// 	}
// 
// 	if (node.type === 'hardBreak') {
// 		return '\n'
// 	}
// 
// 	if (node.type === 'text') {
// 		return (
// 			<Text key={index} style={getMarksStyle(node.marks)}>
// 				{node.text}
// 			</Text>
// 		)
// 	}
// 
// 	return null
// }
// 
// const renderListItem = (node: any, index: number, marker: string) => {
// 	return (
// 		<View key={index} style={styles.listItem}>
// 			<Text style={styles.listMarker}>{marker}</Text>
// 			<View style={styles.listContent}>
// 				{node.content?.map((child: any, i: number) =>
// 					renderNode(child, i),
// 				)}
// 			</View>
// 		</View>
// 	)
// }
// 
// const getMarksStyle = (marks?: any[]) => {
// 	if (!marks?.length) return null
// 
// 	return marks
// 		.map((mark) => {
// 			if (mark.type === 'bold') return styles.bold
// 			if (mark.type === 'italic') return styles.italic
// 			if (mark.type === 'strike') return styles.strike
// 			if (mark.type === 'underline') return styles.underline
// 
// 			return null
// 		})
// 		.filter(Boolean)
// }
// 
// const getHeadingStyle = (level: number) => {
// 	if (level === 2) return styles.h2
// 	if (level === 3) return styles.h3
// 
// 	return styles.h2
// }
// 
// const styles = StyleSheet.create({
// 	container: {
// 		gap: 8,
// 	},
// 	paragraph: {
// 		fontSize: 16,
// 		lineHeight: 24,
// 		color: '#111827',
// 	},
// 	heading: {
// 		fontWeight: '700',
// 		color: '#111827',
// 		marginTop: 8,
// 		marginBottom: 4,
// 	},
// 	h2: {
// 		fontSize: 24,
// 		lineHeight: 30,
// 	},
// 	h3: {
// 		fontSize: 20,
// 		lineHeight: 26,
// 	},
// 	bold: {
// 		fontWeight: '700',
// 	},
// 	italic: {
// 		fontStyle: 'italic',
// 	},
// 	strike: {
// 		textDecorationLine: 'line-through',
// 	},
// 	underline: {
// 		textDecorationLine: 'underline',
// 	},
// 	list: {
// 		gap: 4,
// 	},
// 	listItem: {
// 		flexDirection: 'row',
// 		alignItems: 'flex-start',
// 	},
// 	listMarker: {
// 		width: 24,
// 		fontSize: 16,
// 		lineHeight: 24,
// 		color: '#111827',
// 	},
// 	listContent: {
// 		flex: 1,
// 	},
// })
// 
// export default TipTapNativeRenderer
