# weixinaudio


在你的文章页，插入一个播放器，就像微信文章页一样

实例代码

HTML：

```html
	<audio preload="true" src="test.mp3" data-title="播放音频" data-source="音频描述"> </audio>
	<script src="src/jquery.min.js"></script>
	<script src="disc/weixinaudio.js"></script>
	<link rel="stylesheet" href="disc/weixinaudio.css">
	<script>
	  $("audio").weixinaudio()
	</script>
```