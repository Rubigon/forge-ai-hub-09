<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Primary catalog UI uses the asynchronous catalogService adapter and shared TanStack Query cache; static exports remain for pure search/SEO compatibility.
- Published posts are read through a public read-only server boundary and merged by slug into the catalog; Markdown is rendered without raw HTML to preserve safe editorial formatting.
- AIProvider is a browser streaming facade; AI instructions, model selection and credentials stay behind the same-origin TanStack server route to avoid credential exposure.
- AI access denials are persisted in a service-only circuit-breaker table; restore access and explicitly clear the block before a fresh user request, never retry denied work automatically.
