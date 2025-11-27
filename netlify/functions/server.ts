import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from '../../server/routes';
import { setupAuth } from '../../server/auth';
import session from 'express-session';
import passport from 'passport';
import { storage } from '../../server/storage';

const app = express();

// Middleware
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(express.urlencoded({ extended: false }));

// Session configuration for serverless
const sessionSettings: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || "landnest-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  store: storage.sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
};

app.set("trust proxy", 1);
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

// Setup authentication
setupAuth(app);

// Register routes
const httpServer = { listen: () => {} } as any;
registerRoutes(httpServer, app);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export const handler = serverless(app);
