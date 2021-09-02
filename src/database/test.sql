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




CREATE TABLE drink(
    idDdrink SERIAL PRIMARY KEY,
    descriptionDrink TEXT,
    nameDrink varchar(40),
    amountDrink int
)

CREATE TABLE DrinkData(
    idDdrink BIGINT,
    idCategory BIGINT,
    price FLOAT,
    urlImg TEXT,
    PRIMARY KEY (idDdrink ),
    FOREIGN KEY (idDdrink ) REFERENCES drink(idDdrink )
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
    numberPurchase BIGINT,
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
CREATE TABLE purchaseDrink(
    idDdrink  BIGINT,
    idPurchase BIGINT, 
    amount int,
    PRIMARY KEY (idDdrink , idPurchase),
    FOREIGN KEY (idDdrink ) REFERENCES drink(idDdrink )
    on delete cascade,
    FOREIGN KEY (idPurchase) REFERENCES purchase(idPurchase)
    on delete cascade 
)
CREATE TABLE cart(
    idCostumer BIGINT,
    idDdrink BIGINT,
    amount int,
    PRIMARY KEY (idCostumer, idDdrink),
    FOREIGN KEY (idCostumer) REFERENCES costumer(idCostumer)
    on delete cascade
    on update cascade,
    FOREIGN KEY (idDdrink ) REFERENCES drink(idDdrink )
    on delete cascade 
    on update cascade
)
