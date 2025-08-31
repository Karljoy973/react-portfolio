# 🤖 Claude Test Suite - Scripts d'Automatisation

Cette suite de scripts PowerShell permet d'automatiser la création, le débogage et la maintenance des tests en collaboration avec Claude AI.

## 🚀 Scripts Disponibles

### 📋 Scripts dans package.json

```bash
# Scanner le projet pour identifier les tests manquants
pnpm run claude:test-scan

# Créer de nouveaux tests avec l'aide de Claude
pnpm run claude:test-create

# Déboguer les tests qui échouent
pnpm run claude:test-debug

# Suite complète interactive
pnpm run claude:test-full
```

## 📁 Structure des Scripts

```
scripts/
├── claude-test-scanner.ps1      # 🔍 Analyse des tests manquants
├── claude-test-creator.ps1      # 🧪 Création de nouveaux tests
├── claude-test-debugger.ps1     # 🐛 Débogage des erreurs
├── claude-test-full-suite.ps1   # 🎯 Suite complète interactive
└── README.md                    # 📖 Cette documentation
```

## 🔍 1. Claude Test Scanner

**Commande :** `pnpm run claude:test-scan`

### Fonctionnalités :
- ✅ Scanne tous les composants du projet
- ✅ Identifie les composants sans tests
- ✅ Génère des statistiques de couverture
- ✅ Crée un rapport détaillé avec prompts pour Claude

### Sortie :
- **Fichier :** `reports/test-analysis.md`
- **Contenu :** Analyse complète + prompt prêt pour Claude

### Exemple d'utilisation :
```powershell
# Scan basique
pnpm run claude:test-scan

# Scan avec détails
powershell -ExecutionPolicy Bypass -File scripts/claude-test-scanner.ps1 -Verbose
```

---

## 🧪 2. Claude Test Creator

**Commande :** `pnpm run claude:test-create`

### Fonctionnalités :
- ✅ Analyse automatique des composants
- ✅ Détection des hooks, props, et event handlers
- ✅ Génération de templates de test
- ✅ Création de prompts spécifiques pour Claude

### Modes d'utilisation :

#### Mode Interactif (Recommandé)
```bash
pnpm run claude:test-create
# Affiche la liste des composants sans tests
# Permet de choisir quel composant traiter
```

#### Mode Spécifique
```bash
# Pour un composant spécifique
powershell -ExecutionPolicy Bypass -File scripts/claude-test-creator.ps1 -ComponentName "Hero"
```

#### Mode Template
```bash
# Génère un template de base
powershell -ExecutionPolicy Bypass -File scripts/claude-test-creator.ps1 -ComponentName "Hero" -GenerateTemplate
```

### Sortie :
- **Fichier :** `reports/claude-prompt-[ComponentName].md`
- **Contenu :** Prompt détaillé avec analyse du composant

---

## 🐛 3. Claude Test Debugger

**Commande :** `pnpm run claude:test-debug`

### Fonctionnalités :
- ✅ Exécution automatique des tests
- ✅ Capture et analyse des erreurs
- ✅ Détection de patterns d'erreurs communes
- ✅ Génération de solutions spécifiques

### Types d'erreurs détectées :
- **RouterError** - Problèmes de routage React Router
- **RenderError** - Erreurs de rendu/sélection d'éléments
- **ImportError** - Modules non trouvés
- **AssertionError** - Échecs d'assertions
- **TypeScriptError** - Erreurs de typage
- **ReactError** - Erreurs React/Hooks

### Utilisation :
```bash
# Débogage automatique de tous les tests
pnpm run claude:test-debug

# Débogage d'un test spécifique
powershell -ExecutionPolicy Bypass -File scripts/claude-test-debugger.ps1 -TestName "Hero"

# Mode verbose avec détails
powershell -ExecutionPolicy Bypass -File scripts/claude-test-debugger.ps1 -Verbose
```

### Sortie :
- **Fichier :** `reports/test-debug-report.md`
- **Contenu :** Analyse des erreurs + solutions + prompt Claude

---

## 🎯 4. Claude Test Full Suite

**Commande :** `pnpm run claude:test-full`

### Fonctionnalités :
- ✅ Interface interactive complète
- ✅ Workflow automatisé (scan → create → test → debug)
- ✅ Rapports de qualité
- ✅ Maintenance et configuration

