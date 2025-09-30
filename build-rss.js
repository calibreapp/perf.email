import RSS from "rss";
import Mailchimp from "mailchimp-api-v3";
import { writeFileSync } from "fs";

const client = new Mailchimp(process.env.MAILCHIMP_API_KEY);

const getIssues = async () => {
  const response = await client.get("/campaigns", {
    type: "regular",
    status: "sent",
    sort_field: "send_time",
    sort_dir: "desc",
    count: 100,
    list_id: "7cba5dc7bd",
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

const main = async () => {
  const issues = await getIssues();
  const rss = generateRSS(issues);
  writeFileSync("dist/rss", rss, "utf8");
  console.log("RSS feed generated at dist/rss");
};

main();