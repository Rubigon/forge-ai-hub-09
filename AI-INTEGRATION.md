# AIForge: data and AI architecture

## Catalog
`src/lib/catalog.ts` exposes the asynchronous `catalogService.getCatalog(signal)` adapter with a 120 ms delay. Primary lists, homepage and detail pages use the same TanStack Query cache, prefetched in route loaders for SSR. Replace the adapter with real HTTP reads without changing those views. Existing data exports remain the academic source and compatibility layer for pure search, recommendations and metadata; they are not a live database.

## Real AI
Prompt Optimizer calls `/api/ai/optimize`, a same-origin streaming TanStack server route. The server calls Lovable AI's `/v1/responses` endpoint with `openai/gpt-6-astra`. There is no deterministic fallback in this feature. Other text/code calculators remain local by design.

The server reads `process.env['LOVABLE_API_KEY']` inside the request handler. Lovable provisions this secret; do not commit a credential-bearing `.env` file or use `VITE_AI_API_KEY` (Vite exposes it in the browser bundle). For local development outside Lovable, inject this server-only environment variable using your deployment's secret manager. Production secret changes require publishing.

Lovable AI usage is billed per request. A small monthly free allowance is included; additional credits require a paid plan.

## Failures and recovery
401 is a configuration failure, 402 insufficient credit, 403 denied access, 429 rate limiting, 5xx temporary failure, and network errors are handled separately. Safe upstream messages are preserved. The UI retains the original input, clears loading, displays an alert and a toast; partial output remains marked by the error. Stop propagates cancellation upstream. There are no automatic retries.

402/403 blocks are saved server-side in `ai_service_state`. All requests check the block first. After resolving credits/access, the owner explicitly clears the corresponding block using administrative Cloud tools; a new user action is required to resume. No provider substitution or automatic probes are used. This first-party endpoint checks Origin but is not an account quota system: the existing 20 successful uses per page session is a UX guard, not tamper-proof billing protection. Add authenticated server quotas before unrestricted high-volume public use.

## Verification
Run `bun run test`. Tests cover the delayed/abortable catalog adapter, HTTP error categories, safe denial messages, no-retry network failures, fragmented SSE/UTF-8, refusal, empty response and interrupted response behavior. Browser fault injection tests should remain distinct from the live AI success check.