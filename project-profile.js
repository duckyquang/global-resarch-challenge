'use strict';

(function () {
  const projects = window.GRC_PROJECTS || {};
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'sebastien-kawada';
  const project = projects[id];

  const nameEl = document.getElementById('projectName');
  const titleEl = document.getElementById('projectTitle');
  const tierEl = document.getElementById('projectTier');
  const rankEl = document.getElementById('projectRank');
  const recognitionEl = document.getElementById('projectRecognition');
  const abstractEl = document.getElementById('projectAbstractText');
  const videoLink = document.getElementById('projectVideoLink');
  const videoWrap = document.getElementById('projectVideoWrap');
  const videoEl = document.getElementById('projectVideo');

  if (!project) {
    document.title = 'Project Not Found | Global Research Challenge';
    if (nameEl) nameEl.textContent = 'Project Not Found';
    if (titleEl) titleEl.textContent = 'Return to the 2026 results page to choose a recognized project profile.';
    if (tierEl) tierEl.textContent = 'Global Research Challenge 2026';
    if (rankEl) rankEl.textContent = 'N/A';
    if (recognitionEl) recognitionEl.textContent = 'No matching profile';
    if (abstractEl) abstractEl.textContent = 'The project profile you requested could not be found.';
    return;
  }

  document.title = `${project.name} | Global Research Challenge`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `${project.name}: ${project.title}`);
  }

  if (nameEl) nameEl.textContent = project.name;
  if (titleEl) titleEl.textContent = project.title;
  if (tierEl) tierEl.textContent = project.tier || 'Project Profile';
  if (rankEl) rankEl.textContent = project.rankShort || project.rank || '';
  if (recognitionEl) recognitionEl.textContent = project.rank || '';
  if (abstractEl) abstractEl.textContent = project.abstract || '';
  if (videoLink && project.video) {
    videoLink.href = project.video;
    videoLink.hidden = false;
  }
  if (videoWrap && videoEl && project.video) {
    videoEl.src = project.video;
    videoWrap.closest('.project-detail-grid')?.classList.add('has-video');
    videoWrap.hidden = false;
  }
})();
