# ================================================================
# Claude Test Debugger - Debogage automatique des tests
# ================================================================

param(
    [string]$TestName = "",
    [switch]$RunTests = $true,
    [string]$OutputFile = "reports/test-debug-report.md"
)

Write-Host "Claude Test Debugger - Debogage automatique" -ForegroundColor Cyan
Write-Host "=" * 60

# Creer le dossier reports s'il n'existe pas
if (!(Test-Path "reports")) {
    New-Item -ItemType Directory -Path "reports" | Out-Null
}

# Fonction pour executer les tests et capturer les erreurs
function Run-TestsWithErrorCapture {
    param([string]$TestFilter = "")
    
    Write-Host "Execution des tests..." -ForegroundColor Yellow
    
    $testCommand = if ($TestFilter -ne "") { 
        "pnpm test `"$TestFilter`""
    } else { 
        "pnpm test" 
    }
    
    try {
        $output = & cmd /c $testCommand 2>&1
        $exitCode = $LASTEXITCODE
        
        return [PSCustomObject]@{
            ExitCode = $exitCode
            Output = $output -join "`n"
            Success = $exitCode -eq 0
        }
    }
    catch {
        return [PSCustomObject]@{
            ExitCode = -1
            Output = ""
            Errors = $_.Exception.Message
            Success = $false
        }
    }
}

# Fonction pour analyser les erreurs de test
function Analyze-TestErrors {
    param([string]$TestOutput)
    
    $errors = @()
    
    # Patterns d'erreurs communes
    $errorPatterns = @{
        "ImportError" = "Cannot resolve module|Module not found|Cannot find module"
        "RouterError" = "Cannot destructure property.*useContext.*as it is null|basename.*useContext"
        "RenderError" = "TestingLibraryElementError|Unable to find an accessible element"
        "AssertionError" = "AssertionError|expected.*to be|received.*expected"
        "TypeScriptError" = "TS\d+|Type.*is not assignable|Property.*does not exist"
        "ReactError" = "Warning: React|Error: Uncaught.*React|React Hook"
        "TimeoutError" = "Timeout|Test timeout|exceeded timeout"
        "MockError" = "Mock.*not found|vi\.mock|jest\.mock"
    }
    
    foreach ($pattern in $errorPatterns.GetEnumerator()) {
        $matches = [regex]::Matches($TestOutput, $pattern.Value, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        
        if ($matches.Count -gt 0) {
            foreach ($match in $matches) {
                $errors += [PSCustomObject]@{
                    Type = $pattern.Key
                    Pattern = $pattern.Value
                    Match = $match.Value
                }
            }
        }
    }
    
    return $errors
}

# Script principal
if ($RunTests) {
    Write-Host "Execution des tests..." -ForegroundColor Yellow
    $testResult = Run-TestsWithErrorCapture $TestName
    
    if ($testResult.Success) {
        Write-Host "Tous les tests passent ! Aucun debogage necessaire." -ForegroundColor Green
        return
    }
    
    Write-Host "Des tests echouent. Analyse en cours..." -ForegroundColor Red
} else {
    Write-Host "Analyse des logs de test existants..." -ForegroundColor Yellow
    $testResult = [PSCustomObject]@{
        ExitCode = 1
        Output = "Analyse manuelle - utilisez -RunTests pour executer les tests"
        Success = $false
    }
}

# Analyser les erreurs
Write-Host "Analyse des erreurs..." -ForegroundColor Yellow
$errors = Analyze-TestErrors $testResult.Output

if ($errors.Count -eq 0) {
    Write-Host "Aucune erreur connue detectee. Analyse manuelle necessaire." -ForegroundColor Yellow
}

Write-Host "Erreurs trouvees :" -ForegroundColor Red
foreach ($error in $errors) {
    Write-Host "  - $($error.Type): $($error.Match)" -ForegroundColor White
}

# Generer le rapport de debogage
$debugPrompt = @"
# Rapport de Debogage des Tests - $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Informations Generales
- **Test concerne :** $TestName
- **Statut :** $(if ($testResult.Success) { "Succes" } else { "Echec" })
- **Code de sortie :** $($testResult.ExitCode)
- **Nombre d'erreurs detectees :** $($errors.Count)

## Sortie Complete des Tests
```
$($testResult.Output)
```

## Erreurs Detectees

$($errors | ForEach-Object { "### $($_.Type)`n**Pattern detecte :** ``$($_.Pattern)```n**Match :** ``$($_.Match)```n" } | Out-String)

## Solutions Suggerees

### Probleme de Routage React Router
Si erreur "Cannot destructure property 'basename'":
- Changer l'import de 'react-router-dom' vers 'react-router'
- Utiliser createMemoryRouter dans les tests
- Verifier que RouterProvider entoure le composant teste

### Erreur de Rendu/Selection d'Elements
Si "Unable to find an accessible element":
- Utiliser screen.debug() pour voir le DOM rendu
- Changer le selecteur (getByRole, getByText, getByTestId)
- Ajouter des data-testid aux elements importants

### Erreur d'Import de Module
Si "Module not found":
- Verifier le chemin d'import (@ alias configure ?)
- Verifier que le fichier existe
- Verifier l'export du module

---
*Rapport genere automatiquement par Claude Test Debugger*
"@

# Sauvegarder le rapport
$debugPrompt | Out-File -FilePath $OutputFile -Encoding UTF8

Write-Host "Resume du debogage :" -ForegroundColor Green
Write-Host "  - Tests executes: $(if ($TestName -ne '') { $TestName } else { 'Tous' })" -ForegroundColor White
Write-Host "  - Statut: $(if ($testResult.Success) { 'Succes' } else { 'Echec' })" -ForegroundColor White
Write-Host "  - Erreurs detectees: $($errors.Count)" -ForegroundColor White

Write-Host "Rapport de debogage sauvegarde : $OutputFile" -ForegroundColor Cyan
Write-Host "Pret pour Claude ! Copiez le contenu du rapport." -ForegroundColor Green