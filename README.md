# Performance Newsletter

A website for [perf.email](https://perf.email/): an up-to-date web platform news email to make you a better performance advocate.

Made by the team at [♠ Calibre](https://calibreapp.com/), your performance companion.

## Initial installation

`npm install`

## Running the project

`npm run dev` starts a small, dependency-free local server (`dev.js`), accessible via [http://127.0.0.1:5173/](http://127.0.0.1:5173/). Set `PORT` to use a different port.

It serves `index.html` and `style.css` from the project root, assets from `/public` and `normalize.css` from `node_modules`, and reloads the browser whenever any of those files change.

## Build and preview

The `npm run build` command copies the static files into `/dist` (`build.js`).

To preview the build files locally, run the `npm run preview` command (serves `/dist` on [http://localhost:4173/](http://localhost:4173/)).

## RSS feed

The RSS feed is provided by [Buttondown](https://buttondown.com/perfemail/rss). `/rss` redirects there (see `render.yaml`), so existing feed subscriptions keep working.
