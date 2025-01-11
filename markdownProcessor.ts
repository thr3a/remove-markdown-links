import type { Link, Node, Parent } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export function processMarkdown(markdown: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(() => (tree: Node) => {
      visit(tree, ['link', 'image'], (node: Node, index, parent: Parent | undefined) => {
        if (parent && index !== undefined) {
          if (node.type === 'link') {
            parent.children.splice(index, 1, ...(node as Link).children);
          } else if (node.type === 'image') {
            parent.children.splice(index, 1);
          }
        }
      });
    })
    .use(remarkStringify);

  // &#x20;と勝手にスペースがエスケープされてしまう
  return processor.process(markdown).then((result) => result.toString().replace(/&#x20;/g, ''));
}
