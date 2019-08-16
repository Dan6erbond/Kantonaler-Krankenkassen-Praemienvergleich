$.get('js/cantons.json', function(data) {
   cantons = JSON.parse(data);
}, 'text');

$(document).ready(function() {
  $(".canton").mouseenter(function() {
    for (var i in cantons) {
      canton = cantons[i];
      if (canton["code"] == $(this).attr("id")) {
        $("#canton_name").html("Kanton: " + canton["name"]);
        $("#canton_population").html("Einwohner: " + numberWithCommas(canton["population"]));
        $(".canton_dets img").attr("src", "img/coat_of_arms/" + canton["code"] + ".svg");
        break;
      }
    }
  });
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
