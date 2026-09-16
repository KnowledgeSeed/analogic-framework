# updateContent: teljes widgetkészlet és A/B elfogadási vizsgálat

Vizsgálat: 2026-09-10. Munkakönyvtár: `D:/Knowledgeseed/analogic-framework`.

## Értékelés

A framework módosítása a helyi, ellenőrzött esetekben **elfogadható**: mind az
50 beépített widgetosztálynak van működő tartalomfrissítési útja. A PageWidget
frissítése nem tölti újra a böngészőoldalt és nem építi újra a teljes oldal DOM-ját.
A beágyazott widgetek saját frissítésüket végzik, majd a konténer saját markupja
frissül. A tartalom, az ikonok, a HTML-osztályok és inline stílusok aktualizálódnak.

Ez nem minden létező alkalmazásra és konfigurációra szóló garancia. Az
alkalmazásspecifikus widgetek, külső bővítmények és éles TM1-folyamatok teljes
tesztkészlete nem állt rendelkezésre. A kiadás előtt ezek staging ellenőrzése
szükséges; a helyi vizsgálatban nem maradt ismert, reprodukálható blokkoló hiba
az alább tesztelt frissítési utakban.

## Mit jelent a morph?

A friss adatból előállított HTML összevetése a meglévő DOM-mal. A változó
attribútumokat és szöveget helyben módosítja, a megtartható elemeket megőrzi.
Nem tölti újra a CSS-fájlokat: a már betöltött CSS által formázott osztályok,
stílusok és tartalom változnak. Egy hiányzó CSS-fájl 404 hibáját nem oldja meg.

A külső könyvtár által kezelt DOM külön életciklust kap: a Chart-példányok és
canvasok megmaradnak, a Tabulator adata a saját API-ján frissül. A slider vagy
RichText konfigurációjának változása a saját pluginjának helyi újraépítését
igényelheti. A GridTable sorainak száma vagy rejtett oszlopainak szerkezete
változásakor csak az érintett tábla belseje épül újra, a táblát tartalmazó oldal
és a többi widget megmarad. Ez a kivétel az `allowFullContentUpdated` esetére is
érvényes; a korábbi sorhozzáfűzés nem kezelte helyesen a sortörlést és az új
cellák inicializálását.

## A/B vizsgálat

- **A:** `http://127.0.0.1:5000`, aktuális munkakönyvtár.
- **B:** `http://127.0.0.1:5001`, a kiszolgált `base/widget.js` normalizált
  SHA-256 lenyomata egyezik a `5383f65` commit fájljával. Tehát a B a morph
  előtti verzió, nem a későbbi `8b5a5ad` részleges megoldás.
- Valódi headless Microsoft Edge, a framework tényleges jQuery-, Chart-,
  noUiSlider- és Tabulator-könyvtáraival. A framework JS-válaszait nem cseréltük
  ki az A/B futtatásban.
- A B szigorúbb CSP-je miatt a fixture azonos eredetű script-URL-en kerül a
  tesztböngészőbe. A szerver biztonsági beállítása nem változott.
- A B-n nincs telepítve a `helloanalogic`. Az összehasonlító teszt ezért a B
  tesztböngészőjében az A-ról szolgálja ki kizárólag ugyanennek az alkalmazásnak
  a HTML-jét és saját erőforrásait; a framework továbbra is az 5001-ről érkezik.
  Ez alkalmazás-fixture-rel végzett kompatibilitási vizsgálat, nem a B-n
  telepített helloanalogic végpont teljes integrációs tesztje.

| Vizsgálat | A | B | Értelmezés |
| --- | --- | --- | --- |
| 50 widgetosztály frissítési auditja | 50 sikeres | 11 sikeres, 39 sikertelen | B-n 38 esetben a változó adatok nem változtatták meg az ellenőrzött kimenetet; egy esetben kivétel keletkezett |
| 15 eredeti regressziós eset | 15 sikeres | 4 sikeres, 11 sikertelen | A B hibáiból 5 az ott még nem létező belső morph/scroll segédmetódusokra vonatkozik; a többi tényleges viselkedési eltérés |
| 13 további állapot-/API-teszt | 13 sikeres | Nem pontozott | Aktív húzás, szerkesztés, események, API-kompatibilitás, táblák és konténerek |
| default kezdőoldal | 1 widget | 1 widget | Egyező kezdeti tartalom, HTML-osztályok, inline stílusok |
| helloanalogic kezdőoldal | 97 widget | 97 widget | Egyező kezdeti tartalom, HTML-osztályok, inline stílusok; B alkalmazás-fixture-rel |
| morphtest kezdőoldal | 93 widget | 93 widget | Egy érdemi kezdeti eltérés: a PasswordText korábbi `undefined` skinje `standard`; ez a befoglaló ősök összehasonlításában is látszik |
| Mintagombok és régi forceRefresh | Sikeres | Sikeres | Egy widget frissítése, teljes oldal tartalomfrissítése, helyi forceRefresh; nincs dokumentum-újratöltés |

Az 50 osztály auditja célzott, változó adatos lefedettség, nem minden widget
összes paraméterkombinációjának bizonyítása. A GridTable és GridTableCell
valódi, beágyazott cellás fixture-ben fut. A Pivot külső kommunikációja helyi
tesztválaszt kap; éles TM1-adatlekérés, írás és preset-kezelés nem igazolt ezzel.

