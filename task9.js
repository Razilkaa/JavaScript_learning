const items = [
  {
    json: {
      symbol: " SBER ",
      price: "312.45",
      market: "MOEX",
      sector: "Finance",
      volume: "1000"
    }
  },
  {
    json: {
      symbol: "",
      price: "181.12",
      market: "MOEX",
      sector: "Energy",
      volume: "500"
    }
  },
  {
    json: {
      symbol: "GAZP",
      price: "abc",
      market: "MOEX",
      sector: "Energy",
      volume: "800"
    }
  },
  {
    json: {
      symbol: " LKOH ",
      price: "7210",
      market: null,
      sector: null,
      volume: "250"
    }
  },
  {
    json: {
      symbol: "YDEX",
      price: "4180.5",
      market: "MOEX",
      sector: "Tech",
      volume: null
    }
  }
];
const result = [];

for (const item of items) {
  const row = item.json;

  if (!row) {
    continue;
  }

  if (!row.symbol || row.symbol.trim() === "") {
    continue;
  }

  const symbol = row.symbol.trim();

  const price = Number(row.price);

  if (Number.isNaN(price)) {
    continue;
  }

  let volume = null;

  if (row.volume !== null && row.volume !== undefined && row.volume !== "") {
    const parsedVolume = Number(row.volume);

    if (!Number.isNaN(parsedVolume)) {
      volume = parsedVolume;
    }
  }

  result.push({
    json: {
      symbol: symbol,
      price: price,
      market: row.market ?? "UNKNOWN",
      sector: row.sector ?? "UNKNOWN",
      volume: volume,
      hasVolume: volume !== null,
      source: "n8n_code_node"
    }
  });
}

return result;