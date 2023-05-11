import React,{useEffect} from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	SafeAreaView,
	ScrollView,
	BackHandler,
} from "react-native";

import { encode } from "../../lib/cryptofunction"
import { supabase } from "../../lib/supabase";
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomInput from "../../components/CustomInput";

const JoinScreen = ({ navigation }) => {

	useEffect(() => {
		const handleBackButton = () => {
			navigation.navigate('LoginScreen')
			return true; // Return true to prevent default behavior (exit app)
		};

		BackHandler.addEventListener('hardwareBackPress', handleBackButton);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainerStyle}>
				<Text style={styles.titleStyle}>회원가입</Text>
			</View>
			<View style={styles.container}>
				<Formik
					validationSchema={signUpValidationSchema}
					initialValues={{
						name: "",
						id: "",
						password: "",
						confirmPassword: "",
						businessRegNumber: "",
						address: "",
						addressDetail: "",
						adminId:"",
					}}
					onSubmit={async (values) => {
						await supabase
							.from("shop_owner_table")
							.insert([
								{
									member_name: values.name,
									member_id: values.id,
									member_password: encode(values.password),
									location_address:
										values.address + " " + values.addressDetail,
									business_number: values.businessRegNumber,
									allocated_admin : values.adminId,
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
								navigation.navigate("PlatformAddScreen", {member_id: values.id});
							});
					}}
				>
					{({ handleSubmit, isValid, values }) => (
						<ScrollView style={styles.scrollStyle}>
							<View style={styles.container}>
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
								<Field
									component={CustomInput}
									name="addressDetail"
									placeholder="상세 주소"
								/>
								<Field
									component={CustomInput}
									name="adminId"
									placeholder="관리자 아이디"
								/>
								<View style={styles.submitContainerStyle}>
									<Pressable
										onPress={() => {
											handleSubmit()
										}}
										disabled={!isValid || values.id === ""}
										style={styles.joinButtonStyle}
									>
										<Text>계정 생성</Text>
									</Pressable>
								</View>
							</View>
						</ScrollView>
					)}
				</Formik>
			</View>
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
		.required("아이디를 입력해주세요."),
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
		.required("비밀번호를 입력해주세요."),
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
		.required("사업자등록번호을 입력해주세요."),
	name: yup.string().required("이름을 입력해주세요."),
	address: yup.string().required("주소을 입력해주세요."),
	addressDetail: yup.string().required("상세주소를 입력해주세요."),

	adminId : yup
		.string()
		.matches(/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
			"관리자 ID를 이메일 형식으로 입력해주세요")
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
		width: "100%",
	},
	scrollStyle: {
		flex: 1,
		width: "100%",
	},
	titleContainerStyle: {
		flex: 0.2,
		width: "80%",
		justifyContent: "center",
	},
	submitContainerStyle: {
		flex: 0.4,
		width: "100%",
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
		marginTop: 20,
	},
});

export default JoinScreen;
