import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import remoteConfig from './remote.config.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    federation(remoteConfig)
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
  }
})
