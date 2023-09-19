import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import ReactQueryProvider from 'providers/ReactQueryProvider/ReactQueryProvider'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <ReactQueryProvider>
  <App />
  </ReactQueryProvider>
)
