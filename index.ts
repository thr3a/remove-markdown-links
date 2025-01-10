import fs from 'node:fs';
import { Command } from 'commander';
import type { Link, Parent, Root } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const program = new Command();

program
  .name('remove-markdown-links')
  .description('Removes links from a markdown file')
  .version('0.1.0')
  .argument('<input>', 'input markdown file')
  .option('-o, --output <output>', 'output file');

program.parse();

const inputFile = program.args[0];
const outputFile = program.opts().output;

const processor = unified()
  .use(remarkParse)
  .use(() => (tree: Root) => {
    visit(tree, 'link', (node: Link, index, parent: Parent | undefined) => {
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, ...node.children);
      }
    });
  })
  .use(remarkStringify);

async function main() {
  try {
    const markdown = fs.readFileSync(inputFile, 'utf-8');
    const result = await processor.process(markdown);

    if (outputFile) {
      fs.writeFileSync(outputFile, String(result));
    } else {
      console.log(String(result));
    }
  } catch (err) {
    console.error(err);
  }
}

main();
