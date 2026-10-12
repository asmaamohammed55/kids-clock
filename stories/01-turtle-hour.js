/**
 * ==============================================================================
 * الحلقة 1: «سلحوف الكسول وسر الخطوات الزرقاء» 🐢
 * Episode 1: Calm Turtle & The Secret of Blue Steps
 * ==============================================================================
 */

window.EPISODE_01 = {
  id: 1,
  icon: '🐢',
  badgeLabelAr: '1. سلحوف وسر الساعات',
  badgeLabelEn: '1. Turtle & Hours',
  titleAr: 'الحلقة 1: سلحوف الكسول وسر الخطوات الزرقاء 🐢',
  titleEn: 'Episode 1: Calm Turtle & The Blue Hour Hand 🐢',
  theme: 'day-forest',
  initialClock: [3, 0],
  sticker: {
    id: 'sticker-turtle',
    icon: '🐢',
    nameAr: 'وسام سلحوف الساعاتي',
    nameEn: 'Turtle Hour Badge'
  },
  dialogues: [
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'يا هلا يا أبطالنا الصغار! أنا صديقكم «تكتُك».. مرحباً بكم في جزيرة الوقت الساحرة! 🌟',
      textEn: 'Hello little champions! I am your buddy Tick-Tock.. Welcome to magic Time Island! 🌟',
      clockTime: [3, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'hidden' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'انظروا هناك تحت الشجرة.. هذا صديقنا اللطيف «سلحوف»! سلحوف يحب الهدوء ويمشي ببطء شديد 🐢',
      textEn: 'Look under that tree.. Meet our sweet friend "Turtle"! Turtle loves peace and walks very slowly 🐢',
      clockTime: [3, 0],
      actorStates: { tiktuk: 'idle', turtle: 'walking', bunny: 'hidden' }
    },
    {
      speaker: 'turtle',
      speakerNameAr: 'سلحوف الهادئ 🐢',
      speakerNameEn: 'Calm Turtle 🐢',
      textAr: 'مرحباً يا بطل! أنا سلحوف.. خطواتي قصيرة وثابتة، تماماً مثل العقرب الأزرق القصير للساعات!',
      textEn: 'Hello hero! I am Turtle.. My steps are short and steady, just like the short blue Hour Hand!',
      clockTime: [3, 0],
      actorStates: { tiktuk: 'idle', turtle: 'talking', bunny: 'hidden' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'سلحوف يزور كل رقم على الساعة ببطء، ويستريح عند كل رقم ساعة كاملة! الآن هو يستريح عند 3، فتكون الساعة الثالثة!',
      textEn: 'Turtle visits every clock number slowly and rests a full hour at each! He rests at 3 now, so it is 3 o\'clock!',
      clockTime: [3, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'hidden' }
    }
  ],
  challenge: {
    instructionAr: 'مهمتك الكرتونية: اسحب صديقنا سلحوف (العقرب الأزرق) ليرتاح عند الرقم 5 تماماً!',
    instructionEn: 'Your Mission: Drag Turtle (the blue hand) to rest at number 5!',
    targetHour: 5,
    targetMin: 0,
    successAr: 'يا سلام عليك يا بطل! لقد ساعدت سلحوف في الوصول للرقم 5 وربحت أول ملصق كرتوني! 🐢⭐',
    successEn: 'Awesome champion! You helped Turtle reach number 5 and earned your first sticker! 🐢⭐'
  }
};
