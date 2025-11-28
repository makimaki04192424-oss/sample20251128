/**
 * コンフリクトゾーン・アルファ版 追加機能モジュール
 * Version: 3.0.0-alpha
 * Author: Conflict Generator Alpha Team
 * 
 * このファイルは複雑なコンフリクトを発生させるために
 * 意図的に追加された追加機能モジュールです
 */

(() => {
  'use strict';

  // ============================================
  // 追加機能の設定
  // ============================================

  const CONFLICT_FEATURES = {
    enableNotifications: true,
    enableSoundEffects: false,
    enableAnalytics: false,
    enableExperimentalFeatures: true
  };

  // ============================================
  // 通知システム
  // ============================================

  class NotificationManager {
    constructor() {
      this.notifications = [];
      this.container = null;
      this.init();
    }

    init() {
      if (!CONFLICT_FEATURES.enableNotifications) return;
      
      this.container = document.createElement('div');
      this.container.className = 'notification-container-alpha';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(this.container);

      console.log('[CONFLICT-FEATURES] 通知システム初期化完了');
    }

    show(message, type = 'info', duration = 3000) {
      if (!this.container) return;

      const notification = document.createElement('div');
      notification.className = `notification-alpha notification-${type}-alpha`;
      notification.style.cssText = `
        padding: 12px 20px;
        background: ${this.getBackgroundColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
      `;
      notification.textContent = message;

      this.container.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }

    getBackgroundColor(type) {
      const colors = {
        info: 'linear-gradient(135deg, #1E90FF, #1873CC)',
        success: 'linear-gradient(135deg, #00C853, #00A844)',
        warning: 'linear-gradient(135deg, #FFD700, #CCA300)',
        error: 'linear-gradient(135deg, #FF4500, #CC3700)'
      };
      return colors[type] || colors.info;
    }
  }

  // ============================================
  // パフォーマンストラッカー
  // ============================================

  class PerformanceTracker {
    constructor() {
      this.metrics = {
        pageLoadTime: 0,
        interactionCount: 0,
        errorCount: 0,
        sessionDuration: 0
      };
      this.sessionStart = Date.now();
      this.init();
    }

    init() {
      window.addEventListener('load', () => {
        this.metrics.pageLoadTime = performance.now();
        console.log('[CONFLICT-FEATURES] ページ読み込み時間:', this.metrics.pageLoadTime.toFixed(2), 'ms');
      });

      document.addEventListener('click', () => {
        this.metrics.interactionCount++;
      });

      window.addEventListener('error', () => {
        this.metrics.errorCount++;
      });

      setInterval(() => {
        this.metrics.sessionDuration = Math.floor((Date.now() - this.sessionStart) / 1000);
      }, 1000);
    }

    getMetrics() {
      return { ...this.metrics };
    }
  }

  // ============================================
  // キーボードショートカット
  // ============================================

  class KeyboardShortcuts {
    constructor() {
      this.shortcuts = new Map();
      this.init();
    }

    init() {
      document.addEventListener('keydown', (e) => this.handleKeydown(e));
      this.registerDefaults();
      console.log('[CONFLICT-FEATURES] キーボードショートカット初期化完了');
    }

    register(key, modifiers, callback, description) {
      const id = this.createId(key, modifiers);
      this.shortcuts.set(id, { callback, description });
    }

    createId(key, modifiers) {
      const mods = modifiers.sort().join('+');
      return mods ? `${mods}+${key}` : key;
    }

    handleKeydown(e) {
      const modifiers = [];
      if (e.ctrlKey || e.metaKey) modifiers.push('Ctrl');
      if (e.shiftKey) modifiers.push('Shift');
      if (e.altKey) modifiers.push('Alt');

      const id = this.createId(e.key.toUpperCase(), modifiers);
      const shortcut = this.shortcuts.get(id);

      if (shortcut) {
        e.preventDefault();
        shortcut.callback();
      }
    }

    registerDefaults() {
      this.register('H', ['Ctrl', 'Shift'], () => {
        window.location.href = 'index.html';
      }, 'ホームに戻る');

      this.register('P', ['Ctrl', 'Shift'], () => {
        window.location.href = 'practice.html';
      }, 'プラクティスページへ');

      this.register('?', ['Shift'], () => {
        this.showHelp();
      }, 'ヘルプを表示');
    }

    showHelp() {
      let helpText = '📌 キーボードショートカット:\n\n';
      this.shortcuts.forEach((value, key) => {
        helpText += `${key}: ${value.description}\n`;
      });
      alert(helpText);
    }
  }

  // ============================================
  // テーマ切り替え
  // ============================================

  class ThemeManager {
    constructor() {
      this.currentTheme = 'alpha';
      this.themes = ['alpha', 'dark', 'light', 'neon'];
      this.init();
    }

    init() {
      const savedTheme = localStorage.getItem('conflict-theme');
      if (savedTheme && this.themes.includes(savedTheme)) {
        this.setTheme(savedTheme);
      }
      console.log('[CONFLICT-FEATURES] テーママネージャー初期化完了');
    }

    setTheme(theme) {
      if (!this.themes.includes(theme)) return;
      
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', `conflict-mode-${theme}`);
      localStorage.setItem('conflict-theme', theme);
    }

    toggle() {
      const currentIndex = this.themes.indexOf(this.currentTheme);
      const nextIndex = (currentIndex + 1) % this.themes.length;
      this.setTheme(this.themes[nextIndex]);
    }
  }

  // ============================================
  // プラクティスページ追加機能
  // ============================================

  class PracticeEnhancements {
    constructor() {
      this.isPaused = false;
      this.timerInterval = null;
      this.currentSeconds = 0;
      this.init();
    }

    init() {
      if (!location.pathname.endsWith('practice.html')) return;

      this.initPauseButton();
      this.initResetButton();
      this.initDurationSelect();
      this.initEmojiPicker();
      console.log('[CONFLICT-FEATURES] プラクティス拡張機能初期化完了');
    }

    initPauseButton() {
      const pauseBtn = document.getElementById('pauseBtn');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
          this.isPaused = !this.isPaused;
          pauseBtn.textContent = this.isPaused ? '▶️ 再開' : '⏸️ 一時停止';
        });
      }
    }

    initResetButton() {
      const resetBtn = document.getElementById('resetBtn');
      const timerEl = document.getElementById('timer');
      const durationSelect = document.getElementById('durationSelect');
      
      if (resetBtn && timerEl) {
        resetBtn.addEventListener('click', () => {
          this.isPaused = false;
          const duration = parseInt(durationSelect?.value) || 120;
          timerEl.textContent = this.formatTime(duration);
          timerEl.classList.remove('timer-warning-alpha');
          
          const pauseBtn = document.getElementById('pauseBtn');
          if (pauseBtn) pauseBtn.textContent = '⏸️ 一時停止';
        });
      }
    }

    initDurationSelect() {
      const durationSelect = document.getElementById('durationSelect');
      const timerEl = document.getElementById('timer');
      
      if (durationSelect && timerEl) {
        durationSelect.addEventListener('change', (e) => {
          const duration = parseInt(e.target.value);
          timerEl.textContent = this.formatTime(duration);
        });
      }
    }

    initEmojiPicker() {
      const emojiBtn = document.getElementById('emojiBtn');
      const chatInput = document.getElementById('chatInput');
      
      if (emojiBtn && chatInput) {
        const emojis = ['😀', '😊', '🎉', '👍', '🔥', '💪', '🚀', '✨', '❤️', '👏'];
        
        emojiBtn.addEventListener('click', () => {
          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
          chatInput.value += randomEmoji;
          chatInput.focus();
        });
      }
    }

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
  }

  // ============================================
  // 初期化
  // ============================================

  const notificationManager = new NotificationManager();
  const performanceTracker = new PerformanceTracker();
  const keyboardShortcuts = new KeyboardShortcuts();
  const themeManager = new ThemeManager();
  const practiceEnhancements = new PracticeEnhancements();

  // グローバルに公開
  window.ConflictFeatures = {
    notify: (message, type, duration) => notificationManager.show(message, type, duration),
    getMetrics: () => performanceTracker.getMetrics(),
    toggleTheme: () => themeManager.toggle(),
    version: '3.0.0-alpha'
  };

  console.log('[CONFLICT-FEATURES] 全機能初期化完了 v3.0.0-alpha');

  // スタイルの動的追加
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

})();
