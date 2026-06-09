param(
  [string]$remoteUrl = "https://github.com/davioliveiralanzarini12-glitch/resh-2.git"
)

Write-Host "Starting push-to-github script..." -ForegroundColor Cyan

# Verify git is available
try {
  git --version > $null 2>&1
} catch {
  Write-Error "Git não encontrado no PATH. Instale o Git e rode novamente."
  exit 1
}

# Ensure we're in project root (script should be run from project folder)
$cwd = Get-Location
Write-Host "Working directory: $cwd"

# Ensure .gitignore contains recommended entries
$gitignorePath = Join-Path $cwd '.gitignore'
$recommended = @(
  'node_modules/',
  '.next/',
  '.env',
  '.env.local',
  '.env.*',
  '.vscode/',
  'npm-debug.log',
  'yarn-error.log',
  '.DS_Store'
)

if (-not (Test-Path $gitignorePath)) {
  Write-Host "Criando .gitignore com entradas recomendadas..." -ForegroundColor Yellow
  $recommended | Out-File -FilePath $gitignorePath -Encoding UTF8
} else {
  $added = $false
  foreach ($line in $recommended) {
    if (-not (Select-String -Path $gitignorePath -Pattern "^\s*${([regex]::Escape($line))}" -Quiet)) {
      Add-Content -Path $gitignorePath -Value $line
      $added = $true
    }
  }
  if ($added) { Write-Host "Atualizei .gitignore com entradas faltantes." -ForegroundColor Green }
}

# Initialize git repo if needed
$inside = $false
try {
  $inside = (git rev-parse --is-inside-work-tree 2>$null) -eq 'true'
} catch { $inside = $false }

if (-not $inside) {
  Write-Host "Inicializando repositório git..." -ForegroundColor Yellow
  git init
} else {
  Write-Host "Repositório git já inicializado." -ForegroundColor Green
}

# Stage and commit
Write-Host "Adicionando arquivos e criando commit..." -ForegroundColor Cyan
git add .
# Allow empty commit if nothing to commit yet
try {
  git commit -m "Initial commit" --allow-empty
} catch {
  Write-Host "Commit pode já existir; prosseguindo..." -ForegroundColor Yellow
}

# Ensure main branch
try { git branch -M main } catch { }

# Configure remote
$hasOrigin = $false
try {
  $remotes = git remote
  if ($remotes -match 'origin') { $hasOrigin = $true }
} catch { $hasOrigin = $false }

if ($hasOrigin) {
  Write-Host "Atualizando URL do remoto 'origin' para: $remoteUrl" -ForegroundColor Cyan
  git remote set-url origin $remoteUrl
} else {
  Write-Host "Adicionando remoto 'origin': $remoteUrl" -ForegroundColor Cyan
  git remote add origin $remoteUrl
}

# Push to remote
Write-Host "Fazendo push para origin/main... (pode pedir credenciais ou token)" -ForegroundColor Cyan
try {
  git push -u origin main
  Write-Host "Push concluído com sucesso." -ForegroundColor Green
} catch {
  Write-Error "Falha no push. Verifique sua autenticação (use um PAT se solicitado) e tente novamente."
  exit 1
}

Write-Host "Script finalizado." -ForegroundColor Cyan
