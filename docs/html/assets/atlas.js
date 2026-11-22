const flagCodes = new Set([
  'AE AF AL AM AO AQ AR AT AU AZ BA BD BE BF BG BI BJ BN BO BR',
  'BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CY CYN CZ',
  'DE DJ DK DO DZ EC EE EG EH ER ES ET FI FJ FK FR GA GB GE GH',
  'GL GM GN GQ GR GT GW GY HN HR HT HU ID IE IL IN IQ IR IS IT',
  'JM JO JP KE KG KH KP KR KW KZ LA LB LK LR LS LT LU LV LY MA',
  'MD ME MG MK ML MM MN MR MW MX MY MZ NA NC NE NG NI NL NO NP',
  'NZ OM PA PE PG PH PK PL PR PS PT PY QA RO RS RU RW SA SB SD',
  'SE SI SK SL SN SO SOL SR SS SV SY SZ TD TF TG TH TJ TL TM TN',
  'TR TT TW TZ UA UG US UY UZ VE VN VU XK YE ZA ZM ZW'
].join(' ').split(' '));

function flagMarkup(iso, id, className) {
  const code = flagCodes.has(iso) ? iso : id;
  if (!flagCodes.has(code)) return '';
  return '<img class="' + className + '" alt="" loading="lazy" src="assets/flags/' + code + '.svg">';
}

const MASCOT_EXTRA={
  "JPN/岩手県": {
    "name": "わんこきょうだい",
    "source": "sources/mascot-岩手県.html",
    "credit": "岩手県イメージキャラクター",
    "wiki": false,
    "label": "そばっち",
    "src": "mascots/岩手県.jpg",
    "fallback": "mascots/岩手県-fallback.jpg"
  },
  "JPN/宮城県": {
    "name": "むすび丸",
    "source": "sources/mascot-宮城県.html",
    "credit": "仙台・宮城デスティネーションキャンペーン推進マスコット",
    "wiki": false,
    "src": "mascots/宮城県.jpg",
    "fallback": "mascots/宮城県-fallback.jpg"
  },
  "JPN/秋田県": {
    "name": "んだッチ",
    "source": "sources/mascot-秋田県.html",
    "credit": "秋田県観光PRマスコット",
    "wiki": false,
    "src": "mascots/秋田県.jpg",
    "fallback": "mascots/秋田県-fallback.jpg"
  },
  "JPN/山形県": {
    "name": "きてけろくん",
    "source": "sources/mascot-山形県.html",
    "credit": "山形県おもてなし局長",
    "wiki": false,
    "src": "mascots/山形県.jpg",
    "fallback": "mascots/山形県-fallback.jpg"
  },
  "JPN/福島県": {
    "name": "キビタン",
    "source": "sources/mascot-福島県.html",
    "credit": "福島県マスコット",
    "wiki": false,
    "src": "mascots/福島県.png",
    "fallback": "mascots/福島県-fallback.jpg"
  },
  "JPN/栃木県": {
    "name": "とちまるくん",
    "source": "sources/mascot-栃木県.html",
    "credit": "栃木県マスコット",
    "wiki": false,
    "src": "mascots/栃木県.png"
  },
  "JPN/埼玉県": {
    "name": "コバトン",
    "source": "sources/mascot-埼玉県.html",
    "credit": "埼玉県マスコット",
    "wiki": false,
    "src": "mascots/埼玉県.png",
    "fallback": "mascots/埼玉県-fallback.png"
  },
  "JPN/千葉県": {
    "name": "チーバくん",
    "source": "sources/mascot-千葉県.html",
    "credit": "千葉県マスコット",
    "wiki": false,
    "src": "mascots/千葉県.gif",
    "fallback": "mascots/千葉県-fallback.jpg"
  },
  "JPN/神奈川県": {
    "name": "かながわキンタロウ",
    "source": "sources/mascot-神奈川県.html",
    "credit": "神奈川県PRキャラクター",
    "wiki": false,
    "src": "mascots/神奈川県.png",
    "fallback": "mascots/神奈川県-fallback.png"
  },
  "JPN/新潟県": {
    "name": "トッキッキ",
    "source": "sources/mascot-新潟県.html",
    "credit": "新潟県宣伝マスコット",
    "wiki": false,
    "label": "とっぴー",
    "src": "mascots/新潟県.gif",
    "fallback": "mascots/新潟県-fallback.jpg"
  },
  "JPN/富山県": {
    "name": "きときと君",
    "source": "sources/mascot-富山県.html",
    "credit": "富山県PRマスコット",
    "wiki": false,
    "src": "mascots/富山県.jpg",
    "fallback": "mascots/富山県-fallback.png"
  },
  "JPN/石川県": {
    "name": "ひゃくまんさん",
    "source": "sources/mascot-石川県.html",
    "credit": "石川県観光PRマスコット",
    "wiki": false,
    "src": "mascots/石川県.jpg",
    "fallback": "mascots/石川県-fallback.jpg"
  },
  "JPN/福井県": {
    "name": "Juratic",
    "source": "sources/mascot-福井県.html",
    "credit": "福井県マスコット",
    "wiki": false,
    "src": "mascots/福井県.jpg",
    "fallback": "mascots/福井県-fallback.jpg"
  },
  "JPN/長野県": {
    "name": "アルクマ",
    "source": "sources/mascot-長野県.html",
    "credit": "長野県PRキャラクター",
    "wiki": false,
    "src": "mascots/長野県.png",
    "fallback": "mascots/長野県-fallback.jpg"
  },
  "JPN/岐阜県": {
    "name": "ミナモ",
    "source": "sources/mascot-岐阜県.html",
    "credit": "岐阜県マスコット",
    "wiki": false,
    "src": "mascots/岐阜県.jpg"
  },
  "JPN/静岡県": {
    "name": "ふじっぴー",
    "source": "sources/mascot-静岡県.html",
    "credit": "静岡県マスコット",
    "wiki": false,
    "src": "mascots/静岡県.jpg",
    "fallback": "mascots/静岡県-fallback.jpg"
  },
  "JPN/滋賀県": {
    "name": "うぉーたん",
    "source": "sources/mascot-滋賀県.html",
    "credit": "滋賀県イメージキャラクター",
    "wiki": false,
    "src": "mascots/滋賀県.gif",
    "fallback": "mascots/滋賀県-fallback.png"
  },
  "JPN/京都府": {
    "name": "まゆまろ",
    "source": "sources/mascot-京都府.html",
    "credit": "京都府広報監",
    "wiki": false,
    "src": "mascots/京都府.png",
    "fallback": "mascots/京都府-fallback.jpg"
  },
  "JPN/大阪府": {
    "name": "もずやん",
    "source": "sources/mascot-大阪府.html",
    "credit": "大阪府公式マスコット",
    "wiki": false,
    "src": "mascots/大阪府.jpg",
    "fallback": "mascots/大阪府-fallback.png"
  },
  "JPN/兵庫県": {
    "name": "はばタン",
    "source": "sources/mascot-兵庫県.html",
    "credit": "兵庫県マスコット",
    "wiki": false,
    "src": "mascots/兵庫県.png",
    "fallback": "mascots/兵庫県-fallback.jpg"
  },
  "JPN/奈良県": {
    "name": "せんとくん",
    "source": "sources/mascot-奈良県.html",
    "credit": "奈良県公式マスコット",
    "wiki": false,
    "src": "mascots/奈良県.png",
    "fallback": "mascots/奈良県-fallback.png"
  },
  "JPN/鳥取県": {
    "name": "トリピー",
    "source": "sources/mascot-鳥取県.html",
    "credit": "鳥取県PRキャラクター",
    "wiki": false,
    "src": "mascots/鳥取県.jpg",
    "fallback": "mascots/鳥取県-fallback.jpg"
  },
  "JPN/島根県": {
    "name": "しまねっこ",
    "source": "sources/mascot-島根県.html",
    "credit": "島根県観光マスコット",
    "wiki": false,
    "src": "mascots/島根県.png",
    "fallback": "mascots/島根県-fallback.png"
  },
  "JPN/岡山県": {
    "name": "ももっち",
    "source": "sources/mascot-岡山県.html",
    "credit": "岡山県マスコット",
    "wiki": false,
    "src": "mascots/岡山県.png"
  },
  "JPN/山口県": {
    "name": "ちょるる",
    "source": "sources/mascot-山口県.html",
    "credit": "山口県PR本部長",
    "wiki": false,
    "src": "mascots/山口県.png",
    "fallback": "mascots/山口県-fallback.png"
  },
  "JPN/徳島県": {
    "name": "すだちくん",
    "source": "sources/mascot-徳島県.html",
    "credit": "徳島県マスコット",
    "wiki": false,
    "src": "mascots/徳島県.png",
    "fallback": "mascots/徳島県-fallback.png"
  },
  "JPN/愛媛県": {
    "name": "みきゃん",
    "source": "sources/mascot-愛媛県.html",
    "credit": "愛媛県PRキャラクター",
    "wiki": false,
    "src": "mascots/愛媛県.png"
  },
  "JPN/高知県": {
    "name": "くろしおくん",
    "source": "sources/mascot-高知県.html",
    "credit": "高知県イメージキャラクター",
    "wiki": false,
    "src": "mascots/高知県.svg",
    "fallback": "mascots/高知県-fallback.png"
  },
  "JPN/長崎県": {
    "name": "がんばくん",
    "source": "sources/mascot-長崎県.html",
    "credit": "長崎県マスコット",
    "wiki": false,
    "label": "がんばくん・らんばちゃん",
    "src": "mascots/長崎県.jpg"
  },
  "JPN/佐賀県": {
    "name": "壺侍",
    "source": "sources/mascot-佐賀県.html",
    "credit": "佐賀県観光PRキャラクター",
    "wiki": false,
    "src": "mascots/佐賀県.png",
    "fallback": "mascots/佐賀県-fallback.jpg"
  },
  "JPN/大分県": {
    "name": "めじろん",
    "source": "sources/mascot-大分県.html",
    "credit": "大分県マスコット",
    "wiki": false,
    "src": "mascots/大分県.jpg",
    "fallback": "mascots/大分県-fallback.png"
  },
  "JPN/宮崎県": {
    "name": "みやざき犬",
    "source": "sources/mascot-宮崎県.html",
    "credit": "宮崎県シンボルキャラクター",
    "wiki": false,
    "src": "mascots/宮崎県.jpg"
  },
  "JPN/鹿児島県": {
    "name": "ぐりぶー",
    "source": "sources/mascot-鹿児島県.html",
    "credit": "かごしまPRキャラクター",
    "wiki": false,
    "src": "mascots/鹿児島県.jpg",
    "fallback": "mascots/鹿児島県-fallback.jpg"
  },
  "JPN/福岡県": {
    "name": "エコトン",
    "source": "sources/mascot-福岡県.html",
    "credit": "福岡県マスコットキャラクター",
    "wiki": false,
    "src": "mascots/福岡県.jpg",
    "fallback": "mascots/福岡県-fallback.png"
  },
  "JPN/香川県": {
    "name": "親切な青鬼くん",
    "source": "sources/mascot-香川県.html",
    "credit": "香川県観光推進マスコット",
    "wiki": false,
    "src": "mascots/香川県.jpg",
    "fallback": "mascots/香川県-fallback.jpg"
  },
  "JPN/青森県": {
    "name": "いくべぇ",
    "source": "sources/mascot-青森県.html",
    "credit": "青森県観光PRキャラクター",
    "wiki": false,
    "src": "mascots/青森県.jpg",
    "fallback": "mascots/青森県-fallback.jpg"
  },
  "JPN/茨城県": {
    "name": "いばラッキー",
    "source": "sources/mascot-茨城県.html",
    "credit": "いきいき茨城ゆめ国体・大会マスコット",
    "wiki": false,
    "src": "mascots/茨城県.png",
    "fallback": "mascots/茨城県-fallback.jpg"
  },
  "JPN/東京都": {
    "name": "ゆりーと",
    "source": "sources/mascot-東京都.html",
    "credit": "東京都スポーツ推進大使",
    "wiki": false,
    "src": "mascots/東京都.webp"
  },
  "JPN/愛知県": {
    "name": "はち丸",
    "source": "sources/mascot-愛知県.html",
    "credit": "愛知県名古屋市のマスコット",
    "wiki": false,
    "src": "mascots/愛知県.jpg",
    "fallback": "mascots/愛知県-fallback.jpg"
  },
  "JPN/三重県": {
    "name": "こにゅうどうくん",
    "source": "sources/mascot-三重県.html",
    "credit": "三重県四日市市のマスコット",
    "wiki": false,
    "src": "mascots/三重県.webp",
    "fallback": "mascots/三重県-fallback.webp"
  },
  "JPN/和歌山県": {
    "name": "きいちゃん",
    "source": "sources/mascot-和歌山県.html",
    "credit": "和歌山県PRキャラクター",
    "wiki": false,
    "src": "mascots/和歌山県.png"
  },
  "JPN/広島県": {
    "name": "ブンカッキー",
    "source": "sources/mascot-広島県.html",
    "credit": "けんみん文化祭ひろしまマスコット",
    "wiki": false,
    "src": "mascots/広島県.jpg",
    "fallback": "mascots/広島県-fallback.jpg"
  },
  "JPN/北海道": {
    "name": "キュンちゃん",
    "source": "sources/mascot-北海道.html",
    "credit": "北海道観光PRキャラクター",
    "wiki": false,
    "src": "mascots/北海道.png"
  },
  "JPN/沖縄県": {
    "name": "花笠マハエ",
    "source": "sources/mascot-沖縄県.html",
    "credit": "沖縄観光PRキャラクター",
    "wiki": false,
    "src": "mascots/沖縄県.jpg",
    "fallback": "mascots/沖縄県-fallback.jpg"
  },
  "JPN/山梨県": {
    "name": "武田菱丸",
    "source": "sources/mascot-山梨県.html",
    "credit": "山梨県観光PRキャラクター",
    "wiki": false,
    "src": "mascots/山梨県.jpg"
  }
};
function mascotOf(k){return (typeof MASCOTS!=='undefined'&&MASCOTS[k])||MASCOT_EXTRA[k]}
function mascotImgFail(img) {
  const candidates = JSON.parse(img.dataset.sources);
  const next = Number(img.dataset.sourceIndex) + 1;
  if (next < candidates.length) {
    img.dataset.sourceIndex = String(next);
    img.src = candidates[next];
    return;
  }
  img.outerHTML = mascotPlaceholder(img.classList.contains('large'), img.alt + 'の画像を読み込めません');
}

