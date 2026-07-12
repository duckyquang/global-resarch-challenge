(function () {
  'use strict';

  const modal = document.getElementById('credentialModal');
  const closeButton = document.getElementById('credentialClose');
  const downloadButton = document.getElementById('credentialDownload');
  const nameOutput = document.getElementById('credentialName');
  const tierOutput = document.getElementById('credentialTier');
  const idOutput = document.getElementById('credentialId');

  if (!modal || !closeButton || !downloadButton || !nameOutput || !tierOutput || !idOutput) return;

  let activeCredential = null;
  let returnFocus = null;

  const clickableNames = document.querySelectorAll(
    '.grand-winner-card strong, .top10-item strong, .recognition-card h3, .directory-item h3'
  );

  function hashName(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36).toUpperCase().padStart(6, '0').slice(0, 6);
  }

  function displayName(element) {
    const value = element.textContent.trim();
    if (!element.closest('.recognition-card, .directory-item')) return value;

    return value.split(' / ').map(function (person) {
      const comma = person.indexOf(',');
      if (comma === -1) return person;
      return (person.slice(comma + 1).trim() + ' ' + person.slice(0, comma).trim()).trim();
    }).join(' / ');
  }

  function recognitionTier(element) {
    const winner = element.closest('.grand-winner-card');
    if (winner) {
      const rank = winner.querySelector('.winner-rank');
      return 'Grand Award Winner — ' + (rank ? rank.textContent.trim() : 'Top 3');
    }

    const topTen = element.closest('.top10-item');
    if (topTen) {
      const rank = Number(topTen.querySelector('.top10-rank')?.textContent.trim());
      if (rank === 1) return 'Grand Award Winner — 1st Place';
      if (rank === 2) return 'Grand Award Winner — 2nd Place';
      if (rank === 3) return 'Grand Award Winner — 3rd Place';
      return 'Top 10 Honoree';
    }

    const listing = element.closest('[data-recognition]');
    if (listing?.dataset.recognition.includes('top-40')) return 'Global Finalist — Top 40';
    return 'Semi-Finalist — Top 100';
  }

  function openCredential(element) {
    const name = displayName(element);
    const tier = recognitionTier(element);
    const id = 'GRC26-' + hashName(name.toLowerCase());

    activeCredential = { name: name, tier: tier, id: id };
    returnFocus = element;
    nameOutput.textContent = name;
    tierOutput.textContent = tier;
    idOutput.textContent = id;
    modal.showModal();
    document.body.classList.add('credential-open');
    closeButton.focus();
  }

  clickableNames.forEach(function (element) {
    element.classList.add('credential-name-trigger');
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-haspopup', 'dialog');
    element.setAttribute('aria-label', 'Open recognition card for ' + displayName(element));

    element.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      openCredential(element);
    });

    element.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopPropagation();
      openCredential(element);
    });
  });

  function closeCredential() {
    modal.close();
  }

  closeButton.addEventListener('click', closeCredential);
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeCredential();
  });
  modal.addEventListener('close', function () {
    document.body.classList.remove('credential-open');
    if (returnFocus) returnFocus.focus();
  });

  function roundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function fitFont(ctx, text, maxWidth, startSize, minimumSize, weight) {
    let size = startSize;
    do {
      ctx.font = weight + ' ' + size + 'px Inter, Arial, sans-serif';
      if (ctx.measureText(text).width <= maxWidth) return size;
      size -= 2;
    } while (size >= minimumSize);
    return minimumSize;
  }

  function drawCard(credential) {
    const canvas = document.createElement('canvas');
    canvas.width = 1800;
    canvas.height = 1125;
    const ctx = canvas.getContext('2d');

    const background = ctx.createLinearGradient(0, 0, 1800, 1125);
    background.addColorStop(0, '#071526');
    background.addColorStop(0.55, '#0b2341');
    background.addColorStop(1, '#102d50');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.globalAlpha = 0.09;
    ctx.strokeStyle = '#9cc5e8';
    ctx.lineWidth = 2;
    for (let x = -600; x < 2200; x += 92) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 600, 1125);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.translate(1510, 275);
    ctx.rotate(-0.23);
    ctx.strokeStyle = 'rgba(204, 164, 89, .18)';
    ctx.lineWidth = 4;
    [170, 260, 350].forEach(function (radius) {
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.43, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();

    ctx.strokeStyle = '#cda65e';
    ctx.lineWidth = 4;
    roundedRect(ctx, 45, 45, 1710, 1035, 34);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(205, 166, 94, .35)';
    ctx.lineWidth = 2;
    roundedRect(ctx, 62, 62, 1676, 1001, 27);
    ctx.stroke();

    ctx.fillStyle = '#cda65e';
    roundedRect(ctx, 112, 105, 96, 96, 22);
    ctx.fill();
    ctx.fillStyle = '#071526';
    ctx.font = '800 48px Inter, Arial, sans-serif';
    ctx.fillText('G', 139, 167);
    ctx.font = '700 18px Inter, Arial, sans-serif';
    ctx.fillText('26', 174, 137);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 31px Inter, Arial, sans-serif';
    ctx.fillText('GLOBAL RESEARCH CHALLENGE', 244, 142);
    ctx.fillStyle = '#91a7bf';
    ctx.font = '500 22px Inter, Arial, sans-serif';
    ctx.fillText('OFFICIAL 2026 DIGITAL CREDENTIAL', 244, 181);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, .18)';
    ctx.font = '800 82px Inter, Arial, sans-serif';
    ctx.fillText('2026', 1680, 176);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#cda65e';
    ctx.font = '700 24px Inter, Arial, sans-serif';
    ctx.fillText('PARTICIPATION & RECOGNITION', 116, 343);

    const nameSize = fitFont(ctx, credential.name, 1480, 78, 42, '700');
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 ' + nameSize + 'px Inter, Arial, sans-serif';
    ctx.fillText(credential.name, 112, 447);

    ctx.font = '700 29px Inter, Arial, sans-serif';
    const tierWidth = ctx.measureText(credential.tier).width + 60;
    ctx.fillStyle = 'rgba(205, 166, 94, .14)';
    roundedRect(ctx, 112, 494, tierWidth, 64, 32);
    ctx.fill();
    ctx.strokeStyle = 'rgba(205, 166, 94, .55)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#e3c482';
    ctx.fillText(credential.tier, 142, 536);

    ctx.fillStyle = '#b7c6d5';
    ctx.font = '400 27px Inter, Arial, sans-serif';
    ctx.fillText('Recognized for contributing original research to the', 112, 641);
    ctx.fillText('2026 Global Research Challenge.', 112, 681);

    ctx.fillStyle = 'rgba(255, 255, 255, .07)';
    roundedRect(ctx, 92, 792, 1616, 214, 26);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, .12)';
    ctx.stroke();
    ctx.fillStyle = '#cda65e';
    ctx.font = '800 49px Inter, Arial, sans-serif';
    ctx.fillText('27', 142, 910);
    ctx.fillStyle = '#e3c482';
    ctx.font = '700 22px Inter, Arial, sans-serif';
    ctx.fillText('2027 COMPETITION ACCESS', 252, 860);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 27px Inter, Arial, sans-serif';
    ctx.fillText('One complimentary entry to an eligible NSRI or Synthica competition.', 252, 913);
    ctx.fillStyle = '#91a7bf';
    ctx.font = '500 20px Inter, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(credential.id, 1650, 967);
    ctx.textAlign = 'left';

    return canvas;
  }

  downloadButton.addEventListener('click', async function () {
    if (!activeCredential) return;
    downloadButton.classList.add('is-preparing');
    downloadButton.disabled = true;
    const originalText = downloadButton.lastChild.textContent;
    downloadButton.lastChild.textContent = ' Preparing…';

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const canvas = drawCard(activeCredential);
      const link = document.createElement('a');
      const safeName = activeCredential.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
      link.download = safeName + '-GRC-2026-Recognition-Card.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      link.remove();
      downloadButton.lastChild.textContent = ' Downloaded';
      setTimeout(function () {
        downloadButton.lastChild.textContent = originalText;
      }, 1800);
    } finally {
      downloadButton.disabled = false;
      downloadButton.classList.remove('is-preparing');
    }
  });
})();
