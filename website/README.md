# Website Preview

This folder contains a standalone HTML page. To check it in your browser without uploading it anywhere, run the static preview server:

```bash
npm install
npm run preview
```

The command starts a lightweight Node.js server that serves the `website/` directory on [http://localhost:4173](http://localhost:4173). Use `CTRL+C` in the terminal to stop it. You can set a custom port by defining the `PORT` environment variable before running the script, e.g. `PORT=5000 npm run preview`.
