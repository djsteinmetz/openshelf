DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Books;

CREATE TABLE Users (
    interopID INTEGER PRIMARY KEY AUTO_INCREMENT,
    ID TEXT,
    FullName TEXT,
    Email TEXT,
    Password TEXT,
    Active BOOLEAN,
    Verified BOOLEAN,
    Roles TEXT,
    Favorites TEXT,
    InstagramURL TEXT,
    FacebookURL TEXT,
    TikTokURL TEXT,
    TwitterURL TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Books (
    interopID INTEGER PRIMARY KEY AUTO_INCREMENT,
    ISBN TEXT,
    Title TEXT NOT NULL,
    Author TEXT NOT NULL,
    Description TEXT NOT NULL,
    Genre TEXT,
    Status ENUM('Active', 'Selected', 'Shelved', 'Retired') /* WORK IN PROGRESS */
    PhysicalFormat TEXT,
    NumberOfPages TEXT,
    OwnerID TEXT REFERENCES Users(ID),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Books (Title, Author, Description, Genre, OwnerID) values ('To Kill a Mockingbird', 'Harper Lee', "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and, instantly successful in the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.", 'Fiction', 'djsteinmetz');
INSERT INTO Books (Title, Author, Description, Genre, OwnerID) values ('Where the Crawdads Sing', 'Delia Owens',"Where the Crawdads Sing is a 2018 novel by American author Delia Owens. It has topped The New York Times Fiction Best Sellers of 2019 and The New York Times Fiction Best Sellers of 2020 for a combined 32 non-consecutive weeks. As of late January 2021, the book has spent 124 weeks on the best seller list.", 'Fiction', 'djsteinmetz');