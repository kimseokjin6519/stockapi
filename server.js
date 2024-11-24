const express = require('express');
const yf = require('yahoo-finance2').default;
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/quote', async (req, res) => {
   const { symbol } = req.query;

   if (!symbol) {
      return res.status(400).json({ error: 'Symbol is required' });
   }

   try {
   
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 3);

      const period1 = startDate.toISOString().split('T')[0];
      const period2 = endDate.toISOString().split('T')[0];

      const chartData = await yf.chart(symbol, { period1, period2 });

      res.json(chartData);

   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stock data', message: error.message });
   }
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
