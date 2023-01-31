import './style.css'
import placeholder from './placeholder.md?raw'

const title_span = document.getElementById("title") as HTMLSpanElement;
const tag_text_box = document.getElementById("tags") as HTMLTextAreaElement;

const context_text_box = document.getElementById("content") as HTMLTextAreaElement;
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


const submit_button = document.getElementById("submit") as HTMLButtonElement;
submit_button.addEventListener("click", async () => {
    const title = title_span.innerText;
    const content = context_text_box.value;
    const tags = tag_text_box.value;

    console.log(title, content, tags);


    const response = await fetch("./create", {
        method: "POST",
        body: JSON.stringify({
            title,
            content,
            tags
        })
    }).catch((e) => {
        console.error("Error");
        console.error(e);
    })


});
