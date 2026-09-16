# updateContent morph review — 2026-09-09

> **Történeti jelentés.** Ez az első, részleges javítás felülvizsgálatát írja le.
> A későbbi, minden widgetosztályra kiterjesztett megoldás és az 5000/5001-es
> A/B ellenőrzés aktuális értékelése: [elfogadási jelentés](updatecontent-all-widgets-acceptance.md).
> Az alábbi „üres alap-update” és támogatási korlátozások a korábbi állapotra vonatkoznak.

## Eredmény

A vizsgált alap a `8b5a5ad` commit (`martin_updatecontent_morph`). A mellékelt
összefoglaló jó irányt ír le, de a megoldás még tartalmazott reprodukálható
hibákat. A munkakönyvtárban ezeket célzottan javítottam.

**Nem általános, minden widget minden stílusát frissítő megoldás.** Az 50
widgetosztályból 31 örökli az üres `Widget.updateHtml()` metódust. A Popup saját
metódusa szintén üres; a Container ezt vagy a Swipe viselkedését delegálja.
Ezeket kompatibilitási okból nem kapcsoltam át automatikusan morphra.

Az `updateContent` nem CSS-fájlokat tölt újra: a meglévő stíluslapok által
formázott HTML-t, osztályokat és inline stílusokat kell aktualizálnia. A
`forceRefresh` widget-DOM-ot épít újra, nem feltétlenül az egész böngészőoldalt.
A hiányzó CSS-fájl HTTP 404 hibája ettől külön probléma.

## Javított hibák

| Eset | Korábbi viselkedés | Javítás |
| --- | --- | --- |
| Dinamikus `data-action`, `data-ordinal` | A jQuery cache a régi eseményadatot adta vissza | Változó és törölt data-attribútumok cache-ének szinkronizálása |
| Fókuszban lévő, még nem szerkesztett input | A value attribútum átírása megváltoztatta az élő értéket | Érték, checked, kijelölés megőrzése az attribútum- és gyermekfrissítés körül |
| Fókuszban lévő select | Az option-frissítés átállította a kijelölést | Kijelölés visszaállítása a gyermekek frissítése után |
| Védett elem eltérő szerkezetben | A védett leszármazott az ősével együtt eltűnhetett; kihagyott védett testvér elnyelte a következő új elemet | Védelem a teljes érintett részfára, külön bejárási kurzor |
| Szövegcella aktív inline szerkesztése | Az input törlése blur-kezelőt futtatott; `replaceChild` kivétel is keletkezett | A szerkesztett cím ideiglenes morph-védelme és szerkesztési osztályainak megtartása |
| Táblacella saját gyökere | A template-ID és a példány-ID különbsége miatt a morph teljesen kimaradt | Saját példányhoz tartozó tényleges DOM-ID felismerése |
| Táblacella kijelölése és navigációja | A ténylegesen lefutó morph törölné a runtime osztályokat és koordinátákat | `selected`, `active-cell`, `data-row`, `data-col` megőrzése |
| Readonly állapotra váltó toggle | A már bekötött kattintás továbbra is átkapcsolta | Aktuális readonly állapot ellenőrzése kattintáskor; kezdetben readonly elem később is aktiválható |
| Több azonos osztályú scroll-pane | Mindegyik az utolsó pane pozícióját kapta | Külön pane-index tárolása; visszaállítás esemény-inicializálás után |

## Tesztelés és bizonyíték

Valódi helyi Flask framework, headless Microsoft Edge, valódi widgetosztályok,
jQuery, Chart és Tabulator könyvtárak. Az önálló fixture helyi Repository
loadereket használ; nem igényel TM1-szervert vagy a nem commitolt `apps/morphtest`
alkalmazást. A framework a vizsgálatkor a `http://127.0.0.1:5000` címen futott.

- **15/15 célzott regressziós teszt sikeres.** Ugyanez a tesztsor a javítás
  előtti HEAD-del **9 hibát** jelez. Az A/B teszt csak a böngészőben kiszolgált
  JS-válaszokat cseréli `git show` tartalomra; nem módosítja a checkoutot.
- A tesztek között van tényleges `Api.updateContentWithoutLoader`, ismételt
  oda-vissza adatváltás és összehasonlítás friss `getHtml()` DOM-mal, élő
  formérték, eseményadat-cache, cellabőr/háttér, beágyazott node-azonosság,
  readonly toggle, nyitott dropdown, jelszómező törlése.
- **Valódi GridTable force refresh:** 500 px széles pane, 2400 px minimális
  tartalomszélesség, 430 px vízszintes pozíció. A belső DOM valóban lecserélődik,
  a 430 px pozíció megmarad. Az overflow-t tesztstílus biztosítja.
- **50/50 osztály auditja:** 19 saját/delegált frissítési úttal lefutó eset,
  31 korábbi üres alapmetódust használó eset. Az utóbbiak sikeres betöltése
  és változatlan DOM-ja **nem jelent teljes tartalomfrissítési támogatást**.
