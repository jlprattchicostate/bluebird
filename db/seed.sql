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
  ('8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7', 'Doha Snow Dome', 'Doha, Qatar', 'Indoor resort offering year-round snow sports.', true),
  ('af6841d9-0c77-4d24-986f-552f63a64b52', 'Summit Basin', 'Utah, USA', 'North-facing tree runs plus high-speed lifts that dodge morning crowds.', true),
  ('0e0d34ae-309e-4ef3-979f-d28a741b93d5', 'Sierra Meadows', 'Lake Tahoe, USA', 'Family-friendly glades with dependable grooming and park laps.', true),
  ('d1f775d8-46d3-4a41-8f31-3ae59a1c5bcb', 'Cascade Crossing', 'Washington, USA', 'Hybrid cat-ski/backcountry access with moody storm days.', false);

-- ============================================================
-- 3. Weather Reports
-- ============================================================

INSERT INTO weather_reports (weather_id, resort_id, snowfall, temperature, wind_speed, report_time)
VALUES
  (gen_random_uuid(), 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832', 15.2, -5, 12.5, now() - interval '2 hours'),
  (gen_random_uuid(), '13a5902c-7c3e-4c7d-8a6d-1acb510ab9af', 8.7, -8, 6.3, now() - interval '3 hours'),
  (gen_random_uuid(), '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7', 0.0, 2, 1.2, now() - interval '90 minutes'),
  (gen_random_uuid(), 'af6841d9-0c77-4d24-986f-552f63a64b52', 4.3, -9, 14.1, now() - interval '30 minutes'),
  (gen_random_uuid(), '0e0d34ae-309e-4ef3-979f-d28a741b93d5', 11.5, -7, 9.8, now() - interval '4 hours'),
  (gen_random_uuid(), 'd1f775d8-46d3-4a41-8f31-3ae59a1c5bcb', 6.1, -3, 18.0, now() - interval '50 minutes');

-- ============================================================
-- 4. Road Reports
-- ============================================================

INSERT INTO road_reports (road_id, resort_id, road_status, visibility, updated_at)
VALUES
  (gen_random_uuid(), 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832', 'icy', 'limited', now() - interval '45 minutes'),
  (gen_random_uuid(), '13a5902c-7c3e-4c7d-8a6d-1acb510ab9af', 'clear', 'good', now() - interval '3 hours'),
  (gen_random_uuid(), '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7', 'closed', 'poor', now() - interval '15 minutes'),
  (gen_random_uuid(), 'af6841d9-0c77-4d24-986f-552f63a64b52', 'traction required', 'limited', now() - interval '1 hour'),
  (gen_random_uuid(), '0e0d34ae-309e-4ef3-979f-d28a741b93d5', 'snow packed', 'good', now() - interval '2 hours'),
  (gen_random_uuid(), 'd1f775d8-46d3-4a41-8f31-3ae59a1c5bcb', 'chains advised', 'poor', now() - interval '20 minutes');

-- ============================================================
-- 5. Posts
-- ============================================================

INSERT INTO posts (post_id, user_id, resort_id, caption, vibe_tag, photo_url)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832',
   'First run of the day — perfect snow!', 'stoked', 'https://images.example.com/aspen1.jpg'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7',
   'Doha Snow Dome never disappoints!', 'indoorszn', 'https://images.example.com/doha1.jpg'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', '0e0d34ae-309e-4ef3-979f-d28a741b93d5',
   'Tahoe storm cycles are back—tree lines were dreamy.', 'deepday', 'https://images.example.com/tahoe1.jpg'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'af6841d9-0c77-4d24-986f-552f63a64b52',
   'Summit Basin wind buff makes for silky groomers.', 'fastlaps', NULL),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'd1f775d8-46d3-4a41-8f31-3ae59a1c5bcb',
   'Cascade Crossing cat track opened the ridge—huge views.', 'adventure', 'https://images.example.com/cascade1.jpg');

-- ============================================================
-- 6. Favorites
-- ============================================================

INSERT INTO favorites (favorite_id, user_id, resort_id)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'f3b28a1c-09ab-4ac7-9ed4-1a6d0bdfb832'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', '8a9c0c21-df3b-4b71-b7f9-d1390a6cbfe7'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', '0e0d34ae-309e-4ef3-979f-d28a741b93d5'),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'af6841d9-0c77-4d24-986f-552f63a64b52');

-- ============================================================
-- 7. Notifications
-- ============================================================

INSERT INTO notifications (notification_id, user_id, type, message, sent_at, read)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'system', 'Welcome to Bluebird!', now() - interval '1 day', true),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'message', 'You have a new comment on your post.', now() - interval '4 hours', false),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'alert', 'Chain controls now in effect for Summit Basin.', now() - interval '35 minutes', false),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'carpool', '3 seats open from Doha to Snow Dome this evening.', now() - interval '2 hours', false),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'message', 'Group ride check-in is starting now.', now() - interval '15 minutes', false);

-- ============================================================
-- 8. Verifications
-- ============================================================

INSERT INTO verifications (verification_id, user_id, status, reviewed_at)
VALUES
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'approved', now()),
  (gen_random_uuid(), '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e', 'pending', NULL);
