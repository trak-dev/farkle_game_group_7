CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  current_status varchar(20) DEFAULT 'waiting',
  max_players INT DEFAULT 5,
  dices_number INT DEFAULT 6
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(128) NOT NULL,
  password varchar(255) NOT NULL,
  pseudo varchar(64) NOT NULL
);

CREATE TABLE game_statuses (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL references users(id) ,
  game_id INT NOT NULL references games(id),
  clicked_start boolean DEFAULT false,
  remaining_dices INT NOT NULL,
  total_score INT DEFAULT 0,
  turn_score INT DEFAULT 0,
  is_playing boolean DEFAULT false
);
