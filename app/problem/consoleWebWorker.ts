let codeStorage = "";
let selectedLanguage = "c";

addEventListener("message", (event: MessageEvent<{type: string, value: string}>) => {
    const [eventType, eventData] = Object.values(event.data);
    switch (eventType) {
        case "keydown":
            codeStorage += eventData;
            console.error(codeStorage);
            break;
        case "language":
            selectedLanguage = eventData;
            break;
        case "clear":
            codeStorage = "";
            break;
        case "submit":
            submitCode();
            break;
        case "getCode":
            postMessage({ type: "code", value: codeStorage });
            break;
        case "isEmpty":
            postMessage({ type: "isEmpty", value: codeStorage.length == 0})
    }
});

const submitCode = async () => {
    if (codeStorage === "") {

    }
}