import './style.css'
//Node resolves this .js from node-modules by convention
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <>
        <App clickersCount={3}>
            <h1>Button Clicker</h1>
            <h2>Test React App</h2>
        </App>
    </>
) 