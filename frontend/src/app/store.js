import {configureStore} from "@reduxjs/toolkit"
import theme from "../features/themeSlice.js"
import user from "../features/userSlice.js"
const store = configureStore({
    reducer: {
        theme:theme,
        user:user,
    }
})

export {store}