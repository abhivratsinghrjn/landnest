import 'dotenv/config';
import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from '../../server/routes';
import { storage } from '../../server/storage';
import session from 'express-session';
import passport from 'passport';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set. Check Netlify environment variables.');
}

const app = express();

app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(express.urlencoded({ extended: false }));

const sessionSettings: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || "landnest-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  store: storage.sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
};

app.set("trust proxy", 1);
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

// Register all routes (auth is set up inside registerRoutes)
const httpServer = { listen: () => {} } as any;
registerRoutes(httpServer, app);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Server error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export const handler = serverless(app, {
  binary: ['image/*', 'multipart/form-data'],
});
