# Θέα Γνώση 🎓

Μια σύγχρονη εκπαιδευτική web εφαρμογή που αναπτύχθηκε με **Next.js**, **TypeScript** και **WordPress ως Headless CMS**.

Το project συνδυάζει ένα σύγχρονο React frontend με WordPress backend για τη διαχείριση μαθημάτων, αξιολογήσεων, περιεχομένου και προσωπικού εκπαιδευτικού υλικού μαθητών.

## 🌐 Live Demo

Η static portfolio έκδοση της εφαρμογής είναι διαθέσιμη μέσω GitHub Pages:

**https://baggdits.github.io/thea-gnosi/**

> Η online έκδοση λειτουργεί ως portfolio demo.  
> Το πλήρες authentication και η επικοινωνία με το WordPress backend λειτουργούν στο local/full-stack περιβάλλον της εφαρμογής.

---

## ✨ Χαρακτηριστικά

- Σύγχρονο responsive design
- Headless WordPress αρχιτεκτονική
- Δυναμική διαχείριση μαθημάτων
- Ξεχωριστή σελίδα για κάθε μάθημα
- Custom πληροφορίες μαθημάτων
- Αξιολογήσεις μέσω WordPress
- Gallery εκπαιδευτικού χώρου
- Interactive Hero section
- Responsive navigation και mobile menu
- JWT Authentication
- Προσωπικό Dashboard μαθητή
- Προσωπικές σημειώσεις και εκπαιδευτικό υλικό
- Static portfolio mode για GitHub Pages
- Automated testing
- Continuous Integration
- Automated GitHub Pages deployment

---

## 🛠 Τεχνολογίες

### Frontend

- Next.js 16
- React
- TypeScript
- CSS
- Next.js App Router

### Backend

- WordPress
- Custom WordPress Plugin
- WordPress REST API
- Custom REST API endpoints
- Custom Post Types
- Custom lesson fields
- JWT Authentication

### Testing & Code Quality

- Vitest
- React Testing Library
- jsdom
- ESLint
- TypeScript
- GitHub Actions

### Deployment

- Next.js Static Export
- GitHub Pages
- GitHub Actions

---

## 🏗 Αρχιτεκτονική

Η πλήρης εφαρμογή χρησιμοποιεί το WordPress ως **Headless CMS**.

```text
WordPress
    │
    │ REST API
    ▼
Next.js
    │
    ├── Δημόσια ιστοσελίδα
    ├── Μαθήματα
    ├── Αξιολογήσεις
    ├── Gallery εγκαταστάσεων
    ├── Authentication
    └── Dashboard μαθητών
```

Το WordPress είναι υπεύθυνο για τη διαχείριση του περιεχομένου, ενώ το Next.js αναλαμβάνει το frontend και το user experience.

Η επικοινωνία μεταξύ των δύο εφαρμογών πραγματοποιείται μέσω του WordPress REST API και custom REST endpoints.

---

## 🌍 GitHub Pages Portfolio Mode

Το WordPress backend λειτουργεί στο local development environment και δεν είναι δημόσια διαθέσιμο.

Για να μπορεί το project να παρουσιαστεί online μέσω GitHub Pages, έχει δημιουργηθεί ξεχωριστός **static portfolio mode**.

Η διαδικασία είναι:

```text
WordPress
    │
    │ Snapshot generation
    ▼
Static JSON Data
    │
    ▼
Next.js Static Export
    │
    ▼
GitHub Pages
```

Τα δεδομένα από το WordPress αποθηκεύονται σε static snapshot και οι απαραίτητες εικόνες αντιγράφονται τοπικά στο frontend.

Έτσι, το GitHub Pages deployment δεν χρειάζεται πρόσβαση στο local WordPress backend.

### Δημιουργία νέου snapshot

```bash
npm run snapshot:pages
```

Το command ενημερώνει τα static δεδομένα και τα media που χρησιμοποιούνται από την portfolio έκδοση.

---

## 📚 Μαθήματα

