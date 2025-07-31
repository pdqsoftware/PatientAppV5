# Proof of concept for a simple patient maintenance application

This full-stack application allows medical staff to register patients, track height/weight, and calculate BMI and age. 
Built with Angular and ASP.NET Core with an SQLite database.

## 🧱 Technologies
- Angular CLI: 19.2.15
- Node: 20.19.4
- Package Manager: npm 10.8.2
- OS: win32 x64
- ASP.NET Core Web API
- SQLite
- Angular Material

## 🔧 Setup Instructions

### Backend (C#)

bash shell:
cd .  (project root)
dotnet tool install --global dotnet-ef
cd PatientAppV5.Server
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
http://localhost:5082/api/patients  (should get a JSON response from the server)

### Frontend (Angular)

The above `dotnet run` command also starts the frontend
http://localhost:4200
