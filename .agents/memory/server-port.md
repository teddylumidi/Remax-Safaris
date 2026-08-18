---
name: Server & port config
description: Express server port and Replit workflow configuration
---

The Express server in `server.ts` reads `process.env.PORT` and falls back to `5000`. The Replit workflow (`Start application`) must use `waitForPort: 5000` and `outputType: "webview"`. Port 3000 was the original port from the GitHub import — do not revert to it.

**Why:** Replit webview requires port 5000. The import generated a workflow waiting on 5000 but the original server hardcoded 3000, causing workflow timeouts.

**How to apply:** Any future change to the server port must also update the workflow configuration via `configureWorkflow`.
