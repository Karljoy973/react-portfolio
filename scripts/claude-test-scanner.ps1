# ================================================================
# Claude Test Scanner - Analyse automatique des tests manquants
# ================================================================
# 
# Ce script scanne le projet pour identifier les composants sans tests
# et genere un rapport detaille pour Claude
#
# Usage: pnpm run claude:test-scan
# ================================================================

param(
    [string]$OutputFile = "reports/test-analysis.md",
    [switch]$Verbose = $false
)

Write-Host "Claude Test Scanner - Analyse des tests manquants" -ForegroundColor Cyan
Write-Host "=" * 60

# Creer le dossier reports s'il n'existe pas
if (!(Test-Path "reports")) {
    New-Item -ItemType Directory -Path "reports" | Out-Null
}

# Fonction pour analyser les composants
function Get-ComponentFiles {
    $components = @()
    
    # Chercher tous les fichiers .tsx dans app/
    $tsxFiles = Get-ChildItem -Path "app" -Recurse -Filter "*.tsx" | Where-Object { 
        $_.Name -notmatch "\.test\." -and 
        $_.Name -notmatch "\.spec\." -and
        $_.Directory.Name -ne "__test__"
    }
    
    foreach ($file in $tsxFiles) {
        $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
        $componentName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        
        # Verifier si un test existe
        $testFile = "__test__/$componentName.test.tsx"
        $hasTest = Test-Path $testFile
        
        $components += [PSCustomObject]@{
            Name = $componentName
            Path = $relativePath
            HasTest = $hasTest
            TestPath = if ($hasTest) { $testFile } else { "Manquant" }
            Size = $file.Length
            LastModified = $file.LastWriteTime
        }
    }
    
    return $components
}

