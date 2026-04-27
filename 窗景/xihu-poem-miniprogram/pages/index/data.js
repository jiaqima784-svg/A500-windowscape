// 诗词数据模块 - 情感维度增强版

// 情感维度定义
const EMOTIONS = {
  serene:    { name: "宁静", desc: "平和安宁，心如止水" },
  longing:   { name: "思念", desc: "对远方或过往的眷恋" },
  joyful:    { name: "欣喜", desc: "愉悦欢快，心旷神怡" },
  lonely:    { name: "孤寂", desc: "独处时的淡淡惆怅" },
  nostalgic: { name: "怀旧", desc: "对往昔的温柔追忆" },
  peaceful:  { name: "恬淡", desc: "闲适自在，超然物外" },
  melancholy:{ name: "幽思", desc: "深沉的思索与感慨" },
  hopeful:   { name: "希冀", desc: "对未来的美好期盼" },
  wistful:   { name: "怅惘", desc: "若有所失的淡淡忧伤" },
  tranquil:  { name: "清幽", desc: "清净幽远，远离尘嚣" }
};

// 名人诗词库 - 保留经典，增加情感标签
const CLASSIC = [
  // 春 - 欣喜、宁静
  {id:"c01",s:"spring",p:"dawn",w:"sunny", text:"乱花渐欲迷人眼\n浅草才能没马蹄", author:"白居易",dynasty:"唐",theme:"春花浅草",emotion:"joyful"},
  {id:"c02",s:"spring",p:"day", w:"sunny", text:"最爱湖东行不足\n绿杨阴里白沙堤", author:"白居易",dynasty:"唐",theme:"绿杨白沙",emotion:"joyful"},
  {id:"c03",s:"spring",p:"dusk",w:"sunny", text:"孤山寺北贾亭西\n水面初平云脚低", author:"白居易",dynasty:"唐",theme:"孤山云水",emotion:"serene"},
  {id:"c04",s:"spring",p:"day", w:"rain",  text:"水光潋滟晴方好\n山色空濛雨亦奇", author:"苏轼",dynasty:"宋",theme:"晴雨双绝",emotion:"joyful"},
  {id:"c05",s:"spring",p:"night",w:"rain", text:"小楼一夜听春雨\n深巷明朝卖杏花", author:"陆游",dynasty:"宋",theme:"春雨杏花",emotion:"peaceful"},
  {id:"c06",s:"spring",p:"night",w:"sunny", text:"春色满园关不住\n一枝红杏出墙来", author:"叶绍翁",dynasty:"宋",theme:"红杏出墙",emotion:"hopeful"},
  {id:"c07",s:"spring",p:"dawn",w:"fog",   text:"烟笼寒水月笼沙\n夜泊秦淮近酒家", author:"杜牧",dynasty:"唐",theme:"烟笼寒水",emotion:"melancholy"},
  {id:"c08",s:"spring",p:"dusk",w:"rain",  text:"沾衣欲湿杏花雨\n吹面不寒杨柳风", author:"志南",dynasty:"宋",theme:"杏雨杨柳",emotion:"joyful"},
  // 夏 - 恬淡、清幽
  {id:"c09",s:"summer",p:"day", w:"rain",  text:"黑云翻墨未遮山\n白雨跳珠乱入船", author:"苏轼",dynasty:"宋",theme:"暴雨跳珠",emotion:"joyful"},
  {id:"c10",s:"summer",p:"day", w:"sunny", text:"接天莲叶无穷碧\n映日荷花别样红", author:"杨万里",dynasty:"宋",theme:"莲叶荷花",emotion:"joyful"},
  {id:"c11",s:"summer",p:"night",w:"sunny",text:"明月别枝惊鹊\n清风半夜鸣蝉",   author:"辛弃疾",dynasty:"宋",theme:"明月鸣蝉",emotion:"peaceful"},
  {id:"c12",s:"summer",p:"dawn",w:"sunny", text:"荷风送香气\n竹露滴清响",       author:"孟浩然",dynasty:"唐",theme:"荷风竹露",emotion:"tranquil"},
  {id:"c13",s:"summer",p:"night",w:"rain", text:"七八个星天外\n两三点雨山前",   author:"辛弃疾",dynasty:"宋",theme:"星雨山前",emotion:"peaceful"},
  {id:"c14",s:"summer",p:"dusk",w:"sunny", text:"毕竟六月中\n风光不与四时同", author:"杨万里",dynasty:"宋",theme:"六月风光",emotion:"joyful"},
  // 秋 - 怀旧、怅惘
  {id:"c15",s:"autumn",p:"day", w:"sunny", text:"停车坐爱枫林晚\n霜叶红于二月花", author:"杜牧",dynasty:"唐",theme:"霜叶红枫",emotion:"joyful"},
  {id:"c16",s:"autumn",p:"night",w:"sunny",text:"举头望明月\n低头思故乡",       author:"李白",dynasty:"唐",theme:"明月思乡",emotion:"longing"},
  {id:"c17",s:"autumn",p:"dawn",w:"fog",   text:"湖光秋月两相和\n潭面无风镜未磨", author:"刘禹锡",dynasty:"唐",theme:"湖光秋月",emotion:"serene"},
  {id:"c18",s:"autumn",p:"dusk",w:"sunny", text:"夕阳西下\n断肠人在天涯",       author:"马致远",dynasty:"元",theme:"夕阳天涯",emotion:"wistful"},
  {id:"c19",s:"autumn",p:"day", w:"rain",  text:"自古逢秋悲寂寥\n我言秋日胜春朝", author:"刘禹锡",dynasty:"唐",theme:"秋日胜春",emotion:"hopeful"},
  {id:"c20",s:"autumn",p:"night",w:"rain", text:"秋雨秋风愁煞人\n寒宵独坐心如捣", author:"陶澹人",dynasty:"清",theme:"秋风愁人",emotion:"melancholy"},
  // 冬 - 孤寂、清幽
  {id:"c21",s:"winter",p:"dawn",w:"snow",  text:"晨起开门雪满山\n雪晴云淡日光寒", author:"郑燮",dynasty:"清",theme:"雪满寒山",emotion:"lonely"},
  {id:"c22",s:"winter",p:"night",w:"snow",  text:"忽如一夜春风来\n千树万树梨花开", author:"岑参",dynasty:"唐",theme:"梨花飞雪",emotion:"joyful"},
  {id:"c23",s:"winter",p:"day", w:"sunny", text:"千山鸟飞绝\n万径人踪灭",       author:"柳宗元",dynasty:"唐",theme:"千山鸟绝",emotion:"lonely"},
  {id:"c24",s:"winter",p:"dusk",w:"snow",  text:"柴门闻犬吠\n风雪夜归人",       author:"刘长卿",dynasty:"唐",theme:"风雪归人",emotion:"nostalgic"},
  {id:"c25",s:"winter",p:"night",w:"fog",   text:"日暮苍山远\n天寒白屋贫",       author:"刘长卿",dynasty:"唐",theme:"苍山白屋",emotion:"lonely"},
  {id:"c26",s:"winter",p:"day", w:"snow",  text:"墙角数枝梅\n凌寒独自开",       author:"王安石",dynasty:"宋",theme:"寒梅凌雪",emotion:"hopeful"},
  // 通用
  {id:"c27",s:"any",p:"any",w:"any", text:"欲把比西子\n淡妆浓抹总相宜",     author:"苏轼",dynasty:"宋",theme:"西子比湖",emotion:"joyful"},
  {id:"c28",s:"any",p:"any",w:"any", text:"山外青山楼外楼\n歌舞几时休",     author:"林升",dynasty:"宋",theme:"青山楼外",emotion:"melancholy"},
];

