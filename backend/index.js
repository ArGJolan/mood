require('module-alias/register')
const express = require('express');
const cors = require('cors');
const logger = require('@Service/log');
const router = require('@Router')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  exposedHeaders: ['Authorization']
}));
app.use(express.json());
app.use(logger.express);

app.use('/api', router)

app.listen(port, () => {
  logger.logger.info(`Backend server listening at http://localhost:${port}`);
});
