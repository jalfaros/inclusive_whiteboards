USE inclusive_whiteboards;


GO

CREATE OR ALTER PROCEDURE register_user (
    @username varchar(20), 
    @password varchar(60),
    @firstName varchar(20),
    @secondName varchar(20),
    @lastName varchar(20)
)
AS
BEGIN
    DECLARE @success bit
    DECLARE @last_id int

    IF NOT EXISTS (SELECT * FROM user_login where username = @username)
    BEGIN
        INSERT INTO user_login (username, password) values (@username, @password)
        SET @last_id = SCOPE_IDENTITY()
        INSERT INTO user_details (id, firstName, secondName, lastName) values (@last_id, @firstName, @secondName, @lastName);
        SET @success = 1
    END
    ELSE
    BEGIN
        SET @success = 0
    END
    SELECT @success
END



