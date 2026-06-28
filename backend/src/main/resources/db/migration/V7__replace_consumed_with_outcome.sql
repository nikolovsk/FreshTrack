ALTER TABLE grocery_item
ADD COLUMN outcome VARCHAR(30);

UPDATE grocery_item
SET outcome = 'CONSUMED'
WHERE consumed = true;

UPDATE grocery_item
SET outcome = 'ACTIVE'
WHERE outcome IS NULL;

ALTER TABLE grocery_item
    ALTER COLUMN outcome SET NOT NULL;

ALTER TABLE grocery_item
    DROP COLUMN consumed;