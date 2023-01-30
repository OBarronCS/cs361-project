import { resolve } from 'path'

// Required non-default configuration in order to handle the HTML for each server endpoint
export default {
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            post: resolve(__dirname, 'src/post/index.html')
        }
    }
}

