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
import { TouchableOpacity } from 'react-native';
import { Colors, Dim, Font } from '../../Constants';
import Text from './Text';

/**
 * @props disabled bool value for disabling button
 * @props onPress onpress function
 * @props onPressIn press-in (hold) callback function
 * @props onPressout out-press (release) callback function
 * @props style [ . . . style]
 * @props textStyle styling for text
 *
 * @returns common rounded button component
 *
 */

export const RoundedButton = React.forwardRef((props, ref) => {
	let width = undefined;
	if (props.small) {
		width = Dim.width * 0.4;
	} else if (props.medium) {
		width = Dim.width * 0.6;
	} else if (props.large) {
		width = Dim.width * 0.8;
	}
	return (
		<TouchableOpacity
			disabled={props.disabled}
			onPress={props.onPress}
			onPressIn={props.onPressIn}
			onPressOut={props.onPressOut}
			ref={ref}
			style={{
				width: width,
				backgroundColor:
					props.enablight && props.enablight.state ? Colors.Background : Colors.Trim,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 10,
				paddingVertical: 7.5,
				borderRadius: 15,
				borderWidth: 1.25,
				borderColor: Colors.Black,
				...props.style,
			}}
		>
			<Text
				p2
				black
				u
				background={props.enablight && props.enablight.state}
				style={props.textStyle}
			>
				{props.enablight && props.enablight.state
					? props.enablight.text
					: props.children
						? props.children
						: ''}
			</Text>
		</TouchableOpacity>
	);
});
