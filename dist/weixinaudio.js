/**
 * 仿造微信文章页的播放器插件
 * html : <audio preload="true" src="{$info.music}" data-title="播放音频" data-source="{$info.music_name}"> </audio>
 * js : $("audio").weixinaudio()
 * @author 晓风 <215628355@qq.com>
 */
(function ($) {

    $.fn.extend({
		weixinaudio:function(object){
			object = typeof object == "object"  ? object : {}
			var audio = $(this).get(0);
			var audioplayer = $('<div class="audio_area" />');
			var audioWrapper = $('<div class="audio_wrp" preload="true"></div>')
			
			var pButton = $('<div class="audio_play_area play" ></div>')
			var playIcon =  $('<i class="icon_audio_default "></i>')
			var playingIcon =  $('<i class="icon_audio_playing "></i>')
			
		    var playLength = $('<div class="audio_length tips_global ">00:00</div>')
			
			var audioInfo = $('<div class="audio_info_area ">')
			var audioTitle= $('<strong class="audio_title "></strong>')
			var audioSource= $('<div class="audio_source tips_global "></div>')
			
			var playhead = $('<div class="playhead" ></div>')
		    var timeline = $('<div class="progress_bar" ></div>')
			
			
			var title = object.title ? object.title  : ($(this).data('title') || "音频标题");
			var source = object.source ? object.source  : ($(this).data('source') || "音频来源");
			
			audioTitle.html(title)
			audioSource.html(source)
			
			pButton.append(playIcon)
			pButton.append(playingIcon)
			audioWrapper.append(pButton)
			
			audioWrapper.append(playLength)
			
			audioInfo.append(audioTitle)
			audioInfo.append(audioSource)
			audioWrapper.append(audioInfo)
			
			timeline.append(playhead)
			audioWrapper.append(timeline)
			
			audioplayer.append(audioWrapper)
			
			$(this).after(audioplayer);

		  console.log('player init');
	
		  audioWrapper = audioWrapper.get(0); // audio interface
		  pButton = pButton.get(0); // play button
		  playhead = playhead.get(0);
		  timeline = timeline.get(0);
		  playLength = playLength.get(0);
		  playIcon = playIcon.get(0);
		  playingIcon = playingIcon.get(0);
		  
		  var duration; // Duration of audio clip
		
		  // timeline width adjusted for playhead
		  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
	

		  audioWrapper.addEventListener("click", function () {
			play();
		  }, false);

		  // timeupdate event listener
		  audio.addEventListener("timeupdate", timeUpdate, false);

		  //Makes timeline clickable
		  timeline.addEventListener("click", function (event) {
			// moveplayhead(event);
			// audio.currentTime = duration * clickPercent(event);
		  }, false);

		  // returns click as decimal (.77) of the total timelineWidth
		  function clickPercent(e) {
			return (e.pageX - timeline.offsetLeft) / timelineWidth;
		  }

		  // Makes playhead draggable
		  playhead.addEventListener('mousedown', mouseDown, false);
		  window.addEventListener('mouseup', mouseUp, false);

		  // Boolean value so that mouse is moved on mouseUp only when the playhead is released
		  var onplayhead = false;
		  // mouseDown EventListener
		  function mouseDown() {
			onplayhead = true;
			window.addEventListener('mousemove', moveplayhead, true);
			audio.removeEventListener('timeupdate', timeUpdate, false);
		  }

		  // mouseUp EventListener
		  // getting input from all mouse clicks
		  function mouseUp(e) {
			if (onplayhead === true) {
			  moveplayhead(e);
			  window.removeEventListener('mousemove', moveplayhead, true);
			  // change current time
			  audio.currentTime = duration * clickPercent(e);
			  audio.addEventListener('timeupdate', timeUpdate, false);
			}
			onplayhead = false;
		  }

		  // mousemove EventListener
		  // Moves playhead as user drags
		  function moveplayhead(e) {
			var newMargLeft = e.pageX - timeline.offsetLeft;
			if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
			  playhead.style.marginLeft = newMargLeft + "px";
			}
			if (newMargLeft < 0) {
			  playhead.style.marginLeft = "0px";
			}
			if (newMargLeft > timelineWidth) {
			  playhead.style.marginLeft = timelineWidth + "px";
			}
		  }

		  // timeUpdate
		  // Synchronizes playhead position with current point in audio
		  function timeUpdate() {
			var playPercent = timelineWidth * (audio.currentTime / duration);
			playhead.style.width = playPercent + "px";
			if (audio.currentTime == duration) {
			  playIcon.style.display = "inline-block";
			  playingIcon.style.display = "none";
			}
		  }

		  //Play and Pause
		  function play() {
			// start audio
			if (audio.paused) {
			  audio.play();
			  // toggle icons display
			  playIcon.style.display = "none";
			  playingIcon.style.display = "inline-block";
			} else { // pause audio
			  audio.pause();
			  playIcon.style.display = "inline-block";
			  playingIcon.style.display = "none";
			}
		  }

		  // Gets audio file duration
		  audio.addEventListener("canplaythrough", function () {
			duration = audio.duration;
			playLength.textContent = timeFormat(Math.floor(duration));
		  }, false);

		  // when audio stop
		  audio.addEventListener("ended", function () {
			playIcon.style.display = "inline-block";
			playingIcon.style.display = "none";
		  }, false);

		  function timeFormat(timestamp) {
			var date = new Date(parseInt(timestamp) * 1000);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minite = date.getMinutes();
			var second = date.getSeconds();
			return minite + ":" + second;
		  }
	  }

    });
  })(jQuery)