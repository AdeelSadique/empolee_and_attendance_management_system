import app from './app.js';
import { mongoDBConnection } from './database/db.js';

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});

mongoDBConnection();
