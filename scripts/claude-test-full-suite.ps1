# ================================================================
# Claude Test Full Suite - Suite complete de gestion des tests
# ================================================================

param(
    [switch]$Interactive = $true,
    [string]$LogFile = "reports/claude-test-session.log"
)

Write-Host "CLAUDE TEST FULL SUITE" -ForegroundColor Cyan
Write-Host "Suite complete de gestion automatique des tests avec AI" -ForegroundColor Cyan
Write-Host "=" * 60

# Creer le dossier reports s'il n'existe pas
if (!(Test-Path "reports")) {
    New-Item -ItemType Directory -Path "reports" | Out-Null
}

# Fonction de logging
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"
    Add-Content -Path $LogFile -Value $logEntry
    
    switch ($Level) {
        "ERROR" { Write-Host $Message -ForegroundColor Red }
        "WARNING" { Write-Host $Message -ForegroundColor Yellow }
        "SUCCESS" { Write-Host $Message -ForegroundColor Green }
        "INFO" { Write-Host $Message -ForegroundColor Cyan }
        default { Write-Host $Message -ForegroundColor White }
    }
}

# Fonction pour afficher le menu principal
function Show-MainMenu {
    Write-Host "" -ForegroundColor Magenta
    Write-Host "=" * 60 -ForegroundColor Magenta
    Write-Host "MENU PRINCIPAL - Que voulez-vous faire ?" -ForegroundColor Magenta
    Write-Host "=" * 60 -ForegroundColor Magenta
    Write-Host ""
    Write-Host "1. Scanner le projet (analyser les tests manquants)" -ForegroundColor White
    Write-Host "2. Creer de nouveaux tests (avec aide Claude)" -ForegroundColor White
    Write-Host "3. Debugger les tests qui echouent" -ForegroundColor White
    Write-Host "4. Executer tous les tests" -ForegroundColor White
    Write-Host "5. Rapport complet de qualite" -ForegroundColor White
    Write-Host "6. Workflow complet (scan + create + test)" -ForegroundColor White
    Write-Host "7. Configuration et maintenance" -ForegroundColor White
    Write-Host "8. Quitter" -ForegroundColor White
    Write-Host ""
    Write-Host "=" * 60 -ForegroundColor Magenta
}