// AI 生成诗词库 - 情感维度增强，减少"西湖"直接出现
// 通过元素、意境、典故来暗示地点，而非直呼其名
const AI_TPL = {
  // ===== 春 =====
  "spring-dawn-sunny": [
    {text:"晓日三潭浮碎影\n苏堤新柳拂长空\n一篙春水连天碧\n几处黄莺啭晓风", theme:"三潭柳风",emotion:"serene",elements:["三潭","苏堤","春水","黄莺"]},
    {text:"晨光乍破映孤山\n白鹤梳翎水雾间\n露重桃花红欲滴\n扁舟一叶过前湾", theme:"白鹤桃花",emotion:"peaceful",elements:["孤山","白鹤","桃花","扁舟"]},
    {text:"晓风拂面柳丝长\n塔影依稀入渺茫\n谁把春光揉作水\n半篙新绿半篙香", theme:"塔影春光",emotion:"joyful",elements:["塔影","柳丝","春光","新绿"]},
    {text:"远山如黛晓烟轻\n几处早莺争树鸣\n一棹划开波上日\n满船载得落花行", theme:"远山早莺",emotion:"joyful",elements:["远山","早莺","波上日","落花"]},
  ],
  "spring-day-sunny": [
    {text:"暖日波影长\n长堤十里杏花香\n游人策马过桥去\n惊起鸳鸯逐浪忙", theme:"杏花鸳鸯",emotion:"joyful",elements:["波影","长堤","杏花","鸳鸯"]},
    {text:"水上春风吹客衣\n断桥遥望柳依依\n碧波深处歌声起\n一叶扁舟载落晖", theme:"断桥扁舟",emotion:"peaceful",elements:["春风","断桥","碧波","扁舟"]},
    {text:"画桥烟柳绿参差\n十里香风入酒旗\n最是春光留不住\n满溪红雨落涟漪", theme:"画桥烟柳",emotion:"nostalgic",elements:["画桥","烟柳","香风","红雨"]},
    {text:"踏青人去马蹄轻\n芳草萋萋绿满汀\n一片花飞春意闹\n谁家箫管隔林鸣", theme:"踏青芳草",emotion:"joyful",elements:["马蹄","芳草","花飞","箫管"]},
  ],
  "spring-dusk-sunny": [
    {text:"暮色雷峰塔影斜\n苏堤归鸟入云霞\n长桥一望春光尽\n独倚阑干看落花", theme:"雷峰落花",emotion:"wistful",elements:["雷峰","苏堤","归鸟","落花"]},
    {text:"夕阳衔尽北高峰\n水面金波万点红\n画舫归时歌韵远\n柳丝轻飏暮烟中", theme:"金波画舫",emotion:"serene",elements:["北高峰","金波","画舫","柳丝"]},
    {text:"晚照斜穿万柳丝\n归鸦点点入云迟\n春光欲尽人未醉\n独坐桥边看落晖", theme:"晚照归鸦",emotion:"melancholy",elements:["晚照","柳丝","归鸦","落晖"]},
    {text:"一抹残阳半入波\n渔歌渐远水天和\n落花风里人归去\n独剩空山响薜萝", theme:"残阳渔歌",emotion:"lonely",elements:["残阳","渔歌","落花","空山"]},
  ],
  "spring-night-sunny": [
    {text:"月映三潭印不圆\n湖心亭外晚风前\n柳阴深处谁家笛\n吹落春花入水眠", theme:"三潭月笛",emotion:"tranquil",elements:["三潭","湖心亭","柳阴","春花"]},
    {text:"夜静水似天\n灯火映波寒\n蛙声一片随舟去\n春梦依稀到枕边", theme:"夜静蛙声",emotion:"peaceful",elements:["水天","灯火","蛙声","春梦"]},
    {text:"玉轮高挂柳梢头\n十里清光一鉴浮\n何处箫声吹彻夜\n落花飞上木兰舟", theme:"玉轮箫声",emotion:"nostalgic",elements:["玉轮","柳梢","清光","箫声"]},
    {text:"更深露重夜微凉\n塔影沉沉入渺茫\n独坐舟中人不寐\n一帘花月一帘香", theme:"塔影花月",emotion:"lonely",elements:["露重","塔影","花月","夜凉"]},
  ],
  "spring-dawn-rain": [
    {text:"晓雨如丝湿画檐\n春水碧于蓝\n落花铺尽长堤路\n一叶扁舟过远山", theme:"晓雨落花",emotion:"melancholy",elements:["晓雨","画檐","春水","落花"]},
    {text:"晨来细雨过孤山\n荷叶珍珠颗颗圆\n水阔桥低烟树暗\n莺啼声里柳含烟", theme:"孤山晨雨",emotion:"serene",elements:["孤山","荷叶","烟树","莺啼"]},
    {text:"轻寒恻恻透窗纱\n细雨如丝织晓霞\n燕子不归春欲暮\n一庭红雨落梨花", theme:"轻寒细雨",emotion:"wistful",elements:["轻寒","细雨","燕子","红雨"]},
    {text:"晓窗听雨梦初惊\n点滴声中春意生\n忽忆去年携手处\n一桥烟雨一桥情", theme:"晓窗听雨",emotion:"longing",elements:["晓窗","春雨","烟雨","旧忆"]},
  ],
  "spring-day-rain": [
    {text:"烟雨画不如\n烟柳碧模糊\n游人半避垂杨下\n听取黄鹂隔岸呼", theme:"烟雨画桥",emotion:"peaceful",elements:["烟雨","烟柳","垂杨","黄鹂"]},
    {text:"春来水上雨纷纷\n塔影入波云\n伞底桃花红胜火\n青苔铺满石阶痕", theme:"伞底桃花",emotion:"joyful",elements:["春雨","塔影","桃花","青苔"]},
    {text:"轻烟细雨湿春衣\n桥外桃花半欲飞\n独立苍茫人不识\n一篙春水一蓑归", theme:"轻烟春衣",emotion:"lonely",elements:["轻烟","细雨","桃花","春水"]},
    {text:"雨丝风片近清明\n柳色如烟水色青\n最是江南好风景\落花时节又逢君", theme:"雨丝风片",emotion:"nostalgic",elements:["雨丝","柳色","落花","江南"]},
  ],
  "spring-dusk-rain": [
    {text:"暮雨潇潇打画船\n灯火雨中寒\n归人踏尽长桥路\n柳絮飞时水色宽", theme:"暮雨画船",emotion:"wistful",elements:["暮雨","画船","灯火","柳絮"]},
    {text:"黄昏雨急过苏堤\n水面波纹似画齐\n隔岸钟声随风远\n一城灯火入长迷", theme:"暮钟苏堤",emotion:"serene",elements:["黄昏","苏堤","钟声","灯火"]},
    {text:"晚来风雨打窗棂\n落尽残红水满汀\n欲问春光归何处\n一川烟草一川青", theme:"晚来风雨",emotion:"melancholy",elements:["风雨","残红","春光","烟草"]},
    {text:"雨歇黄昏燕子低\n湿云低压柳丝垂\n谁家玉笛吹杨柳\n散入春风满客衣", theme:"雨歇黄昏",emotion:"longing",elements:["黄昏","燕子","玉笛","春风"]},
  ],
  "spring-night-rain": [
    {text:"春夜湖心听雨眠\n梦回三潭柳如烟\n推窗只见波光碎\n灯影随舟过断桥", theme:"湖心听雨",emotion:"peaceful",elements:["春夜","三潭","柳烟","灯影"]},
    {text:"夜雨敲窗到五更\n水涨柳低横\n蛙声一片连天远\n唯有渔灯照水明", theme:"夜雨渔灯",emotion:"serene",elements:["夜雨","春水","蛙声","渔灯"]},
    {text:"更深谁遣雨丝斜\n滴碎空阶旧梦华\n独坐听残春夜雨\n一帘幽思落灯花", theme:"更深雨丝",emotion:"lonely",elements:["夜雨","空阶","春夜","幽思"]},
    {text:"雨声如诉夜如年\n点滴声中忆旧缘\n惆怅东风吹不尽\n一窗春雨一窗烟", theme:"雨声如诉",emotion:"nostalgic",elements:["雨声","东风","春雨","惆怅"]},
  ],
  "spring-dawn-fog": [
    {text:"晨雾重重锁断桥\n不见水平高\n只闻桨橹声声近\n一盏孤灯出柳条", theme:"晨雾断桥",emotion:"tranquil",elements:["晨雾","断桥","桨橹","孤灯"]},
    {text:"晓雾轻笼白堤头\n孤山隐约水悠悠\n三潭塔影空相望\n唯有黄鹂啭不休", theme:"雾笼白堤",emotion:"serene",elements:["晓雾","白堤","孤山","黄鹂"]},
    {text:"烟岚初散晓光微\n柳色依稀燕子飞\n何处钟声来远寺\n一舟撑破雾中归", theme:"烟岚晓光",emotion:"peaceful",elements:["烟岚","柳色","钟声","雾中"]},
    {text:"雾锁长堤晓色昏\n桃花一树隐柴门\n渔郎不识来时路\n误入仙源欲断魂", theme:"雾锁长堤",emotion:"wistful",elements:["雾锁","长堤","桃花","仙源"]},
  ],
  "spring-day-fog": [
    {text:"雾锁画不如\n亭台楼阁半模糊\n游船过处波纹起\n两岸桃花红尚孤", theme:"雾锁桃花",emotion:"serene",elements:["雾锁","亭台","游船","桃花"]},
    {text:"半日烟波半日晴\n春色雾中明\n行人衣上沾花气\n不觉长堤步已轻", theme:"烟波花气",emotion:"joyful",elements:["烟波","春色","花气","长堤"]},
    {text:"轻烟漠漠雨霏霏\n柳色依稀燕子归\n独倚画桥人不识\n一川烟草一川晖", theme:"轻烟漠漠",emotion:"lonely",elements:["轻烟","柳色","画桥","烟草"]},
    {text:"雾重云深春昼长\n桃花流水两茫茫\n渔郎去后无消息\n独剩空山响石梁", theme:"雾重云深",emotion:"nostalgic",elements:["雾重","桃花","流水","空山"]},
  ],
  "spring-dusk-fog": [
    {text:"暮霭沉沉压断桥\n灯火渐萧萧\n烟笼苏堤人归去\n唯有钟声隔水飘", theme:"暮霭钟声",emotion:"melancholy",elements:["暮霭","断桥","苏堤","钟声"]},
    {text:"黄昏雾起白堤头\n塔影迷茫水色秋\n一叶归舟何处去\n远山渐没晚烟浮", theme:"黄昏归舟",emotion:"wistful",elements:["黄昏","雾起","塔影","归舟"]},
    {text:"晚烟笼柳色\n归鸟入云低\n欲问春光何处去\n一溪流水一溪泥", theme:"晚烟归鸟",emotion:"nostalgic",elements:["晚烟","柳色","归鸟","流水"]},
    {text:"雾锁黄昏燕子归\n落花风里暮钟微\n独坐桥边看水去\n一川烟草伴斜晖", theme:"雾锁黄昏",emotion:"lonely",elements:["雾锁","落花","暮钟","斜晖"]},
  ],
  "spring-night-fog": [
    {text:"春夜浓雾锁\n月隐灯微影不孤\n远处三潭钟一响\n隔水犹闻叫鹧鸪", theme:"雾夜三潭",emotion:"tranquil",elements:["春夜","浓雾","三潭","鹧鸪"]},
    {text:"雾满夜色深\n灯火半遮阴\n蛙声隐隐芦花动\n独倚阑干听水音", theme:"雾夜蛙声",emotion:"serene",elements:["雾满","灯火","蛙声","芦花"]},
    {text:"夜深雾重月无痕\n塔影依稀入梦魂\n独坐舟中人未寐\n一帘幽思一帘春", theme:"夜深雾重",emotion:"lonely",elements:["夜深","雾重","塔影","幽思"]},
    {text:"烟笼寒水夜笼纱\n何处箫声隔落花\n惆怅东风吹不尽\n一窗明月一窗涯", theme:"烟笼寒水",emotion:"melancholy",elements:["烟笼","寒水","箫声","明月"]},
  ],
  "spring-day-cloudy": [
    {text:"半晴半阴春日好\n波细柳风柔\n白云一朵飞来处\n倒影入湖映小舟", theme:"白云小舟",emotion:"peaceful",elements:["春日","柳风","白云","小舟"]},
    {text:"春云片片过孤山\n水面光阴暗又明\n不辨游鱼何处去\n柳阴深处听潺湲", theme:"春云孤山",emotion:"serene",elements:["春云","孤山","游鱼","柳阴"]},
    {text:"阴晴不定柳丝长\n燕子双飞入画梁\n最是春光留不住\n一帘飞絮一帘香", theme:"阴晴柳丝",emotion:"nostalgic",elements:["阴晴","柳丝","春光","飞絮"]},
    {text:"云影天光共渺茫\n桃花一树映斜阳\n渔歌远去人归晚\n独剩空山响石梁", theme:"云影天光",emotion:"tranquil",elements:["云影","桃花","渔歌","空山"]},
  ],
  "spring-dusk-cloudy": [
    {text:"暮云低合压长堤\n水面波光渐渐低\n画舫归来歌韵歇\n数声归雁入云迷", theme:"暮云归雁",emotion:"wistful",elements:["暮云","长堤","画舫","归雁"]},
    {text:"云遮夕照暗\n暮色犹存一抹红\n苏堤人散舟横处\n唯有春涛拍岸空", theme:"云遮夕照",emotion:"melancholy",elements:["云遮","夕照","苏堤","春涛"]},
    {text:"晚云收尽暮山青\n归鸟投林各自行\n独倚阑干人不识\n一川烟草一川明", theme:"晚云归鸟",emotion:"lonely",elements:["晚云","暮山","归鸟","烟草"]},
    {text:"云破月来花弄影\n风摇柳线水浮萍\n谁家玉笛吹杨柳\n散入春风满客亭", theme:"云破月来",emotion:"peaceful",elements:["云破","月来","玉笛","春风"]},
  ],
  "spring-night-cloudy": [
    {text:"云掩春月暗\n灯火千家映水寒\n夜深不闻箫管响\n唯有蛙声到枕边", theme:"云掩春月",emotion:"tranquil",elements:["云掩","春月","灯火","蛙声"]},
    {text:"层云不散夜苍茫\n水面风来柳丝长\n独坐亭前星影淡\n一壶清茶对波光", theme:"层云清茶",emotion:"peaceful",elements:["层云","柳丝","星影","清茶"]},
    {text:"云重星稀夜色深\n塔影依稀入梦寻\n独坐舟中人未寐\n一帘幽思一帘心", theme:"云重星稀",emotion:"lonely",elements:["云重","星稀","塔影","幽思"]},
    {text:"夜深云厚月无痕\n独对寒灯忆旧恩\n惆怅东风吹不尽\n一窗春雨一窗魂", theme:"夜深云厚",emotion:"nostalgic",elements:["夜深","云厚","寒灯","东风"]},
  ],
  // ===== 夏 =====
  "summer-dawn-sunny": [
    {text:"晓日初升映断桥\n十里碧波摇\n荷风送露清香远\n白鹭一行过远霄", theme:"晓日白鹭",emotion:"joyful",elements:["晓日","碧波","荷风","白鹭"]},
    {text:"清晨露华浓\n曲院荷开映日红\n碧叶田田珠露滚\n一声蝉唱报清风", theme:"曲院露珠",emotion:"peaceful",elements:["清晨","曲院","荷开","蝉唱"]},
    {text:"晨光破晓水天清\n荷叶田田露气盈\n独立桥头人不识\n一川烟草一川明", theme:"晨光破晓",emotion:"serene",elements:["晨光","荷叶","桥头","烟草"]},
    {text:"晓风拂面柳丝长\n燕子双飞入画梁\n最是夏初好风景\n满池荷气一帘香", theme:"晓风柳丝",emotion:"joyful",elements:["晓风","柳丝","燕子","荷气"]},
  ],
  "summer-day-sunny": [
    {text:"烈日当空暑气蒸\n十里碧波凝\n曲院荷花红胜火\n清风不度断桥冰", theme:"烈日荷花",emotion:"tranquil",elements:["烈日","碧波","荷花","清风"]},
    {text:"六月水如天\n满湖荷叶碧相连\n蜻蜓立处微澜起\n一尾红鱼跃眼前", theme:"蜻蜓红鱼",emotion:"joyful",elements:["六月","荷叶","蜻蜓","红鱼"]},
    {text:"炎天暑热柳丝长\n荷气侵人午梦凉\n独坐亭中人不识\n一帘飞絮一帘香", theme:"炎天荷气",emotion:"peaceful",elements:["炎天","柳丝","荷气","午梦"]},
    {text:"日长篱落无人过\n唯有蜻蜓蛱蝶飞\n独倚阑干看水去\n满川荷气入帘帏", theme:"日长篱落",emotion:"serene",elements:["日长","蜻蜓","荷气","阑干"]},
  ],
  "summer-dusk-sunny": [
    {text:"晚霞如火映\n雷峰塔影落金炉\n渔舟唱晚归帆远\n一缕荷风到客途", theme:"晚霞雷峰",emotion:"peaceful",elements:["晚霞","雷峰","渔舟","荷风"]},
    {text:"暮色西来碧柳垂\n夕照夕阳迟\n蝉声渐远荷犹艳\n一盏灯火过桥时", theme:"暮色垂柳",emotion:"serene",elements:["暮色","碧柳","蝉声","灯火"]},
    {text:"晚照斜穿万柳丝\n归鸦点点入云迟\n夏光欲尽人未醉\n独坐桥边看落晖", theme:"晚照归鸦",emotion:"wistful",elements:["晚照","柳丝","归鸦","落晖"]},
    {text:"一抹残阳半入波\n渔歌渐远水天和\n荷花风里人归去\n独剩空山响薜萝", theme:"残阳渔歌",emotion:"lonely",elements:["残阳","渔歌","荷花","空山"]},
  ],
  "summer-night-sunny": [
    {text:"夏夜月似银\n三潭印水碧无痕\n清风一阵荷香送\n蝉韵高低伴客眠", theme:"三潭夏月",emotion:"peaceful",elements:["夏夜","三潭","荷香","蝉韵"]},
    {text:"夜静暑气消\n荷花影里听蛙跳\n蟾光似水波心碎\n一叶归舟过断桥", theme:"夜静蛙声",emotion:"tranquil",elements:["夜静","荷花","蛙跳","蟾光"]},
    {text:"玉轮高挂柳梢头\n十里清光一鉴浮\n何处箫声吹彻夜\n荷香飞上木兰舟", theme:"玉轮荷香",emotion:"nostalgic",elements:["玉轮","柳梢","清光","箫声"]},
    {text:"更深露重夜微凉\n塔影沉沉入渺茫\n独坐舟中人不寐\n一帘荷月一帘香", theme:"塔影荷月",emotion:"lonely",elements:["露重","塔影","荷月","夜凉"]},
  ],
  "summer-dawn-rain": [
    {text:"夏晓雷声到枕边\n急雨敲窗打画檐\n荷叶翻翻珠玉碎\n一梦入云烟", theme:"夏晓急雨",emotion:"peaceful",elements:["夏晓","雷声","荷叶","云烟"]},
    {text:"晨来骤雨过孤山\n水面波纹似画斑\n新荷承露千珠碎\n燕子低飞水雾间", theme:"骤雨新荷",emotion:"serene",elements:["骤雨","孤山","新荷","燕子"]},
    {text:"轻雷隐隐透窗纱\n急雨如珠打落花\n独坐听残初夏晓\n一帘荷气入帘斜", theme:"轻雷急雨",emotion:"tranquil",elements:["轻雷","急雨","初夏","荷气"]},
    {text:"晓来风雨梦初惊\n点滴声中夏意生\n忽忆去年携手处\n一桥烟雨一桥情", theme:"晓来风雨",emotion:"longing",elements:["晓来","风雨","烟雨","旧忆"]},
  ],
  "summer-day-rain": [
    {text:"暴雨倾盆过断桥\n水涨没柳条\n白雨跳珠连碧叶\n一声惊雷入九霄", theme:"暴雨断桥",emotion:"joyful",elements:["暴雨","断桥","白雨","惊雷"]},
    {text:"夏日雷声催骤雨\n浪急白鸥飞\n荷盘翻尽珍珠落\n天际彩虹垂翠微", theme:"雷雨彩虹",emotion:"joyful",elements:["夏日","雷声","荷盘","彩虹"]},
    {text:"急雨敲窗暑气收\n荷香阵阵入帘钩\n独坐听残夏日午\n一川烟草一川秋", theme:"急雨荷香",emotion:"peaceful",elements:["急雨","荷香","夏日","烟草"]},
    {text:"雨过天青水色新\n荷盘珠露滚圆匀\n渔歌远去人归晚\n独剩空山响石鳞", theme:"雨过天青",emotion:"serene",elements:["雨过","天青","荷盘","渔歌"]},
  ],
  "summer-dusk-rain": [
    {text:"黄昏暴雨压\n电闪雷鸣路欲无\n归船急渡波涛里\n岸上行人各奔途", theme:"黄昏暴风雨",emotion:"tranquil",elements:["黄昏","暴雨","归船","波涛"]},
    {text:"夏暮雷声来势狂\n雨打旧荷塘\n行人避入长桥洞\n远塔朦胧水色黄", theme:"暮雷旧荷",emotion:"serene",elements:["夏暮","雷声","长桥","远塔"]},
    {text:"晚来风雨打窗棂\n落尽残荷水满汀\n欲问夏光归何处\n一川烟草一川青", theme:"晚来风雨",emotion:"melancholy",elements:["风雨","残荷","夏光","烟草"]},
    {text:"雨歇黄昏燕子低\n湿云低压柳丝垂\n谁家玉笛吹杨柳\n散入荷风满客衣", theme:"雨歇黄昏",emotion:"longing",elements:["黄昏","燕子","玉笛","荷风"]},
  ],
  "summer-night-rain": [
    {text:"夏夜倾盆雨打窗\n水涨过堤防\n蛙鸣一片连天响\n灯火明灭在水乡", theme:"夜雨蛙鸣",emotion:"peaceful",elements:["夏夜","夜雨","蛙鸣","灯火"]},
    {text:"雷声隐隐入夜深\n雨打荷叶碎玉音\n灯火风吹灭\n独坐亭中听水吟", theme:"雷夜听水",emotion:"tranquil",elements:["雷声","夜雨","荷叶","水吟"]},
    {text:"更深谁遣雨丝斜\n滴碎空阶旧梦华\n独坐听残夏夜雨\n一帘幽思落灯花", theme:"更深雨丝",emotion:"lonely",elements:["更深","雨丝","空阶","幽思"]},
    {text:"雨声如诉夜如年\n点滴声中忆旧缘\n惆怅荷风吹不尽\n一窗夏雨一窗烟", theme:"雨声如诉",emotion:"nostalgic",elements:["雨声","荷风","夏雨","惆怅"]},
  ],
  "summer-dawn-fog": [
    {text:"晓雾如纱笼碧波\n夏晓好烟萝\n荷花半隐轻舟过\n一缕清香渡薜萝", theme:"晓雾荷花",emotion:"tranquil",elements:["晓雾","碧波","荷花","轻舟"]},
    {text:"夏晨浓雾满\n柳暗花明路不孤\n荷叶田田珠露重\n一声长啸出菰蒲", theme:"夏晨浓雾",emotion:"serene",elements:["夏晨","浓雾","荷叶","菰蒲"]},
    {text:"烟岚初散晓光微\n荷色依稀燕子飞\n何处钟声来远寺\n一舟撑破雾中归", theme:"烟岚荷色",emotion:"peaceful",elements:["烟岚","荷色","钟声","雾中"]},
    {text:"雾锁长堤晓色昏\n荷花一树隐柴门\n渔郎不识来时路\n误入仙源欲断魂", theme:"雾锁长堤",emotion:"wistful",elements:["雾锁","长堤","荷花","仙源"]},
  ],
  "summer-day-fog": [
    {text:"雾锁暑气收\n烟柳似深秋\n荷花隐约红初透\n游舫悠然过碧流", theme:"雾锁荷花",emotion:"serene",elements:["雾锁","暑气","烟柳","荷花"]},
    {text:"夏日烟波不肯开\n如梦入苍苔\n孤山寺外钟声远\n隔水犹闻莲叶来", theme:"烟波莲叶",emotion:"tranquil",elements:["夏日","烟波","孤山","莲叶"]},
    {text:"轻烟漠漠雨霏霏\n荷色依稀燕子归\n独倚画桥人不识\n一川烟草一川晖", theme:"轻烟荷色",emotion:"lonely",elements:["轻烟","荷色","画桥","烟草"]},
    {text:"雾重云深夏昼长\n荷花流水两茫茫\n渔郎去后无消息\n独剩空山响石梁", theme:"雾重云深",emotion:"nostalgic",elements:["雾重","荷花","流水","空山"]},
  ],
  "summer-dusk-fog": [
    {text:"夏暮烟波锁断桥\n湖心灯火渐萧条\n蝉声一季将归去\n唯有荷风过柳梢", theme:"暮烟荷风",emotion:"melancholy",elements:["夏暮","烟波","断桥","荷风"]},
    {text:"晚雾从湖漫上来\n雷峰塔影半遮开\n归舟一叶迷方向\n唯有渔灯照水台", theme:"晚雾归舟",emotion:"wistful",elements:["晚雾","雷峰","归舟","渔灯"]},
    {text:"晚烟笼柳色\n归鸟入云低\n欲问夏光何处去\n一溪流水一溪泥", theme:"晚烟归鸟",emotion:"nostalgic",elements:["晚烟","柳色","归鸟","流水"]},
    {text:"雾锁黄昏燕子归\n荷花风里暮钟微\n独坐桥边看水去\n一川烟草伴斜晖", theme:"雾锁黄昏",emotion:"lonely",elements:["雾锁","荷花","暮钟","斜晖"]},
  ],
  "summer-night-fog": [
    {text:"夏夜浓雾锁\n月隐星沉水模糊\n蛙声不似平常响\n远处灯明似画图", theme:"雾夜灯明",emotion:"tranquil",elements:["夏夜","浓雾","蛙声","灯明"]},
    {text:"雾重更深暑不消\n一片静悄悄\n荷塘隐隐香风送\n唯有蝉鸣透柳条", theme:"雾夜荷香",emotion:"serene",elements:["雾重","荷塘","香风","蝉鸣"]},
    {text:"夜深雾重月无痕\n塔影依稀入梦魂\n独坐舟中人未寐\n一帘幽思一帘夏", theme:"夜深雾重",emotion:"lonely",elements:["夜深","雾重","塔影","幽思"]},
    {text:"烟笼寒水夜笼纱\n何处箫声隔落花\n惆怅荷风吹不尽\n一窗明月一窗涯", theme:"烟笼寒水",emotion:"melancholy",elements:["烟笼","寒水","箫声","明月"]},
  ],
  "summer-day-cloudy": [
    {text:"云遮烈日暑微消\n碧水任逍遥\n荷花向日犹含笑\n一阵凉风过断桥", theme:"云遮荷花",emotion:"peaceful",elements:["云遮","烈日","荷花","凉风"]},
    {text:"半阴半晴夏日长\n风送藕花香\n白鸥不避游人近\n自在浮波逐浪忙", theme:"白鸥藕花",emotion:"joyful",elements:["夏日","藕花","白鸥","浮波"]},
    {text:"阴晴不定柳丝长\n燕子双飞入画梁\n最是夏光留不住\n一帘飞絮一帘香", theme:"阴晴柳丝",emotion:"nostalgic",elements:["阴晴","柳丝","夏光","飞絮"]},
    {text:"云影天光共渺茫\n荷花一树映斜阳\n渔歌远去人归晚\n独剩空山响石梁", theme:"云影天光",emotion:"tranquil",elements:["云影","荷花","渔歌","空山"]},
  ],
  "summer-dusk-cloudy": [
    {text:"暮云低压断桥东\n水面波光渐暗红\n暑气未消风已至\n归舟一叶入烟中", theme:"暮云归舟",emotion:"wistful",elements:["暮云","断桥","波光","归舟"]},
    {text:"半阴夏暮水生凉\n十里柳丝长\n蝉声渐歇荷犹艳\n灯火渐明映夕阳", theme:"夏暮柳凉",emotion:"serene",elements:["夏暮","柳丝","蝉声","灯火"]},
    {text:"晚云收尽暮山青\n归鸟投林各自行\n独倚阑干人不识\n一川烟草一川明", theme:"晚云归鸟",emotion:"lonely",elements:["晚云","暮山","归鸟","烟草"]},
    {text:"云破月来花弄影\n风摇荷线水浮萍\n谁家玉笛吹杨柳\n散入荷风满客亭", theme:"云破月来",emotion:"peaceful",elements:["云破","月来","玉笛","荷风"]},
  ],
  "summer-night-cloudy": [
    {text:"云厚星稀夏夜深\n灯火映波心\n蝉声一去无人管\n唯有荷风过客襟", theme:"云厚荷风",emotion:"tranquil",elements:["云厚","星稀","灯火","荷风"]},
    {text:"层云不散夜如漆\n水面风来暑气低\n独坐苏堤听蛙鼓\n一声柳浪过前溪", theme:"苏堤蛙鼓",emotion:"peaceful",elements:["层云","苏堤","蛙鼓","柳浪"]},
    {text:"云重星稀夜色深\n塔影依稀入梦寻\n独坐舟中人未寐\n一帘幽思一帘心", theme:"云重星稀",emotion:"lonely",elements:["云重","星稀","塔影","幽思"]},
    {text:"夜深云厚月无痕\n独对寒灯忆旧恩\n惆怅荷风吹不尽\n一窗夏雨一窗魂", theme:"夜深云厚",emotion:"nostalgic",elements:["夜深","云厚","寒灯","荷风"]},
  ],
  // ===== 秋 =====
  "autumn-dawn-sunny": [
    {text:"秋晓霜满堤\n落叶不胜栖\n一湾碧水映寒柳\n数只白鸥过远溪", theme:"秋霜白鸥",emotion:"lonely",elements:["秋晓","霜","落叶","白鸥"]},
    {text:"晨光冷照北高峰\n水面秋云似淡浓\n桂子飘香人未起\n一叶扁舟入画中", theme:"桂子扁舟",emotion:"peaceful",elements:["晨光","北高峰","桂子","扁舟"]},
    {text:"晓风拂面柳丝黄\n燕子南飞去路长\n独倚阑干人不识\n一川烟草一川霜", theme:"晓风柳黄",emotion:"wistful",elements:["晓风","柳丝","燕子","烟草"]},
    {text:"秋晓寒生露气凉\n芦花白处水茫茫\n渔歌远去人归晚\n独剩空山响石梁", theme:"秋晓芦花",emotion:"nostalgic",elements:["秋晓","芦花","渔歌","空山"]},
  ],
  "autumn-day-sunny": [
    {text:"秋高气爽水如天\n秋月映残年\n枫叶两岸红胜火\n一壶清酒对长川", theme:"平湖红枫",emotion:"joyful",elements:["秋高","秋月","枫叶","清酒"]},
    {text:"金秋十月到\n芦白枫红景不孤\n白鹭一双飞水面\n波光碎影映苍芦", theme:"芦白枫红",emotion:"joyful",elements:["金秋","芦白","枫红","白鹭"]},
    {text:"晴空一鹤排云上\n便引诗情到碧霄\n独坐亭中人不识\n满川红叶一川潮", theme:"晴空鹤影",emotion:"hopeful",elements:["晴空","鹤","诗情","红叶"]},
    {text:"日暖风和秋意浓\n桂花香里忆相逢\n独倚阑干看水去\n满川红叶一川重", theme:"日暖桂香",emotion:"nostalgic",elements:["日暖","桂香","红叶","旧忆"]},
  ],
  "autumn-dusk-sunny": [
    {text:"夕阳似火映\n秋水长天共一图\n暮色渐深鸦雀散\n孤舟独立钓寒芦", theme:"夕阳钓寒",emotion:"lonely",elements:["夕阳","秋水","孤舟","寒芦"]},
    {text:"秋暮霞光染断桥\n层林尽染火云烧\n归鸦一掠天边过\n秋风客梦遥", theme:"秋暮归鸦",emotion:"wistful",elements:["秋暮","霞光","归鸦","秋风"]},
    {text:"晚照斜穿万柳黄\n归鸦点点入云迟\n秋光欲尽人未醉\n独坐桥边看落晖", theme:"晚照归鸦",emotion:"melancholy",elements:["晚照","柳黄","归鸦","落晖"]},
    {text:"一抹残阳半入波\n渔歌渐远水天和\n芦花风里人归去\n独剩空山响薜萝", theme:"残阳渔歌",emotion:"nostalgic",elements:["残阳","渔歌","芦花","空山"]},
  ],
  "autumn-night-sunny": [
    {text:"秋月一轮明似镜\n三潭印水夜空清\n桂花香里人何在\n唯有秋风过短亭", theme:"秋月桂花",emotion:"longing",elements:["秋月","三潭","桂花","秋风"]},
    {text:"夜凉如水月华明\n水面风来桂气盈\n独倚秋色里\n一星渔火到天明", theme:"渔火秋色",emotion:"lonely",elements:["夜凉","月华","桂气","渔火"]},
    {text:"玉轮高挂柳梢头\n十里清光一鉴浮\n何处箫声吹彻夜\n桂香飞上木兰舟", theme:"玉轮桂香",emotion:"nostalgic",elements:["玉轮","柳梢","清光","箫声"]},
    {text:"更深露重夜微凉\n塔影沉沉入渺茫\n独坐舟中人未寐\n一帘秋月一帘香", theme:"塔影秋月",emotion:"lonely",elements:["露重","塔影","秋月","夜凉"]},
  ],
  "autumn-dawn-rain": [
    {text:"秋晨冷雨过孤山\n落叶纷纷不忍看\n水面涟漪千万点\n寒鸦一叫破烟鬟", theme:"秋晨冷雨",emotion:"melancholy",elements:["秋晨","孤山","落叶","寒鸦"]},
    {text:"晓雨敲窗秋意浓\n碧水映寒松\n桥上望行人少\n唯有茶烟出寺钟", theme:"晓雨寒松",emotion:"serene",elements:["晓雨","秋意","寒松","茶烟"]},
    {text:"轻寒恻恻透窗纱\n细雨如丝织晓霞\n燕子不归秋欲暮\n一庭红雨落芦花", theme:"轻寒细雨",emotion:"wistful",elements:["轻寒","细雨","燕子","红雨"]},
    {text:"晓窗听雨梦初惊\n点滴声中秋意生\n忽忆去年携手处\n一桥烟雨一桥情", theme:"晓窗听雨",emotion:"longing",elements:["晓窗","秋雨","烟雨","旧忆"]},
  ],
  "autumn-day-rain": [
    {text:"秋雨潇潇湿断桥\n红枫落尽入波消\n一色如烟墨\n独有残荷立远潮", theme:"秋雨残荷",emotion:"melancholy",elements:["秋雨","断桥","红枫","残荷"]},
    {text:"寒雨打萍秋水阔\n风急雁南飞\n长堤柳色随烟尽\n一叶归舟载夕晖", theme:"寒雨归雁",emotion:"wistful",elements:["寒雨","秋水","归雁","归舟"]},
    {text:"冷雨敲窗秋意深\n芦花飞上木兰舟\n独坐听残秋日午\n一川烟草一川愁", theme:"冷雨芦花",emotion:"lonely",elements:["冷雨","芦花","秋日","烟草"]},
    {text:"雨过天青水色新\n芦花白处见鱼鳞\n渔歌远去人归晚\n独剩空山响石津", theme:"雨过天青",emotion:"serene",elements:["雨过","天青","芦花","渔歌"]},
  ],
  "autumn-dusk-rain": [
    {text:"秋暮雨冷打残荷\n灯火暗随波\n行人归去无踪迹\n唯有钟声隔水和", theme:"暮雨残荷",emotion:"melancholy",elements:["秋暮","残荷","灯火","钟声"]},
    {text:"黄昏雨急过苏堤\n水面波纹一望迷\n秋色萧条人影少\n孤山寺外柳丝低", theme:"黄昏苏堤",emotion:"lonely",elements:["黄昏","苏堤","秋色","孤山"]},
    {text:"晚来风雨打窗棂\n落尽残芦水满汀\n欲问秋光归何处\n一川烟草一川青", theme:"晚来风雨",emotion:"nostalgic",elements:["风雨","残芦","秋光","烟草"]},
    {text:"雨歇黄昏燕子低\n湿云低压柳丝垂\n谁家玉笛吹杨柳\n散入秋风满客衣", theme:"雨歇黄昏",emotion:"longing",elements:["黄昏","燕子","玉笛","秋风"]},
  ],
  "autumn-night-rain": [
    {text:"秋雨夜深打芭蕉\n灯火半萧条\n虫声凄切随风远\n一枕秋凉到天朝", theme:"秋雨芭蕉",emotion:"melancholy",elements:["秋雨","芭蕉","灯火","虫声"]},
    {text:"夜雨敲窗秋意深\n水涨没苔痕\n无人风更急\n唯有残灯照水心", theme:"残灯水心",emotion:"lonely",elements:["夜雨","秋意","残灯","水心"]},
    {text:"更深谁遣雨丝斜\n滴碎空阶旧梦华\n独坐听残秋夜雨\n一帘幽思落灯花", theme:"更深雨丝",emotion:"nostalgic",elements:["更深","雨丝","空阶","幽思"]},
    {text:"雨声如诉夜如年\n点滴声中忆旧缘\n惆怅秋风吹不尽\n一窗秋雨一窗烟", theme:"雨声如诉",emotion:"longing",elements:["雨声","秋风","秋雨","惆怅"]},
  ],
  "autumn-dawn-fog": [
    {text:"秋晓浓雾隐孤山\n如画水云间\n远钟一声明方向\n白鹭低飞过浅湾", theme:"秋雾远钟",emotion:"tranquil",elements:["秋晓","浓雾","孤山","远钟"]},
    {text:"晨雾如烟漫断桥\n湖光秋色半空寥\n芦花白处人不见\n一叶扁舟渡碧潮", theme:"芦花扁舟",emotion:"serene",elements:["晨雾","断桥","芦花","扁舟"]},
    {text:"烟岚初散晓光微\n芦色依稀燕子飞\n何处钟声来远寺\n一舟撑破雾中归", theme:"烟岚芦色",emotion:"peaceful",elements:["烟岚","芦色","钟声","雾中"]},
    {text:"雾锁长堤晓色昏\n芦花一树隐柴门\n渔郎不识来时路\n误入仙源欲断魂", theme:"雾锁长堤",emotion:"wistful",elements:["雾锁","长堤","芦花","仙源"]},
  ],
  "autumn-day-fog": [
    {text:"秋雾空蒙锁碧波\n景色半消磨\n远山隐约如墨画\n近水芦花似雪梭", theme:"秋雾芦花",emotion:"serene",elements:["秋雾","碧波","远山","芦花"]},
    {text:"烟笼秋水雾笼天\n十景半遮颜\n平湖月隐孤山暗\n一叶舟横柳岸边", theme:"烟笼秋水",emotion:"tranquil",elements:["烟笼","秋水","平湖","孤山"]},
    {text:"轻烟漠漠雨霏霏\n芦色依稀燕子归\n独倚画桥人不识\n一川烟草一川晖", theme:"轻烟芦色",emotion:"lonely",elements:["轻烟","芦色","画桥","烟草"]},
    {text:"雾重云深秋昼长\n芦花流水两茫茫\n渔郎去后无消息\n独剩空山响石梁", theme:"雾重云深",emotion:"nostalgic",elements:["雾重","芦花","流水","空山"]},
  ],
  "autumn-dusk-fog": [
    {text:"秋暮雾起断桥西\n水面烟波望不迷\n归雁一行穿雾去\n远山隐隐夕阳低", theme:"暮雾归雁",emotion:"wistful",elements:["秋暮","雾起","归雁","远山"]},
    {text:"晚雾沉沉压柳堤\n秋色渐低迷\n灯明桥上人行少\n唯有蟾光照浅溪", theme:"晚雾柳堤",emotion:"melancholy",elements:["晚雾","柳堤","秋色","蟾光"]},
    {text:"晚烟笼芦色\n归鸟入云低\n欲问秋光何处去\n一溪流水一溪泥", theme:"晚烟归鸟",emotion:"nostalgic",elements:["晚烟","芦色","归鸟","流水"]},
    {text:"雾锁黄昏燕子归\n芦花风里暮钟微\n独坐桥边看水去\n一川烟草伴斜晖", theme:"雾锁黄昏",emotion:"lonely",elements:["雾锁","芦花","暮钟","斜晖"]},
  ],
  "autumn-night-fog": [
    {text:"秋夜雾浓不见天\n灯影半含烟\n虫声一片连秋草\n月隐星沉独未眠", theme:"雾夜虫声",emotion:"lonely",elements:["秋夜","雾浓","灯影","虫声"]},
    {text:"夜雾如纱罩断桥\n秋声一叶落寒潮\n孤山寺远钟声淡\n唯有桂花香未消", theme:"雾夜桂花",emotion:"nostalgic",elements:["夜雾","断桥","钟声","桂花"]},
    {text:"夜深雾重月无痕\n塔影依稀入梦魂\n独坐舟中人未寐\n一帘幽思一帘秋", theme:"夜深雾重",emotion:"melancholy",elements:["夜深","雾重","塔影","幽思"]},
    {text:"烟笼寒水夜笼纱\n何处箫声隔芦花\n惆怅秋风吹不尽\n一窗明月一窗涯", theme:"烟笼寒水",emotion:"longing",elements:["烟笼","寒水","箫声","明月"]},
  ],
  "autumn-day-cloudy": [
    {text:"多云秋日意苍凉\n水面波光映画廊\n枫叶红时芦荻白\n一行归雁向南翔", theme:"枫红归雁",emotion:"wistful",elements:["秋日","波光","枫叶","归雁"]},
    {text:"阴天秋意更分明\n落叶满长亭\n风过芦花飞似雪\n水寒深处见鱼行", theme:"芦花飞雪",emotion:"serene",elements:["阴天","落叶","芦花","鱼行"]},
    {text:"阴晴不定柳丝黄\n燕子南飞去路长\n独倚阑干人不识\n一川烟草一川霜", theme:"阴晴柳丝",emotion:"nostalgic",elements:["阴晴","柳丝","燕子","烟草"]},
    {text:"云影天光共渺茫\n芦花一树映斜阳\n渔歌远去人归晚\n独剩空山响石梁", theme:"云影天光",emotion:"tranquil",elements:["云影","芦花","渔歌","空山"]},
  ],
  "autumn-dusk-cloudy": [
    {text:"秋暮云低天欲雪\n风起雁声绝\n寒鸦归去巢无觅\n一盏孤灯照冷月", theme:"暮云寒鸦",emotion:"lonely",elements:["秋暮","云低","寒鸦","孤灯"]},
    {text:"阴云漠漠暮秋深\n水面苍茫路难寻\n人影渐行远\n唯有秋涛夜夜音", theme:"暮云秋涛",emotion:"melancholy",elements:["阴云","暮秋","秋涛","孤影"]},
    {text:"晚云收尽暮山青\n归鸟投林各自行\n独倚阑干人不识\n一川烟草一川明", theme:"晚云归鸟",emotion:"wistful",elements:["晚云","暮山","归鸟","烟草"]},
    {text:"云破月来芦弄影\n风摇柳线水浮萍\n谁家玉笛吹杨柳\n散入秋风满客亭", theme:"云破月来",emotion:"peaceful",elements:["云破","月来","玉笛","秋风"]},
  ],
  "autumn-night-cloudy": [
    {text:"云重星稀秋夜长\n寂寂水茫茫\n寒风拂柳人空瘦\n一盏残灯映石廊", theme:"云重残灯",emotion:"lonely",elements:["云重","星稀","寒风","残灯"]},
    {text:"秋夜层云遮半月\n亭外雾如纱\n虫声渐歇蛙声远\n独倚阑干对蒹葭", theme:"云遮蒹葭",emotion:"melancholy",elements:["秋夜","层云","虫声","蒹葭"]},
    {text:"云重星稀夜色深\n塔影依稀入梦寻\n独坐舟中人未寐\n一帘幽思一帘心", theme:"云重星稀",emotion:"nostalgic",elements:["云重","星稀","塔影","幽思"]},
    {text:"夜深云厚月无痕\n独对寒灯忆旧恩\n惆怅秋风吹不尽\n一窗秋雨一窗魂", theme:"夜深云厚",emotion:"longing",elements:["夜深","云厚","寒灯","秋风"]},
  ],
  // ===== 冬 =====
  "winter-dawn-snow": [
    {text:"晨起推窗雪满堤\n白了一层泥\n如画无人赏\n唯有寒梅独自栖", theme:"晨雪寒梅",emotion:"lonely",elements:["晨起","雪","寒梅","孤栖"]},
    {text:"晓雪纷纷下碧空\n一色玉妆中\n三潭塔影迷蒙处\n唯有梅花映雪红", theme:"晓雪梅红",emotion:"hopeful",elements:["晓雪","碧空","塔影","梅花"]},
    {text:"晨光破晓雪初晴\n寒梅一树映窗明\n独倚阑干人不识\n满川白雪一川清", theme:"晨光寒梅",emotion:"peaceful",elements:["晨光","寒梅","白雪","清寂"]},
    {text:"晓风拂面雪飞扬\独坐炉前煮茗香\n最是冬初好风景\n满庭梅气一庭霜", theme:"晓风梅气",emotion:"tranquil",elements:["晓风","雪","梅气","煮茗"]},
  ],
  "winter-day-snow": [
    {text:"大雪纷飞满断桥\n素裹胜春朝\n孤山处处梅争发\n一树冰心映碧寥", theme:"断桥飞雪",emotion:"joyful",elements:["大雪","断桥","孤山","梅花"]},
    {text:"银装素裹瘦\n雪压苏堤柳不伸\n冰封水面如明镜\n一抹红梅报早春", theme:"银装红梅",emotion:"hopeful",elements:["银装","苏堤","冰封","红梅"]},
    {text:"漫天飞雪舞翩跹\n寒梅独放笑霜天\n独坐亭中人不识\n满川白雪一川烟", theme:"漫天飞雪",emotion:"peaceful",elements:["飞雪","寒梅","霜天","白雪"]},
    {text:"日暖风和雪渐消\n寒梅香里忆前朝\n独倚阑干看水去\n满川白雪一川潮", theme:"日暖雪消",emotion:"nostalgic",elements:["日暖","寒梅","白雪","旧忆"]},
  ],
  "winter-dusk-snow": [
    {text:"暮雪纷纷掩断桥\n灯火渐萧条\n归人行尽孤山路\n唯有梅花对雪飘", theme:"暮雪归人",emotion:"wistful",elements:["暮雪","断桥","孤山","梅花"]},
    {text:"黄昏雪急压湖心\n雷峰塔影半遮深\n一盏孤灯明灭处\n寒鸦栖处有闲音", theme:"黄昏雪急",emotion:"lonely",elements:["黄昏","雪","雷峰","孤灯"]},
    {text:"晚照斜穿万柳银\n归鸦点点入云迟\n冬光欲尽人未醉\n独坐桥边看落晖", theme:"晚照归鸦",emotion:"melancholy",elements:["晚照","柳银","归鸦","落晖"]},
    {text:"一抹残阳半入波\n渔歌渐远水天和\n雪花风里人归去\n独剩空山响薜萝", theme:"残阳渔歌",emotion:"nostalgic",elements:["残阳","渔歌","雪花","空山"]},
  ],
  "winter-night-snow": [
    {text:"雪夜万籁空\n明月照寒松\n柴扉半掩人声静\n唯有梅花入梦中", theme:"雪夜寒松",emotion:"tranquil",elements:["雪夜","明月","寒松","梅花"]},
    {text:"夜雪无声落满湖\n如镜月如珠\n远寺钟声来入耳\n一炉红火伴茶炉", theme:"夜雪茶炉",emotion:"peaceful",elements:["夜雪","湖","钟声","茶炉"]},
    {text:"玉轮高挂柳梢银\n十里清光一鉴浮\n何处箫声吹彻夜\n梅香飞上木兰舟", theme:"玉轮梅香",emotion:"nostalgic",elements:["玉轮","柳梢","清光","梅香"]},
    {text:"更深露重夜微凉\n塔影沉沉入渺茫\n独坐舟中人未寐\n一帘冬月一帘香", theme:"塔影冬月",emotion:"lonely",elements:["露重","塔影","冬月","夜凉"]},
  ],
  "winter-dawn-sunny": [
    {text:"冬晓霜满堤\n残雪映晨曦\n梅花一树红如火\n白鹭双飞过碧溪", theme:"冬晓残雪",emotion:"hopeful",elements:["冬晓","霜","残雪","梅花"]},
    {text:"晴冬破晓日微红\n水面冰层映浅空\n远山如黛晨烟淡\n枯荷数点立寒风", theme:"晴冬枯荷",emotion:"serene",elements:["晴冬","冰层","远山","枯荷"]},
    {text:"晓风拂面柳丝银\n独坐炉前煮茗温\n最是冬晴好风景\n满庭梅气一庭春", theme:"晓风梅气",emotion:"peaceful",elements:["晓风","柳丝","梅气","煮茗"]},
    {text:"晨光破晓雪初晴\n寒梅一树映窗明\n独倚阑干人不识\n满川残雪一川清", theme:"晨光残雪",emotion:"tranquil",elements:["晨光","寒梅","残雪","清寂"]},
  ],
  "winter-day-sunny": [
    {text:"冬日晴光映断桥\n寒水入云霄\n梅花半放香初透\n一缕阳光暖柳条", theme:"冬日梅香",emotion:"joyful",elements:["冬日","断桥","梅花","阳光"]},
    {text:"寒日水不波\n残雪映山阿\n白鸥一双飞不起\n冰面悠然照影多", theme:"寒日白鸥",emotion:"serene",elements:["寒日","残雪","白鸥","冰面"]},
    {text:"日暖风和冰渐消\n寒梅香里忆前朝\n独倚阑干看水去\n满川残雪一川潮", theme:"日暖冰消",emotion:"nostalgic",elements:["日暖","寒梅","残雪","旧忆"]},
    {text:"晴空一鹤排云上\n便引诗情到碧霄\n独坐亭中人不识\n满川残雪一川潮", theme:"晴空鹤影",emotion:"hopeful",elements:["晴空","鹤","诗情","残雪"]},
  ],
  "winter-dusk-sunny": [
    {text:"冬暮斜阳映断桥\n冰面泛金涛\n梅枝点点红将尽\n一抹余晖照寂寥", theme:"冬暮金涛",emotion:"wistful",elements:["冬暮","斜阳","断桥","梅枝"]},
    {text:"晴冬日暮晚风凉\n水面余晖一片黄\n雷峰塔影斜阳里\n几只归鸦过夕阳", theme:"晴冬归鸦",emotion:"serene",elements:["晴冬","余晖","雷峰","归鸦"]},
    {text:"晚照斜穿万柳银\n归鸦点点入云迟\n冬光欲尽人未醉\n独坐桥边看落晖", theme:"晚照归鸦",emotion:"melancholy",elements:["晚照","柳银","归鸦","落晖"]},
    {text:"一抹残阳半入波\n渔歌渐远水天和\n梅花风里人归去\n独剩空山响薜萝", theme:"残阳渔歌",emotion:"nostalgic",elements:["残阳","渔歌","梅花","空山"]},
  ],
  "winter-night-sunny": [
    {text:"冬夜月明湖面清\n雪映玉壶冰\n梅花香里人独倚\n万籁无声夜已深", theme:"冬夜雪映",emotion:"tranquil",elements:["冬夜","月明","雪","梅花"]},
    {text:"寒夜星光落碧波\n月冷照残荷\n梅花一缕清香远\n独对长堤听棹歌", theme:"寒夜棹歌",emotion:"lonely",elements:["寒夜","星光","梅花","棹歌"]},
    {text:"玉轮高挂柳梢银\n十里清光一鉴浮\n何处箫声吹彻夜\n梅香飞上木兰舟", theme:"玉轮梅香",emotion:"nostalgic",elements:["玉轮","柳梢","清光","梅香"]},
    {text:"更深露重夜微凉\n塔影沉沉入渺茫\n独坐舟中人未寐\n一帘冬月一帘香", theme:"塔影冬月",emotion:"lonely",elements:["露重","塔影","冬月","夜凉"]},
  ],
  "winter-dawn-rain": [
    {text:"冬晨冷雨湿残荷\n萧瑟水增波\n行人撑伞过\n一城寒气入枯萝", theme:"冬雨残荷",emotion:"melancholy",elements:["冬晨","冷雨","残荷","寒气"]},
    {text:"晓雨敲窗冬意深\n水色暗沉沉\n枯柳垂丝无绿意\n孤山寺外少行人", theme:"晓雨枯柳",emotion:"lonely",elements:["晓雨","冬意","枯柳","孤山"]},
    {text:"轻寒恻恻透窗纱\n细雨如丝织晓霞\n燕子不归冬欲暮\n一庭冷雨落梅花", theme:"轻寒细雨",emotion:"wistful",elements:["轻寒","细雨","燕子","梅花"]},
    {text:"晓窗听雨梦初惊\n点滴声中冬意生\n忽忆去年携手处\n一桥烟雨一桥情", theme:"晓窗听雨",emotion:"longing",elements:["晓窗","冬雨","烟雨","旧忆"]},
  ],
  "winter-day-rain": [
    {text:"冬雨绵绵下碧空\n水阔雾朦胧\n不见行人过\n唯有寒鸦立柳中", theme:"冬雨寒鸦",emotion:"lonely",elements:["冬雨","碧空","寒鸦","柳中"]},
    {text:"冷雨如针刺旧荷\n冬色更萧索\n游人尽避茶楼内\n一盏清茶暖意多", theme:"冷雨清茶",emotion:"peaceful",elements:["冷雨","旧荷","茶楼","清茶"]},
    {text:"冷雨敲窗冬意深\n梅花飞上木兰舟\n独坐听残冬日午\n一川烟草一川愁", theme:"冷雨梅花",emotion:"melancholy",elements:["冷雨","梅花","冬日","烟草"]},
    {text:"雨过天青水色新\n梅花白处见鱼鳞\n渔歌远去人归晚\n独剩空山响石津", theme:"雨过天青",emotion:"serene",elements:["雨过","天青","梅花","渔歌"]},
  ],
  "winter-dusk-rain": [
    {text:"冬暮雨添三分寒\n灯火水中残\n长堤少人行已尽\n唯有钟声出寺关", theme:"冬暮寺钟",emotion:"melancholy",elements:["冬暮","灯火","长堤","钟声"]},
    {text:"傍晚冬雨打枯枝\n水面波纹似写诗\n雷峰塔影无人看\n一灯如豆照寒池", theme:"冬雨寒池",emotion:"lonely",elements:["冬雨","枯枝","雷峰","寒池"]},
    {text:"晚来风雨打窗棂\n落尽残梅水满汀\n欲问冬光归何处\n一川烟草一川青", theme:"晚来风雨",emotion:"nostalgic",elements:["风雨","残梅","冬光","烟草"]},
    {text:"雨歇黄昏燕子低\n湿云低压柳丝垂\n谁家玉笛吹杨柳\n散入冬风满客衣", theme:"雨歇黄昏",emotion:"longing",elements:["黄昏","燕子","玉笛","冬风"]},
  ],
  "winter-night-rain": [
    {text:"冬夜雨声打旧窗\n灯影入苍茫\n寒风一阵炉烟断\n独拥薄衾梦故乡", theme:"冬夜梦乡",emotion:"longing",elements:["冬夜","雨声","寒风","故乡"]},
    {text:"夜雨淅沥寒气侵\n流水入深林\n残荷枯叶随波去\n一盏孤灯照水心", theme:"夜雨孤灯",emotion:"lonely",elements:["夜雨","流水","残荷","孤灯"]},
    {text:"更深谁遣雨丝斜\n滴碎空阶旧梦华\n独坐听残冬夜雨\n一帘幽思落灯花", theme:"更深雨丝",emotion:"nostalgic",elements:["更深","雨丝","空阶","幽思"]},
    {text:"雨声如诉夜如年\n点滴声中忆旧缘\n惆怅冬风吹不尽\n一窗冬雨一窗烟", theme:"雨声如诉",emotion:"melancholy",elements:["雨声","冬风","冬雨","惆怅"]},
  ],
  "winter-dawn-fog": [
    {text:"冬晓浓雾锁孤山\n不见水生烟\n枯荷零落寒霜重\n唯有钟声过断桥", theme:"冬雾钟声",emotion:"tranquil",elements:["冬晓","浓雾","孤山","钟声"]},
    {text:"晨雾如铅压断桥\n冬色太萧条\n远山隐约疑无路\n一盏渔灯渡碧涛", theme:"晨雾渔灯",emotion:"wistful",elements:["晨雾","断桥","远山","渔灯"]},
    {text:"烟岚初散晓光微\n梅色依稀燕子飞\n何处钟声来远寺\n一舟撑破雾中归", theme:"烟岚梅色",emotion:"peaceful",elements:["烟岚","梅色","钟声","雾中"]},
    {text:"雾锁长堤晓色昏\n梅花一树隐柴门\n渔郎不识来时路\n误入仙源欲断魂", theme:"雾锁长堤",emotion:"nostalgic",elements:["雾锁","长堤","梅花","仙源"]},
  ],
  "winter-day-fog": [
    {text:"冬雾笼似墨涂\n残雪隐苍芜\n孤山寺远钟声暗\n一叶归舟迷路途", theme:"冬雾孤舟",emotion:"serene",elements:["冬雾","残雪","孤山","归舟"]},
    {text:"浓雾锁尽景\n枯荷败柳不堪看\n行人稀少长堤冷\n唯有茶烟出寺门", theme:"雾锁茶烟",emotion:"lonely",elements:["浓雾","枯荷","长堤","茶烟"]},
    {text:"轻烟漠漠雨霏霏\n梅色依稀燕子归\n独倚画桥人不识\n一川烟草一川晖", theme:"轻烟梅色",emotion:"melancholy",elements:["轻烟","梅色","画桥","烟草"]},
    {text:"雾重云深冬昼长\n梅花流水两茫茫\n渔郎去后无消息\n独剩空山响石梁", theme:"雾重云深",emotion:"nostalgic",elements:["雾重","梅花","流水","空山"]},
  ],
  "winter-dusk-fog": [
    {text:"冬暮雾重压湖心\n雷峰塔影半浮沉\n灯火迷蒙人归去\n一声长啸入寒林", theme:"冬暮寒林",emotion:"melancholy",elements:["冬暮","雾重","雷峰","寒林"]},
    {text:"晚雾沉沉暗\n枯枝如墨画中看\n行人渐少灯初上\n一缕炊烟过断桥", theme:"晚雾炊烟",emotion:"wistful",elements:["晚雾","枯枝","炊烟","断桥"]},
    {text:"晚烟笼梅色\n归鸟入云低\n欲问冬光何处去\n一溪流水一溪泥", theme:"晚烟归鸟",emotion:"nostalgic",elements:["晚烟","梅色","归鸟","流水"]},
    {text:"雾锁黄昏燕子归\n梅花风里暮钟微\n独坐桥边看水去\n一川烟草伴斜晖", theme:"雾锁黄昏",emotion:"lonely",elements:["雾锁","梅花","暮钟","斜晖"]},
  ],
  "winter-night-fog": [
    {text:"冬夜雾浓不见月\n灯火半明灭\n寒风过处枯荷响\n独坐亭中待雪歇", theme:"雾夜待雪",emotion:"tranquil",elements:["冬夜","雾浓","枯荷","寒风"]},
    {text:"雾锁寒湖夜色深\n无人月无痕\n远寺钟声来入耳\n炉中炭火暖闲身", theme:"雾夜炭火",emotion:"peaceful",elements:["雾锁","寒湖","钟声","炭火"]},
    {text:"夜深雾重月无痕\n塔影依稀入梦魂\n独坐舟中人未寐\n一帘幽思一帘冬", theme:"夜深雾重",emotion:"lonely",elements:["夜深","雾重","塔影","幽思"]},
    {text:"烟笼寒水夜笼纱\n何处箫声隔梅花\n惆怅冬风吹不尽\n一窗明月一窗涯", theme:"烟笼寒水",emotion:"melancholy",elements:["烟笼","寒水","箫声","明月"]},
  ],
  "winter-day-cloudy": [
    {text:"多云冬日渐阴沉\n水面风来寒意深\n枯荷败叶随波去\n一岸萧条少路人", theme:"多云枯荷",emotion:"lonely",elements:["冬日","水面","枯荷","寒风"]},
    {text:"阴天冬冷过苏堤\n水色似前溪\n远山雪帽犹未化\n一两只鸥自在飞", theme:"阴天雪帽",emotion:"serene",elements:["阴天","苏堤","远山","白鸥"]},
    {text:"阴晴不定柳丝银\n独坐炉前煮茗温\n最是冬阴好风景\n满庭梅气一庭霜", theme:"阴晴梅气",emotion:"peaceful",elements:["阴晴","柳丝","梅气","煮茗"]},
    {text:"云影天光共渺茫\n梅花一树映斜阳\n渔歌远去人归晚\n独剩空山响石梁", theme:"云影天光",emotion:"tranquil",elements:["云影","梅花","渔歌","空山"]},
  ],
  "winter-dusk-cloudy": [
    {text:"冬暮云低天色暗\n灯火渐阑珊\n行人归去长堤冷\n唯有风声过断桥", theme:"冬暮风声",emotion:"lonely",elements:["冬暮","云低","灯火","风声"]},
    {text:"阴云漠漠暮来迟\n水面苍茫雁不知\n塔下人烟少\n一盏孤灯照客思", theme:"阴云孤灯",emotion:"melancholy",elements:["阴云","暮","塔","孤灯"]},
    {text:"晚云收尽暮山青\n归鸟投林各自行\n独倚阑干人不识\n一川烟草一川明", theme:"晚云归鸟",emotion:"wistful",elements:["晚云","暮山","归鸟","烟草"]},
    {text:"云破月来梅弄影\n风摇柳线水浮萍\n谁家玉笛吹杨柳\n散入冬风满客亭", theme:"云破月来",emotion:"peaceful",elements:["云破","月来","玉笛","冬风"]},
  ],
  "winter-night-cloudy": [
    {text:"云层厚重星全无\n冬夜冷如初\n寒风不歇枯枝响\n独坐炉前翻旧书", theme:"云厚旧书",emotion:"peaceful",elements:["云层","冬夜","寒风","旧书"]},
    {text:"冬夜层云遮半月\n亭外水如铅\n虫声已尽蛙声绝\n唯有寒风过短檐", theme:"云遮寒风",emotion:"lonely",elements:["冬夜","层云","寒风","短檐"]},
    {text:"云重星稀夜色深\n塔影依稀入梦寻\n独坐舟中人未寐\n一帘幽思一帘心", theme:"云重星稀",emotion:"nostalgic",elements:["云重","星稀","塔影","幽思"]},
    {text:"夜深云厚月无痕\n独对寒灯忆旧恩\n惆怅冬风吹不尽\n一窗冬雨一窗魂", theme:"夜深云厚",emotion:"longing",elements:["夜深","云厚","寒灯","冬风"]},
  ],
};