### Menu Principal :
```
1. 🔍 Scanner le projet (analyser les tests manquants)
2. 🧪 Créer de nouveaux tests (avec aide Claude)
3. 🐛 Déboguer les tests qui échouent
4. ⚡ Exécuter tous les tests
5. 📊 Rapport complet de qualité
6. 🔄 Workflow complet (scan + create + test)
7. ⚙️  Configuration et maintenance
8. ❌ Quitter
```

### Workflow Complet :
```bash
# Lance le workflow automatique complet
pnpm run claude:test-full
# Puis choisir option 6
```

---

## 📊 Rapports Générés

Tous les rapports sont sauvegardés dans le dossier `reports/` :

| Fichier | Description | Généré par |
|---------|-------------|------------|
| `test-analysis.md` | Analyse des tests manquants | Scanner |
| `claude-prompt-[Component].md` | Prompt pour créer un test | Creator |
| `test-debug-report.md` | Analyse des erreurs de test | Debugger |
| `quality-report.md` | Rapport de qualité global | Full Suite |
| `claude-test-session.log` | Log de la session | Full Suite |

## 🔧 Configuration Technique

### Prérequis :
- **PowerShell** (Windows/Linux/macOS)
- **pnpm** installé
- **Projet React** avec Vitest configuré

### Permissions PowerShell :
Si vous rencontrez des erreurs d'exécution, exécutez :
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Structure de Projet Attendue :
```
project/
├── app/                    # Composants React
│   ├── components/
│   └── routes/
├── __test__/              # Tests
├── scripts/               # Scripts Claude
├── reports/               # Rapports générés
└── package.json
```

## 🎯 Workflow Recommandé

### 1. Premier Scan
```bash
pnpm run claude:test-scan
```
- Identifie les composants sans tests
- Génère le rapport d'analyse

### 2. Création de Tests
```bash
pnpm run claude:test-create
```
- Choisit un composant prioritaire
- Copie le prompt généré
- Envoie à Claude pour créer le test

### 3. Validation
```bash
pnpm test
```
- Exécute les nouveaux tests
- Vérifie qu'ils passent

### 4. Débogage (si nécessaire)
```bash
pnpm run claude:test-debug
```
- Analyse les erreurs
- Génère les solutions
- Envoie à Claude pour correction

### 5. Répétition
Répéter le cycle jusqu'à 100% de couverture

## 💡 Conseils d'Utilisation

### Avec Claude :
1. **Copiez intégralement** le prompt généré
2. **Précisez le contexte** si nécessaire
3. **Testez immédiatement** le code généré
4. **Itérez** avec le debugger si problème

### Bonnes Pratiques :
- ✅ Commencer par les composants les plus importants
- ✅ Tester immédiatement après création
- ✅ Utiliser le mode interactif pour débuter
- ✅ Conserver les rapports pour suivi

### Dépannage :
- **Script ne s'exécute pas** → Vérifier ExecutionPolicy
- **Erreur de chemin** → Exécuter depuis la racine du projet
- **Tests échouent** → Utiliser claude:test-debug
- **Composant non trouvé** → Vérifier la structure app/

## 🚀 Exemples Concrets

### Créer un test pour le composant NavBar :
```bash
# 1. Scanner d'abord
pnpm run claude:test-scan

# 2. Créer le test
pnpm run claude:test-create
# Choisir "NavBar" dans la liste

# 3. Copier le prompt de reports/claude-prompt-NavBar.md
# 4. Envoyer à Claude
# 5. Créer le fichier __test__/NavBar.test.tsx avec le code de Claude

# 6. Tester
pnpm test NavBar

# 7. Déboguer si nécessaire
pnpm run claude:test-debug
```

### Workflow complet automatisé :
```bash
# Une seule commande pour tout faire
pnpm run claude:test-full
# Choisir option 6 (Workflow complet)
```

---

## 🎉 Résultat Final

Avec cette suite, vous pouvez :
- ✅ **Automatiser** l'analyse des tests manquants
- ✅ **Générer** des prompts optimisés pour Claude
- ✅ **Déboguer** automatiquement les erreurs
- ✅ **Maintenir** une suite de tests de qualité
- ✅ **Collaborer** efficacement avec l'IA

**🎯 Objectif : 100% de couverture de tests avec l'aide de Claude !**