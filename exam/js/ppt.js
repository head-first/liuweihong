var ppt = document.querySelector('#ppt'),
	button = document.querySelector('#button'),
	btn = button.querySelectorAll('div'),
	img = ppt.querySelectorAll('div'),
	len = img.length,
	timer = null,
	index = 0;

[].forEach.call(img, function (item) {
	item.style.width = (100 / len) + '%';
});
ppt.style.left = '0%';
ppt.style.width = (100 * len) + '%';

//自动播放函数autoPlay
function autoPlay () {
	setInterval(function() {
		show(index);
	},2500);
}
autoPlay();//应用

//图片切换
function show (a) {
	index = a;
	console.log(index);
	
	var left = ppt.style.left;
	if (index < len - 1) {
		// 切换到下一张图片
        ppt.style.left = (parseInt(left) - 100) + '%';
        index ++;
      }
      else if (index == len - 1) {
        ppt.style.left = '0%';
        index = 0;
      }
      for (var i = 0; i < btn.length; i++)
			btn[i].className = 'btn';
		btn[index].className = 'current';
}