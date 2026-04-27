// 西湖窗景诗词小程序 - 主逻辑
const data = require('./data.js');

// 白噪音音频地址
const AUDIO_SRC = 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3';

Page({
  data: {
    // 状态
    mode: 'now',
    loading: true,
    loadingText: '正在获取西湖实况天气...',
    bgLoaded: false,
    
    // 时钟
    clockTime: '--:--:--',
    clockDate: '正在获取时间...',
    
    // 天气
    weather: 'sunny',
    weatherIcon: '☀️',
    weatherDesc: '正在获取天气...',
    temp: null,
    
    // 背景
    bgUrl: '',
    imgCredit: '',
    
    // 诗词
    poemVisible: false,
    poemLines: [],
    poemSig: '',
    contextTag: '',
    poemEmotion: '',
    poemEmotionDesc: '',
    poemElements: [],
    
    // 音频
    isPlaying: false,
    audioSrc: AUDIO_SRC,
    
    // 天气特效
    snowflakes: [],
    
    // 我的·西湖 状态
    myState: {
      season: 'spring',
      period: 'dawn',
      weather: 'sunny'
    },
    seasons: [
      {label: '春', value: 'spring'},
      {label: '夏', value: 'summer'},
      {label: '秋', value: 'autumn'},
      {label: '冬', value: 'winter'}
    ],
    periods: [
      {label: '晨', value: 'dawn'},
      {label: '日', value: 'day'},
      {label: '暮', value: 'dusk'},
      {label: '夜', value: 'night'}
    ],
    weathers: [
      {label: '晴', value: 'sunny'},
      {label: '雨', value: 'rain'},
      {label: '雪', value: 'snow'},
      {label: '雾', value: 'fog'},
      {label: '多云', value: 'cloudy'}
    ]
  },

  // 音频上下文
  audioContext: null,
  rainContext: null,
  rainAnimation: null,
  clockTimer: null,
  poemTimer: null,

  onLoad() {
    this.initClock();
    this.initAudio();
    this.fetchWeatherAndInit();
  },

  onUnload() {
    this.clearTimers();
    if(this.audioContext) {
      this.audioContext.destroy();
    }
  },

  // ═══ 初始化 ═══
  initClock() {
    this.updateClock();
    this.clockTimer = setInterval(() => this.updateClock(), 1000);
  },

  updateClock() {
    const n = new Date();
    const time = [n.getHours(), n.getMinutes(), n.getSeconds()]
      .map(v => String(v).padStart(2, '0')).join(':');
    const date = `${n.getFullYear()}年${n.getMonth()+1}月${n.getDate()}日 星期${data.WEEK[n.getDay()]}`;
    this.setData({ clockTime: time, clockDate: date });
  },

  initAudio() {
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.src = AUDIO_SRC;
    this.audioContext.loop = true;
    this.audioContext.volume = 0.35;
  },

  clearTimers() {
    if(this.clockTimer) clearInterval(this.clockTimer);
    if(this.poemTimer) clearTimeout(this.poemTimer);
    if(this.rainAnimation) cancelAnimationFrame(this.rainAnimation);
  },

  // ═══ 天气获取 ═══
  async fetchWeatherAndInit() {
    this.setData({ 
      loading: true, 
      loadingText: '正在获取西湖实况天气...' 
    });

    const now = new Date();
    const season = data.getSeason(now.getMonth() + 1);
    const period = data.getPeriod(now.getHours());
    
    let weatherCat = 'sunny', weatherLabel = '晴', weatherIcon = '☀️', tempStr = '';

    try {
      const res = await wx.request({
        url: 'https://api.open-meteo.com/v1/forecast?latitude=30.25&longitude=120.16&current_weather=true&timezone=Asia%2FShanghai',
        timeout: 6000
      });
      
      if(res.statusCode === 200 && res.data) {
        const cw = res.data.current_weather;
        const decoded = data.decodeWMO(cw.weathercode, cw.is_day);
        weatherCat = decoded.cat;
        weatherLabel = decoded.label;
        weatherIcon = decoded.icon;
        tempStr = Math.round(cw.temperature) + '';
        
        this.setData({ 
          loadingText: `西湖实况：${weatherLabel} ${tempStr}℃ · 自动匹配诗词中...` 
        });
      } else {
        throw new Error('API error');
      }
    } catch(e) {
      // 根据季节推算
      weatherCat = season === 'winter' ? 'sunny' : 
                   season === 'spring' ? (Math.random() < 0.4 ? 'rain' : 'sunny') :
                   Math.random() < 0.3 ? 'rain' : 'sunny';
      weatherLabel = data.WEATHER_CN[weatherCat];
      weatherIcon = weatherCat === 'rain' ? '🌧️' : weatherCat === 'snow' ? '❄️' : '☀️';
      
      this.setData({ 
        loadingText: '天气获取失败，已根据季节推算 · ' + weatherLabel 
      });
    }

    this.setData({
      weather: weatherCat,
      weatherIcon: weatherIcon,
      weatherDesc: '西湖·' + weatherLabel,
      temp: tempStr
    });

    // 应用天气特效
    this.applyWeatherFX(weatherCat);
    
    // 选择背景
    const bg = data.chooseBg(season, period, weatherCat);
    this.loadBgImage(bg);
    
    // 显示诗词
    setTimeout(() => {
      this.showPoem(season, period, weatherCat, tempStr);
      this.setData({ loading: false });
    }, 1200);
  },

  // ═══ 背景图加载 ═══
  loadBgImage(bgInfo) {
    this.setData({ 
      bgUrl: bgInfo.url,
      imgCredit: bgInfo.desc + ' · ' + (bgInfo.credit || 'Unsplash')
    });
  },

  onBgLoad() {
    this.setData({ bgLoaded: true });
  },

  // ═══ 天气特效 ═══
  applyWeatherFX(cat) {
    // 清除之前的特效
    if(this.rainAnimation) {
      cancelAnimationFrame(this.rainAnimation);
      this.rainAnimation = null;
    }
    
    // 雪花
    if(cat === 'snow') {
      this.createSnow();
    } else {
      this.setData({ snowflakes: [] });
    }
    
    // 雨滴
    if(cat === 'rain') {
      this.initRain();
    }
  },

  createSnow() {
    const flakes = [];
    for(let i = 0; i < 30; i++) {
      flakes.push({
        style: `left:${Math.random() * 100}vw;font-size:${Math.random() * 14 + 7}px;animation-duration:${Math.random() * 6 + 4}s;animation-delay:${Math.random() * 6}s;opacity:${Math.random() * 0.55 + 0.2}`
      });
    }
    this.setData({ snowflakes: flakes });
  },

  initRain() {
    const query = wx.createSelectorQuery();
    query.select('#rainCanvas').fields({ node: true, size: true }).exec((res) => {
      if(!res[0]) return;
      
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      const width = res[0].width;
      const height = res[0].height;
      
      canvas.width = width;
      canvas.height = height;
      
      const drops = Array.from({length: 150}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        len: Math.random() * 20 + 10,
        speed: Math.random() * 6 + 8,
        alpha: Math.random() * 0.3 + 0.15
      }));
      
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1;
        
        drops.forEach(d => {
          ctx.save();
          ctx.globalAlpha = d.alpha;
          ctx.strokeStyle = 'rgba(170,195,215,.7)';
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.len * 0.1, d.y + d.len);
          ctx.stroke();
          ctx.restore();
          
          d.y += d.speed;
          if(d.y > height) {
            d.y = -d.len;
            d.x = Math.random() * width;
          }
        });
        
        this.rainAnimation = requestAnimationFrame(draw);
      };
      
      draw();
    });
  },

  // ═══ 诗词展示 ═══
  showPoem(season, period, weather, temp) {
    if(this.poemTimer) clearTimeout(this.poemTimer);
    this.setData({ poemVisible: false });
    
    setTimeout(() => {
      const poem = data.pickPoem(season, period, weather);
      const lines = poem.text.split('\n');
      const sig = poem.source === 'AI 即兴' 
        ? '——AI · 今日窗景' 
        : `——${poem.dynasty} · ${poem.author}`;
      
      const contextTag = `${data.SEASON_CN[season]} · ${data.PERIOD_CN[period]} · ${data.WEATHER_CN[weather]}${temp ? '  ' + temp + '℃' : ''}`;
      
      // 获取情感信息
      const emotionInfo = data.getEmotionDesc(poem.emotion);
      const emotionDesc = emotionInfo ? emotionInfo.desc : '';
      
      this.setData({
        poemLines: lines,
        poemSig: sig,
        contextTag: contextTag,
        poemEmotion: poem.emotionCN || '',
        poemEmotionDesc: emotionDesc,
        poemElements: poem.elements || [],
        poemVisible: true
      });
      
      this.poemTimer = setTimeout(() => {
        this.setData({ poemVisible: false });
      }, 10000);
    }, 600);
  },

  // ═══ 音频控制 ═══
  toggleAudio() {
    if(this.data.isPlaying) {
      this.audioContext.pause();
      this.setData({ isPlaying: false });
    } else {
      this.audioContext.play();
      this.setData({ isPlaying: true });
    }
  },

  // ═══ 模式切换 ═══
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ mode });
    
    if(mode === 'now') {
      this.fetchWeatherAndInit();
    } else {
      this.triggerMyShow();
    }
  },

  // ═══ 我的·西湖 控制 ═══
  selectSeason(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ 'myState.season': value });
    this.triggerMyShow();
  },

  selectPeriod(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ 'myState.period': value });
    this.triggerMyShow();
  },

  selectWeather(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ 'myState.weather': value });
    this.triggerMyShow();
  },

  randomSelect() {
    const ss = ['spring', 'summer', 'autumn', 'winter'];
    const pp = ['dawn', 'day', 'dusk', 'night'];
    const ww = ['sunny', 'rain', 'snow', 'fog', 'cloudy'];
    
    this.setData({
      'myState.season': data.pick(ss),
      'myState.period': data.pick(pp),
      'myState.weather': data.pick(ww)
    });
    
    this.triggerMyShow();
  },

  triggerMyShow() {
    const { season, period, weather } = this.data.myState;
    
    this.applyWeatherFX(weather);
    
    const bg = data.chooseBg(season, period, weather);
    this.loadBgImage(bg);
    
    this.setData({
      weather: weather,
      weatherIcon: weather === 'rain' ? '🌧️' : weather === 'snow' ? '❄️' : weather === 'fog' ? '🌫️' : weather === 'cloudy' ? '☁️' : '☀️',
      weatherDesc: '西湖·' + data.WEATHER_CN[weather]
    });
    
    setTimeout(() => {
      this.showPoem(season, period, weather, null);
    }, 1000);
  },

  // 下拉刷新
  onPullDownRefresh() {
    if(this.data.mode === 'now') {
      this.fetchWeatherAndInit().then(() => {
        wx.stopPullDownRefresh();
      });
    } else {
      wx.stopPullDownRefresh();
    }
  }
});
