-- ============================================================
-- PORTABLE CRUD TEST SCRIPT (no psql variables)
-- ============================================================

BEGIN;

-- A tiny parameters CTE to avoid :placeholders
WITH params AS (
  SELECT '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid AS user_id
),

-- -------------------------------
-- C R E A T E
-- -------------------------------

-- Resort
new_resort AS (
  INSERT INTO resorts (name, location, description, has_parking)
  VALUES ('Test Summit', 'Somewhere', 'Demo resort for CRUD tests', true)
  RETURNING resort_id
),

-- Profile (unique on user_id)
upsert_profile AS (
  INSERT INTO profiles (user_id, name, experience_level, bio)
  SELECT p.user_id, 'Test User', 'beginner', 'Learning the ropes.'
  FROM params p
  ON CONFLICT (user_id) DO UPDATE
    SET updated_at = now()
  RETURNING profile_id
),

-- Weather report
weather AS (
  INSERT INTO weather_reports (resort_id, snowfall, temperature, wind_speed)
  SELECT r.resort_id, 10.5, -3, 8.2
  FROM new_resort r
  RETURNING weather_id
),

-- Road report
road AS (
  INSERT INTO road_reports (resort_id, road_status, visibility)
  SELECT r.resort_id, 'clear', 'good'
  FROM new_resort r
  RETURNING road_id
),

-- Post (belongs to user; resort ON DELETE SET NULL)
post AS (
  INSERT INTO posts (user_id, resort_id, caption, vibe_tag, photo_url)
  SELECT p.user_id, r.resort_id, 'Opening day laps!', 'stoked', 'https://example.com/pic.jpg'
  FROM params p CROSS JOIN new_resort r
  RETURNING post_id
),

-- Favorite (user + resort, unique pair)
fav AS (
  INSERT INTO favorites (user_id, resort_id)
  SELECT p.user_id, r.resort_id
  FROM params p CROSS JOIN new_resort r
  ON CONFLICT (user_id, resort_id) DO NOTHING
  RETURNING favorite_id
),

-- Notification
note AS (
  INSERT INTO notifications (user_id, type, message)
  SELECT p.user_id, 'system', 'Welcome to Test Summit!'
  FROM params p
  RETURNING notification_id
),

-- Verification (defaults to 'pending')
verif AS (
  INSERT INTO verifications (user_id)
  SELECT p.user_id FROM params p
  RETURNING verification_id
)

-- Summarize what got created
SELECT
  (SELECT resort_id       FROM new_resort)  AS created_resort_id,
  (SELECT profile_id      FROM upsert_profile) AS profile_id,
  (SELECT weather_id      FROM weather)     AS weather_id,
  (SELECT road_id         FROM road)        AS road_id,
  (SELECT post_id         FROM post)        AS post_id,
  (SELECT favorite_id     FROM fav)         AS favorite_id,
  (SELECT notification_id FROM note)        AS notification_id,
  (SELECT verification_id FROM verif)       AS verification_id;

-- -------------------------------
-- R E A D
-- -------------------------------

-- Profile by user
SELECT pr.*
FROM profiles pr, (SELECT '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid AS user_id) p
WHERE pr.user_id = p.user_id;

-- Resorts list
SELECT resort_id, name, location, has_parking
FROM resorts
ORDER BY name;

-- Latest weather for newest resort
SELECT wr.*
FROM weather_reports wr
WHERE wr.resort_id = (SELECT resort_id FROM resorts ORDER BY created_at DESC LIMIT 1)
ORDER BY report_time DESC
LIMIT 1;

-- Latest road status for newest resort
SELECT rr.*
FROM road_reports rr
WHERE rr.resort_id = (SELECT resort_id FROM resorts ORDER BY created_at DESC LIMIT 1)
ORDER BY updated_at DESC
LIMIT 1;

-- Posts by user (with resort name)
SELECT p.post_id, p.caption, p.vibe_tag, r.name AS resort_name, p.created_at
FROM posts p
LEFT JOIN resorts r ON r.resort_id = p.resort_id
WHERE p.user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
ORDER BY p.created_at DESC;

-- Favorites for user
SELECT f.resort_id, r.name, r.location, f.favorited_at
FROM favorites f
JOIN resorts r ON r.resort_id = f.resort_id
WHERE f.user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
ORDER BY r.name;

-- Unread notifications
SELECT *
FROM notifications
WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  AND read = false
ORDER BY sent_at DESC;

-- Pending verifications
SELECT *
FROM verifications
WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  AND status = 'pending'
ORDER BY created_at DESC;

-- -------------------------------
-- U P D A T E
-- -------------------------------

-- Update profile bio
UPDATE profiles
SET bio = 'Updated bio at ' || now()
WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
RETURNING *;

-- Edit resort details
UPDATE resorts
SET description = 'New description ' || now(),
    has_parking = NOT has_parking
WHERE resort_id = (SELECT resort_id FROM resorts ORDER BY created_at DESC LIMIT 1)
RETURNING *;

-- Fix weather reading
UPDATE weather_reports
SET temperature = temperature - 1
WHERE weather_id = (SELECT weather_id FROM weather_reports ORDER BY created_at DESC LIMIT 1)
RETURNING *;

-- Road status change
UPDATE road_reports
SET road_status = 'icy', visibility = 'limited', updated_at = now()
WHERE road_id = (SELECT road_id FROM road_reports ORDER BY created_at DESC LIMIT 1)
RETURNING *;

-- Edit a post caption
UPDATE posts
SET caption = 'Edited caption at ' || now(), updated_at = now()
WHERE post_id = (
  SELECT post_id
  FROM posts
  WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  ORDER BY created_at DESC
  LIMIT 1
)
RETURNING *;

-- Mark notifications as read
UPDATE notifications
SET read = true
WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  AND read = false
RETURNING notification_id, sent_at;

-- Approve verification
UPDATE verifications
SET status = 'approved', reviewed_at = now()
WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  AND status = 'pending'
RETURNING *;

-- -------------------------------
-- D E L E T E
-- -------------------------------

-- Remove latest post for user
DELETE FROM posts
WHERE post_id = (
  SELECT post_id FROM posts
  WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  ORDER BY created_at DESC LIMIT 1
)
RETURNING *;

-- Unfavorite newest resort
DELETE FROM favorites
WHERE user_id = '8b5c2ed0-adf0-42eb-9ea5-5c1de5492c4e'::uuid
  AND resort_id = (SELECT resort_id FROM resorts ORDER BY created_at DESC LIMIT 1)
RETURNING *;

-- Delete newest resort to test FKs:
--  - weather_reports / road_reports / favorites: ON DELETE CASCADE
--  - posts.resort_id: ON DELETE SET NULL
DELETE FROM resorts
WHERE resort_id = (SELECT resort_id FROM resorts ORDER BY created_at DESC LIMIT 1)
RETURNING *;

COMMIT;
