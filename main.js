function getMarketSummary() {
    const marketData = {
        status: "ok",
        portfolio: {
            owner: "Alex",
            currency: "USD",
            positions: [
                {
                    ticker: "AAPL",
                    type: "stock",
                    price: 212.45,
                    previousClose: 209.10,
                    quantity: 8
                },
                {
                    ticker: "MSFT",
                    type: "stock",
                    price: 468.20,
                    previousClose: 470.00,
                    quantity: 5
                },
                {
                    ticker: "NVDA",
                    type: "stock",
                    price: 134.80,
                    previousClose: 130.25,
                    quantity: 12
                }
            ]
        }
    };

    if (marketData.status !== "ok") {
        return "Ошибка загрузки котировок";
    }

    if (marketData.portfolio.positions.length === 0) {
        return "В портфеле нет инструментов";
    }

    const firstTicker = marketData.portfolio.positions[0].ticker;
    const secondPrice = marketData.portfolio.positions[1].price;
    const thirdPreviousClose = marketData.portfolio.positions[2].previousClose;

    if (marketData.portfolio.positions[2].price > marketData.portfolio.positions[2].previousClose) {
        return "Портфель " + marketData.portfolio.owner +
            ": первая бумага " + firstTicker +
            ", цена второй бумаги " + secondPrice +
            ", вчерашнее закрытие третьей " + thirdPreviousClose +
            ". Третья бумага сегодня растет.";
    } else {
        return "Портфель " + marketData.portfolio.owner +
            ": первая бумага " + firstTicker +
            ", цена второй бумаги " + secondPrice +
            ", вчерашнее закрытие третьей " + thirdPreviousClose +
            ". Третья бумага сегодня падает или без изменений.";
    }
}