// TOP 5 is an editorial selection for the prototype, not an official ranking.
const ATLAS_CULTURE={},MASCOTS={
'JPN/熊本県':{name:'くまモン',src:'mascots/熊本県.svg',source:'sources/kumamon-land.html',credit:'熊本県 PRキャラクター'},
'JPN/熊本県/熊本市':{name:'ひごまる',src:'mascots/熊本市.png',source:'sources/higomaru.html',credit:'熊本市イメージキャラクター'},
'JPN/群馬県':{name:'ぐんまちゃん',src:'mascots/群馬県.png',source:'sources/gunmachan.html',credit:'群馬県宣伝部長'},
'JPN/群馬県/前橋市':{name:'ころとん',src:'mascots/前橋市.jpg',source:'sources/koroton.html',credit:'前橋市公式キャラクター'}
};
function addCulture(key,people,sights,specialties,sources){const parse=s=>s.split('|').map(x=>{let [name,description]=x.split('：');return {name,description}});ATLAS_CULTURE[key]={people:parse(people),sights:parse(sights),specialties:parse(specialties),sources}}
addCulture('JPN/熊本県',
'夏目漱石：熊本で教壇に立った小説家|宮本武蔵：晩年を熊本で過ごした剣豪|加藤清正：熊本城を築いた武将|小泉八雲：熊本で英語を教えた文学者|横井小楠：熊本ゆかりの思想家',
'熊本城：石垣と天守が象徴的な城|阿蘇：カルデラと草原が広がる火山地域|黒川温泉：山あいの温泉街|天草：海と島々がつくる風景|水前寺成趣園：歴史ある回遊式庭園',
'馬刺し：熊本を代表する郷土料理|からし蓮根：からし味噌を詰めた蓮根|熊本ラーメン：豚骨とにんにくの風味|いきなり団子：さつまいもと餡を包むお菓子|太平燕：春雨を使った具だくさんの一品',
[['人物・史跡','sources/kumamoto-historic-sites.html'],['熊本の名物','sources/higomaru.html'],['熊本県の風景','sources/kumamon-island.html']]);
addCulture('JPN/熊本県/熊本市',
'加藤清正：熊本城を築いた武将|夏目漱石：市内に旧居が残る小説家|小泉八雲：熊本で教鞭をとった文学者|宮本武蔵：熊本で晩年を過ごした剣豪|横井小楠：記念館で足跡をたどれる思想家',
'熊本城：熊本のシンボル|水前寺成趣園：池を中心とした日本庭園|旧細川刑部邸：細川家ゆかりの武家屋敷|夏目漱石内坪井旧居：文学者の暮らしを伝える旧居|霊巌洞：宮本武蔵ゆかりの洞窟',
'熊本ラーメン：香ばしいにんにくと豚骨|太平燕：春雨と野菜を楽しむ郷土料理|いきなり団子：さつまいも入りの蒸し菓子|からし蓮根：からし味噌が特徴の郷土料理|馬刺し：熊本の食文化を代表する一品',
[['熊本市の史跡','sources/kumamoto-historic-sites.html'],['記念館・資料館','sources/kumamoto-museums.html'],['熊本の名物','sources/higomaru.html']]);
addCulture('JPN/群馬県',
'萩原朔太郎：前橋出身の詩人|田山花袋：館林出身の小説家|新島襄：安中藩にゆかりのある教育家|新田義貞：上野国ゆかりの武将|土屋文明：高崎ゆかりの歌人',
'草津温泉：湯畑が象徴的な温泉地|富岡製糸場：近代化の歴史を伝える世界遺産|伊香保温泉：石段街で知られる温泉地|尾瀬：湿原と山の風景|吹割の滝：岩盤を流れ落ちる滝',
'焼きまんじゅう：味噌だれを塗って焼く郷土のおやつ|水沢うどん：コシと透明感を楽しむうどん|おっきりこみ：幅広い麺を煮込んだ郷土料理|ひもかわ：桐生の幅広いうどん|こんにゃく：群馬の代表的な特産品',
[['ゆかりの人物','sources/gunma-people.html'],['群馬の郷土料理','sources/gunma-cuisine.html'],['群馬観光','sources/gunma-tourism.html']]);
addCulture('JPN/群馬県/前橋市',
'萩原朔太郎：前橋出身の近代詩人|萩原恭次郎：前橋ゆかりの詩人|高橋元吉：前橋ゆかりの詩人|伊藤信吉：前橋ゆかりの詩人・評論家|平井晩村：前橋ゆかりの詩人',
'前橋文学館：詩のまちの文化に触れる|臨江閣：庭園を備えた近代和風建築|広瀬川遊歩道：詩碑と水辺の散歩道|太陽の鐘：岡本太郎の作品|アーツ前橋：まちなかの美術館',
'焼きまんじゅう：味噌だれが香ばしい郷土食|豚肉料理：TONTONのまちの味|ソースカツ丼：群馬で親しまれる丼|おっきりこみ：野菜と幅広麺の煮込み|群馬のこんにゃく：地域の食文化を支える特産品',
[['前橋の文学と街歩き','sources/maebashi-literary-walk.html'],['アート探訪','sources/maebashi-art-walk.html'],['豚肉文化','sources/koroton.html'],['郷土料理','sources/gunma-cuisine.html']]);
addCulture('JPN/東京都',
'夏目漱石：江戸・牛込生まれの小説家|葛飾北斎：江戸・本所生まれの浮世絵師|樋口一葉：東京生まれの小説家|芥川龍之介：東京生まれの小説家|黒澤明：東京生まれの映画監督',
'浅草寺：浅草を象徴する寺院|東京スカイツリー：下町に立つ電波塔|明治神宮：都心に広がる鎮守の森|高尾山：自然と寺院を楽しむ山|小笠原諸島：世界自然遺産の島々',
'江戸前寿司：江戸で発展した握り寿司|もんじゃ焼き：東京の下町グルメ|深川めし：あさりを使う郷土料理|江戸前天ぷら：江戸の食文化を伝える一品|蕎麦：江戸っ子に親しまれた麺料理',
[['東京の郷土料理','sources/tokyo-cuisine.html'],['東京観光','sources/tokyo-tourism.html']]);
addCulture('JPN/東京都/八王子市',
'松任谷由実：八王子出身のシンガーソングライター|ヒロミ：八王子出身のタレント|高橋みなみ：八王子出身の歌手|北島三郎：八王子ゆかりの歌手|塚本高史：八王子出身の俳優',
'高尾山：都心から訪ねやすい自然の山|高尾山薬王院：山の信仰を伝える寺院|八王子城跡：戦国時代の山城跡|滝山城跡：多摩川近くの城跡|夕やけ小やけふれあいの里：里山の風景を楽しむ施設',
'八王子ラーメン：刻み玉ねぎが特徴|高尾山とろろそば：参道で親しまれる味|桑の葉茶：養蚕の歴史につながるお茶|八王子織物：織物のまちの伝統産業|八王子車人形：地域に伝わる人形芝居',
[['ゆかりの著名人','sources/hachioji-people.html'],['桑都の文化','sources/hachioji-heritage.html']]);
addCulture('CHN/湖北省',
'屈原：秭帰にゆかりのある詩人|李時珍：蘄春出身の医薬学者|王昭君：興山ゆかりの歴史人物|孟浩然：襄陽出身の唐代の詩人|蘇軾：黄州で名作を残した文学者',
'黄鶴楼：武漢の長江を望む楼閣|武当山：道教文化と歴史的建築群|神農架：山岳の自然保護地域|恩施大峡谷：壮大な峡谷の景観|湖北省博物館：楚文化に触れる博物館',
'熱乾麺：ごま風味の汁なし麺|武昌魚：湖北を代表する魚料理|蓮根と排骨のスープ：湖北で親しまれる家庭の味|三鮮豆皮：もち米などを包んだ軽食|洪湖蓮子：湖の恵みを生かす特産品',
[['湖北の文化遺産','sources/hubei-heritage.html'],['湖北の美食旅','sources/wuhan-cuisine-and-culture.html'],['湖北省文化和旅游厅','sources/hubei-tourism.html']]);
addCulture('CHN/湖北省/武漢市',
'李娜：武漢出身のテニス選手|劉亦菲：武漢出身の俳優|李四光：武漢大学の新校舎建設を主導した地質学者|聞一多：武漢大学で教えた詩人・学者|張之洞：武漢の近代化に関わった政治家',
'黄鶴楼：長江を見渡す武漢の象徴|東湖：湖畔の散策を楽しむ景勝地|湖北省博物館：楚文化の宝物を展示|武漢大学：歴史あるキャンパス|帰元寺：漢陽にある仏教寺院',
'熱乾麺：武漢の朝食を代表する麺|三鮮豆皮：もち米・具材・皮を重ねた軽食|武昌魚：蒸し魚などで味わう地元の名物|鴨の首の香辛料煮：おみやげでも親しまれる味|蓮根と排骨のスープ：湖北の家庭料理',
[['武漢の文化と美食','sources/wuhan-cuisine-and-culture.html'],['武漢の名物','sources/wuhan-cuisine.pdf'],['武漢大学の歴史','sources/wuhan-university.html']]);
addCulture('USA/カリフォルニア州',
'スティーブ・ジョブズ：サンフランシスコ生まれの起業家|ジョン・スタインベック：サリナス生まれの作家|アンセル・アダムス：州の自然を撮影した写真家|ウォルト・ディズニー：州内で映画制作とテーマパークを展開|ジョン・ミューア：ヨセミテの保護に関わった自然保護活動家',
'ヨセミテ国立公園：岩壁と滝の大自然|ゴールデンゲートブリッジ：湾の入口にかかる橋|ディズニーランド：アナハイムのテーマパーク|セコイア国立公園：巨大なセコイアの森|ビッグ・サー：太平洋沿いの海岸風景',
'サワードウ：サンフランシスコのパン文化|フィッシュタコス：南カリフォルニアで人気の味|コブサラダ：ロサンゼルス発祥のサラダ|アーモンド：州を代表する農産物|チョッピーノ：サンフランシスコの魚介煮込み',
[['カリフォルニア観光','sources/california-tourism.html'],['州発祥の料理','sources/california-cuisine.html'],['ヨセミテ','sources/yosemite.html']]);
addCulture('USA/カリフォルニア州/サンフランシスコ',
'スティーブ・ジョブズ：サンフランシスコ生まれの起業家|ブルース・リー：サンフランシスコ生まれの俳優・武道家|アンセル・アダムス：サンフランシスコ生まれの写真家|マヤ・アンジェロウ：この街で青春期を過ごした作家|ロビン・ウィリアムズ：ベイエリアゆかりの俳優',
'ゴールデンゲートブリッジ：海峡にかかる赤い橋|アルカトラズ島：歴史ある湾内の島|フィッシャーマンズワーフ：海沿いのにぎわう地区|ゴールデンゲートパーク：美術館や庭園のある大公園|ペインテッド・レディ：色彩豊かな歴史的住宅群',
'サワードウブレッド：酸味が特徴のパン|チョッピーノ：地元生まれの魚介煮込み|ミッション・ブリトー：ミッション地区で育った味|ダンジネスクラブ：湾岸で親しまれるカニ|クラムチャウダー：パンの器でも楽しむスープ',
[['サンフランシスコ観光','sources/san-francisco-tourism.html'],['食文化','sources/san-francisco-cuisine.html']]);
let cultureTab='sights';
function cultureKey(o,isCity=false){return st.country?.properties.id+'/'+(isCity?st.admin?.properties.name+'/'+nameOf(o):nameOf(o))}
function mascotPlaceholder(large, message) {
  return '<span class="mascot-placeholder' + (large ? ' large' : '') + '" title="' + esc(message) + '" aria-hidden="true">⌖</span>';
}
function mascotMarkup(key, large = false) {
  const mascot = mascotOf(key);
  if (!mascot) return mascotPlaceholder(large, 'マスコット未収録');
  const candidates = [mascot.src, mascot.fallback].filter(Boolean);
  if (!candidates.length) return mascotPlaceholder(large, mascot.name + 'の画像は未配置です');
  const alt = mascot.label || mascot.name;
  const sources = ' data-sources="' + esc(JSON.stringify(candidates)) + '" data-source-index="0" onerror="mascotImgFail(this)"';
  return '<img class="mascot' + (large ? ' large' : '') + '" src="' + esc(candidates[0]) + '"' + sources +
    ' alt="' + esc(alt) + '" title="' + esc(mascot.name + ' ・ ' + mascot.credit) +
    '" loading="lazy" decoding="async" referrerpolicy="no-referrer">';
}
function enhanceCards(){
 if(!st.country)return;$('#cards').classList.add('with-mascots');
 $('#cards').querySelectorAll('button').forEach(b=>{let o=items.find(o=>idOf(o)===b.dataset.id);if(!o)return;let key=cultureKey(o,!!st.admin),m=mascotOf(key),n=st.admin?'街を地図で見る':o.properties.cities.length+' の主要都市';
 b.innerHTML='<span class="place-identity">'+mascotMarkup(key)+'<span><strong>'+esc(nameOf(o))+'</strong><span class="english">'+esc(enOf(o))+'</span><span class="mascot-name">'+(m?esc(m.name):'地域マスコット未収録')+'</span></span></span><span class="card-bottom"><span class="count">'+n+'</span>'+(ATLAS_CULTURE[key]?'<span class="top-five-badge">TOP 5</span>':'')+'</span>';
 });
}
function renderCultureDetail(){
 $('#detail').classList.toggle('culture-detail',!!st.admin);if(!st.admin)return;
 let chosen=st.city||st.admin,key=cultureKey(chosen,!!st.city),data=ATLAS_CULTURE[key],m=mascotOf(key),title=nameOf(chosen),tabs=[['people','名人'],['sights','名勝'],['specialties','名物']];
 $('#detail').innerHTML='<span class="detail-tag"><i></i>'+esc(st.city?'この街の、とっておき。':'この地域の、とっておき。')+'</span><div class="culture-title">'+mascotMarkup(key,true)+'<div><h2>'+esc(title)+'</h2><p class="en">'+esc(enOf(chosen))+'</p>'+(m?'<a class="mascot-credit" href="'+esc(m.source)+'" target="_blank" rel="noopener noreferrer">'+esc(m.name)+(m.wiki?' · 解説 ↗':' · 公式紹介 ↗')+'</a>':'<span class="mascot-credit">地域マスコット未収録</span>')+'</div></div><div class="culture-tabs" role="tablist" aria-label="地域の見どころ">'+tabs.map(([k,n])=>'<button id="tab-'+k+'" role="tab" aria-selected="'+(cultureTab===k)+'" aria-controls="culture-panel" data-tab="'+k+'" tabindex="'+(cultureTab===k?'0':'-1')+'">'+n+' <small>TOP 5</small></button>').join('')+'</div><div id="culture-panel" role="tabpanel" aria-labelledby="tab-'+cultureTab+'" tabindex="0"></div><p class="selection-note">編集ピックアップ · 公式ランキングではありません</p><div id="culture-sources"></div><button class="back" id="back">← '+esc(st.city?st.admin.properties.name:st.country.properties.name)+'に戻る</button>';
 $('#back').onclick=()=>up(depth()-1);
 $('#detail').querySelectorAll('[role=tab]').forEach((b,i)=>{b.onclick=()=>{cultureTab=b.dataset.tab;renderCultureDetail();$('#tab-'+cultureTab).focus({preventScroll:true})};b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;cultureTab=tabs[j][0];renderCultureDetail();$('#tab-'+cultureTab).focus({preventScroll:true})}});
 let list=data?.[cultureTab]?.slice(0,5)||[];
 $('#culture-panel').innerHTML=list.length?'<ol class="top-five">'+list.map((o,i)=>'<li><span class="rank">'+String(i+1).padStart(2,'0')+'</span><div><strong>'+esc(o.name)+'</strong><p>'+esc(o.description)+'</p></div></li>').join('')+'</ol>':'<div class="culture-empty"><span>⌖</span><strong>'+esc(title)+'の情報は準備中です</strong><p>この地域の'+tabs.find(t=>t[0]===cultureTab)[1]+'は未収録です。</p></div>';
 if(data)$('#culture-sources').innerHTML='<details class="source-links"><summary>参考・画像の出典</summary>'+data.sources.map(([name,url])=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(name)+' ↗</a>').join('')+(m?'<a href="'+esc(m.source)+'" target="_blank" rel="noopener noreferrer">'+esc(m.name)+' / '+esc(m.credit)+' ↗</a>':'')+'</details>';
 else $('#culture-sources').innerHTML='<p class="coverage-note">TOP 5 収録例：熊本県・熊本市、群馬県・前橋市、東京都・八王子市、湖北省・武漢市、カリフォルニア州・サンフランシスコ。</p>';
}

