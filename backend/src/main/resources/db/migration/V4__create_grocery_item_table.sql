CREATE TABLE grocery_item
(
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    quantity        INT          NOT NULL DEFAULT 1,
    price           DECIMAL(10, 2),
    purchase_date   DATE         NOT NULL,
    expiration_date DATE         NOT NULL,
    status          VARCHAR(30)  NOT NULL,
    created_at      TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    category_id     BIGINT       NOT NULL,
    user_id         BIGINT       NOT NULL,

    CONSTRAINT fk_grocery_item_category FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE RESTRICT,

    CONSTRAINT fk_grocery_item_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_grocery_item_user ON grocery_item(user_id);

CREATE INDEX idx_grocery_item_category ON grocery_item(category_id);