Τα μαθήματα διαχειρίζονται μέσω custom post type στο WordPress.

Κάθε μάθημα μπορεί να περιλαμβάνει:

- Τίτλο
- Featured image
- Περιγραφή
- Τάξεις
- Διάρκεια
- Τύπο μαθήματος
- Προετοιμασία
- Ύλη
- Αναλυτικό περιεχόμενο

Οι σελίδες των μαθημάτων χρησιμοποιούν dynamic route:

```text
/lessons/[slug]
```

Στο GitHub Pages portfolio mode, τα routes δημιουργούνται ως static pages κατά τη διαδικασία του build.

Παραδείγματα:

```text
/lessons/ancient-greek/
/lessons/latin/
/lessons/essay/
/lessons/history/
/lessons/programming/
/lessons/networks/
```

---

## 🔐 Σύνδεση μαθητών

Στην πλήρη έκδοση της εφαρμογής, οι εγγεγραμμένοι μαθητές μπορούν να συνδεθούν στον προσωπικό τους χώρο.

Η διαδικασία authentication χρησιμοποιεί JWT tokens.

```text
Login μαθητή
      │
      ▼
Next.js API
      │
      ▼
WordPress Authentication
      │
      ▼
JWT Token
      │
      ▼
Dashboard μαθητή
```

Μετά την επιτυχημένη σύνδεση, ο μαθητής αποκτά πρόσβαση στο προσωπικό του Dashboard.

---

## 🎭 Demo Authentication

Επειδή το GitHub Pages είναι static hosting και δεν εκτελεί Next.js API routes ή WordPress/PHP, η online portfolio έκδοση χρησιμοποιεί **Demo Login Mode**.

Στο live demo:

- Δεν πραγματοποιείται πραγματικό authentication
- Δεν αποστέλλονται credentials σε backend
- Ο χρήστης μπορεί να εισέλθει στο demo Dashboard
- Εμφανίζονται demo εκπαιδευτικές σημειώσεις

Το πραγματικό JWT authentication παραμένει διαθέσιμο στην πλήρη local έκδοση.

---

## 📝 Dashboard μαθητή

Στην πλήρη εφαρμογή, το Dashboard παρέχει στον μαθητή πρόσβαση στο προσωπικό εκπαιδευτικό υλικό που έχει δημιουργηθεί για αυτόν.

Περιλαμβάνει:

- Προσωποποιημένο μήνυμα καλωσορίσματος
- Προσωπικές σημειώσεις
- Εκπαιδευτικό υλικό
- Έλεγχο authentication
- Έλεγχο JWT token
- Αυτόματο redirect όταν το token είναι άκυρο ή έχει λήξει
- Χειροκίνητη αποσύνδεση

Η GitHub Pages έκδοση περιλαμβάνει demo Dashboard ώστε να μπορεί να παρουσιαστεί η λειτουργικότητα και το UI χωρίς ενεργό backend.

---

## 🧪 Automated Testing

Το project διαθέτει automated tests με **Vitest** και **React Testing Library**.

### Login Tests

Ελέγχονται μεταξύ άλλων:

- Η σωστή εμφάνιση της φόρμας
- Λανθασμένα στοιχεία σύνδεσης
- Επιτυχημένο login
- Αποθήκευση JWT token
- Αποθήκευση στοιχείων χρήστη
- Redirect στο Dashboard
- Error handling

### Dashboard Tests

Ελέγχονται:

- Προστασία του Dashboard
- Redirect όταν δεν υπάρχει token
- Φόρτωση σημειώσεων
- Περίπτωση χωρίς σημειώσεις
- Άκυρο ή ληγμένο token
- Logout

Για εκτέλεση των tests:

```bash
npm run test:run
```

Τρέχον test suite:

```text
9 tests passed
```

---

## ✅ Code Quality

### ESLint

```bash
npm run lint
```

Το project περνάει τον έλεγχο χωρίς ESLint errors.

```text
0 errors
```

### Automated Tests

```bash
npm run test:run
```

```text
9 tests passed
```

### Production Build

