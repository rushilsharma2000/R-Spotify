CREATE TABLE Organization (
    EmployeeName VARCHAR(50) PRIMARY KEY,
    ReportsTo VARCHAR(50),
    CONSTRAINT ReportsToFK FOREIGN KEY (ReportsTo) REFERENCES Organization(EmployeeName)
);

SELECT EmployeeName FROM Organization WHERE ReportsTo = 'shyam';

WITH RECURSIVE Suborganization AS (
    SELECT EmployeeName, ReportsTo
    FROM Organization
    WHERE ReportsTo = 'sandeep'
    UNION ALL
    SELECT o.EmployeeName, o.ReportsTo
    FROM Organization o
    JOIN Suborganization s ON o.ReportsTo = s.EmployeeName
)
SELECT EmployeeName
FROM Suborganization;

WITH RECURSIVE ManagementChain AS (
    SELECT EmployeeName, ReportsTo FROM Organization
    WHERE EmployeeName = 'mohan'
    UNION ALL
    SELECT o.EmployeeName, o.ReportsTo
    FROM Organization o
    JOIN ManagementChain m ON o.EmployeeName = m.ReportsTo
)
SELECT EmployeeName FROM ManagementChain;

WITH RECURSIVE LoopDetection AS (
    SELECT EmployeeName, ReportsTo, 1 AS Level
    FROM Organization
    UNION ALL
    SELECT o.EmployeeName, o.ReportsTo, ld.Level + 1
    FROM Organization o
    JOIN LoopDetection ld ON o.ReportsTo = ld.EmployeeName
)
SELECT * FROM LoopDetection WHERE Level > 1;

INSERT INTO Organization (EmployeeName, ReportsTo)
VALUES ('rushil', 'rajeev');

DELETE FROM Organization
WHERE EmployeeName = 'mohan';


UPDATE Organization
SET ReportsTo = 'rajeev'
WHERE EmployeeName = 'vikram';


SET ReportsTo = 'rajeev'
WHERE ReportsTo = 'sundar';