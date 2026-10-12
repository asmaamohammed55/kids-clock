/**
 * ==============================================================================
 * محرك مسرح سينما الحكايات الكرتونية - Cartoon Cinema Story Engine
 * تقنيات: SVG Cartoon Actors, Dynamic Playback, Drag & Drop Clock, Voice Narration & Audio FX
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

    // حالة وقت ساعة المسرح
    this.stageHours = 3;
    this.stageMinutes = 0;

    // حالة السحب لعقارب ساعة المسرح
    this.isDragging = false;
    this.draggedHand = null; // 'hour' | 'minute'

    // الملصقات المحفوظة المجمعة من إكمال التحديات
    const savedStickers = localStorage.getItem('kids_clock_stickers');
    this.unlockedStickers = new Set(savedStickers ? JSON.parse(savedStickers) : []);

    this.initDOM();
    this.bindEvents();
    this.initStageClockDragging();
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
    this.stageClockSvg = document.getElementById('stageClockSvg');
    this.stageHourHand = document.getElementById('stageHourHand');
    this.stageMinuteHand = document.getElementById('stageMinuteHand');
    this.stageDigitalTime = document.getElementById('stageDigitalTime');

    this.actorTiktuk = document.getElementById('actorTiktuk');
    this.actorTurtle = document.getElementById('actorTurtle');
    this.actorBunny = document.getElementById('actorBunny');

    // فقاعة الحوار
    this.speechBubble = document.getElementById('stageSpeechBubble');
    this.bubbleAvatar = document.getElementById('bubbleAvatar');
    this.bubbleText = document.getElementById('bubbleText');
    this.bubbleSpeakBtn = document.getElementById('bubbleSpeakBtn');

    // أزرار التحكم
    this.btnPlay = document.getElementById('theaterBtnPlay');
    this.btnPlayText = document.getElementById('theaterPlayBtnText');
    this.btnReplay = document.getElementById('theaterBtnReplay');
    this.btnPrev = document.getElementById('theaterBtnPrev');
    this.btnNext = document.getElementById('theaterBtnNext');

    // بطاقة المهمة
    this.taskZonePrompt = document.getElementById('taskZonePrompt');
    this.btnTaskCheck = document.getElementById('btnTheaterTaskCheck');
    this.btnTaskHelp = document.getElementById('btnTheaterTaskHelp');
    this.taskResult = document.getElementById('taskZoneResult');

    // أزرار الضبط السريع في المسرح
    this.btnHourDown = document.getElementById('btnStageHourDown');
    this.btnHourUp = document.getElementById('btnStageHourUp');
    this.btnMinDown = document.getElementById('btnStageMinDown');
    this.btnMinUp = document.getElementById('btnStageMinUp');

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

    // تفاعل أزرار الضبط السريع (+- ساعة و +- دقيقة)
    if (this.btnHourDown) {
      this.btnHourDown.addEventListener('click', () => {
        let h = this.stageHours - 1;
        if (h < 1) h = 12;
        this.setStageTime(h, this.stageMinutes, true);
        if (window.app) window.app.playTickSound();
      });
    }
    if (this.btnHourUp) {
      this.btnHourUp.addEventListener('click', () => {
        let h = this.stageHours + 1;
        if (h > 12) h = 1;
        this.setStageTime(h, this.stageMinutes, true);
        if (window.app) window.app.playTickSound();
      });
    }
    if (this.btnMinDown) {
      this.btnMinDown.addEventListener('click', () => {
        let m = this.stageMinutes - 15;
        let h = this.stageHours;
        if (m < 0) {
          m += 60;
          h = h - 1 < 1 ? 12 : h - 1;
        }
        this.setStageTime(h, m, true);
        if (window.app) window.app.playTickSound();
      });
    }
    if (this.btnMinUp) {
      this.btnMinUp.addEventListener('click', () => {
        let m = this.stageMinutes + 15;
        let h = this.stageHours;
        if (m >= 60) {
          m -= 60;
          h = h + 1 > 12 ? 1 : h + 1;
        }
        this.setStageTime(h, m, true);
        if (window.app) window.app.playTickSound();
      });
    }

    // النقر المباشر على أرقام وجه الساعة لتوجيه عقرب الساعات فوراً
    const numButtons = document.querySelectorAll('.stage-num-btn');
    numButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hr = parseInt(btn.getAttribute('data-hour'), 10);
        if (hr) {
          this.setStageTime(hr, this.stageMinutes, true);
          if (window.app) window.app.playTickSound();
        }
      });
    });

    // زر الاستماع المباشر داخل فقاعة الحوار
    if (this.bubbleSpeakBtn) {
      this.bubbleSpeakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speakCurrentDialogue(true);
      });
    }

    if (this.speechBubble) {
      this.speechBubble.addEventListener('click', () => {
        this.speakCurrentDialogue(false);
      });
    }

    // تفاعل النقر المباشر على الشخصيات الكرتونية لتتكلم وتصدر أصواتها اللطيفة
    if (this.actorTiktuk) {
      this.actorTiktuk.addEventListener('click', () => {
        this.playCartoonVoice('tiktuk');
        if (window.app) window.app.speakText(this.currentLang === 'ar' ? 'أنا صديقكم تكتك المنبه! تيك توك، هيا نتعلم الساعة معاً!' : 'I am Tick-Tock the alarm! Let us learn the clock together!');
      });
    }
    if (this.actorTurtle) {
      this.actorTurtle.addEventListener('click', () => {
        this.playCartoonVoice('turtle');
        if (window.app) window.app.speakText(this.currentLang === 'ar' ? 'أنا سلحوف الهادئ، خطواتي القصيرة هي الساعات!' : 'I am Turtle, my short steps show the hours!');
      });
    }
    if (this.actorBunny) {
      this.actorBunny.addEventListener('click', () => {
        this.playCartoonVoice('bunny');
        if (window.app) window.app.speakText(this.currentLang === 'ar' ? 'أنا أرنوب النفاث السريع، أركض 60 دقيقة في كل دورة كاملة!' : 'I am speedy Bunny, running 60 minutes every full lap!');
      });
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
        setTimeout(() => this.openTheater(0), 150);
      });
    }
  }

  /* --------------------------------------------------------------------------
     تفاعل سحب وتحريك عقارب ساعة المسرح باللمس والماوس
     -------------------------------------------------------------------------- */
  initStageClockDragging() {
    if (!this.stageClockSvg) return;

    const getClockAngle = (clientX, clientY) => {
      const rect = this.stageClockSvg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      return deg;
    };

    const handleStart = (e) => {
      const target = e.target.closest('#stageHourHand, #stageMinuteHand');
      if (!target) return;

      this.isDragging = true;
      this.draggedHand = target.id === 'stageHourHand' ? 'hour' : 'minute';
      e.preventDefault();
      if (window.app) window.app.playTickSound();
    };

    const handleMove = (e) => {
      if (!this.isDragging || !this.draggedHand) return;
      e.preventDefault();

      const touch = e.touches ? e.touches[0] : e;
      const deg = getClockAngle(touch.clientX, touch.clientY);

      if (this.draggedHand === 'hour') {
        let hr = Math.round(deg / 30);
        if (hr === 0) hr = 12;
        this.setStageTime(hr, this.stageMinutes, true);
      } else if (this.draggedHand === 'minute') {
        let mn = Math.round(deg / 6) % 60;
        this.setStageTime(this.stageHours, mn, true);
      }
    };

    const handleEnd = () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.draggedHand = null;
        if (window.app) window.app.playTickSound();
      }
    };

    this.stageClockSvg.addEventListener('mousedown', handleStart);
    this.stageClockSvg.addEventListener('touchstart', handleStart, { passive: false });

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });

    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
  }

  setStageTime(h, m, syncWithMain = true) {
    this.stageHours = h;
    this.stageMinutes = m;

    const hDeg = ((h % 12) * 30) + (m * 0.5);
    const mDeg = m * 6;

    if (this.stageHourHand) this.stageHourHand.style.transform = `rotate(${hDeg}deg)`;
    if (this.stageMinuteHand) this.stageMinuteHand.style.transform = `rotate(${mDeg}deg)`;

    // تحديث الشارة الرقمية في المسرح
    if (this.stageDigitalTime) {
      const padH = String(h).padStart(2, '0');
      const padM = String(m).padStart(2, '0');
      this.stageDigitalTime.textContent = `${padH}:${padM}`;
    }

    // مزامنة مع التطبيق الرئيسي إذا كان متاحاً
    if (syncWithMain && window.app) {
      window.app.setTime(h, m, false);
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
      btn.type = 'button';
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

    // ضبط الوقت في ساعة المسرح
    if (ep.initialClock) {
      this.setStageTime(ep.initialClock[0], ep.initialClock[1], true);
    }

    // تجهيز بطاقة المهمة
    if (this.taskZonePrompt && ep.challenge) {
      this.taskZonePrompt.textContent = this.currentLang === 'ar' ? ep.challenge.instructionAr : ep.challenge.instructionEn;
    }
    if (this.taskResult) {
      this.taskResult.style.display = 'none';
      this.taskResult.textContent = '';
    }

    // عرض أول مشهد حواري
    this.displayDialogue(0);
    this.renderStickerAlbum();
  }

  // توليد نغمات أصوات كرتونية مبهجة باستخدام محرك الصوت Web Audio API
  playCartoonVoice(speaker) {
    if (!window.app || !window.app.audioCtx || !window.app.soundEnabled) return;
    window.app.ensureAudioUnlocked();
    const ctx = window.app.audioCtx;

    const baseFreqs = {
      tiktuk: [520, 640, 580, 720, 600],
      turtle: [220, 260, 240, 280, 250],
      bunny: [680, 840, 750, 920, 800]
    };
    const freqs = baseFreqs[speaker] || baseFreqs.tiktuk;

    freqs.forEach((freq, idx) => {
      const startTime = ctx.currentTime + (idx * 0.075);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = speaker === 'turtle' ? 'sine' : (speaker === 'bunny' ? 'triangle' : 'triangle');
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.15, startTime + 0.065);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.075);
    });
  }

  // نطق الحوار الحالي عند النقر على الفقاعة أو زر الاستماع
  speakCurrentDialogue(forceSound = false) {
    const ep = this.currentEpisode;
    if (!ep || !ep.dialogues || !ep.dialogues[this.currentDiagIndex]) return;

    const diag = ep.dialogues[this.currentDiagIndex];
    const text = this.currentLang === 'ar' ? diag.textAr : diag.textEn;

    if (window.app) {
      window.app.ensureAudioUnlocked();
      this.playCartoonVoice(diag.speaker);
      window.app.speakText(text);
    }
  }

  displayDialogue(diagIdx) {
    const ep = this.currentEpisode;
    if (!ep || !ep.dialogues || !ep.dialogues[diagIdx]) return;

    this.currentDiagIndex = diagIdx;
    const diag = ep.dialogues[diagIdx];

    // تحديث الفقاعة
    const text = this.currentLang === 'ar' ? diag.textAr : diag.textEn;
    const rawSpeakerName = this.currentLang === 'ar' ? diag.speakerNameAr : diag.speakerNameEn;
    // تنظيف اسم المتحدث من التكرار
    const speakerClean = rawSpeakerName.replace(/⏰|🐢|🐇/g, '').trim();

    if (this.bubbleAvatar) {
      const avatars = { tiktuk: '⏰', turtle: '🐢', bunny: '🐇' };
      this.bubbleAvatar.textContent = avatars[diag.speaker] || '⏰';
    }
    if (this.bubbleText) {
      this.bubbleText.innerHTML = `<strong>${speakerClean}:</strong> ${text}`;
    }

    // تحريك وتحديث ظهور الشخصيات في المشهد
    this.updateActorStates(diag.actorStates || {});

    // تحريك ساعة المسرح إذا كان هناك وقت محدد للمشهد
    if (diag.clockTime) {
      this.setStageTime(diag.clockTime[0], diag.clockTime[1], true);
    }

    // تشغيل نغمة صوت الشخصية الكرتونية فوراً
    this.playCartoonVoice(diag.speaker);

    // نطق الحوار صوتياً
    if (window.app) {
      window.app.speakText(text, () => {
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
    if (!ep || !ep.challenge) return;

    let hMatch = true;
    if (ep.challenge.targetHour !== null) {
      hMatch = this.stageHours === ep.challenge.targetHour;
    }
    const mDiff = Math.abs(this.stageMinutes - ep.challenge.targetMin);
    const mMatch = mDiff <= 2;

    if (hMatch && mMatch) {
      // إنجاز رائع
      if (this.taskResult) {
        this.taskResult.className = 'task-zone-result success';
        this.taskResult.textContent = this.currentLang === 'ar' ? ep.challenge.successAr : ep.challenge.successEn;
        this.taskResult.style.display = 'block';
      }

      this.unlockSticker(ep.sticker.id);
      if (window.app) {
        window.app.playCelebrationFanfare();
        window.app.launchFlyingBalloons(14);
        window.app.triggerConfetti('center', 90);
      }

      const msg = this.currentLang === 'ar' ? ep.challenge.successAr : ep.challenge.successEn;
      if (window.app) window.app.speakText(msg);
    } else {
      if (this.taskResult) {
        this.taskResult.className = 'task-zone-result retry';
        this.taskResult.textContent = this.currentLang === 'ar'
          ? `قريب جداً يا بطل! تذكر: ${ep.challenge.instructionAr}`
          : `Almost there hero! Remember: ${ep.challenge.instructionEn}`;
        this.taskResult.style.display = 'block';
      }
      if (window.app) window.app.playOopsSound();
    }
  }

  helpChallenge() {
    const ep = this.currentEpisode;
    if (!ep || !ep.challenge) return;

    const setH = ep.challenge.targetHour !== null ? ep.challenge.targetHour : this.stageHours;
    this.setStageTime(setH, ep.challenge.targetMin, true);
    if (window.app) window.app.playChimeSound();

    if (this.taskResult) {
      this.taskResult.className = 'task-zone-result success';
      this.taskResult.textContent = this.currentLang === 'ar'
        ? `ساعدك تكتك وضبط العقارب! ${ep.challenge.successAr}`
        : `Tick-Tock helped you set the hands! ${ep.challenge.successEn}`;
      this.taskResult.style.display = 'block';
    }

    this.unlockSticker(ep.sticker.id);
    if (window.app) window.app.playCelebrationFanfare();
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
