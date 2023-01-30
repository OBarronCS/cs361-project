import './style.css'
import placeholder from './placeholder.md?raw'

const context_text_box = document.querySelector<HTMLTextAreaElement>('#content')!

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