Az A-n a `default` 1 és a `helloanalogic` 38 meglévő levélwidgetjének frissítése
is sikeres. A mintákban továbbra is vannak hiányzó alkalmazás-CSS-fájlok:
`default` alatt 5, `helloanalogic` alatt 3. Az A/B összehasonlításban azonos
alkalmazás esetén ezek a hibák megegyeznek. A tesztek nem mutattak új, nem kezelt
böngészős JavaScript-kivételt.

## Kompatibilitási ellenőrzések és javítások

- A meglévő `Api.updateContent(id)` és `Api.updateContentWithoutLoader(id)`
  hívások megmaradtak. A visszatérési érték `then`/`await` mellett a jQuery
  `done`/`fail` használatát is támogatja. Aszinkron hibánál is leáll a loader.
- A Container egységes `data, loader` és régi `event, data, loader` hívási
  formája egyaránt használható.
- A közös update nem üres többé; a beépített, speciális widgetek saját adaptert
  kaptak. Az alkalmazásból jövő adatstruktúrákat nem kell átírni. A diagramoknál
  a régi tömbös alak megmaradt, és a már feldolgozott objektum alak is elfogadott.
- Fókuszált input/select/textarea értéke, caretje, aktív inline szövegszerkesztés
  és RichText-draft megmarad. A jelszómező a korábbi működésnek megfelelően
  fókusz esetén is ürül.
- Megmarad a nyitott dropdown keresése, a popup horgonya/bezárt állapota, a
  kinyitott Swipe, a kördiagram elrejtett szelete és a Tabulator rendezése,
  kijelölése. A Light tábla aktív inputja és görgetési eleme is megmarad.
- Valódi egérhúzás közben a slider frissítése nem bontja le az aktív példányt;
  az új tartomány a felengedés után érvényesül.
- A frissítés a widget saját eseménykezelőit köti újra; az alkalmazás gombhoz
  rendelt saját eseményét megtartja. Az ismételt frissítés utáni kattintás egy
  widgetműveletet vált ki. A slider kapcsolt inputján is csak a saját handler
  cserélődik.
- A RichText megtartja a korábbi `#widgetId.richText` és közvetlen gyermek
  szelektorokat. A plugin rejtett textarea-jának duplikált widget-ID-ja megszűnt.
  Toolbar-konfiguráció váltásakor a plugin helyileg újraépülhet; puszta
  tartalomváltozásnál a meglévő editor marad.
- A `data-*` attribútumok mellett a jQuery adatcache is aktualizálódik. A
  dinamikus write állapotot mindkét helyen ellenőrzi a teszt.
- Változó testvérelemek beszúrása nem klónozza a védett canvas/Tabulator
  részfát; a kijelölési és plugin által hozzáadott runtime osztályok megmaradnak.

## Frissítés meglévő telepítésen

A forrásfájlok mellett a ténylegesen kiszolgált erőforrásokat kell frissíteni.
Normál, nem minifikált módban a framework ezeket a widget-JS-fájlokat használja.
A `SettingManager` betöltése új `cnf.version` értéket generál, amely szerepel
a JS/CSS URL-ekben. A frissített telepítés és folyamat újraindítása után az
újonnan megnyitott/újratöltött oldal az új kódot kapja. Egy már nyitott
böngészőlapba a szerveroldali csomagcsere önmagában nem tölti be az új JavaScriptet.

`useMinifiedAssets: true` esetén a telepítés saját minifikált bundle-jét is
újra kell építeni. Ebben a checkoutban nincs kiszolgálható `minified.js`
bundle vagy hozzá tartozó build-folyamat; ezt a kiadási módot nem igazolta
a helyi böngészős vizsgálat.

Egyedi `Widget` leszármazottnál, amely eddig az üres alap-`updateHtml` működésére
támaszkodott, a közös frissítés most először meghívhatja a `getHtml()`-t. Külső
plugin esetén annak adapterét/staging viselkedését külön ellenőrizni kell; saját
`updateHtml` felülírással a plugin életciklusa továbbra is szabályozható.

## Reprodukálhatóság

A Playwright és az Edge telepítése mellett, futó frameworkön:

```powershell
$env:NODE_PATH = 'C:/Users/marti/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
node cypress/morph-review.cjs
node cypress/morph-state-review.cjs
node cypress/widget-refresh-audit.cjs
node cypress/morph-ab-review.cjs
```

A B regressziójához az `ANALOGIC_TEST_URL=http://127.0.0.1:5001` és külön
`MORPH_RESULTS_DIR=logs/morph-review/B` környezeti változók használhatók.
A B hibás/hiányzó funkciói miatt a regressziós parancs nem nulla kóddal lép ki.

Eredmények: `logs/morph-review/morph-regression.json`,
`morph-state-regression.json`, `widget-refresh-audit.json`, a `B` alkönyvtár,
valamint `AB/comparison.json` és az A/B képernyőképek. Ezek tesztartefaktumok,
a logs könyvtár git által figyelmen kívül hagyott.

A módosított JavaScripteken `node --check`, a diffen `git diff --check` futott.
Négy meglévő Python unittest-modul összesen **9 tesztje sikeres**, külön
folyamatokban. Együttes importálásuknál a meglévő `test_create_new_app` modul
globális import-stubjai 3 hitelesítési tesztet megzavarnak; külön folyamatban
mindhárom sikeres. A venv-ben nincs pytest, ezért a unittest futtatóval történt
az ellenőrzés. A teljes Cypress üzleti folyamatcsomag nem futott: a helyi
Cypress-futtató nincs telepítve; ezt nem helyettesíti a fenti widgetteszt-csomag.
