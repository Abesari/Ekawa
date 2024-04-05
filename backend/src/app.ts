import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db';
import goalRoutes from './routes/goalRoutes';
import squareRoutes from './routes/squareRoutes';
import categoryRoutes from './routes/categoryRoute';
import progressRoutes from './routes/progressRoute';
import reminderRoutes from './routes/reminderRoute';
import achievementRoutes from './routes/achievementRoute';
import preferencesRoutes from './routes/preferencesRoute';
import activityLogRoutes from './routes/activityLogRoute';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/goals', goalRoutes);
app.use('/api/squares', squareRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/activity-log', activityLogRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;