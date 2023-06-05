Puštění projektu! 

ve terminalu napsat “npm start”, tím se pustí index.js na portu 3000 a v terminalu se napíše: ” Server running on port: 3000” (musíte mít node.js, ale myslím si že máte) 

cíl projektu: 

Cílem je vytvořit eshop počítavé techniky. Eshop ve kterém user může nakoupit komponenty pro sestavení vlastního pc. Platba v tom webu není protože je to jako pet projekt. 

Postup: 

Frontend a backend jsem dělal paralelně. Počatečně stranky registraci a loginu, pak controller a routy na backendu pro ukládání useru do databáze(mongodb). User se ukládá jako: _id; firstname, lastname, email, phone, password. Pro ukládání hesla používám knihovnu “bcrypt”. Práce s db jde pomocí knihovny “mongoose”. Server byl vytvořen z web-frameworku “express”.  

 Popis funkčnosti: 

Web celkem obsahuje 6 stránek. Na každé stránce je logo z canvasu 

1 main: 

Obsahuje slider 

2 product 

Obsahuje zboží a možnost přidávání do košíku. Obrázky 

Se mění rozměr při hoveru. Kartička zboží má: název, 	img a cenu a tlačítko “add cart” 

3 sign up 

Registrace s používáním patternu v html a na serveru pomocí knihovny “joi” 

4 log in 

Registrace s používáním patternu v html a na serveru 

5 cart 

Zboží který byly přidáný do cartu. V položce “Final price: “ skládá se cena ze všech zboží  

6 profile 

Informace o useru 

komentáře ve zdrojovém kódu je) 
