const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dbService = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>
{
    res.json({ status: 'ok', timestamp: new Date() });
});

// API: Health Check
app.get('/api/health', (req, res) =>
{
    res.json({ status: 'ok', timestamp: new Date() });
});

// Mock database for scenario metadata (In real app, fetch from DB table)
const SCENARIO_MAP = {
    // Stored Procedures
    'sp-booking-room': { file: 'sp_BookingRoom.sql', spName: 'SP_DAT_PHONG', type: 'Stored Procedure' },
    'sp-apply-voucher': { file: 'sp_ApplyVoucher.sql', spName: 'SP_AP_DUNG_VOUCHER', type: 'Stored Procedure' },
    'sp-payment': { file: 'sp_Payment.sql', spName: 'SP_THANHTOAN', type: 'Stored Procedure' },
    'sp-review-room': { file: 'sp_CreateReviews.sql', spName: 'SP_TAO_DANH_GIA', type: 'Stored Procedure' },
    'sp-service': { file: 'sp_UsedService.sql', spName: 'SP_SU_DUNG_DICH_VU', type: 'Stored Procedure' },

    // Triggers (Frontend-managed SQL scripts)
    'tr-check-time': { type: 'Trigger', triggerName: 'TR_CHECK_TIME' },
    'tr-auto-price': { type: 'Trigger', triggerName: 'TR_AUTO_PRICE' },
    'tr-sync-status': { type: 'Trigger', triggerName: 'TR_SYNC_STATUS' },
    'tr-payment': { type: 'Trigger', triggerName: 'TR_PAYMENT' },
    'tr-refund': { type: 'Trigger', triggerName: 'TR_REFUND' },

    // Functions
    'fn-check-room-available': { file: 'fn_CheckRoomAvailable.sql', type: 'Function', funcName: 'fn_KiemTraPhongTrong' },
    'fn-revert-create-error': { file: 'fn_RevertCreateError.sql', type: 'Function', funcName: 'fn_RevertCreateError' },

    // Cursors (These are scripts, not stored procedures)
    'cs-check-update-voucher': { file: 'cs_CheckAndUpdateManyVoucher.sql', type: 'Cursor' },
    'cs-report-revenue-service': { file: 'cs_BookRevenueReport.sql', type: 'Cursor' }
};

// API: Lấy nội dung script SQL
app.get('/api/scenario/:id', (req, res) =>
{
    const { id } = req.params;
    const scenario = SCENARIO_MAP[id];

    if (!scenario)
    {
        // Fallback cho demo nếu chưa config hết map
        return res.json({
            sqlContent: `-- Script file for scenario ${id} not found on server.\n-- Please add mapping in server/index.js`
        });
    }

    const filePath = path.join(__dirname, 'sql', scenario.file);

    fs.readFile(filePath, 'utf8', (err, data) =>
    {
        if (err)
        {
            return res.status(404).json({ error: 'File SQL not found on server disk.' });
        }
        res.json({ sqlContent: data, filename: scenario.file });
    });
});

