
```markdown
# ✅ Task & User Management App

Questa è un'applicazione web per la gestione di **utenti** e **attività (todo)**, costruita con **Next.js**, **MongoDB/Mongoose**, **TypeScript** e **Material UI**.  
Supporta la visualizzazione, creazione, modifica ed eliminazione di utenti e delle attività assegnate.

---

## 🚀 Stack Tecnologico

- **Next.js (App Router)**
- **TypeScript**
- **MongoDB + Mongoose**
- **Material UI (MUI)**
- **next-intl** per la localizzazione
- **dayjs** per la gestione delle date

---

## 📂 Struttura del Progetto

<details> <summary>📁 Struttura delle cartelle (`src/`)</summary>
plaintext
Copia
Modifica
src/
├── app/                  # Routing e pagine Next.js
│   ├── users/            # Pagina gestione utenti
│   └── todos/            # Pagina gestione attività
├── components/           # Componenti riutilizzabili
├── sections/             # Componenti organizzati per funzionalità (e.g. Detail, Delete)
├── services/             # Funzioni per fetch e interazioni con il DB
├── types/                # Tipizzazioni globali
├── lib/                  # Connessione DB e utilità varie
└── middleware.ts         # Middleware per localizzazione
</details>

---

## ⚙️ Setup Locale

1. **Clona il progetto**

```bash
git clone https://github.com/tuo-utente/task-user-app.git
cd task-user-app
````

2. **Installa le dipendenze**

```bash
npm install
```

3. **Crea un file `.env.local`**

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Avvia il server di sviluppo**

```bash
npm run dev
```

> Visita [http://localhost:3000](http://localhost:3000)

---

## 🧩 Funzionalità

* 👥 **Gestione utenti**

    * Visualizzazione lista utenti
    * Dettaglio utente
    * Aggiunta, modifica, eliminazione

* 📝 **Gestione attività (todo)**

    * Assegnazione attività a utenti
    * Visualizzazione stato: completato / incompleto
    * Supporto a tag, descrizioni, reminder

* 🌐 **Localizzazione**

    * Traduzioni dinamiche tramite `next-intl`

* 📱 **Responsive**

    * Interfaccia ottimizzata per desktop e mobile



## 📜 Script disponibili

| Comando         | Descrizione                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Avvia il server in modalità sviluppo |
| `npm run build` | Compila l’app per la produzione      |
| `npm run start` | Avvia il server in produzione        |
| `npm run lint`  | Analizza il codice con ESLint        |

---

## 💡 Possibili Migliorie

* 🔐 Integrazione login e autenticazione (es. NextAuth.js)
* 🔎 Filtri e ricerca su utenti o attività
* 📊 Dashboard statistiche
* 📷 Upload immagini profilo

---

## 📄 Licenza

MIT License
© 2025 – Sviluppato da Marco Melchiorri

