/**
 * ==============================================================================
 * جزيرة الوقت - Time Island
 * المحرك البرمجي التفاعلي والصوتي للأطفال
 * يتضمن:
 * 1. حكاية أصدقاء الوقت الكرتونية (تكتك المنبه ⏰، سلحوف عقرب الساعات 🐢، أرنوب عقرب الدقائق 🐇)
 * 2. محرك الشرح الصوتي التفاعلي خطوة بخطوة بالرسوم الكرتونية
 * 3. ثنائي اللغة بالكامل (العربية هي الافتراضية مع إمكانية التبديل للإنجليزية)
 * 4. بنك التحديات والاختبارات العشوائية مع الاحتفالات الضخمة
 * ==============================================================================
 */

const TRANSLATIONS = {
  ar: {
    appTitle: "جزيرة الوقت ⏰ مغامرة تعلّم الساعة للأبطال",
    logoTitle: "جزيرة الوقت",
    logoSubtitle: "مغامرة تعلّم الساعة للأبطال",
    childDefaultName: "البطل",
    partyBtn: "احتفال!",
    soundTitle: "كتم / تفعيل الصوت",
    tabExplore: "العب واستكشف",
    tabLessons: "حكاية تكتك وسلحوف",
    tabQuiz: "تحدي الأبطال",
    storyBadge: "حكاية أصدقاء الوقت",
    quizStreakLabel: "السؤال:",
    quizSettingsBtn: "⚙️ إعداد",
    quizMissionTag: "🎯 مهمتك يا بطل:",
    exploreMascotDefault: "أهلاً يا بطل! أنا صديقك <strong>«تكتُك»</strong>. اسحب العقارب بإصبعك وشاهد ماذا يحدث!",
    listenBtn: "🔊 استمع",
    lessonChip1: "1. سلحوف الهادئ",
    lessonChip2: "2. سباق أرنوب",
    lessonChip3: "3. قمة الـ 12",
    lessonChip4: "4. بيتزا النصف والربع",
    lessonChip5: "5. قفزات الخمسات",
    storyListenBtn: "استمع للحكاية",
    storyAnimateBtn: "شاهد الحركة 🎬",
    storyTaskBadge: "مهمتك يا بطل:",
    storyTaskCheckBtn: "تحقّق من مهمتي ✨",
    storyTaskHelpBtn: "مساعدة تكتك 🪄",
    prevChapterBtn: "⬅️ السابق",
    nextChapterBtn: "التالي ➡️",
    toggleMinutesGuide: "أرقام الدقائق (05, 10..)",
    toggleSector: "شريحة النصف والربع",
    hourHandText: "ساعة 🐢",
    minuteHandText: "دقيقة 🐇",
    digitalLabel: "الساعة الرقمية",
    phraseLabel: "النطق بالكلمات",
    dayPeriod: "نهاراً ☀️",
    nightPeriod: "ليلاً 🌙",
    checkAnswerBtn: "تحقّق من إجابتي يا تكتك!",
    nextQuestionBtn: "السؤال التالي ⬅️",
    newRoundBtn: "جولة تحدي جديدة بأوقات جديدة!",
    assistBtn: "🪄 مساعدة تكتك",
    shuffleBtn: "🔄 وقت آخر",
    quickHour: "+1 ساعة",
    quick30: "+30 دقيقة (نصف)",
    quick15: "+15 دقيقة (ربع)",
    quick5: "+5 دقائق",
    quickNow: "الوقت الحالي الآن ⚡",
    tip1Badge: "العقرب الأزرق (سلحوف)",
    tip1Text: "هو <strong>عقرب الساعات</strong>: قصير وبطيء، يخبرك في أي ساعة نحن الآن.",
    tip2Badge: "العقرب البرتقالي (أرنوب)",
    tip2Text: "هو <strong>عقرب الدقائق</strong>: طويل وسريع، يخبرك كم دقيقة مرت.",
    tip3Badge: "سر البيتزا 🍕",
    tip3Text: "شريحة البيتزا توضح النصف والربع بتقسيم الدائرة بشكل ملون شهي!",
    tip4Badge: "الشمس والقمر ☀️🌙",
    tip4Text: "راقب السماء في الخلفية؛ ستشرق الشمس نهاراً وتظهر النجوم ليلاً!",
    footerMadeBy: "صُنع بحب بواسطة",
    engineerName: "المهندسة أسماء محمد عبد الرءوف",
    footerQuote: "«الوقت هو أثمن ما نملك.. بالمتعة واللعب نبني عباقرة المستقبل» ⏰✨",
    nameModalTitle: "أهلاً بك في جزيرة الوقت!",
    nameModalDesc: "أنا صديقك <strong>«تكتُك»</strong>.. ما هو اسمك الجميل لنبدأ المغامرة معاً؟",
    nameModalPlaceholder: "اكتب اسمك هنا (مثال: عمر، مريم، يوسف..)",
    nameModalBtn: "انطلق في المغامرة!",
    celebrationTitle: "ألف مبروك يا بطل الأبطال!",
    celebrationSubtitle: "لقد أتممت الاختبار بنجاح باهر وتألقت في معرفة الوقت!",
    summaryDoneLabel: "أسئلة منجزة",
    summaryStarsLabel: "نجوم ذهبية",
    summaryRatingLabel: "التقييم",
    summaryRatingVal: "ممتاز!",
    celebrationNewQuizBtn: "بدء اختبار جديد وتحدٍ ممتع!",
    quizSetupTitle: "تجهيز الاختبار الجديد",
    quizSetupDesc: "اختر تفاصيل التحدي يا بطل لتنطلق في المغامرة!",
    setupNameLabel: "👑 اسم البطل المشارك في الاختبار:",
    setupNamePlaceholder: "اكتب اسم البطل هنا...",
    setupNameHint: "تأكد من اسمك لتسجيل كل نجومك وبطولاتك باسمك! ⭐",
    setupCountLabel: "🎯 كم عدد أسئلة هذا الاختبار؟",
    setupCountFast: "تحدي سريع ⚡",
    setupCountRecommended: "الموصى به ⭐",
    setupCountGenius: "تحدي العباقرة 🏆",
    setupStartBtn: "انطلق في الاختبار الآن!",
    langBtn: "English"
  },
  en: {
    appTitle: "Time Island ⏰ Kids Clock Adventure",
    logoTitle: "Time Island",
    logoSubtitle: "Clock Learning Adventure",
    childDefaultName: "Champion",
    partyBtn: "Party!",
    soundTitle: "Mute / Unmute Sound",
    tabExplore: "Play & Explore",
    tabLessons: "Story of Turtle & Bunny",
    tabQuiz: "Heroes Challenge",
    storyBadge: "Time Friends Story",
    quizStreakLabel: "Question:",
    quizSettingsBtn: "⚙️ Setup",
    quizMissionTag: "🎯 Your Mission, Hero:",
    exploreMascotDefault: "Hello champion! I am your friend <strong>“Tick-Tock”</strong>. Drag the clock hands with your finger and explore!",
    listenBtn: "🔊 Listen",
    lessonChip1: "1. Calm Turtle",
    lessonChip2: "2. Bunny Race",
    lessonChip3: "3. Peak of 12",
    lessonChip4: "4. Pizza Break",
    lessonChip5: "5. Bunny Hops",
    storyListenBtn: "Listen to Story",
    storyAnimateBtn: "Watch Animation 🎬",
    storyTaskBadge: "Your Mission, Hero:",
    storyTaskCheckBtn: "Check My Mission ✨",
    storyTaskHelpBtn: "Tick-Tock Help 🪄",
    prevChapterBtn: "⬅️ Previous",
    nextChapterBtn: "Next ➡️",
    toggleMinutesGuide: "Minute Numbers (05, 10..)",
    toggleSector: "Half & Quarter Slice",
    hourHandText: "Hour 🐢",
    minuteHandText: "Min 🐇",
    digitalLabel: "Digital Clock",
    phraseLabel: "In Words",
    dayPeriod: "Day ☀️",
    nightPeriod: "Night 🌙",
    checkAnswerBtn: "Check my answer, Tick-Tock!",
    nextQuestionBtn: "Next Question ➡️",
    newRoundBtn: "New Challenge Round with Fresh Times!",
    assistBtn: "🪄 Tick-Tock Assist",
    shuffleBtn: "🔄 Another Time",
    quickHour: "+1 Hour",
    quick30: "+30 Min (Half)",
    quick15: "+15 Min (Quarter)",
    quick5: "+5 Min",
    quickNow: "Current Time Now ⚡",
    tip1Badge: "Blue Hand (Turtle)",
    tip1Text: "The <strong>Hour Hand</strong>: short & slow, tells which hour of the day it is.",
    tip2Badge: "Orange Hand (Bunny)",
    tip2Text: "The <strong>Minute Hand</strong>: long & fast, tells how many minutes passed.",
    tip3Badge: "Pizza Secret 🍕",
    tip3Text: "The pizza slice makes halves and quarters super easy and tasty to see!",
    tip4Badge: "Sun & Moon ☀️🌙",
    tip4Text: "Watch the sky: bright sun by day, glowing stars and moon by night!",
    footerMadeBy: "Made with love by",
    engineerName: "Eng. Asmaa Mohammed Abdelraouf",
    footerQuote: "“Time is our greatest treasure.. through fun and play, we nurture the geniuses of tomorrow” ⏰✨",
    nameModalTitle: "Welcome to Time Island!",
    nameModalDesc: "I am your friend <strong>“Tick-Tock”</strong>.. What's your wonderful name so we can explore together?",
    nameModalPlaceholder: "Type your name here (e.g. Omar, Maryam, Adam..)",
    nameModalBtn: "Start Adventure!",
    celebrationTitle: "Congratulations, Grand Champion!",
    celebrationSubtitle: "You finished the challenge with flying colors and mastered the clock!",
    summaryDoneLabel: "Completed",
    summaryStarsLabel: "Gold Stars",
    summaryRatingLabel: "Rating",
    summaryRatingVal: "Superb!",
    celebrationNewQuizBtn: "Start a Fun New Quiz!",
    quizSetupTitle: "Prepare New Quiz",
    quizSetupDesc: "Pick your challenge options, champion, and let's go!",
    setupNameLabel: "👑 Hero's Name for this Quiz:",
    setupNamePlaceholder: "Type hero name here...",
    setupNameHint: "Double check your name to collect all your stars! ⭐",
    setupCountLabel: "🎯 How many questions in this quiz?",
    setupCountFast: "Quick ⚡",
    setupCountRecommended: "Recommended ⭐",
    setupCountGenius: "Genius 🏆",
    setupStartBtn: "Launch Quiz Now!",
    langBtn: "عربي"
  }
};

