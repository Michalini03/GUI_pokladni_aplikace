# Repozitář k semestrální práci z předmětu KIV/UUR
## Téma: Pokladnicový systém pro gastropodniky
Práci pro předmět KIV/UUR jsem vytvářel, na doporučení cvičícího, v programovacím jazyce JavaScript ve vývojovém prostředí WebStorm. Hlavní myšlenka práce byla naučit se základy rozšířené knihovny pro JavaScript, React. Dále jsem využíval další knihovny, jako jsou 
MaterialUI nebo Day.js. Zadání jsem vybíral takové, abych zde využil většinu základních věcí, co jsem se v předmětu naučil. </br>
### Práce je rozdělená na 5. částí
1. Přihlašovací obrazovka
2. Pokladní část
3. Rezervační systém
4. Mincovka
5. Denní souhrn

Mezi částmi procházím pomocí React Router. Díky tomu nemusím volat na úplně novou stránku, ale spíše "přepsat" její kontent. </br>
Pro práci neexistuje žádná vnější databáze nebo server, proto jsou všechny data uměle vytvořena pouze uvnitř kódu.

### 1. Přihlašovací obrazovka
Jednoduchý způsob, jak vytvořit přihlašování. Existuje objekt uživatele, který má jako paramatry jméno a heslo. Poté, co zjistí jestli existuje uživatel se zadaným jménem, zkontroluje jestli parametr hesla je stejný jako text zadaný v textovém poli pro heslo. Pokud je heslo nebo jméno špatné, či prázdné, program uživateli vyhodí notifikaci a zbarví textové pole, které bylo špatně zadáno, červenou barvou.
### 2. Pokladní část
