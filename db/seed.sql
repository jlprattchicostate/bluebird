-- ============================================================
-- SEED DATA FOR BLUEBIRD (Doha Project) DATABASE
-- ============================================================

-- Ensure the pgcrypto extension is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. Profiles
-- ============================================================

INSERT INTO profiles (profile_id, user_id, name, experience_level, bio)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'Aisha Al Thani', 'intermediate',
   'Snowboarding enthusiast exploring resorts around the world.');

-- ============================================================
-- 2. Resorts
-- ============================================================

INSERT INTO resorts (resort_id, name, location, description, has_parking)
VALUES
  ('f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832', 'Aspen Peak', 'Colorado, USA', 'High-end resort known for fresh powder and vibrant après-ski.', true),
  ('13a5902c-7c3e-4c7d-8a6d-1acb510ab9af', 'Alpine Ridge', 'Zermatt, Switzerland', 'Classic European slopes with breathtaking Matterhorn views.', false),
  ('8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7', 'Doha Snow Dome', 'Doha, Qatar', 'Indoor resort offering year-round snow sports.', true);

-- ============================================================
-- 3. Weather Reports
-- ============================================================

INSERT INTO weather_reports (weather_id, resort_id, snowfall, temperature, wind_speed)
VALUES
  (gen_random_uuid(), 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832', 15.2, -5, 12.5),
  (gen_random_uuid(), '13a5902c-7c3e-4c7d-8a6d-1acb510ab9af', 8.7, -8, 6.3),
  (gen_random_uuid(), '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7', 0.0, 2, 1.2);

-- ============================================================
-- 4. Road Reports
-- ============================================================

INSERT INTO road_reports (road_id, resort_id, road_status, visibility)
VALUES
  (gen_random_uuid(), 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832', 'icy', 'limited'),
  (gen_random_uuid(), '13a5902c-7c3e-4c7d-8a6d-1acb510ab9af', 'clear', 'good'),
  (gen_random_uuid(), '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7', 'closed', 'poor');

-- ============================================================
-- 5. Posts
-- ============================================================

INSERT INTO posts (post_id, user_id, resort_id, caption, vibe_tag, photo_url)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832',
   'First run of the day — perfect snow!', 'stoked', 'https://example.com/photos/aspen1.jpg'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7',
   'Doha Snow Dome never disappoints!', 'indoorszn', 'https://example.com/photos/doha1.jpg');

-- ============================================================
-- 6. Favorites
-- ============================================================

INSERT INTO favorites (favorite_id, user_id, resort_id)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7');

-- ============================================================
-- 7. Notifications
-- ============================================================

INSERT INTO notifications (notification_id, user_id, type, message, read)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'system', 'Welcome to Bluebird!', true),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'message', 'You have a new comment on your post.', false);

-- ============================================================
-- 8. Verifications
-- ============================================================

INSERT INTO verifications (verification_id, user_id, status, reviewed_at)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'approved', now());
