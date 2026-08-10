document.addEventListener('DOMContentLoaded', () => {

  /* ===== Theme Toggle ===== */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('bri-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.setAttribute('data-theme', theme);

    if (themeToggle) {
      const icon = themeToggle.querySelector('.theme-toggle-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☾' : '☀';
      themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    localStorage.setItem('bri-theme', theme);
  }

  applyTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  /* ===== Mobile Nav Toggle ===== */
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ===== Smooth Scroll ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ===== Countdown Timer ===== */
  // Set your actual registration deadline / batch start date here:
  const deadline = new Date('2026-09-15T00:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = deadline - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ===== Curriculum Data & Render ===== */
  const moduleData = [
    {
      title: 'Basic Bioinformatics',
      summary: [
        'Intro to bioinformatics databases (NCBI, UniProt, PDB, KEGG)',
        'Sequence retrieval, BLAST, pairwise & multiple alignment',
        'Basic biological data formats (FASTA, PDB, GenBank)',
        'Intro to command-line tools & Biopython basics'
      ],
      deliverable: 'Annotated sequence/database report'
    },
    {
      title: 'Computer-Aided Drug Design (CADD)',
      summary: [
        'Ligand/target retrieval, protein structure preparation',
        'Molecular docking (AutoDock Vina/AutoDock4)',
        'Binding site prediction, virtual screening basics',
        'ADMET prediction (SwissADME, pkCSM, admetSAR)'
      ],
      deliverable: 'Docking + ADMET report on a candidate compound'
    },
    {
      title: 'Network Pharmacology',
      summary: [
        'Compound-target prediction (SuperPred, SwissTargetPrediction)',
        'Disease-target mapping (GeneCards, DisGeNET)',
        'Venn/common-gene intersection analysis',
        'PPI network construction (STRING, Cytoscape)',
        'KEGG/GO pathway enrichment analysis'
      ],
      deliverable: 'Compound-disease-target network diagram + pathway report'
    },
    {
      title: 'Computer-Aided Vaccine Design (CAVD)',
      summary: [
        'Antigen selection & epitope prediction (B-cell, T-cell/MHC-I/MHC-II)',
        'Multi-epitope construct design (linkers, adjuvants)',
        'Physicochemical/allergenicity/antigenicity evaluation',
        '3D structure modeling & docking with immune receptors',
        'Immune simulation (C-ImmSim)'
      ],
      deliverable: 'Multi-epitope vaccine construct workflow report'
    },
    {
      title: 'Cancer Bioinformatics',
      summary: [
        'Cancer genomics databases (TCGA, GEO, cBioPortal)',
        'Differential gene expression basics',
        'Survival analysis (Kaplan-Meier), biomarker identification',
        'Pathway/functional enrichment for cancer datasets'
      ],
      deliverable: 'Biomarker/expression analysis mini-report'
    },
    {
      title: 'RNA-Seq Data Analysis',
      summary: [
        'RNA-Seq workflow overview: QC, trimming, alignment, quantification',
        'Tools: FastQC, HISAT2/STAR, featureCounts, DESeq2/edgeR',
        'Differential expression analysis & visualization',
        'Functional enrichment of DEGs'
      ],
      deliverable: 'DEG analysis report with visualizations'
    },
    {
      title: 'Bioinformatics-Based Manuscript Writing',
      summary: [
        'Structuring a research manuscript (IMRaD)',
        'Translating computational results into publication figures/tables',
        'Journal selection, citation management, plagiarism checks',
        'Peer-review process & revision strategy'
      ],
      deliverable: 'Draft manuscript section based on internship project'
    }
  ];

  const stepper = document.getElementById('moduleStepper');

  if (stepper) {
    // If HTML already contains .module-item elements, just attach handlers so the static markup works.
    if (stepper.querySelector('.module-item')) {
      stepper.querySelectorAll('.module-item').forEach(item => {
        const head = item.querySelector('.module-head');
        const body = item.querySelector('.module-body');
        if (!head || !body) return;
        head.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          item.classList.toggle('open');
          body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
        });
      });
    } else {
      moduleData.forEach((mod, i) => {
        const item = document.createElement('div');
        item.className = 'module-item';
        item.innerHTML = `
      <button class="module-head">
        <span class="module-index">${String(i + 1).padStart(2, '0')}</span>
        <span class="module-head-text">
          <h3>Module ${i + 1} — ${mod.title}</h3>
        </span>
        <span class="module-chevron">⌄</span>
      </button>
      <div class="module-body">
        <ul>${mod.summary.map(point => `<li>${point}</li>`).join('')}</ul>
        <span class="deliverable-badge">Deliverable: ${mod.deliverable}</span>
      </div>
    `;
        stepper.appendChild(item);

        const head = item.querySelector('.module-head');
        const body = item.querySelector('.module-body');
        head.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          item.classList.toggle('open');
          body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
        });
      });
    }
  }

  /* ===== FAQ Accordion ===== */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close others (optional single-open behavior)
      document.querySelectorAll('.accordion-item.open').forEach(open => {
        if (open !== item) {
          open.classList.remove('open');
          open.querySelector('.accordion-body').style.maxHeight = null;
        }
      });
      item.classList.toggle('open');
      body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
    });
  });

  /* ===== Registration Form ===== */
  const form = document.getElementById('regForm');
  const successMsg = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Replace this with your actual submission endpoint (fetch/AJAX call)
    successMsg.hidden = false;
    form.reset();
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ===== Tools Carousel (Resources & Tools section) ===== */
  (function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prev = document.getElementById('carouselPrev');
    const next = document.getElementById('carouselNext');
    const viewport = document.querySelector('.carousel-viewport');
    if (!track || !prev || !next || !viewport) return;

    const cards = Array.from(track.children);
    if (!cards.length) return;
    cards.forEach(card => track.appendChild(card.cloneNode(true)));

    const images = Array.from(track.querySelectorAll('img'));
    const waitForImages = Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => { img.addEventListener('load', resolve); img.addEventListener('error', resolve); });
    }));

    const speed = 140; // pixels per second
    const gap = 16;
    let offset = 0;
    let originalWidth = 0;
    let rafId = null;
    let lastTime = null;

    function measure() {
      originalWidth = track.scrollWidth / 2;
      if (originalWidth <= 0) {
        setTimeout(measure, 100);
        return;
      }
      track.style.transform = 'translateX(0px)';
    }

    function animate(time) {
      if (lastTime !== null) {
        const delta = (time - lastTime) / 1000;
        offset += speed * delta;
        if (offset >= originalWidth) offset -= originalWidth;
        track.style.transform = `translateX(${-offset}px)`;
      }
      lastTime = time;
      rafId = requestAnimationFrame(animate);
    }

    function start() {
      if (rafId === null) rafId = requestAnimationFrame(animate);
    }

    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        lastTime = null;
      }
    }

    waitForImages.then(() => {
      measure();
      start();
    });

    next.addEventListener('click', () => {
      offset = (offset + cards[0].getBoundingClientRect().width + gap) % originalWidth;
      track.style.transform = `translateX(${-offset}px)`;
    });
    prev.addEventListener('click', () => {
      offset = (offset - cards[0].getBoundingClientRect().width - gap + originalWidth) % originalWidth;
      track.style.transform = `translateX(${-offset}px)`;
    });

    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);

    const ro = new ResizeObserver(() => measure());
    ro.observe(cards[0]);
    window.addEventListener('resize', measure);
    window.addEventListener('beforeunload', () => { stop(); ro.disconnect(); });
  })();

});