/**
 *
 *   |\\  ||    ||\\\\
 *   ||\\ ||    ||
 *   || \\||    ||
 *   ||  \||    ||////
 *
 *   ------This file was created, authored, currently owned and all rights belong to the author NC------
 *
 *                                  Author: Nicholas Ciraulo
 */

import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { Colors, Dim, Font } from '../../Constants';

/**
 * @props width = [small, medium, large] width of text input
 * @props iconName = name of icon in feather of expo/vector-icons
 * @props placeholderColor = color of the placeholder text
 * @props . . . children
 *
 */
export const CustomInput = React.forwardRef((props, ref) => {
	let width = undefined;
	if (props.small) {
		width = Dim.width * 0.4;
	} else if (props.medium) {
		width = Dim.width * 0.6;
	} else if (props.large) {
		width = Dim.width * 0.8;
	}
	const styles = StyleSheet.create({
		container: {
			width: width,
			flexDirection: 'row',
			backgroundColor: Colors.White,
			borderRadius: 23,
			margin: 12,
			alignItems: 'center',
			paddingLeft: 15,
			paddingRight: 32,
			paddingVertical: 10,

			borderColor: Colors.Trim,
			borderWidth: 0,
		},
		input: {
			// backgroundColor: "#00FF0030",
			fontSize: Font.p2.size,
			flex: 1,
			// paddingVertical: 10,
			// fontFamily: "LilitaOne_400Regular",
		},
	});

	return (
		<View style={[styles.container, props.containerStyle]}>
			{props.iconName ? (
				<Icon
					name={props.iconName}
					size={Font.p1.size}
					color={props.iconColor ? props.iconColor : Colors.Trim}
					style={{
						marginRight: 10,
						//   backgroundColor: "#FF000030",
					}}
				/>
			) : null}

			<TextInput
				placeholderTextColor={
					props.placeholderColor ? props.placeholderColor : Colors.Gray
				}
				style={{
					...styles.input,
					...props.style,
					color: props.textColor ? props.textColor : Colors.White,
				}}
				ref={ref}
				{...props}
			>
				{props.children}
			</TextInput>
		</View>
	);
});
