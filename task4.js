const deals = [
  {
    id: "DL-2001",
    client: "ООО Вектор",
    manager: "Алексей",
    status: "open",
    amount: 125000,
    currency: "RUB",
    tags: ["priority", "broker"],
    products: 3
  },
  {
    id: "DL-2002",
    client: "АО Спектр",
    manager: "Марина",
    status: "closed",
    amount: 98000,
    currency: "RUB",
    tags: [],
    products: 1
  },
  {
    id: "DL-2003",
    client: "ИП Соколов",
    manager: "Алексей",
    status: "open",
    amount: 187000,
    currency: "RUB",
    tags: ["manual"],
    products: 4
  },
  {
    id: "DL-2004",
    client: "ООО Гранит",
    manager: "Ольга",
    status: "failed",
    amount: 76000,
    currency: "RUB",
    tags: ["risk"],
    products: 2
  },
  {
    id: "DL-2005",
    client: "ЗАО Альфа",
    manager: "Марина",
    status: "open",
    amount: 210000,
    currency: "RUB",
    tags: ["priority"],
    products: 5
  }
];

const shortDeals = deals.map(function(deal) {
  return {
    dealId: deal.id,
    client: deal.client,
    manager: deal.manager,
    amount: deal.amount,
    isPriority: deal.tags.includes("priority")
  };
});

console.log("1. shortDeals");
console.log(shortDeals);

const openDeals = deals.filter(function(deal) {
  return deal.status === "open";
});

console.log("2. openDeals");
console.log(openDeals);

const priorityDeals = deals.filter(function(deal) {
  return deal.tags.includes("priority");
});

console.log("3. priorityDeals");
console.log(priorityDeals);

const firstMarinaDeal = deals.find(function(deal) {
  return deal.manager === "Марина";
});

console.log("4. firstMarinaDeal");
console.log(firstMarinaDeal);

const hasFailedDeal = deals.some(function(deal) {
  return deal.status === "failed";
});

console.log("5. hasFailedDeal");
console.log(hasFailedDeal);

const allRub = deals.every(function(deal) {
  return deal.currency === "RUB";
});

console.log("6. allRub");
console.log(allRub);

const totalAmount = deals.reduce(function(sum, deal) {
  return sum + deal.amount;
}, 0);

console.log("7. totalAmount");
console.log(totalAmount);

const openDealsAmount = deals
  .filter(function(deal) {
    return deal.status === "open";
  })
  .reduce(function(sum, deal) {
    return sum + deal.amount;
  }, 0);

console.log("8. openDealsAmount");
console.log(openDealsAmount);
