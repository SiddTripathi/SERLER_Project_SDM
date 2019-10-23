$("#search").submit(e => {
    e.preventDefault();
    let searchT = $("#searchTerm").val();
    let fromD = $('#dateFrom').val();
    let toD = $('#dateTo').val();
    if ((fromD < toD) || (!fromD) || (!toD) || (fromD === toD)) {
        $.ajax({
            method: "GET",
            url: `/search?describe=${searchT}&start=${fromD}&endDate=${toD}`,
            success: data => {

                if (!data.dataset) {
                    $("#errorResult").html("Results:" + data.error);
                    $("#results").show();
                } else {
                    data = data.dataset;
                    $("#errorResult").html("Results -");
                    $("#results").show();
                    let str = "";
                    data.forEach(d => {

                        str +=
                            "<tr>" +
                            "<td>" +
                            d.title +
                            "</td>" +
                            "<td>" +
                            d.author +
                            "</td>" +
                            "<td>" +
                            d.journal_name +
                            "</td>" +
                            "<td>" +
                            d.date +
                            "</td>" +
                            "<td>" +
                            d.research_ques +
                            "</td>" +
                            "<td>" +
                            d.method +
                            "</td>" +
                            "<td>" +
                            d.weblink +
                            "</td>" +
                            "</tr>";
                    });
                    $("#tbody").html(str);
                    $("#answer").show();
                }
            }
        });
    } else {
        $("#errorResult").html("Error: Date Range is not correct");
        $("#results").show();
    }
});
$('#bibText').submit(e => {
    e.preventDefault();
    let bibTxt = $("#bibTextBox").val();
    console.log(bibTxt)
    $.ajax({
        method: "GET",
        url: `/bibtextmethod?text=${bibTxt}`,
        success: data => {
            if (!data.dataset) {
                $("#errorResult").html("Results:" + data.error);

            } else {

                $("#errorResult").html("Results - Successful");

            }


        }

    });
});
let dropdown = $("#type");
dropdown.empty();
dropdown.append(
    '<option selected="true" disabled>Select your choice</option>'
);
let valueSearch = "";
$(document.body).on('change', '.typeFilter', function () {
    valueSearch = $(this).val();
    console.log(valueSearch);
    dropdown = $(this).parent().find('#type');
    if ((valueSearch === "method")) {
        $.getJSON("js/method.json", function (data) {
            dropdown.empty();
            $.each(data, function (key, entry) {
                dropdown.append(
                    $("<option></option>")
                        .attr("value", entry.method)
                        .text(entry.method)
                );
            });
        });
    } else if ((valueSearch === "participant")) {
        $.getJSON("js/participant.json", function (data1) {
            dropdown.empty();

            $.each(data1, function (key, entry) {

                dropdown.append(
                    $("<option></option>")
                        .attr("value", entry.participant)
                        .text(entry.participant)
                );
            });
        });
    } else if ((valueSearch === "benefit")) {
        $.getJSON("js/benefit.json", function (data2) {
            dropdown.empty();

            $.each(data2, function (key, entry) {

                dropdown.append(
                    $("<option></option>")
                        .attr("value", entry.benefit)
                        .text(entry.benefit)
                );
            });
        });
    }
});

$(document.body).on('click', '.addFilter', function () {
    // let cls = $(this).parent().attr('class');
    // console.log(cls)
    // let new_cls = 'f' + (parseInt(cls.substring(cls.length - 1)) + 1);
    // console.log(new_cls)
    $(".filters").append("<div class=f><select id='typeFilter' class=typeFilter>" +
        "<option>Choose a filter</option>" +
        "<option value = method>Method</option>" +
        "<option value = participant >Participant</option>" +
        "<option value = benefit> Benefit</option >" +
        "<option value=option>Option</option>" +
        "</select >" +
        "<select class=criteria>" +
        "<option>Choose Criteria</option>" +
        "<option value=contains>Contains</option>" +
        "<option value=equal>Is Equal To</option>" +
        "<option value=doesNotContain>Does Not Contain</option>" +

        "</select >" +
        "<select class=type id=type>" +
        '<option selected="true" disabled>Select your choice</option>' +
        "</select>" +
        "<select class=operator id=operator>" +
        "<option value=and selected=true>AND</option>" +
        "<option value=or>OR</option>" +
        "</select>" +
        " <button type=submit class=addFilter>" +
        "<span class='glyphicon glyphicon-plus'></span> Add" +
        "</button></div>");
})

$("#advancedSearch").click(() => {
    let filters = $(".filters").find(".f");
    let temp;
    let object = {
        "data": []
    };
    // console.log(filters)
    filters.each((_, element) => {

        // if (_ == $(element).siblings().length - 1) {
        //     temp = {
        //         "date1" :$('#dateFrom').val(),
        //         "date2" :$('#dateTo').val(),
        //         "type": $(element).find('.typeFilter').val(),
        //         "method": $(element).find('.criteria').val(),
        //         "value": $(element).find('#type').val()
        //     }
        // } else {
        temp = {
            "date1": $('#dateFrom').val(),
            "date2": $('#dateTo').val(),
            "type": $(element).find('.typeFilter').val(),
            "method": $(element).find('.criteria').val(),
            "value": $(element).find('#type').val(),
            "operator": $(element).find("#operator").val(),
        }

        object.data.push(temp);
    })
    $.ajax({
        method: "POST",
        url: "/advancedSearch",
        data: object,
        success: (data) => {
            data = data.dataset;
            $("#errorResult").html("Results");
            let str = "";
            data.forEach(d => {
                str +=
                    "<tr>" +
                    "<td>" +
                    d.title +
                    "</td>" +
                    "<td>" +
                    d.author +
                    "</td>" +
                    "<td>" +
                    d.journal_name +
                    "</td>" +
                    "<td>" +
                    d.date +
                    "</td>" +
                    "<td>" +
                    d.research_ques +
                    "</td>" +
                    "<td>" +
                    d.method +
                    "</td>" +
                    "<td>" +
                    d.weblink +
                    "</td>" +
                    "</tr>";
            });
            $("#tbody").html(str);
            $("#answer").show();
        }
    })
});

