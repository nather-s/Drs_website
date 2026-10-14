"use client";

import dynamic from "next/dynamic";

// The assistant's code (and the animation library it uses) loads only after the page
// has rendered, keeping the first load small on slow mobile connections.
const Assistant = dynamic(() => import("@/components/site/assistant"), {
  ssr: false,
  loading: () => <div aria-hidden className="min-h-[420px] rounded-lg border border-line bg-paper" />,
});

export default Assistant;
