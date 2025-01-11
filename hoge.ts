import { processMarkdown } from './markdownProcessor';


const input = 'This is a [link](https://example.com) to a website.';
const expected = 'This is a link to a website.\n';
const result = await processMarkdown(input);
async function hoge () {
  const input = 'This is an image: ![alt text](image.jpg)';
  const result = await processMarkdown(input);
}

hoge()