/* World Atlas prototype — Natural Earth geographic data; D3.js (ISC). */
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const regions=[{id:'Asia',name:'アジア',en:'ASIA',color:'#ed9989',center:[101,31],desc:'身近な街から、まだ知らない文化へ。多彩な風景が広がるアジアをめぐろう。'},{id:'Europe',name:'ヨーロッパ',en:'EUROPE',color:'#a99acb',center:[20,51],desc:'歴史のある街並みと、国・地域ごとに異なる文化。地図をたどってヨーロッパを探そう。'},{id:'North America',name:'北アメリカ',en:'NORTH AMERICA',color:'#78afd8',center:[-103,37],desc:'大きな都市から、雄大な自然まで。北アメリカの広がりを見てみよう。'},{id:'South America',name:'南アメリカ',en:'SOUTH AMERICA',color:'#82b58e',center:[-62,-20],desc:'アンデスの山々、熱帯の森、海沿いの街。南アメリカにはどんな場所があるかな。'},{id:'Africa',name:'アフリカ',en:'AFRICA',color:'#e5b762',center:[20,4],desc:'砂漠からサバンナ、にぎやかな都市へ。大きな大陸のいろいろな表情を探そう。'},{id:'Oceania',name:'オセアニア',en:'OCEANIA',color:'#70bdbb',center:[150,-24],desc:'青い海に囲まれた大陸と島々。オセアニアの国・地域や街へ出かけよう。'}];
let countries=[],cache={},st={region:null,country:null,admin:null,city:null},items=[],mapFeatures=[],busy=0,spinning=!matchMedia('(prefers-reduced-motion: reduce)').matches,dragging=false,moved=false,transitioning=false,hover=null,last=0;
const W=820,H=540,svg=d3.select('#map'),defs=svg.append('defs');
const gradient=defs.append('radialGradient').attr('id','sea').attr('cx','35%').attr('cy','30%');gradient.append('stop').attr('offset','0%').attr('stop-color','#e3f4fa');gradient.append('stop').attr('offset','80%').attr('stop-color','#b9dbea');gradient.append('stop').attr('offset','100%').attr('stop-color','#a2cbdc');
const shadow=defs.append('filter').attr('id','globeShadow').attr('x','-50%').attr('y','-50%').attr('width','200%').attr('height','200%');shadow.append('feDropShadow').attr('dx',0).attr('dy',13).attr('stdDeviation',15).attr('flood-color','#6596af').attr('flood-opacity','.16');
const sphere=svg.append('path').datum({type:'Sphere'}).attr('fill','url(#sea)').attr('stroke','#eefaff').attr('stroke-width',1.2).attr('filter','url(#globeShadow)');
const grid=svg.append('path').datum(d3.geoGraticule10()).attr('fill','none').attr('stroke','#f4fbfe').attr('stroke-opacity','.45').attr('stroke-width','.6');
const lands=svg.append('g'),labels=svg.append('g'),pins=svg.append('g');
let projection=d3.geoOrthographic().rotate([-115,-20,0]).translate([W/2,H/2+3]).scale(214).clipAngle(90),path=d3.geoPath(projection),baseScale=214;
const reg=id=>regions.find(r=>r.id===id), depth=()=>st.city?4:st.admin?3:st.country?2:st.region?1:0;
function featureCollection(fs){return {type:'FeatureCollection',features:fs}}
function activeAdmins(){return st.country?cache[st.country.properties.id]?.features||[]:[]}
function visiblePoint(coords){return coords&&d3.geoDistance(coords,[-projection.rotate()[0],-projection.rotate()[1]])<Math.PI/2-.015}
function color(f,i=0){if(depth()<2)return reg(f.properties.region)?.color||'#b7c6c9';if(depth()===2)return [reg(st.region).color,'#8cb7d6','#a6bd8a','#c5a4cd','#e7ba79','#8dc9be'][i%6];return f===st.admin?reg(st.region).color:'#d2dedb'}
function tooltip(event,text){const b=$('.map-panel').getBoundingClientRect();$('#mapTooltip').hidden=false;$('#mapTooltip').textContent=text;$('#mapTooltip').style.left=Math.min(event.clientX-b.left+12,b.width-150)+'px';$('#mapTooltip').style.top=Math.max(45,event.clientY-b.top-32)+'px'}
function updateMap(){
 lands.selectAll('path').data(mapFeatures,d=>d.properties.id).join('path').attr('class','land').attr('fill',color).attr('opacity',f=>depth()===1&&f.properties.region!==st.region?'.28':1).on('pointermove',(e,f)=>tooltip(e,depth()===0?(reg(f.properties.region)?.name||f.properties.name):f.properties.name)).on('pointerleave',()=>$('#mapTooltip').hidden=true).on('click',(e,f)=>{if(moved)return;e.stopPropagation();$('#mapTooltip').hidden=true;if(depth()===0){const r=reg(f.properties.region);if(r)go({region:r.id})}else if(depth()===1){if(f.properties.region===st.region)go({country:f.properties.id})}else if(depth()===2)go({admin:f.properties.id})});
 render();
}
function render(){
 sphere.attr('d',path);grid.attr('d',path);lands.selectAll('path').attr('d',path);
 let candidates=[];
 if(depth()===0)candidates=regions.map(r=>({name:r.en,coords:r.center}));
 else if(depth()===1)candidates=items.map(f=>({name:f.properties.name,coords:f.properties.coords}));
 else if(depth()===2)candidates=items.map(f=>({name:f.properties.name,coords:f.properties.coords}));
 const occupied=[];candidates=candidates.filter(c=>{if(!visiblePoint(c.coords))return false;let p=projection(c.coords);if(p[0]<45||p[0]>W-50||p[1]<60||p[1]>H-55)return false;const bw=Math.min(c.name.length*10,120);if(occupied.some(q=>Math.abs(q.x-p[0])<(q.w+bw)/2+5&&Math.abs(q.y-p[1])<20))return false;occupied.push({x:p[0],y:p[1],w:bw});return true});
 labels.selectAll('text').data(candidates,d=>d.name).join('text').attr('class','map-label').attr('text-anchor','middle').attr('transform',d=>'translate('+projection(d.coords)+')').attr('font-size',depth()===0?12:11).text(d=>d.name);
 const cities=st.admin?st.admin.properties.cities:[];
 const visible=cities.filter(c=>{let p=projection(c.coords);return visiblePoint(c.coords)&&p[0]>25&&p[0]<W-25&&p[1]>35&&p[1]<H-30});
 const groups=pins.selectAll('g').data(visible,d=>d.id).join(enter=>{let g=enter.append('g');g.append('circle').attr('class','city-pin');g.append('text').attr('class','map-label').attr('dy',-13).attr('text-anchor','middle');return g}).attr('transform',d=>'translate('+projection(d.coords)+')').on('click',(e,c)=>{if(!moved)go({city:c.id})}).on('pointermove',(e,c)=>tooltip(e,c.name)).on('pointerleave',()=>$('#mapTooltip').hidden=true);
 groups.select('circle').attr('r',d=>st.city?.id===d.id?8:5).attr('fill',d=>st.city?.id===d.id?'#e88d79':'#588eae');
 const pinPlaces=[];groups.select('text').text(c=>{let p=projection(c.coords);if(pinPlaces.some(q=>Math.abs(q[0]-p[0])<80&&Math.abs(q[1]-p[1])<25)&&st.city?.id!==c.id)return '';pinPlaces.push(p);return c.name});
}
function focusView(animate=true){
 let target=d3.geoOrthographic().translate([W/2,H/2+3]).clipAngle(90),center=[115,20],scale=214;
 if(st.region){center=reg(st.region).center;let fs=countries.filter(f=>f.properties.region===st.region);if(st.country){center=st.country.properties.coords;fs=activeAdmins().length?activeAdmins():[st.country]}if(st.admin){let g=st.admin.geometry;if(g.type==='MultiPolygon'){const largest=g.coordinates.map(c=>({type:'Polygon',coordinates:c})).sort((a,b)=>d3.geoArea(b)-d3.geoArea(a))[0];fs=[{type:'Feature',geometry:largest}];center=d3.geoCentroid(largest)}else{center=d3.geoCentroid(st.admin);fs=[st.admin]}}if(st.city)center=st.city.coords;
 target.rotate([-center[0],-center[1],0]);target.fitExtent([[75,75],[W-75,H-70]],featureCollection(fs));scale=Math.min(target.scale(),st.city?350000:200000);target.translate([W/2,H/2+3]);if(st.city)scale=Math.max(scale,50000);
 }
 target.rotate([-center[0],-center[1],0]).scale(scale).translate([W/2,H/2+3]);baseScale=scale;
 const r0=projection.rotate(),r1=target.rotate();while(r1[0]-r0[0]>180)r1[0]-=360;while(r1[0]-r0[0]<-180)r1[0]+=360;
 const ir=d3.interpolateArray(r0,r1),is=d3.interpolateNumber(projection.scale(),scale);svg.interrupt();transitioning=true;
 svg.transition().duration(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches?850:0).ease(d3.easeCubicInOut).tween('camera',()=>t=>{projection.rotate(ir(t)).scale(is(t));render()}).on('end',()=>{transitioning=false});
}
function currentItems(){if(!st.region)return regions;if(!st.country)return countries.filter(f=>f.properties.region===st.region);if(!st.admin)return activeAdmins();return st.admin.properties.cities}
function nameOf(o){return o.properties?.name||o.name}function enOf(o){return o.properties?.en||o.en}function idOf(o){return o.properties?.id||o.id}
function cardIcon(o){if(!st.region){const fs=countries.filter(f=>f.properties.region===o.id);let p=d3.geoNaturalEarth1().fitSize([45,30],featureCollection(fs));return '<svg class="mini-map" viewBox="0 0 45 30" aria-hidden="true"><path d="'+d3.geoPath(p)(featureCollection(fs))+'"/></svg>'}if(!st.country)return '<span class="card-symbol">'+(flagMarkup(o.properties.iso,o.properties.id,'card-flag')||'◎')+'</span>';return '<span class="card-symbol" style="color:var(--card)">'+(st.admin?'⌖':'◇')+'</span>'}
const CONT_STATS={'Asia':{area:'4,458',pop:'48.63'},'Africa':{area:'3,037',pop:'15.85'},'North America':{area:'2,471',pop:'6.21'},'South America':{area:'1,784',pop:'4.40'},'Europe':{area:'1,018',pop:'7.43'},'Oceania':{area:'851',pop:'0.47'}};
function fmtSig(v){if(v==null)return '—';if(v>=100)return Math.round(v).toLocaleString('ja-JP');return String(parseFloat(v.toPrecision(4)))}
function contStats(){if(!st.region||st.admin)return '';if(st.country){const d=COUNTRY_STATS[st.country.properties.id]||[],est=d[1]!=null&&d[2]&&d[2]<2025;return '<div><strong>'+fmtSig(d[0]!=null?d[0]/1e4:null)+'</strong><small>面積（万km²）</small></div><div><strong>'+fmtSig(d[1]!=null?d[1]/1e8:null)+(est?'＊':'')+'</strong><small>人口（億人・'+(est?'推計':'2025年')+'）</small></div>'}const c=CONT_STATS[st.region];if(!c)return '';return '<div><strong>'+c.area+'</strong><small>面積（万km²）</small></div><div><strong>'+c.pop+'</strong><small>人口（億人・2026年）</small></div>'}
const COUNTRY_STATS={"FJI":[18272,933154,2025],"TZA":[945087,70545865,2025],"SAH":[266000,603253,2017],"CAN":[9984670,41651653,2025],"USA":[9372610,341784857,2025],"KAZ":[2724900,20843754,2025],"UZB":[447400,37053428,2025],"PNG":[462840,10762817,2025],"IDN":[1904569,285721236,2025],"ARG":[2780400,45851378,2025],"CHL":[756102,19859921,2025],"COD":[2344858,112832473,2025],"SOM":[637657,19654739,2025],"KEN":[580367,57532493,2025],"SDN":[1886068,51662147,2025],"TCD":[1284000,21003705,2025],"HTI":[27750,11906095,2025],"DOM":[48671,11520487,2025],"RUS":[17098242,143513328,2025],"BHS":[13943,403033,2025],"FLK":[12173,3398,2016],"NOR":[323802,5610870,2025],"GRL":[2166086,56831,2025],"TLS":[14874,1418517,2025],"ZAF":[1221037,64747319,2025],"LSO":[30355,2363325,2025],"MEX":[1964375,131946900,2025],"URY":[181034,3384688,2025],"BRA":[8515767,212812405,2025],"BOL":[1098581,12581843,2025],"PER":[1285216,34576665,2025],"COL":[1141748,53425635,2025],"PAN":[75417,4571189,2025],"CRI":[51100,5152950,2025],"NIC":[130373,7007502,2025],"HND":[112492,11005850,2025],"SLV":[21041,6365503,2025],"GTM":[108889,18687881,2025],"BLZ":[22966,422924,2025],"VEN":[916445,28516896,2025],"GUY":[214969,835986,2025],"SUR":[163820,639850,2025],"FRA":[551695,68720337,2025],"ECU":[276841,18289896,2025],"PRI":[8870,3184835,2025],"JAM":[10991,2837077,2025],"CUB":[109884,10937203,2025],"ZWE":[390757,16950795,2025],"BWA":[582000,2562122,2025],"NAM":[825615,3092816,2025],"SEN":[196722,18931966,2025],"MLI":[1240192,25198821,2025],"MRT":[1030700,5315065,2025],"BEN":[112622,14814460,2025],"NER":[1267000,27917831,2025],"NGA":[923768,237527782,2025],"CMR":[475442,29879337,2025],"TGO":[56785,8591626,2025],"GHA":[238533,35064272,2025],"CIV":[322463,32711547,2025],"GIN":[245857,15099727,2025],"GNB":[36125,2249515,2025],"LBR":[111369,5731206,2025],"SLE":[71740,8819794,2025],"BFA":[272967,24074580,2025],"CAF":[622984,5513282,2025],"COG":[342000,6484437,2025],"GAB":[267668,2593130,2025],"GNQ":[28051,1938431,2025],"ZMB":[752612,21913874,2025],"MWI":[118484,22216120,2025],"MOZ":[801590,35631653,2025],"SWZ":[17364,1256174,2025],"AGO":[1246700,39040039,2025],"BDI":[27834,14390003,2025],"ISR":[20770,10122800,2025],"LBN":[10452,5849421,2025],"MDG":[587041,32740678,2025],"PSX":[6220,5413596,2025],"GMB":[10689,2822093,2025],"TUN":[163610,12348573,2025],"DZA":[2381741,47435312,2025],"JOR":[89342,11520684,2025],"ARE":[83600,11513149,2025],"QAT":[11586,2972215,2025],"KWT":[17818,4865298,2025],"IRQ":[438317,47020774,2025],"OMN":[309500,5494691,2025],"VUT":[12189,335169,2025],"KHM":[181035,17847982,2025],"THA":[513120,71619863,2025],"LAO":[236800,7873046,2025],"MMR":[676578,54850648,2025],"VNM":[331212,101598527,2025],"PRK":[120538,26571036,2025],"KOR":[100210,51684564,2025],"MNG":[1564110,3568978,2025],"IND":[3287590,1463865525,2025],"BGD":[147570,175686899,2025],"BTN":[38394,796682,2025],"NPL":[147181,29618118,2025],"PAK":[881912,255219554,2025],"AFG":[652230,43844111,2025],"TJK":[143100,10786734,2025],"KGZ":[199951,7343064,2025],"TKM":[488100,7618847,2025],"IRN":[1648195,92417681,2025],"SYR":[185180,25620427,2025],"ARM":[29743,3086700,2025],"SWE":[450295,10596620,2025],"BLR":[207600,9085991,2025],"UKR":[603500,38980376,2025],"POL":[312679,36435861,2025],"AUT":[83871,9208163,2025],"HUN":[93028,9514251,2025],"MDA":[33846,2360527,2025],"ROU":[238391,19020271,2025],"LTU":[65300,2888774,2025],"LVA":[64559,1847785,2025],"EST":[45227,1366475,2025],"DEU":[357114,83491249,2025],"BGR":[110879,6433302,2025],"GRC":[131990,10413962,2025],"TUR":[783562,85878556,2025],"ALB":[28748,2349580,2025],"HRV":[56594,3876200,2025],"CHE":[41284,9092436,2025],"LUX":[2586,686970,2025],"BEL":[30528,11941781,2025],"NLD":[41850,18087633,2025],"PRT":[92090,10804871,2025],"ESP":[505992,49355143,2025],"IRL":[70273,5484367,2025],"NCL":[18575,295333,2025],"SLB":[28896,838645,2025],"NZL":[270467,5324700,2025],"AUS":[7692024,27614411,2025],"LKA":[65610,21756000,2025],"CHN":[9706961,1406585000,2025],"TWN":[36193,23568378,2020],"ITA":[301336,58915656,2025],"DNK":[43094,6009169,2025],"GBR":[242900,69487000,2025],"ISL":[103000,392404,2025],"AZE":[86600,10246996,2025],"GEO":[69700,3935766,2025],"PHL":[342353,116786962,2025],"MYS":[330803,35977838,2025],"BRN":[5765,466330,2025],"SVN":[20273,2130986,2025],"FIN":[338424,5646436,2025],"SVK":[49037,5413813,2025],"CZE":[78865,10886878,2025],"ERI":[117600,3607003,2025],"JPN":[377930,123366734,2025],"PRY":[406752,7013078,2025],"YEM":[527968,41773878,2025],"SAU":[2149690,36973555,2025],"CYN":[null,326000,2017],"CYP":[9251,1370754,2025],"MAR":[446550,38430770,2025],"EGY":[1002450,118365995,2025],"LBY":[1759540,7458555,2025],"ETH":[1104300,135472051,2025],"DJI":[23200,1184076,2025],"SOL":[null,5096159,2014],"UGA":[241550,51384894,2025],"RWA":[26338,14569341,2025],"BIH":[51209,3140095,2025],"MKD":[25713,1820909,2025],"SRB":[88361,6549143,2025],"MNE":[13812,623129,2025],"KOS":[10908,1576876,2025],"TTO":[5130,1367764,2025],"SDS":[619745,12188788,2025]};
function fmtPop(p){if(p==null)return '—';if(p>=1e8)return (p/1e8).toFixed(2)+'億人';if(p>=1e4)return Math.round(p/1e4).toLocaleString('ja-JP')+'万人';return p.toLocaleString('ja-JP')+'人'}
function regionCompare(){const sec=document.getElementById('regionCompare');if(!sec)return;const show=!!st.region&&!st.country;sec.hidden=!show;if(!show||sec.dataset.region===st.region)return;sec.dataset.region=st.region;const r=reg(st.region),col=r.color;
const list=countries.filter(f=>f.properties.region===st.region).map(f=>{const d=COUNTRY_STATS[f.properties.id]||[];return {id:f.properties.id,name:f.properties.name,iso:f.properties.iso,area:d[0]??null,pop:d[1]??null,est:d[2]&&d[2]<2025}});
const flag=o=>flagMarkup(o.iso,o.id,'rc-flag');
const byArea=[...list].sort((a,b)=>(b.area??-1)-(a.area??-1)),byPop=[...list].sort((a,b)=>(b.pop??-1)-(a.pop??-1)),mx=Math.max(...list.map(o=>o.pop||0))||1,tp=list.reduce((t,o)=>t+(o.pop||0),0);
$('#rcTitle').textContent=r.name+'の国・地域をくらべてみよう';
$('#rcLead').innerHTML=r.name+'には地図上で <b>'+list.length+'</b> の国・地域があります。<br>あわせた人口は約 <b>'+fmtPop(tp)+'</b> です。';
$('#rcRows').innerHTML=byArea.map((o,i)=>'<tr tabindex="0" data-id="'+esc(o.id)+'"><td class="ct-rank">'+(o.area!=null?i+1:'—')+'</td><td><span class="rc-name">'+flag(o)+'<b>'+esc(o.name)+'</b></span></td><td class="num">'+(o.area!=null?o.area.toLocaleString('ja-JP'):'—')+'</td><td class="num">'+fmtPop(o.pop)+(o.est&&o.pop!=null?'<span class="rc-est" title="Natural Earth の推計値">＊</span>':'')+'</td></tr>').join('');
$('#rcBars').innerHTML=byPop.map(o=>'<li><span class="cb-name" title="'+esc(o.name)+'">'+esc(o.name)+'</span><span class="cb-track"><span class="cb-bar" style="--c:'+col+';--w:'+((o.pop||0)/mx*100).toFixed(2)+'%"></span></span><span class="cb-val">'+fmtPop(o.pop)+(o.est&&o.pop!=null?'＊':'')+'</span></li>').join('');
sec.querySelectorAll('#rcRows tr').forEach(tr=>{const open=()=>{go({country:tr.dataset.id});document.querySelector('.explorer').scrollIntoView({behavior:'smooth',block:'start'})};tr.onclick=open;tr.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}})}
const CAP_SKIP=new Set(['ISR','PSX','PSE']);
function capNames(country){if(!country||CAP_SKIP.has(country.properties.id))return [];const out=[];(cache[country.properties.id]?.features||[]).forEach(f=>(f.properties.cities||[]).forEach(c=>{if(c.capital){let n=c.name==='東京23区'?'東京':(c.name.replace(/(特別市|市)$/,'')||c.name);if(!out.includes(n))out.push(n)}}));return out}
function isCapitalItem(o){if(!st.country||CAP_SKIP.has(st.country.properties.id))return false;return st.admin?!!o.capital:!!o.properties?.cities?.some(c=>c.capital)}
function capitalLine(){const n=st.country&&!st.admin?capNames(st.country):[];return n.length?'<p class="capital-line"><span class="cap-star">★</span><span>主要都市</span><b>'+esc(n.join('・'))+'</b></p>':''}
function cards(){{const ct=document.getElementById('continents');if(ct)ct.hidden=!!st.region}regionCompare();const term=$('#search').value.trim().toLowerCase(),filtered=items.filter(o=>(nameOf(o)+' '+enOf(o)+' '+(st.country?mascotOf(cultureKey(o,!!st.admin))?.name||'':'')).toLowerCase().includes(term));$('#cards').className='cards'+(st.region?' dense':'');$('#cards').innerHTML=filtered.length?filtered.map(o=>{let c=!st.region?o.color:reg(st.region).color,n=!st.region?countries.filter(f=>f.properties.region===o.id).length+' の国・地域':!st.country?'国・地域をひらく':!st.admin?o.properties.cities.length+' の主要都市':'街を地図で見る';return '<button class="place-card '+(st.city&&st.city.id===o.id?'selected':'')+(isCapitalItem(o)?' is-capital':'')+'" data-id="'+esc(idOf(o))+'" style="--card:'+c+'"><span class="card-top">'+cardIcon(o)+'<span>↗</span></span><strong>'+esc(nameOf(o))+'</strong><div class="english">'+esc(enOf(o))+'</div><span class="count">'+n+'</span></button>'}).join(''):'<div class="empty">'+(term?'該当する場所が見つかりません。検索語を変えてみてください。':st.admin?'この地域の主要都市データは未収録です。上のパンくずから別の地域を選べます。':'この地域の行政区データは未収録です。')+'</div>';$('#cards').querySelectorAll('button').forEach(b=>b.onclick=()=>go({[!st.region?'region':!st.country?'country':!st.admin?'admin':'city']:b.dataset.id}));enhanceCards();$('#cards').querySelectorAll('.is-capital').forEach(b=>b.insertAdjacentHTML('beforeend','<span class="cap-badge">★ 主要都市</span>'));}
function ui(){
 const d=depth(),r=reg(st.region),title=st.city?.name||st.admin?.properties.name||st.country?.properties.name||r?.name||'世界は、つながっている。',en=st.city?.en||st.admin?.properties.en||st.country?.properties.en||r?.en||'HELLO, WORLD.';
 items=currentItems();if(st.region&&!st.country){const priority=['JPN','CHN','USA'];items.sort((a,b)=>{let x=priority.indexOf(a.properties.id),y=priority.indexOf(b.properties.id);return (x<0?99:x)-(y<0?99:y)||a.properties.name.localeCompare(b.properties.name,'ja')})}$('#search').value='';$('#rotate').hidden=!!st.region;$('#rotate').textContent=spinning?'Ⅱ 自動回転を停止':'▷ 自動回転を開始';$('#mapHint').textContent=st.region?'地図・一覧をタップして、次の場所へ':'ドラッグで地球を回せます';$('#mapTag').textContent=['◉ WORLD VIEW','◉ REGION VIEW','◉ COUNTRY VIEW','◉ LOCAL VIEW','⌖ CITY VIEW'][d];
 $('#map').setAttribute('aria-label',title+'の地図');$('#mapCaption').textContent=st.region?title+' · '+(st.admin?'主要都市の位置を表示':'境界線をタップして探索'):'6つのエリアから、世界を探そう';
 const crumbs=[{label:'⌂ 世界',level:0}];if(r)crumbs.push({label:r.name,level:1});if(st.country)crumbs.push({label:st.country.properties.name,level:2});if(st.admin)crumbs.push({label:st.admin.properties.name,level:3});if(st.city)crumbs.push({label:st.city.name,level:4});$('#breadcrumbs').innerHTML=crumbs.map((c,i)=>(i?'<span>›</span>':'')+'<button data-level="'+c.level+'" '+(i===crumbs.length-1?'aria-current="page"':'')+'>'+esc(c.label)+'</button>').join('');$('#breadcrumbs').querySelectorAll('button').forEach(b=>b.onclick=()=>up(+b.dataset.level));
 const steps=['エリアを選ぶ','国・地域を見つける','都道府県・州・省へ','街に出会う'];
 let desc=!r?'大陸の向こうに、どんな街があるんだろう。<br>気になるエリアを選んで、世界を少しずつ<br class="desktop">近くに感じてみよう。':st.city?'地図のピンが、この街の位置です。<br>ほかの街も、下の一覧から探してみよう。':st.admin?'地域を拡大しました。<br>地図のピンや一覧から、気になる街を選ぼう。':st.country?'この国・地域の中には、どんな地域があるかな。<br>地図や一覧から都道府県・州・省を選ぼう。':r.desc;
 $('#detail').style.setProperty('--accent',r?.color||'#78b48b');$('#detail').innerHTML='<span class="detail-tag"><i></i>'+['地球からはじまる、小さな旅','エリアを探索中','国・地域を探索中','地域を探索中','街に到着'][d]+'</span>'+(st.city?'<div class="city-badge">⌖</div>':'')+'<h2>'+esc(title)+'</h2><p class="en">'+esc(en)+'</p><p class="description">'+desc+'</p>'+(!r?'<div class="journey"><div class="journey-title">旅のステップ</div>'+steps.map((s,i)=>'<div class="step '+(i===0?'active':'')+'"><b>0'+(i+1)+'</b>'+s+'<span>'+['REGION','COUNTRY','STATE','CITY'][i]+'</span></div>').join('')+'</div><div class="start-tip"><strong>● まずは、下のエリアから選んでみよう。</strong><br>地球の陸地をタップしても、旅をはじめられます。</div>':st.city?'<p class="coordinate">緯度 '+st.city.coords[1].toFixed(3)+'°<br>経度 '+st.city.coords[0].toFixed(3)+'°</p><p class="notice">主要都市の位置を示すプロトタイプです。市の行政境界・観光情報は今後追加できます。</p><button class="back" id="back">← '+esc(st.admin.properties.name)+'に戻る</button>':capitalLine()+'<div class="stats"><div><strong>'+items.length+'</strong><small>'+(!st.country?'国・地域':!st.admin?'行政区':'主要都市')+'</small></div>'+contStats()+'<div><strong>0'+Math.min(d+1,4)+'</strong><small>旅のステップ</small></div></div><p class="notice">'+(st.admin?'都市は代表地点のピンで表示しています。すべての市町村を網羅するものではありません。':st.country?'行政区の呼び方は国・地域によって異なります。地図の色は、隣り合う地域を見分けるためのものです。主要都市の表示は、国・地域の地位や主権についての見解を示すものではありません。':'地図と下の一覧は連動しています。国・地域を選ぶと、その行政区へ進めます。')+'</p><button class="back" id="back">← '+(st.admin?esc(st.country.properties.name):st.country?esc(r.name):'世界')+'に戻る</button>');if($('#back'))$('#back').onclick=()=>up(d-1);
 $('#listKicker').textContent=['CHOOSE YOUR REGION','CHOOSE YOUR COUNTRY','EXPLORE THE REGIONS','FIND YOUR CITY','FIND YOUR CITY'][d];$('#listTitle').innerHTML=(!r?'どのエリアへ行く？':st.admin?esc(st.admin.properties.name)+'の街':st.country?esc(st.country.properties.name)+'の地域':esc(r.name)+'の国・地域')+' <span>'+items.length+' '+(!r?'エリア':!st.country?'の国・地域':!st.admin?'行政区':'主要都市')+'</span>';
 $('#search').placeholder=(!r?'エリア':!st.country?'国・地域':!st.admin?'地域':'街')+'をさがす';$('#dataNote').textContent=st.admin?'※ 市は主要都市データによる代表地点です。市境・全市町村は未収録です。':'※ Natural Earth の概略地図を使用しています。小さな国・地域の一部は未収録です。エリアの区分は地理上の慣例によるもので、国・地域の地位や主権についての見解を示すものではありません。境界や名称も法的見解を示すものではありません。';cards();renderCultureDetail();
}
function stateIds(){return {region:st.region,country:st.country?.properties.id,admin:st.admin?.properties.id,city:st.city?.id}}
function saveHistory(){history.pushState(stateIds(),'','#'+[st.region,st.country?.properties.id,st.admin?.properties.id,st.city?.id].filter(Boolean).map(encodeURIComponent).join('/'))}
async function readAtlas(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data?.features)) throw new Error(`${url}: invalid map data`);
  return data;
}

