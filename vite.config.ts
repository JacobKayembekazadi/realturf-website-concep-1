import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // AI Provider selection
        'process.env.AI_PROVIDER': JSON.stringify(env.AI_PROVIDER || 'gemini'),
        // Gemini
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_MODEL': JSON.stringify(env.GEMINI_MODEL || ''),
        // OpenAI
        'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY || ''),
        'process.env.OPENAI_MODEL': JSON.stringify(env.OPENAI_MODEL || ''),
        // Anthropic
        'process.env.ANTHROPIC_API_KEY': JSON.stringify(env.ANTHROPIC_API_KEY || ''),
        'process.env.ANTHROPIC_MODEL': JSON.stringify(env.ANTHROPIC_MODEL || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
