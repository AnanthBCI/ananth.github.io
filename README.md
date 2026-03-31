# Ananth Ananthappan — Personal Portfolio Website

## 📁 File Structure

```
ananth.github.io/
├── index.html              ← Main homepage
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← JavaScript (nav, animations, typing effect)
├── articles/               ← Future blog articles go here
├── Ananth_Ananthappan_En_Common.docx  ← Your resume (copy here)
└── README.md
```

## 🚀 How to Deploy on GitHub Pages (Free)

### Step 1: Create the GitHub Repository
1. Go to [github.com](https://github.com) and log in
2. Create a new repository named exactly: `ananth.github.io`
3. Set it to **Public**

### Step 2: Upload Your Files
**Option A — GitHub Website (easiest):**
1. Open your repo on GitHub
2. Click **"Add file" → "Upload files"**
3. Drag and drop ALL files and folders from this project
4. Click **"Commit changes"**

**Option B — Git Command Line:**
```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/ananth/ananth.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under "Source", select **main branch** → **/ (root)**
3. Click **Save**

### Step 4: Your site is live! 🎉
Visit: **https://ananth.github.io**
(Takes 1–2 minutes to go live after first deploy)

## ✏️ How to Customize

### Update your info:
- Open `index.html` in any text editor
- Find and replace placeholder links (GitHub, LinkedIn, email)
- Add your photo: Replace the `.avatar-placeholder` div with an `<img>` tag

### Add your photo:
```html
<!-- Replace this in index.html -->
<div class="avatar-placeholder"><span>AA</span></div>

<!-- With this -->
<img src="photo.jpg" alt="Ananth Ananthappan" style="width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid rgba(59,130,246,0.3);" />
```

### Add a new article:
1. Create a new `.html` file in the `articles/` folder
2. Copy the template from any existing article file
3. Update the article card link in `index.html`

### Add your resume PDF:
- Place your resume PDF as `resume.pdf` in the root folder
- The Download Resume button will automatically link to it

## 🌐 Custom Domain (Optional)
To use `yourname.com` instead of `ananth.github.io`:
1. Buy a domain from Namecheap / GoDaddy
2. In GitHub repo → Settings → Pages → Custom Domain → enter your domain
3. Add a CNAME file to your repo with your domain name
4. Configure DNS at your registrar to point to GitHub Pages

## 📬 Contact Form
The contact form currently shows a success message on submit.
To make it actually send emails, use one of these free services:
- **Formspree** (free): Replace form action with `https://formspree.io/f/YOUR_ID`
- **Web3Forms** (free): Add their script and action URL

### Formspree setup (free):
1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a new form → Get your form ID
3. In `index.html`, update the form tag:
```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
```
4. Remove the JavaScript form handler (or keep both)
