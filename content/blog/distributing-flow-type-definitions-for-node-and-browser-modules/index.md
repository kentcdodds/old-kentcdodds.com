---
slug: distributing-flow-type-definitions-for-node-and-browser-modules
title: Distributing flow-type definitions for node and browser modules
date: '2017-11-27'
author: Kent C. Dodds
description: >-
  _The blog post I wish existed when trying to distribute flow-types with a
  module using rollup._
keywords:
  - JavaScript
  - Flow
  - Flowtype
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Bill Williams](https://unsplash.com/photos/ozwiCDVCeiw) on
  [Unsplash](https://unsplash.com)'
---

This week I spent a lot of time working on improving
[`paypal-scripts`](https://blog.kentcdodds.com/412ab5e47229). The tool supports
three main use cases, and has a special build script for each use case:

1.  Applications: Webpack for client, babel for server
2.  Node modules: babel
3.  Browser modules: rollup

For node and browser modules I want to also expose the flow type definitions so
that folks using those modules can benefit from the type definitions if they're
also using flow (which they will be if they're using `paypal-scripts`).

We don't need to distribute flow type definitions for our applications, but we
do for node and browser modules, so let's give that a look.

### Node modules

For the node modules, it's simple enough.
[`flow-bin`](https://www.npmjs.com/package/flow-bin) actually includes a command
for doing exactly this called `gen-flow-files`:

> _gen-flow-files EXPERIMENTAL: Generate minimal .js.flow files for publishing
> to npm._

So now the `paypal-scripts build` script runs these two scripts in parallel:

```
babel src --out-dir dist --copy-files --ignore __tests__,__mocks__ --presets ./node_modules/paypal-scripts/dist/config/babelrc.js

flow gen-flow-files src --out-dir dist
```

So that'll give you something that looks a bit like this:

```
.
├── dist
│   ├── index.js
│   ├── index.js.flow
│   ├── utils.js
│   └── utils.js.flow
└── src
    ├── index.js
    └── utils.js
```

And if you're curious, here's the contents of `index.js.flow`:

```
// @flow

import {upper} from "./utils";
declare export function divide(...args: Array<number>): number | number | number;
declare export function multiply(...args: Array<number>): number | number | number;
declare export function subtract(...args: Array<number>): number | number | number;
declare export function sum(...args: Array<number>): number | number | number;
declare export function upper(str: string): string;
```

Just the flow type definitions, nothing more... That's all flow needs to do its
job. So when I import the index file, flow knows the types for the functions
that I use. Job well done flow 👍

### Browser modules

This one's a fair bit more tricky... Here's an example of the `src` and `dist`
directories for a browser module:

```
.
├── dist
│   ├── pp-component.cjs.js
│   ├── pp-component.esm.js
│   ├── pp-component.umd.js
│   ├── pp-component.umd.js.map
│   ├── pp-component.umd.min.js
│   └── pp-component.umd.min.js.map
├── package.json
└── src
    ├── index.js
    └── utils.js
```

See the problem? In case you're missing it, here's what would happen if I just
ran `flow gen-flow-files src --out-dir dist` on this:

```
.
├── dist
│   ├── index.js.flow
│   ├── pp-component.cjs.js
│   ├── pp-component.esm.js
│   ├── pp-component.umd.js
│   ├── pp-component.umd.js.map
│   ├── pp-component.umd.min.js
│   ├── pp-component.umd.min.js.map
│   └── utils.js.flow
├── package.json
└── src
    ├── index.js
    └── utils.js
```

The problem here is that I never import `dist/index.js` (because that doesn't
exist) so `dist/index.js.flow` will never be needed or used. What I need is a
flow type definition for each of the `.esm.js` and the `.cjs.js` files because
those are the ones folks will be importing (depending on their environment). The
problem is, there's not really any way to preserve the flow types when running
code through rollup (because rollup can't parse flow types), so you can't run
the `gen-flow-files` on the code after it's run through rollup. 🤔

So then I remembered seeing
[the Flow Comments](https://flow.org/blog/2015/02/20/Flow-Comments/) blog post
which allows you to author your flow types as code comments. This way it would
parse well and the relevant flow types would still be inline. But I don't want
to author my flow types as comments, so I searched around and sure enough
[there's a babel plugin](https://www.npmjs.com/package/babel-plugin-transform-flow-comments)
that will automate the job of transforming flow type definitions to code
comments.

Unfortunately, as I tried it out,
[I came across a bug](https://github.com/babel/babel/issues/6767). Turns out
that's pretty common for anyone trying to use this plugin and the maintainers
discourage folks from trying to use it. Then the amazing
[Logan Smyth](https://github.com/loganfsmyth)
[suggested a brilliant solution](https://github.com/babel/babel/issues/6767#issuecomment-342636709):
Create a simple file for each of the `.esm.js` and `.cjs.js` files that looked
like this:

```js
// @flow

export * from '../src/index.js'
export {default} from '../src/index.js'
```

This would mean that the flow types for those files would just use the original
source for the type information while the user of the module would use the
rollup version. I tried it out and it works perfectly! So now the files look
like this:

```
.
├── dist
│   ├── pp-component.cjs.js
│   ├── pp-component.cjs.js.flow
│   ├── pp-component.esm.js
│   ├── pp-component.esm.js.flow
│   ├── pp-component.umd.js
│   ├── pp-component.umd.js.map
│   ├── pp-component.umd.min.js
│   └── pp-component.umd.min.js.map
└── src
    ├── index.js
    └── utils.js
```

And things work great! Unfortunately this also requires that I update the
`files`property in my `package.json` so I ship the `src/` files, but that's not
too difficult and it's only minorly inconvenient:

```
"files": ["dist", "src", "!__mocks__", "!__tests__"]
```

Now... As I was writing this, I realized it should be possible to run
`gen-flow-files` as I was before and then simply make two copies of the
`index.js` file for the `.esm.js.flow`and `.cjs.js.flow` files.

![ah ha](./images/0.gif)

I'm 99% sure that'll work and I plan on implementing that soon! I'll let you all
know if that doesn't work!

**UPDATE:** That actually DOES work! Unfortunately, I ran into
[this issue](https://github.com/facebook/flow/issues/3281#issuecomment-344009783)
with my specific usage. I guess that's what they mean by "EXPERIMENTAL" 😅

I created a repo on GitHub to demonstrate how this all could work in a really
simple example.

[**kentcdodds/dist-flow-example**](https://github.com/kentcdodds/dist-flow-example)

I hope this was helpful! Good luck to you all and keep learning!

**Things to not miss**:

- [`prettier@1.8`](https://github.com/prettier/prettier/releases/tag/1.8.0)
  [released](https://github.com/prettier/prettier/releases/tag/1.8.0) - My
  favorite part of this release is support for formatting markdown (including
  markdown codeblocks!!!)
- [`Making a custom React renderer`](https://github.com/nitin42/Making-a-custom-React-renderer) -
  A super intro to creating custom react renderers by my friend
  [Nitin Tulswani](https://twitter.com/NTulswani)
