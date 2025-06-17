
fetch('data/resource.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('成功載入 JSON：', data);
    // 顯示資料到畫面
  })
  .catch(error => {
    console.error('無法載入資料：', error);
    document.getElementById('error-message').textContent = '⚠️ 無法載入資料，請稍後再試';
  });
