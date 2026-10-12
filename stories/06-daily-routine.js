/**
 * ==============================================================================
 * الحلقة 6: «يوم في حياة البطل الصغير» ☀️🌙
 * Episode 6: A Day in the Life of Our Little Hero
 * ==============================================================================
 */

window.EPISODE_06 = {
  id: 6,
  icon: '☀️🌙',
  badgeLabelAr: '6. روتين يوم البطل',
  badgeLabelEn: '6. Daily Routine',
  titleAr: 'الحلقة 6: يوم في حياة البطل الصغير (من الصباح حتى النوم) ☀️🌙',
  titleEn: 'Episode 6: A Day in the Life of Our Little Hero ☀️🌙',
  theme: 'bedroom-stars',
  initialClock: [7, 0],
  sticker: {
    id: 'sticker-hero',
    icon: '👑',
    nameAr: 'تاج بطل أصدقاء الوقت الأعظم',
    nameEn: 'Grand Time Master Crown'
  },
  dialogues: [
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'والآن يا صديقي، انظر كيف تجعلنا الساعة أبطالاً ننظم يومنا الجميل من الصباح حتى المساء! ☀️',
      textEn: 'And now my friend, see how the clock turns us into heroes organizing our wonderful day! ☀️',
      clockTime: [7, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    },
    {
      speaker: 'turtle',
      speakerNameAr: 'سلحوف الهادئ 🐢',
      speakerNameEn: 'Calm Turtle 🐢',
      textAr: 'في الساعة 7:00 صباحاً تشرق الشمس ونستيقظ بنشاط للمدرسة! ☀️ وفي 1:30 نتناول الغداء اللذيذ! 🍽️',
      textEn: 'At 7:00 AM sun rises and we wake up energetic for school! ☀️ At 1:30 PM we enjoy yummy lunch! 🍽️',
      clockTime: [7, 0],
      actorStates: { tiktuk: 'idle', turtle: 'talking', bunny: 'idle' }
    },
    {
      speaker: 'bunny',
      speakerNameAr: 'أرنوب النفاث 🐇',
      speakerNameEn: 'Jet Bunny 🐇',
      textAr: 'وفي الساعة 4:30 عصراً نركض ونلعب بالكرة في الحديقة! ⚽ ثم في 8:00 مساءً تظهر النجوم وننام في سريرنا الهادئ! 🌙',
      textEn: 'At 4:30 PM we run and play ball in the park! ⚽ Then at 8:00 PM stars shine and we rest in bed! 🌙',
      clockTime: [8, 0],
      actorStates: { tiktuk: 'idle', turtle: 'idle', bunny: 'talking' }
    },
    {
      speaker: 'tiktuk',
      speakerNameAr: 'تكتُك المنبه ⏰',
      speakerNameEn: 'Tick-Tock Alarm ⏰',
      textAr: 'أنت الآن بطل جزيرة الوقت الحقيقي! تعرف الساعات والدقائق والنظام والنجاح! نحن فخورون بك جداً! 👑🌟',
      textEn: 'You are now the true champion of Time Island! You mastered hours, minutes, and routines! We are so proud of you! 👑🌟',
      clockTime: [8, 0],
      actorStates: { tiktuk: 'talking', turtle: 'idle', bunny: 'idle' }
    }
  ],
  challenge: {
    instructionAr: 'مهمتك الكرتونية: اضبط الساعة على 08:00 ليلاً 🌙 (موعد حكاية النوم الرائعة والنوم الهادئ)!',
    instructionEn: 'Your Mission: Set the clock to 08:00 PM 🌙 (Bedtime story & peaceful sleep time)!',
    targetHour: 8,
    targetMin: 0,
    successAr: 'تصبح على خير وأحلام وردية يا بطل الأبطال! لقد أكملت كل الحلقات وتوجت بتاج عباقرة الوقت! 👑🏆🌟🎉',
    successEn: 'Sweet dreams champion of champions! You completed all episodes and earned the Grand Master Crown! 👑🏆🌟🎉'
  }
};
