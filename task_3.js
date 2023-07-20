import testData from "./task_3.json" assert {type: "json"};

const ITEM_NOT_FOUND = 0
const ERROR = 'ERROR'
const DISCOUNT_ZERO = 0

const CASE_RUBLES = ["рубль", "рубля", "рублей"];
const CASE_CENTS = ["копейка", "копейки", "копеек"];
const CASE_AMOUNT = ["штука", "штуки", "штук"];

function correctWordCase(n, text_forms) {
 n = Math.abs(n) % 100;
 let n1 = n % 10;

 if (n > 10 && n < 20) {
  return text_forms[2];
 }
 if (n1 > 1 && n1 < 5) {
  return text_forms[1];
 }
 if (n1 === 1) {
  return text_forms[0];
 }

 return text_forms[2];
}

function getAmountOfMoneyInCorrectFormat(num) {
 if (typeof num !== "number") return new Error("expected Number");

 if (Number.isInteger(num)) {
  return `${num} ${correctWordCase(num, CASE_RUBLES)}`;
 } else {
  let [rubles, centes] = String(num.toFixed(2)).split(".");
  let rublesWallet = correctWordCase(rubles, CASE_RUBLES);
  let centesWallet = correctWordCase(centes, CASE_CENTS);

  return `${rubles} ${rublesWallet} ${centes} ${centesWallet}`;
 }
}

function getAmountOfItemsInCorrectFormat(num) {
 if (typeof num !== "number") return new Error("expected Number");

 if (Number.isInteger(num)) {
  return `${num} ${correctWordCase(num, CASE_AMOUNT)}`;
 }
}

function strLetterFirstWordToUpperCase(str) {
 str = str.toLowerCase()
 return str.charAt(0).toUpperCase() + str.slice(1);
}

class Basket {
 constructor(entranceData) {
  this.items = entranceData.items;
  this.discounts = entranceData.discounts;
  this.totalDiscounts = entranceData.totalDiscounts;
  this.purchases = entranceData.purchases;
  this.itemsDiscounts = entranceData.itemsDiscounts;
 }

 get sortedByMinPriceTotalDiscounts() {
  return this.totalDiscounts.sort(function(a, b) {
   return parseFloat(a.minPrice) - parseFloat(b.minPrice);
  });
 }

 getDiscount(price, discount) {
  discount = String(discount).replace(/%/g, "");
  let numVal1 = price;
  let numVal2 = discount / 100;
  let totalValue = numVal1 - numVal1 * numVal2;

  return Number(totalValue.toFixed(2));
 }

 get itemsWithDefaultDiscount() {
  return this.items.map((el) => {
   const newEl = {
    ...el,
    price: this.getDiscount(el.price, el.discount),
   };
   delete newEl.discount;
   return newEl;
  });
 }

 get itemsWithAllDiscount() {
  let copyItemsWithDefaultDiscount = [...this.itemsWithDefaultDiscount];

  this.itemsDiscounts.forEach((itemDiscounts) => {
   const currentItem = copyItemsWithDefaultDiscount.find(
    (el) => el.id === itemDiscounts.itemId
   );

   const currentItemDiscount = this.discounts.find(
    (el) => el.id === itemDiscounts.discountId
   );

   copyItemsWithDefaultDiscount = copyItemsWithDefaultDiscount.map((el) => {
    if (el.id === itemDiscounts.itemId) {
     return {
      ...el,
      price: this.getDiscount(
       currentItem.price,
       currentItemDiscount?.discount ?? DISCOUNT_ZERO
      ),
     };
    }
    return el;
   });
  });

  return copyItemsWithDefaultDiscount;
 }

 getCurrentItemAmount(item) {
  if (item === undefined) return ITEM_NOT_FOUND
  return this.purchases.find(
   (purchasesItem) => purchasesItem.item === item.id
  ).amount;
 }

