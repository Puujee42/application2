@echo off
echo ====================================
echo Supabase Database Setup
echo ====================================
echo.

echo Step 1: Pushing Prisma schema to database...
call npx prisma db push
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to push schema to database!
    echo Please check your DATABASE_URL in .env file.
    pause
    exit /b 1
)

echo.
echo Step 2: Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to generate Prisma Client!
    pause
    exit /b 1
)

echo.
echo Step 3: Seeding database with initial data...
call npm run db:seed
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to seed database!
    pause
    exit /b 1
)

echo.
echo ====================================
echo SUCCESS! Database setup complete!
echo ====================================
echo.
echo You can now run: npm run dev
echo.
pause
