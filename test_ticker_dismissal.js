const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('../Para_eso_trabajo_bot/node_modules/playwright');

// Simple static server for TCP_broadcast
const PORT = 8089;
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not Found');
        return;
    }
    const ext = path.extname(filePath);
    const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.png': 'image/png'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
});

async function runTest() {
    server.listen(PORT, async () => {
        console.log(`Test server running at http://localhost:${PORT}`);
        let browser;
        try {
            browser = await chromium.launch({ headless: true });
            const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
            const page = await context.newPage();

            console.log("1. Navigating to index.html...");
            await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(2000);

            // Check initial normal marquee
            const initialLabel = await page.$eval('#ticker-label', el => el.innerText.trim());
            console.log(`Initial ticker label: "${initialLabel}"`);
            if (!initialLabel.includes('ÚLTIMA HORA')) {
                throw new Error(`Expected 'ÚLTIMA HORA', got '${initialLabel}'`);
            }

            // 2. Trigger Emergency
            console.log("2. Triggering Emergency Alert (SISMO)...");
            await page.evaluate(() => {
                window.simulateEmergency('SISMO', 45);
            });
            await page.waitForTimeout(1000);

            const isOverlayActive = await page.$eval('#emergency-overlay', el => el.classList.contains('active'));
            const isTickerAlertMode = await page.$eval('#ticker-bar', el => el.classList.contains('alert-mode'));
            const emergencyLabel = await page.$eval('#ticker-label', el => el.innerText.trim());
            const tickerEmergencyTrack = await page.$eval('#ticker-content-box', el => el.innerHTML);

            console.log(`Overlay active: ${isOverlayActive}`);
            console.log(`Ticker alert mode: ${isTickerAlertMode}`);
            console.log(`Emergency ticker label: "${emergencyLabel}"`);
            console.log(`Ticker contains continuous .ticker-track: ${tickerEmergencyTrack.includes('ticker-track')}`);
            console.log(`Ticker contains ALERTA: ${tickerEmergencyTrack.includes('ALERTA')}`);

            if (!isOverlayActive || !isTickerAlertMode || !emergencyLabel.includes('EMERGENCIA') || !tickerEmergencyTrack.includes('ticker-track')) {
                throw new Error("Emergency mode did not configure ticker-track or overlay correctly!");
            }

            // Take screenshot of active emergency overlay with dismiss button
            await page.screenshot({ path: 'test_emergency_active.png' });
            console.log("Captured test_emergency_active.png");

            // 3. Test on-screen dismiss button
            console.log("3. Clicking on-screen dismiss button (✕ CERRAR)...");
            await page.click('.emergency-dismiss-btn');
            await page.waitForTimeout(1000);

            const isOverlayActiveAfter = await page.$eval('#emergency-overlay', el => el.classList.contains('active'));
            const isTickerAlertModeAfter = await page.$eval('#ticker-bar', el => el.classList.contains('alert-mode'));
            const restoredLabel = await page.$eval('#ticker-label', el => el.innerText.trim());
            const restoredTickerHTML = await page.$eval('#ticker-content-box', el => el.innerHTML);

            console.log(`Overlay active after dismiss: ${isOverlayActiveAfter}`);
            console.log(`Ticker alert mode after dismiss: ${isTickerAlertModeAfter}`);
            console.log(`Restored ticker label: "${restoredLabel}"`);
            console.log(`Restored ticker has emergency text: ${restoredTickerHTML.includes('ALERTA SÍSMICA')}`);

            if (isOverlayActiveAfter) {
                throw new Error("Overlay should NOT be active after dismissal!");
            }
            if (isTickerAlertModeAfter) {
                throw new Error("Ticker bar should NOT have alert-mode after dismissal!");
            }
            if (!restoredLabel.includes('ÚLTIMA HORA')) {
                throw new Error(`Ticker label should have returned to 'ÚLTIMA HORA', got: '${restoredLabel}'`);
            }
            if (restoredTickerHTML.includes('ALERTA SÍSMICA')) {
                throw new Error("Ticker still contains stuck emergency text!");
            }

            // Take screenshot of restored normal state
            await page.screenshot({ path: 'test_emergency_dismissed.png' });
            console.log("Captured test_emergency_dismissed.png");

            // 4. Test Manager Alert & Restoration
            console.log("4. Testing Manager Alert mode...");
            await page.evaluate(() => {
                updateTickerDOM({ managerMsg: "REUNIÓN URGENTE EN SALA DE JUNTAS" }, true);
            });
            await page.waitForTimeout(500);

            const managerLabel = await page.$eval('#ticker-label', el => el.innerText.trim());
            const managerTickerHTML = await page.$eval('#ticker-content-box', el => el.innerHTML);
            console.log(`Manager label: "${managerLabel}"`);
            console.log(`Manager ticker has track: ${managerTickerHTML.includes('ticker-track')}`);
            console.log(`Manager ticker has text: ${managerTickerHTML.includes('REUNIÓN URGENTE')}`);

            if (!managerLabel.includes('GERENCIA') || !managerTickerHTML.includes('ticker-track')) {
                throw new Error("Manager alert mode did not render correctly!");
            }

            // 5. Test Manager Alert Removal
            console.log("5. Clearing Manager Alert...");
            await page.evaluate(() => {
                updateTickerDOM({ managerMsg: "" }, true);
            });
            await page.waitForTimeout(500);

            const clearedLabel = await page.$eval('#ticker-label', el => el.innerText.trim());
            const clearedTickerHTML = await page.$eval('#ticker-content-box', el => el.innerHTML);
            console.log(`Cleared manager label: "${clearedLabel}"`);
            console.log(`Cleared manager ticker has manager text: ${clearedTickerHTML.includes('REUNIÓN URGENTE')}`);

            if (!clearedLabel.includes('ÚLTIMA HORA') || clearedTickerHTML.includes('REUNIÓN URGENTE')) {
                throw new Error("Manager message stayed stuck in ticker!");
            }

            console.log("\n>>> ALL TESTS PASSED SUCCESSFULLY! Marquee never gets stuck or topado! <<<");
        } catch (err) {
            console.error("TEST FAILED:", err);
            process.exitCode = 1;
        } finally {
            if (browser) await browser.close();
            server.close();
        }
    });
}

runTest();
