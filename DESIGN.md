# Distill — design notes

A small, deliberately light side project: a spinoff of the reasoning behind
[U/I](https://github.com/laustenfaund/UI) applied to a different kind of
reader — an LLM instead of a human who communicates differently than you.

## What "readable by an LLM" actually means

LLMs don't have human-style parsing difficulty — they don't get tired,
skim, or lose the thread in a wall of text the way a person does. So
"readable" here really splits into two different goals:

- **Fewer tokens** — a real, measurable cost/context-budget lever.
- **Less ambiguity** — improves reliability (the model answering what was
  actually meant, not a nearby guess) independent of length.

These two goals can pull apart, and the failure mode to design around is
optimizing for the first at the expense of the second.

## Why this isn't compression

Claude, like any LLM, was trained overwhelmingly on natural, grammatical
text. Pushing input toward shorthand, dropped articles, symbols-for-words,
or telegraphic phrasing moves it out of that distribution — it can degrade
comprehension even while cutting the token count, which defeats the point
on the fidelity half of the goal. The actual lever is closer to *aggressive
editing* than *encoding*: cut redundancy, filler, repeated information, and
unnecessary hedging, while keeping full grammatical sentences. Most of the
token bloat in typical text is redundancy, not "too many words for the
idea" — cutting the former saves real tokens without leaving the
distribution the model reads best.

## What it's actually good for, and what it isn't

Distill directly improves whether *this specific message* gets parsed and
answered as intended, and it produces real, proportional token savings —
larger for verbose, roundabout, or hedge-heavy source text; small to
negligible for someone already concise, which is expected, not a failure.

It does **not** meaningfully address session-level drift — a model
straying from instructions set many turns earlier in a long conversation.
That's a different problem with more direct, platform-level fixes
(mid-conversation reinforcement, conversation summarization, and similar),
not something a per-message rewrite tool reaches. Distill isn't sold as a
fix for that here, on purpose.

## Fidelity rules

Numbers, names, dates, and negations ("not", "never", "no") are the specific
places a paraphrase is most likely to silently change meaning, so the
rewrite is instructed to preserve those verbatim rather than reword them.
Anything else that might plausibly have shifted gets flagged in the output
instead of quietly smoothed over — the same honesty principle as U/I: a
confidently wrong rewrite is worse than one that admits what it's unsure of.

## Token counts are real, not estimated

The before/after numbers come from Anthropic's token-counting endpoint,
not a character-count heuristic — tokenizers vary by model and by
provider (OpenAI's `tiktoken` undercounts Claude tokens meaningfully), so
an estimate would misrepresent the actual savings. Counts are model-specific:
changing the selected model can change both numbers for the same text.

## Stateless, on purpose

Unlike U/I, there's no voice profile, no archive upload, no personalization
of any kind — this is a one-off, per-message tool, not a relationship that
builds over time. The only thing that persists locally is the API key.

## Engine and privacy — same pattern as U/I

Bring-your-own Anthropic API key, called directly from the browser; no
server, no account, no backend. Single portable HTML file, local storage
only, nothing sent anywhere except the direct calls to Anthropic.
