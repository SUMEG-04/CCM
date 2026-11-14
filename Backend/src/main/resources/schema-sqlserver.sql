-- SQL Server Schema & Seed Script for CCM User Authentication
-- Server: localhost\SQLEXPRESS
-- Database: ccm_db

-- 1. Ensure Database Exists
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ccm_db')
BEGIN
    CREATE DATABASE ccm_db;
END;
GO

USE ccm_db;
GO

-- 2. Create Users Table for Authentication
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE dbo.users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(255) NOT NULL UNIQUE,
        first_name NVARCHAR(255) NULL,
        last_name NVARCHAR(255) NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
        created_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END;
GO

-- 3. Insert or Update Admin Account with BCrypt encrypted password
-- Raw password: current@123
-- Encrypted (BCrypt salt factor 10): $2a$10$wE2Yk9uEw/j1V630d7R.K.sK56w1H6eFzYx2/v2iU72aV8o7vj7G6
IF NOT EXISTS (SELECT * FROM dbo.users WHERE username = 'admin@ccm.com' OR email = 'admin@ccm.com')
BEGIN
    INSERT INTO dbo.users (username, first_name, last_name, email, password, role, created_at)
    VALUES (
        'admin@ccm.com',
        'Admin',
        'CCM',
        'admin@ccm.com',
        '$2a$10$wE2Yk9uEw/j1V630d7R.K.sK56w1H6eFzYx2/v2iU72aV8o7vj7G6',
        'ROLE_ADMIN',
        GETDATE()
    );
END
ELSE
BEGIN
    UPDATE dbo.users 
    SET password = '$2a$10$wE2Yk9uEw/j1V630d7R.K.sK56w1H6eFzYx2/v2iU72aV8o7vj7G6',
        role = 'ROLE_ADMIN'
    WHERE username = 'admin@ccm.com' OR email = 'admin@ccm.com';
END;
GO

-- 4. Create SQL Server Login & Grant ccm_db DB Owner
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'admin@ccm.com')
BEGIN
    CREATE LOGIN [admin@ccm.com] WITH PASSWORD = 'current@123', CHECK_POLICY = OFF;
    ALTER SERVER ROLE sysadmin ADD MEMBER [admin@ccm.com];
END;
GO

USE ccm_db;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'admin@ccm.com')
BEGIN
    CREATE USER [admin@ccm.com] FOR LOGIN [admin@ccm.com];
    ALTER ROLE db_owner ADD MEMBER [admin@ccm.com];
END;
GO

