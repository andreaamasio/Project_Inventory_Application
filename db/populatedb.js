#! /usr/bin/env node
require("dotenv").config()
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL
);

INSERT INTO categories (name) 
VALUES
  ('Honey'),
  ('Olive Oil'),
  ('Tea'),
  ('Coffee'),
  ('Jams'),
  ('Massage Oil'),
  ('Soap');

CREATE TABLE IF NOT EXISTS producers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL
);

INSERT INTO producers (name) 
VALUES
  ('Amasio'),
  ('KetoCentrum'),
  ('Rossi'),
  ('Kukuriku'),
  ('Bukowska');

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  CategoriesID INTEGER  REFERENCES categories(id),
  ProducersID INTEGER  REFERENCES producers(id),
  Price NUMERIC(10,2),
  Quantity INTEGER,
  Best_Before_Date DATE,
  Image_URL TEXT
);

INSERT INTO products (name, CategoriesID, ProducersID, Price, Quantity, Best_Before_Date, Image_URL) 
VALUES
  ('Manuka Honey', 1 , 1 , 10.5, 25, '2027-03-20', '/public/images/honey.jpg'),
  ('Eucalyptus Honey', 1 , 2 , 10.5, 25, '2027-03-20', '/public/images/honey.jpg'),
  ('Carbonia Olive Oil EVO', 2 , 3 , 10.5, 25, '2027-03-20', '/public/images/olive_oil.jpg'),
  ('Porto Pino Olive Oil EVO', 2 , 4 , 10.5, 25, '2027-03-20', '/public/images/olive_oil.jpg'),
  ('Organic Mint Tea', 3 , 5 , 10.5, 25, '2027-03-20', '/public/images/tea.jpg'),
  ('Organic Lavender Tea', 3 , 1 , 10.5, 25, '2027-03-20', '/public/images/tea.jpg'),
  ('Organic Costa Rica Coffee', 4 , 2 , 10.5, 25, '2027-03-20', '/public/images/coffee.jpg'),
  ('Organic Guatemala Coffee', 4 , 3 , 10.5, 25, '2027-03-20', '/public/images/coffee.jpg'),
  ('Organic Black Fig Jam', 5 , 4 , 10.5, 25, '2027-03-20', '/public/images/jam.jpg'),
  ('Organic Pear Cinnamon Jam', 5 , 5 , 10.5, 25, '2027-03-20', '/public/images/jam.jpg'),
  ('Organic Almond Oil for Massage', 6 , 1 , 10.5, 25, '2027-03-20', '/public/images/massage_oil.jpg'),
  ('Organic Coconut Oil for Massage', 6 , 2 , 10.5, 25, '2027-03-20', '/public/images/massage_oil.jpg'),
  ('Organic Rosemary Soap', 7 , 3 , 10.5, 25, '2027-03-20', '/public/images/soap.jpg'),
  ('Organic Basil Soap', 7 , 4 , 10.5, 25, '2027-03-20', '/public/images/soap.jpg');

`

async function main() {
  console.log("seeding...")
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
