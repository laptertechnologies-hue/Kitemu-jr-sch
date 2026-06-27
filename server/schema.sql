CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    section_key VARCHAR(100) UNIQUE NOT NULL,
    text_value TEXT NOT NULL
);

-- Insert default admin user
INSERT INTO users (username, password) VALUES ('admin', 'admin123') ON CONFLICT DO NOTHING;

-- Insert default content
INSERT INTO content (section_key, text_value) VALUES 
('home_welcome', 'Welcome to Kitemu Junior School! We believe that Will Creates Way.'),
('home_about', 'Located in Kitemu - Kivu, Kyengera Town Council, we offer quality education from Nursery to P.7.'),
('donations_text', 'Support our Orphans. Any donation helps us provide education and necessities to vulnerable children.')
ON CONFLICT (section_key) DO UPDATE SET text_value = EXCLUDED.text_value;
