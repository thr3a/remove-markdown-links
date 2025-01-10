# remove-markdown-links

## usage

```sh
docker run --rm -v ./:/app thr3a/remove-markdown-links index.md

docker run --rm -v ./:/app thr3a/remove-markdown-links index.md -o out.md
```

```
Usage: remove-markdown-links [options] <input>

Removes links from a markdown file

Arguments:
  input                  input markdown file

Options:
  -V, --version          output the version number
  -o, --output <output>  output file
  -h, --help             display help for command
```
