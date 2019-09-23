const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const searchform = document.querySelector("form");
const search = document.querySelector("input");

searchform.addEventListener("submit", e => {
  e.preventDefault();
  const searchText = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/search?describe=" + searchText).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        let resultdata = JSON.stringify(data);
        messageOne.textContent = data.dataset.article_id;
        messageTwo.textContent = data.dataset.benefit;
        messageThree.textContent = data.dataset.summary;
      }
    });
  });
  console.log(searchText);
});
