import { language, C } from "@/app/types/language"; 

let codeStorage = "";
let selectedLanguage: language = C;

self.onmessage = (event: MessageEvent<any>) => {
    const code: string = event.data;
    codeStorage += code;
};
  
const getCode =  () : string => {
    return codeStorage || "";
};

const isEmpty = () : boolean => {
    return codeStorage === "";
}

const keyDown = (key : any) : void => {
    self.postMessage(key);
}

const clearCode = () : void => {
    codeStorage = "";
}

const switchLanguage = (lang: language) : void => {
    selectedLanguage = lang;
}

const submitCode = async () => {
    if (codeStorage === "") {
        console.log('No code to send.');
        return false;
    }
    try {
        const 
    }
}

export { getCode, isEmpty, keyDown, clearCode, switchLanguage, submitCode };