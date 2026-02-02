
CREATE TABLE IF NOT EXISTS banners (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    image_url TEXT,
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS objects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    distance VARCHAR(50),
    verified BOOLEAN DEFAULT false,
    safety_zone VARCHAR(50),
    image TEXT,
    emoji TEXT,
    audio_available BOOLEAN DEFAULT false,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    date VARCHAR(50),
    date_time DATE,
    time VARCHAR(50),
    location VARCHAR(255),
    location_id INTEGER,
    price VARCHAR(100),
    image TEXT,
    emoji TEXT,
    verified BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    description TEXT,
    distance VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(100),
    distance VARCHAR(50),
    difficulty VARCHAR(50),
    image TEXT,
    emoji TEXT,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS route_stops (
    id SERIAL PRIMARY KEY,
    route_id INTEGER,
    object_id INTEGER,
    order_num INTEGER NOT NULL,
    duration VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50),
    duration VARCHAR(100),
    points INTEGER DEFAULT 0,
    image TEXT,
    emoji TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category VARCHAR(100),
    published_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    object_id INTEGER,
    event_id INTEGER,
    route_id INTEGER,
    author_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    is_moderated BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lost_found (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) CHECK (type IN ('lost', 'found')),
    category VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date VARCHAR(50),
    emoji TEXT,
    contact_info TEXT,
    is_active BOOLEAN DEFAULT true,
    is_moderated BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    count INTEGER DEFAULT 0,
    gradient VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_objects_category ON objects(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date_time);
CREATE INDEX IF NOT EXISTS idx_routes_difficulty ON routes(difficulty);
CREATE INDEX IF NOT EXISTS idx_reviews_moderated ON reviews(is_moderated);
CREATE INDEX IF NOT EXISTS idx_lost_found_type ON lost_found(type);
