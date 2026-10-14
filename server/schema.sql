-- Applied by the server on start; every statement is safe to run again.

-- One row: the details the public contact card shows. Absent until the owner first saves.
CREATE TABLE IF NOT EXISTS contact (
  id TINYINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  owner VARCHAR(120) NOT NULL,
  phones JSON NOT NULL,
  email VARCHAR(254) NOT NULL,
  address VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone CHAR(10) NOT NULL,
  service VARCHAR(120) NOT NULL,
  travel_date DATE NOT NULL,
  message VARCHAR(1000) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  -- the inbox lists newest first
  INDEX enquiries_created_at (created_at)
);
