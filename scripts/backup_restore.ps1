# scripts/backup_restore.ps1 — Kich ban sao luu va khoi phuc CSDL tu dong
param (
    [string]$Action = "backup",
    [string]$BackupFile = "database/backups/backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql"
)

$DB_NAME = "du_lich_so"
$DB_USER = "root"
$LOG_FILE = "storage/logs/backup.log"

if (!(Test-Path "database/backups")) { New-Item -ItemType Directory -Path "database/backups" | Out-Null }
if (!(Test-Path "storage/logs")) { New-Item -ItemType Directory -Path "storage/logs" | Out-Null }

if ($Action -eq "backup") {
    Write-Host "[INFO] Bat dau sao luu CSDL $DB_NAME..."
    mysqldump -u $DB_USER $DB_NAME > $BackupFile
    $msg = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] SAO LUU THANH CONG: $BackupFile"
    Add-Content -Path $LOG_FILE -Value $msg
    Write-Host $msg -ForegroundColor Green
} elseif ($Action -eq "restore") {
    Write-Host "[INFO] Bat dau khoi phuc CSDL tu $BackupFile..."
    mysql -u $DB_USER $DB_NAME < $BackupFile
    $msg = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] KHOI PHUC THANH CONG TU: $BackupFile"
    Add-Content -Path $LOG_FILE -Value $msg
    Write-Host $msg -ForegroundColor Green
}
