/**
 * ==============================================================================
 * الحلقة 3: «برج الساعة ودقات الـ 12 تماماً» 🔔
 * Episode 3: The Summit of 12 & The O'Clock Bell
 * ==============================================================================
 */

window.EPISODE_03 = {
  id: 3,
  icon: '🔔',
  badgeLabelAr: '3. برج الساعة تماماً',
  badgeLabelEn: '3. O\'Clock Bell Tower',
  titleAr: 'الحلقة 3: برج الساعة ودقات الـ 12 تماماً 🔔',
  titleEn: 'Episode 3: The Summit of 12 & The O\'Clock Bell 🔔',
  theme: 'tower-sunset',
  initialClock: [5, 0],
  sticker: {
    id: 'sticker-bell',
    icon: '🔔',
    nameAr: 'وسام جرس البرج الذهبي',
    nameEn: 'Golden Bell Tower Badge'
  },
  dialogues: [
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'انظروا إلى أعلى برج في جزيرة الوقت.. هناك جرس ذهبي سحري عند الرقم 12 في القمة! 🏰',
      textEn: 'Look at the highest tower on Time Island.. There is a magic golden bell at number 12 at the peak! 🏰',
      clockTime: [5, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    },
    {
      speaker: 'bunny',
      speakerNameAr: 'أرنوب النفاث 🐇',
      speakerNameEn: 'Jet Bunny 🐇',
      textAr: 'عندما أتسلق القمة وأقف بالضبط عند 12، تصبح الدقائق صفراً ويهتز الجرس بصوت رنان: دينغ دونغ! 🔔',
      textEn: 'Whenever I climb to 12, minutes become zero and the bell chimes loud and clear: Ding Dong! 🔔',
      clockTime: [5, 0],
      actorStates: { tiktuk: 'idle', turtle: 'idle', bunny: 'talking' }
    },
    {
      speaker: 'turtle',
      speakerNameAr: 'سلحوف الهادئ 🐢',
      speakerNameEn: 'Calm Turtle 🐢',
      textAr: 'وعندما يقف أرنوب عند 12، أنظر أنا إلى مكاني.. إذا كنت عند 5، نقول: الساعة الخامسة تماماً! 🔔',
      textEn: 'And when Bunny is at 12, I check my spot.. If I am at 5, we say: It is 5 o\'clock exactly! 🔔',
      clockTime: [5, 0],
      actorStates: { tiktuk: 'idle', turtle: 'talking', bunny: 'idle' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'كلما وصل أرنوب لقمة 12، تبدأ ساعة جديدة ويدق الجرس بعدد الساعة! ما أجمل هذه النغمة!',
      textEn: 'Every time Bunny reaches the peak 12, a fresh hour begins and the bell rings! What a sweet chime!',
      clockTime: [5, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    }
  ],
  challenge: {
    instructionAr: 'مهمتك الكرتونية: اضبط أرنوب في القمة عند 12، وسلحوف عند 7 لنسمع جرس السابعة تماماً! 🔔',
    instructionEn: 'Your Mission: Place Bunny at peak (12) and Turtle at 7 to strike 7 o\'clock sharp! 🔔',
    targetHour: 7,
    targetMin: 0,
    successAr: 'دينغ دونغ! رن جرس السابعة تماماً واهتز البرج فرحاً بشطارتك يا بطل! 🔔🎉',
    successEn: 'Ding Dong! The 7 o\'clock bell rang and the tower cheered for your genius, hero! 🔔🎉'
  }
};