Για την πλήρη local εφαρμογή:

```bash
npm run build
```

### GitHub Pages Build

Για τη static portfolio έκδοση:

```bash
npm run build:pages
```

Το Pages build δημιουργεί static export στον φάκελο:

```text
out/
```

---

## 🔄 Continuous Integration

Το project χρησιμοποιεί **GitHub Actions** για αυτόματο έλεγχο του κώδικα.

Το CI pipeline εκτελεί:

```text
Install Dependencies
        │
        ▼
      ESLint
        │
        ▼
 Automated Tests
```

Έτσι κάθε αλλαγή στο repository μπορεί να ελεγχθεί αυτόματα πριν θεωρηθεί έτοιμη.

---

## 🚀 GitHub Pages Deployment

Η portfolio έκδοση γίνεται deploy αυτόματα μέσω GitHub Actions.

Η διαδικασία deployment είναι:

```text
Push στο main
      │
      ▼
GitHub Actions
      │
      ▼
Install Dependencies
      │
      ▼
Static Pages Build
      │
      ▼
Upload Artifact
      │
      ▼
GitHub Pages
```

Live εφαρμογή:

**https://baggdits.github.io/thea-gnosi/**

---

## 💻 Local Development

### 1. Εγκατάσταση dependencies

```bash
npm install
```

### 2. Environment variables

Δημιουργία αρχείου:

```text
.env.local
```

και προσθήκη του WordPress URL:

```env
WORDPRESS_URL=http://your-wordpress-site.local
```

### 3. Εκκίνηση development server

```bash
npm run dev
```

Η εφαρμογή είναι διαθέσιμη στο:

```text
http://localhost:3000
```

Η local έκδοση επικοινωνεί απευθείας με το WordPress backend.

---

## 📦 GitHub Pages Build

Για ενημέρωση της portfolio έκδοσης μετά από αλλαγές στο WordPress:

```bash
npm run snapshot:pages
```

και στη συνέχεια:

```bash
npm run build:pages
```

Το static export δημιουργείται στον φάκελο:

```text
out/
```

Μετά από push στο `main`, το GitHub Actions workflow αναλαμβάνει το deployment στο GitHub Pages.

---

## 📁 Δομή Project

```text
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── lessons/
│   │   └── [slug]/
│   ├── login/
│   └── our-place/
│
├── components/
│
├── data/
│   └── pages-snapshot.json
│
├── lib/
│   └── wordpress.ts
│
└── __tests__/

public/
└── demo-media/

scripts/
├── build-pages.mjs
└── create-pages-snapshot.mjs

.github/
└── workflows/
```

---

## 📌 Κατάσταση Project

- [x] Responsive frontend
- [x] Headless WordPress
- [x] Custom WordPress plugin
- [x] Δυναμικά μαθήματα
- [x] Individual lesson pages
- [x] Custom lesson fields
- [x] Αξιολογήσεις
- [x] Gallery εγκαταστάσεων
- [x] JWT Authentication
- [x] Dashboard μαθητών
- [x] Demo authentication για GitHub Pages
- [x] Static WordPress snapshot
- [x] Automated testing
- [x] ESLint validation
- [x] Production build validation
- [x] GitHub Actions CI
- [x] GitHub Pages deployment
- [x] Public portfolio demo

---

## 👨‍💻 Ανάπτυξη

Το **Θέα Γνώση** αναπτύχθηκε ως full-stack εκπαιδευτική web εφαρμογή με στόχο τον συνδυασμό ενός σύγχρονου frontend με ένα εύχρηστο σύστημα διαχείρισης περιεχομένου μέσω WordPress.

Το project καλύπτει διαφορετικά κομμάτια μιας σύγχρονης web εφαρμογής, όπως **frontend development, headless CMS architecture, REST APIs, authentication, dynamic content, automated testing, CI και static deployment**.

Η online έκδοση λειτουργεί ως portfolio demo, ενώ η πλήρης έκδοση διατηρεί τη σύνδεση με το WordPress backend και το σύστημα authentication.