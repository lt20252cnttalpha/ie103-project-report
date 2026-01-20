-- Tìm các phòng thuộc Loại này đang KHÔNG bị trùng lịch
-- Kết quả sẽ hiện ở cả bảng Result và Tab "KẾT QUẢ TÌM KIẾM"
SELECT 
    p.id AS [ID Phòng],
    p.so_phong AS [Số Phòng],
    p.trang_thai AS [Trạng Thái Gốc],
    N'✅ Có thể đặt' AS [Kết Luận]
FROM dbo.fn_TimPhongTrongTheoLoai(@LoaiPhongID, CAST(@CheckIn AS DATETIME), CAST(@CheckOut AS DATETIME)) p;