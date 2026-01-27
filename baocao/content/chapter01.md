# Mô Tả Bài Toán 

Mở đầu cho đồ án, chương này sẽ trình bày tổng quan về bối cảnh thực tế, lý do lựa chọn đề tài "Hệ thống quản lý đặt phòng", đồng thời xác định rõ phạm vi và mục tiêu mà nhóm hướng tới.

## Tổng Quan Về Đề Tài

### Đặt Vấn Đề

Trong bối cảnh ngành du lịch và dịch vụ lưu trú phát triển mạnh mẽ, nhu cầu quản lý vận hành tại các khách sạn, nhà nghỉ và homestay ngày càng trở nên cấp thiết. Tuy nhiên, tại các cơ sở quy mô nhỏ và vừa, quy trình quản lý hiện tại vẫn còn tồn tại nhiều bất cập:

- **Quản lý thủ công:** Việc ghi chép sổ sách hoặc sử dụng Excel rời rạc hoặc các cuộc chat Zalo, Facebook riêng lẻ, dẫn đến sai sót, khó tra cứu lịch sử và dễ mất mát dữ liệu.
- **Xung đột đặt phòng (Overbooking):** Khó kiểm soát trạng thái phòng theo thời gian thực, dẫn đến nhận trùng khách cho cùng một phòng.
- **Báo cáo khó khăn:** Chủ doanh nghiệp gặp khó khăn trong việc tổng hợp doanh thu, thống kê hiệu suất kinh doanh theo ngày/tháng.

Xuất phát từ thực tế đó, Nhóm 02 quyết định xây dựng **"Booking Management System (BMS)"** - Hệ thống quản lý đặt phòng tập trung, nhằm giải quyết các bài toán trên bằng công nghệ cơ sở dữ liệu quan hệ.

### Mục Tiêu Đề Tài

Đồ án tập trung vào hai mục tiêu chính:

1. **Mục tiêu học thuật:** Vận dụng kiến thức môn Quản Lý Thông Tin để phân tích, thiết kế và cài đặt một cơ sở dữ liệu hoàn chỉnh (SQL Server), bao gồm các ràng buộc toàn vẹn và kỹ thuật xử lý nâng cao (Store Procedure, Trigger).
2. **Mục tiêu ứng dụng:** Xây dựng giải pháp phần mềm hỗ trợ 3 nhóm đối tượng chính:
    - **Quản trị viên (Admin):** Quản lý toàn diện hệ thống (Phòng, Giá, Nhân viên).
    - **Nhân viên (Staff):** Thao tác nghiệp vụ hàng ngày (Check-in, Check-out, Thanh toán).
    - **Khách hàng (End User):** Tìm kiếm và đặt phòng trực tuyến.

## Phạm Vi & Đối Tượng Nghiên Cứu

### Phạm Vi Áp Dụng

Hệ thống được thiết kế phù hợp cho mô hình:

- Khách sạn, nhà nghỉ, homestay quy mô nhỏ và vừa.
- Hỗ trợ quy trình đặt phòng trực tiếp (tại quầy) và đặt phòng trực tuyến (qua ứng dụng).
- *Lưu ý:* Trong khuôn khổ đồ án môn học, hệ thống sẽ mô phỏng tính năng thanh toán trực tuyến và chưa tích hợp với các kênh OTA (như Agoda, Booking.com).

### Các Bên Liên Quan (Stakeholders)

Bảng dưới đây mô tả vai trò và trách nhiệm của các đối tượng tham gia hệ thống:

| Vai trò | Mô tả trách nhiệm |
| --- | --- |
| **Admin** | Quản trị viên cấp cao. Chịu trách nhiệm cấu hình hệ thống, quản lý danh mục phòng, thiết lập giá và quản lý tài khoản nhân viên. |
| **Staff** | Nhân viên vận hành (Lễ tân/Sale). Chịu trách nhiệm xử lý các đơn đặt phòng, thực hiện thủ tục nhận/trả phòng và ghi nhận thanh toán. |
| **End User** | Khách hàng cá nhân. Có thể tìm kiếm phòng, tạo đơn đặt phòng, xem lịch sử giao dịch và gửi đánh giá chất lượng. |

## Động Lực, Mục Tiêu, Ý Nghĩa của Đề Tài

### Tên Sản Phẩm

- **Booking Management System (BMS)**

### Mục Tiêu

Hệ thống Quản Lý Đặt Phòng (BMS) được xây dựng nhằm hỗ trợ quản lý thông tin phòng, khách hàng, đặt phòng và thanh toán ở mức cơ bản. Hệ thống tập trung vào quản lý dữ liệu bằng cơ sở dữ liệu quan hệ, phục vụ cho việc học tập và thực hành SQL trong môn Quản Lý Thông Tin.

### Đối Tượng Sử Dụng

- Quản trị viên (Admin).
- Nhân viên (Staff).
- Người dùng cuối (End User) - Khách hàng.

### Phạm Vi Áp Dụng

- Khách sạn, nhà nghỉ, homestay quy mô nhỏ và vừa.
- Có giao diện quản lý (BMS) cho Admin/Staff.
- Có giao diện người dùng (User Application) cho End User.
- Có triển khai ứng dụng web hoặc mobile ở mức hoàn chỉnh cho mục đích demo và đồ án.
- Có tích hợp thanh toán trực tuyến ở mức mô phỏng.

## Quy Trình Thực Tế Liên Quan Đến Đề Tài

### Vấn Đề Cần Giải Quyết

Việc quản lý đặt phòng thủ công hoặc bằng bảng tính gặp nhiều hạn chế:

- Dễ xảy ra trùng lịch đặt phòng.
- Khó theo dõi trạng thái phòng theo thời gian.
- Dữ liệu khách hàng phân tán, khó truy vấn.
- Khó tổng hợp báo cáo và thống kê doanh thu.
- Dữ liệu có thể được sao lưu tự động và bảo mật.

### Mục Tiêu Sản Phẩm

- Quản lý dữ liệu tập trung bằng cơ sở dữ liệu quan hệ.
- Đảm bảo toàn vẹn và nhất quán dữ liệu.
- Hỗ trợ truy vấn và thống kê hiệu quả bằng SQL.
- Phù hợp để triển khai các ràng buộc, trigger và procedure, cursor.

### Stakeholders

| Vai trò  | Mô tả                                                           |
| -------- | --------------------------------------------------------------- |
| Admin    | Quản lý phòng, loại phòng, giá phòng                            |
| Staff    | Quản lý đặt phòng, xác nhận / hủy đặt, ghi nhận thanh toán      |
| End User | Tìm kiếm phòng, đặt phòng, hủy đặt phòng và theo dõi thanh toán |
