document.getElementById("summarize-btn").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: {tabId: tabs[0].id},
                function: extractTextAndSummarize
            }
        );
    });
});

function extractTextAndSummarize(){
    let paragraphs = document.querySelectorAll("p");
    let text="";

    
}