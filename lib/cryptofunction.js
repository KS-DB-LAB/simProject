import CryptoES from "crypto-es";
import { CRYPTO_KEY } from "@env";

export const encode = (password) => {
    return CryptoES.AES.encrypt(password,CRYPTO_KEY).toString();
}

export const decode = (encodedPassword) => {
    var C = require('crypto-js');
    return C.AES.decrypt(encodedPassword, CRYPTO_KEY).toString(C.enc.Utf8);
}