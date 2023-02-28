// @ts-ignore
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Modal,
	Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const JoinScreen = () => {
	const navigation = useNavigation();

	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [businessRegNumber, setBusinessRegNumber] = useState("");
	const [address, setAddress] = useState("");

	const handleJoin = () => {
		if (password !== passwordConfirm) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		} else {
			alert("회원가입이 완료되었습니다.");
			// navigation.navigate("Login");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainerStyle}>
				<Text style={styles.titleStyle}>회원가입</Text>
			</View>
			<View style={styles.container}>
				<TextInput
					style={styles.accountInputBox}
					onChangeText={(_) => setId(_)}
					placeholder="  아이디"
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.accountInputBox}
					onChangeText={(_) => setPassword(_)}
					placeholder="  비밀번호"
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.accountInputBox}
					onChangeText={(_) => setPasswordConfirm(_)}
					placeholder="  비밀번호 확인"
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.accountInputBox}
					onChangeText={(_) => setBusinessRegNumber(_)}
					placeholder="  사업자등록증 번호"
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.accountInputBox}
					onChangeText={(_) => setAddress(_)}
					placeholder="  주소"
				/>
			</View>
			<View style={styles.container}>
				<Pressable onPress={handleJoin}>
					<View style={styles.joinButtonStyle}>
						<Text>완료</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
	},
	titleContainerStyle: {
		flex: 0.5,
		backgroundColor: "#ffffff",
		justifyContent: "center",
		width: "70%",
		marginTop: 60,
	},
	titleStyle: {
		textAlign: "left",
		fontStyle: "normal",
		fontWeight: "700",
	},
	errorModalMessageContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	errorModalMessageBox: {
		width: 300,
		height: 200,
		backgroundColor: "#d9d9d9",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	accountInputBox: {
		width: 192,
		height: 36,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
		color: "gray",
	},
	commentForLogin: {
		marginBottom: 20,
	},
	joinButtonStyle: {
		width: 192,
		height: 36,
		borderRadius: 10,
		borderWidth: 1,

		alignItems: "center",
		justifyContent: "center",
	},
});

export default JoinScreen;
