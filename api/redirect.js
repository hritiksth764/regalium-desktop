export default function handler(req, res) {
  const userAgent = req.headers["user-agent"].toLowerCase();
  const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

  if (isMobile) {
    res.writeHead(302, { Location: "https://regalium-mobile.vercel.app" });
  } else {
    res.writeHead(302, { Location: "https://regalium-desktop.vercel.app" });
  }

  res.end();
}