/**
 * فصول الحكاية الكرتونية التفاعلية (أصدقاء الوقت)
 */
const STORY_CHAPTERS = [
  {
    id: 1,
    time: [3, 0],
    focusHand: 'hour',
    speakerAr: '⏰ تكتُك يحكي:',
    speakerEn: '⏰ Tick-Tock narrates:',
    titleAr: 'الفصل 1: لقاء سلحوف الهادئ (عقرب الساعات الأزرق 🐢)',
    titleEn: 'Chapter 1: Meeting Calm Turtle (The Blue Hour Hand 🐢)',
    storyAr: 'يا هلا يا أبطال! أنا صديقكم تكتُك.. في يوم مشمس جميل، قابلت صديقي «سلحوف» السلحفاة الهادئة. سلحوف يمشي بهدوء شديد وخطواته قصيرة ومحسوبة، تماماً مثل <strong>العقرب الأزرق القصير</strong>! هو يحب أن يقف عند كل رقم ساعة ليرتاح ساعة كاملة. الآن سلحوف يقف عند الرقم 3، وهذا يعني أن الساعة هي الثالثة!',
    storyEn: 'Hello champions! I am your friend Tick-Tock.. On a sunny day, I met my sweet friend "Turtle"! Turtle walks very slowly with short, calm steps, just like our <strong>short blue Hour Hand</strong>! He loves stopping at each hour number to rest for a full hour. Right now, Turtle is resting at 3, which means it is 3 o\'clock!',
    taskAr: 'اسحب صديقنا سلحوف (العقرب الأزرق) ليرتاح عند الرقم 5 تماماً!',
    taskEn: 'Drag our friend Turtle (the blue hand) to rest at number 5!',
    targetHour: 5,
    targetMin: 0,
    congratsAr: 'رائع جداً! لقد ساعدت سلحوف في الوصول إلى الرقم 5 ليرتاح هناك! أحسنت صنعاً يا ذكي! 🌟',
    congratsEn: 'Awesome! You helped Turtle reach number 5 to rest! Well done, smart hero! 🌟'
  },
  {
    id: 2,
    time: [12, 15],
    focusHand: 'minute',
    speakerAr: '⏰ تكتُك يحكي:',
    speakerEn: '⏰ Tick-Tock narrates:',
    titleAr: 'الفصل 2: سباق أرنوب النفاث (عقرب الدقائق البرتقالي 🐇)',
    titleEn: 'Chapter 2: Jet Bunny\'s Big Race (The Orange Minute Hand 🐇)',
    storyAr: 'وفجأة، زوووم! ظهر صديقنا «أرنوب» السريع كالصاروخ! أرنوب نشيط جداً ولا يحب الجلوس، تماماً مثل <strong>العقرب البرتقالي الطويل</strong>! أرنوب يحب الركض في مضمار دائرة الساعة، ويقطع 60 خطوة دقيقة في كل جولة كاملة بينما سلحوف يخطو خطوة واحدة فقط!',
    storyEn: 'Suddenly, whoosh! Here comes our speedy buddy "Bunny"! Bunny is energetic and loves dashing around, just like the <strong>long orange Minute Hand</strong>! Bunny runs 60 little minute steps in a full circle around the clock, while Turtle takes only one single step!',
    taskAr: 'ساعد أرنوب في الركض نصف دورة في المضمار ليصل للأسفل عند الرقم 6 (:30 دقيقة)!',
    taskEn: 'Help Bunny run half a lap around the track to reach the bottom at number 6 (:30 mins)!',
    targetHour: null,
    targetMin: 30,
    congratsAr: 'يا سلام عليك! ركض أرنوب نصف دورة كاملة وقطع 30 دقيقة بنجاح! 🚀',
    congratsEn: 'Woohoo! Bunny ran half a lap and completed 30 minutes successfully! 🚀'
  },
  {
    id: 3,
    time: [5, 0],
    focusHand: 'minute',
    speakerAr: '⏰ تكتُك يحكي:',
    speakerEn: '⏰ Tick-Tock narrates:',
    titleAr: 'الفصل 3: قمة جبل الـ 12 وسر الساعة تماماً 🔔',
    titleEn: 'Chapter 3: The Summit of 12 & The Secret of O\'Clock 🔔',
    storyAr: 'عندما يصعد أرنوب النشيط إلى أعلى قمة في جزيرة الوقت، وهي الرقم 12 في الأعلى تماماً، يدق جرس البرج السحري بصوت رنان: دينغ دونغ! هنا تبدأ ساعة جديدة ويكون عدد الدقائق صفراً، فنقول: <strong>الساعة تماماً!</strong> (مثل الساعة 5:00 تماماً).',
    storyEn: 'Whenever active Bunny climbs to the highest peak on Time Island, right at number 12 at the very top, the magic bell rings loud and clear: Ding Dong! A fresh new hour begins with zero minutes, and we announce: <strong>It is O\'Clock!</strong> (like 5:00 o\'clock sharp).',
    taskAr: 'اجعل أرنوب يقف في القمة عند 12، وسلحوف عند 7 لنسمع جرس السابعة تماماً!',
    taskEn: 'Place Bunny at the peak (12) and Turtle at 7 to hear the bell strike 7 o\'clock!',
    targetHour: 7,
    targetMin: 0,
    congratsAr: 'دينغ دونغ! جرس السابعة يدق الآن! أتقنت سر الساعة تماماً يا بطل! 🔔🎉',
    congratsEn: 'Ding Dong! The 7 o\'clock bell is ringing! You mastered O\'clock, champion! 🔔🎉'
  },
  {
    id: 4,
    time: [4, 30],
    focusHand: 'both',
    showPizza: true,
    speakerAr: '⏰ تكتُك يحكي:',
    speakerEn: '⏰ Tick-Tock narrates:',
    titleAr: 'الفصل 4: استراحة بيتزا النصف والربع 🍕',
    titleEn: 'Chapter 4: Pizza Break: Half & Quarter Past 🍕',
    storyAr: 'بعد السباق، شعر سلحوف وأرنوب بالجوع، فطلبا شطيرة بيتزا دائرية تشبه ساعتنا! عندما جلس أرنوب عند الرقم 6، قسم البيتزا إلى <strong>نصفين متساويين</strong>، فصارت الساعة <strong>والنصف (:30 دقيقة)</strong>! وعندما جلس عند 3، أكل <strong>ربع البيتزا (:15 دقيقة)</strong>!',
    storyEn: 'After the race, Turtle and Bunny were hungry and ordered a round pizza looking just like our clock! When Bunny sat at number 6, he cut the pizza into <strong>two equal halves</strong>, making it <strong>Half Past (:30 minutes)</strong>! And at number 3, that is <strong>Quarter Past (:15 minutes)</strong>!',
    taskAr: 'اضغط زر شريحة البيتزا واجعل أرنوب يقف عند 3 لنأكل ربع البيتزا (:15 دقيقة)!',
    taskEn: 'Turn on Pizza Slice and place Bunny at number 3 to eat quarter of the pizza (:15 mins)!',
    targetHour: null,
    targetMin: 15,
    congratsAr: 'يممم! شريحة ربع البيتزا اللذيذة! الآن تعرف أن 15 دقيقة تعني ربع ساعة! 🍕😋',
    congratsEn: 'Yummy! A delicious quarter pizza slice! Now you know 15 minutes is quarter past! 🍕😋'
  },
  {
    id: 5,
    time: [8, 20],
    focusHand: 'minute',
    showGuides: true,
    speakerAr: '⏰ تكتُك يحكي:',
    speakerEn: '⏰ Tick-Tock narrates:',
    titleAr: 'الفصل 5: قفزات الأرنب السحرية بالخمسات 🦘',
    titleEn: 'Chapter 5: Bunny\'s Magic Hops by 5s 🦘',
    storyAr: 'اكتشف أرنوب سراً مذهلاً! بين كل رقمين على الساعة توجد 5 خطوات سرية! فيقفز أرنوب قفزات خمسات سحرية: من 12 إلى 1 (5 دقائق)، وإلى 2 (10)، وإلى 3 (15)، وإلى 4 (20)! اضرب رقم الساعة في 5 وستعرف كم دقيقة ركض أرنوب!',
    storyEn: 'Bunny discovered a secret superpower! Between every two numbers on the clock, there are 5 hidden steps! Bunny hops by 5s: from 12 to 1 (5 mins), to 2 (10), to 3 (15), to 4 (20)! Just multiply the number by 5 to know how many minutes Bunny ran!',
    taskAr: 'حرّك أرنوب ليقفز 4 قفزات خماسية حتى الرقم 4 ليركض 20 دقيقة كاملة!',
    taskEn: 'Move Bunny to hop 4 times to number 4 to run 20 full minutes!',
    targetHour: null,
    targetMin: 20,
    congratsAr: 'مذهل ورائع! 4 قفزات × 5 = 20 دقيقة! لقد أتممت كل فصول الحكاية وأصبحت بطل أصدقاء الوقت! 👑🏆🎉',
    congratsEn: 'Incredible! 4 hops × 5 = 20 minutes! You completed all story chapters and earned the Time Master Crown! 👑🏆🎉'
  }
];

