-- Hiển thị kết quả gồm: ID, Full Name, Xếp Hạng
SELECT 
    u.id AS [ID],
    u.full_name AS [Full Name],
    dbo.fn_TinhHangThanhVien(@UserID) AS [Xếp Hạng]
FROM USERS u
WHERE u.id = @UserID;