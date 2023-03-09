import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getData } from "../lib/asyncstorage";


function PlatformAddScreen({ route, navigation }) {
	const [ownerId, setOwnerId] = useState("");
	const [baeminId, setBaeminId] = useState("");
	const [baeminPwd, setBaeminPwd] = useState("");
	const [coupangEatsId, setCoupangEatsId] = useState("");
	const [coupangEatsPwd, setCoupangEatsPwd] = useState("");
	const [ddangeoyoId, setDdangeoyoId] = useState("");
	const [ddangeoyoPwd, setDdangeoyoPwd] = useState("");
	const [yogiyoId, setYogiyoId] = useState("");
	const [yogiyoPwd, setYogiyoPwd] = useState("");
	const [etc, setEtc] = useState("");

	useEffect(() => {
		if (route.params != null) {
			setOwnerId(route.params.member_id);
		}
		else {
			getData("owner_id").then((res) => {
				setOwnerId(res);
			});
		}
	}, []);
	const handleAddPlatformAccount = async () => {
		await supabase
			.from("shop_owner_platform_account")
			.insert([
				{
					member_id: ownerId,
					baemin_id: baeminId,
					baemin_pw: baeminPwd,
					coupangeats_id: coupangEatsId,
					coupangeats_pw: coupangEatsPwd,
					ddangeoyo_id: ddangeoyoId,
					ddangeoyo_pw: ddangeoyoPwd,
					yogiyo_id: yogiyoId,
					yogiyo_pw: yogiyoPwd,
					etc: etc,
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

	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainerStyle}>
				<Text style={styles.titleStyle}>배달 플랫폼 계정 입력</Text>
			</View>
			<ScrollView>
				<View style={styles.container}>

					<View>
						<Text style={styles.platformAccountTitle}>
							배달의민족 계정 입력
						</Text>
						<View style={styles.seperateDash}>
							<View style={styles.baeminTagColor}></View>
							<View style={{ left: 50, bottom: 42.6 }}>
								<View style={styles.platformAccount}>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="아이디"
										value={baeminId}
										onChangeText={(text) => setBaeminId(text)}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={baeminPwd}
										onChangeText={(text) => setBaeminPwd(text)}
										secureTextEntry={true}
									/>
								</View>
							</View>
						</View>
					</View>

					<View>
						<Text style={styles.platformAccountTitle}>
							쿠팡이츠 계정 입력
						</Text>
						<View style={styles.seperateDash}>
							<View style={styles.coupangEatsTagColor}></View>
							<View style={{ left: 50, bottom: 42.6 }}>
								<View style={styles.platformAccount}>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="아이디"
										value={coupangEatsId}
										onChangeText={(text) => setCoupangEatsId(text)}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={coupangEatsPwd}
										onChangeText={(text) => setCoupangEatsPwd(text)}
										secureTextEntry={true}
									/>
								</View>
							</View>
						</View>
					</View>

					<View>
						<Text style={styles.platformAccountTitle}>
							땡겨요 계정 입력
						</Text>

						<View style={styles.seperateDash}>
							<View style={styles.ddangeoyoTagColor}></View>
							<View style={{ left: 50, bottom: 42.6 }}>
								<View style={styles.platformAccount}>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="아이디"
										value={ddangeoyoId}
										onChangeText={(text) => setDdangeoyoId(text)}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={ddangeoyoPwd}
										onChangeText={(text) => setDdangeoyoPwd(text)}
										secureTextEntry={true}
									/>
								</View>
							</View>
						</View>
					</View>

					<View>
						<Text style={styles.platformAccountTitle}>
							요기요 계정 입력
						</Text>
						<View style={styles.seperateDash}>
							<View style={styles.yogiyoTagColor}></View>
							<View style={{ left: 50, bottom: 42.6 }}>
								<View style={styles.platformAccount}>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="아이디"
										value={yogiyoId}
										onChangeText={(text) => setYogiyoId(text)}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={yogiyoPwd}
										onChangeText={(text) => setYogiyoPwd(text)}
										secureTextEntry={true}
									/>
								</View>
							</View>
						</View>
					</View>

					<View>
						<Text style={styles.platformAccountTitle}>
							그 외 계정 입력[자유롭게 적어주시면 피드백으로 적용]
						</Text>
						<View style={styles.seperateDash}>
							<View style={styles.etcTagColor}></View>
							<View style={{ left: 50, bottom: 42.6 }}>
								<View style={styles.platformAccount}>
									<TextInput
										style={styles.platformAccountEtcBox}
										placeholder="ex: 동백통(아이디, 비밀번호)"
										value={etc}
										onChangeText={(text) => setEtc(text)}
									/>
								</View>
							</View>
						</View>
					</View>

					<View>
						<Pressable
							style={styles.buttonStyle}
							onPress={handleAddPlatformAccount}
						>
							<Text style={styles.buttonText}>완료</Text>
						</Pressable>
					</View>

				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
	},
	titleContainerStyle: {
		width: 350,
		paddingTop: 70,
		paddingBottom: 30,
	},
	titleStyle: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
	},
	platformAccountTitle: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 6,
		marginBottom: 3,
	},
	seperateDash: {
		backgroundColor: "#D8D8D8",
		width: 350,
		height: 50,
		borderRadius: 7,
		marginBottom: 12,
	},
	baeminTagColor: {
		width: 40,
		height: 50,
		backgroundColor: "#39C5C4",
		borderRadius: 10,
	},
	yogiyoTagColor: {
		width: 40,
		height: 50,
		backgroundColor: "#FA0050",
		borderRadius: 10,
	},
	coupangEatsTagColor: {
		width: 40,
		height: 50,
		backgroundColor: "#31B4DD",
		borderRadius: 10,
	},
	ddangeoyoTagColor: {
		width: 40,
		height: 50,
		backgroundColor: "#FB521C",
		borderRadius: 10,
	},
	etcTagColor: {
		width: 40,
		height: 50,
		backgroundColor: "#7f7db1",
		borderRadius: 10,
	},
	platformAccount: {
		flexDirection: "row",
	},
	platformAccountBox: {
		width: 130,
		height: 35,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		paddingLeft: 10,
		marginRight: 15,
		marginLeft: 4,
	},
	platformAccountEtcBox: {
		width: 280,
		height: 35,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		paddingLeft: 10,
		marginRight: 15,
		marginLeft: 4,
	},
	buttonStyle: {
		width: 120,
		height: 36,
		borderRadius: 10,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
	},
});

export default PlatformAddScreen;
