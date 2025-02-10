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

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Summarize this: " + text}]
        })
    })
    .then(response => response.json())
    .then(data => {
        let summary = data.choices[0].message.content;
        alert("Summary: " + summary);
    })
    .catch(error => console.error("Error:", error));

}