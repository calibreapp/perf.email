'use strict';

const request = require('request')
const issues = require('./issues.json')

let RSS = require('rss')
let contents
let issuesWithContent = []

issuesWithContent = issues.map((issue) => {
  return new Promise((resolve, reject) => {
    request(issue.url, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        resolve({
          title: issue.title,
          url: issue.url,
          date: issue.date,
          description: body
        })
      } else {
        reject(err)
      }
    })
  })
})

Promise.all(issuesWithContent)
  .then((issues) => {
    let feed = new RSS({
      title: 'perf.email',
      description: 'A free bi-monthly newsletter about web performance and user interaction.',
      feed_url: 'https://perf.email/rss',
      site_url: 'https://perf.email',
      pubDate: new Date(),
      ttl: 86000,
      generator: 'perf.email'
    })

    issues.forEach((issue) => feed.item(issue) )

    return feed
  }).then((feed) => {
    return feed.xml({indent: true})
  }).then((xml) => {
    process.stdout.write(xml)
  })
