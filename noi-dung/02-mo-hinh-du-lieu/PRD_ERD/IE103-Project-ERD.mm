erDiagram
    %% ===== NGƯỜI DÙNG & PHÂN QUYỀN =====
    ADMINS {
        int id PK
        string email
        string password_hash
        string full_name
        string status
    }

    ROLES {
        int id PK
        string code
        string name
    }

    PERMISSIONS {
        int id PK
        string code
        string description
    }

    ADMIN_ROLES {
        int admin_id FK
        int role_id FK
    }

    ROLE_PERMISSIONS {
        int role_id FK
        int permission_id FK
    }

    USERS {
        int id PK
        string email
        string phone
        string password_hash
        string full_name
        string status
    }

    %% ===== PHÒNG & ĐẶT PHÒNG =====
    LOAIPHONG {
        int id PK
        string ten_loai
        decimal gia_co_ban
    }

    PHONG {
        int id PK
        string so_phong
        int loai_phong_id FK
        string trang_thai
    }

    DATPHONG {
        int id PK
        int user_id FK
        datetime check_in
        datetime check_out
        string trang_thai
        datetime created_at
    }

    CT_DATPHONG {
        int id PK
        int datphong_id FK
        int phong_id FK
        decimal don_gia
    }

    %% ===== THANH TOÁN =====
    PAYMENTS {
        int id PK
        int booking_id FK
        int user_id FK
        decimal so_tien
        string phuong_thuc
        string trang_thai
        datetime created_at
    }

    REFUNDS {
        int id PK
        int payment_id FK
        decimal so_tien_hoan
        string trang_thai
        string ly_do
    }

    %% ===== MÃ GIẢM GIÁ =====
    VOUCHERS {
        int id PK
        string ma_code
        decimal phan_tram_giam
        date ngay_het_han
        decimal so_tien_toi_thieu
        int so_lan_toi_da
        int so_lan_da_dung
        string trang_thai
    }

    %% ===== DỊCH VỤ =====
    DICHVU {
        int id PK
        string ten_dich_vu
        decimal don_gia
        string don_vi_tinh
        string status
    }

    CT_SUDUNG_DV {
        int id PK
        int datphong_id FK
        int dichvu_id FK
        int so_luong
        decimal don_gia
        datetime thoi_diem_su_dung
        string ghi_chu
    }

    %% ===== ĐÁNH GIÁ =====
    REVIEWS {
        int id PK
        int user_id FK
        int phong_id FK
        int datphong_id FK
        int so_sao
        string binh_luan
        date ngay_danh_gia
        string status
    }

    %% ===== QUAN HỆ =====
    ADMINS ||--o{ ADMIN_ROLES : có
    ROLES ||--o{ ADMIN_ROLES : được_gán
    ROLES ||--o{ ROLE_PERMISSIONS : bao_gồm
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : cấp_quyền

    USERS ||--o{ DATPHONG : tạo
    DATPHONG ||--o{ CT_DATPHONG : chứa
    PHONG ||--o{ CT_DATPHONG : được_đặt
    LOAIPHONG ||--o{ PHONG : phân_loại

    DATPHONG ||--o{ PAYMENTS : có
    PAYMENTS ||--o{ REFUNDS : hoàn_tiền
    USERS ||--o{ PAYMENTS : thực_hiện
    ADMINS ||--o{ REFUNDS : duyệt

    DATPHONG ||--o| VOUCHERS : áp_dụng
    DATPHONG ||--o{ CT_SUDUNG_DV : sử_dụng
    DICHVU ||--o{ CT_SUDUNG_DV : cung_cấp

    USERS ||--o{ REVIEWS : viết
    PHONG ||--o{ REVIEWS : nhận
    DATPHONG ||--o| REVIEWS : tạo_ra