CREATE TABLE costumer(
    idCostumer SERIAL PRIMARY KEY,
    emailCostumer TEXT  NOT NULL UNIQUE
)

CREATE TABLE costumerData(
    idCostumer BIGINT,
     nameCostumer VARCHAR(40) NOT NULL,
     phonenumberCostumer VARCHAR(15),
     passwordCostumer TEXT,
     PRIMARY KEY (idCostumer),
	 FOREIGN  KEY (idCostumer) REFERENCES costumer(idCostumer)
	on delete cascade 
	on update cascade
)

CREATE TABLE category(
    idCategory SERIAL PRIMARY KEY,
    descriptionCategory TEXT,
    nameCategory VARCHAR(40)
)


CREATE TABLE providers(
    idProvider SERIAL PRIMARY KEY,
    nameProvider VARCHAR(40),
    emailProvider TEXT,
    phonenumber VARCHAR(15)
)


CREATE TABLE product(
    idProduct SERIAL PRIMARY KEY,
    descriptionProduct TEXT,
    nameProduct varchar(40),
    amountProduct int
)

CREATE TABLE productData(
    idProduct BIGINT,
    idCategory BIGINT,
    idProvider BIGINT,
    price FLOAT,
    urlImg TEXT,
    PRIMARY KEY (idProduct),
    FOREIGN KEY (idProduct) REFERENCES product(idProduct)
    on delete cascade
    on update cascade,
    FOREIGN KEY (idProvider) REFERENCES providers(idProvider)
    on delete cascade
    on update cascade,
    FOREIGN KEY (idCategory) REFERENCES category(idCategory)
    on delete cascade
    on update cascade
)


CREATE TABLE home(
    idHome SERIAL,
    homeAddress varchar(60),
    city varchar(50),
    descriptionHome TEXT,
    PRIMARY KEY (idHome)
)

CREATE TABLE purchase(
    idPurchase SERIAL,
    idCostumer BIGINT,
    idHome BIGINT,
    datePurchase datetime,
    processed boolean,
    PRIMARY KEY (idPurchase),
    FOREIGN KEY (idCostumer) REFERENCES costumer(idCostumer)
    on delete cascade 
    on update cascade,
    FOREIGN KEY (idHome) REFERENCES home(idHome)
    on delete cascade 
    on update cascade,
)
CREATE TABLE purchaseProduct(
    idProduct BIGINT,
    idPurchase BIGINT, 
    amount int,
    PRIMARY KEY (idProduct, idPurchase),
    FOREIGN KEY (idProduct) REFERENCES product(idProduct)
    on delete cascade,
    FOREIGN KEY (idPurchase) REFERENCES purchase(idPurchase)
    on delete cascade 
)
CREATE TABLE cart(
    idCostumer BIGINT,
    idProduct BIGINT,
    amount int,
    PRIMARY KEY (idCostumer, idProduct),
    FOREIGN KEY (idCostumer) REFERENCES costumer(idCostumer)
    on delete cascade
    on update cascade,
    FOREIGN KEY (idProduct) REFERENCES product(idProduct)
    on delete cascade 
    on update cascade
)
