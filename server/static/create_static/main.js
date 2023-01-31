
const placeholder = `
This contains the body of your post.

It's supports rendering using Markdown

This means, you can use *italics*, and **bolding** and __underlined__ words which are rendered when the post if viewed
`





const title_span = document.getElementById("title") 
const tag_text_box = document.getElementById("tags")

const context_text_box = document.getElementById("content")
context_text_box.placeholder = `${placeholder}`

// Allow the use of the "Tab" key

context_text_box.onkeydown = (e) => {
    if(e.key === "Tab"){
        e.preventDefault();

        // Insert tab spaces at index of mouse, supporting UNDO
        document.execCommand("insertText", false, "\t");
    }
}


// Call "oninput" callback programmatically to trigger initial resize
const dummy_event = new Event('input', {
    bubbles: true,
    cancelable: true,
});
  
context_text_box.dispatchEvent(dummy_event);


const submit_button = document.getElementById("submit");
submit_button.addEventListener("click", async () => {
    const title = title_span.innerText;
    const content = context_text_box.value;
    const tags = tag_text_box.value;

    const response = await fetch("./create", {
        method: "POST",
        body: JSON.stringify({
            title,
            content,
            tags
        }),
        redirect:"follow",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    }).catch((e) => {
        console.error("Error");
        console.error(e);
    })


});
