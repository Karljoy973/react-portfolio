# ================================================================
# Claude Test Creator - Creation automatique de tests
# ================================================================

param(
    [string]$ComponentName = "",
    [switch]$Interactive = $false,
    [switch]$GenerateTemplate = $false
)

Write-Host "Claude Test Creator - Creation de tests automatique" -ForegroundColor Cyan
Write-Host "=" * 60

# Fonction pour analyser un composant
function Analyze-Component {
    param([string]$ComponentPath)
    
    if (!(Test-Path $ComponentPath)) {
        Write-Host "Composant non trouve : $ComponentPath" -ForegroundColor Red
        return $null
    }
    
    $content = Get-Content $ComponentPath -Raw
    $componentName = [System.IO.Path]::GetFileNameWithoutExtension($ComponentPath)
    
    # Analyser les imports
    $imports = [regex]::Matches($content, 'import.*from\s+[''"]([^''"]+)[''"]') | ForEach-Object { $_.Groups[1].Value }
    
    # Analyser les props
    $propsMatch = [regex]::Match($content, '(?:interface|type)\s+\w*Props\s*=\s*{([^}]+)}')
    $props = if ($propsMatch.Success) { $propsMatch.Groups[1].Value } else { "" }
    
    # Analyser les hooks utilises
    $hooks = [regex]::Matches($content, 'use\w+\(') | ForEach-Object { $_.Value.TrimEnd('(') }
    
    # Analyser les elements JSX
    $jsxElements = [regex]::Matches($content, '<(\w+)') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
    
    # Analyser les event handlers
    $eventHandlers = [regex]::Matches($content, 'on\w+\s*=') | ForEach-Object { $_.Value.TrimEnd('=').Trim() }
    
    return [PSCustomObject]@{
        Name = $componentName
        Path = $ComponentPath
        Imports = $imports
        Props = $props
        Hooks = $hooks
        JSXElements = $jsxElements
        EventHandlers = $eventHandlers
        HasRouter = $content -match 'Link|useNavigate|useLocation'
        HasState = $content -match 'useState|useReducer'
        HasEffects = $content -match 'useEffect|useLayoutEffect'
        Content = $content
    }
}

# Fonction pour generer le prompt Claude
function Generate-ClaudePrompt {
    param([PSCustomObject]$ComponentAnalysis)
    
    $componentName = $ComponentAnalysis.Name
    $componentPath = $ComponentAnalysis.Path
    
    return @"
# Prompt pour Claude - Creation de tests pour $componentName

Salut Claude ! Je veux que tu crees des tests d'integration complets pour le composant **$componentName**.

## Informations du composant :
- **Nom :** $componentName
- **Chemin :** $componentPath
- **Utilise le routeur :** $($ComponentAnalysis.HasRouter)
- **Utilise l'etat :** $($ComponentAnalysis.HasState)
- **Utilise des effets :** $($ComponentAnalysis.HasEffects)

## Analyse automatique :
- **Imports detectes :** $($ComponentAnalysis.Imports -join ', ')
- **Hooks utilises :** $($ComponentAnalysis.Hooks -join ', ')
- **Elements JSX :** $($ComponentAnalysis.JSXElements -join ', ')
- **Event handlers :** $($ComponentAnalysis.EventHandlers -join ', ')

## Exigences pour les tests :

1. **Structure de base :**
   - Fichier : ``__test__/$componentName.test.tsx``
   - Documentation JSDoc complete
   - Au minimum 8-12 tests

2. **Tests obligatoires :**
   - Rendu sans crash
   - Affichage du contenu correct
   - Gestion des props (si applicable)
   - Interactions utilisateur
   - Accessibilite (getByRole, ARIA)
   - Cas limites et erreurs

3. **Configuration technique :**
   - Utiliser ``createMemoryRouter`` de ``'react-router'`` (pas react-router-dom)
   - ``@testing-library/react`` pour les tests
   - ``fireEvent`` pour les interactions
   - ``beforeEach/afterEach`` pour cleanup
   - Composants mock appropries

4. **Tests specifiques selon l'analyse :**
$(if ($ComponentAnalysis.HasRouter) { "   - Tests de routage et navigation" })
$(if ($ComponentAnalysis.HasState) { "   - Tests des changements d'etat" })
$(if ($ComponentAnalysis.HasEffects) { "   - Tests des effets de bord" })
$(if ($ComponentAnalysis.EventHandlers.Count -gt 0) { "   - Tests des event handlers : $($ComponentAnalysis.EventHandlers -join ', ')" })

## Code du composant a analyser :
```tsx
$($ComponentAnalysis.Content)
```

Peux-tu creer le fichier de test complet avec tous les tests necessaires ?
"@
}

