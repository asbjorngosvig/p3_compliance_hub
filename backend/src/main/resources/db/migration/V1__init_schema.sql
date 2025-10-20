-- CUSTOMER
CREATE TABLE CUSTOMER (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(100) NOT NULL
);

-- PRODUCT
CREATE TABLE PRODUCT (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- DATA_PROCESSOR
CREATE TABLE DATA_PROCESSOR (
    data_processor_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hosting_location VARCHAR(255),
    service VARCHAR(255),
    purpose TEXT,
    note TEXT,
    website VARCHAR(255)
);

-- PRODUCT_DATA_PROCESSOR (Many-to-Many)
CREATE TABLE PRODUCT_DATA_PROCESSOR (
    product_id INT NOT NULL,
    data_processor_id INT NOT NULL,
    PRIMARY KEY (product_id, data_processor_id),
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE,
    FOREIGN KEY (data_processor_id) REFERENCES DATA_PROCESSOR(data_processor_id) ON DELETE CASCADE
);

-- DATA_PROCESSING_AGREEMENT
CREATE TABLE DATA_PROCESSING_AGREEMENT (
    data_processing_agreement_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL UNIQUE,
    product_id INT NOT NULL,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_changed_date DATE NOT NULL DEFAULT CURRENT_DATE,
    file VARCHAR(255),
    type VARCHAR(100),
    is_standard BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE
);

-- REQUIREMENT
CREATE TABLE REQUIREMENT (
    requirement_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_standard BOOLEAN NOT NULL DEFAULT FALSE
);

-- DATA_PROCESSING_AGREEMENT_REQUIREMENT (Many-to-Many)
CREATE TABLE DATA_PROCESSING_AGREEMENT_REQUIREMENT (
    data_processing_agreement_id INT NOT NULL,
    requirement_id INT NOT NULL,
    PRIMARY KEY (data_processing_agreement_id, requirement_id),
    FOREIGN KEY (data_processing_agreement_id) REFERENCES DATA_PROCESSING_AGREEMENT(data_processing_agreement_id) ON DELETE CASCADE,
    FOREIGN KEY (requirement_id) REFERENCES REQUIREMENT(requirement_id) ON DELETE CASCADE
);

-- USER
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- CONTRACTUAL_SAFEGUARD
CREATE TABLE CONTRACTUAL_SAFEGUARD (
    safeguard_id SERIAL PRIMARY KEY,
    data_processor_id INT NOT NULL,
    safeguard_type VARCHAR(50) NOT NULL,
    details TEXT,
    FOREIGN KEY (data_processor_id) REFERENCES DATA_PROCESSOR(data_processor_id) ON DELETE CASCADE
);