$.get('js/cantons.json', function(data) {
   cantons = JSON.parse(data);
   cantons.sort((a, b) => (a.name > b.name) ? 1 : -1)
   for (var i in cantons) {
     canton = cantons[i];
     /*<a href="canton.html?canton=AG">
       <li>
         <img src="img/coat_of_arms/AG.svg" alt="">
         <span>Kanton Aargau</span>
       </li>
     </a>*/
     var a = $("<a>", {href: "canton.html?canton=" + canton["code"]});
     var li = $("<li>");
     var img = $("<img>", {src: "img/coat_of_arms/" + canton["code"] + ".svg"});
     var span = $("<span>");
     span.html("Kanton " + canton["name"]);
     li.append(img);
     li.append(span);
     a.append(li);
     $("#canton_buttons").append(a);
   }
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
