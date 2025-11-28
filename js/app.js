(() => {
  copilot/change-top-page-for-girls
  const sampleRooms = ['🌈 あさのえいご', '📖 もじのれんしゅう', '🎵 うたのへや']
  // コナミコマンド (↑↑↓↓←→←→BA)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        launchGradius();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function launchGradius() {
    // グラディウス（海外名：Nemesis）を起動
    window.open('https://appsweets.net/gradius/index.html', '_blank', 'noopener,noreferrer');
  }

  const sampleRooms = ['朝の英語練習', 'JS もくもく', '発音トレーニング'];
feature-Nemesis
  const isIndex = location.pathname.endsWith('index.html') || location.pathname.endsWith('/');
  const roomListEl = document.getElementById('roomList');

  // index page logic
  if (isIndex && roomListEl) {
    const render = () => {
      roomListEl.innerHTML = '';
      sampleRooms.forEach(name => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span><div><button class="join" data-room="${name}">💖 さんか</button></div>`;
        roomListEl.appendChild(li);
      });
      document.querySelectorAll('.join').forEach(b => b.addEventListener('click', e => {
        const r = e.currentTarget.dataset.room;
        location.href = `practice.html?room=${encodeURIComponent(r)}`;
      }));
    };

    render();

    document.getElementById('createBtn').addEventListener('click', () => {
      const name = document.getElementById('roomName').value.trim();
      if (!name) return alert('おへやのなまえをいれてね！');
      sampleRooms.push(name);
      render();
      document.getElementById('roomName').value = '';
    });

    document.getElementById('joinBtn').addEventListener('click', () => {
      const sel = sampleRooms[0];
      if (sel) location.href = `practice.html?room=${encodeURIComponent(sel)}`;
    });
  }

  // practice page logic
  if (location.pathname.endsWith('practice.html')) {
    const url = new URL(location.href);
    const room = url.searchParams.get('room') || '未指定のルーム';
    const roomTitle = document.getElementById('roomTitle');
    const participantsEl = document.getElementById('participants');
    const chatLog = document.getElementById('chatLog');
    const chatInput = document.getElementById('chatInput');
    let participants = ['ホスト'];

    if (roomTitle) roomTitle.textContent = `ルーム: ${room}`;

    const renderParticipants = () => {
      participantsEl.innerHTML = '';
      participants.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        participantsEl.appendChild(li);
      });
    };

    renderParticipants();

    document.getElementById('addParticipant').addEventListener('click', () => {
      const name = `参加者${participants.length}`;
      participants.push(name);
      renderParticipants();
      postChat(`${name} が参加しました`);
    });

    const postChat = (txt) => {
      const p = document.createElement('div');
      p.textContent = txt;
      chatLog.appendChild(p);
      chatLog.scrollTop = chatLog.scrollHeight;
    };

    document.getElementById('sendChat').addEventListener('click', () => {
      const txt = chatInput.value.trim();
      if (!txt) return;
      postChat(`あなた: ${txt}`);
      chatInput.value = '';
    });

    // シンプルタイマー
    const startBtn = document.getElementById('startBtn');
    const timerEl = document.getElementById('timer');
    let t = null;
    startBtn.addEventListener('click', () => {
      let sec = 60;
      clearInterval(t);
      timerEl.textContent = formatTime(sec);
      t = setInterval(() => {
        sec--;
        timerEl.textContent = formatTime(sec);
        if (sec <= 0) { clearInterval(t); postChat('練習終了！おつかれさま。'); }
      }, 1000);
    });

    function formatTime(s) {
      const mm = String(Math.floor(s/60)).padStart(2,'0');
      const ss = String(s%60).padStart(2,'0');
      return `${mm}:${ss}`;
    }
  }
})();