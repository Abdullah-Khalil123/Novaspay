import prisma from '../../prisma/client.js';

const getAllCurrencies = async (req, res) => {
  const { page = 1, limit = 10, symbol } = req.query;
  try {
    const currencies = await prisma.currency.findMany({
      where: {
        symbol: symbol ? { contains: symbol.toUpperCase() } : undefined,
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        quotes: true,
      },
    });
    const total = await prisma.currency.count({});
    return res.status(200).json({
      message: 'Currencies retrieved successfully',
      data: currencies,
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
        total,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

const getCurrencyRates = async (req, res) => {
  const { id, symbol } = req.query;
  try {
    const currency = await prisma.currency.findFirst({
      where: {
        id: Number(id) || undefined,
        symbol: symbol ? symbol.toUpperCase() : undefined,
      },
      include: {
        quotes: true,
      },
    });
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found' });
    }
    return res.status(200).json({
      message: 'Currency fetched successfully',
      data: currency,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

const createCurrencyRate = async (req, res) => {
  console.log('Request Body:', req.body); // Debugging line
  // return res.status(501).json({ message: 'Not Implemented' });
  try {
    const { symbol, name, amount, quote } = req.body;

    if (!symbol || !name || !amount || !quote) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create currency
    const currency = await prisma.currency.create({
      data: {
        symbol: symbol.toUpperCase(),
        name,
        amount,
        lastUpdated: new Date(Date.now()),
        quotes: {
          create: Object.entries(quote).map(([targetSymbol, data]) => ({
            baseSymbol: symbol.toUpperCase(),
            targetSymbol,
            price: data.price,
            lastUpdated: new Date(data.last_updated),
          })),
        },
      },
      include: {
        quotes: true,
      },
    });

    return res.status(201).json({
      message: 'Currency created successfully',
      data: currency,
    });
  } catch (error) {
    console.error('Error creating currency:', error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

const updateCurrencyRate = async (req, res) => {
  try {
    const { id, symbol, name, amount, last_updated, quote } = req.body;

    if (!id && !symbol) {
      return res
        .status(400)
        .json({ message: 'Provide id or symbol to update' });
    }

    // Find existing currency
    const existing = await prisma.currency.findFirst({
      where: {
        OR: [
          id ? { id: Number(id) } : undefined,
          symbol ? { symbol: symbol.toUpperCase() } : undefined,
        ].filter(Boolean),
      },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Currency not found' });
    }

    // Update currency fields
    const updatedCurrency = await prisma.currency.update({
      where: { id: existing.id },
      data: {
        symbol: symbol ? symbol.toUpperCase() : existing.symbol,
        name: name ?? existing.name,
        amount: amount ?? existing.amount,
        lastUpdated: last_updated
          ? new Date(last_updated)
          : existing.lastUpdated,
      },
    });

    // Replace all quotes for this currency
    if (quote) {
      await prisma.quote.deleteMany({ where: { currencyId: existing.id } });
      await prisma.quote.createMany({
        data: Object.entries(quote).map(([targetSymbol, data]) => ({
          baseSymbol: updatedCurrency.symbol,
          targetSymbol,
          price: data.price,
          lastUpdated: new Date(data.last_updated),
          currencyId: existing.id,
        })),
      });
    }

    return res.status(200).json({
      message: 'Currency updated successfully',
      data: updatedCurrency,
    });
  } catch (error) {
    console.error('Error updating currency:', error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

export {
  getCurrencyRates,
  createCurrencyRate,
  updateCurrencyRate,
  getAllCurrencies,
};
