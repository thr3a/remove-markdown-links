import fs from 'node:fs';
import { Command } from 'commander';
import { processMarkdown } from './markdownProcessor';

const program = new Command();

program
  .name('remove-markdown-links-and-images')
  .description('Removes links and images from a markdown file')
  .version('0.1.0')
  .argument('<input>', 'input markdown file')
  .option('-o, --output <output>', 'output file');

program.parse();

const inputFile = program.args[0];
const outputFile = program.opts().output;

async function main() {
  try {
    const markdown = fs.readFileSync(inputFile, 'utf-8');
    const result = await processMarkdown(markdown);

    if (outputFile) {
      fs.writeFileSync(outputFile, result);
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
