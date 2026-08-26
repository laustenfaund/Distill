# Distill

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A text-to-text tool that reworks whatever you're about to send an LLM into
something denser and structurally clearer — same meaning, fewer tokens,
easier to parse correctly the first time.

## Features

- **Distill** — paste a message, prompt, or document and get back a version
  with redundancy and filler cut, the actual point stated plainly, and
  ambiguous references resolved — while staying full, natural sentences
  rather than shorthand.
- **Real before/after token counts** — uses Anthropic's token-counting
  endpoint, not an estimate, so the savings shown are actually accurate for
  the model you have selected.
- **Fidelity flags** — numbers, names, dates, and negations are meant to be
  preserved exactly; if anything else might have shifted meaning during the
  rewrite, it's flagged rather than silently smoothed over.

## Getting started

Distill is a single portable HTML file — no build step, no install.

1. Download [`index.html`](index.html) (or clone this repo).
2. Open it directly in a browser.
3. Click **settings**, paste in your own [Anthropic API key](https://console.anthropic.com/), and save.
4. Paste a message and click **distill**.

## Why this exists

Compressing text for an LLM isn't the same problem as compressing it for a
human — LLMs don't get tired of long input, so "readable" mostly comes down
to two different things: fewer tokens (a real cost/context-budget lever) and
less ambiguity (which improves reliability independent of length). Distill
optimizes for both by cutting redundancy and stating things plainly, not by
pushing text toward shorthand or dropped grammar — that would save tokens
while making the result *less* reliably understood, which defeats the
purpose. See [`DESIGN.md`](DESIGN.md) for the full reasoning.

## Privacy & data

Distill calls the Claude API directly from your browser using your own API
key. There is no server, no account with Distill itself, and nothing is
sent anywhere except the direct calls to Anthropic when you distill
something. The only thing stored is your API key, only in this browser's
local storage — nothing about what you write is learned or remembered
between messages. **Clear it** in Settings removes it for real.

## Repository contents

| File | What it is |
| --- | --- |
| [`index.html`](index.html) | The app. |
| [`DESIGN.md`](DESIGN.md) | The reasoning behind it — what "readable by an LLM" actually means, why it isn't the same as compression, and what's deliberately out of scope. |
| [`LICENSE`](LICENSE) | MIT. |

## License

[MIT](LICENSE)
