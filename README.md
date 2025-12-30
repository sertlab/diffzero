# DiffZero

**Privacy-First Diff Checker That Never Sees Your Code**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)

---

## 🔒 Why DiffZero?

Most online diff checkers require uploading your files to their servers. **DiffZero runs entirely in your browser** — your code never leaves your device.

Perfect for developers who:
- 🔐 Work with sensitive code, API keys, or production configs
- ✈️ Need to compare files offline (flights, air-gapped networks)
- 🚫 Can't paste proprietary code into ChatGPT or third-party tools
- ⚡ Want instant results without server latency
- 📦 Compare massive files (10MB+) without upload limits

**Verify yourself:** Open DevTools Network tab — zero outbound requests containing your data.

---

## ✨ Features

- **100% Client-Side** — All processing happens in your browser using JavaScript
- **Privacy-First** — No data uploads, no tracking, no server logs
- **Works Offline** — Cache the site and use it without internet
- **No File Limits** — Compare massive logs or datasets without crashes
- **Syntax Highlighting** — Color-coded diff results for readability
- **Multi-Format Support** — Text, JSON, XML, SQL, code, configs
- **Instant Results** — No server latency, results in milliseconds
- **Open Source** — Audit the code yourself, contribute improvements

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Diff Algorithm:** [diff](https://github.com/kpdecker/jsdiff) library
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Geist Sans & Geist Mono

---

## 🧪 How It Works

DiffZero uses a **client-side diff algorithm** powered by the `diff` npm package:

1. **Input:** User pastes text into two textarea elements
2. **Processing:** React useEffect hook triggers diffLines() function
3. **Algorithm:** Compares strings line-by-line using Myers' diff algorithm
4. **Rendering:** Results displayed with color-coded additions/deletions
5. **Storage:** Nothing is stored — data exists only in browser memory

**Security Model:**
- No fetch() or XMLHttpRequest calls to external servers
- No cookies, localStorage, or indexedDB for user content
- Works with strict Content Security Policy (CSP)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests
- Improve documentation
- Share feedback

---

## 📜 License

This project is licensed under the **MIT License**.

**What This Means:**
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

---

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [jsdiff](https://github.com/kpdecker/jsdiff) for the diff algorithm
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

---

<div align="center">

**Built with ❤️ for developers who value privacy**

</div>