class KidsClockApp {
  constructor() {
    // اللغة المختارة (العربية هي الافتراضية دائماً كما طُلب)
    this.currentLang = localStorage.getItem('kids_clock_lang') || 'ar';

    // الحالة الأساسية للتطبيق
    this.currentHours = 12;
    this.currentMinutes = 0;
    this.is24Hour = false;
    this.starsCount = 0;
    this.soundEnabled = true;
    this.activeMode = 'explore'; // 'explore' | 'lessons' | 'quiz'
    this.isDayTime = true; // حالة النهار ☀️ أو الليل 🌙
    this.childName = localStorage.getItem('kids_clock_child_name') || ''; // اسم الطفل المحفوظ
    this.currentLessonId = 1;

    // حالة السحب والتحريك
    this.isDragging = false;
    this.draggedHand = null; // 'hour' | 'minute'
    this.centerCoord = { x: 200, y: 200 };

    // خيارات الإرشاد البصري
    this.showMinuteGuides = true;
    this.showPizzaSector = false;

    // حالة المسابقة والاختبارات التفاعلية المتجددة
    this.currentQuizIndex = 0;
    this.quizQuestionsCount = 5; // عدد أسئلة الاختبار المختار (افتراضياً 5)
    this.currentQuizCorrectCount = 0; // عدد الإجابات الصحيحة في الاختبار الحالي
    this.quizQuestions = this.generateRandomQuizQuestions(this.quizQuestionsCount);

    // تهيئة محرك الصوت الداخلي (Web Audio API)
    this.initAudioEngine();

    // ربط عناصر DOM
    this.bindDOMElements();

    // تطبيق اللغة وتحديث النصوص الأولية
    this.applyLanguage();

    // بناء رسوم الساعة (الأرقام والشرطات التناظرية)
    this.generateClockFaceElements();

    // ربط الأحداث التفاعلية (اللمس، الماوس، الأزرار)
    this.attachEventListeners();

    // تشغيل نظام النجوم والاحتفالات في الخلفية
    this.initConfetti();

    // تحديث الواجهة إلى الحالة المبدئية
    document.body.setAttribute('data-mode', this.activeMode || 'explore');
    this.setTime(10, 10, false);
    this.updateSkyAndPeriod();

    // تهيئة اسم الطفل وعرض نافذة الترحيب
    if (this.childName) {
      this.childNameDisplay.textContent = this.childName;
      const welcome = this.currentLang === 'ar'
        ? `أهلاً بعودتك يا بطلنا <strong>«${this.childName}»</strong>! أنا صديقك تكتك، جاهز لمغامرة اليوم؟`
        : `Welcome back, champion <strong>"${this.childName}"</strong>! I'm your friend Tick-Tock, ready for today's adventure?`;
      this.setMascotMessage(welcome);
    } else {
      setTimeout(() => this.openNameModal(), 450);
    }
  }