# Fonction pour scanner le projet
function Invoke-ProjectScan {
    Write-Log "Demarrage du scan du projet..." "INFO"
    
    try {
        & "$PSScriptRoot\claude-test-scanner.ps1" -Verbose
        Write-Log "Scan termine avec succes" "SUCCESS"
        
        if (Test-Path "reports/test-analysis.md") {
            Write-Host "Rapport d'analyse genere : reports/test-analysis.md" -ForegroundColor Green
            
            if ($Interactive) {
                $openReport = Read-Host "Voulez-vous ouvrir le rapport ? (y/N)"
                if ($openReport -eq "y" -or $openReport -eq "Y") {
                    Start-Process "reports/test-analysis.md"
                }
            }
        }
        
        return $true
    }
    catch {
        Write-Log "Erreur lors du scan : $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# Fonction pour creer des tests
function Invoke-TestCreation {
    Write-Log "Demarrage de la creation de tests..." "INFO"
    
    try {
        if ($Interactive) {
            & "$PSScriptRoot\claude-test-create-simple.ps1" -Interactive
        } else {
            & "$PSScriptRoot\claude-test-create-simple.ps1"
        }
        
        Write-Log "Creation de tests terminee" "SUCCESS"
        return $true
    }
    catch {
        Write-Log "Erreur lors de la creation : $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# Fonction pour debugger les tests
function Invoke-TestDebugging {
    Write-Log "Demarrage du debogage des tests..." "INFO"
    
    try {
        # D'abord, executer les tests pour voir s'il y a des erreurs
        Write-Host "Execution des tests pour detecter les erreurs..." -ForegroundColor Yellow
        $testResult = Start-Process -FilePath "pnpm" -ArgumentList "test" -NoNewWindow -Wait -PassThru
        
        if ($testResult.ExitCode -eq 0) {
            Write-Log "Tous les tests passent ! Aucun debogage necessaire." "SUCCESS"
            return $true
        }
        
        Write-Log "Des tests echouent. Lancement de l'analyse..." "WARNING"
        
        if ($Interactive) {
            $testName = Read-Host "Nom du test specifique a debugger (ou Entree pour tous)"
            if ($testName -eq "") {
                & "$PSScriptRoot\claude-test-debug-simple.ps1" -Verbose
            } else {
                & "$PSScriptRoot\claude-test-debug-simple.ps1" -TestName $testName -Verbose
            }
        } else {
            & "$PSScriptRoot\claude-test-debug-simple.ps1"
        }
        
        Write-Log "Analyse de debogage terminee" "SUCCESS"
        return $true
    }
    catch {
        Write-Log "Erreur lors du debogage : $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# Fonction pour executer tous les tests
function Invoke-AllTests {
    Write-Log "Execution de tous les tests..." "INFO"
    
    try {
        Write-Host "Lancement de la suite de tests complete..." -ForegroundColor Yellow
        
        $startTime = Get-Date
        $testResult = Start-Process -FilePath "pnpm" -ArgumentList "test" -NoNewWindow -Wait -PassThru
        $endTime = Get-Date
        $duration = $endTime - $startTime
        
        if ($testResult.ExitCode -eq 0) {
            Write-Log "Tous les tests passent ! Duree: $($duration.TotalSeconds)s" "SUCCESS"
        } else {
            Write-Log "Certains tests echouent. Code de sortie: $($testResult.ExitCode)" "ERROR"
            
            if ($Interactive) {
                $debug = Read-Host "Voulez-vous lancer le debogage automatique ? (y/N)"
                if ($debug -eq "y" -or $debug -eq "Y") {
                    Invoke-TestDebugging
                }
            }
        }
        
        return $testResult.ExitCode -eq 0
    }
    catch {
        Write-Log "Erreur lors de l'execution des tests : $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# Fonction pour generer un rapport complet
function Generate-QualityReport {
    Write-Log "Generation du rapport de qualite..." "INFO"
    
    try {
        # Executer le scan
        & "$PSScriptRoot\claude-test-scanner.ps1" -OutputFile "reports/quality-scan.md"
        
        # Executer les tests avec couverture si disponible
        Write-Host "Execution des tests pour les metriques..." -ForegroundColor Yellow
        $testResult = Start-Process -FilePath "pnpm" -ArgumentList "test" -NoNewWindow -Wait -PassThru
        
        # Analyser les fichiers de test
        $testFiles = Get-ChildItem -Path "__test__" -Filter "*.test.tsx" -ErrorAction SilentlyContinue
        $componentFiles = Get-ChildItem -Path "app" -Recurse -Filter "*.tsx" | Where-Object { 
            $_.Name -notmatch "\.test\." -and $_.Directory.Name -ne "__test__"
        }
        
        # Generer le rapport de qualite
        $qualityReport = @"
# Rapport de Qualite des Tests - $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Metriques Globales

- **Composants totaux :** $($componentFiles.Count)
- **Tests totaux :** $($testFiles.Count)
- **Couverture :** $([math]::Round($testFiles.Count / $componentFiles.Count * 100, 1))%
- **Statut des tests :** $(if ($testResult.ExitCode -eq 0) { "Tous passent" } else { "Certains echouent" })

## Analyse Detaillee

### Tests par Composant
"@

        foreach ($testFile in $testFiles) {
            $content = Get-Content $testFile.FullName -Raw -ErrorAction SilentlyContinue
            $testCount = if ($content) { ([regex]::Matches($content, '\btest\(|\bit\(')).Count } else { 0 }
            $componentName = $testFile.BaseName.Replace(".test", "")
            
            $qualityReport += "`n- **$componentName** : $testCount tests"
        }
        
        $qualityReport += @"

## Recommandations

### Actions Prioritaires :
1. Creer des tests pour les composants manquants
2. Ameliorer la couverture des tests existants
3. Ajouter des tests d'accessibilite
4. Implementer des tests de performance

### Commandes Utiles :
- ``pnpm run claude:test-scan`` - Scanner les tests manquants
- ``pnpm run claude:test-create`` - Creer de nouveaux tests
- ``pnpm run claude:test-debug`` - Debugger les erreurs

---
*Rapport genere automatiquement par Claude Test Suite*
"@

        $qualityReport | Out-File -FilePath "reports/quality-report.md" -Encoding UTF8
        
        Write-Log "Rapport de qualite genere : reports/quality-report.md" "SUCCESS"
        return $true
    }
    catch {
        Write-Log "Erreur lors de la generation du rapport : $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# Fonction pour le workflow complet
function Invoke-FullWorkflow {
    Write-Log "Demarrage du workflow complet..." "INFO"
    
    Write-Host "WORKFLOW COMPLET - 3 etapes" -ForegroundColor Magenta
    Write-Host "1/3 Scan du projet..." -ForegroundColor Yellow
    
    if (!(Invoke-ProjectScan)) {
        Write-Log "Echec du scan. Arret du workflow." "ERROR"
        return $false
    }
    
    Write-Host "2/3 Creation de tests..." -ForegroundColor Yellow
    if (!(Invoke-TestCreation)) {
        Write-Log "Probleme lors de la creation, mais on continue..." "WARNING"
    }
    
    Write-Host "3/3 Execution des tests..." -ForegroundColor Yellow
    $testsPass = Invoke-AllTests
    
    if (!$testsPass) {
        Write-Host "Tests en echec detectes. Lancement du debogage..." -ForegroundColor Yellow
        Invoke-TestDebugging
    }
    
    Write-Host "Generation du rapport final..." -ForegroundColor Yellow
    Generate-QualityReport
    
    Write-Log "Workflow complet termine" "SUCCESS"
    return $true
}

# Script principal
Write-Log "Demarrage de Claude Test Full Suite" "INFO"

if ($Interactive) {
    do {
        Show-MainMenu
        $choice = Read-Host "Votre choix (1-8)"
        
        switch ($choice) {
            "1" { Invoke-ProjectScan }
            "2" { Invoke-TestCreation }
            "3" { Invoke-TestDebugging }
            "4" { Invoke-AllTests }
            "5" { Generate-QualityReport }
            "6" { Invoke-FullWorkflow }
            "7" { 
                Write-Host "Configuration et maintenance disponibles" -ForegroundColor Yellow
                Write-Host "Scripts disponibles :" -ForegroundColor White
                Write-Host "  - pnpm run claude:test-scan" -ForegroundColor Cyan
                Write-Host "  - pnpm run claude:test-create" -ForegroundColor Cyan
                Write-Host "  - pnpm run claude:test-debug" -ForegroundColor Cyan
                Write-Host "  - pnpm run claude:test-full" -ForegroundColor Cyan
            }
            "8" { 
                Write-Log "Arret de Claude Test Suite" "INFO"
                Write-Host "Au revoir ! Merci d'avoir utilise Claude Test Suite." -ForegroundColor Green
                break 
            }
            default { 
                Write-Host "Choix invalide. Veuillez choisir entre 1 et 8." -ForegroundColor Red 
            }
        }
        
        if ($choice -ne "8") {
            Write-Host "Appuyez sur Entree pour continuer..." -ForegroundColor Gray
            Read-Host
        }
        
    } while ($choice -ne "8")
} else {
    # Mode non-interactif : executer le workflow complet
    Write-Log "Mode automatique : execution du workflow complet" "INFO"
    Invoke-FullWorkflow
}

Write-Log "Session Claude Test Suite terminee" "INFO"