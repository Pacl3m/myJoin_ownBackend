Projekt starten – Schnellstartanleitung

Backend starten (Django): python -m venv venv
source venv/bin/activate (Windows: venv\Scripts\activate)
pip install -r requirements.txt (Voraussetzung ist, dass Python und pip installiert sind) python manage.py makemigrations python manage.py migrate
python manage.py runserver

Frontend starten: Öffne das Frontend-Projekt in VS Code. Klicke mit Rechtsklick auf die index.html. Wähle "Open with Live Server".

Backend läuft unter: http://127.0.0.1:8000/
