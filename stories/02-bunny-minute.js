/**
 * ==============================================================================
 * الحلقة 2: «أرنوب النفاث ومضمار الـ 60 دقيقة» 🐇
 * Episode 2: Jet Bunny & The 60-Minute Race
 * ==============================================================================
 */

window.EPISODE_02 = {
  id: 2,
  icon: '🐇',
  badgeLabelAr: '2. سباق أرنوب والدقائق',
  badgeLabelEn: '2. Bunny & Minutes',
  titleAr: 'الحلقة 2: أرنوب النفاث ومضمار الـ 60 دقيقة 🐇',
  titleEn: 'Episode 2: Jet Bunny & The 60-Minute Race 🐇',
  theme: 'race-track',
  initialClock: [12, 0],
  sticker: {
    id: 'sticker-bunny',
    icon: '🐇',
    nameAr: 'وسام أرنوب النفاث',
    nameEn: 'Jet Bunny Speed Badge'
  },
  dialogues: [
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'وفجأة، وووش! اسمعوا صوت هذا الصاروخ السريع القادم نحونا! 🚀',
      textEn: 'Suddenly, whoosh! Listen to that supersonic rocket dashing towards us! 🚀',
      clockTime: [12, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'zooming' }
    },
    {
      speaker: 'bunny',
      speakerNameAr: 'أرنوب النفاث 🐇',
      speakerNameEn: 'Jet Bunny 🐇',
      textAr: 'ياااهو! أنا أرنوب السريع! أنا نشيط جداً ولا أحب الجلوس، تماماً مثل العقرب البرتقالي الطويل!',
      textEn: 'Yeehaw! I am speedy Bunny! I am super energetic and never stay still, just like the long orange Minute Hand!',
      clockTime: [12, 15],
      actorStates: { tiktuk: 'idle', turtle: 'idle', bunny: 'talking' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'أرنوب يركض في مضمار الساعة الدائري، ويقطع 60 خطوة دقيقة كاملة في كل جولة بينما سلحوف يخطو خطوة واحدة!',
      textEn: 'Bunny zooms around the round clock track, completing 60 minute steps every full lap while Turtle only takes one step!',
      clockTime: [12, 30],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'zooming' }
    },
    {
      speaker: 'bunny',
      speakerNameAr: 'أرنوب النفاث 🐇',
      speakerNameEn: 'Jet Bunny 🐇',
      textAr: 'عندما أركض نصف دورة في المضمار، أصل إلى الرقم 6 في الأسفل.. وأكون ركضت 30 دقيقة كاملة! ⏱️',
      textEn: 'When I run half a lap around the track, I land at 6 at the bottom.. which is 30 whole minutes! ⏱️',
      clockTime: [12, 30],
      actorStates: { tiktuk: 'idle', turtle: 'idle', bunny: 'talking' }
    }
  ],
  challenge: {
    instructionAr: 'مهمتك الكرتونية: ساعد أرنوب في الركض نصف دورة ليصل للأسفل عند الرقم 6 (:30 دقيقة)!',
    instructionEn: 'Your Mission: Help Bunny run half a lap to reach bottom at number 6 (:30 mins)!',
    targetHour: null,
    targetMin: 30,
    successAr: 'رائع جداً! ركض أرنوب نصف دورة وقطع 30 دقيقة وحصلت على وسام السرعة! 🐇⚡',
    successEn: 'Super fast! Bunny completed half a lap (30 mins) and you unlocked the Speed Badge! 🐇⚡'
  }
};
