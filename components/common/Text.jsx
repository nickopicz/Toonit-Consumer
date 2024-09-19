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
import { Animated } from 'react-native';
import { Colors, Font } from '../../Constants';

/**
  children (string): Text to be rendered.
  h1...h4, p1...p4 (bool): Size of the text.
  style (JS Object): All style props.

  Colors: (defaults to white. only apply one.) 
  These should be updated periodically to reflect Colors in Constants.js
	
  Uppercase: use u prop

  Example: <CustomText h3 background u>name: {userName}</CustomText> will display RAGER in 28 pt font colored red

  RN Text props (see RN docs):
	numberOfLines (number)
	ellipsizeMode (string)
	onPress (function)
	textBreakStrategy (string)
*/
const CustomText = (props) => {
	let font = {};
	let color = '#FFF';

	if (props.h1) {
		font = Font.h1;
	} else if (props.h2) {
		font = Font.h2;
	} else if (props.h3) {
		font = Font.h3;
	} else if (props.h4) {
		font = Font.h4;
	} else if (props.p1) {
		font = Font.p1;
	} else if (props.p2) {
		font = Font.p2;
	} else if (props.p3) {
		font = Font.p3;
	} else if (props.p4) {
		font = Font.p4;
	}

	if (props.background) {
		color = Colors.Background;
	} else if (props.trim) {
		color = Colors.Trim;
	} else if (props.black) {
		color = Colors.Black;
	} else if (props.gray) {
		color = Colors.Gray;
	} else if (props.white) {
		color = Colors.White;
	} else if (props.red) {
		color = Colors.Red
	}

	return (
		<Animated.Text
			numberOfLines={props.numberOfLines}
			ellipsizeMode={props.ellipsizeMode}
			onPress={props.onPress}
			textBreakStrategy={props.textBreakStrategy}
			style={{
				color,
				fontSize: font.size,
				fontFamily: font.family,
				...props.style,
			}}
			adjustsFontSizeToFit={props.adjustsFontSizeToFit}
		>
			{props.u && typeof props.children !== 'object'
				? props.children.toString().toUpperCase()
				: props.children}
		</Animated.Text>
	);
};

export default CustomText;
