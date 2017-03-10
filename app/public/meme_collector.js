const filterInvalid = function(settings, data, dataIndex) {
  const table = $('.table').DataTable();
  const $row = table.rows(dataIndex).nodes().to$().first();
  const validMeme = !$row.attr('data-valid') || $row.data('valid');
  const validOnlyCheckBox = $('#valid_only');

  return validOnlyCheckBox.is(':checked') ? validMeme : true;
};

$.fn.dataTable.ext.search.push(filterInvalid);


const dataTableConfiguration = {
  "pageLength": 50,
  "dom": "<iftlpi>",
  "columnDefs": [{ "width": "40%", targets: "limited"}],
  "scrollX": "true",
  "scrollY": "50vh",
  "select": "single",
  "autoResize": false
};

$(document).ready(function () {
  const table = $('.table').DataTable(dataTableConfiguration);

  $('#valid_only').change(() => table.draw());

  table.on("select", function (e, dt, type, indexes) {
    if (type === "row") {
      const memeURL = table.rows(indexes).nodes().to$().find("a.action").attr("href");
      $("#meme_view").attr("src", memeURL);
    }
  });
});