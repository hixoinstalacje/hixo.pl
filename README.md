# hixo.pl — strona statyczna

Gotowy zestaw HTML/CSS/JS do wrzucenia bezpośrednio na GitHub Pages.
Nie wymaga Node, frameworków ani kompilacji.

## Uruchomienie lokalne

Otwórz plik `index.html` w przeglądarce. Wszystkie linki wewnętrzne używają
ścieżek względnych; możesz również uruchomić lokalny serwer HTTP.

## Co koniecznie uzupełnić

1. Wyszukaj w plikach HTML ciągi w nawiasach kwadratowych, w szczególności:
   `[TELEFON]`, `[E-MAIL]`, `[NIP]`, `[PEŁNA NAZWA FIRMY]`,
   `[ADRES FIRMY]`, `[OBSZAR DZIAŁANIA]`, `[GODZINY PRACY]`.
2. W linkach `tel:` wpisz numer w formacie międzynarodowym, np. `tel:+48123456789`.
   W linkach `mailto:` wpisz prawdziwy e-mail.
3. W trzech formularzach zamień `TWOJ_ENDPOINT` w `action` na identyfikator
   formularza z Formspree. Dopóki go nie ustawisz, JavaScript blokuje wysyłkę.
   Weryfikuj wiadomości w panelu Formspree. Zapasowe linki `mailto:` już są.
4. Podmień obrazki z `img/` według `img/README.txt`.
5. Zastąp przykładowe opinie, opisy realizacji i informacje o uprawnieniach
   wyłącznie zweryfikowanymi danymi.
6. Uzupełnij i zweryfikuj `polityka-prywatnosci.html` przed uruchomieniem
   formularza, również w zakresie transferu danych, retencji i usług Google Fonts.
7. Jeśli chcesz mapę, wstaw `iframe` w `kontakt.html` w miejscu oznaczonego
   komentarza i uwzględnij dostawcę map w informacji o prywatności.

## Publikacja na GitHub Pages

1. Utwórz publiczne repozytorium, np. `hixo-pl`.
2. Prześlij **zawartość tego folderu** do głównego katalogu repozytorium,
   tak aby `index.html` i `CNAME` były w jego korzeniu.
3. Repozytorium → `Settings` → `Pages` → `Build and deployment`:
   `Deploy from a branch`, `main`, `/ (root)`, następnie `Save`.
4. W `Custom domain` wpisz `hixo.pl`. W repozytorium pozostaw plik `CNAME`
   z dokładną treścią `hixo.pl`.
5. U operatora DNS dla `hixo.pl` ustaw rekordy A dla hosta `@`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`.
6. Dla subdomeny `www` zalecany CNAME: `www` → `TWOJ_LOGIN.github.io`
   (wstaw swój login GitHub; nie dodawaj nazwy repozytorium).
7. Po propagacji DNS i wydaniu certyfikatu zaznacz `Enforce HTTPS` w Pages.

Uwaga: jeżeli w DNS istnieją stare rekordy A/AAAA/ALIAS/ANAME dla `@`
lub CNAME dla `www`, najpierw sprawdź konflikty. Nie używaj wildcard `*`.
Zmiany DNS mogą propagować się nawet 24 godziny.

## Testy ręczne przed publikacją

- Menu mobilne i nawigacja klawiaturą (Tab, Enter, Escape).
- Filtr realizacji i podgląd zdjęć (Escape zamyka).
- Formularze po dodaniu endpointów i rzeczywistych adresów.
- Wygląd na telefonie oraz w trybie `prefers-reduced-motion`.
- Brak pustych placeholderów i poprawne dane SEO.
