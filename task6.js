const usersJson = `{
  "source": "crm_sync",
  "users": [
    {
      "id": 1,
      "name": "Иван",
      "email": "ivan@test.ru",
      "age": 30,
      "active": true,
      "address": {
        "city": "Москва"
      }
    },
    {
      "id": 2,
      "name": "",
      "email": "anna@test.ru",
      "age": 25,
      "active": true,
      "address": {
        "city": "Казань"
      }
    },
    {
      "id": 3,
      "name": "Сергей",
      "email": null,
      "age": null,
      "active": false,
      "address": null
    },
    {
      "id": 4,
      "email": "no_name@test.ru",
      "age": 41,
      "active": true
    },
    null,
    {
      "id": 5,
      "name": "Ольга",
      "email": "olga@test.ru",
      "age": "35",
      "active": true,
      "address": {
        "city": ""
      }
    }
  ]
}`;

function safeProcessUsers(jsonString) {
  try {
    const data = JSON.parse(jsonString);

    if (!data.users || !Array.isArray(data.users)) {
      console.log("Ошибка: users не является массивом");
      return [];
    }

    const result = [];

    for (const user of data.users) {
      if (!user) {
        continue;
      }

      if (user.id === undefined || user.id === null) {
        continue;
      }

      if (!user.name || user.name.trim() === "") {
        continue;
      }

      let age = null;

      if (typeof user.age === "number") {
        age = user.age;
      }

      const city = user.address?.city && user.address.city.trim() !== ""
        ? user.address.city
        : "no-city";

      const newUser = {
        userId: user.id,
        userName: user.name,
        email: user.email ?? "no-email",
        age: age,
        isAdult: age !== null ? age >= 18 : false,
        active: user.active ?? false,
        city: city,
        source: data.source ?? "unknown"
      };

      result.push(newUser);
    }

    return result;
  } catch (error) {
    console.log("Ошибка при разборе JSON:", error.message);
    return [];
  }
}

const processedUsers = safeProcessUsers(usersJson);
console.log(processedUsers);

//n8n
const result = [];

for (const item of items) {
  const row = item.json;

  if (!row) {
    continue;
  }

  if (!row.symbol || row.symbol.trim() === "") {
    continue;
  }

  const price = Number(row.price);

  if (Number.isNaN(price)) {
    continue;
  }

  result.push({
    json: {
      symbol: row.symbol,
      price: price,
      market: row.market ?? "unknown"
    }
  });
}

return result;