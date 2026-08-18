import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Optimize compression: compress text, html, json, css, js, but bypass already compressed media (mp4, webm, jpg, png, woff2)
app.use(
  compression({
    filter: (req, res) => {
      const contentType = res.getHeader('Content-Type');
      if (typeof contentType === 'string' && (
        contentType.includes('video/') ||
        contentType.includes('image/') ||
        contentType.includes('font/')
      )) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024
  })
);

app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Remax Safaris' });
});

// Dedicated fast streaming route for videos with Range request support and optimized caching
const videosDir = path.join(process.cwd(), 'public', 'videos');
app.get('/videos/:filename', (req, res, next) => {
  const filePath = path.join(videosDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return next();
  }

  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  res.setHeader('Content-Type', 'video/mp4');

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      immutable: true,
      setHeaders: (res, pathUrl) => {
        if (pathUrl.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else if (pathUrl.endsWith('.mp4') || pathUrl.endsWith('.webm')) {
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
          res.setHeader('Accept-Ranges', 'bytes');
        } else if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/.test(pathUrl)) {
          res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Remax Safaris server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

