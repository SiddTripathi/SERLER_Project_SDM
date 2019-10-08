// const messageOne = document.querySelector("#message-1");

// const article = document.querySelector("#article");
// const researchQues = document.querySelector("#research-ques");
// const benefit = document.querySelector("#benefit");

// const searchform = document.querySelector("form");
// const search = document.querySelector("input");

// searchform.addEventListener("submit", e => {
//   e.preventDefault();
//   const searchText = search.value;
//   messageOne.textContent = "Loading...";

//   fetch("/search?describe=" + searchText).then(response => {
//     response.json().then(data => {
//       if (data.error) {
//         console.log(data.error);
//         messageOne.textContent = data.error;
//       } else {
//         console.log(data);
//         let resultdata = JSON.stringify(data);
//         console.log(resultdata);
//         messageOne.textContent = "The result";
//         article.textContent = data.dataset.article_id;
//         researchQues.textContent = data.dataset.research_ques;
//         benefit.textContent = data.dataset.benefit;
//       }
//     });
//   });

//   console.log(searchText);
// });

$("#search").submit(e => {
  e.preventDefault();
  let searchText = $("#searchTerm").val();
  $.ajax({
    method: "GET",
    url: `/search?describe=${searchText}`,
    success: data => {
      if (!data.dataset) {
        $("#errorResult").html("Results:" + data.error);
        $("#results").show();
      } else {
        data = data.dataset;
        let str = "";
        data.forEach(d => {
          str +=
            "<tr>" +
            "<td>" +
            d.article_id +
            "</td>" +
            "<td>" +
            d.research_ques +
            "</td>" +
            "</tr>";
        });
        $("#tbody").html(str);
        $("#answer").show();
      }
    }
  });
});
