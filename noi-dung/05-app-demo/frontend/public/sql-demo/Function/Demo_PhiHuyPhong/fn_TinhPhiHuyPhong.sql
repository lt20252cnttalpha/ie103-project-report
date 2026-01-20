
-- Đây là script thực thi chính, kết quả sẽ hiện ở bảng Result
SELECT 
    @BookingID AS [Mã Đơn],
    
    -- Ngày báo hủy
    FORMAT(CAST(@NgayBaoHuy AS DATETIME), 'dd/MM/yyyy') AS [Ngày Báo Hủy],
    
    -- Gọi hàm tính tiền phạt
    FORMAT(dbo.fn_TinhPhiHuyPhong(@BookingID, CAST(@NgayBaoHuy AS DATETIME)), 'N0') + ' VNĐ' AS [💰 SỐ TIỀN PHẠT]