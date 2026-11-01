# TỆP THÔNG TIN DỰ ÁN VÀ BẢNG NGƯỠNG BẮT BUỘC
**Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2
**Đề tài:** ĐT-12 – Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến
**Nhóm:** 03
**Thẻ nộp bài:** v1.0.0
**Kho mã nguồn Git:** https://github.com/hieuxetawng/he-thong-phan-tich-danh-gia-diem-den_DT12.git

---

## I. BẢNG MƯỜI SÁU NGƯỠNG BẮT BUỘC (Mục 1.3 Tài liệu kỹ thuật)

| TT | Hạng mục kiểm tra | Ngưỡng bắt buộc | Kết quả thực tế của nhóm | Tự đánh giá |
|:---:|---|---|---|:---:|
| 1 | Quy mô nhóm sinh viên | 03 – 05 sinh viên | Đúng 05 sinh viên | **ĐẠT** |
| 2 | Báo cáo chính văn | 50 – 100 trang, trích dẫn IEEE | 75 trang, 18 tài liệu tham khảo | **ĐẠT** |
| 3 | Thực thể cơ sở dữ liệu | Tối thiểu 10 thực thể có quan hệ | 10 thực thể chuẩn hóa 3NF | **ĐẠT** |
| 4 | Số lượng bản ghi du lịch | Tối thiểu 300 bản ghi | 350 bản ghi điểm đến & đánh giá | **ĐẠT** |
| 5 | Số lượng commit Git | Tối thiểu 40 commit | 56 commit hoàn chỉnh | **ĐẠT** |
| 6 | Đóng góp mỗi thành viên | Tối thiểu 15% tổng commit | Mỗi bạn đạt 19% – 21% | **ĐẠT** |
| 7 | Thời gian commit trải đều | Tối thiểu 08 tuần | Trải đều 10 tuần thực hành | **ĐẠT** |
| 8 | Thẻ phát hành kho Git | Thẻ v1.0.0 trên nhánh main | Gắn thẻ v1.0.0 chính thức | **ĐẠT** |
| 9 | Chủ đề giao diện | Tối thiểu 02 chủ đề chuyển đổi | 02 chủ đề: Sáng (Light) & Tối (Dark) | **ĐẠT** |
| 10 | Thiết kế đáp ứng | Tối thiểu 03 khổ màn hình | Desktop, Tablet, Mobile | **ĐẠT** |
| 11 | Số ca kiểm thử chức năng | Tối thiểu 60 ca kiểm thử | 60 ca kiểm thử đầy đủ | **ĐẠT** |
| 12 | Trình duyệt kiểm thử | Tối thiểu 03 trình duyệt | Chrome, Firefox, Edge | **ĐẠT** |
| 13 | Thử nghiệm người dùng | Tối thiểu 05 người dùng thử nghiệm | 05 phiếu khảo sát thang đo SUS | **ĐẠT** |
| 14 | Hiệu năng Lighthouse | Điểm Mobile >= 90 | Đạt 94/100 điểm | **ĐẠT** |
| 15 | Thời lượng video minh chứng | 08 – 12 phút | 10 phút 15 giây | **ĐẠT** |
| 16 | Cam kết duy trì trực tuyến | Tối thiểu 30 ngày qua HTTPS | Cam kết duy trì 45 ngày | **ĐẠT** |

---

## II. DANH SÁCH THÀNH VIÊN VÀ BẢNG PHÂN CÔNG ĐÓNG GÓP (Mẫu PL-E)

| STT | Họ và tên | Mã sinh viên | Vai trò chuẩn | Email trường | Tỷ lệ đóng góp |
|---|---|---|---|---|:---:|
| 1 | Nguyễn Trung Hiếu | 24108738 | V1: Trưởng nhóm – Quản trị dự án | 24108738@st.phenikaa-uni.edu.vn | **20%** |
| 2 | Hoàng Việt Anh | 24106135 | V2: Kiến trúc sư dữ liệu | 24106135@st.phenikaa-uni.edu.vn | **20%** |
| 3 | Nguyễn Việt Dũng | 24105686 | V3: Lập trình viên Back-end | 24105686@st.phenikaa-uni.edu.vn | **20%** |
| 4 | Phạm Tiến Nghĩa | 24104760 | V4: Lập trình viên Front-end | 24104760@st.phenikaa-uni.edu.vn | **20%** |
| 5 | Nguyễn Ngọc Lan | 24108256 | V5 & V6: Kiểm thử & Báo cáo nghiệp vụ | 24108256@st.phenikaa-uni.edu.vn | **20%** |
| **Tổng** | | | | | **100%** |

---

## III. BẢNG TÀI KHOẢN KIỂM THỬ THEO VAI TRÒ (Mục 2.3 Đề thi)

| TT | Vai trò hệ thống | Tên đăng nhập | Mật khẩu | Quyền hạn và phạm vi kiểm thử |
|:---:|---|---|---|---|
| 1 | Quản trị viên (Admin) | `admin@demo.test` | `Admin@123456` | Toàn quyền cấu hình, quản trị người dùng, duyệt đánh giá, xem dashboard |
| 2 | Chuyên viên phân tích (Analyst) | `analyst@demo.test` | `Analyst@123456` | Xem báo cáo ABSA, ma trận nhầm lẫn, phân tích mô hình sai, xuất Excel |
| 3 | Chủ cơ sở đối tác (Partner) | `partner@demo.test` | `Partner@123456` | Quản lý thông tin điểm đến cơ sở, theo dõi hoa hồng, phản hồi ý kiến |
| 4 | Nhân viên kiểm duyệt (Mod) | `moderator@demo.test` | `Mod@123456` | Gắn cờ đánh giá giả mạo, ẩn bình luận độc hại hoặc vi phạm quy tắc |
| 5 | Du khách thành viên (Tourist) | `tourist@demo.test` | `User@123456` | Viết đánh giá, bình luận khía cạnh, chấm sao, lưu điểm đến yêu thích |
| 6 | Khách vãng lai (Guest) | *(Không cần đăng nhập)* | *(Trống)* | Tìm kiếm, xem danh sách điểm đến, xem thống kê danh tiếng công khai |
