function extractMainText(){
    let paragraphs = document.querySelector("p");
    let text = "";
    paragraphs.forEach(p => text += p.innerText + " ");
    return text.trim();
}

// This will listen to messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_text"){
        let textContent = extractMainText();
        sendResponse({text: textContent});
    }
});