# Doi tac gia lap (sandbox): gui su kien co chu ky HMAC den webhook cua he thong
param(
  [Parameter(Mandatory = $true)][string]$MaThamChieu,
  [Parameter(Mandatory = $true)][ValidateSet('da_mua', 'khach_huy_giua_chung', 'hoan_tien')][string]$Loai,
  [decimal]$GiaTriDon = 0,
  [string]$MaSuKien = ("EVT-" + [guid]::NewGuid().ToString("N").Substring(0, 16)),
  [string]$Url = "http://127.0.0.1:8000/api/webhook/doi-tac",
  [string]$BiMat = "",
  [switch]$SaiChuKy
)

if (-not $BiMat) {
  $envFile = Join-Path $PSScriptRoot "..\backend\.env"
  if (-not (Test-Path $envFile)) { Write-Error "Khong thay file $envFile"; exit 1 }
  $dong = Select-String -Path $envFile -Pattern '^DOI_TAC_BI_MAT=(.+)$' | Select-Object -First 1
  if ($dong) { $BiMat = $dong.Matches[0].Groups[1].Value.Trim().Trim('"') }
}
if (-not $BiMat) { Write-Error "Khong tim thay DOI_TAC_BI_MAT trong backend/.env"; exit 1 }

$body = @{ ma_su_kien = $MaSuKien; ma_tham_chieu = $MaThamChieu; loai = $Loai; gia_tri_don = $GiaTriDon } | ConvertTo-Json -Compress
$ts = [string][DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$hmac = [System.Security.Cryptography.HMACSHA256]::new([Text.Encoding]::UTF8.GetBytes($BiMat))
$thongDiep = "{0}.{1}" -f $ts, $body
$chuKy = -join ($hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($thongDiep)) | ForEach-Object { $_.ToString("x2") })
if ($SaiChuKy) { $chuKy = $chuKy.Substring(0, 60) + "0000" }   # gia mao chu ky de thu bi tu choi

Write-Host "Gui su kien $Loai ($MaSuKien) cho phieu $MaThamChieu"
try {
  $r = Invoke-WebRequest -Uri $Url -Method Post -UseBasicParsing -ContentType "application/json" `
        -Body ([Text.Encoding]::UTF8.GetBytes($body)) `
        -Headers @{ "X-Doi-Tac-Thoi-Gian" = $ts; "X-Doi-Tac-Chu-Ky" = $chuKy; "Accept" = "application/json" }
  "{0} {1}" -f $r.StatusCode, $r.Content
} catch {
  $maLoi = [int]$_.Exception.Response.StatusCode
  $noiDung = $_.ErrorDetails.Message
  if (-not $noiDung) {
    try { $noiDung = (New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd() } catch { $noiDung = $_.Exception.Message }
  }
  "{0} {1}" -f $maLoi, $noiDung
}