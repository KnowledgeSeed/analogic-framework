# Új analogic verzió kiadása: teendők

Ez a lista minden új framework verziónál (pl. 4.1.111) érvényes. A rendszer működése:
`seeder` repó, `planning/framework-release-masterdata-sync-mukodes.md`.

A lényeg: a framework verziót és a hozzá tartozó **masterdata** leírásokat (widgetek, opciók, események, `Api.*`,
`Utils.*`) a **Seeder Portal** szolgálja ki a Seedereknek. A CI feltölti a masterdatát és **draftként** regisztrálja a
verziót, **egy superadmin hagyja jóvá** a portálon, utána a Seederek maguktól átveszik.

## 1. Fejlesztés közben: a masterdata karbantartása

Ha a változtatásod új vagy átnevezett dolgot vezet be, a `masterdata/` mappát is frissíteni kell **ugyanabban a PR-ban**:

| Változás | Frissítendő fájl |
|---|---|
| új vagy átnevezett widget opció (`getRealValue('név', ...)`) | `widgets.json` (a widget `parameters` listája) |
| új widget | `widgets.json`, `sub_widgets.json`, `widget_events.json` |
| új `Api.*` függvény | `api_functions.json`, `api_functions_arguments.json`, `api_functions_descriptions.json` |
| új `Utils.*` függvény | `utils_functions.json` |
| új widget esemény | `widget_events.json` (az eseményeket kézzel kell felvenni) |
| kivett opció / függvény | töröld a masterdatából is (a Preview eltávolításként jelzi, a Studio figyelmeztet) |

Ellenőrzés helyben (a CI is ezt futtatja minden PR-on a `CI Build` workflow-ban és a `pytest`-ben):

```bash
python tools/masterdata/build_masterdata.py --check
```

- Hibát ad, ha a framework forrása és a masterdata eltér (nem dokumentált opció, hiányzó vagy felesleges `Api`/`Utils` függvény, hiányzó argumentum- vagy leírás-bejegyzés, ismeretlen widget, nem található esemény).
- A `masterdata/drift_baseline.json` a korábbról elfogadott hiányokat tartja nyilván, és **csak csökkenhet**: ha dokumentálsz egy opciót, vedd ki a baseline-ból is (`--update-baseline` újraírja a `widgets` és `undocumentedWidgets` részt; az `externalWidgets` és az `events` kézzel karbantartott).
- Extension widget (másik repóban) a baseline `externalWidgets` listájába kerül.

## 2. Kiadás előtt

1. Emeld a verziót az `analogic/version.config` fájlban (a szokásos „version change to 4.1.x" commit).
2. A PR a `main`-be mehet, ha a `CI Build` zöld (ez tartalmazza a masterdata validálást is).
3. Ha **nem változott a masterdata**, nincs teendő vele: ugyanaz a revision jön létre, nem keletkezik új csomag.

## 3. A kiadás (GitHub Actions, kézi indítással)

Válaszd a megszokott workflow-t:

- **Publish To PyPI and Dockerhub** (PyPI + Docker image), vagy
- **Publish To PyPI**.

Mindkettő ebben a sorrendben fut, és a masterdata hibája **még a publikálás előtt** megállítja:

1. verzió beolvasása a `version.config`-ból;
2. **masterdata validálás és csomag építés** (`build_masterdata.py --out dist-masterdata`), hibánál a kiadás megáll, semmi nem publikálódik;
3. Python build, PyPI feltöltés (és Docker push);
4. **a csomag feltöltése a portálra és a verzió draftként való regisztrálása** (`register_framework_release.sh`).

A workflow-k a `PORTAL_FRAMEWORK_RELEASE_API_KEY` GitHub secretet használják (ugyanaz az érték, mint a portál `FRAMEWORK_RELEASE_API_KEY`-e). A `Publish To TestPyPI` workflow-ra ez nem vonatkozik, az nem regisztrál a portálon.

Ha a regisztráló lépés elbukott (a PyPI-ra már kikerült a verzió), **ne publikáld újra** a csomagot: indítsd el a **Register Framework Release** workflow-t (üres verzióval a `version.config` verzióját használja). Ugyanez a pótlás útja, ha később szeretnél egy korábbi verziót felvenni.

## 4. Jóváhagyás a portálon (superadmin)

Seeder Portal → **Admin → Framework Releases**:

1. A **draft** sorban a **Preview** megmutatja, mi változik az utolsó published release-hez képest: új/eltávolított widgetek, opciók, események, Api és Utils függvények. Ha valami **el lett távolítva**, sárga figyelmeztetést kapsz (az azt használó appok a Studióban figyelmeztetést kaphatnak). Ha a masterdata azonos az utolsó published verzióéval, az ablak ezt írja ki.
2. **Publish**: ettől lesz látható a verzió a Seedereknek. A publikálás csak akkor megy, ha a verzióhoz van eltárolt csomag.
3. Ha egy verzió hibás: **Revoke**. A Seeder `unsupported` jelzést ad az azt használó appokra.
4. Ritkán: a táblázat feletti legördülőben a **minimum supported version** állítható (csak published verzió lehet, és a minimumként kijelölt verzió addig nem vonható vissza).

## 5. Publikálás után

- A Seederek legfeljebb kb. **20 percen belül** letöltik és használják; egy Seeder újraindítása azonnal frissít.
- Ellenőrzés egy Seederen: az új verzió megjelenik az „Új projekt" és az alkalmazás-verzió szerkesztő legördülőjében, és a `/masterdata/<verzió>/api_functions.json` kiszolgálja a fájlt.
- **A Seeder repóban** (ha új Seeder kiadás is készül): frissítsd a vele szállított tartalék masterdatát és verzió-listát, hogy offline is naprakész legyen:
  ```bash
  python scripts/refresh_bundled_masterdata.py --portal
  ```
  (`SEEDER_PORTAL_*` környezeti változók és a publikus kulcs kell hozzá; a változásokat commitold.)

## 6. Gyakori helyzetek

| Helyzet | Teendő |
|---|---|
| a CI validáció elbukik: „option(s) read by the framework but not documented" | vedd fel az opciót a `widgets.json`-ba (vagy kivételesen a baseline-ba) |
| „Api.x exists in the framework but is not in the masterdata" | vedd fel az `api_functions*.json` három fájljába |
| „… is in the masterdata but the framework has no such function" | töröld a masterdatából (vagy a framework forrásában hiányzik) |
| „event … does not occur in the framework source" | javítsd az eseménynevet, vagy kivételesen a baseline `events` részébe |
| a portál a regisztrációra `401`-et ad | a `PORTAL_FRAMEWORK_RELEASE_API_KEY` secret nem egyezik a portáléval |
| a portál `409`-et ad | a verzió már published vagy revoked, nincs teendő |
| a verzió nem jelenik meg a portálon | futtasd a **Register Framework Release** workflow-t |
| a Publish gomb hibát ad: „masterdata revision is not ready" | a draftnak nincs feltöltött csomagja, futtasd újra a regisztrációt |
| a Preview „nincs masterdata" | a verzió `legacy` vagy csomag nélküli; ez rendben van régi verzióknál |

## 7. Amit nem kell csinálnod

- A Seeder repóban a `masterdata/` fájlokat **kézzel ne szerkeszd** (generált másolat, a teszt elbukik); a forrás itt, a framework repóban van.
- Az aláíró kulcsot és a portál beállításait nem érinted: a kiadáshoz csak a GitHub secret kell.
- A régi (4.1.70 alatti) verziókhoz nincs teendő; a backfill egyszeri volt.
