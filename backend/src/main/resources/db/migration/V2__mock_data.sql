-- USERS
INSERT INTO users (name, email, password, role)
VALUES
('Mikkel H', 'mikkel@compliancehub.dk', 'hashedpassword1', 'admin'),
('Sofie J', 'sofie@compliancehub.dk', 'hashedpassword2', 'employee'),
('Jonas K', 'jonas@compliancehub.dk', 'hashedpassword3', 'employee');

-- CUSTOMERS
INSERT INTO customer (name, institution_type)
VALUES
    ('Aalborg Universitet', 'University');

-- PRODUCTS
INSERT INTO product (name, description)
VALUES
    ('WiseFlow Originality', '<Goated software til eksaminer>');

-- DATA PROCESSORS
INSERT INTO data_processor (name, hosting_location, service, purpose, note, website)
VALUES
('Amazon Web Services', 'EU (Frankfurt)', 'Cloud Infrastructure', 'Hosting af data', NULL, 'https://aws.amazon.com'),
('OpenAI (ChatGPT)', 'USA', 'AI API', 'Tekstgenerering og analyse', NULL, 'https://openai.com');

-- RELATION mellem PRODUCT og DATA_PROCESSOR (many-to-many)
INSERT INTO product_data_processor (product_id, data_processor_id)
VALUES
(1, 1),
(1, 2);

-- DATA PROCESSING AGREEMENT
INSERT INTO data_processing_agreement (customer_id, product_id, file, type, is_standard)
VALUES
(1, 1, NULL, 'Standard Agreement', True);