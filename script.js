// =====================
// EINSTELLUNGEN
// =====================

const API_URL = "  ";

const AKTUALISIERUNG = 5000;



// =====================
// DATEN LADEN
// =====================

async function ladeTabelle() {

    try {

        const antwort = await fetch(
            API_URL + "?t=" + Date.now()
        );


        const daten = await antwort.json();



        zeigeTabelle(
            daten.gruppeA,
            "gruppeA"
        );


        zeigeTabelle(
            daten.gruppeB,
            "gruppeB"
        );



        zeigeSpielplan(
            daten.spielplan,
            "spielplan"
        );


        zeigeKORunde(
            daten.koRunde,
            "koRunde"
        );


    } catch (fehler) {

        console.error(
            "Fehler beim Laden:",
            fehler
        );

    }

}



// =====================
// LIVE TABELLE
// =====================

function zeigeTabelle(daten, zielID) {

    let html = "";


    daten.forEach(zeile => {


        if (
            !zeile[1] ||
            zeile[1].toString().trim() === ""
        ) {
            return;
        }



        html += `

        <tr>

            <td>${zeile[0] ?? ""}</td>

            <td>${zeile[1] ?? ""}</td>

            <td>${zeile[2] ?? ""}</td>

            <td>${zeile[3] ?? ""}</td>

            <td>${zeile[4] ?? ""}</td>

            <td>${zeile[5] ?? ""}</td>

                         <td>${(zeile[6] ?? "") + " : " + (zeile[7] ?? "")}</td>

                <td>${zeile[8] ?? ""}</td>             

            <td>${zeile[9] ?? ""}</td>

            <td>${zeile[10] ?? ""}</td>

        </tr>

        `;

    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}



// =====================
// ERGEBNIS FORMATIEREN
// =====================

function erstelleErgebnis(heim, gast) {


    if (
        heim === "" ||
        gast === "" ||
        heim == null ||
        gast == null
    ) {

        return "";

    }



    let heimTore = Number(heim);

    let gastTore = Number(gast);



    if (heimTore > gastTore) {


        return `
            <b>${heimTore}</b> : ${gastTore}
        `;


    } else if (gastTore > heimTore) {


        return `
            ${heimTore} : <b>${gastTore}</b>
        `;


    } else {


        return `
            ${heimTore} : ${gastTore}
        `;

    }

}



// =====================
// SPIELPLAN
// =====================

function zeigeSpielplan(daten, zielID) {

    let html = "";


    daten.forEach(zeile => {


        if (
            !zeile[0] ||
            zeile[0].toString().trim() === ""
        ) {
            return;
        }



        let ergebnis =
            erstelleErgebnis(
                zeile[5],
                zeile[6]
            );



        html += `

        <tr>

            <td>${zeile[0] ?? ""}</td>

            <td>${zeile[1] ?? ""}</td>

            <td>${zeile[2] ?? ""}</td>

            <td>${zeile[3] ?? ""}</td>

            <td>${zeile[4] ?? ""}</td>

            <td>${ergebnis}</td>

            <td>${zeile[7] ?? ""}</td>

        </tr>

        `;


    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}



// =====================
// K.O.-RUNDE
// =====================

function zeigeKORunde(daten, zielID) {

    let html = "";


    html += `

    <tr class="runde-titel">

        <td colspan="7">
            Halbfinale
        </td>

    </tr>

    `;



    daten.forEach((zeile, index) => {



        if (!zeile[0]) {
            return;
        }



        if (index === 2) {


            html += `

            <tr class="runde-titel">

                <td colspan="7">
                    Finale
                </td>

            </tr>

            `;

        }



        let ergebnis =
            erstelleErgebnis(
                zeile[8],
                zeile[9]
            );



        html += `

        <tr>

            <td>${zeile[0] ?? ""}</td>

            <td>${zeile[4] ?? ""}</td>

            <td>${zeile[5] ?? ""}</td>

            <td>${zeile[6] ?? ""}</td>

            <td>${zeile[7] ?? ""}</td>

            <td>${ergebnis}</td>

            <td>${zeile[10] ?? ""}</td>

        </tr>

        `;


    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}



// =====================
// START
// =====================


ladeTabelle();



setInterval(
    ladeTabelle,
    AKTUALISIERUNG
);