# Fonction pour analyser les tests existants
function Get-ExistingTests {
    $tests = @()
    
    if (Test-Path "__test__") {
        $testFiles = Get-ChildItem -Path "__test__" -Filter "*.test.tsx"
        
        foreach ($file in $testFiles) {
            $content = Get-Content $file.FullName -Raw
            $testCount = ([regex]::Matches($content, '\btest\(|\bit\(')).Count
            $describeCount = ([regex]::Matches($content, '\bdescribe\(')).Count
            
            $tests += [PSCustomObject]@{
                Name = $file.BaseName.Replace(".test", "")
                Path = $file.FullName.Replace((Get-Location).Path + "\", "")
                TestCount = $testCount
                DescribeBlocks = $describeCount
                Size = $file.Length
                LastModified = $file.LastWriteTime
            }
        }
    }
    
    return $tests
}

# Analyser les composants
Write-Host "Analyse des composants..." -ForegroundColor Yellow
$components = Get-ComponentFiles

# Analyser les tests existants
Write-Host "Analyse des tests existants..." -ForegroundColor Yellow
$existingTests = Get-ExistingTests

# Statistiques
$totalComponents = $components.Count
$componentsWithTests = ($components | Where-Object { $_.HasTest }).Count
$componentsWithoutTestsCount = $totalComponents - $componentsWithTests
$totalTests = ($existingTests | Measure-Object -Property TestCount -Sum).Sum

# Generer le rapport
$report = @"
# Rapport d'Analyse des Tests - $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Resume Executif

- **Composants totaux :** $totalComponents
- **Composants avec tests :** $componentsWithTests ($([math]::Round($componentsWithTests/$totalComponents*100, 1))%)
- **Composants sans tests :** $componentsWithoutTestsCount ($([math]::Round($componentsWithoutTestsCount/$totalComponents*100, 1))%)
- **Tests totaux :** $totalTests

## Composants Sans Tests (Priorite Haute)

"@

# Ajouter les composants sans tests
$componentsWithoutTests = $components | Where-Object { -not $_.HasTest } | Sort-Object Size -Descending

if ($componentsWithoutTests.Count -gt 0) {
    $report += "`n| Composant | Chemin | Taille | Derniere Modif |`n"
    $report += "|-----------|--------|--------|----------------|`n"
    
    foreach ($comp in $componentsWithoutTests) {
        $sizeKB = [math]::Round($comp.Size / 1024, 1)
        $report += "| **$($comp.Name)** | ``$($comp.Path)`` | $sizeKB KB | $($comp.LastModified.ToString('yyyy-MM-dd')) |`n"
    }
} else {
    $report += "`nTous les composants ont des tests !`n"
}

# Ajouter les tests existants
$report += @"

## Tests Existants

| Test | Nombre de Tests | Blocs Describe | Derniere Modif |
|------|----------------|----------------|----------------|
"@

foreach ($test in $existingTests | Sort-Object TestCount -Descending) {
    $report += "`n| **$($test.Name)** | $($test.TestCount) | $($test.DescribeBlocks) | $($test.LastModified.ToString('yyyy-MM-dd')) |"
}

# Recommandations pour Claude
$report += @"

## Instructions pour Claude

### Composants a Tester en Priorite :
"@

$priorityComponents = $componentsWithoutTests | Select-Object -First 5
foreach ($comp in $priorityComponents) {
    $report += "`n- **$($comp.Name)** (``$($comp.Path)``) - Taille: $([math]::Round($comp.Size / 1024, 1)) KB"
}

$report += @"

### Template de Prompt pour Claude :

```
Salut Claude ! Je veux que tu crees des tests complets pour les composants suivants de mon projet React Portfolio :

**Composants a tester :**
$($priorityComponents | ForEach-Object { "- $($_.Name) ($($_.Path))" } | Out-String)

**Exigences :**
1. Tests d'integration complets avec @testing-library/react
2. Utilisation de createMemoryRouter de 'react-router' (pas react-router-dom)
3. Tests d'accessibilite (getByRole, ARIA)
4. Tests des interactions utilisateur (hover, click, focus)
5. Tests des props et cas limites
6. Documentation JSDoc complete
7. Mocks appropries pour les dependances

**Structure attendue :**
- Fichier: __test__/[ComponentName].test.tsx
- Au minimum 5-10 tests par composant
- beforeEach/afterEach pour cleanup
- Composants mock pour le routage

Peux-tu analyser chaque composant et creer une suite de tests complete ?
```

### Commandes Utiles :
- ``pnpm run claude:test-create`` - Creer de nouveaux tests
- ``pnpm run claude:test-debug`` - Debugger les tests qui echouent
- ``pnpm test`` - Executer tous les tests
- ``pnpm test [ComponentName]`` - Executer un test specifique

### Metriques de Qualite Cibles :
- Tous les composants avec tests
- Minimum 5 tests par composant
- Couverture des cas limites
- Tests d'accessibilite
- Documentation complete

---
*Rapport genere automatiquement par Claude Test Scanner*
"@

# Sauvegarder le rapport
$report | Out-File -FilePath $OutputFile -Encoding UTF8

# Afficher les resultats
Write-Host "`nResultats de l'analyse :" -ForegroundColor Green
Write-Host "  - Composants totaux: $totalComponents" -ForegroundColor White
Write-Host "  - Avec tests: $componentsWithTests ($([math]::Round($componentsWithTests/$totalComponents*100, 1))%)" -ForegroundColor Green
Write-Host "  - Sans tests: $componentsWithoutTestsCount ($([math]::Round($componentsWithoutTestsCount/$totalComponents*100, 1))%)" -ForegroundColor Red
Write-Host "  - Tests totaux: $totalTests" -ForegroundColor Cyan

if ($componentsWithoutTestsCount -gt 0) {
    Write-Host "`nComposants prioritaires a tester :" -ForegroundColor Yellow
    $priorityComponents | ForEach-Object {
        Write-Host "  - $($_.Name) ($($_.Path))" -ForegroundColor White
    }
}

Write-Host "`nRapport sauvegarde : $OutputFile" -ForegroundColor Cyan
Write-Host "Pret pour Claude ! Utilisez le prompt genere dans le rapport." -ForegroundColor Green

if ($Verbose) {
    Write-Host "`nDetails complets :" -ForegroundColor Magenta
    $components | Format-Table -AutoSize
}