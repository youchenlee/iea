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
    // Level 3 sight words
    { word: 'name',    zh: '名字',     sentence: 'What is her name?' },
    { word: 'good',    zh: '好的',     sentence: 'You are great and good.' },
    { word: 'sentence', zh: '句子',    sentence: 'Read one sentence.' },
    { word: 'man',     zh: '男人',     sentence: 'See that man.' },
    { word: 'think',   zh: '想',       sentence: 'Think on it.' },
    { word: 'say',     zh: '說',       sentence: 'What did you say?' },
    { word: 'great',   zh: '很棒的',   sentence: 'You are great!' },
    { word: 'where',   zh: '哪裡',     sentence: 'Where do I go?' },
    { word: 'help',    zh: '幫忙',     sentence: 'Help me up.' },
    { word: 'through', zh: '穿過',     sentence: 'Through the day.' },
  ],

  sightColors: ['#FF6B6B','#A29BFE','#FFD93D','#00B894','#FF85CA','#74B9FF','#E17055','#FD79A8','#00CEC9','#6C5CE7','#55EFC4'],

  sentenceGroups: [
    { title: '🏰 The Grumpy Old Giant', count: 16 },
    { title: '👅 Taste & Touch', count: 5 },
  ],

  sentences: [
    // The Grumpy Old Giant (16)
    { en: 'Once upon a time, there was a big, old, grumpy giant.', zh: '從前從前，有一個又大又老、脾氣又暴躁的巨人。' },
    { en: 'He lived in a quiet and dark part of the forest.', zh: '他住在森林裡一個安靜又黑暗的地方。' },
    { en: 'His house was rough looking with a massive garden and a goat wandering around eating the grass.', zh: '他的房子看起來很粗糙，旁邊有一個很大的花園，還有一隻山羊在四處吃草。' },
    { en: 'Every day a little girl walked past his house and shouted, "Good day, Mr. Giant! Will you come play a game with me?"', zh: '每天都有一個小女孩經過他的房子並喊道：「巨人先生你好！你要不要跟我一起玩遊戲？」' },
    { en: 'He just gave a loud roar, "Get out of here. I\'m not going anywhere!"', zh: '他只是大聲咆哮：「從這裡滾開。我哪裡都不去！」' },
    { en: 'With a soft voice, she would say, "I will give you some cookies. I will come back tomorrow."', zh: '她用輕柔的聲音說：「我會給你一些餅乾。我明天會再回來的。」' },
    { en: 'She left a bag of sour dough and salty cookies on his doorstep.', zh: '她留了一袋酸麵糰和鹹餅乾在階梯上。' },
    { en: 'Time passed by.', zh: '時間慢慢過去。' },
    { en: 'The little girl never gave up.', zh: '那小女孩不曾放棄。' },
    { en: 'The giant started to wonder why this girl wanted to be his friend.', zh: '巨人開始好奇為什麼這個小女孩想成為他的朋友。' },
    { en: 'A few days later, to the girl\'s surprise, the giant had a different reply.', zh: '幾天後，讓小女孩驚訝的是，巨人給了不一樣的回應。' },
    { en: '"I will play a game with you."', zh: '「我願意跟你玩遊戲。」' },
    { en: '"I\'m so glad you came to play, Mr. Giant."', zh: '「我很開心你願意來玩，巨人先生。」' },
    { en: 'The giant smiled.', zh: '巨人露出微笑。' },
    { en: 'They played until the moon light came out.', zh: '他們一直玩到月亮出來才願意休息呢。' },
    // Taste & Touch — Sentence Patterns (5)
    { en: 'This toy is soft.', zh: '這個玩具是軟的。' },
    { en: 'This rock is hard.', zh: '這塊石頭是硬的。' },
    { en: 'The candy tastes sweet.', zh: '糖果嚐起來甜甜的。' },
    { en: 'The music is very loud.', zh: '音樂非常大聲。' },
    { en: 'The garden is quiet and peaceful again.', zh: '花園再次安靜而平和。' },
  ],

  weeklyQuote: { en: 'A kind heart is the best garden.', emoji: '🌸' },
  weeklySong: { title: 'It\'s A Small World (After All)', line: 'It\'s a small world after all' },

  dialogues: [
    { q: 'What are these?', qzh: '這些是什麼？', a: 'Those are granny\'s fruits. They feel rough but taste sweet.', azh: '那些是奶奶的水果。它們摸起來粗粗的但嚐起來甜甜的。' },
    { q: 'Have you ever felt a smooth rock?', qzh: '你有摸過光滑的石頭嗎？', a: 'Yes! Those felt really soft and smooth.', azh: '有！那些摸起來又軟又滑。' },
    { q: 'Do you like the sour ones or the sweet ones?', qzh: '你喜歡酸的還是甜的？', a: 'I like the sweet ones because they taste like honey!', azh: '我喜歡甜的，因為嚐起來像蜂蜜！' },
  ],
};
