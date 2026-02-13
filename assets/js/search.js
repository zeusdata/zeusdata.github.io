let idx;
let posts = [];

fetch("/search.json")
  .then(response => response.json())
  .then(data => {
    posts = data;

    idx = lunr(function () {
      this.ref("url");
      this.field("title");
      this.field("content");
      this.field("date");

      posts.forEach(post => this.add(post));
    });
  });

document.getElementById("search-input")?.addEventListener("input", (e) => {
  const query = e.target.value;
  const results = document.getElementById("search-results");
  results.innerHTML = "";

  if (query.trim().length === 0) return;

  const matches = idx.search(query);

  matches.forEach(m => {
    const item = posts.find(p => p.url === m.ref);
    const li = document.createElement("li");

    li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
    results.appendChild(li);
  });
});
