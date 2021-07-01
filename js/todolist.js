$(function () {
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "")
                alert("请输出事件");
            else {
                var date = getDate();
                date.push({ title: $(this).val(), done :false });
                saveDate(date);
                load();
                $(this).val("");
            }
        }
    })
    $("ul, ol").on("click", "input", function () {
        var date = getDate();
        var index = $(this).siblings('a').attr("id");
        date[index].done = $(this).prop("checked");
        saveDate(date);
        load();
    })
    $("ul, ol").on("click", "a", function () {
        var date = getDate();
        var index = $(this).attr("id");
        date.splice(index, 1);
        saveDate(date);
        load();
    })
    function getDate() {
        var date = localStorage.getItem("todolist");
        return date === null ? [] : JSON.parse(date);
    }
    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date));
    }
    function load() {
        var date = getDate();
        $("ul, ol").empty();
        $.each(date, function (i, e) {
            if (e.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + e.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
            } else {
               $("ol").prepend("<li><input type='checkbox' > <p>" + e.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
            }
        })
        $("#todocount").text($("ol").find("li").length);
        $("#donecount").text($("ul").find("li").length);
    }
})