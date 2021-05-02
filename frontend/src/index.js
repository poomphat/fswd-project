import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { CookiesProvider } from "react-cookie"
import { BrowserRouter } from "react-router-dom"
import { createUploadLink } from "apollo-upload-client"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import { SessionProvider } from "./context/Sessioncontext"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "http://localhost:3001/graphql",
        credentials: "include",
    }),
})
ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <SessionProvider>
                        <App />
                    </SessionProvider>
                </ApolloProvider>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
