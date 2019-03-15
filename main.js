// 1.初始化数据

var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

var hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    'e': 'ele.me',
    'r': 'renren.com',
    't': 'tencent.com',
    'y': 'youtube.com',
    'u': 'uc.com',
    'i': 'iqiyi.com',
    'o': 'opera.com',
    'p': 'pornhub.com',
    'a': 'amazon.com',
    's': '',
    'z': 'zhihu.com'
}

// 将localStorage中的hashUpdater覆盖到初始的hash中，以防止刷新浏览器导致变更信息丢失
// 添加'null'防止hashUpdater为空，parse失败
var hashInLocalStorage = JSON.parse(localStorage.getItem('hashUpdater') || 'null')
if (hashInLocalStorage) {
    hash = hashInLocalStorage
}


// 2.生成键盘
// 遍历keys，生成kbd标签
for (var i = 0; i < keys.length; i++) {
    var div = document.createElement('div')
    keyboard.appendChild(div)
    for (var j = 0; j < keys[i].length; j++) {
        var key = document.createElement('kbd')
        key.textContent = keys[i][j]
        div.appendChild(key)
        var button = document.createElement('button')
        button.textContent = '编辑'
        key.appendChild(button)

        //
        button.id = keys[i][j]
        button.onclick = function(onclickEvent) {
            //获取用户点击的编辑按钮的id
            var buttonKey = onclickEvent.target.id;

            //弹出窗口，获取用户的输入信息
            var newWebsite = prompt('请输入你想更新的网址：')

            //hash变更
            hash[buttonKey] = newWebsite

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