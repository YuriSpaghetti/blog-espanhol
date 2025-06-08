/// <reference path="types.d.ts" />

/** @returns {ArticleMetada[]} */
async function getMetadata() {
	return await fetch("content/metadata.json").then(r => r.json());
}

async function loadHomePage() {
	let metadata = await getMetadata();
	metadata = metadata.sort(
		(a, b) =>  {return b.publication - a.publication}
	);

	const articleCardTemplate = Handlebars.compile(document.querySelector("#template-article-card").innerHTML)
	const articleCardSlot = document.querySelector("#article-socket")

	for (let article of metadata) {
		article.publication = new Date(article.publication * 1000).toLocaleDateString()
		articleCardSlot.innerHTML += articleCardTemplate(article);
	}
}

function getQueryParameters() {
	const matches = window.location.search.matchAll(/\??(.*?)=(.*?)(?:&|$)/g);
	const result = {};
	for (let match of matches) {
		result[match[1]] = match[2]
	}
	return result
}

async function loadArticle() {
	const metadata = await getMetadata();
	const {id} = getQueryParameters();
	const articleMetadata = metadata.find(a => a.id == id);

	const article = document.querySelector("#article");
	const template = Handlebars.compile(article.innerHTML);

	articleMetadata.content = marked.parse(await fetch(articleMetadata.rel).then(r => r.text()));
	articleMetadata.publication = new Date(articleMetadata.publication * 1000).toLocaleDateString();
	article.innerHTML = template(articleMetadata);

	hljs.highlightAll();
}

const header = fetch("header.html").then(r => r.text())
document.addEventListener("DOMContentLoaded", 
	async () => {
		document.querySelector("#navbar").outerHTML = await header;
	}
)
