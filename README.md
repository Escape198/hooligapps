# Fullstack Form Submission App

This project is a **fullstack application** with:

- **Backend**: FastAPI + SQLite
- **Frontend**: React (Vite)

It consists of:

✅ A form to submit data (date, first name, last name)  
✅ Server-side validation (no whitespaces)  
✅ History page to display the last 10 submissions with aggregated counts  
✅ URL serialization of the form  
✅ Loading indicators (spinners)  
✅ CORS support  

---

## 📂 Project Structure
```bash
root/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── services.py
│ │ ├── repositories.py
│ │ └── database.py
│ └── requirements.txt
└── frontend/
└── (Vite React app)
```

---

## 🚀 How to Run From Scratch

Follow these steps carefully:

### 1️⃣ Backend

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```
2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

The API will be available at http://localhost:8000

---

### 2️⃣ Frontend

1. **Navigate to frontend directory:**
    ```bash
    cd frontend
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
5. **Start the development server:**
    ```bash
    npm run dev
    ```

The app will be available at http://localhost:5173

---

🛠️ How It Works

Page 1 – Home
- Shows navigation links to the form and history pages.

Page 2 – Form Submission
- Form with:
  - Date (input type="date")
  - First name
  - Last name
- Validation:
  - No spaces allowed in first_name and last_name
- On submit:
  - POST request to /submit
  - Random delay up to 3 seconds
  - If successful:
    - Renders response data (2–5 items)
    - Serializes form data into the URL
  - If error:
    - Displays field-specific error messages
  - Spinner is shown while loading
- On page load:
  - If URL contains form data, automatically triggers submission (no spinner if data is already preloaded)

Page 3 – History
- Fetches the last 10 submissions
- Displays them in a table
- For each record:
  - Date
  - First name
  - Last name
  - Count of previous submissions for that (first name + last name)

What to Test
- ✅ Form submission with valid data
- ✅ Submission with spaces in names (should return validation error)
- ✅ URL serialization – after submitting, reload the page and confirm data is preloaded
- ✅ History page shows 10 latest records sorted by date and name, with counts
- ✅ CORS – test from frontend running on a different port (localhost:5173)
