-- Enable pgcrypto for gen_random_uuid() if available
-- If you don't have permission to create extensions, remove the default expressions and supply UUIDs from the application.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Use auth.users for authentication. Application profile table:
CREATE TABLE IF NOT EXISTS profiles (
  profile_id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  name         text,
  experience_level text, -- e.g., 'beginner', 'intermediate', 'expert'
  bio          text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Resorts
CREATE TABLE IF NOT EXISTS resorts (
  resort_id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  location    text,
  description text,
  has_parking boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resorts_name ON resorts (name);

-- Weather reports
CREATE TABLE IF NOT EXISTS weather_reports (
  weather_id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resort_id    uuid NOT NULL REFERENCES resorts (resort_id) ON DELETE CASCADE,
  snowfall     numeric,        -- inches or cm depending on app convention
  temperature  numeric,        -- degrees (C or F by convention)
  wind_speed   numeric,        -- units by convention
  report_time  timestamptz NOT NULL DEFAULT now(),
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_weather_reports_resort ON weather_reports (resort_id);
CREATE INDEX IF NOT EXISTS idx_weather_reports_time ON weather_reports (report_time);

-- Road reports
CREATE TABLE IF NOT EXISTS road_reports (
  road_id     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resort_id   uuid NOT NULL REFERENCES resorts (resort_id) ON DELETE CASCADE,
  road_status text,     -- e.g., 'clear', 'icy', 'closed'
  visibility  text,     -- e.g., 'good', 'limited', 'poor'
  updated_at  timestamptz NOT NULL DEFAULT now(),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_road_reports_resort ON road_reports (resort_id);
CREATE INDEX IF NOT EXISTS idx_road_reports_updated_at ON road_reports (updated_at);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  post_id    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  resort_id  uuid REFERENCES resorts (resort_id) ON DELETE SET NULL,
  caption    text,
  vibe_tag   text,
  photo_url  text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_user ON posts (user_id);
CREATE INDEX IF NOT EXISTS idx_posts_resort ON posts (resort_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts (created_at);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  favorite_id  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  resort_id    uuid NOT NULL REFERENCES resorts (resort_id) ON DELETE CASCADE,
  favorited_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resort_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites (user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_resort ON favorites (resort_id);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  notification_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  type            text NOT NULL,   -- e.g., 'message', 'system', 'alert'
  message         text NOT NULL,
  sent_at         timestamptz NOT NULL DEFAULT now(),
  read            boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_sent_at ON notifications (sent_at);

-- Verifications
CREATE TABLE IF NOT EXISTS verifications (
  verification_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  status          text NOT NULL DEFAULT 'pending', -- e.g., 'pending','approved','rejected'
  reviewed_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_verifications_user ON verifications (user_id);
CREATE INDEX IF NOT EXISTS idx_verifications_status ON verifications (status);

-- Optional: trigger to keep updated_at columns current for tables that use it
CREATE OR REPLACE FUNCTION audit_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to tables that have updated_at
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON profiles;
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION audit_updated_at();

DROP TRIGGER IF EXISTS trigger_resorts_updated_at ON resorts;
CREATE TRIGGER trigger_resorts_updated_at
  BEFORE UPDATE ON resorts
  FOR EACH ROW
  EXECUTE FUNCTION audit_updated_at();

DROP TRIGGER IF EXISTS trigger_posts_updated_at ON posts;
CREATE TRIGGER trigger_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION audit_updated_at();

-- End of DDL