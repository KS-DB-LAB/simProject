import React, {useState} from "react";
import {
    Text, TextInput, StyleSheet, Pressable, Modal
} from "react-native";
import Postcode from "@actbase/react-daum-postcode";

const CustomInput = (props) => {
    const [isModal, setModal] = useState(false);

    const {
        field: {name, onBlur, value}, form: {errors, touched, setFieldValue, setFieldTouched}, ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (<>
        <TextInput
            style={[styles.textInput, props.multiline && {height: props.numberOfLines * 40}, hasError && styles.errorInput,]}
            value={value}
            onChangeText={(text) => {
                setFieldValue(name, text);
            }}
            onBlur={() => {
                setFieldTouched(name);
                onBlur(name);
            }}
            onTouchStart={() => {
                if (name == "address") setModal(true);
            }}
            {...inputProps}
        />
        <Modal
            visible={isModal}
            animationType="slide"
            onRequestClose={() => setModal(false)}
        >
            <Postcode
                style={{flex: 1, width: "100%", zIndex: 999}}
                onSelected={(data) => {
                    setFieldValue(name, data.address);
                    setModal(false);
                }}
            />
        </Modal>
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>);
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
    }, errorText: {
        fontSize: 10, color: "red",
    }, errorInput: {
        borderColor: "red",
    },
});
export default CustomInput;
