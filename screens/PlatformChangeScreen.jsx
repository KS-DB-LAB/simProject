import { Pressable, StyleSheet, Text, View, TextInput, ScrollView, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getData } from "../lib/asyncstorage";
function PlatformChangeScreen({ route, navigation }) {
	const [modalVisible, setModalVisible] = useState(false)
	const [ownerId, setOwnerId] = useState(null);
	const [account, setAccount] = useState({
		baemin_id: "",
		baemin_pw: "",
		coupangeats_id: "",
		coupangeats_pw: "",
		ddangeoyo_id: "",
		ddangeoyo_pw: "",
		yogiyo_id: "",
		yogiyo_pw: "",
		etc: "",
	});


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

	const extractTargetAcount = (obj) => {
		let targetAccount = {};
		for (let key in obj) {
			if (obj[key] != "" && obj[key] != null) {
				targetAccount[key] = obj[key];
			}
		}
		return targetAccount;
	}

	const handleChangePlatformAccount = async () => {
		setModalVisible(false)
		navigation.navigate('SettingMenuScreen')

		await supabase
			.from("shop_owner_platform_account")
			.update(extractTargetAcount(account))
			.eq("member_id", ownerId)
			.then((res) => {
				if (res.error) {
					// 	insert 에러 처리
					console.log("오류가 발생하였습니다. 관리자에게 문의해주세요. ERR:"+res.error)
				} else {
					// 	insert 성공
					console.log("성공적으로 변경되었습니다.")
			}})
			.then(() => {
				navigation.navigate("SettingMenuScreen")
			});

	};

	return (
		<View style={styles.container}>
			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}>
				<View style={styles.errorModalMessageContainer}>
					<View style={styles.errorModalMessageBox}>
						<Text style={{marginBottom:30, fontSize:15,}}>배달 플랫폼 정보를 변경하시겠습니까?</Text>
						<Pressable onPress={() => handleChangePlatformAccount()}>
							<Text style={{fontSize:15,}}>확인</Text>
						</Pressable>
					</View>
				</View>

			</Modal>

			<View style={styles.titleContainerStyle}>
				<Text style={styles.titleStyle}>배달 플랫폼 계정 정보 변경[없으면 빈칸]</Text>
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
										value={account.baemin_id}
										onChangeText={(text) => setAccount({...account, baemin_id: text})}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={account.baemin_pw}
										onChangeText={(text) => setAccount({...account, baemin_pw: text})}
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
										value={account.coupangeats_id}
										onChangeText={(text) => setAccount({...account, coupangeats_id: text})}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={account.coupangeats_pw}
										onChangeText={(text) => setAccount({...account, coupangeats_pw: text})}
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
										value={account.ddangeoyo_id}
										onChangeText={(text) => setAccount({...account, ddangeoyo_id: text})}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={account.ddangeoyo_pw}
										onChangeText={(text) => setAccount({...account, ddangeoyo_pw: text})}
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
										value={account.yogiyo_id}
										onChangeText={(text) => setAccount({...account, yogiyo_id: text})}
									/>
									<TextInput
										style={styles.platformAccountBox}
										placeholder="비밀번호"
										value={account.yogiyo_pw}
										onChangeText={(text) => setAccount({...account, yogiyo_pw: text})}
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
										value={account.etc}
										onChangeText={(text) => setAccount({...account, etc: text})}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.btnContainer}>
						<Pressable
							style={styles.buttonStyle}
							onPress={() => navigation.navigate("SettingMenuScreen")}
						>
							<Text style={styles.buttonText}>취소</Text>
						</Pressable>
						<Pressable
							style={styles.buttonStyle}
							onPress={() => setModalVisible(true)}
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
	btnContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: 280,
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
	errorModalMessageContainer: {
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor :"rgba(0,0,0,0.5)"
	},
	errorModalMessageBox:{
		width:300,
		height:200,
		backgroundColor:"#ffffff",
		borderRadius:10,
		alignItems:'center',
		justifyContent:'center',

	},
});

export default PlatformChangeScreen;
