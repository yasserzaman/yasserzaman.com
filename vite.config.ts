import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';

// Load .env into process.env so the local API handlers below can read
// GEMINI_API_KEY, EMAIL_*, etc. (Vercel does this automatically in production.)
import 'dotenv/config';

// Dev-only plugin: run the Vercel-style serverless functions in /api under
// `vite dev`, so the contact form and the AI chatbot work locally WITHOUT the
// Vercel CLI. In production Vercel builds /api itself, so this does nothing there.
function localApiFunctions(): Plugin {
  return {
    name: 'local-api-functions',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/')) return next();

        const route = url.split('?')[0].replace(/\/+$/, '');
        const name = route.slice('/api/'.length);
        if (!name) return next();

        const modPath = path.resolve(__dirname, 'api', `${name}.ts`);

        // Minimal Vercel-style response shim over Node's ServerResponse.
        const shim = {
          status(code: number) {
            res.statusCode = code;
            return shim;
          },
          json(data: unknown) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          },
          setHeader(k: string, v: string) {
            res.setHeader(k, v);
            return shim;
          },
        };

        try {
          let body: unknown = undefined;
          if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const chunks: Buffer[] = [];
            for await (const c of req) chunks.push(c as Buffer);
            const raw = Buffer.concat(chunks).toString('utf8');
            body = raw ? JSON.parse(raw) : {};
          }

          const mod = await server.ssrLoadModule(modPath);
          const handler = mod.default;
          if (typeof handler !== 'function') return next();

          await handler({ method: req.method, body }, shim);
        } catch (err) {
          console.error(`[local-api] ${route} failed:`, err);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'local_api_error' }));
          }
        }
      });
    },
  };
}

export default defineConfig(() => {
  // Inject the Gemini key/model into the client from whichever variable is set
  // (VITE_-prefixed or the plain name). This means editing either GEMINI_API_KEY
  // or VITE_GEMINI_API_KEY in .env works — no more "which one did I set?" bugs.
  const geminiKey = (process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "").trim();
  const geminiModel = (
    process.env.VITE_GEMINI_MODEL ||
    process.env.GEMINI_MODEL ||
    "gemini-2.0-flash"
  ).trim();
  const groqKey = (process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY || "").trim();
  const groqModel = (
    process.env.VITE_GROQ_MODEL ||
    process.env.GROQ_MODEL ||
    "llama-3.3-70b-versatile"
  ).trim();

  return {
    plugins: [react(), tailwindcss(), localApiFunctions()],
    define: {
      __GEMINI_API_KEY__: JSON.stringify(geminiKey),
      __GEMINI_MODEL__: JSON.stringify(geminiModel),
      __GROQ_API_KEY__: JSON.stringify(groqKey),
      __GROQ_MODEL__: JSON.stringify(groqModel),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
