type ArticleMetada = {
  author: string[];
  title: string;
  description: string[];

  /** Unix timestamp for the article's publication date. */
  publication: number;

  /** URI for the article content. It shall be a markdown file. */
  rel: string[];

  /** Tags used to group related articles together. */
  tags: string[];
};
