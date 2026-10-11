/**
 * ==============================================================================
 * جزيرة الوقت - المحرك البرمجي التفاعلي والصوتي للأطفال
 * تقنيات: Modern Vanilla JS, SVG Math, Web Audio API, Canvas Particles
 * ==============================================================================
 */

class KidsClockApp {
  constructor() {
    // الحالة الأساسية للتطبيق
    this.currentHours = 12;
    this.currentMinutes = 0;
    this.is24Hour = false;
    this.starsCount = 0;
    this.soundEnabled = true;
    this.activeMode = 'explore'; // 'explore' | 'lessons' | 'quiz'
    this.isDayTime = true; // حالة النهار ☀️ أو الليل 🌙
    this.childName = localStorage.getItem('kids_clock_child_name') || ''; // اسم الطفل المحفوظ

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
      this.setMascotMessage(`أهلاً بعودتك يا بطلنا <strong>«${this.childName}»</strong>! أنا صديقك تكتك، جاهز لمغامرة اليوم؟`);
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

  // النطق الصوتي العربي باستخدام محرك نطق المتصفح
  speakArabic(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // إلغاء أي جمل سابقة

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9; // سرعة نطق مناسبة للأطفال
    utterance.pitch = 1.2; // نبرة مرحة
    window.speechSynthesis.speak(utterance);
  }

  /* --------------------------------------------------------------------------
     2. ربط عناصر واجهة المستخدم DOM
     -------------------------------------------------------------------------- */
  bindDOMElements() {
    this.svgClock = document.getElementById('interactiveClock');
    this.hourHandGroup = document.getElementById('hourHandGroup');
    this.minuteHandGroup = document.getElementById('minuteHandGroup');
    this.pieSlice = document.getElementById('pieSlice');

    this.digitalHours = document.getElementById('digitalHours');
    this.digitalMinutes = document.getElementById('digitalMinutes');
    this.digitalPeriod = document.getElementById('digitalPeriod');
    this.arabicPhrase = document.getElementById('arabicTimePhrase');
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
     3. توليد علامات وأرقام الساعة التناظرية ديناميكياً بـ SVG
     -------------------------------------------------------------------------- */
  generateClockFaceElements() {
    const ticksGroup = document.getElementById('minuteTicks');
    const numbersGroup = document.getElementById('hourNumbers');
    const guidesGroup = document.getElementById('minuteNumbersGuide');

    // توليد 60 شرطة دقيقة
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

    // توليد أرقام الساعات الكبيرة (1 إلى 12)
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

    // توليد أرقام الدقائق الخارجية المساعدة للأطفال (00, 05, 10, 15...)
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
    // التفاعل مع سحب العقارب (يدعم الماوس واللمس على الهواتف والأجهزة اللوحية)
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
      this.setMascotMessage('اضبطنا الساعة الآن على الوقت الحقيقي الجميل!');
    });

    // أزرار التبديل والمساعدة
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

    // النقر على شارة النهار والليل لتبديل حالة السماء يدوياً
    this.digitalPeriod.addEventListener('click', () => {
      this.isDayTime = !this.isDayTime;
      this.updateSkyAndPeriod();
      this.playTickSound();
      this.setMascotMessage(this.isDayTime ? 'أشرقت الشمس الجميلة! صباح الخير والنشاط! ☀️' : 'حل الليل الهادئ وظهر القمر والنجوم! 🌙');
    });

    // نطق الكلام عند الضغط على زر استمع أو شخصية تكتك
    this.speakButton.addEventListener('click', () => {
      const phrase = this.speechText.textContent;
      this.speakArabic(phrase);
    });

    this.mascotAvatar.addEventListener('click', () => {
      const name = this.childName || 'يا بطل';
      const phrases = [
        `أنت ذكي جداً ومميز يا ${name}! 🌟`,
        `تذكر يا ${name}: العقرب القصير للساعات، والطويل للدقائق!`,
        `تيك توك.. أنا فخور جداً بتعلمك السريع يا ${name}! ⏰`,
        `أحسنت الاستكشاف يا بطلنا ${name}! استمر هكذا! 🚀`
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      this.setMascotMessage(randomPhrase);
      this.playTickSound();
    });

    // تفاعل نافذة اسم الطفل
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

    // تفاعل الدروس
    document.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.lesson-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const lessonId = parseInt(card.getAttribute('data-lesson'), 10);
        this.runLesson(lessonId);
      });
    });

    // تفاعل الكويز وجولات التحدي المتجددة
    this.checkAnswerBtn.addEventListener('click', () => this.checkQuizAnswer());
    this.nextQuestionBtn.addEventListener('click', () => this.nextQuizQuestion());
    this.newRoundBtn.addEventListener('click', () => this.openQuizSetupModal());
    this.shuffleQuestionBtn.addEventListener('click', () => this.shuffleCurrentQuestion());
    
    // زر إعداد وتجهيز الاختبار داخل لوحة الكويز
    if (this.btnRestartQuizSetup) {
      this.btnRestartQuizSetup.addEventListener('click', () => {
        this.openQuizSetupModal();
      });
    }

    // زر بدء اختبار جديد من نافذة التهنئة
    if (this.startNewQuizFromPopupBtn) {
      this.startNewQuizFromPopupBtn.addEventListener('click', () => {
        this.grandCelebrationModal.classList.remove('active');
        this.openQuizSetupModal();
      });
    }

    // الضغط على Enter في حقل اسم البطل لبدء الاختبار فوراً
    if (this.setupPlayerNameInput) {
      this.setupPlayerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.launchConfiguredQuiz();
        }
      });
    }

    // أزرار اختيار عدد الأسئلة (3 أو 5 أو 10)
    document.querySelectorAll('.count-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.count-option-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.quizQuestionsCount = parseInt(e.currentTarget.getAttribute('data-count'), 10) || 5;
        this.playTickSound();
      });
    });

    // زر الانطلاق في الاختبار بعد الإعداد
    if (this.launchConfiguredQuizBtn) {
      this.launchConfiguredQuizBtn.addEventListener('click', () => {
        this.launchConfiguredQuiz();
      });
    }

    // زر تجربة الاحتفال المباشر فوراً
    if (this.testCelebrationBtn) {
      this.testCelebrationBtn.addEventListener('click', () => {
        this.triggerGrandCelebration();
      });
    }

    // زر المساعدة الذكية في ضبط العقارب
    if (this.autoSetClockBtn) {
      this.autoSetClockBtn.addEventListener('click', () => {
        this.autoSolveForChild();
      });
    }

    // أزرار إغلاق النوافذ المنبثقة
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

    // إغلاق النوافذ عند النقر على الخلفية المعتمة
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

    // إغلاق النوافذ عبر زر Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.grandCelebrationModal) this.grandCelebrationModal.classList.remove('active');
        if (this.quizSetupModal) this.quizSetupModal.classList.remove('active');
        if (this.nameModalOverlay) this.closeNameModal();
      }
    });

    // فتح قفل الصوت فوراً عند أي لمسة أو نقرة على الصفحة
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
    this.childNameInput.value = (this.childName && this.childName !== 'البطل') ? this.childName : '';
    this.nameModalOverlay.classList.add('active');
    setTimeout(() => this.childNameInput.focus(), 250);
    this.playTickSound();
  }

  closeNameModal() {
    this.nameModalOverlay.classList.remove('active');
  }

  handleSaveName() {
    const entered = this.childNameInput.value.trim();
    this.childName = entered || 'البطل';
    localStorage.setItem('kids_clock_child_name', this.childName);
    this.childNameDisplay.textContent = this.childName;
    this.closeNameModal();

    this.playCelebrationFanfare();
    this.triggerConfetti();

    const welcomeMsg = `أهلاً وسهلاً يا بطلنا الرائع <strong>«${this.childName}»</strong>! أنا سعيد جداً بصداقتك في جزيرة الوقت! 🌟`;
    this.setMascotMessage(welcomeMsg);
    this.speakArabic(`أهلاً يا ${this.childName}! هيا نبدأ مغامرة تعلّم الساعة معاً!`);
  }

  /* --------------------------------------------------------------------------
     إدارة نافذة إعداد الاختبار الجديد
     -------------------------------------------------------------------------- */
  openQuizSetupModal() {
    // ملء اسم الطفل الحالي في حقل الإدخال ليراه بوضوح أو يُعدله
    if (this.setupPlayerNameInput) {
      this.setupPlayerNameInput.value = (this.childName && this.childName !== 'البطل') ? this.childName : '';
      setTimeout(() => {
        this.setupPlayerNameInput.focus();
        this.setupPlayerNameInput.select();
      }, 250);
    }

    // تفعيل خيار عدد الأسئلة الحالي
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
    // التحقق هل تم إدخال اسم أو تعديل الاسم
    const entered = this.setupPlayerNameInput ? this.setupPlayerNameInput.value.trim() : '';
    if (entered) {
      this.childName = entered;
      localStorage.setItem('kids_clock_child_name', this.childName);
      if (this.childNameDisplay) {
        this.childNameDisplay.textContent = this.childName;
      }
    } else if (!this.childName) {
      this.childName = 'البطل';
    }

    if (this.quizSetupModal) {
      this.quizSetupModal.classList.remove('active');
    }

    // الانتقال للوحة الاختبار وبدء الأسئلة بعددها المختار
    this.switchMode('quiz', false);
    this.startNewQuizRound(this.quizQuestionsCount);

    const name = this.childName || 'يا بطل';
    this.setMascotMessage(`انطلق اختبار الـ ${this.quizQuestionsCount} أسئلة يا ${name}! 🚀 هيا ركز وأرنا شطارتك!`);
    this.speakArabic(`هيا يا ${name}! لنبدأ اختبار الـ ${this.quizQuestionsCount} أسئلة!`);
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

    // حساب إحداثيات المؤشر بالنسبة لمركز دائرة الـ SVG
    const rect = this.svgClock.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const clockCenterX = rect.left + rect.width / 2;
    const clockCenterY = rect.top + rect.height / 2;

    const deltaX = clientX - clockCenterX;
    const deltaY = clientY - clockCenterY;

    // حساب الزاوية بالدرجات (0 درجة تشير للأعلى = 12)
    let angleRad = Math.atan2(deltaX, -deltaY);
    let angleDeg = angleRad * (180 / Math.PI);
    if (angleDeg < 0) angleDeg += 360;

    if (this.draggedHand === 'minute') {
      // 360 درجة = 60 دقيقة => 6 درجات لكل دقيقة
      let minute = Math.round(angleDeg / 6) % 60;
      if (minute !== this.currentMinutes) {
        // إذا دار عقرب الدقائق وقطع الـ 12 للأمام أو الخلف
        const diff = minute - this.currentMinutes;
        if (diff < -30) {
          // تقدم من 59 إلى 0
          this.currentHours = (this.currentHours % 12) + 1;
        } else if (diff > 30) {
          // رجع من 0 إلى 59
          this.currentHours = this.currentHours === 1 ? 12 : this.currentHours - 1;
        }
        this.setTime(this.currentHours, minute, false);
        this.playTickSound();
      }
    } else if (this.draggedHand === 'hour') {
      // 360 درجة = 12 ساعة => 30 درجة لكل ساعة
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

    // حساب زاوية عقرب الدقائق (6 درجات لكل دقيقة)
    const minuteAngle = minutes * 6;

    // حساب زاوية عقرب الساعات (30 درجة لكل ساعة + 0.5 درجة لكل دقيقة ليكون واقعياً)
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    // تدوير العقارب
    this.minuteHandGroup.style.transform = `rotate(${minuteAngle}deg)`;
    this.hourHandGroup.style.transform = `rotate(${hourAngle}deg)`;

    // تحديث الشاشة الرقمية
    this.digitalHours.textContent = hours.toString().padStart(2, '0');
    this.digitalMinutes.textContent = minutes.toString().padStart(2, '0');

    // تحديث الصياغة اللغوية بالعربية
    const arabicText = this.convertTimeToArabicPhrase(hours, minutes);
    this.arabicPhrase.textContent = arabicText;

    // تحديث شريحة البيتزا إذا كانت مفعلة
    this.updatePizzaSlice();

    // تحديث السماء (الليل / النهار)
    this.updateSkyAndPeriod();
  }

  // رسم شريحة قطاع الدقائق (مثل البيتزا)
  updatePizzaSlice() {
    if (!this.showPizzaSector || this.currentMinutes === 0) {
      this.pieSlice.setAttribute('d', '');
      return;
    }

    const angle = (this.currentMinutes * 6) * (Math.PI / 180);
    const radius = 160;
    const startX = 200;
    const startY = 40; // عند الـ 12 تماماً
    const endX = 200 + radius * Math.sin(angle);
    const endY = 200 - radius * Math.cos(angle);

    const largeArcFlag = this.currentMinutes > 30 ? 1 : 0;
    const pathD = `M 200 200 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    this.pieSlice.setAttribute('d', pathD);
  }

  // تحديث السماء والضوء الخارجي بحسب الوقت
  updateSkyAndPeriod() {
    this.digitalPeriod.textContent = this.isDayTime ? 'نهاراً ☀️' : 'ليلاً 🌙';
    document.body.classList.remove('night-mode', 'sunset-mode');
    if (!this.isDayTime) {
      document.body.classList.add('night-mode');
    }
  }

  // محول الوقت الرقمي إلى عبارات عربية فصيحة وممتعة للطفل
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

  setMascotMessage(message) {
    this.speechText.innerHTML = message;
  }

  /* --------------------------------------------------------------------------
     6. أنماط التطبيق: التبديل بين الاستكشاف والدروس والتحديات
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
      this.setMascotMessage('اسحب العقارب بحرية وشاهد كيف يتغير نطق الساعة وشكلها الرقمي!');
    } else if (mode === 'lessons') {
      this.setMascotMessage('اختر محطة تعليمية من القائمة لنبدأ مغامرة تعلم جديدة خطوة بخطوة!');
      this.runLesson(1);
    } else if (mode === 'quiz') {
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

  /* تشغيل محطات التعلم التفاعلية */
  runLesson(lessonId) {
    this.playChimeSound();
    const lessonTitleEl = document.getElementById('activeLessonTitle');
    const lessonDescEl = document.getElementById('activeLessonDesc');

    switch (lessonId) {
      case 1:
        this.setTime(3, 0);
        if (lessonTitleEl) lessonTitleEl.textContent = 'المحطة 1: عقرب الساعات (الأزرق القصير)';
        if (lessonDescEl) lessonDescEl.innerHTML = 'تعرف على العقرب الأزرق القصير والبطيء كالسّلحفاة الذي يدور بهدوء ويخبرنا بالساعة الحالية.';
        this.setMascotMessage('👀 راقب <strong>العقرب الأزرق القصير</strong>، هو عقرب الساعات! يدور ببطء ويشير الآن إلى الرقم 3.');
        break;
      case 2:
        this.setTime(12, 15);
        if (lessonTitleEl) lessonTitleEl.textContent = 'المحطة 2: عقرب الدقائق (البرتقالي السريع)';
        if (lessonDescEl) lessonDescEl.innerHTML = 'العقرب البرتقالي طويل ونشيط كالأرنب، يكمل دورة كاملة مدتها 60 دقيقة في كل ساعة!';
        this.setMascotMessage('⚡ راقب <strong>العقرب البرتقالي الطويل</strong>، هو عقرب الدقائق السريع! يكمل دورة كاملة كل 60 دقيقة.');
        break;
      case 3:
        this.setTime(5, 0);
        if (lessonTitleEl) lessonTitleEl.textContent = 'المحطة 3: الساعة تماماً (عند الرقم 12)';
        if (lessonDescEl) lessonDescEl.innerHTML = 'عندما يقف العقرب البرتقالي الطويل على 12 بالضبط في الأعلى، تكون الدقائق صفر والساعة تماماً :00!';
        this.setMascotMessage('🔔 عندما يقف العقرب الطويل عند <strong>12</strong>، تكون الساعة <strong>تماماً</strong> (هنا الساعة 5:00 تماماً).');
        break;
      case 4:
        this.showPizzaSector = true;
        this.toggleSectorBtn.classList.add('active');
        this.setTime(4, 30);
        if (lessonTitleEl) lessonTitleEl.textContent = 'المحطة 4: نصف الساعة والربع (شريحة البيتزا)';
        if (lessonDescEl) lessonDescEl.innerHTML = 'الرقم 6 يعني نصف ساعة (:30 دقيقة)، والرقم 3 يعني ربع ساعة (:15 دقيقة) تماماً كشريحة بيتزا!';
        this.setMascotMessage('🍕 عندما يقف العقرب الطويل عند <strong>6</strong>، تكون الساعة <strong>والنصف (:30)</strong> لأنها تقسم الدائرة إلى نصفين متساويين!');
        break;
      case 5:
        this.showMinuteGuides = true;
        this.toggleMinutesGuideBtn.classList.add('active');
        document.getElementById('minuteNumbersGuide').style.display = 'block';
        this.setTime(8, 20);
        if (lessonTitleEl) lessonTitleEl.textContent = 'المحطة 5: قفزات الأرنب الخماسية (5، 10، 15..)';
        if (lessonDescEl) lessonDescEl.innerHTML = 'بين كل رقم وسابقه 5 دقائق كاملة! اضرب الرقم في 5 (مثلاً 4 × 5 = 20 دقيقة) لتعرف الدقائق بسرعة.';
        this.setMascotMessage('🦘 قفزات الأرنب: كل رقم يساوي 5 دقائق! الرقم 1 = 5، الرقم 2 = 10، الرقم 3 = 15، والرقم 4 = 20 دقيقة!');
        break;
    }
  }

  /* --------------------------------------------------------------------------
     7. محرك التحديات والاختبارات الحماسية والمتجددة عشوائياً
     -------------------------------------------------------------------------- */
  
  // توليد أسئلة عشوائية ذكية متدرجة الصعوبة لا تتكرر
  generateRandomQuizQuestions(count = 5) {
    const questions = [];
    const usedTimes = new Set();

    const arabicHourNames = [
      '', 'الواحدة', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 
      'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة', 
      'الحادية عشرة', 'الثانية عشرة'
    ];

    // باقات الدقائق المتدرجة لتغطية كل مفاهيم الساعة
    const minuteBuckets = [
      [0],                           // تماماً (الساعات الكاملة)
      [30],                          // والنصف
      [15, 45],                      // الربع وإلا ربع
      [10, 20, 40, 50],              // عشرات وأثلاث
      [5, 25, 35, 55]                // قفزات الخمسات الفردية
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

      const hourText = arabicHourNames[targetHour];
      let promptText = '';
      let hintText = '';

      if (targetMin === 0) {
        promptText = `اضبط الساعة على: <strong>${targetHour}:00 تماماً 🔔</strong>`;
        hintText = `العقرب الأزرق عند الرقم ${targetHour}، والعقرب البرتقالي يقف فوق 12 تماماً!`;
      } else if (targetMin === 30) {
        promptText = `اضبط الساعة على: <strong>${targetHour}:30 (الساعة ${hourText} والنصف ⏱️)</strong>`;
        hintText = `العقرب البرتقالي يشير للأسفل تماماً عند الرقم 6!`;
      } else if (targetMin === 15) {
        promptText = `اضبط الساعة على: <strong>${targetHour}:15 (الساعة ${hourText} والربع 🍕)</strong>`;
        hintText = `العقرب البرتقالي يشير لليمين عند الرقم 3!`;
      } else if (targetMin === 45) {
        const nextH = (targetHour % 12) + 1;
        promptText = `اضبط الساعة على: <strong>${targetHour}:45 (الساعة ${arabicHourNames[nextH]} إلا ربعاً 🍕)</strong>`;
        hintText = `العقرب البرتقالي يشير لليسار عند الرقم 9!`;
      } else {
        promptText = `اضبط الساعة على: <strong>${targetHour}:${targetMin.toString().padStart(2, '0')} 🐇</strong>`;
        const hop = Math.round(targetMin / 5);
        hintText = `العقرب البرتقالي يقف عند الرقم ${hop} لأن (${hop} × 5 = ${targetMin}) دقيقة!`;
      }

      questions.push({
        prompt: promptText,
        targetHour: targetHour,
        targetMin: targetMin,
        hint: hintText
      });
    }

    return questions;
  }

  // بدء جولة جديدة كلياً بأوقات عشوائية جديدة وبعدد الأسئلة المختار
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
    const name = this.childName || 'يا بطل';
    this.setMascotMessage(`انطلق اختبار الـ ${questionsCount} أسئلة بأوقات جديدة كلياً يا ${name}! هيا أرنا براعتك! 🚀`);
  }

  // تغيير السؤال الحالي لسؤال عشوائي آخر
  shuffleCurrentQuestion() {
    const freshQ = this.generateRandomQuizQuestions(1)[0];
    this.quizQuestions[this.currentQuizIndex] = freshQ;
    this.loadQuizQuestion(this.currentQuizIndex);
    this.playTickSound();
    this.setMascotMessage('تم تغيير الوقت بوقت جديد! حاول ضبطه الآن! 🎲');
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

    this.quizQuestionText.innerHTML = `${q.prompt}`;
    this.quizFeedback.style.display = 'none';
    this.nextQuestionBtn.style.display = 'none';
    this.newRoundBtn.style.display = 'none';
    this.checkAnswerBtn.style.display = 'flex';

    const name = this.childName || 'يا بطل';
    this.setMascotMessage(`المهمة رقم ${index + 1} يا ${name}: ${q.prompt}. ${q.hint}`);
  }

  checkQuizAnswer() {
    const q = this.quizQuestions[this.currentQuizIndex];
    // سماحية ±2 دقيقة
    const minuteDiff = Math.abs(this.currentMinutes - q.targetMin);
    const hourMatch = this.currentHours === q.targetHour;

    if (hourMatch && minuteDiff <= 2) {
      // إجابة صحيحة واحتفال حماسي
      const name = this.childName || 'يا بطل';
      this.starsCount += 1;
      this.currentQuizCorrectCount += 1;
      this.starCounter.textContent = this.starsCount.toString();

      if (this.quizProgressBar) {
        const pct = Math.round(((this.currentQuizIndex + 1) / this.quizQuestions.length) * 100);
        this.quizProgressBar.style.width = `${pct}%`;
      }

      this.quizFeedback.className = 'quiz-feedback-box correct';
      this.feedbackIcon.textContent = '🎉';
      this.feedbackText.textContent = `إجابة مذهلة ومتقنة يا ${name}! لقد حصلت على نجمة شجاعة جديدة! ⭐`;
      this.quizFeedback.style.display = 'flex';

      this.checkAnswerBtn.style.display = 'none';
      this.nextQuestionBtn.style.display = 'flex';

      // رقص تكتك لفترة وجيزة
      this.mascotAvatar.classList.add('celebrating-mascot');
      setTimeout(() => this.mascotAvatar.classList.remove('celebrating-mascot'), 2500);

      this.setMascotMessage(`يا لك من ذكي ورائع يا ${name}! ضبطت الوقت بدقة فائقة! اضغط للسؤال التالي! 🚀`);
      this.playCelebrationFanfare();
      this.launchFlyingBalloons(10); // إطلاق بالونات ونجوم طائرة
      this.triggerConfetti('center', 85);
      this.speakArabic(`أحسنت يا ${name}! إجابة ممتازة!`);
    } else {
      // إجابة تحتاج تصحيح لطيف
      const name = this.childName || 'يا بطل';
      this.quizFeedback.className = 'quiz-feedback-box wrong';
      this.feedbackIcon.textContent = '🤔';
      this.feedbackText.textContent = `قريب جداً يا ${name}! ${q.hint}. حاول تحريك العقرب مجدداً!`;
      this.quizFeedback.style.display = 'flex';

      this.playOopsSound();
      this.setMascotMessage(`لا بأس يا ${name}، حاول مرة أخرى! تذكر: ${q.hint}`);
    }
  }

  // مساعدة تكتك الذكية للأطفال لضبط العقارب
  autoSolveForChild() {
    const q = this.quizQuestions[this.currentQuizIndex];
    if (!q) return;
    this.setTime(q.targetHour, q.targetMin, true);
    this.playChimeSound();
    const name = this.childName || 'يا بطل';
    this.setMascotMessage(`لقد ساعدتك وضبطت العقارب على الوقت المطلوب يا ${name}! 🪄 اضغط الآن زر "تحقّق من إجابتي" لنحتفل معاً! 🎉`);
  }

  // إطلاق سرب البالونات والنجوم المبهجة الطائرة
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
        balloon.remove();
      }, (animDelay + animDuration + 0.6) * 1000);
    }
  }

  nextQuizQuestion() {
    let nextIndex = this.currentQuizIndex + 1;
    if (nextIndex >= this.quizQuestions.length) {
      // إتمام الاختبار كاملاً وعرض نافذة التهنئة الكبرى!
      if (this.quizProgressBar) {
        this.quizProgressBar.style.width = '100%';
      }
      this.triggerGrandCelebration();
    } else {
      this.loadQuizQuestion(nextIndex);
    }
  }

  // نافذة التهنئة الكبرى والاحتفال الضخم بنهاية الاختبار
  triggerGrandCelebration() {
    const name = this.childName || 'يا بطل الأبطال';

    // 1. تحديث ملخص وإحصائيات نتيجة الاختبار
    if (this.summaryQuestionsCount) {
      this.summaryQuestionsCount.textContent = this.quizQuestions.length.toString();
    }
    if (this.summaryStarsCount) {
      this.summaryStarsCount.textContent = `+${this.currentQuizCorrectCount}`;
    }
    if (this.summaryBadgeEarned) {
      const isPerfect = this.currentQuizCorrectCount === this.quizQuestions.length;
      this.summaryBadgeEarned.textContent = isPerfect ? 'خارق 🏆' : 'ممتاز ⭐';
    }

    // 2. إطلاق سرب البالونات الطائرة الضخم
    this.launchFlyingBalloons(22);

    // 3. رقص وقفز تكتك الاحتفالي
    this.mascotAvatar.classList.add('celebrating-mascot');
    setTimeout(() => this.mascotAvatar.classList.remove('celebrating-mascot'), 5500);

    // 4. مدافع الكونفيتي المتتابعة
    this.triggerConfetti('center', 100);
    setTimeout(() => this.triggerConfetti('left', 85), 250);
    setTimeout(() => this.triggerConfetti('right', 85), 500);
    setTimeout(() => this.triggerConfetti('center', 120), 800);
    setTimeout(() => this.launchFlyingBalloons(10), 1200);

    // 5. عزف ألحان النصر الكبرى الفخمة
    this.playGrandFanfare();

    // 6. فتح نافذة التهنئة المنبثقة
    this.celebrationTitle.innerHTML = `🏆 ألف مبروك يا بطلنا «${name}»!`;
    this.celebrationSubtitle.innerHTML = `أنهيت هذا الاختبار بنجاح باهر وجمعت <strong>${this.currentQuizCorrectCount} من ${this.quizQuestions.length} نجوم ذهبية ⭐</strong>!`;
    this.grandCelebrationModal.classList.add('active');

    // إظهار زر الجولة الجديدة في الكويز
    this.quizFeedback.className = 'quiz-feedback-box correct';
    this.feedbackIcon.textContent = '🏆';
    this.feedbackText.textContent = `ألف مبروك يا ${name}! لقد أتممت جميع أسئلة هذا الاختبار بنجاح باهر!`;
    this.nextQuestionBtn.style.display = 'none';
    this.newRoundBtn.style.display = 'flex';

    // 7. صوت تشجيع عربي فخور
    const praises = [
      `مبارك يا ${name}! أنهيت الاختبار بتفوق وتستحق وسام سيد الوقت بجدارة!`,
      `واااو يا ${name}! أداء مذهل وبطولي، أنا فخور جداً بك يا بطل!`
    ];
    this.speakArabic(praises[Math.floor(Math.random() * praises.length)]);
  }

  /* --------------------------------------------------------------------------
     8. محرك الألعاب النارية والاحتفالات (Canvas Confetti المتطور متعدد الأشكال)
     -------------------------------------------------------------------------- */
  initConfetti() {
    this.confettiCanvas = document.getElementById('confettiCanvas');
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.confettiParticles = [];

    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    this.animateConfetti();
  }

  triggerConfetti(origin = 'center', count = 80) {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#facc15', '#a855f7', '#fb923c', '#ec4899', '#06b6d4', '#e11d48'];
    const shapes = ['rect', 'circle', 'ribbon'];
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      let vx = (Math.random() - 0.5) * 18;
      let vy = (Math.random() - 0.8) * 20;

      if (origin === 'left') {
        startX = 60;
        startY = window.innerHeight * 0.75;
        vx = Math.random() * 16 + 5;       // يندفع نحو اليمين
        vy = -(Math.random() * 18 + 12);   // يندفع نحو الأعلى
      } else if (origin === 'right') {
        startX = window.innerWidth - 60;
        startY = window.innerHeight * 0.75;
        vx = -(Math.random() * 16 + 5);    // يندفع نحو اليسار
        vy = -(Math.random() * 18 + 12);   // يندفع نحو الأعلى
      }

      this.confettiParticles.push({
        x: startX,
        y: startY,
        vx: vx,
        vy: vy,
        size: Math.random() * 11 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 16,
        opacity: 1
      });
    }
  }

  animateConfetti() {
    requestAnimationFrame(() => this.animateConfetti());
    if (this.confettiParticles.length === 0) return;

    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.38; // gravity
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.006; // يدوم لقرابة 3 ثوان كاملة

      if (p.opacity <= 0 || p.y > window.innerHeight + 60) {
        this.confettiParticles.splice(i, 1);
        continue;
      }

      this.confettiCtx.save();
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.globalAlpha = Math.max(0, p.opacity);
      this.confettiCtx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.confettiCtx.beginPath();
        this.confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.confettiCtx.fill();
      } else if (p.shape === 'ribbon') {
        this.confettiCtx.fillRect(-p.size / 4, -p.size, p.size / 2, p.size * 2);
      } else {
        this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }

      this.confettiCtx.restore();
    }
  }
}

// تشغيل التطبيق بمجرد اكتمال تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  window.app = new KidsClockApp();
});
