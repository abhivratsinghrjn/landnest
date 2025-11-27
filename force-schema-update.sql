-- Force schema update by dropping and recreating tables
DROP TABLE IF EXISTS property_images CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS session CASCADE;

-- Tables will be recreated by drizzle-kit push
