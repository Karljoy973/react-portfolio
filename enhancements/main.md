# Husky & CI Enhancement Roadmap (pnpm version)

## ✅ Actuel

- **pre-commit**
  - `pnpm lint` → ESLint
  - `pnpm pretty` → Prettier
- **pre-push**
  - `pnpm snapshots:check` → vérifier qu’au moins un snapshot existe
  - `pnpm test` → tests unitaires
- **commit-msg**
  - `pnpm commitlint` → forcer un format de commit {branchName}-{YYYY-MM-DD}

---

## 🚀 CI Rules

### Branch discipline

- Une branche par issue (`issue-xxx-description`).
- `master` protégé → merge uniquement via Pull Request.

### Commit messages

- Le **dernier commit avant PR** doit matcher : {nom_branche}-{YYYY-MM-DD}

Exemple : `issue-123-fix-api-2025-08-18`.

### Snapshot testing

- `pnpm check:snapshots` → présence d’au moins un fichier `.snap`.
- `pnpm test:snapshot` → exécution des tests avec snapshots.

---

## 💡 Améliorations futures

- Automatiser la vérification du **nom de branche** en CI.
- Vérifier les migrations DB (`pnpm db:migrate:check`).
- Vérifier le typage TS (`pnpm typecheck`).
