if (account) {

    console.log('account:' + account);

    socket = io.connect('ws://127.0.0.1:3001');
    // socket.emit("message", 'hi');

    // // 歷史訊息
    socket.on('history', (obj) => {

        console.log(obj);

        if (obj.length > 0) {
            appendData(obj);
        }

    });

    socket.on('peaple', (obj) => {
        console.log(obj);
    });

    socket.on('message', (obj) => {
        appendData([obj]);
    });
}

document.querySelector('#btnAddMsg').addEventListener('click', () => {
    sendData()
});
document.querySelector('input').addEventListener('keypress', (e) => {
    if (e.code == 'Enter') {
        sendData();
        document.querySelector('input').value = '';
    }
});

function sendData() {
    let msg = document.querySelector('input').value;
    if (!msg) {
        alert('請輸入訊息!');
        return;
    }
    let data = {
        name: account,
        msg: msg,
    };
    socket.emit('message', data);
}

function scrollWindow() {
    let h = document.querySelector('.speeches');
    h.scrollTo(0, h.scrollHeight);
}

function appendData(obj) {

    let html = '';
    let el = document.querySelector('.speeches');

    obj.forEach(element => {

        // other peaple
        //   <div class="speech">
        //     <div class="avatar">
        //       <img src="./images/user.png">
        //     </div>
        //     <div class="content">
        //       <div class="inline author">Yami Odymel</div>
        //       <div class="text">：嗨！早安。</div>
        //     </div>
        //   </div>

        // myself
        //   <div class="speech">
        //     <div class="group">
        //       <div class="avatar">
        //         <img src="./images/user.png">
        //       </div>
        //       <div class="content">
        //         <div class="inline author">Yami Odymel</div>
        //         <div class="text">：嗨！早安。</div>
        //       </div>
        //     </div>
        //   </div>

        html +=
            `
            <div class="${element.name == account ? 'right circular group' : 'circular group'}">
                <div class="speech">
                   ${element.name == account? "<div class='group'>":''}
                        <div class="avatar">
                            <img src="${element.name == account ? './images/user.png' : './images/user1.png'}">
                        </div>
                        <div class="content">
                            <div class="inline author">${element.name == account ? '' : element.name}</div>
                            <div class="text">${element.name == account ? element.msg : '：' + element.msg}</div>
                        </div>
                    ${element.name == account? "</div>":''}
                </div>
            </div>
            `

    });

    el.innerHTML = html.trim();
    scrollWindow();

}