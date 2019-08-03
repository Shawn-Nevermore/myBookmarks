// 1.初始化数据

var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

var hash = {
    q: 'mail.qq.com',
    w: 'weibo.com',
    e: 'ele.me',
    r: 'ruanyifeng.com',
    t: 'taobao.com',
    y: 'youtube.com',
    u: 'uestc.edu.cn',
    i: 'iqiyi.com',
    p: 'picture.baidu.com',
    a: 'amazon.com',
    s: 'sougo.com',
    d: 'douyu.com',
    f: 'facebook.com',
    g: 'google.com',
    h: 'huya.com',
    j: 'jd.com',
    l: 'leetcode.com',
    z: 'zhihu.com',
    c: 'css-tricks.com',
    v: 'v2ex.com',
    b: 'bilibili.com',
    m: 'meituan.com'
}

// 将localStorage中的hashUpdater覆盖到初始的hash中，以防止刷新浏览器导致变更信息丢失
// 添加'null'防止hashUpdater为空，parse失败
var hashInLocalStorage = getFromLocalStorage('hashUpdater')
if (hashInLocalStorage) {
    hash = hashInLocalStorage
}

// 2.生成键盘
// 遍历keys，生成kbd标签
for (var i = 0; i < keys.length; i++) {
    var div = createTag('div')
    keyboard.appendChild(div)
    for (var j = 0; j < keys[i].length; j++) {
        var kbd = createTag('kbd')
        kbd.textContent = keys[i][j].toUpperCase()
        div.appendChild(kbd)
        var button = createTag('button')
        button.textContent = 'E'
        kbd.appendChild(button)

        // 添加按键图标
        var img = createTag('img')
        if (hash[keys[i][j]]) {
            img.src = 'http://' + hash[keys[i][j]] + '/favicon.ico'
        } else {
            img.src = 'https://i.loli.net/2019/03/16/5c8bf7dfcefcc.png'
            img.style = 'opacity:0.2'
        }
        img.onerror = function(event) {
            event.target.src = 'https://i.loli.net/2019/03/16/5c8bf7dfcefcc.png'
            event.target.style = 'opacity:0.2'
        }

        kbd.appendChild(img)
        button.id = keys[i][j]
        button.onclick = function(onclickEvent) {
            //获取用户点击的编辑按钮的id
            var buttonKey = onclickEvent.target.id

            //弹出窗口，获取用户的输入信息
            var newWebsite = prompt('请输入你想更新的网址：')

            //hash变更
            hash[buttonKey] = newWebsite

            // 获取变更后的网址图标
            var img2 = onclickEvent.target.previousSibling
            img2.src = 'http://' + hash[keys[i][j]] + '/favicon.ico'
            img2.onerror = function(event) {
                event.target.src = 'https://i.loli.net/2019/03/16/5c8bf7dfcefcc.png'
                event.target.style = 'opacity:0.2'
            }

            //将用户变更的网址，即变更的hash存到浏览器中的localStorage
            localStorage.setItem('hashUpdater', JSON.stringify(hash))
        }
    }
}

// 3.监听键盘
document.onkeypress = function(onkeypressEvent) {
    var key = onkeypressEvent.key
    var website = hash[key]
    window.open('http://' + website, '_blank')
    // location.href = 'http://' + website
}

function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function createTag(name) {
    return document.createElement(name)
}
