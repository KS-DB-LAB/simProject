import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

const CustomInput = (props) => {
	const {
		field: { name, onBlur, value },
		form: { errors, touched, setFieldValue, setFieldTouched },
		...inputProps
	} = props;

	const hasError = errors[name] && touched[name];

	return (
		<>
			<TextInput
				style={[
					styles.textInput,
					props.multiline && { height: props.numberOfLines * 40 },
					hasError && styles.errorInput,
				]}
				value={value}
				onChangeText={(text) => {
					setFieldValue(name, text);
				}}
				onBlur={() => {
					setFieldTouched(name);
					onBlur(name);
				}}
				{...inputProps}
			/>
			{hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
		</>
	);
};

const styles = StyleSheet.create({
	textInput: {
		width: "60%",
		height: 36,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
		padding: 10,
		marginTop: 15,
		color: "gray",
	},
	errorText: {
		fontSize: 10,
		color: "red",
	},
	errorInput: {
		borderColor: "red",
	},
});
export default CustomInput;
