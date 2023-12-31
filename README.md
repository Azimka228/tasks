# Задания по написанию кода

## TASK 1

### How to run solution

#### `npm run task_1`

Ученики решали задачи по программированию. Чем сложнее задача, тем больше за нее давали баллов.
Так, если задачу решили все ученики, то за нее давали всего 1 балл. Если только 1 ученик не решил, то 1+1=2 балла. Если
8 учеников не решило, то 1+8=9 баллов.
Написать функцию/метод, которая на вход получает двумерный массив с выполненными задачами учеников. На первом уровне
вложенности ученик - на втором уровне вложенности задачи (0 - не решил, 1 - решил.

Пример:

[   
[1,0,1,1], - первый ученик решил первую, третью и четвертую задачи
[0,0,0,1], - второй ученик решил только четвертую задачу   
[1,1,1,1] - третий ученик решил все задачи   
]   
На выходе должен быть массив, в котором указано, какой ученик сколько баллов набрал  
[  
5, - набрал первый ученик  
1, - набрал второй ученик  
8, - набрал третий ученик  
]

## TASK 2

### How to run solution

#### `npm run task_2`

Написать функцию/метод, который получает строку, которая состоит из английских букв (только строчные буквы) и цифр.  
И делает следующее, разделяет на строку на буквы + цифры
32bk56c890f и производит следующие вычисления.   
Берет последовательно все буквы + цифры
(32) - если только цифры, то имеем аналогичное число - 32.    
(bk56) - когда встречаем буквы, то имеем порядковый номер буквы в алфавите. b == 2, k == 11. Производим замену -
получаем число 211 и умножаем его на число, собранное из цифр. 211 * 56
(c89) - аналогично получаем 3*890
(f) - если имеем только строку, то получаем просто число собранное из порядковых номеров букв.   
f == 6
По всем "парам" букв + цифр производится сложение / вычитание. Нечетные берутся со знаком "+", а четные берутся со
знаком "-".

Получаем:  
32 - 211 * 56 + 3 * 890 - 6 = - 9120  
Функция / метод вернет -9120

## TASK 3

### How to run solution

#### `npm run task_3`

Сформировать все необходимые классы и методы, которые позволят сделать калькулятор корзины, работающей со скидками.
Есть товар:

- id
- название
- цена
- размер скидки, по умолчанию

Пример:
Мяч
1
1000 рублей
10% скидка по умолчанию
или
футболка
2
2000 рублей
25%
К товару могут быть прикреплены сезонные скидки.

- id
- название
- дата начала действия (без года)
- дата завершения действия (без года)
- размер скидки

Пример:
1
весенняя распродажа
1 апреля -1 июля
20%
или
2
новогодние скидки
10 декабря - 20 мая
30%
К одному и тому же товару могут быть прикреплены несколько скидок.
Если обе скидки прикреплены к мячу, то мяч будет стоить
1000 - 10% = 900
900 - 20% = 720
720 - 30% = 504
последовательность применения скидок не важна.
И есть еще другой тип скидок. Зависящий от общего размера корзины.

- id
- минимальная сумма заказа
- размер скидки
  например,
  1
  1000 рублей
  5%
  или
  2
  5000 рублей 6%
  Из этого набора применяется максимум одна (наибольшая из доступных)
  Если общий заказ сделан на сумму 700 рублей (после скидок относящихся к отдельным товарам), то в примере не будет ни
  одной скидки из последнего раздела
  Если на 2700, то применится скидка 5% из последнего раздела
  Если 8000, то 6% из последнего раздела.
  Итак, вы получается подготовили кассы, которые отвечают за товары и скидки. И нужен пример, того как его
  протестировать.

Для этого разумно иметь тестовый набор данных в json  
items: [  
{id: 1,  
name: 'мяч'  
price: 1000  
discount: '10%'  
},  
{id: 2,  
name: 'футболка'  
price: 2000  
discount: '25%'  
}  
],  
discounts:[  
{  
id: 1,  
name: 'весенняя распродажа',  
discount: 20%,  
},  
{  
id: 2,  
name: 'новогодние скидки',  
discount: 20%,  
}  
],  
totalDiscounts: [  
{  
id: 1,  
minPrice: 1000,  
discount: '5%'  
},  
{  
id: 1,  
minPrice: 5000,  
discount: '6%'
},  
]  
purchases: [ // сколько каких товаров покупает клиент  
{  
item: 1,  
amount: 10  
},  
{  
item: 2,   
amount: 5  
}   
],
itemsDiscounts: [ // на какие товары какие скидки должны    действовать  
{    
itemId: 1,   
discountId: 1  
},  
{  
itemId: 2,  
discountId: 1  
},  
{  
itemId: 2,  
discountId: 2  
}  
]

Более аккуратно наполните самостоятельно, но суть тестовых данных должна быть понятна.  
Задача - обработать данные из json и вывести информацию по корзине в КОНСОЛЬ.

Должно получиться примерно следующее:

Мяч - 10 штук, 5 040 рублей (10 000 рублей без скидки);  
Футболка - 5 штук, 5 250 рублей (10 000 рублей без скидки)  
Итого: 10 290 (20 000 рублей без скидки)  
Итого со скидкой: 9 672 рубля 60 копеек  