  /* --------------------------------------------------------------------------
     1. محرك الصوت المدمج (Web Audio API - لا يحتاج ملفات خارجية)
     -------------------------------------------------------------------------- */
  initAudioEngine() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    } catch (e) {
      console.warn('Web Audio API not supported on this browser.');
    }
  }

  ensureAudioUnlocked() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // صوت نقرة التكتكة الخشبية الواقعية
  playTickSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioUnlocked();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.045);
  }

  // صوت رنين الأجراس عند الساعة تماماً
  playChimeSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioUnlocked();

    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chimeFreqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = this.audioCtx.currentTime + (idx * 0.12);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.75);
    });
  }

  // صوت قفزة الأرنب الكرتونية اللطيفة (Pop Hop)
  playHopSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioUnlocked();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }

  // صوت الاحتفال والفوز (ألحان بهيجة)
  playCelebrationFanfare() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioUnlocked();

    const melody = [
      { f: 440, d: 0.1 },  // A4
      { f: 554, d: 0.1 },  // C#5
      { f: 659, d: 0.12 }, // E5
      { f: 880, d: 0.4 }   // A5
    ];

    let t = this.audioCtx.currentTime;
    melody.forEach(note => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = note.f;

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.9;
    });
  }

  // معزوفة النصر الكبرى الفخمة عند التتويج
  playGrandFanfare() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioUnlocked();

    const grandChords = [
      { f: 523.25, d: 0.14 }, // C5
      { f: 659.25, d: 0.14 }, // E5
      { f: 783.99, d: 0.14 }, // G5
      { f: 1046.50, d: 0.28 }, // C6
      { f: 880.00, d: 0.16 },  // A5
      { f: 1046.50, d: 0.18 }, // C6
      { f: 1318.51, d: 0.65 }  // E6
    ];

    let t = this.audioCtx.currentTime;
    grandChords.forEach((note, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = i === grandChords.length - 1 ? 'sine' : 'triangle';
      osc.frequency.value = note.f;

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.88;
    });
  }

  // صوت التنبيه اللطيف عند الخطأ
  playOopsSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioUnlocked();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, this.audioCtx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.26);
  }

  // النطق الصوتي بلغتين (العربية والإنجليزية) مع إشعار البداية والنهاية
  speakText(text, onEndCallback = null) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.currentLang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.15;

    if (this.storyListenBtn) {
      this.storyListenBtn.classList.add('speaking');
    }

    utterance.onend = () => {
      if (this.storyListenBtn) {
        this.storyListenBtn.classList.remove('speaking');
      }
      if (typeof onEndCallback === 'function') {
        onEndCallback();
      }
    };

    utterance.onerror = () => {
      if (this.storyListenBtn) {
        this.storyListenBtn.classList.remove('speaking');
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  speakArabic(text) {
    this.speakText(text);
  }

  /* --------------------------------------------------------------------------
     2. ربط عناصر واجهة المستخدم DOM
     -------------------------------------------------------------------------- */
  bindDOMElements() {
    this.langToggleBtn = document.getElementById('langToggleBtn');
    this.currentLangLabel = document.getElementById('currentLangLabel');

    this.svgClock = document.getElementById('interactiveClock');
    this.hourHandGroup = document.getElementById('hourHandGroup');
    this.minuteHandGroup = document.getElementById('minuteHandGroup');
    this.hourHandText = document.getElementById('hourHandText');
    this.minuteHandText = document.getElementById('minuteHandText');
    this.pieSlice = document.getElementById('pieSlice');

    this.digitalHours = document.getElementById('digitalHours');
    this.digitalMinutes = document.getElementById('digitalMinutes');
    this.digitalPeriod = document.getElementById('digitalPeriod');
    this.arabicPhrase = document.getElementById('arabicTimePhrase');
    this.phraseLabel = document.getElementById('phraseLabel');
    this.skyBg = document.getElementById('skyBg');

    this.speechText = document.getElementById('speechText');
    this.speakButton = document.getElementById('speakButton');
    this.mascotAvatar = document.getElementById('mascotAvatar');

    this.toggleMinutesGuideBtn = document.getElementById('toggleMinutesGuideBtn');
    this.toggleSectorBtn = document.getElementById('toggleSectorBtn');
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.soundIcon = document.getElementById('soundIcon');
    this.starCounter = document.getElementById('starCounter');

    // ألسنة التبديل
    this.tabExplore = document.getElementById('tabExplore');
    this.tabLessons = document.getElementById('tabLessons');
    this.tabQuiz = document.getElementById('tabQuiz');

    this.exploreView = document.getElementById('exploreView');
    this.lessonsView = document.getElementById('lessonsView');
    this.quizView = document.getElementById('quizView');

    // عناصر حكاية أصدقاء الوقت الكرتونية (تكتك وسلحوف وأرنوب)
    this.activeLessonTitle = document.getElementById('activeLessonTitle');
    this.activeLessonDesc = document.getElementById('activeLessonDesc');
    this.storySpeakerBadge = document.getElementById('storySpeakerBadge');
    this.storyStepBadge = document.getElementById('storyStepBadge');
    this.storyListenBtn = document.getElementById('storyListenBtn');
    this.storyAnimateBtn = document.getElementById('storyAnimateBtn');
    this.storyTaskCard = document.getElementById('storyTaskCard');
    this.taskInstruction = document.getElementById('taskInstruction');
    this.taskStatusIcon = document.getElementById('taskStatusIcon');
    this.btnCheckStoryTask = document.getElementById('btnCheckStoryTask');
    this.btnHelpStoryTask = document.getElementById('btnHelpStoryTask');
    this.storyTaskFeedback = document.getElementById('storyTaskFeedback');
    this.btnPrevStoryChapter = document.getElementById('btnPrevStoryChapter');
    this.btnNextStoryChapter = document.getElementById('btnNextStoryChapter');

    // كويز
    this.quizQuestionText = document.getElementById('quizQuestionText');
    this.questionNumber = document.getElementById('questionNumber');
    this.checkAnswerBtn = document.getElementById('checkAnswerBtn');
    this.nextQuestionBtn = document.getElementById('nextQuestionBtn');
    this.newRoundBtn = document.getElementById('newRoundBtn');
    this.shuffleQuestionBtn = document.getElementById('shuffleQuestionBtn');
    this.quizFeedback = document.getElementById('quizFeedback');
    this.feedbackIcon = document.getElementById('feedbackIcon');
    this.feedbackText = document.getElementById('feedbackText');

    // نافذة التتويج والاحتفال الكبرى
    this.grandCelebrationModal = document.getElementById('grandCelebrationModal');
    this.celebrationTitle = document.getElementById('celebrationTitle');
    this.celebrationSubtitle = document.getElementById('celebrationSubtitle');
    this.closeCelebrationBtn = document.getElementById('closeCelebrationBtn');

    // عناصر اسم الطفل والنافذة الترحيبية
    this.childNameBadge = document.getElementById('childNameBadge');
    this.childNameDisplay = document.getElementById('childNameDisplay');
    this.editNameBtn = document.getElementById('editNameBtn');
    this.nameModalOverlay = document.getElementById('nameModalOverlay');
    this.closeNameModalBtn = document.getElementById('closeNameModalBtn');
    this.nameForm = document.getElementById('nameForm');
    this.childNameInput = document.getElementById('childNameInput');
    this.saveNameBtn = document.getElementById('saveNameBtn');

    // زر تجربة الاحتفال والمساعدة وحاوية البالونات
    this.testCelebrationBtn = document.getElementById('testCelebrationBtn');
    this.autoSetClockBtn = document.getElementById('autoSetClockBtn');
    this.balloonsContainer = document.getElementById('balloonsContainer');

    // عناصر إعداد الاختبار الجديد وشريط التقدم وملخص النتيجة
    this.totalQuestionsNumber = document.getElementById('totalQuestionsNumber');
    this.quizProgressBar = document.getElementById('quizProgressBar');
    this.btnRestartQuizSetup = document.getElementById('btnRestartQuizSetup');
    this.startNewQuizFromPopupBtn = document.getElementById('startNewQuizFromPopupBtn');
    this.quizSetupModal = document.getElementById('quizSetupModal');
    this.closeQuizSetupBtn = document.getElementById('closeQuizSetupBtn');
    this.setupPlayerNameInput = document.getElementById('setupPlayerNameInput');
    this.launchConfiguredQuizBtn = document.getElementById('launchConfiguredQuizBtn');
    this.summaryQuestionsCount = document.getElementById('summaryQuestionsCount');
    this.summaryStarsCount = document.getElementById('summaryStarsCount');
    this.summaryBadgeEarned = document.getElementById('summaryBadgeEarned');
  }

  /* --------------------------------------------------------------------------
     إدارة وتطبيق اللغة (i18n)
     -------------------------------------------------------------------------- */
  toggleLanguage() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('kids_clock_lang', this.currentLang);
    this.applyLanguage();
    this.playTickSound();
  }

  applyLanguage() {
    const lang = this.currentLang;
    const t = TRANSLATIONS[lang];

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.appTitle;

    if (this.currentLangLabel) {
      this.currentLangLabel.textContent = t.langBtn;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    if (this.childNameInput) {
      this.childNameInput.placeholder = t.nameModalPlaceholder;
    }
    if (this.setupPlayerNameInput) {
      this.setupPlayerNameInput.placeholder = t.setupNamePlaceholder;
    }

    if (this.hourHandText) this.hourHandText.textContent = t.hourHandText;
    if (this.minuteHandText) this.minuteHandText.textContent = t.minuteHandText;

    if (!this.childName || this.childName === 'البطل' || this.childName === 'Champion') {
      this.childNameDisplay.textContent = t.childDefaultName;
    }

    this.setTime(this.currentHours, this.currentMinutes, false);
    this.updateSkyAndPeriod();

    if (this.activeMode === 'quiz') {
      if (this.quizQuestions && this.quizQuestions[this.currentQuizIndex]) {
        this.loadQuizQuestion(this.currentQuizIndex);
      }
    } else if (this.activeMode === 'lessons') {
      this.runLesson(this.currentLessonId || 1, false);
    } else {
      const name = this.childName || t.childDefaultName;
      if (lang === 'ar') {
        this.setMascotMessage(`أهلاً يا ${name}! أنا صديقك <strong>«تكتُك»</strong>. اسحب العقارب بإصبعك وشاهد ماذا يحدث!`);
      } else {
        this.setMascotMessage(`Hello ${name}! I'm your friend <strong>“Tick-Tock”</strong>. Drag the clock hands with your finger and explore!`);
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. توليد علامات وأرقام الساعة التناظرية ديناميكياً بـ SVG
     -------------------------------------------------------------------------- */
  generateClockFaceElements() {
    const ticksGroup = document.getElementById('minuteTicks');
    const numbersGroup = document.getElementById('hourNumbers');
    const guidesGroup = document.getElementById('minuteNumbersGuide');

    if (!ticksGroup || !numbersGroup || !guidesGroup) return;
    ticksGroup.innerHTML = '';
    numbersGroup.innerHTML = '';
    guidesGroup.innerHTML = '';

    for (let i = 0; i < 60; i++) {
      const angle = (i * 6) * (Math.PI / 180);
      const isMajor = i % 5 === 0;
      const innerR = isMajor ? 148 : 154;
      const outerR = 160;

      const x1 = 200 + innerR * Math.sin(angle);
      const y1 = 200 - innerR * Math.cos(angle);
      const x2 = 200 + outerR * Math.sin(angle);
      const y2 = 200 - outerR * Math.cos(angle);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      if (isMajor) line.classList.add('major-tick');
      ticksGroup.appendChild(line);
    }

    const hourRadius = 125;
    for (let h = 1; h <= 12; h++) {
      const angle = (h * 30) * (Math.PI / 180);
      const x = 200 + hourRadius * Math.sin(angle);
      const y = 200 - hourRadius * Math.cos(angle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.textContent = h.toString();
      numbersGroup.appendChild(text);
    }

    const guideRadius = 176;
    for (let m = 0; m < 60; m += 5) {
      const angle = (m * 6) * (Math.PI / 180);
      const x = 200 + guideRadius * Math.sin(angle);
      const y = 200 - guideRadius * Math.cos(angle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.textContent = m === 0 ? '60' : m.toString().padStart(2, '0');
      guidesGroup.appendChild(text);
    }
  }

  /* --------------------------------------------------------------------------
     4. التحكم بزوايا العقارب والسحب التفاعلي الدقيق
     -------------------------------------------------------------------------- */
  attachEventListeners() {
    if (this.langToggleBtn) {
      this.langToggleBtn.addEventListener('click', () => this.toggleLanguage());
    }

    const startDragMinute = (e) => this.startDragging(e, 'minute');
    const startDragHour = (e) => this.startDragging(e, 'hour');

    this.minuteHandGroup.addEventListener('pointerdown', startDragMinute);
    this.hourHandGroup.addEventListener('pointerdown', startDragHour);

    window.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    window.addEventListener('pointerup', () => this.stopDragging());
    window.addEventListener('pointercancel', () => this.stopDragging());

    // أزرار القفز السريع
    document.querySelectorAll('.quick-btn[data-add-mins]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const minsToAdd = parseInt(e.currentTarget.getAttribute('data-add-mins'), 10);
        this.addMinutes(minsToAdd);
      });
    });

    document.getElementById('btnNowTime').addEventListener('click', () => {
      const now = new Date();
      this.setTime(now.getHours() % 12 || 12, now.getMinutes(), true);
      const msg = this.currentLang === 'ar'
        ? 'اضبطنا الساعة الآن على الوقت الحقيقي الجميل!'
        : 'Clock is now set to real current time! ⚡';
      this.setMascotMessage(msg);
    });

    // أدوات المساعدة البصرية
    this.toggleMinutesGuideBtn.addEventListener('click', () => {
      this.showMinuteGuides = !this.showMinuteGuides;
      this.toggleMinutesGuideBtn.classList.toggle('active', this.showMinuteGuides);
      document.getElementById('minuteNumbersGuide').style.display = this.showMinuteGuides ? 'block' : 'none';
      this.playTickSound();
    });

    this.toggleSectorBtn.addEventListener('click', () => {
      this.showPizzaSector = !this.showPizzaSector;
      this.toggleSectorBtn.classList.toggle('active', this.showPizzaSector);
      this.updatePizzaSlice();
      this.playTickSound();
    });

    this.soundToggleBtn.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      this.soundIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
      if (this.soundEnabled) this.playTickSound();
    });

    this.digitalPeriod.addEventListener('click', () => {
      this.isDayTime = !this.isDayTime;
      this.updateSkyAndPeriod();
      this.playTickSound();
      const msg = this.isDayTime
        ? (this.currentLang === 'ar' ? 'أشرقت الشمس الجميلة! صباح الخير والنشاط! ☀️' : 'Bright sunny day! Good morning, champion! ☀️')
        : (this.currentLang === 'ar' ? 'حل الليل الهادئ وظهر القمر والنجوم! 🌙' : 'Peaceful starry night! Moon and stars are shining! 🌙');
      this.setMascotMessage(msg);
    });

    this.speakButton.addEventListener('click', () => {
      const phrase = this.speechText.textContent;
      this.speakText(phrase);
    });

    this.mascotAvatar.addEventListener('click', () => {
      const name = this.childName || (this.currentLang === 'ar' ? 'يا بطل' : 'Hero');
      const phrasesAr = [
        `أنت ذكي جداً ومميز يا ${name}! 🌟`,
        `تذكر يا ${name}: سلحوف للأوقات والكسل، وأرنوب للدقائق والسرعة!`,
        `تيك توك.. أنا فخور جداً بتعلمك السريع يا ${name}! ⏰`,
        `أحسنت الاستكشاف يا بطلنا ${name}! استمر هكذا! 🚀`
      ];
      const phrasesEn = [
        `You are super smart and amazing, ${name}! 🌟`,
        `Remember ${name}: Turtle is for hours, Bunny is for minutes!`,
        `Tick-Tock.. I am so proud of your quick learning, ${name}! ⏰`,
        `Great exploration, ${name}! Keep going! 🚀`
      ];
      const pool = this.currentLang === 'ar' ? phrasesAr : phrasesEn;
      const randomPhrase = pool[Math.floor(Math.random() * pool.length)];
      this.setMascotMessage(randomPhrase);
      this.playTickSound();
    });

    this.nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveName();
    });
    this.editNameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openNameModal();
    });
    this.childNameBadge.addEventListener('click', () => {
      this.openNameModal();
    });

    // تبديل الأنماط
    this.tabExplore.addEventListener('click', () => this.switchMode('explore'));
    this.tabLessons.addEventListener('click', () => this.switchMode('lessons'));
    this.tabQuiz.addEventListener('click', () => this.switchMode('quiz', true));

    // أزرار فصول الحكاية الكرتونية
    document.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', () => {
        const lessonId = parseInt(card.getAttribute('data-lesson'), 10);
        this.runLesson(lessonId, true);
      });
    });

    // أزرار التحكم في الحكاية
    if (this.storyListenBtn) {
      this.storyListenBtn.addEventListener('click', () => this.listenCurrentStoryChapter());
    }
    if (this.storyAnimateBtn) {
      this.storyAnimateBtn.addEventListener('click', () => this.animateStoryDemonstration());
    }
    if (this.btnCheckStoryTask) {
      this.btnCheckStoryTask.addEventListener('click', () => this.verifyStoryTask());
    }
    if (this.btnHelpStoryTask) {
      this.btnHelpStoryTask.addEventListener('click', () => this.autoSolveStoryTask());
    }
    if (this.btnPrevStoryChapter) {
      this.btnPrevStoryChapter.addEventListener('click', () => this.goToPrevStoryChapter());
    }
    if (this.btnNextStoryChapter) {
      this.btnNextStoryChapter.addEventListener('click', () => this.goToNextStoryChapter());
    }

    // تفاعل الكويز
    this.checkAnswerBtn.addEventListener('click', () => this.checkQuizAnswer());
    this.nextQuestionBtn.addEventListener('click', () => this.nextQuizQuestion());
    this.newRoundBtn.addEventListener('click', () => this.openQuizSetupModal());
    this.shuffleQuestionBtn.addEventListener('click', () => this.shuffleCurrentQuestion());

    if (this.btnRestartQuizSetup) {
      this.btnRestartQuizSetup.addEventListener('click', () => {
        this.openQuizSetupModal();
      });
    }

    if (this.startNewQuizFromPopupBtn) {
      this.startNewQuizFromPopupBtn.addEventListener('click', () => {
        this.grandCelebrationModal.classList.remove('active');
        this.openQuizSetupModal();
      });
    }

    if (this.setupPlayerNameInput) {
      this.setupPlayerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.launchConfiguredQuiz();
        }
      });
    }

    document.querySelectorAll('.count-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.count-option-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.quizQuestionsCount = parseInt(e.currentTarget.getAttribute('data-count'), 10) || 5;
        this.playTickSound();
      });
    });

    if (this.launchConfiguredQuizBtn) {
      this.launchConfiguredQuizBtn.addEventListener('click', () => {
        this.launchConfiguredQuiz();
      });
    }

    if (this.testCelebrationBtn) {
      this.testCelebrationBtn.addEventListener('click', () => {
        this.triggerGrandCelebration();
      });
    }

    if (this.autoSetClockBtn) {
      this.autoSetClockBtn.addEventListener('click', () => {
        this.autoSolveForChild();
      });
    }

    // إغلاق النوافذ
    if (this.closeCelebrationBtn) {
      this.closeCelebrationBtn.addEventListener('click', () => {
        this.grandCelebrationModal.classList.remove('active');
        this.playTickSound();
      });
    }
    if (this.closeQuizSetupBtn) {
      this.closeQuizSetupBtn.addEventListener('click', () => {
        this.quizSetupModal.classList.remove('active');
        this.playTickSound();
      });
    }
    if (this.closeNameModalBtn) {
      this.closeNameModalBtn.addEventListener('click', () => {
        this.closeNameModal();
      });
    }

    [this.grandCelebrationModal, this.quizSetupModal, this.nameModalOverlay].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('active');
            this.playTickSound();
          }
        });
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.grandCelebrationModal) this.grandCelebrationModal.classList.remove('active');
        if (this.quizSetupModal) this.quizSetupModal.classList.remove('active');
        if (this.nameModalOverlay) this.closeNameModal();
      }
    });

    const unlockAudio = () => {
      this.ensureAudioUnlocked();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);
  }

  /* --------------------------------------------------------------------------
     إدارة اسم الطفل والنافذة الترحيبية
     -------------------------------------------------------------------------- */
  openNameModal() {
    const isDef = !this.childName || this.childName === 'البطل' || this.childName === 'Champion';
    this.childNameInput.value = isDef ? '' : this.childName;
    this.nameModalOverlay.classList.add('active');
    setTimeout(() => this.childNameInput.focus(), 250);
    this.playTickSound();
  }

  closeNameModal() {
    this.nameModalOverlay.classList.remove('active');
  }

  handleSaveName() {
    const entered = this.childNameInput.value.trim();
    const defaultName = TRANSLATIONS[this.currentLang].childDefaultName;
    this.childName = entered || defaultName;
    localStorage.setItem('kids_clock_child_name', this.childName);
    this.childNameDisplay.textContent = this.childName;
    this.closeNameModal();

    this.playCelebrationFanfare();
    this.triggerConfetti('center', 90);

    const welcomeMsg = this.currentLang === 'ar'
      ? `أهلاً وسهلاً يا بطلنا الرائع <strong>«${this.childName}»</strong>! أنا سعيد جداً بصداقتك في جزيرة الوقت! 🌟`
      : `Welcome, awesome champion <strong>"${this.childName}"</strong>! I'm thrilled to be friends on Time Island! 🌟`;
    this.setMascotMessage(welcomeMsg);
    this.speakText(this.currentLang === 'ar'
      ? `أهلاً يا ${this.childName}! هيا نكتشف أسرار الوقت معاً!`
      : `Hello ${this.childName}! Let's discover the secrets of time together!`
    );
  }

  /* --------------------------------------------------------------------------
     إدارة نافذة إعداد الاختبار الجديد
     -------------------------------------------------------------------------- */
  openQuizSetupModal() {
    const isDef = !this.childName || this.childName === 'البطل' || this.childName === 'Champion';
    if (this.setupPlayerNameInput) {
      this.setupPlayerNameInput.value = isDef ? '' : this.childName;
      setTimeout(() => {
        this.setupPlayerNameInput.focus();
        this.setupPlayerNameInput.select();
      }, 250);
    }

    document.querySelectorAll('.count-option-btn').forEach(btn => {
      const c = parseInt(btn.getAttribute('data-count'), 10);
      btn.classList.toggle('active', c === this.quizQuestionsCount);
    });

    if (this.quizSetupModal) {
      this.quizSetupModal.classList.add('active');
    }
    this.playTickSound();
  }

  launchConfiguredQuiz() {
    const entered = this.setupPlayerNameInput ? this.setupPlayerNameInput.value.trim() : '';
    if (entered) {
      this.childName = entered;
      localStorage.setItem('kids_clock_child_name', this.childName);
      if (this.childNameDisplay) {
        this.childNameDisplay.textContent = this.childName;
      }
    } else if (!this.childName) {
      this.childName = TRANSLATIONS[this.currentLang].childDefaultName;
    }

    if (this.quizSetupModal) {
      this.quizSetupModal.classList.remove('active');
    }

    this.switchMode('quiz', false);
    this.startNewQuizRound(this.quizQuestionsCount);

    const name = this.childName;
    if (this.currentLang === 'ar') {
      this.setMascotMessage(`انطلق اختبار الـ ${this.quizQuestionsCount} أسئلة يا ${name}! 🚀 هيا ركز وأرنا شطارتك!`);
      this.speakText(`هيا يا ${name}! لنبدأ اختبار الـ ${this.quizQuestionsCount} أسئلة!`);
    } else {
      this.setMascotMessage(`The ${this.quizQuestionsCount}-question quiz has started, ${name}! 🚀 Focus and show your skills!`);
      this.speakText(`Let's go ${name}! Starting your ${this.quizQuestionsCount}-question quiz!`);
    }
  }

  startDragging(e, hand) {
    if (e.cancelable) e.preventDefault();
    this.isDragging = true;
    this.draggedHand = hand;
    this.ensureAudioUnlocked();

    if (e.target && e.target.setPointerCapture && e.pointerId) {
      try {
        e.target.setPointerCapture(e.pointerId);
        this.capturedTarget = e.target;
        this.capturedPointerId = e.pointerId;
      } catch (_) {}
    }

    if (hand === 'minute') {
      this.minuteHandGroup.classList.add('is-dragging');
    } else {
      this.hourHandGroup.classList.add('is-dragging');
    }
  }

  handlePointerMove(e) {
    if (!this.isDragging) return;

    const rect = this.svgClock.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const clockCenterX = rect.left + rect.width / 2;
    const clockCenterY = rect.top + rect.height / 2;

    const deltaX = clientX - clockCenterX;
    const deltaY = clientY - clockCenterY;

    let angleRad = Math.atan2(deltaX, -deltaY);
    let angleDeg = angleRad * (180 / Math.PI);
    if (angleDeg < 0) angleDeg += 360;

    if (this.draggedHand === 'minute') {
      let minute = Math.round(angleDeg / 6) % 60;
      if (minute !== this.currentMinutes) {
        const diff = minute - this.currentMinutes;
        if (diff < -30) {
          this.currentHours = (this.currentHours % 12) + 1;
        } else if (diff > 30) {
          this.currentHours = this.currentHours === 1 ? 12 : this.currentHours - 1;
        }
        this.setTime(this.currentHours, minute, false);
        this.playTickSound();
      }
    } else if (this.draggedHand === 'hour') {
      let rawHour = Math.round(angleDeg / 30);
      let hour = rawHour === 0 ? 12 : rawHour;
      if (hour !== this.currentHours) {
        this.setTime(hour, this.currentMinutes, false);
        this.playTickSound();
      }
    }
  }

  stopDragging() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.capturedTarget && this.capturedTarget.releasePointerCapture && this.capturedPointerId) {
      try {
        this.capturedTarget.releasePointerCapture(this.capturedPointerId);
      } catch (_) {}
      this.capturedTarget = null;
      this.capturedPointerId = null;
    }
    this.minuteHandGroup.classList.remove('is-dragging');
    this.hourHandGroup.classList.remove('is-dragging');
  }

  addMinutes(mins) {
    let totalMins = this.currentHours * 60 + this.currentMinutes + mins;
    let newHours = Math.floor(totalMins / 60) % 12;
    if (newHours === 0) newHours = 12;
    let newMins = totalMins % 60;

    this.setTime(newHours, newMins, true);
    if (newMins === 0) {
      this.playChimeSound();
    } else {
      this.playTickSound();
    }
  }

  /* --------------------------------------------------------------------------
     5. ضبط الوقت وتحديث عناصر الواجهة
     -------------------------------------------------------------------------- */
  setTime(hours, minutes, animate = false) {
    this.currentHours = hours;
    this.currentMinutes = minutes;

    const minuteAngle = minutes * 6;
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    this.minuteHandGroup.style.transform = `rotate(${minuteAngle}deg)`;
    this.hourHandGroup.style.transform = `rotate(${hourAngle}deg)`;

    this.digitalHours.textContent = hours.toString().padStart(2, '0');
    this.digitalMinutes.textContent = minutes.toString().padStart(2, '0');

    this.arabicPhrase.textContent = this.getTimePhrase(hours, minutes);
    this.updatePizzaSlice();
    this.updateSkyAndPeriod();
  }

  updatePizzaSlice() {
    if (!this.showPizzaSector || this.currentMinutes === 0) {
      this.pieSlice.setAttribute('d', '');
      return;
    }

    const angle = (this.currentMinutes * 6) * (Math.PI / 180);
    const radius = 160;
    const startX = 200;
    const startY = 40;
    const endX = 200 + radius * Math.sin(angle);
    const endY = 200 - radius * Math.cos(angle);

    const largeArcFlag = this.currentMinutes > 30 ? 1 : 0;
    const pathD = `M 200 200 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    this.pieSlice.setAttribute('d', pathD);
  }

  updateSkyAndPeriod() {
    const t = TRANSLATIONS[this.currentLang];
    this.digitalPeriod.textContent = this.isDayTime ? t.dayPeriod : t.nightPeriod;
    document.body.classList.remove('night-mode', 'sunset-mode');
    if (!this.isDayTime) {
      document.body.classList.add('night-mode');
    }
  }

  getTimePhrase(hours, minutes) {
    if (this.currentLang === 'en') {
      return this.convertTimeToEnglishPhrase(hours, minutes);
    }
    return this.convertTimeToArabicPhrase(hours, minutes);
  }

  convertTimeToArabicPhrase(hours, minutes) {
    const arabicHourNames = [
      '', 'الواحدة', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 
      'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة', 
      'الحادية عشرة', 'الثانية عشرة'
    ];

    const currentHourName = arabicHourNames[hours] || '';
    const nextHour = (hours % 12) + 1;
    const nextHourName = arabicHourNames[nextHour];

    if (minutes === 0) {
      return `الساعة ${currentHourName} تماماً 🔔`;
    } else if (minutes === 5) {
      return `الساعة ${currentHourName} وخمس دقائق 🐇`;
    } else if (minutes === 10) {
      return `الساعة ${currentHourName} وعشر دقائق`;
    } else if (minutes === 15) {
      return `الساعة ${currentHourName} والربع 🍕`;
    } else if (minutes === 20) {
      return `الساعة ${currentHourName} والثلث`;
    } else if (minutes === 25) {
      return `الساعة ${currentHourName} ونصف إلا خمس دقائق`;
    } else if (minutes === 30) {
      return `الساعة ${currentHourName} والنصف ⏱️`;
    } else if (minutes === 35) {
      return `الساعة ${currentHourName} والنصف وخمس دقائق`;
    } else if (minutes === 40) {
      return `الساعة ${nextHourName} إلا ثلثاً`;
    } else if (minutes === 45) {
      return `الساعة ${nextHourName} إلا ربعاً 🍕`;
    } else if (minutes === 50) {
      return `الساعة ${nextHourName} إلا عشر دقائق`;
    } else if (minutes === 55) {
      return `الساعة ${nextHourName} إلا خمس دقائق`;
    } else {
      return `الساعة ${currentHourName} و ${minutes} دقيقة`;
    }
  }

  convertTimeToEnglishPhrase(hours, minutes) {
    const englishHourNames = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 
      'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
      'Eleven', 'Twelve'
    ];
    const currentHourName = englishHourNames[hours] || '';
    const nextHour = (hours % 12) + 1;
    const nextHourName = englishHourNames[nextHour];

    if (minutes === 0) {
      return `${currentHourName} o'clock 🔔`;
    } else if (minutes === 5) {
      return `Five past ${currentHourName} 🐇`;
    } else if (minutes === 10) {
      return `Ten past ${currentHourName}`;
    } else if (minutes === 15) {
      return `Quarter past ${currentHourName} 🍕`;
    } else if (minutes === 20) {
      return `Twenty past ${currentHourName}`;
    } else if (minutes === 25) {
      return `Twenty-five past ${currentHourName}`;
    } else if (minutes === 30) {
      return `Half past ${currentHourName} ⏱️`;
    } else if (minutes === 35) {
      return `Twenty-five to ${nextHourName}`;
    } else if (minutes === 40) {
      return `Twenty to ${nextHourName}`;
    } else if (minutes === 45) {
      return `Quarter to ${nextHourName} 🍕`;
    } else if (minutes === 50) {
      return `Ten to ${nextHourName}`;
    } else if (minutes === 55) {
      return `Five to ${nextHourName}`;
    } else {
      return `${currentHourName} : ${minutes.toString().padStart(2, '0')}`;
    }
  }

  setMascotMessage(message) {
    this.speechText.innerHTML = message;
  }

  /* --------------------------------------------------------------------------
     6. أنماط التطبيق: التبديل بين الاستكشاف والحكاية الكرتونية والتحديات
     -------------------------------------------------------------------------- */
  switchMode(mode, triggerSetup = false) {
    this.activeMode = mode;
    document.body.setAttribute('data-mode', mode);

    this.tabExplore.classList.toggle('active', mode === 'explore');
    this.tabLessons.classList.toggle('active', mode === 'lessons');
    this.tabQuiz.classList.toggle('active', mode === 'quiz');

    if (this.exploreView) this.exploreView.style.display = mode === 'explore' ? 'block' : 'none';
    if (this.lessonsView) this.lessonsView.style.display = mode === 'lessons' ? 'block' : 'none';
    if (this.quizView) this.quizView.style.display = mode === 'quiz' ? 'block' : 'none';

    this.playTickSound();

    if (mode === 'explore') {
      const msg = this.currentLang === 'ar'
        ? 'اسحب العقارب بحرية وشاهد كيف يتغير نطق الساعة وشكلها الرقمي!'
        : 'Drag the hands freely and see how the time changes in numbers and words!';
      this.setMascotMessage(msg);
      this.hourHandGroup.classList.remove('pulse-turtle');
      this.minuteHandGroup.classList.remove('pulse-bunny');
    } else if (mode === 'lessons') {
      this.runLesson(this.currentLessonId || 1, true);
    } else if (mode === 'quiz') {
      this.hourHandGroup.classList.remove('pulse-turtle');
      this.minuteHandGroup.classList.remove('pulse-bunny');
      if (triggerSetup) {
        this.openQuizSetupModal();
      } else {
        if (this.currentQuizIndex >= this.quizQuestions.length) {
          this.startNewQuizRound();
        } else {
          this.loadQuizQuestion(this.currentQuizIndex);
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
     نظام حكاية أصدقاء الوقت الكرتونية (تكتك وسلحوف وأرنوب)
     -------------------------------------------------------------------------- */
  runLesson(lessonId, autoSpeak = false) {
    this.currentLessonId = lessonId;
    this.playChimeSound();

    // تحديث أزرار فصول الحكاية النشطة
    document.querySelectorAll('.lesson-card').forEach(card => {
      const id = parseInt(card.getAttribute('data-lesson'), 10);
      card.classList.toggle('active', id === lessonId);
    });

    // تحديث أزرار التنقل (السابق / التالي)
    if (this.btnPrevStoryChapter) {
      this.btnPrevStoryChapter.disabled = lessonId <= 1;
    }
    if (this.btnNextStoryChapter) {
      this.btnNextStoryChapter.disabled = lessonId >= 5;
    }

    // إزالة التوهج السابق من العقارب
    this.hourHandGroup.classList.remove('pulse-turtle');
    this.minuteHandGroup.classList.remove('pulse-bunny');

    const chapter = STORY_CHAPTERS[lessonId - 1] || STORY_CHAPTERS[0];

    // تفعيل الخصائص المساعدة المرتبطة بالفصل
    if (chapter.showPizza) {
      this.showPizzaSector = true;
      this.toggleSectorBtn.classList.add('active');
    }
    if (chapter.showGuides) {
      this.showMinuteGuides = true;
      this.toggleMinutesGuideBtn.classList.add('active');
      document.getElementById('minuteNumbersGuide').style.display = 'block';
    }

    // تسليط الضوء على العقرب المشروح
    if (chapter.focusHand === 'hour') {
      this.hourHandGroup.classList.add('pulse-turtle');
    } else if (chapter.focusHand === 'minute') {
      this.minuteHandGroup.classList.add('pulse-bunny');
    }

    // تحديث عناصر واجهة القصة
    if (this.storyStepBadge) {
      this.storyStepBadge.textContent = `${lessonId} / 5`;
    }
    if (this.storySpeakerBadge) {
      this.storySpeakerBadge.textContent = this.currentLang === 'ar' ? chapter.speakerAr : chapter.speakerEn;
    }
    if (this.activeLessonTitle) {
      this.activeLessonTitle.textContent = this.currentLang === 'ar' ? chapter.titleAr : chapter.titleEn;
    }
    if (this.activeLessonDesc) {
      this.activeLessonDesc.innerHTML = this.currentLang === 'ar' ? chapter.storyAr : chapter.storyEn;
    }
    if (this.taskInstruction) {
      this.taskInstruction.textContent = this.currentLang === 'ar' ? chapter.taskAr : chapter.taskEn;
    }

    // إعادة تعيين حالة المهمة
    if (this.taskStatusIcon) this.taskStatusIcon.textContent = '⏳';
    if (this.storyTaskFeedback) this.storyTaskFeedback.style.display = 'none';

    // ضبط الوقت الابتدائي للفصل
    this.setTime(chapter.time[0], chapter.time[1]);

    const bubbleStory = this.currentLang === 'ar' ? chapter.storyAr : chapter.storyEn;
    this.setMascotMessage(bubbleStory);

    if (autoSpeak) {
      this.listenCurrentStoryChapter();
    }
  }

  // الاستماع الصوتي للحكاية الكرتونية
  listenCurrentStoryChapter() {
    const chapter = STORY_CHAPTERS[this.currentLessonId - 1];
    if (!chapter) return;
    const textToSpeak = this.currentLang === 'ar' ? chapter.storyAr : chapter.storyEn;
    this.speakText(textToSpeak);
  }

  // العرض الكرتوني المتحرك للفصل (تحريك العقارب برمجياً أمام الطفل)
  animateStoryDemonstration() {
    const chapter = STORY_CHAPTERS[this.currentLessonId - 1];
    if (!chapter) return;

    this.ensureAudioUnlocked();
    const id = this.currentLessonId;

    if (id === 1) {
      // سلحوف يتحرك ببطء وخطوات ثابتة من 12 إلى 3
      let step = 0;
      const hoursSeq = [12, 1, 2, 3];
      const interval = setInterval(() => {
        if (step < hoursSeq.length) {
          this.setTime(hoursSeq[step], 0, true);
          this.playTickSound();
          step++;
        } else {
          clearInterval(interval);
          this.playChimeSound();
        }
      }, 550);
    } else if (id === 2) {
      // أرنوب يركض دورة سريعة في المضمار
      let mins = 0;
      const interval = setInterval(() => {
        mins += 5;
        this.setTime(12, mins % 60, true);
        this.playHopSound();
        if (mins >= 60) {
          clearInterval(interval);
          this.setTime(1, 0, true);
          this.playChimeSound();
        }
      }, 100);
    } else if (id === 3) {
      // أرنوب يصعد إلى 12 ويدق جرس الساعة تماماً
      this.setTime(7, 45, true);
      setTimeout(() => {
        this.setTime(8, 0, true);
        this.playChimeSound();
        this.triggerConfetti('center', 40);
      }, 600);
    } else if (id === 4) {
      // استعراض البيتزا عند النصف والربع
      this.showPizzaSector = true;
      this.toggleSectorBtn.classList.add('active');
      this.setTime(4, 15, true);
      this.playTickSound();
      setTimeout(() => {
        this.setTime(4, 30, true);
        this.playChimeSound();
      }, 1000);
    } else if (id === 5) {
      // قفزات الخمسات 5 -> 10 -> 15 -> 20
      this.showMinuteGuides = true;
      this.toggleMinutesGuideBtn.classList.add('active');
      document.getElementById('minuteNumbersGuide').style.display = 'block';
      let hops = [5, 10, 15, 20];
      let i = 0;
      const interval = setInterval(() => {
        if (i < hops.length) {
          this.setTime(8, hops[i], true);
          this.playHopSound();
          i++;
        } else {
          clearInterval(interval);
          this.playCelebrationFanfare();
        }
      }, 450);
    }
  }

  // التحقق من إنجاز الطفل للمهمة التفاعلية في نهاية الفصل
  verifyStoryTask() {
    const chapter = STORY_CHAPTERS[this.currentLessonId - 1];
    if (!chapter) return;

    let hourMatches = true;
    if (chapter.targetHour !== null) {
      hourMatches = this.currentHours === chapter.targetHour;
    }

    const minDiff = Math.abs(this.currentMinutes - chapter.targetMin);
    const minMatches = minDiff <= 2;

    if (hourMatches && minMatches) {
      if (this.taskStatusIcon) this.taskStatusIcon.textContent = '✅';
      if (this.storyTaskFeedback) {
        this.storyTaskFeedback.className = 'task-feedback success';
        this.storyTaskFeedback.textContent = this.currentLang === 'ar' ? chapter.congratsAr : chapter.congratsEn;
        this.storyTaskFeedback.style.display = 'block';
      }

      this.playCelebrationFanfare();
      this.launchFlyingBalloons(10);
      this.triggerConfetti('center', 75);

      const voice = this.currentLang === 'ar' ? chapter.congratsAr : chapter.congratsEn;
      this.speakText(voice);
    } else {
      if (this.taskStatusIcon) this.taskStatusIcon.textContent = '🤔';
      if (this.storyTaskFeedback) {
        this.storyTaskFeedback.className = 'task-feedback retry';
        this.storyTaskFeedback.textContent = this.currentLang === 'ar'
          ? `قريب جداً يا بطل! تذكر مهمتك: ${chapter.taskAr}`
          : `Almost there champion! Remember: ${chapter.taskEn}`;
        this.storyTaskFeedback.style.display = 'block';
      }
      this.playOopsSound();
    }
  }

  // مساعدة تكتك الفورية في ضبط مهمة الفصل
  autoSolveStoryTask() {
    const chapter = STORY_CHAPTERS[this.currentLessonId - 1];
    if (!chapter) return;

    const setH = chapter.targetHour !== null ? chapter.targetHour : this.currentHours;
    this.setTime(setH, chapter.targetMin, true);
    this.playChimeSound();

    if (this.taskStatusIcon) this.taskStatusIcon.textContent = '✅';
    if (this.storyTaskFeedback) {
      this.storyTaskFeedback.className = 'task-feedback success';
      this.storyTaskFeedback.textContent = this.currentLang === 'ar'
        ? `ساعدك تكتك وضبطها على الوقت المطلوب! ${chapter.congratsAr}`
        : `Tick-Tock helped you set the time! ${chapter.congratsEn}`;
      this.storyTaskFeedback.style.display = 'block';
    }

    this.playCelebrationFanfare();
    this.launchFlyingBalloons(8);
  }

  goToNextStoryChapter() {
    if (this.currentLessonId < 5) {
      this.runLesson(this.currentLessonId + 1, true);
    }
  }

  goToPrevStoryChapter() {
    if (this.currentLessonId > 1) {
      this.runLesson(this.currentLessonId - 1, true);
    }
  }

  /* --------------------------------------------------------------------------
     7. محرك التحديات والاختبارات الحماسية والمتجددة عشوائياً (عربي / إنجليزي)
     -------------------------------------------------------------------------- */
  generateRandomQuizQuestions(count = 5) {
    const questions = [];
    const usedTimes = new Set();

    const arabicHourNames = [
      '', 'الواحدة', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 
      'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة', 
      'الحادية عشرة', 'الثانية عشرة'
    ];
    const englishHourNames = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 
      'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
      'Eleven', 'Twelve'
    ];

    const minuteBuckets = [
      [0],                           // تماماً / O'clock
      [30],                          // والنصف / Half past
      [15, 45],                      // الربع وإلا ربع / Quarter past & to
      [10, 20, 40, 50],              // أثلاث وعشرات
      [5, 25, 35, 55]                // خمسات
    ];

    for (let i = 0; i < count; i++) {
      const bucket = minuteBuckets[i % minuteBuckets.length];
      let targetMin, targetHour, timeKey;
      let attempts = 0;

      do {
        targetMin = bucket[Math.floor(Math.random() * bucket.length)];
        targetHour = Math.floor(Math.random() * 12) + 1;
        timeKey = `${targetHour}:${targetMin}`;
        attempts++;
      } while (usedTimes.has(timeKey) && attempts < 30);

      usedTimes.add(timeKey);

      const hourAr = arabicHourNames[targetHour];
      const hourEn = englishHourNames[targetHour];
      const nextH = (targetHour % 12) + 1;
      const nextHourAr = arabicHourNames[nextH];
      const nextHourEn = englishHourNames[nextH];

      let promptAr = '';
      let hintAr = '';
      let promptEn = '';
      let hintEn = '';

      if (targetMin === 0) {
        promptAr = `اضبط الساعة على: <strong>${targetHour}:00 تماماً 🔔</strong>`;
        hintAr = `سلحوف عند الرقم ${targetHour}، وأرنوب يقف في القمة عند 12 تماماً!`;
        promptEn = `Set the clock to: <strong>${targetHour}:00 (${hourEn} o'clock 🔔)</strong>`;
        hintEn = `Turtle at ${targetHour}, Bunny at the peak (12)!`;
      } else if (targetMin === 30) {
        promptAr = `اضبط الساعة على: <strong>${targetHour}:30 (الساعة ${hourAr} والنصف ⏱️)</strong>`;
        hintAr = `أرنوب يشير للأسفل تماماً عند الرقم 6!`;
        promptEn = `Set the clock to: <strong>${targetHour}:30 (Half past ${hourEn} ⏱️)</strong>`;
        hintEn = `Bunny points straight down at 6!`;
      } else if (targetMin === 15) {
        promptAr = `اضبط الساعة على: <strong>${targetHour}:15 (الساعة ${hourAr} والربع 🍕)</strong>`;
        hintAr = `أرنوب يشير لليمين عند الرقم 3!`;
        promptEn = `Set the clock to: <strong>${targetHour}:15 (Quarter past ${hourEn} 🍕)</strong>`;
        hintEn = `Bunny points to the right at 3!`;
      } else if (targetMin === 45) {
        promptAr = `اضبط الساعة على: <strong>${targetHour}:45 (الساعة ${nextHourAr} إلا ربعاً 🍕)</strong>`;
        hintAr = `أرنوب يشير لليسار عند الرقم 9!`;
        promptEn = `Set the clock to: <strong>${targetHour}:45 (Quarter to ${nextHourEn} 🍕)</strong>`;
        hintEn = `Bunny points to the left at 9!`;
      } else {
        const hop = Math.round(targetMin / 5);
        promptAr = `اضبط الساعة على: <strong>${targetHour}:${targetMin.toString().padStart(2, '0')} 🐇</strong>`;
        hintAr = `أرنوب قفز عند الرقم ${hop} لأن (${hop} × 5 = ${targetMin}) دقيقة!`;
        promptEn = `Set the clock to: <strong>${targetHour}:${targetMin.toString().padStart(2, '0')} 🐇</strong>`;
        hintEn = `Bunny hopped to ${hop} because (${hop} × 5 = ${targetMin}) minutes!`;
      }

      questions.push({
        promptAr,
        hintAr,
        promptEn,
        hintEn,
        targetHour,
        targetMin
      });
    }

    return questions;
  }

  startNewQuizRound(count) {
    const questionsCount = count || this.quizQuestionsCount || 5;
    this.quizQuestionsCount = questionsCount;
    this.quizQuestions = this.generateRandomQuizQuestions(questionsCount);
    this.currentQuizIndex = 0;
    this.currentQuizCorrectCount = 0;

    if (this.totalQuestionsNumber) {
      this.totalQuestionsNumber.textContent = questionsCount.toString();
    }
    if (this.quizProgressBar) {
      this.quizProgressBar.style.width = '0%';
    }

    this.loadQuizQuestion(0);
    this.newRoundBtn.style.display = 'none';
    this.playTickSound();

    const name = this.childName || TRANSLATIONS[this.currentLang].childDefaultName;
    if (this.currentLang === 'ar') {
      this.setMascotMessage(`انطلق اختبار الـ ${questionsCount} أسئلة بأوقات جديدة كلياً يا ${name}! هيا أرنا براعتك! 🚀`);
    } else {
      this.setMascotMessage(`New challenge with ${questionsCount} fresh questions, ${name}! Show us your superpowers! 🚀`);
    }
  }

  shuffleCurrentQuestion() {
    const freshQ = this.generateRandomQuizQuestions(1)[0];
    this.quizQuestions[this.currentQuizIndex] = freshQ;
    this.loadQuizQuestion(this.currentQuizIndex);
    this.playTickSound();
    const msg = this.currentLang === 'ar'
      ? 'تم تغيير الوقت بوقت جديد! حاول ضبطه الآن! 🎲'
      : 'Time shuffled to a fresh one! Try setting it now! 🎲';
    this.setMascotMessage(msg);
  }

  loadQuizQuestion(index) {
    this.currentQuizIndex = index;
    const q = this.quizQuestions[index];
    this.questionNumber.textContent = (index + 1).toString();
    if (this.totalQuestionsNumber) {
      this.totalQuestionsNumber.textContent = this.quizQuestions.length.toString();
    }
    if (this.quizProgressBar) {
      const pct = Math.round((index / this.quizQuestions.length) * 100);
      this.quizProgressBar.style.width = `${pct}%`;
    }

    const promptText = this.currentLang === 'ar' ? q.promptAr : q.promptEn;
    const hintText = this.currentLang === 'ar' ? q.hintAr : q.hintEn;

    this.quizQuestionText.innerHTML = promptText;
    this.quizFeedback.style.display = 'none';
    this.nextQuestionBtn.style.display = 'none';
    this.newRoundBtn.style.display = 'none';
    this.checkAnswerBtn.style.display = 'flex';

    const name = this.childName || TRANSLATIONS[this.currentLang].childDefaultName;
    if (this.currentLang === 'ar') {
      this.setMascotMessage(`المهمة رقم ${index + 1} يا ${name}: ${promptText}. ${hintText}`);
    } else {
      this.setMascotMessage(`Mission #${index + 1}, ${name}: ${promptText}. ${hintText}`);
    }
  }

  checkQuizAnswer() {
    const q = this.quizQuestions[this.currentQuizIndex];
    const minuteDiff = Math.abs(this.currentMinutes - q.targetMin);
    const hourMatch = this.currentHours === q.targetHour;

    const name = this.childName || TRANSLATIONS[this.currentLang].childDefaultName;

    if (hourMatch && minuteDiff <= 2) {
      this.starsCount += 1;
      this.currentQuizCorrectCount += 1;
      this.starCounter.textContent = this.starsCount.toString();

      if (this.quizProgressBar) {
        const pct = Math.round(((this.currentQuizIndex + 1) / this.quizQuestions.length) * 100);
        this.quizProgressBar.style.width = `${pct}%`;
      }

      this.quizFeedback.className = 'quiz-feedback-box correct';
      this.feedbackIcon.textContent = '🎉';
      if (this.currentLang === 'ar') {
        this.feedbackText.textContent = `إجابة مذهلة ومتقنة يا ${name}! لقد حصلت على نجمة شجاعة جديدة! ⭐`;
        this.setMascotMessage(`يا لك من ذكي ورائع يا ${name}! ضبطت الوقت بدقة فائقة! اضغط للسؤال التالي! 🚀`);
        this.speakText(`أحسنت يا ${name}! إجابة ممتازة!`);
      } else {
        this.feedbackText.textContent = `Brilliant answer, ${name}! You earned a shiny gold star! ⭐`;
        this.setMascotMessage(`Super smart and awesome, ${name}! Time set perfectly! Tap for the next question! 🚀`);
        this.speakText(`Well done ${name}! Excellent answer!`);
      }
      this.quizFeedback.style.display = 'flex';

      this.checkAnswerBtn.style.display = 'none';
      this.nextQuestionBtn.style.display = 'flex';

      this.mascotAvatar.classList.add('celebrating-mascot');
      setTimeout(() => this.mascotAvatar.classList.remove('celebrating-mascot'), 2500);

      this.playCelebrationFanfare();
      this.launchFlyingBalloons(10);
      this.triggerConfetti('center', 85);
    } else {
      const hintText = this.currentLang === 'ar' ? q.hintAr : q.hintEn;
      this.quizFeedback.className = 'quiz-feedback-box wrong';
      this.feedbackIcon.textContent = '🤔';
      if (this.currentLang === 'ar') {
        this.feedbackText.textContent = `قريب جداً يا ${name}! ${hintText}. حاول تحريك العقرب مجدداً!`;
        this.setMascotMessage(`لا بأس يا ${name}، حاول مرة أخرى! تذكر: ${hintText}`);
      } else {
        this.feedbackText.textContent = `Almost there, ${name}! ${hintText}. Try moving the hands again!`;
        this.setMascotMessage(`No worries ${name}, give it another shot! Remember: ${hintText}`);
      }
      this.quizFeedback.style.display = 'flex';
      this.playOopsSound();
    }
  }

  nextQuizQuestion() {
    this.playTickSound();
    if (this.currentQuizIndex + 1 < this.quizQuestions.length) {
      this.loadQuizQuestion(this.currentQuizIndex + 1);
    } else {
      this.triggerGrandCelebration();
    }
  }

  autoSolveForChild() {
    const q = this.quizQuestions[this.currentQuizIndex];
    if (!q) return;
    this.setTime(q.targetHour, q.targetMin, true);
    this.playChimeSound();
    const name = this.childName || TRANSLATIONS[this.currentLang].childDefaultName;
    const msg = this.currentLang === 'ar'
      ? `لقد ساعدتك وضبطت العقارب على الوقت المطلوب يا ${name}! 🪄 اضغط الآن زر "تحقّق من إجابتي" لنحتفل معاً! 🎉`
      : `I helped you set the hands to the right time, ${name}! 🪄 Now tap "Check my answer" to celebrate together! 🎉`;
    this.setMascotMessage(msg);
  }

  launchFlyingBalloons(count = 14) {
    if (!this.balloonsContainer) return;
    const balloonIcons = ['🎈', '🎉', '⭐', '🎈', '🥳', '✨', '🎈', '🏆', '🎊', '⭐', '🎈', '🌟'];

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'flying-balloon';
      balloon.textContent = balloonIcons[Math.floor(Math.random() * balloonIcons.length)];

      const leftPercent = Math.random() * 88 + 6;
      const animDelay = Math.random() * 1.5;
      const animDuration = 3.2 + Math.random() * 1.4;

      balloon.style.left = `${leftPercent}%`;
      balloon.style.animationDelay = `${animDelay}s`;
      balloon.style.animationDuration = `${animDuration}s`;

      this.balloonsContainer.appendChild(balloon);

      setTimeout(() => {
        if (balloon.parentNode) balloon.parentNode.removeChild(balloon);
      }, (animDelay + animDuration) * 1000 + 500);
    }
  }

  triggerGrandCelebration() {
    const name = this.childName || TRANSLATIONS[this.currentLang].childDefaultName;
    const totalQ = this.quizQuestions ? this.quizQuestions.length : 5;
    const correctQ = this.currentQuizCorrectCount || totalQ;

    if (this.summaryQuestionsCount) this.summaryQuestionsCount.textContent = totalQ.toString();
    if (this.summaryStarsCount) this.summaryStarsCount.textContent = `+${correctQ}`;
    if (this.summaryBadgeEarned) {
      if (this.currentLang === 'ar') {
        this.summaryBadgeEarned.textContent = correctQ === totalQ ? 'عبقري الوقت! 👑' : 'بطل متميز! ⭐';
      } else {
        this.summaryBadgeEarned.textContent = correctQ === totalQ ? 'Time Genius! 👑' : 'Super Star! ⭐';
      }
    }

    if (this.currentLang === 'ar') {
      this.celebrationTitle.textContent = `ألف مبروك يا بطل الأبطال «${name}»! 🏆`;
      this.celebrationSubtitle.textContent = `لقد أتممت الاختبار بنجاح باهر وجمعت ${correctQ} من ${totalQ} نجوم!`;
      this.speakText(`مبروك يا ${name}! أنت بطل جزيرة الوقت الحقيقي!`);
    } else {
      this.celebrationTitle.textContent = `Huge Congratulations, Champion "${name}"! 🏆`;
      this.celebrationSubtitle.textContent = `You finished the quiz brilliantly and won ${correctQ} out of ${totalQ} stars!`;
      this.speakText(`Congratulations ${name}! You are the true master of Time Island!`);
    }

    this.grandCelebrationModal.classList.add('active');
    this.playGrandFanfare();
    this.launchFlyingBalloons(24);
    this.triggerConfetti('rain', 250);
  }

  /* --------------------------------------------------------------------------
     8. محرك الاحتفالات والقصاصات الملونة (HTML5 Canvas Confetti)
     -------------------------------------------------------------------------- */
  initConfetti() {
    this.canvas = document.getElementById('confettiCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isConfettiActive = false;

    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  triggerConfetti(mode = 'center', count = 100) {
    if (!this.canvas) return;
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#facc15', '#a855f7', '#fb923c', '#38bdf8'];

    const originX = mode === 'center' ? this.canvas.width / 2 : Math.random() * this.canvas.width;
    const originY = mode === 'center' ? this.canvas.height / 2 : 0;

    for (let i = 0; i < count; i++) {
      const angle = mode === 'center' ? Math.random() * Math.PI * 2 : Math.PI / 2 + (Math.random() - 0.5);
      const speed = mode === 'center' ? (4 + Math.random() * 9) : (2 + Math.random() * 5);

      this.particles.push({
        x: mode === 'center' ? originX : Math.random() * this.canvas.width,
        y: mode === 'center' ? originY : -20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 7 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        shape: Math.random() > 0.4 ? 'rect' : 'star',
        alpha: 1,
        gravity: 0.22,
        friction: 0.985
      });
    }

    if (!this.isConfettiActive) {
      this.isConfettiActive = true;
      this.renderConfetti();
    }
  }

  renderConfetti() {
    if (!this.isConfettiActive || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.0075;

      if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      } else {
        this.drawMiniStar(this.ctx, 0, 0, 5, p.size * 0.8, p.size * 0.4);
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.renderConfetti());
    } else {
      this.isConfettiActive = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  drawMiniStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
}

// تشغيل التطبيق بمجرد اكتمال تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  window.app = new KidsClockApp();
});
