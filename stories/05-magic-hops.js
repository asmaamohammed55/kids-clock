/**
 * ==============================================================================
 * الحلقة 5: «قفزات الأرنب السحرية بالخمسات» 🦘
 * Episode 5: Bunny's Magic 5-Hop Bubbles
 * ==============================================================================
 */

window.EPISODE_05 = {
  id: 5,
  icon: '🦘',
  badgeLabelAr: '5. قفزات الخمسات السحرية',
  badgeLabelEn: '5. Magic 5s Hops',
  titleAr: 'الحلقة 5: قفزات الأرنب السحرية بالخمسات 🦘',
  titleEn: 'Episode 5: Bunny\'s Magic 5-Hop Bubbles 🦘',
  theme: 'magic-pond',
  initialClock: [8, 20],
  showGuides: true,
  sticker: {
    id: 'sticker-hop',
    icon: '🦘',
    nameAr: 'وسام القفزات الخماسية',
    nameEn: 'Magic 5s Kangaroo Badge'
  },
  dialogues: [
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'تعالوا نكتشف معاً أعظم سر سحري في جزيرة الوقت.. سر قفزات الخمسات! 🪄',
      textEn: 'Come discover the greatest magic secret on Time Island.. The secret of 5-minute hops! 🪄',
      clockTime: [8, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    },
    {
      speaker: 'bunny',
      speakerNameAr: 'أرنوب النفاث 🐇',
      speakerNameEn: 'Jet Bunny 🐇',
      textAr: 'ارتديت حذاء القفز السحري! بين كل رقمين على الساعة توجد 5 خطوات سرية، أقفزها هكذا: بوب! بوب! 🦘',
      textEn: 'I put on my magic jumping shoes! Between every two clock numbers lie 5 secret steps: Pop! Pop! 🦘',
      clockTime: [8, 10],
      actorStates: { tiktuk: 'idle', turtle: 'idle', bunny: 'zooming' }
    },
    {
      speaker: 'turtle',
      speakerNameAr: 'سلحوف الهادئ 🐢',
      speakerNameEn: 'Calm Turtle 🐢',
      textAr: 'عندما يقفز أرنوب إلى 1 = 5 دقائق، وإلى 2 = 10 دقائق، وإلى 3 = 15، وإلى 4 = 20 دقيقة! قفزات مذهلة!',
      textEn: 'When Bunny hops to 1 = 5 mins, to 2 = 10 mins, to 3 = 15, and to 4 = 20 mins! Incredible hops!',
      clockTime: [8, 20],
      actorStates: { tiktuk: 'idle', turtle: 'talking', bunny: 'idle' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'السر العبقري: اضرب رقم الساعة في 5 (مثلاً 4 × 5 = 20 دقيقة) لتعرف الدقائق فوراً كالبطل الخارق!',
      textEn: 'The superhero secret: Multiply the number by 5 (e.g. 4 × 5 = 20 mins) to read minutes in a flash!',
      clockTime: [8, 20],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    }
  ],
  challenge: {
    instructionAr: 'مهمتك الكرتونية: حرّك أرنوب ليقفز 4 قفزات حتى الرقم 4 ليركض 20 دقيقة كاملة! 🦘',
    instructionEn: 'Your Mission: Move Bunny to hop 4 times to number 4 to run 20 full minutes! 🦘',
    targetHour: null,
    targetMin: 20,
    successAr: 'قفزة عبقرية مذهلة! 4 × 5 = 20 دقيقة! لقد أتقنت العد بالخمسات بنجاح ساحق! 🦘⭐🎉',
    successEn: 'Genius jump! 4 × 5 = 20 minutes! You mastered counting by 5s with flying colors! 🦘⭐🎉'
  }
};
