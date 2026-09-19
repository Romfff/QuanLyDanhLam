# Đặc tả yêu cầu phi chức năng (ĐT-12)
1. **Hiệu năng:** Thời gian phản hồi API trung bình < 300ms, hỗ trợ phân trang server-side tối đa 20 bản ghi/trang.
2. **Bảo mật:** Mật khẩu người dùng bắt buộc băm bằng Bcrypt/Argon2; cookie phiên có cờ HttpOnly, Secure, SameSite=Lax.
3. **Phân quyền RBAC:** Kiểm soát truy cập nghiêm ngặt tại middleware backend cho 5 vai trò nghiệp vụ.
4. **Dung sai:** Dịch vụ Python gặp lỗi hoặc dừng không làm sập ứng dụng web; có cơ chế trả dữ liệu mặc định/dự phòng.
