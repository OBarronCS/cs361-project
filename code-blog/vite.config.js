import { resolve } from 'path'

// Required non-default configuration in order to handle the HTML for each server endpoint
export default {
    build:{
        rollupOptions: {
            input: {
                main: new URL('./index.html', import.meta.url).pathname,
                post: new URL('./src/post/index.html', import.meta.url).pathname,
            }
        }
    }
    
}

