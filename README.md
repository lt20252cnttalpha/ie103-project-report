# IE103 Project Report

- IE103 Project Report.
- Deadline: 28/01/2026.
- Nộp đồ án: Đại diện 1 người nộp bài trên Website môn học dưới tệp nén DoAn_NhomX.zip (với X là STT nhóm), bao gồm các files sau:
- Files:
  - 01 `BaoCao_NhomX.pdf`: chứa nội dung báo cáo đồ án (20-25 trang), trình bày theo các chương 🡪 xuất .pdf để nộp.
  - 01 `Slides_NhomX.pdf`: chứa slides thuyết trình (15-20 slides) 🡪 xuất .pdf để nộp.
  - 01 `Video_NhomX.txt`: chứa video thuyết trình (15-20 phút) 🡪 upload video lên Google Drive, sau đó get link (ở chế độ công khai) và cho link vào file `.txt`.
  - 01 `Source.zip`: chứa các nội dung liên quan đến source code, bao gồm các files `.sql` cho truy vấn và source code Website Demo.
  - Các file khác (nếu có).
- KHÔNG CÒN BÁO CÁO TRỰC TIẾP TẠI LỚP. TẤT CẢ NỘP LẠI FILES.
- Cách nộp bài: Sẽ có hướng dẫn nộp sau.
  - Files báo cáo/mã nguồn: Elearning.
  - File video demo: gdrive/onedrive.

Tasks:

- Với mỗi đề bài, tạo một mini-report trình bày bài toán tương ứng.

| MSSV     | Họ và Tên             | Tasks               | NOTES |
| -------- | --------------------- | ------------------- | ----- |
| 25410291 | Đinh Xuân Sâm         | Report/ERD Chen     |       |
| 25410319 | Đặng Hữu Toàn         | Cursor: 2           |       |
| 25410321 | Nguyễn Điền Triết     | Stored Procedure: 3 |       |
| 25410204 | Trương Xuân Hậu       | Trigger: 5          |       |
| 25410338 | Lê Anh Vũ             | Stored Procedure: 2 |       |
| 25410176 | Trần Sơn Bình         | Function: 3         |       |
| 25410247 | Lê Kim Long           | ERD/Data Seed       |       |
| 25410337 | La Anh Vũ             | Code/Demo Website   |       |
| 25410209 | Lê Ngọc Hiệp          | Tableau Report      |       |
| 25410271 | Nguyễn Thị Ngọc Nhung | Không có task       |       |

## Quy Cách Tổ Chức

- `noi-dung`: các tài liệu của các phần báo cáo được lưu trữ ở đây, tương đương với thư mục [`noi-dung`](https://drive.google.com/drive/folders/1e9e2FMezlBpznZvsrrtDtkm6hDfzODi0?usp=drive_link) trên GDrive.
- `report`: thư mục chứa mã nguồn soạn thảo báo cáo.

## Nội Dung

- Bám sát hướng dẫn về Yêu Cầu [ĐỒ ÁN MÔN HỌC QUẢN LÝ THÔNG TIN](noi-dung/FinalProject_GUIDE-Yeu_Cau.md).
- Bổ sung nội dung vào thư mục [noi-dung](noi-dung) tương ứng từng mục dưới đây.

### 1. Mô tả bài toán

* **Phát biểu bài toán**, mục tiêu, **đối tượng** sử dụng.
* **Mô tả quy trình trong thực tế** liên quan đến bài toán (mô tả theo từng bước, và vẽ sơ đồ nếu có. Có thể tham khảo các quy trình có sẵn trong thực tế để xây dựng).

### 2. Phân tích và thiết kế (Mô hình dữ liệu)

* Liệt kê và mô tả **các chức năng của hệ thống**.
* **Các đối tượng** nào cần **quản lý**, **mối quan hệ** giữa các đối tượng (Tức chi tiết các thực thể cần quản lý, các thuộc tính cần có và mối quan hệ giữa chúng).
* Trình bày **các ràng buộc** trên các đối tượng (nếu có).
* Vẽ **mô hình mức quan niệm** cho mối quan hệ giữa các thực thể tương ứng với loại mô hình dữ liệu lựa chọn (VD: Sơ đồ ERD cho Mô hình quan hệ, Đồ thị quan hệ cho mô hình Đồ thị-Graph, ...).
  * Chen notation.

* **Thiết kế CSDL** cho bài toán tương ứng với loại mô hình dữ liệu lựa chọn (Tức chuyển sang **mô hình mức logic**). Lưu ý kèm theo các giải thích cho các bảng trong CSDL (Tân từ).

### 3. Cài đặt

* **Cài đặt mô hình dữ liệu** trên một hệ quản trị CSDL (Trong loại mô hình dữ liệu đã lựa chọn) gồm: tạo bảng, tạo khoá chính, khoá ngoại, các ràng buộc (nếu có).
* **Tạo dữ liệu mẫu** hoặc thu thập dữ liệu trong thực tế (**10 - 20 dòng** cho một quan hệ; **đảm bảo dữ liệu bao quát nhiều trường hợp**).

### 4. Quản lý thông tin

#### Xử lý thông tin

1. ~~Stored Procedure: 5~~
2. ~~Trigger: 5~~
3. ~~Function: 3~~
4. ~~Cursor: 2.~~

#### An toàn thông tin

1. (Bảo mật)
2. ~~Xác thực~~
3. Phân quyền
   1. [RBAC](https://whitehat.vn/threads/kiem-soat-truy-cap-dua-tren-vai-tro-role-based-access-control-la-gi.17301/)
   2. Xét duyệt REFUNDS
4. Import
5. Export
6. Backup
7. Restore.

#### Trình bày thông tin (đủ độ khó, đủ số lượng)

1. Menu
2. Form
3. Report
4. Help.

#### **Các chức năng** của hệ thống (Từ phần phân tích)

* Mô tả dạng văn bản. Không cần demo.

#### Lưu ý: **Demo** cho các chức năng (Trên nền tảng Web, Desktop, Mobile, ...)

* Demo các mục được trình bày ở phần Xử lý thông tin, An toàn thông tin, vv..

## Phạm vi chức năng

-  Chi tiết tại [prd_he_thong_quan_ly_dat_phong.md](noi-dung/02-mo-hinh-du-lieu/PRD_ERD/prd_he_thong_quan_ly_dat_phong.md)

### In Scope

1. Quản lý phòng và loại phòng (BMS)
2. Quản lý khách hàng (BMS)
3. Quản lý đặt phòng (BMS)
4. Kiểm tra phòng trống (BMS & User Application)
5. Đặt phòng và hủy đặt phòng (User Application)
6. Thanh toán trực tuyến (mô phỏng)
7. Hoàn tiền và hủy giao dịch theo chính sách
8. Quản lý và phân quyền người dùng (Admin / Staff / End User)
9. Hiển thị trạng thái đặt phòng và thanh toán (User Application)
10. Ứng dụng web hoặc mobile hoàn chỉnh phục vụ thao tác đặt phòng

### Out of Scope

1. Tích hợp cổng thanh toán thực tế (VNPay, Stripe, PayPal)
2. Hệ thống kế toán hoặc xuất hóa đơn điện tử
3. Tối ưu hiệu năng cho quy mô lớn (high traffic)
4. Tích hợp bên thứ ba (OTA như Booking, Agoda)

## Slides

- Khung nội dung: [outline.md](baocao/content/outline.md)
- Hiện tại được biểu diễn theo chương (heading level 1) > mục (heading level 2) > tiểu mục (heading level 3).
  - Khi thực hiện slides, chuyển tiểu mục về heading level 1.
