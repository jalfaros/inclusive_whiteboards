USE inclusive_whiteboards;
GO


CREATE TABLE workflows(
	flowId int identity(1,1) not null primary key,
	flowName varchar(50) NOT NULL,
	flowDescription varchar(100) not null,
	flowCreatedAt datetime not null default CURRENT_TIMESTAMP,
	flowOwnerId int not null,
	FOREIGN KEY (flowOwnerId) references user_login(id)
)

GO

SELECT * FROM workflows

insert into workflows (flowName,flowDescription, flowOwnerId) values ('Test', 'Description',1)