 getTotalItemPrice(item) {
  if (item === undefined) return ITEM_NOT_FOUND

  const currentItem = this.purchases.find(
   (purchasesItem) => purchasesItem?.item === item?.id
  );

  if (currentItem === undefined) return ITEM_NOT_FOUND

  const currentItemAmount = currentItem.amount

  return item.price * currentItemAmount;
 }

 getSumItemsPrice(items) {
  let result = 0;
  items.forEach((item) => {
   result += this.getTotalItemPrice(item);
  });
  return result;
 }

 getBasketItem(defaultItem, itemWithDiscount) {
  if (!(defaultItem && itemWithDiscount)) return ERROR

  let totalItemWithDiscountPrice = this.getTotalItemPrice(itemWithDiscount);
  let totalDefaultItemPrice = this.getTotalItemPrice(defaultItem);
  let totalDefaultItemAmount = this.getCurrentItemAmount(defaultItem);
  let itemName = strLetterFirstWordToUpperCase(defaultItem.name)

  totalItemWithDiscountPrice = getAmountOfMoneyInCorrectFormat(
   Number(totalItemWithDiscountPrice)
  );
  totalDefaultItemPrice = getAmountOfMoneyInCorrectFormat(
   Number(totalDefaultItemPrice)
  );
  totalDefaultItemAmount = getAmountOfItemsInCorrectFormat(
   Number(totalDefaultItemAmount)
  );

  const currentBasketItem = {
   id: defaultItem.id,
   name: itemName,
   amount: totalDefaultItemAmount,
   price: totalDefaultItemPrice,
   priceWithDiscount: totalItemWithDiscountPrice,
  }
  return currentBasketItem
 }

 get basketItems() {
  return this.purchases.map((purchasesItem) => {
   const defaultItem = this.items.find(
    (item) => purchasesItem.item === item.id
   );
   const itemWithDiscount = this.itemsWithAllDiscount.find(
    (itemWithAllDiscount) => purchasesItem.item === itemWithAllDiscount.id
   );
   return this.getBasketItem(defaultItem, itemWithDiscount);
  }).filter(el => el !== ERROR);
 }

 get totalBasketPrice() {
  let defaultItemsTotalPrice = this.getSumItemsPrice(this.items);
  let itemsWithDiscountTotalPrice = this.getSumItemsPrice(
   this.itemsWithAllDiscount
  );
  defaultItemsTotalPrice = getAmountOfMoneyInCorrectFormat(
   Number(defaultItemsTotalPrice)
  );
  itemsWithDiscountTotalPrice = getAmountOfMoneyInCorrectFormat(
   Number(itemsWithDiscountTotalPrice)
  );

  return `Итого: ${itemsWithDiscountTotalPrice} (${defaultItemsTotalPrice})`;
 }

 get totalBasketPriceWithDiscount() {
  const itemsWithDiscountTotalPrice = this.getSumItemsPrice(
   this.itemsWithAllDiscount
  );
  let itemsWithTotalDiscount;
  this.sortedByMinPriceTotalDiscounts.forEach((el) => {
   if (itemsWithDiscountTotalPrice >= el.minPrice) {
    itemsWithTotalDiscount = this.getDiscount(
     itemsWithDiscountTotalPrice,
     el.discount
    );
   }
  });
  itemsWithTotalDiscount = getAmountOfMoneyInCorrectFormat(
   Number(itemsWithTotalDiscount ?? itemsWithDiscountTotalPrice)
  );

  return `Итого со скидкой: ${itemsWithTotalDiscount}`;
 }

 get currentBasketItems() {
  return this.basketItems.map(el => {
   return `${el.name} - ${el.amount}, ${el.priceWithDiscount} (${el.price})`;
  }).join('\n')
 }

 getBasketInformation() {
  return `${this.currentBasketItems}\n${this.totalBasketPrice}\n${this.totalBasketPriceWithDiscount}`;
 }
}


let basket = new Basket(testData);
console.log(basket.getBasketInformation());