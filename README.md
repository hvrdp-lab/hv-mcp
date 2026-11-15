# High Valyrian Translators — MCP Server

A Model Context Protocol (MCP) server for the attested High Valyrian dictionary
published at https://highvalyriantranslators.com

Tools (all read-only, attested data only — the server never invents translations):

- `lookup_word` — find a High Valyrian word by its form or English meaning
- `lookup_phrase` — find an attested famous phrase ("Valar morghulis", "a dragon is not a slave")
- `word_of_the_day` — one real dictionary word per day

## Endpoint

Deployed as a Cloudflare Worker on a custom domain:

```
https://mcp.highvalyriantranslators.com/mcp
```

Transport: MCP streamable HTTP (JSON-RPC 2.0 over POST). No authentication —
the dictionary is public data.

## Deploy

Cloudflare Workers Builds (Git-connected) or Wrangler:

```
wrangler deploy
```

`worker.js` is a single self-contained file (dictionary data inlined).
The modular source lives in the project repo (src/mcp-core.js + data/dictionary.json).
