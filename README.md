# @crabnebula/eslint-protected

A small lint rule to protect parts of the code from unconscious change. It uses a comment containing the `//@protected` keyword, an optional number of lines or `*` for the whole file, and a hash that is calculated from the code meant to be protected.

Code that differs from the saved hash will be reported.

## Installation and Configuration

Depending on your preferred package manager, run

```sh
npm add --save-dev @crabnebula/eslint-protected
// or
yarn add -D @crabnebula/eslint-protected
// or
pnpm add -D @crabnebula/eslint-protected
```

Then in your eslint config, add

```js
import { defineConfig } from "eslint/config";
import protection from "@crabnebula/eslint-protection";

export default defineConfig({    
    plugins: { protection },
    rules: {
        "protection/protect": "error"
    }
});
```

Ideally, you set up `eslint` as a guarding mechanism for commits using e.g. `husky`; first, install the required dependencies:

```sh
npm add --save-dev husky lint-staged @crabnebula/husky-protection
# or
yarn add -D husky lint-staged @crabnebula/husky-protection
# or
pnpm add -D husky lint-staged @crabnebula/husky-protection
```

Next, initialize Husky:

```sh
npx husky-init && npm install
# or
npx husky-init && yarn
# or
pnpx husky-init && pnpm i
```

Lastly, add a pre-commit hook:

```sh
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/pre-commit "node_modules/@crabnebula/husky-protection/index.js"
# or
pnpx husky add .husky/pre-commit "npx lint-staged"
pnpx husky add .husky/pre-commit "node_modules/@crabnebula/husky-protection/index.js"

# in either case, make it executable:
chmod +x .husky/pre-commit .husky/_/husky.sh
```

This will add the linter and another protection commit hook that will block commits that remove more protection comments than they add.

## Usage

To get the hash, just add `//@protected` without a hash and look at the error message.

### Protecting a file

```js
//@protected * [hash]
```

### Protecting a single line

```js
//@protected [hash]
```

### Protecting multiple lines

```js
//@protected 2 [hash]
```

Where `2` is the number of lines that should be protected below the comment.

## VS Code extension

There is a VS Code extension [`vscode-eslint-protected`](https://github.com/crabnebula-dev/vscode-eslint-protected) that will add the comments for you automatically.
