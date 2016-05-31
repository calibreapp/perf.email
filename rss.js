'use strict';

const issues = require('./issues.json')

let RSS = require('rss')
let contents
let feed = new RSS({
  title: 'perf.email',
  description: 'A free bi-monthly newsletter about web performance and user interaction.',
  feed_url: 'https://perf.email/rss',
  site_url: 'https://perf.email',
  pubDate: new Date(),
  ttl: 86000,
  generator: 'perf.email'
})

issues.forEach((issue)=> {
  feed.item({ title: issue.title, url: issue.url, date: issue.date })
})

contents = feed.xml({indent: true})
process.stdout.write(contents)
