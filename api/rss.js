const RSS = require("rss");
const Mailchimp = require("mailchimp-api-v3");

const client = new Mailchimp(process.env.MAILCHIMP_API_KEY);

const getIssues = async () => {
  const response = await client.get("/campaigns", {
    type: "regular",
    status: "sent",
    sort_field: "send_time",
    sort_dir: "desc",
    count: 100,
    list_id: "7cba5dc7bd", // Delivered to the perf email list
  });

  return response.campaigns
    .map((campaign) => {
      return {
        title: campaign.settings.subject_line,
        description: campaign.settings.preview_text,
        url: campaign.long_archive_url,
        date: new Date(campaign.send_time),
      };
    })
    .sort((a, b) => b.date - a.date);
};

const generateRSS = (issues) => {
  const feed = new RSS({
    title: "perf.email",
    description: "Your best source of web performance news.",
    feed_url: "https://perf.email/rss",
    site_url: "https://perf.email",
    pubDate: new Date(),
    ttl: 86000,
    generator: "perf.email",
  });

  issues.forEach((issue) => feed.item(issue));

  return feed.xml({ indent: true });
};

module.exports = async (_req, res) => {
  const issues = await getIssues();
  const rss = generateRSS(issues);

  res.setHeader("Content-Type", "application/rss+xml");
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.send(rss);
};