async function go(change, push = true) {
  const token = ++busy;
  const country = change.country && countries.find(f => f.properties.id === change.country);
  const loading = $('#loading');
  $('#mapTooltip').hidden = true;

  if (country?.properties.hasAdmin && !cache[change.country]) {
    loading.textContent = '地域の地図を読み込んでいます…';
    loading.hidden = false;
    try {
      cache[change.country] = await readAtlas('assets/admin/' + encodeURIComponent(change.country) + '.json');
    } catch {
      if (token !== busy) return;
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.textContent = '地域の地図を読み込めませんでした。再試行';
      retry.onclick = () => go(change, push);
      loading.replaceChildren(retry);
      return;
    }
    if (token !== busy) return;
  }

  if (change.region) st = {region: change.region, country: null, admin: null, city: null};
  if (country) st = {region: country.properties.region, country, admin: null, city: null};
  if (change.admin) st = {...st, admin: activeAdmins().find(f => f.properties.id === change.admin) || null, city: null};
  if (change.city) st.city = st.admin?.properties.cities.find(c => c.id === change.city) || null;
  loading.hidden = true;
  mapFeatures = !st.country ? countries : (activeAdmins().length ? activeAdmins() : [st.country]);
  ui();
  updateMap();
  focusView();
  if (push) {
    saveHistory();
    $('#breadcrumbs').scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
function up(level,push=true){++busy;if(level<4)st.city=null;if(level<3)st.admin=null;if(level<2)st.country=null;if(level<1)st.region=null;$('#loading').hidden=true;mapFeatures=!st.country?countries:activeAdmins().length?activeAdmins():[st.country];ui();updateMap();focusView();if(push){saveHistory();$('#breadcrumbs').scrollIntoView({behavior:'smooth',block:'start'})}}
$('#search').addEventListener('input',cards);$('#brand').onclick=e=>{e.preventDefault();up(0)};$('#rotate').onclick=()=>{spinning=!spinning;$('#rotate').textContent=spinning?'Ⅱ 自動回転を停止':'▷ 自動回転を開始'};
function zoom(f){svg.interrupt();transitioning=false;projection.scale(Math.min(450000,Math.max(130,projection.scale()*f)));render()};$('#zoomIn').onclick=()=>zoom(1.3);$('#zoomOut').onclick=()=>zoom(1/1.3);$('#resetView').onclick=()=>focusView();
svg.call(d3.drag().on('start',()=>{dragging=true;moved=false;svg.interrupt();transitioning=false;$('#mapTooltip').hidden=true}).on('drag',e=>{if(Math.abs(e.dx)+Math.abs(e.dy)>1)moved=true;const r=projection.rotate(),k=65/projection.scale();projection.rotate([r[0]+e.dx*k,Math.max(-85,Math.min(85,r[1]-e.dy*k)),0]);render()}).on('end',()=>{dragging=false;setTimeout(()=>moved=false,100)}));
svg.on('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.08:1/1.08)},{passive:false});
function tick(t){if(t-last>45){let elapsed=last?Math.min(t-last,80):0;last=t;if(spinning&&!st.region&&!dragging&&!transitioning&&!document.hidden){let r=projection.rotate();r[0]+=elapsed*.003;projection.rotate(r);render()}}requestAnimationFrame(tick)}
function restoreLocation() {
  const [region, country, admin, city] = location.hash.slice(1).split('/').map(part => {
    try {
      return decodeURIComponent(part);
    } catch {
      return '';
    }
  });
  if (reg(region)) return go({region, country, admin, city}, false);
  up(0, false);
}

async function init() {
  try {
    const world = await readAtlas('assets/world.json');
    countries = world.features.filter(f => reg(f.properties.region));
    mapFeatures = countries;
    ui();
    updateMap();
  } catch (error) {
    $('#loading').textContent = '地図を読み込めませんでした。ページを再読み込みしてください。';
    console.error(error);
    return;
  }

  $('#loading').hidden = true;
  document.querySelectorAll('#continents [data-go-region]').forEach(button => {
    button.onclick = () => {
      go({region: button.dataset.goRegion});
      $('.explorer').scrollIntoView({behavior: 'smooth', block: 'start'});
    };
  });
  window.addEventListener('popstate', restoreLocation);
  if (location.hash) restoreLocation();
  requestAnimationFrame(tick);
}

init();