// 背景图片库
const BG_IMAGES = [
  {url:"https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&q=85", tags:["spring","sunny","day"], desc:"苏堤春晓·春日艳阳"},
  {url:"https://images.unsplash.com/photo-1541232741-74f255d0ec7e?w=1920&q=85", tags:["spring","rain","autumn","rain"], desc:"细雨·烟雨朦胧"},
  {url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85", tags:["summer","sunny","day"], desc:"曲院风荷·接天莲叶"},
  {url:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=85", tags:["autumn","sunny","day"], desc:"秋高气爽·平湖秋月"},
  {url:"https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1920&q=85", tags:["winter","snow"], desc:"断桥残雪·素裹银装"},
  {url:"https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=85", tags:["fog","cloudy"], desc:"烟雨·雾气弥漫"},
  {url:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=85", tags:["night"], desc:"夜色·灯火阑珊"},
  {url:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=85", tags:["dawn","sunrise"], desc:"晨曦破晓·旭日东升"},
  {url:"https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1920&q=85", tags:["dusk","sunset"], desc:"雷峰夕照·残阳如血"},
  {url:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=85", tags:["any"], desc:"全景·山水相映"},
];

// 工具函数
const WEEK = ["日","一","二","三","四","五","六"];
const SEASON_CN = {spring:"春",summer:"夏",autumn:"秋",winter:"冬"};
const PERIOD_CN = {dawn:"晨",day:"日间",dusk:"暮",night:"夜"};
const WEATHER_CN = {sunny:"晴",rain:"雨",snow:"雪",fog:"雾",cloudy:"多云"};
const EMOTION_CN = {
  serene:"宁静",longing:"思念",joyful:"欣喜",lonely:"孤寂",
  nostalgic:"怀旧",peaceful:"恬淡",melancholy:"幽思",hopeful:"希冀",wistful:"怅惘",tranquil:"清幽"
};

function getSeason(m) {
  return m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter";
}

function getPeriod(h) {
  return h >= 5 && h < 8 ? "dawn" : h >= 8 && h < 17 ? "day" : h >= 17 && h < 19 ? "dusk" : "night";
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// WMO 天气代码解码
function decodeWMO(code, isDay) {
  if(code === 0) return {label:"晴", icon:isDay?"☀️":"🌙", cat:"sunny"};
  if(code <= 2) return {label:"晴间多云", icon:"⛅", cat:"sunny"};
  if(code === 3) return {label:"阴天", icon:"☁️", cat:"cloudy"};
  if(code === 45 || code === 48) return {label:"大雾", icon:"🌫️", cat:"fog"};
  if(code >= 51 && code <= 57) return {label:"毛毛雨", icon:"🌦️", cat:"rain"};
  if(code >= 61 && code <= 67) return {label:"降雨", icon:"🌧️", cat:"rain"};
  if(code >= 71 && code <= 77) return {label:"降雪", icon:"❄️", cat:"snow"};
  if(code >= 80 && code <= 82) return {label:"阵雨", icon:"🌧️", cat:"rain"};
  if(code >= 85 && code <= 86) return {label:"阵雪", icon:"🌨️", cat:"snow"};
  if(code >= 95) return {label:"雷雨", icon:"⛈️", cat:"rain"};
  return {label:"多云", icon:"⛅", cat:"cloudy"};
}

// 防重复机制（使用 storage）
function getHistory(key) {
  try {
    const data = wx.getStorageSync("xihu_" + key);
    return data ? JSON.parse(data) : [];
  } catch(e) {
    return [];
  }
}

function pushHistory(key, id) {
  const h = getHistory(key);
  h.push(id);
  const max = Math.max(5, Math.floor(h.length * 0.75) + 3);
  if(h.length > max) h.splice(0, h.length - max);
  wx.setStorageSync("xihu_" + key, JSON.stringify(h));
}

function getRecentThemes(n = 3) {
  return getHistory("themes").slice(-n);
}

function pushTheme(theme) {
  pushHistory("themes", theme);
}

function getRecentEmotions(n = 2) {
  return getHistory("emotions").slice(-n);
}

function pushEmotion(emotion) {
  pushHistory("emotions", emotion);
}

// 背景图选择
function chooseBg(season, period, weather) {
  const tags = new Set([season, period, weather]);
  if(period === "dawn") tags.add("sunrise");
  if(period === "dusk") tags.add("sunset");
  if(period === "night") tags.add("night");
  
  const hist = getHistory("bg");
  const shuffled = [...BG_IMAGES].sort(() => Math.random() - 0.5);
  
  let best = null, bestScore = -1;
  for(const img of shuffled) {
    if(hist.includes(img.url)) continue;
    const score = img.tags.filter(t => tags.has(t)).length;
    if(score > bestScore) { bestScore = score; best = img; }
  }
  
  if(!best) best = shuffled.find(i => i.tags.includes(period)) || pick(shuffled);
  pushHistory("bg", best.url);
  return best;
}

// 根据时段和天气推断合适的情感
function inferEmotion(period, weather) {
  const emotionMap = {
    "dawn-sunny": ["serene", "peaceful", "hopeful"],
    "dawn-rain": ["melancholy", "wistful", "tranquil"],
    "dawn-fog": ["tranquil", "serene", "wistful"],
    "day-sunny": ["joyful", "peaceful", "hopeful"],
    "day-rain": ["melancholy", "serene", "peaceful"],
    "day-fog": ["serene", "tranquil", "wistful"],
    "dusk-sunny": ["wistful", "serene", "nostalgic"],
    "dusk-rain": ["melancholy", "lonely", "wistful"],
    "dusk-fog": ["melancholy", "wistful", "lonely"],
    "night-sunny": ["tranquil", "lonely", "nostalgic"],
    "night-rain": ["lonely", "melancholy", "longing"],
    "night-fog": ["tranquil", "lonely", "melancholy"],
  };
  const key = `${period}-${weather}`;
  return emotionMap[key] || ["serene", "peaceful"];
}

// 诗词选择 - 增强情感维度
function pickPoem(season, period, weather) {
  const last = getHistory("type");
  const lastType = last.length ? last[last.length - 1] : "";
  let useAI = !last.length ? Math.random() < 0.5 : lastType === "classic";
  
  const recentThemes = getRecentThemes(3);
  const recentEmotions = getRecentEmotions(2);
  const preferredEmotions = inferEmotion(period, weather);
  
  if(useAI) {
    const poem = pickAIPoem(season, period, weather, recentThemes, recentEmotions, preferredEmotions);
    if(poem) {
      pushHistory("type", "ai");
      pushTheme(poem.theme);
      pushEmotion(poem.emotion);
      return {...poem, source: "AI 即兴", emotionCN: EMOTION_CN[poem.emotion]};
    }
  }
  
  const classic = pickClassicPoem(season, period, weather, recentThemes, recentEmotions, preferredEmotions);
  if(classic) {
    pushHistory("type", "classic");
    pushTheme(classic.theme);
    pushEmotion(classic.emotion);
    return {...classic, source: "名人诗词", emotionCN: EMOTION_CN[classic.emotion]};
  }
  
  const ai = pickAIPoem(season, period, weather, recentThemes, recentEmotions, preferredEmotions);
  if(ai) {
    pushHistory("type", "ai");
    pushTheme(ai.theme);
    pushEmotion(ai.emotion);
    return {...ai, source: "AI 即兴", emotionCN: EMOTION_CN[ai.emotion]};
  }
  
  pushHistory("type", "classic");
  return {text:"欲把比西子\n淡妆浓抹总相宜", author:"苏轼", dynasty:"宋", source:"名人诗词", theme:"西子比湖", emotion:"joyful", emotionCN:"欣喜"};
}

function pickClassicPoem(season, period, weather, recentThemes, recentEmotions, preferredEmotions) {
  const hist = getHistory("classic");
  const themeSet = new Set(recentThemes);
  const emotionSet = new Set(recentEmotions);
  
  let pool = CLASSIC.filter(p => 
    p.s === season && p.p === period && p.w === weather && 
    !hist.includes(p.id) && !themeSet.has(p.theme) && !emotionSet.has(p.emotion)
  );
  
  // 优先匹配情感
  if(pool.length > 1) {
    const emotionMatch = pool.filter(p => preferredEmotions.includes(p.emotion));
    if(emotionMatch.length > 0) pool = emotionMatch;
  }
  
  if(!pool.length) pool = CLASSIC.filter(p => p.s === season && p.p === period && !hist.includes(p.id));
  if(!pool.length) pool = CLASSIC.filter(p => p.s === season && !hist.includes(p.id));
  if(!pool.length) pool = CLASSIC.filter(p => p.s === "any" && !hist.includes(p.id));
  if(!pool.length) {
    pool = CLASSIC.filter(p => p.s === season && p.p === period && p.w === weather);
    if(!pool.length) pool = CLASSIC.filter(p => p.s === season);
    if(!pool.length) pool = CLASSIC.filter(p => p.s === "any");
  }
  
  if(!pool.length) return null;
  const poem = pick(pool);
  pushHistory("classic", poem.id);
  return poem;
}

function pickAIPoem(season, period, weather, recentThemes, recentEmotions, preferredEmotions) {
  const key = `${season}-${period}-${weather}`;
  let arr = AI_TPL[key];
  if(!arr) arr = AI_TPL[`${season}-${period}-sunny`] || AI_TPL[`${season}-day-${weather}`] || null;
  if(!arr) return null;
  
  const themeSet = new Set(recentThemes);
  const emotionSet = new Set(recentEmotions);
  
  // 首先排除最近的主题和情感
  let filtered = arr.filter(p => !themeSet.has(p.theme) && !emotionSet.has(p.emotion));
  if(!filtered.length) filtered = arr.filter(p => !themeSet.has(p.theme));
  if(!filtered.length) filtered = arr;
  
  // 优先匹配推断的情感
  if(filtered.length > 1 && preferredEmotions) {
    const emotionMatch = filtered.filter(p => preferredEmotions.includes(p.emotion));
    if(emotionMatch.length > 0) filtered = emotionMatch;
  }
  
  return pick(filtered);
}

// 获取情感描述
function getEmotionDesc(emotionKey) {
  return EMOTIONS[emotionKey] || { name: "未知", desc: "" };
}

module.exports = {
  EMOTIONS,
  EMOTION_CN,
  CLASSIC,
  AI_TPL,
  BG_IMAGES,
  WEEK,
  SEASON_CN,
  PERIOD_CN,
  WEATHER_CN,
  getSeason,
  getPeriod,
  pick,
  decodeWMO,
  getHistory,
  pushHistory,
  getRecentThemes,
  pushTheme,
  getRecentEmotions,
  pushEmotion,
  chooseBg,
  pickPoem,
  pickClassicPoem,
  pickAIPoem,
  inferEmotion,
  getEmotionDesc
};
