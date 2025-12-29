-- ========================================
-- SEED DATA FOR ROOM BOOKING SYSTEM (MSSQL)
-- ========================================

-- ===== ADMINS =====
INSERT INTO ADMINS (email, password_hash, full_name, status)
VALUES
('admin@hotel.com', 'hashed_pw_1', N'Super Admin', 'ACTIVE'),
('staff@hotel.com', 'hashed_pw_2', N'Nhân viên', 'ACTIVE');

-- ===== ROLES =====
INSERT INTO ROLES (code, name)
VALUES
('SUPER_ADMIN', N'Super Administrator'),
('STAFF', N'Staff');

-- ===== PERMISSIONS =====
INSERT INTO PERMISSIONS (code, description)
VALUES
('MANAGE_ROOM', N'Quản lý phòng'),
('MANAGE_BOOKING', N'Quản lý đặt phòng'),
('MANAGE_PAYMENT', N'Quản lý thanh toán'),
('APPROVE_REFUND', N'Duyệt hoàn tiền');

-- ===== ADMIN_ROLES =====
INSERT INTO ADMIN_ROLES (admin_id, role_id)
VALUES
(1, 1),  -- Super Admin
(2, 2);  -- Staff

-- ===== ROLE_PERMISSIONS =====
INSERT INTO ROLE_PERMISSIONS (role_id, permission_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2);

-- ===== USERS =====
INSERT INTO USERS (email, phone, password_hash, full_name, status)
VALUES
('user1@gmail.com', '0900000001', 'user_pw_1', N'Nguyễn Văn A', 'ACTIVE'),
('user2@gmail.com', '0900000002', 'user_pw_2', N'Trần Thị B', 'ACTIVE');

-- ===== LOAIPHONG =====
INSERT INTO LOAIPHONG (ten_loai, gia_co_ban)
VALUES
(N'Phòng Đơn', 500000),
(N'Phòng Đôi', 800000),
(N'Phòng VIP', 1500000);

-- ===== PHONG =====
INSERT INTO PHONG (so_phong, loai_phong_id, trang_thai)
VALUES
('101', 1, 'AVAILABLE'),
('102', 1, 'AVAILABLE'),
('201', 2, 'AVAILABLE'),
('202', 2, 'AVAILABLE'),
('VIP01', 3, 'AVAILABLE');

-- ===== DATPHONG =====
INSERT INTO DATPHONG (user_id, check_in, check_out, trang_thai)
VALUES
(1, '2025-04-01 14:00:00', '2025-04-03 12:00:00', 'CONFIRMED');

-- ===== CT_DATPHONG =====
INSERT INTO CT_DATPHONG (datphong_id, phong_id, don_gia)
VALUES
(1, 3, 800000);

-- ===== PAYMENTS =====
INSERT INTO PAYMENTS (booking_id, user_id, amount, method, status)
VALUES
(1, 1, 1600000, 'BANKING', 'PAID');

-- ===== REFUNDS =====
INSERT INTO REFUNDS (payment_id, refund_amount, status, reason, approved_by)
VALUES
(1, 1600000, 'APPROVED', N'Hủy trước 24h', 1);