// API: Generic Query (Dùng để fetch state Before/After từ config Frontend)
// WARNING: Chỉ dùng cho môi trường Demo/Dev. Không dùng trong Production vì rủi ro SQL Injection nếu không kiểm soát kỹ.
app.post('/api/query', async (req, res) =>
{
    const { sql, params } = req.body;
    console.log('PathAPI::: /api/query', "Executing Query:", sql);
    console.log('PathAPI::: /api/query', "Params:", params);

    try
    {
        const result = await dbService.connectAndExecute(sql, params || []);
        res.json({ success: true, data: result.recordset });
    } catch (error)
    {
        console.error("Query Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Execute Raw SQL from Frontend config (For demos that define sqlExecute in config.json)
app.post('/api/execute-raw', async (req, res) =>
{
    const { sql, params, scenarioId } = req.body;
    console.log('PathAPI::: /api/execute-raw', "SQL:", sql);
    console.log('PathAPI::: /api/execute-raw', "Params:", params);

    try
    {
        // Use executeBatch to handle scripts with GO separators
        const result = await dbService.executeBatch(sql, params || []);
        res.json({
            success: true,
            message: "SQL executed successfully.",
            data: result,
            rowsAffected: result.rowsAffected
        });
    } catch (error)
    {
        console.error("Execute Raw Error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
            hint: getErrorHint(error.message)
        });
    }
});

// API: Execute SQL - Alias for execute-raw (Frontend compatibility)
app.post('/api/execute-sql', async (req, res) =>
{
    const { sql, params } = req.body;
    console.log('PathAPI::: /api/execute-sql', "SQL:", sql);
    console.log('PathAPI::: /api/execute-sql', "Params:", JSON.stringify(params));

    try
    {
        // Use executeBatch to handle scripts with GO separators
        const result = await dbService.executeBatch(sql, params || []);

        res.json({
            success: true,
            message: "SQL executed successfully.",
            data: result,
            rowsAffected: result.rowsAffected // Note: executeBatch might not return rowsAffected for all batches, but that's ok for scripts
        });
    } catch (error)
    {
        console.error("Execute SQL Error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
            hint: getErrorHint(error.message)
        });
    }
});

// Helper: Get error hint for self-healing
function getErrorHint(errorMessage)
{
    if (errorMessage.includes('Invalid object name'))
    {
        return 'Table does not exist. Check table name or run init script.';
    }
    if (errorMessage.includes('Could not find stored procedure'))
    {
        return 'Stored procedure not found. Create it first using the init script.';
    }
    if (errorMessage.includes('Violation of PRIMARY KEY'))
    {
        return 'Duplicate primary key. Record already exists.';
    }
    if (errorMessage.includes('FOREIGN KEY constraint'))
    {
        return 'Foreign key violation. Referenced record does not exist.';
    }
    if (errorMessage.includes('Cannot insert the value NULL'))
    {
        return 'Required field is NULL. Check your input parameters.';
    }
    return 'Check SQL syntax and parameters.';
}

// API: Thực thi kịch bản (Execute Stored Procedure / Main Script)
app.post('/api/execute', async (req, res) =>
{
    const { scenarioId, params } = req.body;

    console.log('PathAPI::: /api/execute', `Executing Scenario: ${scenarioId}`);
    console.log('PathAPI::: /api/execute', `Params:`, params);

    try
    {
        // Get scenario info
        const scenario = SCENARIO_MAP[scenarioId];

        if (!scenario)
        {
            return res.status(404).json({
                success: false,
                error: `Scenario ${scenarioId} not found in SCENARIO_MAP`
            });
        }

        // Real Mode: Execute stored procedure or cursor script
        if (scenario.spName)
        {
            // This is a stored procedure
            console.log(`Calling stored procedure: ${scenario.spName}`);
            const result = await dbService.connectAndExecute(scenario.spName, params);

            res.json({
                success: true,
                message: "Stored procedure executed successfully.",
                data: result,
                logs: `Executed ${scenario.spName} successfully.`
            });
        } else if (scenario.file)
        {
            // This is a cursor script - execute as raw SQL
            const filePath = path.join(__dirname, 'sql', scenario.file);
            const sqlContent = fs.readFileSync(filePath, 'utf8');

            console.log(`Executing cursor script from: ${scenario.file}`);
            const result = await dbService.connectAndExecute(sqlContent, params);

            res.json({
                success: true,
                message: "Cursor script executed successfully.",
                data: result,
                logs: `Executed ${scenarioId} cursor script successfully.`
            });
        } else
        {
            // Trigger/Function - no direct execution, return info
            res.json({
                success: true,
                message: `${scenario.type} ${scenario.triggerName || scenario.funcName} is managed by database.`,
                data: null,
                logs: `${scenario.type} demos use INSERT/UPDATE to trigger execution.`
            });
        }

    } catch (error)
    {
        console.error('Execute Error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
            hint: getErrorHint(error.message)
        });
    }
});

app.listen(PORT, () =>
{
    dbService.initDb();
    console.log(`Backend Server running on http://localhost:${PORT}`);
});