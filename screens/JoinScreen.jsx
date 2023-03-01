import React from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { supabase } from "../lib/supabase";
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";

const JoinScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainerStyle}>
				<Text style={styles.titleStyle}>회원가입</Text>
			</View>
			<Formik
				validationSchema={signUpValidationSchema}
				initialValues={{
					name: "",
					id: "",
					password: "",
					confirmPassword: "",
					businessRegNumber: "",
					address: "",
				}}
				onSubmit={async (values) => {
					await supabase
						.from("shop_owner_table")
						.insert([
							{
								member_name: values.name,
								member_id: values.id,
								member_password: values.password,
								location_address: values.address,
								business_number: values.businessRegNumber,
							},
						])
						.then((res) => {
							if (res.error) {
								// 	insert 에러 처리
							} else {
								// 	insert 성공
							}
						})
						.then(() => {
							navigation.navigate("LoginScreen");
						});
				}}
			>
				{({ handleSubmit, isValid, values }) => (
					<>
						<Field
							component={CustomInput}
							name="name"
							placeholder="이름"
						/>
						<Field
							component={CustomInput}
							name="id"
							placeholder="아이디"
						/>
						<Field
							component={CustomInput}
							name="password"
							placeholder="비밀번호"
							secureTextEntry
						/>
						<Field
							component={CustomInput}
							name="confirmPassword"
							placeholder="비밀번호 확인"
							secureTextEntry
						/>
						<Field
							component={CustomInput}
							name="businessRegNumber"
							placeholder="사업자등록번호"
							keyboardType="numeric"
						/>
						<Field
							component={CustomInput}
							name="address"
							placeholder="주소"
						/>
						<View style={styles.submitContainerStyle}>
							<Pressable
								onPress={() => handleSubmit()}
								disabled={!isValid || values.id === ""}
								style={styles.joinButtonStyle}
							>
								<Text>완료</Text>
							</Pressable>
						</View>
					</>
				)}
			</Formik>
		</SafeAreaView>
	);
};

const signUpValidationSchema = yup.object().shape({
	id: yup
		.string()
		.test("id", "id가 이미 존재합니다.", async (value) => {
			const { data, error } = await supabase
				.from("shop_owner_table")
				.select("*")
				.eq("member_id", value);
			if (error) return false;
			else return data.length <= 0;
		})
		.required("아이디는 필수입니다."),
	password: yup
		.string()
		.matches(/\w*[a-z]\w*/, "비밀번호에는 소문자가 포함되어야 합니다.")
		.matches(/\w*[A-Z]\w*/, "비밀번호에는 대문자가 포함되어야 합니다.")
		.matches(/\d/, "비밀번호에는 숫자가 포함되어야 합니다.")
		.matches(
			/[!@#$%^&*()\-_"=+{}; :,<.>]/,
			"비밀번호에는 특수문자가 포함되어야 합니다."
		)
		.min(8, ({ min }) => `비밀번호는 최소 ${min}자 이상이어야 합니다.`)
		.required("비밀번호는 필수입니다."),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
		.required("비밀번호 확인은 필수입니다."),
	businessRegNumber: yup
		.string()
		.matches(
			/^\d{3}-\d{2}-\d{5}$/,
			"사업자등록번호는 000-00-00000 형식으로 입력해주세요."
		)
		.test(
			"businessRegNumber",
			"사업자등록번호가 이미 존재합니다.",
			async (value) => {
				const { data, error } = await supabase
					.from("shop_owner_table")
					.select("*")
					.eq("business_number", value);
				if (error) return false;
				else return data.length <= 0;
			}
		)
		.required("사업자등록번호는 필수입니다."),
	name: yup.string().required("이름은 필수입니다."),
	address: yup.string().required("주소는 필수입니다."),
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
	},
	titleContainerStyle: {
		flex: 0.2,
		width: "80%",
		justifyContent: "center",
	},
	submitContainerStyle: {
		flex: 0.4,
		width: "40%",
		alignItems: "center",
		justifyContent: "center",
	},
	titleStyle: {
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
	joinButtonStyle: {
		width: 120,
		height: 36,
		borderRadius: 10,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default JoinScreen;
