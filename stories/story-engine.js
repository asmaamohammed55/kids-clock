/**
 * ==============================================================================
 * محرك مسرح سينما الحكايات الكرتونية - Cartoon Cinema Story Engine
 * تقنيات: SVG Cartoon Actors, Dynamic Playback, Voice Narration & Audio FX
 * ==============================================================================
 */

class CartoonStoryEngine {
  constructor() {
    this.episodes = [
      window.EPISODE_01,
      window.EPISODE_02,
      window.EPISODE_03,
      window.EPISODE_04,
      window.EPISODE_05,
      window.EPISODE_06
    ];

    this.currentEpIndex = 0;
    this.currentDiagIndex = 0;
    this.isPlaying = false;
    this.timer = null;

    // الملصقات المحفوظة المجمعة من إكمال التحديات
    const savedStickers = localStorage.getItem('kids_clock_stickers');
    this.unlockedStickers = new Set(savedStickers ? JSON.parse(savedStickers) : []);

    this.initDOM();
    this.bindEvents();
    this.renderStickerAlbum();
  }

  get currentEpisode() {
    return this.episodes[this.currentEpIndex] || this.episodes[0];
  }

  get currentLang() {
    return window.app ? window.app.currentLang : (localStorage.getItem('kids_clock_lang') || 'ar');
  }

