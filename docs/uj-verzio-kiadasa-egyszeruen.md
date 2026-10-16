# Új analogic verzió kiadása: egyszerűen

## A kép egy mondatban

A fejlesztő a kódot és a hozzá tartozó leírásokat (masterdata) frissíti, a senior elindít egy GitHub workflow-t, a rendszer **draftként** felviszi a verziót a portálra, **egy superadmin jóváhagyja**, és a Seederek maguktól átveszik.

## Ábra

```
Fejlesztő          Senior              GitHub CI               Portál (superadmin)        Seederek
 kód + masterdata → verzió emelés  →  validál, publikál  →  draft → Preview → Publish  →  letöltik,
 (PR, CI ellenőrzi)  (version.config)  (PyPI, Docker)         (jóváhagyás)                 ellenőrzik, használják
```

## A lépések

### 1. Fejlesztés (fejlesztő)

- Ha új widget, opció, esemény vagy `Api`/`Utils` függvény kerül be, a `masterdata/` mappa fájljait is frissíti **ugyanabban a PR-ban**.
- A CI minden PR-nál ellenőrzi, hogy a kód és a leírás egyezik-e. Ha nem, a PR nem megy át.

### 2. Verzió emelése (senior)

- A `main`-ben átírja a verziószámot az `analogic/version.config`-ban, és ellenőrzi, hogy a **CI Build zöld**.

### 3. Kiadás (senior, GitHubon)

- Elindítja a **Publish To PyPI and Dockerhub** vagy a **Publish To PyPI** workflow-t.
- A workflow sorrendben ezt csinálja:
  1. **először lefuttatja a CI Build-et és validálja a masterdatát**, hibánál megáll, semmi nem kerül ki,
  2. felépíti és publikálja a PyPI-ra (és a Docker image-et),
  3. feltölti a masterdata csomagot a portálra, ahol aláírják,
  4. **draftként** regisztrálja az új verziót.

### 4. Jóváhagyás (superadmin, portál)

- **Admin → Framework Releases**: a draft sorban a **Preview** megmutatja, mi változik az előző published verzióhoz képest (új és eltávolított widgetek, opciók, függvények).
- Ha rendben van: **Publish**. Hibás verziónál később **Revoke**.

### 5. Automatikusan (Seederek)

- A Seederek legfeljebb kb. 20 percen belül letöltik az aláírt csomagot, ellenőrzik, és használják. Újraindítás azonnal frissít.
- Ha a portál nem érhető el, a Seeder a már letöltött vagy a vele szállított adattal dolgozik, nem áll le.

## Miért biztonságos

- **A hibás leírás nem jut ki:** a validálás a publikálás előtt fut.
- **Emberi jóváhagyás kell:** a CI csak draftot hoz létre, a Seederek csak a published verziót látják.
- **Aláírt csomag:** a Seeder csak az ellenőrzött, a portál kulcsával aláírt csomagot fogadja el.

## Ha valami félremegy

- Ha csak az utolsó lépés (regisztráció a portálra) bukik el, a verzió már kint van a PyPI-n. Ilyenkor **ne futtasd újra a publikálást**, hanem indítsd el a **Register Framework Release** workflow-t.
- Ha a Preview azt írja, hogy a masterdata **azonos** az előző published verzióval, az azt jelenti, hogy ebben a kiadásban a masterdata nem változott. Ez rendben van.

## Részletek

- Lépésről lépésre, hibaelhárítással: [`uj-verzio-kiadasa.md`](uj-verzio-kiadasa.md)
- Hogyan működik a rendszer (Seeder repó): `planning/framework-release-masterdata-sync-mukodes.md`
