/// <reference path="types.d.ts" />

/** @type {ArticleMetada[]} */
const metadata = await fetch("/content/metadata.json").then(r => r.json());

async function main() {
  for (let article of metadata) {
    const contentMD = await fetch(article.rel).then(r => r.text());

    document.body.innerHTML += `
      <article>
        <div>
          Authors: ${article.author.join(', ')}
          Published: ${new Date(article.publication * 1000).toLocaleDateString()}
        </div>
        <br>
        ${marked.parse(contentMD)}
      </article>
    `
  }
}

//main();
