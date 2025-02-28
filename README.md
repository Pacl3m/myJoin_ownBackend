Projekt starten – Schnellstartanleitung  

1. Repository klonen:  
git clone https://github.com/DEIN-GITHUB-NAME/DEIN-REPO.git  
cd DEIN-REPO  

2. Backend starten (Django):  
cd backend  
python -m venv venv  
source venv/bin/activate (Windows: venv\Scripts\activate)  
pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver 127.0.0.1:8000  

3. Frontend starten (React/Vue/Angular):  
cd frontend  
npm install  
npm start (Angular: ng serve)  

Backend läuft unter: http://127.0.0.1:8000/  
Frontend läuft unter: http://localhost:3000/ (React/Vue) oder http://localhost:4200/ (Angular)  
