---
layout: ../layouts/MarkdownLayout.astro
title: About
---

When I first heard about brave search came up with the idea and implementation of goggles to
customize the search results, I was directly hooked.

Goggles puts us back in control of our search results by allowing us to apply
custom logic on top of the search algorithm. We decide what we want to
see and what not.

On top of that, we can get even better search results by
providing context to the search engine. When we do a search session, we can
search with one of our goggles, and we can expect perfectly matching results even
when we do not enter fully search terms.

For example, let's say we are coding in a specific language, let's say rust. Now
we face some sort of problem or want to get to know how to do something in the
given language. Therefore, we search for it. But since we are searching the
entire Internet, we have to carefully narrow down our search query to only those
results interesting to us. Because of this, we end up with a search query like:

> how to read file in rust

With goggles we can use a goggle that only shows results to us that the goggle
is targeting. In this case, we could use a goggle that only shows results from
qualitative rust websites. Now we only have to enter the search term without the
need to add extra context to the search engine:

> how to read file

Great so far, but I saw some barriers in effectively using goggles.

Since goggles can only be stored on GitHub and GitLab, but we would like to use
all the great features of our local IDEs, we would have to commit and push every
change we make to our goggles.

Also, we then would have to manually submit our code URL to brave search, so they
can include, refresh or remove our goggles from their database.

Besides this, for people who are not familiar with development specific topics and
tools this can be a barrier to entry. This means the majority of the population
is not able to create their own goggles in a straightforward way.

This is why I created _Gearchy_.

It solves all the problems mentioned above and makes it as easy as possible to
everyone to create their own goggles.

Furthermore, it provides an entire management solution for all your goggles:

Editing happens inside a visual editor instead of writing code.

When saving in the editor, your goggles are automatically pushed to GitHub.

And when you want to submit your goggles to brave search, you can also let
_Gearchy_ handle this for you automatically.
