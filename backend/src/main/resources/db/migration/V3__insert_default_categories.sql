INSERT INTO category (name) VALUES
    ('Fruits'),
    ('Vegetables'),
    ('Meat & Seafood'),
    ('Dairy'),
    ('Frozen food'),
    ('Canned food'),
    ('Bakery'),
    ('Grains & Pasta'),
    ('Spices & Sauces'),
    ('Snacks'),
    ('Sweets'),
    ('Beverages & Coffee'),
    ('Other')
ON CONFLICT (name) DO NOTHING;