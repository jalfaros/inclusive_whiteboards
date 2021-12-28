USE inclusive_whiteboards;
GO;


create table workflowStatus(
	statusId int not null identity(1,1) primary key,
	statusIndex tinyint not null,
	statusName varchar (25) not null,
	flowId int not null, 
	foreign key (flowId) references workflows(flowId)
);


GO;

create table stickyNotes (
	stickyId int not null identity(1,1) primary key,
	stickyDescription varchar(50) not null,
	stickyCreatedAt datetime not null default CURRENT_TIMESTAMP,
	statusId int not null,
	foreign key (statusId) references workflowStatus(statusId)
)
