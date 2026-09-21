# Θέα Γνώση 🎓

Μια σύγχρονη εκπαιδευτική web εφαρμογή που αναπτύχθηκε με **Next.js** και **WordPress ως Headless CMS**.

Το project συνδυάζει ένα σύγχρονο frontend βασισμένο σε React με WordPress backend για τη διαχείριση μαθημάτων, αξιολογήσεων, περιεχομένου και προσωπικού εκπαιδευτικού υλικού μαθητών.

---

## ✨ Χαρακτηριστικά

- Σύγχρονο responsive design
- Headless WordPress αρχιτεκτονική
- Δυναμική διαχείριση μαθημάτων
- Ξεχωριστή σελίδα για κάθε μάθημα
- Αξιολογήσεις μέσω WordPress
- Gallery εκπαιδευτικού χώρου
- Σύνδεση μαθητών
- JWT Authentication
- Προσωπικό Dashboard μαθητή
- Προσωπικές σημειώσεις και εκπαιδευτικό υλικό
- Responsive navigation και mobile menu
- Interactive Hero section
- Automated testing
- Continuous Integration μέσω GitHub Actions

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
- JWT Authentication

### Testing & Code Quality

- Vitest
- React Testing Library
- jsdom
- ESLint
- TypeScript
- GitHub Actions

---

## 🏗 Αρχιτεκτονική

Το project χρησιμοποιεί το WordPress ως **Headless CMS**.

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
    └── Dashboard μαθητών
```

Το WordPress είναι υπεύθυνο για τη διαχείριση του περιεχομένου, ενώ το Next.js αναλαμβάνει το frontend και το user experience.

---

## 📚 Μαθήματα

Τα μαθήματα διαχειρίζονται μέσα από custom post type στο WordPress.

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

Οι σελίδες των μαθημάτων δημιουργούνται δυναμικά μέσω:

```text
/lessons/[slug]
```

---

## 🔐 Σύνδεση μαθητών

Οι εγγεγραμμένοι μαθητές μπορούν να συνδεθούν στον προσωπικό τους χώρο.

Η διαδικασία authentication χρησιμοποιεί JWT tokens.

```text
Login μαθητή
      ↓
Next.js API
      ↓
WordPress Authentication
      ↓
JWT Token
      ↓
Dashboard μαθητή
```

Μετά την επιτυχημένη σύνδεση, ο μαθητής αποκτά πρόσβαση στο προσωπικό του Dashboard.

---

## 📝 Dashboard μαθητή

Το Dashboard παρέχει στον μαθητή πρόσβαση στο προσωπικό εκπαιδευτικό υλικό που έχει δημιουργηθεί για αυτόν.

Περιλαμβάνει:

- Προσωποποιημένο μήνυμα καλωσορίσματος
- Προσωπικές σημειώσεις
- Εκπαιδευτικό υλικό
- Έλεγχο authentication
- Αυτόματο logout όταν το token είναι άκυρο ή έχει λήξει
- Χειροκίνητη αποσύνδεση

---

## 🧪 Automated Testing

Το project διαθέτει automated tests με **Vitest** και **React Testing Library**.

### Login Tests

Ελέγχονται:

- Η σωστή εμφάνιση της φόρμας
- Λανθασμένα στοιχεία σύνδεσης
- Επιτυχημένο login
- Αποθήκευση JWT token
- Αποθήκευση στοιχείων χρήστη
- Redirect στο Dashboard
- Περίπτωση απουσίας token από το API

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

## ✅ Έλεγχος ποιότητας κώδικα

Για ESLint:

```bash
npm run lint
```

Το project περνάει τον έλεγχο με:

```text
0 errors
```

Για production build:

```bash
npm run build
```

Το Next.js production build ολοκληρώνεται επιτυχώς στο local development environment.

---

## 🔄 Continuous Integration

Το project χρησιμοποιεί **GitHub Actions** για αυτόματο έλεγχο του κώδικα σε κάθε push στο `main` και σε pull requests.

Το CI pipeline εκτελεί:

```text
Εγκατάσταση dependencies
          ↓
        ESLint
          ↓
    Automated Tests
```

Το production build ελέγχεται προς το παρόν τοπικά, επειδή το WordPress backend λειτουργεί σε local development environment.

Μελλοντικά, όταν το WordPress backend γίνει διαθέσιμο online, το production build μπορεί να προστεθεί και στο CI pipeline.

---

## 🚀 Local Development

Εγκατάσταση dependencies:

```bash
npm install
```

Δημιουργία αρχείου:

```text
.env.local
```

και προσθήκη του WordPress URL:

```env
WORDPRESS_URL=http://your-wordpress-site.local
```

Εκκίνηση development server:

```bash
npm run dev
```

Η εφαρμογή είναι διαθέσιμη στο:

```text
http://localhost:3000
```

---

## 📁 Δομή Project

```text
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── lessons/
│   ├── login/
│   └── our-place/
│
├── components/
│
├── lib/
│   └── wordpress.ts
│
└── __tests__/
```

---

## 📸 Screenshots

Θα προστεθούν screenshots από:

1. Αρχική σελίδα
2. Σελίδα μαθημάτων
3. Σελίδα συγκεκριμένου μαθήματος
4. Εγκαταστάσεις
5. Login μαθητή
6. Dashboard μαθητή

---

## 📌 Κατάσταση Project

- [x] Responsive frontend
- [x] Headless WordPress
- [x] Δυναμικά μαθήματα
- [x] Αξιολογήσεις
- [x] Gallery εγκαταστάσεων
- [x] Authentication μαθητών
- [x] Dashboard μαθητών
- [x] Automated testing
- [x] ESLint validation
- [x] Production build validation
- [x] GitHub Actions CI
- [ ] Public deployment

---

## 👨‍💻 Ανάπτυξη

Το **Θέα Γνώση** αναπτύχθηκε ως full-stack εκπαιδευτική web εφαρμογή, με στόχο τον συνδυασμό ενός σύγχρονου frontend με ένα εύχρηστο σύστημα διαχείρισης περιεχομένου μέσω WordPress.