CREATE TABLE users(
  user_id serial PRIMARY KEY,
  user_uuid UUID NOT NULL,
  email VARCHAR (320) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  powerlifting BOOLEAN,
  weightlifting BOOLEAN,
  strongman BOOLEAN,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP,
  phone TEXT UNIQUE,
  bio TEXT
);

CREATE TABLE gyms(
  place_id VARCHAR(255) PRIMARY KEY,
  gym_name VARCHAR(255) NOT NULL,
  membership_count INTEGER,
  review_score DOUBLE PRECISION,
  review_count INTEGER,
  coordinates POINT NOT NULL,
  photo_url TEXT,
  powerlifting BOOLEAN,
  weightlifting BOOLEAN,
  strongman BOOLEAN,
  bodybuilding BOOLEAN,
  inserted_on TIMESTAMP NOT NULL
);

CREATE TABLE exercises(
  exercise_id serial PRIMARY KEY,
  exercise_name VARCHAR(255) UNIQUE NOT NULL,
  exercise_type VARCHAR(255) NOT NULL,
  inserted_on TIMESTAMP NOT NULL
);

CREATE TABLE equipment(
  equipment_id serial PRIMARY KEY,
  equipment_name VARCHAR(255) UNIQUE NOT NULL,
  brand VARCHAR(255),
  equipment_type VARCHAR NOT NULL
);

CREATE TABLE gym_members(
  user_id INTEGER NOT NULL,
  user_uuid UUID NOT NULL,
  place_id VARCHAR(255) NOT NULL,
  gym_name VARCHAR(255) NOT NULL,
  join_date DATE,
  PRIMARY KEY(user_id, place_id)
);

CREATE TABLE lifter_stats(
  user_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  date_lifted DATE,
  PRIMARY KEY(user_id, exercise_id, reps)
);

CREATE TABLE gym_equipment(
  place_id VARCHAR(255) NOT NULL,
  equipment_id INTEGER NOT NULL,
  count INTEGER,
  PRIMARY KEY(place_id, equipment_id)
);

INSERT INTO exercises VALUES (DEFAULT, 'Snatch', 'Snatch',  NOW());
INSERT INTO exercises VALUES (DEFAULT, 'Clean and Jerk', 'Clean and Jerk', NOW());
INSERT INTO exercises VALUES (DEFAULT, 'Jerk', 'Jerk', NOW());
INSERT INTO exercises VALUES (DEFAULT, 'Squat', 'Squat', NOW());
INSERT INTO exercises VALUES (DEFAULT, 'Deadlift', 'Pull', NOW());
INSERT INTO exercises VALUES (DEFAULT, 'Bench Press', 'Bench Press', NOW());
INSERT INTO exercises VALUES (DEFAULT, 'Front Squat', 'Squat', NOW());