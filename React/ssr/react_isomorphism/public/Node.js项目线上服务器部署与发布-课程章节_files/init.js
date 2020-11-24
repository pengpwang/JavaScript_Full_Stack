(function(para) {
	var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
	if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
		return false;
	}
	w['sensorsDataAnalytic201505'] = n;
	w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
	var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
	for (var i = 0; i < ifs.length; i++) {
	  w[n][ifs[i]] = w[n].call(null, ifs[i]);
	}
	if (!w[n]._t) {
	  x = d.createElement(s), y = d.getElementsByTagName(s)[0];
	  x.async = 1;
	  x.src = p;
	  x.setAttribute('charset','UTF-8');
	  w[n].para = para;
	  y.parentNode.insertBefore(x, y);
	}
})({
	sdk_url: '//www.imooc.com/static/lib/sa-sdk-1.15.1/sensorsdata.min.js',
	heatmap_url: '//www.imooc.com/static/lib/sa-sdk-1.15.1/heatmap.min.js',
	name: 'zhuge',
	// server_url: '//sensordata.open.com.cn/sa?project=default',
	server_url: '//sensordata.open.com.cn/sa?project=imooc',
	// SDK 初始化参数配置
	heatmap: {
		//是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
		//需要 Web JS SDK 版本号大于 1.7
		clickmap:'default'
	},
	show_log: false, // 关闭控制台输出信息
});
zhuge.registerPage({
	current_url: location.href,
	referrer: document.referrer,
	channel_id: 100600,
	Platform: 'web',
});
zhuge.quick('autoTrack');