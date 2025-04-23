let abortController = null;

async function ask_AI() {
    const questionInput = document.getElementById('question');
    const outputDiv = document.getElementById('output');
    
    // 使用局部变量锁定当前控制器
    const currentController = abortController;
    if (currentController) currentController.abort();
    
    // 创建新控制器前先重置全局变量
    abortController = new AbortController();
    const controller = abortController; // 局部引用

    outputDiv.textContent = '思考中...';
    questionInput.disabled = true;

    try {
        const response = await fetch(
            `http://127.0.0.1:5000/ask?question=${encodeURIComponent(questionInput.value)}`,
            { signal: controller.signal } // 使用局部引用
        );

        if (!response.ok || !response.body) {
            throw new Error(response.statusText || '无效的响应');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        outputDiv.textContent = '';

        while (true) {
            // 使用局部控制器的信号
            if (controller.signal.aborted) break;
            
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let lastIndex = 0;
            while ((lastIndex = buffer.indexOf('\n\n', lastIndex)) !== -1) {
                // 再次检查中止状态
                if (controller.signal.aborted) break;
                
                const chunk = buffer.substring(0, lastIndex);
                buffer = buffer.substring(lastIndex + 2);
                // trim 会去除前后空格
                const eventData = chunk.replace(/^data: /, '');
                if (eventData === '[DONE]') break;

                try {
                    const content = JSON.parse(eventData);
                    outputDiv.textContent += content;
                    outputDiv.scrollTop = outputDiv.scrollHeight;
                } catch (e) {
                    console.warn('解析失败:', e);
                }
            }
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('请求已取消');
            outputDiv.textContent = '请求已取消';
            return;
        }
        console.error('请求失败:', error);
        outputDiv.textContent = `错误: ${error.message}`;
    } finally {
        questionInput.disabled = false;
        // 安全重置：只有当当前控制器是全局控制器时才清除
        if (abortController === controller) {
            abortController = null;
        }
    }
}

// 回车支持
document.getElementById('question').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') ask_AI();
});

// 可选：中止按钮
document.getElementById('cancelBtn')?.addEventListener('click', () => {
    if (abortController) abortController.abort();
});
