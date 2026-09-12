import os
import time
import pandas as pd
import pymysql
from dotenv import load_dotenv

# 1. Đọc thông tin kết nối CSDL từ file .env
load_dotenv()

DB_HOST = os.getenv('DB_HOST', '127.0.0.1')
DB_PORT = int(os.getenv('DB_PORT', 3306))
DB_DATABASE = os.getenv('DB_DATABASE', 'du_an_cuoi_ky')
DB_USERNAME = os.getenv('DB_USERNAME', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')

print(f"🔄 Đang kết nối tới CSDL MySQL: {DB_DATABASE}...")

connection = pymysql.connect(
    host=DB_HOST,
    port=DB_PORT,
    user=DB_USERNAME,
    password=DB_PASSWORD,
    database=DB_DATABASE,
    charset='utf8mb4',
    autocommit=True
)

cursor = connection.cursor()

# 2. Đọc file CSV
csv_file = 'du_lieu_tho_tu_cao.csv'
if not os.path.exists(csv_file):
    print(f"❌ Không tìm thấy file {csv_file}. Vui lòng copy file vào thư mục backend/!")
    exit()

df = pd.read_csv(csv_file)
print(f"📊 Đã đọc thành công file CSV: {len(df)} dòng đánh giá.")

# 3. Đảm bảo nguồn dữ liệu TripAdvisor tồn tại
cursor.execute("SELECT id FROM nguon_du_lieu WHERE ten_nguon LIKE '%TripAdvisor%' LIMIT 1")
nguon_row = cursor.fetchone()
if nguon_row:
    nguon_id = nguon_row[0]
else:
    cursor.execute("INSERT INTO nguon_du_lieu (ten_nguon) VALUES ('TripAdvisor')")
    nguon_id = cursor.lastrowid
print(f"✅ Nguồn dữ liệu 'TripAdvisor' ID = {nguon_id}")

# 4. Ánh xạ hoặc tạo mới các Điểm đến (bổ sung ma_dinh_danh & tinh_thanh)
map_diem_den = {}
place_groups = df.groupby('placeInfo/name')

for idx, (place, group) in enumerate(place_groups, start=1):
    cursor.execute("SELECT id FROM diem_den WHERE ten = %s LIMIT 1", (place,))
    row = cursor.fetchone()
    if row:
        map_diem_den[place] = row[0]
    else:
        sample_city = group['placeInfo/addressObj/city'].dropna().first_valid_index()
        tinh_thanh = str(group.loc[sample_city, 'placeInfo/addressObj/city']) if sample_city is not None else 'Việt Nam'
        if not tinh_thanh or tinh_thanh.strip() == '' or tinh_thanh == 'nan':
            tinh_thanh = 'Việt Nam'

        ma_dinh_danh = f"DD_TA_{idx}_{int(time.time())}"
        
        cursor.execute(
            "INSERT INTO diem_den (ten, loai_hinh, ma_dinh_danh, tinh_thanh) VALUES (%s, 'Điểm tham quan', %s, %s)",
            (place, ma_dinh_danh, tinh_thanh)
        )
        map_diem_den[place] = cursor.lastrowid

print(f"📍 Đã ánh xạ {len(map_diem_den)} điểm đến trong CSDL.")

# 5. Tự động kiểm tra danh sách cột thực tế của bảng danh_gia
cursor.execute("SHOW COLUMNS FROM danh_gia")
cols = [col[0] for col in cursor.fetchall()]

col_url = 'url_goc' if 'url_goc' in cols else ('url' if 'url' in cols else None)
col_sacthai = 'sac_thai_tong' if 'sac_thai_tong' in cols else ('sac_thai' if 'sac_thai' in cols else None)

insert_cols = ['diem_den_id', 'nguon_id', 'tieu_de', 'noi_dung', 'diem_so']
if col_sacthai:
    insert_cols.append(col_sacthai)
if 'ngay_dang' in cols:
    insert_cols.append('ngay_dang')
if col_url:
    insert_cols.append(col_url)
if 'created_at' in cols:
    insert_cols.append('created_at')
if 'updated_at' in cols:
    insert_cols.append('updated_at')

sql_insert = f"INSERT INTO danh_gia ({', '.join(insert_cols)}) VALUES ({', '.join(['%s']*len(insert_cols))})"

inserted_count = 0
first_error = None

for i, (_, row) in enumerate(df.iterrows()):
    diem_den_id = map_diem_den[row['placeInfo/name']]
    tieu_de = str(row['title']) if pd.notnull(row['title']) else ''
    noi_dung = str(row['text']) if pd.notnull(row['text']) else ''
    diem_so = int(row['rating']) if pd.notnull(row['rating']) else 5
    ngay_dang = str(row['publishedDate']) if pd.notnull(row['publishedDate']) else None
    url_val = str(row['url']) if pd.notnull(row['url']) else ''
    
    if diem_so >= 4:
        sac_thai = 'tich_cuc'
    elif diem_so == 3:
        sac_thai = 'trung_tinh'
    else:
        sac_thai = 'tieu_cuc'

    now_str = time.strftime('%Y-%m-%d %H:%M:%S')

    vals = [diem_den_id, nguon_id, tieu_de, noi_dung, diem_so]
    if col_sacthai:
        vals.append(sac_thai)
    if 'ngay_dang' in cols:
        vals.append(ngay_dang)
    if col_url:
        vals.append(url_val)
    if 'created_at' in cols:
        vals.append(now_str)
    if 'updated_at' in cols:
        vals.append(now_str)

    try:
        cursor.execute(sql_insert, tuple(vals))
        inserted_count += 1
    except Exception as e:
        if not first_error:
            first_error = e
            print(f"⚠️ Lỗi phát sinh ở dòng {i+1}: {e}")

print(f"🎉 HOÀN THÀNH: Đã nạp thành công {inserted_count}/{len(df)} bản ghi vào CSDL!")
connection.close()