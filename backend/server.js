const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const preferenceRoutes = require('./routes/preferences');
app.use('/api/preferences', preferenceRoutes);

const compression = require('compression');
app.use(compression());

const helmet = require('helmet');
app.use(helmet());