  initDOM() {
    this.modal = document.getElementById('cartoonTheaterModal');
    this.closeBtn = document.getElementById('theaterCloseBtn');
    this.episodesCarousel = document.getElementById('episodesCarouselBar');
    this.theaterTitle = document.getElementById('theaterEpTitle');
    
    // عناصر خشبة المسرح الكرتوني
    this.stageCanvasArea = document.getElementById('theaterStageArea');
    this.stageClockActor = document.getElementById('stageClockActor');
    this.actorTiktuk = document.getElementById('actorTiktuk');
    this.actorTurtle = document.getElementById('actorTurtle');
    this.actorBunny = document.getElementById('actorBunny');

    // فقاعة الحوار
    this.speechBubble = document.getElementById('stageSpeechBubble');
    this.bubbleAvatar = document.getElementById('bubbleAvatar');
    this.bubbleText = document.getElementById('bubbleText');

    // أزرار التحكم
    this.btnPlay = document.getElementById('theaterBtnPlay');
    this.btnReplay = document.getElementById('theaterBtnReplay');
    this.btnPrev = document.getElementById('theaterBtnPrev');
    this.btnNext = document.getElementById('theaterBtnNext');

    // بطاقة المهمة
    this.taskZonePrompt = document.getElementById('taskZonePrompt');
    this.btnTaskCheck = document.getElementById('btnTheaterTaskCheck');
    this.btnTaskHelp = document.getElementById('btnTheaterTaskHelp');
    this.taskResult = document.getElementById('taskZoneResult');

    // ألبوم الملصقات
    this.stickersAlbum = document.getElementById('stickersAlbumRow');
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeTheater());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeTheater();
      });
    }

    if (this.btnPlay) {
      this.btnPlay.addEventListener('click', () => {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.playEpisode();
        }
      });
    }

    if (this.btnReplay) {
      this.btnReplay.addEventListener('click', () => this.replay());
    }

    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => this.prevEpisode());
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => this.nextEpisode());
    }

    if (this.btnTaskCheck) {
      this.btnTaskCheck.addEventListener('click', () => this.checkChallenge());
    }

    if (this.btnTaskHelp) {
      this.btnTaskHelp.addEventListener('click', () => this.helpChallenge());
    }

    // زر تشغيل السينما من البانر في الصفحة الرئيسية
    const cinemaBanner = document.getElementById('openCartoonCinemaBanner');
    if (cinemaBanner) {
      cinemaBanner.addEventListener('click', () => this.openTheater(0));
    }

    const cinemaInline = document.getElementById('openCinemaInlineBtn');
    if (cinemaInline) {
      cinemaInline.addEventListener('click', () => this.openTheater(this.currentEpIndex || 0));
    }

    // التبويب العلوي
    const tabStory = document.getElementById('tabLessons');
    if (tabStory) {
      tabStory.addEventListener('click', () => {
        // فتح المسرح السينمائي فوراً عند اختيار التبويب لمزيد من المتعة
        setTimeout(() => this.openTheater(0), 150);
      });
    }
  }

  openTheater(episodeIndex = 0) {
    if (!this.modal) return;
    this.modal.classList.add('active');
    this.loadEpisode(episodeIndex);
    this.playEpisode();
    if (window.app) window.app.playChimeSound();
  }

  closeTheater() {
    if (!this.modal) return;
    this.pause();
    this.modal.classList.remove('active');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  renderEpisodesCarousel() {
    if (!this.episodesCarousel) return;
    this.episodesCarousel.innerHTML = '';

    this.episodes.forEach((ep, idx) => {
      const btn = document.createElement('button');
      btn.className = `episode-pill-tab ${idx === this.currentEpIndex ? 'active' : ''}`;
      const label = this.currentLang === 'ar' ? ep.badgeLabelAr : ep.badgeLabelEn;
      btn.innerHTML = `<span>${ep.icon}</span> <span>${label}</span>`;
      btn.addEventListener('click', () => {
        this.loadEpisode(idx);
        this.playEpisode();
      });
      this.episodesCarousel.appendChild(btn);
    });
  }

  loadEpisode(index) {
    this.pause();
    this.currentEpIndex = index;
    this.currentDiagIndex = 0;
    const ep = this.currentEpisode;

    this.renderEpisodesCarousel();

    // تحديث العنوان
    if (this.theaterTitle) {
      this.theaterTitle.textContent = this.currentLang === 'ar' ? ep.titleAr : ep.titleEn;
    }

    // تغيير الثيم البصري لخلفية المسرح
    if (this.stageCanvasArea) {
      this.stageCanvasArea.className = `theater-stage-canvas-area theme-${ep.theme}`;
    }

    // ضبط الوقت في ساعة المسرح وفي التطبيق الرئيسي
    if (window.app && ep.initialClock) {
      window.app.setTime(ep.initialClock[0], ep.initialClock[1], true);
      this.updateStageClock(ep.initialClock[0], ep.initialClock[1]);
    }

    // تجهيز بطاقة المهمة
    if (this.taskZonePrompt && ep.challenge) {
      this.taskZonePrompt.textContent = this.currentLang === 'ar' ? ep.challenge.instructionAr : ep.challenge.instructionEn;
    }
    if (this.taskResult) {
      this.taskResult.style.display = 'none';
    }

    // عرض أول مشهد حواري وتشغيله
    this.displayDialogue(0);
    this.renderStickerAlbum();
  }

  displayDialogue(diagIdx) {
    const ep = this.currentEpisode;
    if (!ep.dialogues || !ep.dialogues[diagIdx]) return;

    this.currentDiagIndex = diagIdx;
    const diag = ep.dialogues[diagIdx];

    // تحديث الفقاعة
    const text = this.currentLang === 'ar' ? diag.textAr : diag.textEn;
    const speakerName = this.currentLang === 'ar' ? diag.speakerNameAr : diag.speakerNameEn;

    if (this.bubbleAvatar) {
      const avatars = { tiktuk: '⏰', turtle: '🐢', bunny: '🐇' };
      this.bubbleAvatar.textContent = avatars[diag.speaker] || '⏰';
    }
    if (this.bubbleText) {
      this.bubbleText.innerHTML = `<strong>${speakerName}:</strong> ${text}`;
    }

    // تحريك الشخصيات
    this.updateActorStates(diag.actorStates || {});

    // تحريك ساعة المسرح إذا كان هناك وقت محدد للمشهد
    if (diag.clockTime) {
      if (window.app) window.app.setTime(diag.clockTime[0], diag.clockTime[1], true);
      this.updateStageClock(diag.clockTime[0], diag.clockTime[1]);
    }

    // نطق الحوار صوتياً
    if (window.app) {
      window.app.speakText(text, () => {
        // عند انتهاء الصوت، الانتقال تلقائياً للمشهد التالي إذا كان المشغل في وضع التشغيل
        if (this.isPlaying) {
          this.timer = setTimeout(() => {
            if (this.currentDiagIndex + 1 < ep.dialogues.length) {
              this.displayDialogue(this.currentDiagIndex + 1);
            } else {
              this.pause(); // اكتمل الفيلم الكرتوني
              if (window.app) window.app.playCelebrationFanfare();
            }
          }, 650);
        }
      });
    }
  }

  updateActorStates(states) {
    if (this.actorTiktuk) {
      this.actorTiktuk.className = `actor-character actor-tiktuk ${states.tiktuk || 'idle'}`;
    }
    if (this.actorTurtle) {
      this.actorTurtle.className = `actor-character actor-turtle ${states.turtle || 'idle'}`;
    }
    if (this.actorBunny) {
      this.actorBunny.className = `actor-character actor-bunny ${states.bunny || 'idle'}`;
    }
  }

  updateStageClock(h, m) {
    if (!this.stageClockActor) return;
    const hDeg = ((h % 12) * 30) + (m * 0.5);
    const mDeg = m * 6;
    const hHand = this.stageClockActor.querySelector('#stageHourHand');
    const mHand = this.stageClockActor.querySelector('#stageMinuteHand');
    if (hHand) hHand.style.transform = `rotate(${hDeg}deg)`;
    if (mHand) mHand.style.transform = `rotate(${mDeg}deg)`;
  }

  playEpisode() {
    this.isPlaying = true;
    if (this.btnPlay) {
      this.btnPlay.innerHTML = `<span>⏸️</span> <span>${this.currentLang === 'ar' ? 'إيقاف مؤقت' : 'Pause'}</span>`;
    }
    this.displayDialogue(this.currentDiagIndex);
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.timer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (this.btnPlay) {
      this.btnPlay.innerHTML = `<span>▶️</span> <span>${this.currentLang === 'ar' ? 'تشغيل الفيلم' : 'Play Movie'}</span>`;
    }
    this.updateActorStates({ tiktuk: 'idle', turtle: 'idle', bunny: 'idle' });
  }

  replay() {
    this.pause();
    this.currentDiagIndex = 0;
    this.playEpisode();
  }

  nextEpisode() {
    if (this.currentEpIndex + 1 < this.episodes.length) {
      this.loadEpisode(this.currentEpIndex + 1);
      this.playEpisode();
    }
  }

  prevEpisode() {
    if (this.currentEpIndex > 0) {
      this.loadEpisode(this.currentEpIndex - 1);
      this.playEpisode();
    }
  }

  checkChallenge() {
    const ep = this.currentEpisode;
    if (!ep || !ep.challenge || !window.app) return;

    let hMatch = true;
    if (ep.challenge.targetHour !== null) {
      hMatch = window.app.currentHours === ep.challenge.targetHour;
    }
    const mDiff = Math.abs(window.app.currentMinutes - ep.challenge.targetMin);
    const mMatch = mDiff <= 2;

    if (hMatch && mMatch) {
      // إنجاز رائع
      if (this.taskResult) {
        this.taskResult.className = 'task-zone-result success';
        this.taskResult.textContent = this.currentLang === 'ar' ? ep.challenge.successAr : ep.challenge.successEn;
        this.taskResult.style.display = 'block';
      }

      this.unlockSticker(ep.sticker.id);
      window.app.playCelebrationFanfare();
      window.app.launchFlyingBalloons(12);
      window.app.triggerConfetti('center', 90);

      const msg = this.currentLang === 'ar' ? ep.challenge.successAr : ep.challenge.successEn;
      window.app.speakText(msg);
    } else {
      if (this.taskResult) {
        this.taskResult.className = 'task-zone-result retry';
        this.taskResult.textContent = this.currentLang === 'ar'
          ? `قريب جداً يا بطل! تذكر: ${ep.challenge.instructionAr}`
          : `Almost there hero! Remember: ${ep.challenge.instructionEn}`;
        this.taskResult.style.display = 'block';
      }
      window.app.playOopsSound();
    }
  }

  helpChallenge() {
    const ep = this.currentEpisode;
    if (!ep || !ep.challenge || !window.app) return;

    const setH = ep.challenge.targetHour !== null ? ep.challenge.targetHour : window.app.currentHours;
    window.app.setTime(setH, ep.challenge.targetMin, true);
    this.updateStageClock(setH, ep.challenge.targetMin);
    window.app.playChimeSound();

    if (this.taskResult) {
      this.taskResult.className = 'task-zone-result success';
      this.taskResult.textContent = this.currentLang === 'ar'
        ? `ساعدك تكتك وضبط العقارب! ${ep.challenge.successAr}`
        : `Tick-Tock helped you set the hands! ${ep.challenge.successEn}`;
      this.taskResult.style.display = 'block';
    }

    this.unlockSticker(ep.sticker.id);
    window.app.playCelebrationFanfare();
  }

  unlockSticker(stickerId) {
    if (!stickerId) return;
    this.unlockedStickers.add(stickerId);
    localStorage.setItem('kids_clock_stickers', JSON.stringify([...this.unlockedStickers]));
    this.renderStickerAlbum();
  }

  renderStickerAlbum() {
    if (!this.stickersAlbum) return;
    this.stickersAlbum.innerHTML = '';

    this.episodes.forEach(ep => {
      const isUnlocked = this.unlockedStickers.has(ep.sticker.id);
      const el = document.createElement('div');
      el.className = `sticker-item ${isUnlocked ? 'unlocked' : ''}`;
      const name = this.currentLang === 'ar' ? ep.sticker.nameAr : ep.sticker.nameEn;
      el.title = name;
      el.innerHTML = `
        <span class="sticker-icon">${ep.sticker.icon}</span>
        <span class="sticker-label">${name}</span>
      `;
      this.stickersAlbum.appendChild(el);
    });
  }
}

// تهيئة محرك السينما الكرتونية بعد اكتمال تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  window.cartoonEngine = new CartoonStoryEngine();
});
