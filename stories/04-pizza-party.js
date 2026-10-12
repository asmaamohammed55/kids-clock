/**
 * ==============================================================================
 * الحلقة 4: «حفلة بيتزا النصف والربع اللذيذة» 🍕
 * Episode 4: The Yummy Pizza Party: Halves & Quarters
 * ==============================================================================
 */

window.EPISODE_04 = {
  id: 4,
  icon: '🍕',
  badgeLabelAr: '4. بيتزا النصف والربع',
  badgeLabelEn: '4. Pizza Halves & Quarters',
  titleAr: 'الحلقة 4: حفلة بيتزا النصف والربع اللذيذة 🍕',
  titleEn: 'Episode 4: The Yummy Pizza Party: Halves & Quarters 🍕',
  theme: 'pizza-picnic',
  initialClock: [4, 30],
  showPizza: true,
  sticker: {
    id: 'sticker-pizza',
    icon: '🍕',
    nameAr: 'وسام طاهي البيتزا الساحر',
    nameEn: 'Master Pizza Chef Badge'
  },
  dialogues: [
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'حان وقت الغداء! شعر سلحوف وأرنوب بالجوع، فطلبنا شطيرة بيتزا دائرية تشبه ساعتنا تماماً! 🍕',
      textEn: 'Lunch time! Turtle and Bunny were hungry, so we ordered a round pizza looking just like our clock! 🍕',
      clockTime: [4, 30],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    },
    {
      speaker: 'bunny',
      speakerNameAr: 'أرنوب النفاث 🐇',
      speakerNameEn: 'Jet Bunny 🐇',
      textAr: 'عندما أقف عند الرقم 6، تقطع سكين البيتزا الدائرة إلى نصفين متساويين، فتكون الساعة والنصف (:30 دقيقة)!',
      textEn: 'When I stand at 6, the pizza cutter slices the circle into two equal halves, making it Half Past (:30 mins)!',
      clockTime: [4, 30],
      actorStates: { tiktuk: 'idle', turtle: 'idle', bunny: 'talking' }
    },
    {
      speaker: 'turtle',
      speakerNameAr: 'سلحوف الهادئ 🐢',
      speakerNameEn: 'Calm Turtle 🐢',
      textAr: 'وعندما يقف أرنوب عند الرقم 3، نأخذ ربع البيتزا اللذيذ الشهي، فتكون الساعة والربع (:15 دقيقة)! يممم! 😋',
      textEn: 'And when Bunny stands at 3, we take a yummy quarter slice, so the time is Quarter Past (:15 mins)! Yum! 😋',
      clockTime: [4, 15],
      actorStates: { tiktuk: 'idle', turtle: 'talking', bunny: 'idle' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'تذكروا دائماً يا عباقرة: الرقم 6 هو النصف (:30)، والرقم 3 هو الربع (:15)، والرقم 9 هو إلا ربعاً (:45)!',
      textEn: 'Always remember geniuses: 6 is Half (:30), 3 is Quarter (:15), and 9 is Quarter to (:45)!',
      clockTime: [4, 30],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    }
  ],
  challenge: {
    instructionAr: 'مهمتك الكرتونية: اضبط أرنوب عند 3 لنأكل ربع البيتزا اللذيذ (:15 دقيقة)! 🍕',
    instructionEn: 'Your Mission: Set Bunny at number 3 to eat a quarter pizza slice (:15 mins)! 🍕',
    targetHour: null,
    targetMin: 15,
    successAr: 'يممم! شريحة بيتزا ذهبية شهية! أتقنت ربع الساعة ونصفها بامتياز يا بطل! 🍕👑',
    successEn: 'Yummy! A delicious golden slice! You mastered quarters and halves, champion! 🍕👑'
  }
};
