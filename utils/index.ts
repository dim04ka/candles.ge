export function return_url(context) {
  if (process.env.NODE_ENV === "production") {
    return `https://${context.req.rawHeaders[1]}`;
  } else {
    return "http://localhost:3000";
  }
}