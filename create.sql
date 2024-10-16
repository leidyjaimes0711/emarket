CREATE TABLE ROOM (ID INT AUTO_INCREMENT PRIMARY KEY, NAME VARCHAR(100) NOT NULL, DESCRIPTION VARCHAR(100) NOT NULL, IMAGE LONGBLOB NOT NULL);
DROP TABLE IF EXISTS ROOM;



CREATE TABLE Image (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       data LONGBLOB NOT NULL,
                       file_name varchar(100),
                       file_type varchar(100),
                       room_id INT,
                       FOREIGN KEY (room_id) REFERENCES Room(id) ON DELETE CASCADE
);