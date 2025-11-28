/**
 * コンフリクトゾーン・アルファ版 メインアプリケーション
 * Version: 3.0.0-alpha
 * Author: Conflict Generator Alpha Team
 * 
 * このファイルは大幅に再構築されており、
 * 従来のコードとの互換性は部分的にのみ維持されています。
 */

(() => {
  'use strict';

  // ============================================
  // 設定とグローバル状態（アルファ版）
  // ============================================
  
  const CONFIG_ALPHA = {
    version: '3.0.0-alpha',
    maxRooms: 50,
    maxParticipantsDefault: 10,
    timerDuration: 120, // 2分に延長
    enableAdvancedFeatures: true,
    debugMode: true
  };

  const STATE_ALPHA = {
    rooms: [],
    currentRoom: null,
    participants: [],
    isAdvancedPanelOpen: false,
    filterType: 'all',
    currentPage: 1,
    itemsPerPage: 6
  };

  // ============================================
  // シークレットコマンド（アルファ版拡張）
  // ============================================
  
  const secretCodes = {
    konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
    conflict: ['KeyC', 'KeyO', 'KeyN', 'KeyF', 'KeyL', 'KeyI', 'KeyC', 'KeyT'],
    alpha: ['KeyA', 'KeyL', 'KeyP', 'KeyH', 'KeyA']
  };

  const secretProgress = {
    konami: 0,
    conflict: 0,
    alpha: 0
  };

  document.addEventListener('keydown', handleSecretCode);

  function handleSecretCode(event) {
    Object.keys(secretCodes).forEach(codeType => {
      const codeSequence = secretCodes[codeType];
      if (event.code === codeSequence[secretProgress[codeType]]) {
        secretProgress[codeType]++;
        if (secretProgress[codeType] === codeSequence.length) {
          secretProgress[codeType] = 0;
          triggerSecretAction(codeType);
        }
      } else {
        secretProgress[codeType] = 0;
      }
    });
  }

  function triggerSecretAction(codeType) {
    switch (codeType) {
      case 'konami':
        launchExternalGame();
        break;
      case 'conflict':
        activateConflictMode();
        break;
      case 'alpha':
        showAlphaEasterEgg();
        break;
    }
  }

  function launchExternalGame() {
    console.log('[ALPHA] 🎮 シークレットゲーム起動！');
    window.open('https://appsweets.net/gradius/index.html', '_blank', 'noopener,noreferrer');
  }

  function activateConflictMode() {
    console.log('[ALPHA] ⚡ コンフリクトモード有効化！');
    document.body.classList.add('conflict-mode-activated');
    alert('🔥 コンフリクトモードが有効になりました！');
  }

  function showAlphaEasterEgg() {
    console.log('[ALPHA] 🌟 アルファイースターエッグ発見！');
    alert('🌟 アルファ版の隠し機能を発見しました！開発者に感謝！');
  }

  // ============================================
  // サンプルルームデータ（アルファ版拡張）
  // ============================================
  
  const initialRoomsAlpha = [
    { id: 1, name: '🔥 コンフリクト解決道場', type: 'public', participants: 8, maxParticipants: 15 },
    { id: 2, name: '⚡ アルファテスト部屋', type: 'private', participants: 3, maxParticipants: 5 },
    { id: 3, name: '🌟 上級者向けチャレンジ', type: 'restricted', participants: 12, maxParticipants: 20 }
  ];

  STATE_ALPHA.rooms = [...initialRoomsAlpha];

  // ============================================
  // ユーティリティ関数（アルファ版）
  // ============================================

  function logAlpha(message, data = null) {
    if (CONFIG_ALPHA.debugMode) {
      console.log(`[ALPHA ${new Date().toISOString()}] ${message}`, data || '');
    }
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function formatTimeAlpha(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function validateRoomName(name) {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: 'ルーム名を入力してください' };
    }
    if (name.length > 50) {
      return { valid: false, error: 'ルーム名は50文字以内にしてください' };
    }
    if (STATE_ALPHA.rooms.some(room => room.name === name)) {
      return { valid: false, error: '同じ名前のルームが既に存在します' };
    }
    return { valid: true };
  }

  // ============================================
  // ページ判定とルーター（アルファ版）
  // ============================================

  const pageRouterAlpha = {
    isIndexPage: () => {
      const path = location.pathname;
      return path.endsWith('index.html') || path.endsWith('/') || path === '';
    },
    isPracticePage: () => location.pathname.endsWith('practice.html'),
    isAboutPage: () => location.pathname.endsWith('about.html'),
    getQueryParam: (key) => new URL(location.href).searchParams.get(key)
  };

  // ============================================
  // インデックスページロジック（アルファ版完全再設計）
  // ============================================

  if (pageRouterAlpha.isIndexPage()) {
    logAlpha('インデックスページを初期化');
    initializeIndexPageAlpha();
  }

  function initializeIndexPageAlpha() {
    const roomListEl = document.getElementById('roomListAlpha') || document.getElementById('roomList');
    const createBtnEl = document.getElementById('createBtnAlpha') || document.getElementById('createBtn');
    const joinBtnEl = document.getElementById('joinBtnAlpha') || document.getElementById('joinBtn');
    const advancedBtnEl = document.getElementById('advancedBtnAlpha');
    const roomNameInputEl = document.getElementById('roomNameAlpha') || document.getElementById('roomName');

    if (!roomListEl) {
      logAlpha('roomListが見つかりません - レガシーモードで動作');
      return;
    }

    renderRoomListAlpha(roomListEl);

    if (createBtnEl) {
      createBtnEl.addEventListener('click', () => handleCreateRoomAlpha(roomNameInputEl, roomListEl));
    }

    if (joinBtnEl) {
      joinBtnEl.addEventListener('click', handleQuickJoinAlpha);
    }

    if (advancedBtnEl) {
      advancedBtnEl.addEventListener('click', toggleAdvancedPanelAlpha);
    }

    // フィルターボタンの初期化
    document.querySelectorAll('.filter-btn-alpha').forEach(btn => {
      btn.addEventListener('click', (e) => handleFilterChangeAlpha(e, roomListEl));
    });

    logAlpha('インデックスページ初期化完了', { roomCount: STATE_ALPHA.rooms.length });
  }

  function renderRoomListAlpha(containerEl) {
    if (!containerEl) return;

    const filteredRooms = STATE_ALPHA.rooms.filter(room => {
      if (STATE_ALPHA.filterType === 'all') return true;
      return room.type === STATE_ALPHA.filterType;
    });

    containerEl.innerHTML = '';

    if (filteredRooms.length === 0) {
      containerEl.innerHTML = '<li class="empty-state-alpha">ルームがありません</li>';
      return;
    }

    filteredRooms.forEach(room => {
      const li = document.createElement('li');
      li.className = `room-item-alpha room-type-${room.type}`;
      li.innerHTML = `
        <div class="room-info-alpha">
          <span class="room-name-alpha">${escapeHtml(room.name)}</span>
          <span class="room-meta-alpha">${room.participants}/${room.maxParticipants}人 • ${room.type}</span>
        </div>
        <div class="room-actions-alpha">
          <button class="join-btn-alpha" data-room-id="${room.id}">💖 参加</button>
          <button class="info-btn-alpha" data-room-id="${room.id}">ℹ️</button>
        </div>
      `;
      containerEl.appendChild(li);
    });

    // イベントリスナーをアタッチ
    containerEl.querySelectorAll('.join-btn-alpha').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomId = e.target.dataset.roomId;
        const room = STATE_ALPHA.rooms.find(r => r.id === parseInt(roomId));
        if (room) {
          location.href = `practice.html?room=${encodeURIComponent(room.name)}&id=${roomId}`;
        }
      });
    });

    logAlpha('ルームリストをレンダリング', { count: filteredRooms.length });
  }

  function handleCreateRoomAlpha(inputEl, listEl) {
    if (!inputEl) return;

    const roomName = inputEl.value.trim();
    const validation = validateRoomName(roomName);

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    const descriptionEl = document.getElementById('roomDescription');
    const maxParticipantsEl = document.getElementById('maxParticipants');
    const roomTypeEl = document.getElementById('roomType');

    const newRoom = {
      id: STATE_ALPHA.rooms.length + 1,
      name: roomName,
      description: descriptionEl?.value || '',
      type: roomTypeEl?.value || 'public',
      participants: 1,
      maxParticipants: parseInt(maxParticipantsEl?.value) || CONFIG_ALPHA.maxParticipantsDefault,
      createdAt: new Date().toISOString()
    };

    STATE_ALPHA.rooms.push(newRoom);
    renderRoomListAlpha(listEl);
    inputEl.value = '';
    if (descriptionEl) descriptionEl.value = '';

    logAlpha('新しいルームを作成', newRoom);
    updateStatsAlpha();
  }

  function handleQuickJoinAlpha() {
    const publicRooms = STATE_ALPHA.rooms.filter(r => r.type === 'public');
    if (publicRooms.length > 0) {
      const randomRoom = publicRooms[Math.floor(Math.random() * publicRooms.length)];
      location.href = `practice.html?room=${encodeURIComponent(randomRoom.name)}&id=${randomRoom.id}`;
    } else {
      alert('参加可能な公開ルームがありません');
    }
  }

  function toggleAdvancedPanelAlpha() {
    const panel = document.getElementById('advancedOptions');
    if (panel) {
      STATE_ALPHA.isAdvancedPanelOpen = !STATE_ALPHA.isAdvancedPanelOpen;
      panel.style.display = STATE_ALPHA.isAdvancedPanelOpen ? 'block' : 'none';
    }
  }

  function handleFilterChangeAlpha(event, listEl) {
    document.querySelectorAll('.filter-btn-alpha').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filterText = event.target.textContent;
    if (filterText.includes('公開')) {
      STATE_ALPHA.filterType = 'public';
    } else if (filterText.includes('非公開')) {
      STATE_ALPHA.filterType = 'private';
    } else {
      STATE_ALPHA.filterType = 'all';
    }

    renderRoomListAlpha(listEl);
  }

  function updateStatsAlpha() {
    const activeCountEl = document.getElementById('activeRoomCount');
    const onlineCountEl = document.getElementById('onlineUserCount');
    const todayCountEl = document.getElementById('todayParticipants');

    if (activeCountEl) activeCountEl.textContent = STATE_ALPHA.rooms.length;
    if (onlineCountEl) onlineCountEl.textContent = STATE_ALPHA.rooms.reduce((sum, r) => sum + r.participants, 0);
    if (todayCountEl) todayCountEl.textContent = Math.floor(Math.random() * 50) + 20;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ============================================
  // プラクティスページロジック（アルファ版完全再設計）
  // ============================================

  if (pageRouterAlpha.isPracticePage()) {
    logAlpha('プラクティスページを初期化');
    initializePracticePageAlpha();
  }

  function initializePracticePageAlpha() {
    const roomName = pageRouterAlpha.getQueryParam('room') || '未指定のルーム';
    const roomId = pageRouterAlpha.getQueryParam('id');
    
    STATE_ALPHA.currentRoom = {
      name: roomName,
      id: roomId,
      startTime: Date.now()
    };

    STATE_ALPHA.participants = ['ホスト（あなた）'];

    const roomTitleEl = document.getElementById('roomTitle');
    const participantsEl = document.getElementById('participants');
    const chatLogEl = document.getElementById('chatLog');
    const chatInputEl = document.getElementById('chatInput');
    const addParticipantBtn = document.getElementById('addParticipant');
    const sendChatBtn = document.getElementById('sendChat');
    const startBtn = document.getElementById('startBtn');
    const timerEl = document.getElementById('timer');

    if (roomTitleEl) {
      roomTitleEl.textContent = `🔥 ルーム: ${roomName}`;
    }

    if (participantsEl) {
      renderParticipantsAlpha(participantsEl);
    }

    if (addParticipantBtn) {
      addParticipantBtn.addEventListener('click', () => {
        const newName = `参加者${STATE_ALPHA.participants.length}`;
        STATE_ALPHA.participants.push(newName);
        renderParticipantsAlpha(participantsEl);
        postChatAlpha(chatLogEl, `✨ ${newName} がルームに参加しました`);
      });
    }

    if (sendChatBtn && chatInputEl) {
      sendChatBtn.addEventListener('click', () => {
        const message = chatInputEl.value.trim();
        if (message) {
          postChatAlpha(chatLogEl, `あなた: ${message}`);
          chatInputEl.value = '';
        }
      });

      chatInputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendChatBtn.click();
        }
      });
    }

    if (startBtn && timerEl) {
      let timerInterval = null;
      startBtn.addEventListener('click', () => {
        let seconds = CONFIG_ALPHA.timerDuration;
        clearInterval(timerInterval);
        timerEl.textContent = formatTimeAlpha(seconds);
        postChatAlpha(chatLogEl, '🚀 練習開始！頑張ろう！');

        timerInterval = setInterval(() => {
          seconds--;
          timerEl.textContent = formatTimeAlpha(seconds);
          
          if (seconds <= 10) {
            timerEl.classList.add('timer-warning-alpha');
          }

          if (seconds <= 0) {
            clearInterval(timerInterval);
            timerEl.classList.remove('timer-warning-alpha');
            postChatAlpha(chatLogEl, '🎉 練習終了！お疲れさまでした！');
          }
        }, 1000);
      });
    }

    logAlpha('プラクティスページ初期化完了', STATE_ALPHA.currentRoom);
  }

  function renderParticipantsAlpha(containerEl) {
    if (!containerEl) return;
    
    containerEl.innerHTML = '';
    STATE_ALPHA.participants.forEach((name, index) => {
      const li = document.createElement('li');
      li.className = 'participant-item-alpha';
      li.innerHTML = `
        <span class="participant-avatar-alpha">${index === 0 ? '👑' : '👤'}</span>
        <span class="participant-name-alpha">${escapeHtml(name)}</span>
      `;
      containerEl.appendChild(li);
    });
  }

  function postChatAlpha(containerEl, message) {
    if (!containerEl) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message-alpha';
    msgDiv.innerHTML = `
      <span class="chat-time-alpha">${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
      <span class="chat-text-alpha">${escapeHtml(message)}</span>
    `;
    containerEl.appendChild(msgDiv);
    containerEl.scrollTop = containerEl.scrollHeight;

    logAlpha('チャットメッセージ投稿', message);
  }

  // ============================================
  // 初期化完了ログ
  // ============================================

  logAlpha('アプリケーション初期化完了', {
    version: CONFIG_ALPHA.version,
    page: location.pathname
  });

})();