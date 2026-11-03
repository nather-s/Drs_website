// Address of a file in public/, for server-rendered pages. The design preview renders
// every page inside its home page, so it uses a path relative to that page.
export const asset = (path: string) =>
  `${process.env.PREVIEW_EXPORT === "1" ? "./" : "/"}${path.replace(/^\//, "")}`;
