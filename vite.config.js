import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [
      react(),
      {
        name: 'optional-google-site-verification',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            if (env.VITE_GOOGLE_SITE_VERIFICATION?.trim()) return html

            return html.replace(
              /\s*<meta\s+name="google-site-verification"\s+content="%VITE_GOOGLE_SITE_VERIFICATION%"\s*\/>/,
              '',
            )
          },
        },
      },
    ],
  }
})
