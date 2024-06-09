//分享和赞助是在一起的，那我就偷个懒，写在一个JS里面了


var openSupportDialogBtn = document.getElementById('openSupportDialogBtn');
var closeSupportDialogBtn = document.getElementById('closeSupportDialogBtn');
var generateAndCopyLinkBtn = document.getElementById('generateAndCopyLinkBtn');
// 添加点击事件监听器
openSupportDialogBtn.addEventListener('click', openSupportDialog);
closeSupportDialogBtn.addEventListener('click', closeSupportDialog);
generateAndCopyLinkBtn.addEventListener('click', generateAndCopyLink);


// 赞助的 显示/隐藏 部分
function openSupportDialog() {
    document.getElementById('support-dialog').style.display = 'block';
}

function closeSupportDialog() {
    document.getElementById('support-dialog').style.display = 'none';
}

//分享链接的生成部分
function generateAndCopyLink() {
    var blogNameElement = document.getElementById('title');
    // 提取博客名
    var blogName = blogNameElement.innerText.trim();
    var postTitleElement = document.getElementById('article-title');

    // 提取纯文本标题内容
    var postTitle = postTitleElement.innerText.trim();
    var postUrl = window.location.href; // 获取当前文章链接

    // 构建分享文本
    var shareText = blogName + ' - ' + postTitle + ' - ' + postUrl;
    var textarea = document.createElement('textarea');
    textarea.value = shareText;
    document.body.appendChild(textarea);
    textarea.select();

    // 尝试执行复制操作
    try {
        var successful = document.execCommand('copy');
        if (successful) {
            // 复制成功时显示弹窗提示
            showCopySuccessPopup();
            console.info('链接已生成并复制成功！', shareText);
        } else {
            console.error('链接生成失败或复制失败！');
        }
    } catch (err) {
        console.error('链接生成失败或复制失败！', err);
    }

    // 移除文本区域元素
    document.body.removeChild(textarea);
}

// 显示复制成功弹窗
function showCopySuccessPopup() {
    var popup = document.createElement('div');
    popup.textContent = '链接已复制成功！';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '10px';
    popup.style.backgroundColor = '#2b6963';
    popup.style.color = '#b0decf';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '1000';

    document.body.appendChild(popup);

    // 管他几秒后移除弹窗，这里是3秒
    setTimeout(function () {
        document.body.removeChild(popup);
    }, 3000);

}
