# Ollama chat

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Ollama chat](#ollama-chat)
- [Why](#why)
- [What it does?](#what-it-does)
- [How do I use it?](#how-do-i-use-it)
- [Install Ollama](#install-ollama)
- [Start Ollama](#start-ollama)
- [Pull desired AI model](#pull-desired-ai-model)
- [Install ollama-chat](#install-ollama-chat)
- [It is a toy project](#it-is-a-toy-project)

<!-- markdown-toc end -->

## Why

That's just a basic proof-of-concept project creating a ChatGPT-like chat bot
using [ollama.ai](https://ollama.ai/) as backend. I've decided to use React
and TypeScript because I've known none of that going into this and was interested
to see firstly how it works and secondly... how much of the code can be generated
by ChatGPT itself. Well, the server that talks to Ollama is practically 90%
AI-generated, as the only thing I've changed there, was adding correct call
with correct params. The rest was basically rewritten by me, so that was a nice
learning experience. Oh, there's also Tailwind which I know a bit.

## What it does?

It starts a chat app on `localhost:8080` where you can talk to Mistral AI model
just like you would with ChatGPT. It remembers the history of current coversation,
it doesn't preserve in session though. It doesn't have cool answer streaming
(so you get the full answer when it is ready, not word by word), and also it doesn't
have syntax highlighting.

## How do I use it?

### Install Ollama

Visit [ollama.ai](https://ollama.ai/) and get it. It's also in AUR, it works in WSL2.

### Start Ollama

Run following command:

``` sh
ollama serve
```

...and let it run. You might also start ollama as a service, which is explained on
their GitHub.

### Pull desired AI model

``` sh
ollama pull mistral
```

Chatbot uses `mistral` by default, but it is easy to change. Important thing is that you need
to have this model in order to use it (obviously).

### Install ollama-chat

Clone this repository:

``` sh
git clone https://github.com/wmwnuk/ollama-chat.git
```

Go to the project directory and install dependencies:

``` sh
cd ollama-chat
npm install
```

Start the application itself:

``` sh
npm run start-dev
```

...and then go to [localhost:8080](http://localhost:8080) and have a nice conversation. :)

### It is a toy project

The code is probably trash, as it is my first React app, it isn't meant to run on publicly available server
as you'd need a pretty beefy server to run AI model with an acceptable speed - at least something more than
the most basic VPS. I might explore the options in near future and possibly rewrite this app completely.
For now, I think it's quite okay to play with.
