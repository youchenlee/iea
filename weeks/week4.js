// weeks/week4.js — Week 4: The Grumpy Old Giant
window.WEEK_DATA = {
  title: 'The Grumpy Old Giant',
  titleEmoji: '🏰',

  feelings: [
    { word: 'grumpy',   zh: '暴躁的',   emoji: '😤', color: '#E17055' },
    { word: 'lonely',   zh: '孤單的',   emoji: '😔', color: '#B2BEC3' },
    { word: 'selfish',  zh: '自私的',   emoji: '😒', color: '#A29BFE' },
    { word: 'scared',   zh: '害怕的',   emoji: '😨', color: '#81ECEC' },
    { word: 'sorry',    zh: '抱歉的',   emoji: '😢', color: '#74B9FF' },
    { word: 'gentle',   zh: '溫柔的',   emoji: '🤗', color: '#FF85CA' },
    { word: 'joyful',   zh: '快樂的',   emoji: '😄', color: '#FFD93D' },
    { word: 'kind',     zh: '善良的',   emoji: '💛', color: '#FFEAA7' },
  ],

  sightWords: [
    { word: 'salty',   zh: '鹹的',     sentence: 'The soup is too salty.' },
    { word: 'sweet',   zh: '甜的',     sentence: 'The candy tastes sweet.' },
    { word: 'sour',    zh: '酸的',     sentence: 'The lemon is very sour.' },
    { word: 'bitter',  zh: '苦的',     sentence: 'This medicine tastes bitter.' },
    { word: 'hard',    zh: '硬的',     sentence: 'The rock is very hard.' },
    { word: 'soft',    zh: '軟的',     sentence: 'This toy is soft.' },
    { word: 'rough',   zh: '粗糙的',   sentence: 'The tree bark feels rough.' },
    { word: 'smooth',  zh: '光滑的',   sentence: 'The table is smooth.' },
    { word: 'loud',    zh: '大聲的',   sentence: 'The music is very loud.' },
    { word: 'quiet',   zh: '安靜的',   sentence: 'The library is quiet.' },
    { word: 'dark',    zh: '暗的',     sentence: 'The room is very dark.' },
    { word: 'light',   zh: '明亮的',   sentence: 'The garden is bright and light.' },
    { word: 'game',    zh: '遊戲',     sentence: 'Let us play a game!' },
    { word: 'garden',  zh: '花園',     sentence: 'The giant has a big garden.' },
    { word: 'gave',    zh: '給了',     sentence: 'She gave me a flower.' },
    { word: 'get',     zh: '得到',     sentence: 'Can I get some water?' },
    { word: 'girl',    zh: '女孩',     sentence: 'The girl is very kind.' },
    { word: 'give',    zh: '給',       sentence: 'Give it back to me.' },
    { word: 'glad',    zh: '開心的',   sentence: 'I am glad you are here.' },
    { word: 'go',      zh: '去',       sentence: 'Let us go to the garden.' },
    { word: 'goat',    zh: '山羊',     sentence: 'The goat eats the grass.' },
  ],

  sightColors: ['#FF6B6B','#A29BFE','#FFD93D','#00B894','#FF85CA','#74B9FF','#E17055','#FD79A8','#00CEC9','#6C5CE7','#55EFC4'],

  sentenceGroups: [
    { title: '🏰 The Grumpy Old Giant', count: 22 },
    { title: '👅 Taste & Touch', count: 5 },
  ],

  sentences: [
    // The Grumpy Old Giant (22)
    { en: 'Once upon a time, there was a grumpy old giant.', zh: '從前從前，有一個脾氣暴躁的老巨人。' },
    { en: 'He lived in a big, big house with a beautiful garden.', zh: '他住在一棟大大的房子裡，旁邊有一座很美的花園。' },
    { en: 'Every tree in the garden had sweet, colorful fruit.', zh: '花園裡每棵樹上都結滿了甜美、五彩繽紛的水果。' },
    { en: 'There were small red ones and big purple ones.', zh: '有紅色的小水果，也有紫色的大水果。' },
    { en: 'Little birds sang in the trees all day long.', zh: '小鳥在樹上整天嘰嘰喳喳地唱著歌。' },
    { en: 'Snails walked slowly on the soft green grass.', zh: '蝸牛在柔軟的綠色草地上悠悠哉哉地散步。' },
    { en: 'It was the most wonderful place.', zh: '這是一個最美好的地方。' },
    { en: 'Many children loved to play games in the garden.', zh: '很多小朋友很喜歡來花園裡玩遊戲。' },
    { en: 'But one day, the giant came back from his long trip.', zh: '但有一天，巨人從很遠的地方旅行回來了。' },
    { en: 'He saw the children and became very angry.', zh: '他看到小朋友們就變得很生氣。' },
    { en: 'The giant shouted in a loud voice,', zh: '巨人大聲吼道：' },
    { en: '"What are you doing here? This is my garden! Get out!"', zh: '「你們在這裡做什麼？這是我的花園！快出去！」' },
    { en: 'The children were so scared that they all ran away.', zh: '小朋友們嚇得全部跑走了。' },
    { en: 'The selfish giant built a tall wall around his garden.', zh: '自私的巨人在花園四周築起了高高的圍牆。' },
    { en: 'Without the children, the garden became dark and cold.', zh: '沒有了小朋友，花園變得又暗又冷。' },
    { en: 'The flowers stopped growing and the birds stopped singing.', zh: '花不再開了，鳥也不唱歌了。' },
    { en: 'The giant felt very lonely.', zh: '巨人覺得好孤單。' },
    { en: 'One morning, a little girl climbed over the wall.', zh: '有一天早上，一個小女孩爬過了圍牆。' },
    { en: 'She sat under a tree, and the tree began to bloom.', zh: '她坐在一棵樹下，那棵樹突然開始開花了。' },
    { en: 'The giant felt sorry. He said, "I have been so selfish!"', zh: '巨人覺得很慚愧。他說：「我真是太自私了！」' },
    { en: 'He knocked down the wall and gave the garden back to the children.', zh: '他推倒了圍牆，把花園還給了小朋友們。' },
    { en: 'The kind giant and the children played together happily in the garden.', zh: '善良的巨人和小朋友們在花園裡開心地一起玩耍。' },
    // Taste & Touch — Sentence Patterns (5)
    { en: 'This toy is soft.', zh: '這個玩具是軟的。' },
    { en: 'This rock is hard.', zh: '這塊石頭是硬的。' },
    { en: 'The candy tastes sweet.', zh: '糖果嚐起來甜甜的。' },
    { en: 'The music is very loud.', zh: '音樂非常大聲。' },
    { en: 'The garden is quiet and peaceful again.', zh: '花園再次安靜而平和。' },
  ],

  weeklyQuote: { en: 'A kind heart is the best garden.', emoji: '🌸' },
  weeklySong: { title: 'If You\'re Happy and You Know It', line: 'If you\'re happy and you know it, clap your hands!' },

  dialogues: [],
};
