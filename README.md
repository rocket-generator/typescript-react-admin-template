# For Developers

## Getting Started

### Setup CLIs

First, Install [asdf](https://asdf-vm.com/) for CLI version manager. Then, install cli tools via asdf.

```sh
# (for mac users)
cut -d' ' -f1 .tool-versions | grep "^[^\#]" | xargs -I {} asdf plugin add {}
# (for linux users)
cat .tool-versions | cut -d' ' -f1 | grep "^[^\#]" | xargs -i echo {}

# Install all CLIs based on .tool-versions
asdf install
```

### Start

```sh
cp .env.example .env
npm i
npm start
```

### Run tests

```sh
npm test
```

### Run lint

```sh
npm run lint
```

### Build and run

```sh
npm run build
cd dist
npx serve@14.2.0 -p 8000
```
