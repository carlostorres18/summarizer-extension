document.getElementById("summarize").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: extractText
    }, async (result) => {
        let pageText = result[0].result;
        let summary = await summarizeText(pageText);
        document.getElementById("summary").value = summary;

    });
});

async function summarizeText(text){
    try{
        let response = await fetch("http://127.0.0.1:8000/summarize",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ content: text })
        });
        
        let data = await response.json();
        return data.summary;
    }
    catch(error){
        console.error("Error:", error);
        return "Error generating summary.";
    }
}

function extractText(){
    return document.body.innerText;
}