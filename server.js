const express = require('express');
const yf = require('yahoo-finance2').default;

const app = express();
const PORT = 5000;

app.get('/quote', async (req, res) => {
   const { symbol } = req.query;

   if (!symbol) {
      return res.status(400).json({ error: 'Symbol is required' });
   }

   try {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      const period1 = date.toISOString().split('T')[0];
      const chartData = await yf.chart(symbol, { period1 });
      
      res.json(chartData);

   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stock data', message: error.message });
   }
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
