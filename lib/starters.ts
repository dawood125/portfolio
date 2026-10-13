// The three suggestion chips. Their answers are generated once a day (app/api/starters) and served
// from the CDN, so the most-clicked questions cost nothing and never hit the rate limit.
export const STARTERS = [
  "What has he shipped that's live?",
  "How deep is his GenAI work?",
  "Can he start soon — remote or on-site?",
] as const;
