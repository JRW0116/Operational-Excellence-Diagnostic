# Operational Excellence Diagnostic App

This is a static GitHub Pages-ready application for the Quality In Practice Operational Excellence Diagnostic.

## Files

- `index.html` - app shell
- `styles.css` - responsive visual styling
- `diagnostic-data.js` - diagnostic title, scale, dimensions, questions, and recommendations
- `app.js` - scoring, charting, recommendations, print, reset, sample results, and email CTA

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any simple static file server.

Example local preview URL when using a static server:

```text
http://127.0.0.1:8787
```

## GitHub Pages Deployment

1. Copy these files into the repository root.
2. Commit and push to GitHub.
3. In GitHub, open `Settings > Pages`.
4. Set source to `Deploy from a branch`.
5. Choose the default branch and `/root`.
6. Save.

The app will publish at:

```text
https://jrw0116.github.io/Operational-Excellence-Diagnostic/
```

## Website Launch Link

Add a button or link on Squarespace that points to the GitHub Pages URL.

Recommended button text:

```text
Take the Operational Excellence Diagnostic
```

## Updating the Diagnostic

Edit `diagnostic-data.js` to change:

- rating labels
- dimensions
- questions
- recommendations
- academy paths

No app code changes are required for ordinary diagnostic content updates.
