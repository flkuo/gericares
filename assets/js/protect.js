/*
 * 內容複製保護（僅為降低隨意複製之嚇阻措施，非資安機制）
 * ------------------------------------------------------------
 * 重要提醒：這些措施無法阻止真正想取得內容的人（檢視原始碼、
 * 開發者工具、關閉 JavaScript 皆可繞過），僅能提高一般使用者
 * 隨手選取／複製／右鍵另存的門檻。請勿將本檔案視為內容保護或
 * 資安防護的完整解決方案。
 *
 * 表單欄位（input / textarea / select）不受影響，避免干擾
 * 「社區防跌運動計畫管理工具」等頁面的正常資料輸入。
 */
(function () {
    function isFormField(el) {
        if (!el) return false;
        const tag = el.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    }

    // 停用右鍵選單（表單欄位除外）
    document.addEventListener('contextmenu', function (e) {
        if (!isFormField(e.target)) e.preventDefault();
    });

    // 停用拖曳圖片另存
    document.addEventListener('dragstart', function (e) {
        if (e.target && e.target.tagName === 'IMG') e.preventDefault();
    });

    // 攔截常見的複製／檢視原始碼快捷鍵（表單欄位除外）
    document.addEventListener('keydown', function (e) {
        if (isFormField(e.target)) return;
        const key = (e.key || '').toLowerCase();
        const ctrlOrCmd = e.ctrlKey || e.metaKey;

        // Ctrl/Cmd + C（複製）、X（剪下）、S（另存）、U（檢視原始碼）
        if (ctrlOrCmd && ['c', 'x', 's', 'u'].includes(key)) {
            e.preventDefault();
        }
        // F12 與 Ctrl+Shift+I / J（開發者工具，僅嚇阻，無法真正阻擋）
        if (key === 'f12' || (ctrlOrCmd && e.shiftKey && ['i', 'j'].includes(key))) {
            e.preventDefault();
        }
    });

    // 停用複製事件（表單欄位除外）
    document.addEventListener('copy', function (e) {
        if (!isFormField(e.target)) e.preventDefault();
    });
})();
