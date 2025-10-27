# ChatRLB – User Manual
**Version:** 1.0  
**Team Name:** Cross Compile  
**Date:** 10/26/2025  

---

## 1. Introduction
ChatRLB is a web-application with the purpose of answering user questions related to topics covered by Red Letter Basics' resources using an AI system composed of a database and an LLM. Information relevant to the users' prompts will be retrieved from the database and used with the LLM to generate responses that are both accurate to the source material and relevant to the user.


---

## 2. System Requirements
- **Hardware:** - Computer or laptop - dual core processor - Internet connection
- **Software:** - Operating system - Web browser: Google Chrome, Microsoft Edge, Firefox (latest versions recommended)  - Backend Environment: Python 3.11+   - Django 4.x framework 
- **Other Dependencies:**  - HTML, CSS, and JavaScript for frontend functionality   - Installed packages from `requirements.txt`  

---

## 3. Installation Guide
1. **Clone the Project Repository**
   (bash)
   git clone https://github.com/jacob77Seven/ChatRLB.git
   cd ChatRLB
2. **Set up a Virtual Environment**
   python -m venv venv
   source venv/bin/activate   # Mac/Linux  
   venv\Scripts\activate      # Windows
3. **Install Required Dependencies**
   pip install -r requirements.txt
4. **Run Database Migrations**
   python manage.py migrate
5. **Start the Development Server**
   python manage.py runserver
6. **Access the Application**
   Open your browser and go to:
   http://127.0.0.1:8000
---

## 4. Getting Started
1. **Launch the Application**
  - After running the server, open the provided local URL in your browser.
  - The ChatRLB homepage will appear with a sidebar, chat input area, and profile icon.
2. **Click the "i" information icon**
  - Get information about the Red Letter Basics Ministry purpose and mission.
3. **Start a Chat**
  - Type in a question in the provided chat box area, hit enter or the send button and wait for a response.
  - Click the "New Chat" button to start a new conversation.

---

## 5. Features & Functions
### Feature 1: Intelligent AI Chat
- Description: Communicate with an AI model fine-tuned to understand Red Letter Basics content and return relevant answers.
- How to Use: Type your query in the text box and press Enter. The AI response will appear in the chat window.

### Feature 2: Sidebar Navigation
- Description: Manage your previous chats, create new ones, change settings and toggle the sidebar between compact and full view.
- How to Use: Click the hamburger icon to hide or show the sidebar. Click “New Chat” to start fresh.

### Feature 3: About page and Feedback
- Description: Access information about Red Letter Basics and leave Feedback.
- How to Use: Click the i icon to read the About page and click the bubble icon to send feedback about your experience.

### Feature 4: Text-to-Speech / Speech-to-Text 
- Description: Enables voice input and audio playback for accessibility and convenience.
- How to Use: Click the microphone icon to record a question or the speaker icon to hear the AI’s reply.
---

## 6. Troubleshooting
| Problem | Possible Cause | Solution |
|---------|----------------|----------|
| Server won’t start | Dependencies not installed | Run pip install -r requirements.txt |
| Page not loading | Wrong URL or port | Check the terminal for the local address (usually http://127.0.0.1:8000)|
| Database error | Migrations not applied | Run python manage.py migrate |
| Chat not responding | Backend service not running | Restart server with python manage.py runserver |
| Speech feature not working | Missing library | Install speech packages or disable feature temporarily |
---

## 7. FAQ *(Optional – Extra Credit)*
**Q:** Where does ChatRLB get its answers?  
**A:** From a curated internal database of Red Letter Basics resources.  

**Q:** What happens if the AI doesn’t respond?
**A:** Try refreshing the page or restarting the Django server using `python manage.py runserver`. If the issue continues, check your backend logs for connection errors.

**Q:** Is my data stored or tracked? 
**A:** ChatRLB only saves chats locally on the database for research and improvement purposes; no personal information is shared externally.

**Q:** How do I update the application? 
**A:** Pull the latest version from the GitHub repository using `git pull origin main` and restart the server.

---

## 8. Contact Information
- **Website:** https://redletterbasics.com
