async function fetchWordCount() {

    if (!window.location.href.includes('/posts/')) {
        console.log("非文章页面");

        // 判断是否是文章列表页
        if (!window.location.href.includes('.html')) {
            const articleinfo = document.getElementsByClassName('article_information');

            // 隐藏文章信息
            Array.from(articleinfo).forEach(element => {
                element.style.display = "none";
            });
            return
        }
        return
    } else {
        try {
            /**
            * 检查指定区域的字数
            * @param {string} elementId - 需要统计字数的元素ID
            */

            const articleinfo = document.getElementsByClassName('article_information');
            const wordCountSpan = document.getElementById('word_count'); // 渲染位置
            const readTimeSpan = document.getElementById('read_time'); // 阅读时间渲染位置

            (function checkWordCount(elementId) {
                const element = document.getElementById(elementId);
                const textContent = element.textContent || element.innerText || "";
                const wordCount = textContent.replace(/\s+/g, "").length;

                const readTime = Math.ceil(wordCount / 500);

                wordCountSpan.textContent = wordCount;
                readTimeSpan.textContent = readTime;
                console.log(`发现文章！文章字数: ${wordCount}`);

                if (!wordCount) {
                    console.log("没有找到有效的文章");
                    Array.from(articleinfo).forEach(element => {
                        element.style.display = "none";
                    });
                }

            })("article-content");

        }
        catch (error) {
            console.error(`发生错误: ${e}`,"但我也不知道问题在哪里" , error);
        }
    }
}


// 执行函数
fetchWordCount();