# TUYÊN BỐ VỀ LIÊM CHÍNH HỌC THUẬT VÀ KHAI BÁO SỬ DỤNG CÔNG CỤ AI (MẪU PL-D)

- **Học phần:** `CSE703073` – Lập trình ứng dụng web trong du lịch 2
- **Đề tài:** `ĐT-12` – Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến (`DuLichSo`)
- **Nhóm thực hiện:** Nhóm 03 (`DuLichSo`)
- **Giảng viên hướng dẫn:** TS. Nguyễn Văn Tánh

---

## I. TUYÊN BỐ VỀ LIÊM CHÍNH HỌC THUẬT
Nhóm thực hiện tuyên bố tôn trọng đầy đủ các nguyên tắc liêm chính học thuật quy định tại Phần V của Đề thi kết thúc học phần `CSE703073`, bao gồm: trung thực trong trình bày kết quả, minh bạch trong kế thừa tri thức, công bằng trong ghi nhận đóng góp và chịu trách nhiệm cá nhân đối với phần công việc do mình đảm nhiệm.

---

## II. BẢNG KHAI BÁO SỬ DỤNG CÔNG CỤ TRÍ TUỆ NHÂN TẠO (MỤC 5.2 ĐỀ THI)

| TT | Công cụ sử dụng (Tên & Phiên bản) | Phạm vi và mục đích sử dụng hợp pháp | Phần nội dung có sử dụng hỗ trợ | Cách nhóm tự kiểm chứng và chịu trách nhiệm |
|:---:|---|---|---|---|
| 1 | **VinAI PhoBERT (`vinai/phobert-base-v2`) & Scikit-learn 1.5** | Mô hình ngôn ngữ tiếng Việt tiền huấn luyện phục vụ bài toán phân loại sắc thái theo 5 khía cạnh du lịch (ABSA) của Đề tài ĐT-12 | Mô-đun `python-service/` và `backend/tripadvisor_crawler.py`; Mục 3.7 và Chương 5 của Báo cáo | Nhóm trực tiếp gán nhãn chéo 200 mẫu kiểm định độc lập (Cohen's Kappa = 0.86), đo kiểm độ chính xác thực nghiệm ($F_1 = 94.6\%$) và phân tích thủ công các ca dự đoán sai. |
| 2 | **Trợ lý lập trình AI (GitHub Copilot / Gemini Coding Assistant)** | Gợi ý cú pháp CSS Responsive, hỗ trợ gỡ lỗi tràn khung giao diện (overflow) trên thiết bị di động, chuẩn hóa cấu trúc tệp `openapi.json` và `schema.org` | Một số hàm tiện ích trong `frontend/src/views/` và cấu hình `docker-compose.yml` | Từng thành viên phụ trách phân hệ đọc hiểu 100% từng dòng mã, chạy kiểm thử chức năng 60 ca (`CHECKLIST_KIEMTHU`) và kiểm thử tương thích trên 03 trình duyệt. |
| 3 | **Công cụ rà soát ngôn ngữ & định dạng văn bản** | Rà soát lỗi chính tả tiếng Việt học thuật, kiểm tra định dạng trích dẫn chuẩn IEEE và hỗ trợ dịch thuật phần Tóm tắt tiếng Anh (*Abstract*) | Phần *Abstract* và rà soát chế bản văn bản trong Báo cáo dự án | Toàn bộ số liệu thực nghiệm (874 bản ghi đánh giá, điểm SUS 84.5/100, điểm Lighthouse 94/100) là số liệu đo đạc thực tế của nhóm, tuyệt đối không dùng AI sinh số liệu giả. |

---

## III. XÁC NHẬN CỦA NHÓM THỰC HIỆN
Nhóm xác nhận rằng toàn bộ nội dung nộp đã được các thành viên đọc, hiểu, kiểm chứng và chịu trách nhiệm; không có phần nội dung nào được nộp ở trạng thái do công cụ sinh ra mà nhóm không kiểm soát được.

- **Đại diện nhóm thực hiện (Trưởng nhóm):** Nguyễn Trung Hiếu (`24108738`) – *Đã ký xác nhận*
- **Các thành viên:** Hoàng Việt Anh (`24106135`), Nguyễn Việt Dũng (`24105686`), Phạm Tiến Nghĩa (`24104760`), Nguyễn Ngọc Lan (`24108256`) – *Đã ký xác nhận*
