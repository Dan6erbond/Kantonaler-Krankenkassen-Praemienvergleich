var gmailToken = "811bbc2a-cb0f-4ea4-ba47-e6d2852b776a";
var outlookToken = "20311b23-621e-471c-b477-8b30abf9a513";
var elasticToken = "975da826-c293-4aa5-a6ca-6639dffe9130";

$.get('js/cantons.json', function(data) {
  cantons = JSON.parse(data);
  var searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("canton")) {
    var canton = searchParams.get("canton");
    var canton_found = false;
    for (var i in cantons) {
      c = cantons[i];
      if (c["code"] == canton) {
        $("#canton_flag").attr("src", "img/coat_of_arms/" + c["code"] + ".svg");
        $("#canton_name").html("Kanton " + c["name"]);
        $("#sparpotenzial_title").html("Sparpotenzial im Kanton " + c["name"]);
        $("#canton_image").css("background-image", 'url("img/landscape/' + c["code"] + '.jpg")');

        $("#sparen").html(`Sparen Sie bis zu CHF ${c["adult-yearly-savings"]} jährlich!`)

        selectAdults();

        canton_found = true;
        break;
      }
    }
    if (!canton_found) {
      document.location.href = "/404.html";
    }
  } else {
    document.location.href = "/404.html";
  }
}, 'text');

function selectAdults() {
  $("#button_adults").addClass("selected");
  $("#button_teens").removeClass("selected");
  $("#button_kids").removeClass("selected");

  $("#comparison-title").html("<b>Erwachsene ab 26 Jahre:</b>");

  $("#prices").html(c["adult-prices"]);

  $("#monthly-savings").html(`Monatliches Sparpotenzial: <b>CHF ${c["adult-monthly-savings"]}</b>`);
  $("#yearly-savings").html(`Jährliches Sparpotenzial: <b>CHF ${c["adult-yearly-savings"]}</b>`);

  $("#franchise").html("Berechnung mit CHF 1'500.00 Franchise, ohne Unfalldeckung.");
}

function selectTeens() {
  $("#button_adults").removeClass("selected");
  $("#button_teens").addClass("selected");
  $("#button_kids").removeClass("selected");

  $("#comparison-title").html("<b>Jugendliche (19-26 Jahre):</b>");

  $("#prices").html(c["teen-prices"]);

  $("#monthly-savings").html(`Monatliches Sparpotenzial: <b>CHF ${c["teen-monthly-savings"]}</b>`);
  $("#yearly-savings").html(`Jährliches Sparpotenzial: <b>CHF ${c["teen-yearly-savings"]}</b>`);

  $("#franchise").html("Berechnung mit CHF 1'500.00 Franchise, ohne Unfalldeckung.");
}

function selectKids() {
  $("#button_adults").removeClass("selected");
  $("#button_teens").removeClass("selected");
  $("#button_kids").addClass("selected");

  $("#comparison-title").html("<b>Kinder bis 18 Jahre:</b>");

  $("#prices").html(c["kid-prices"]);

  $("#monthly-savings").html(`Monatliches Sparpotenzial: <b>CHF ${c["kid-monthly-savings"]}</b>`);
  $("#yearly-savings").html(`Jährliches Sparpotenzial: <b>CHF ${c["kid-yearly-savings"]}</b>`);

  $("#franchise").html("Berechnung mit CHF 0.00 Franchise, mit Unfalldeckung.");
}

function send() {
  try {
    var vorname = $("#first-name").val();
    var nachname = $("#last-name").val();
    var subject = `Neue Anfrage von ${vorname} ${nachname}!`;

    var email = $("#email").val();
    var phone = $("#phone").val();

    var street = $("#street").val();
    var zip = $("#zip").val();
    var area = $("#area").val();

    var birthday = $("#birthday").val();
    var people = $("#people").val();

    var options = [];
    if ($("#cheap-offer").is(":checked")){
      options.push("Günstige Prämien");
    }
    if ($("#international-coverage").is(":checked")){
      options.push("Auslanddeckung");
    }
    if ($("#alternative-medicine").is(":checked")){
      options.push("Alternativmedizin");
    }
    if ($("#sports").is(":checked")){
      options.push("Sport & Fitness");
    }
    if ($("#free-doctor").is(":checked")){
      options.push("Freie Arztwahl");
    }
    if ($("#private").is(":checked")){
      options.push("Halbprivat oder Privat");
    }
    if ($("#family-rebates").is(":checked")){
      options.push("Rabatte für Familien");
    }
    if ($("#dental").is(":checked")){
      options.push("Zahnversicherung");
    }

    var body =
`<b>E-Mail:</b> ${email}<br>
<b>Telefon Nr:</b> ${phone}<br><br>
<b>Adresse:</b> ${street}, ${zip} ${area}<br>
<b>Kanton:</b> ${c["name"]}<br><br>
<b>Geburtsdatum:</b> ${birthday}<br>
<b>Personen im Haushalt:</b> ${people}<br>
<b>Geschlecht:</b> ${$("#male").is(":checked") ? "Männlich" : "Weiblich"}<br><br>
<b>Optionen:</b> ${options.join(", ")}`;

    if (email.includes("@") && email.split("@")[1].includes(".")) {
      if (!document.location.href.includes("127.0.0.1")){
        Email.send({
          SecureToken: outlookToken,
          To: "kantonalerpraemienvergleich@hotmail.com",
          From: "kantonalerpraemienvergleich@hotmail.com",
          Subject: subject,
          Body: body
        }).then(
          function (message) {
            if (message == "OK") {
              alert("Nachricht erfolgreich gesendet!");
            } else {
              alert("Mail konnte nicht abgesendet werden, bitte kontaktieren Sie termine@wds-schweiz.ch.");
              console.log(message);
            }
          });
      } else {
        console.log(`Subject:\n${subject}`);
        console.log(`Body:\n${body}`);
      }
    } else {
      alert("Bitte geben Sie eine gültige E-Mail Adresse ein!");
    }
  } catch (e) {
    console.log(e);
  } finally {

  }
}