# Script principal
if ($ComponentName -eq "" -and !$Interactive) {
    Write-Host "Scan des composants sans tests..." -ForegroundColor Yellow
    
    # Lister les composants sans tests
    $components = Get-ChildItem -Path "app" -Recurse -Filter "*.tsx" | Where-Object { 
        $_.Name -notmatch "\.test\." -and 
        $_.Name -notmatch "\.spec\." -and
        $_.Directory.Name -ne "__test__"
    }
    
    $componentsWithoutTests = @()
    foreach ($comp in $components) {
        $compName = [System.IO.Path]::GetFileNameWithoutExtension($comp.Name)
        $testFile = "__test__/$compName.test.tsx"
        if (!(Test-Path $testFile)) {
            $componentsWithoutTests += $comp
        }
    }
    
    if ($componentsWithoutTests.Count -eq 0) {
        Write-Host "Tous les composants ont deja des tests !" -ForegroundColor Green
        return
    }
    
    Write-Host "Composants sans tests :" -ForegroundColor Red
    for ($i = 0; $i -lt $componentsWithoutTests.Count; $i++) {
        $compName = [System.IO.Path]::GetFileNameWithoutExtension($componentsWithoutTests[$i].Name)
        Write-Host "  $($i + 1). $compName" -ForegroundColor White
    }
    
    $choice = Read-Host "Choisissez un composant (numero) ou 'all' pour tous"
    
    if ($choice -eq "all") {
        foreach ($comp in $componentsWithoutTests) {
            $compName = [System.IO.Path]::GetFileNameWithoutExtension($comp.Name)
            Write-Host "Traitement de $compName..." -ForegroundColor Cyan
            & $MyInvocation.MyCommand.Path -ComponentName $compName
        }
        return
    } elseif ($choice -match '^\d+$' -and [int]$choice -le $componentsWithoutTests.Count) {
        $selectedComp = $componentsWithoutTests[[int]$choice - 1]
        $ComponentName = [System.IO.Path]::GetFileNameWithoutExtension($selectedComp.Name)
    } else {
        Write-Host "Choix invalide" -ForegroundColor Red
        return
    }
}

if ($ComponentName -eq "") {
    Write-Host "Nom du composant requis" -ForegroundColor Red
    Write-Host "Usage: pnpm run claude:test-create ComponentName" -ForegroundColor Yellow
    return
}

# Trouver le fichier du composant
$componentFile = Get-ChildItem -Path "app" -Recurse -Filter "$ComponentName.tsx" | Select-Object -First 1

if (!$componentFile) {
    Write-Host "Composant '$ComponentName' non trouve" -ForegroundColor Red
    return
}

# Verifier si le test existe deja
$testFile = "__test__/$ComponentName.test.tsx"
if (Test-Path $testFile) {
    Write-Host "Le test existe deja : $testFile" -ForegroundColor Yellow
    $overwrite = Read-Host "Voulez-vous le remplacer ? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        return
    }
}

Write-Host "Analyse du composant $ComponentName..." -ForegroundColor Yellow
$analysis = Analyze-Component $componentFile.FullName

if (!$analysis) {
    Write-Host "Impossible d'analyser le composant" -ForegroundColor Red
    return
}

Write-Host "Analyse terminee" -ForegroundColor Green
Write-Host "  - Utilise le routeur: $($analysis.HasRouter)" -ForegroundColor Cyan
Write-Host "  - Utilise l'etat: $($analysis.HasState)" -ForegroundColor Cyan
Write-Host "  - Event handlers: $($analysis.EventHandlers.Count)" -ForegroundColor Cyan

# Generer le prompt pour Claude
Write-Host "Generation du prompt Claude..." -ForegroundColor Yellow
$prompt = Generate-ClaudePrompt $analysis

# Creer le dossier reports s'il n'existe pas
if (!(Test-Path "reports")) {
    New-Item -ItemType Directory -Path "reports" | Out-Null
}

# Sauvegarder le prompt
$promptFile = "reports/claude-prompt-$ComponentName.md"
$prompt | Out-File -FilePath $promptFile -Encoding UTF8

Write-Host "Prompt genere : $promptFile" -ForegroundColor Green
Write-Host "Pret ! Copiez le contenu du prompt et envoyez-le a Claude." -ForegroundColor Cyan

# Afficher le prompt dans la console si demande
if ($Interactive) {
    Write-Host "=" * 60 -ForegroundColor Magenta
    Write-Host "PROMPT POUR CLAUDE :" -ForegroundColor Magenta
    Write-Host "=" * 60 -ForegroundColor Magenta
    Write-Host $prompt -ForegroundColor White
    Write-Host "=" * 60 -ForegroundColor Magenta
}