- A `default` app 1, a `helloanalogic` 38 meglévő levélwidgetjén futott frissítés.
  Minden hívás sikeres a javítás előtt és után. A konzolban ugyanaz az 5,
  illetve 3 meglévő CSS-404 szerepelt; nem jelentkezett új hiba.
- `git diff --check` sikeres. A módosított JS-fájlokon Node szintaktikai
  ellenőrzés futott. Backend tesztsor nem volt indokolt: Python-kód nem változott.

## Widgetenkénti következtetés

| Csoport | Widgetek | Következtetés |
| --- | --- | --- |
| Morph | Text, Image, Button, Toggle, TextBox, TextArea, GridTableCell, GridTableHeaderCell | Célzott frissítési és regressziós tesztek; a cellák saját gyökerének hibája javítva |
| Hibrid | DropBox | A lista saját frissítése megmarad; nyitott panel és beírt keresés ellenőrizve. Nem minden getHtml-stílus szerepel a kézi patchben |
| Biztonsági speciális eset | PasswordText | A fókuszban lévő jelszó is törlődik frissítéskor |
| Chart frissítés | StackedColumnChart, LineAreaChart, LineScatterCombo, ComboChart | Valódi chart-példánnyal frissítve; canvas és chart azonossága megmarad. Külső wrapper/legend összes stílusának frissítését ez nem garantálja |
| Táblák | GridTable, GridTableLight, GridTablePlus | Saját frissítési utak megmaradnak; Light továbbra is belső DOM-ot cserél; Plus Tabulatort használ |
| Konténer | Container, Popup | Szándékosan változatlan delegálás/üres update; nincs általános konténer-morph |
| Üres alap-update | DatePicker, Gauge, GridCell, GridRow, Grid, GridTableHeaderRow, HistogramComboChart, HorizontalBarChart, HorizontalTable, ActionButtonRow, DeleteButtonRow, RadioButtonRow, ImageUpload, Page, Panel, PieChart, PivotTable, RadarChart, RichText, ScrollTable, SegmentedBar, SegmentedControlItem, SegmentedControl, Shadow, SimulationPanelSlider, SimulationPanel, Slider, Swipe, TornadoChart, VerticalLineBox, WaterFall | Meglévő működés megtartva. Ezek saját tartalmára nem szabad teljes updateContent támogatást feltételezni; a gyerekek vagy az egyedi widget-API ettől még frissülhetnek |

## Kompatibilitás és további irány

A közös alap-update marad üres; az API-aláírások és a konfigurációs szerkezet
nem változtak. A javítás a már morphra átállított útvonalakat teszi biztonságosabbá.
A jelszó-, chart-, Tabulator- és popup-életciklusok nincsenek generikus DOM-cserére
átkapcsolva. A meglévő nem commitolt felhasználói fájlokat nem töröltem.

A teljes widgetkészlethez **widgetenkénti hibrid megoldás** indokolt: a framework
által előállított markupot frissíteni, a külső könyvtárak tartalmát saját API-jukon
kezelni. A dropdown további stílusai, diagram-wrapperek/legendák, a Light szerkesztési
állapota, illetve a 31 üres update külön fejlesztési scope. Egy globális
`Widget.updateHtml = morph(getHtml())` visszamenőleges kompatibilitási kockázat.

A morph jelenleg nem általános keyed virtual DOM és nem tudja automatikusan
megkülönböztetni az összes külső script által beszúrt class/style állapotot a
template állapotától. A konkrét szerkesztési és cellaállapotokat kezeli; tetszőleges
alkalmazási DOM-manipuláció és az összes éles konfiguráció kompatibilitása nincs
bizonyítva. A scroll-pane index egyező paneszerkezetet feltételez; jelentősen
átalakult struktúra vagy aszinkron Tabulator-építés külön ellenőrzést igényel.

## Újrafuttatás

Előfeltételek: futó helyi framework a sample appokkal, Node.js, elérhető
`playwright` modul és telepített Microsoft Edge. A `NODE_PATH` beállítható a helyi
Playwright-ot tartalmazó `node_modules` könyvtárra. A tesztek nem telepítenek csomagot.

```powershell
node cypress/morph-review.cjs
node cypress/widget-refresh-audit.cjs

# Opcionális A/B: a célzott teszt itt szándékosan nem nulla exit kódot ad.
$env:MORPH_BASELINE = '8b5a5ad'
node cypress/morph-review.cjs
node cypress/widget-refresh-audit.cjs
Remove-Item Env:MORPH_BASELINE
```

Másik szerverhez: `ANALOGIC_TEST_URL`. Géppel olvasható eredmények:
`logs/morph-review/morph-regression*.json` és
`logs/morph-review/widget-refresh-audit*.json`.
