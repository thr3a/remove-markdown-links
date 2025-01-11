import { describe, expect, it } from 'vitest';
import { processMarkdown } from './markdownProcessor';

describe('processMarkdown', () => {
  it('リンクが削除されていること', async () => {
    const input = 'This is a [link](https://example.com) to a website.';
    const expected = 'This is a link to a website.\n';
    const result = await processMarkdown(input);
    expect(result).toBe(expected);
  });

  it('画像が削除されていること', async () => {
    const input = 'This is an image: ![alt text](image.jpg)';
    const expected = 'This is an image:\n';
    const result = await processMarkdown(input);
    expect(result).toBe(expected);
  });

  it('リンクと画像同時削除できていること', async () => {
    const input = 'This is a [link](https://example.com) and an ![image](image.jpg).';
    const expected = 'This is a link and an .\n';
    const result = await processMarkdown(input);
    expect(result).toBe(expected);
  });

  it('削除対象なくても動作すること', async () => {
    const input = 'This is a simple text with no links or images.';
    const expected = 'This is a simple text with no links or images.\n';
    const result = await processMarkdown(input);
    expect(result).toBe(expected);
  });

  it('コードブロック内は削除対象ではないこと', async () => {
    const input = '```\n[link](https://example.com)\n![image](image.jpg)\n```';
    const expected = '```\n[link](https://example.com)\n![image](image.jpg)\n```\n';
    const result = await processMarkdown(input);
    expect(result).toBe(expected);
  });
});
