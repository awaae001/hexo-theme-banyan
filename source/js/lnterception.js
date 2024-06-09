document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a');
    const popup = document.getElementById('popup');
    const popupContent = document.querySelector('.popup-content');
    const websiteName = document.getElementById('website-name');
    const websiteUrl = document.getElementById('website-url');
    const cancelButton = document.getElementById('cancel-btn'); // 获取取消按钮元素
    const confirmButton = document.getElementById('confirm-btn'); // 获取确定按钮元素
    let targetUrl = '';
    const currentDomain = window.location.hostname;
    let safeDomains = [];

    function shortenUrl(url, maxLength = 36) {
        if (url.length <= maxLength) {
            return url;
        }
        const halfLength = Math.floor((maxLength - 3) / 2);
        return url.slice(0, halfLength) + '...' + url.slice(-halfLength);
    }

    function isSafeDomain(url) {
        const targetHostname = new URL(url).hostname;
        return safeDomains.some(domain => {
            return targetHostname === domain || targetHostname.endsWith('.' + domain);
        });
    }

    function loadSafeDomainList(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                safeDomains = data.safe;
            })
            .catch(error => console.error('Error fetching safe domain list:', error));
    }

    function openTargetUrl(url) {
        window.open(url, '_blank'); // 在新标签页中打开目标URL
        popup.style.display = 'none'; // 关闭弹窗
        targetUrl = ''; // 重置目标URL
    }

    loadSafeDomainList('/js/json/safe.json'); // 加载安全域名列表

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            const clickedUrl = link.href;
            const isSafe = isSafeDomain(clickedUrl);
            const isInternal = new URL(clickedUrl).hostname === currentDomain;

            if (isInternal) {
                // 如果是站内链接，直接跳转
                return;
            }

            if (!isSafe) {
                event.preventDefault();
                const pageTitle = document.title;
                targetUrl = clickedUrl;
                websiteName.textContent = pageTitle;
                websiteUrl.textContent = shortenUrl(targetUrl);
                popup.style.display = 'flex';
                setTimeout(() => {
                    popupContent.classList.remove('fade-out');
                    popupContent.classList.add('fade-in');
                }, 100);
            }
        });
    });

    // 添加取消按钮的点击事件监听器
    cancelButton.addEventListener('click', function () {
        popupContent.classList.remove('fade-in');
        popupContent.classList.add('fade-out');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
        targetUrl = ''; // 取消时重置目标URL
    });

    confirmButton.addEventListener('click', function () {
        openTargetUrl(targetUrl);
    });
});