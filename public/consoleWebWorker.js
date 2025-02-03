import { C } from "@/app/types/language";

let codeStorage = "";
let selectedLanguage = C;

self.onmessage = (event) => {
    const code = event.data;
    codeStorage += code;
};

const getCode =  () => {
    return codeStorage || "";
};

const isEmpty = () => {
    return codeStorage === "";
}

const keyDown = (key) => {
    self.postMessage(key);
}

const clearCode = () => {
    codeStorage = "";
}

const switchLanguage = () => {
    selectedLanguage = lang;
}

const submitCode = async () => {
    if (codeStorage === "") {
        console.log('No code to send.');
        return false;
    }
    // try {
    //     const
    // }
}

export { getCode, isEmpty, keyDown, clearCode, switchLanguage, submitCode };