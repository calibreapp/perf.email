# Performance Newsletter

A website for [perf.email](https://perf.email/): an up-to-date web platform news email to make you a better performance advocate.

Made by the team at [♠ Calibre](https://calibreapp.com/), your performance companion.

## Initial installation

`npm install`

## Running the project

`npm run dev` launches a local [Vite](https://vitejs.dev/) dev server, accessible via [http://127.0.0.1:5173/](http://127.0.0.1:5173/). 

Vite’s dev server watches for source file changes, performing a live reload if any are detected.

## Build and preview

The `npm run build` command generates production build files, output to the `/dest` directory. 

To preview the build files locally, run the `npm run preview` command.

## RSS feed

`api/rss.js` leverages [Vercel’s serverless function](https://vercel.com/docs/concepts/functions/serverless-functions) capability to perform an on-demand request of [perf.email](https://perf.email/) issues from Mailchimp, returned as an RSS XML file. 

The `MAILCHIMP_API_KEY` environment variable is required for the Mailchimp API call.