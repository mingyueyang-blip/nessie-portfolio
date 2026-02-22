(function () {
  "use strict";

  const act1 = document.getElementById("act1");
  const act2 = document.getElementById("act2");
  const btnEnter = document.getElementById("btn-enter");
  const btnTheme = document.getElementById("btn-theme");
  const contactModal = document.getElementById("contact-modal");
  const portfolioModal = document.getElementById("portfolio-modal");
  const btnContactNav = document.getElementById("btn-contact-nav");
  const btnContactHub = document.getElementById("btn-contact-hub");
  const btnContactClose = document.getElementById("btn-contact-close");
  const noteDetail = document.getElementById("note-detail");
  const btnBackNotes = document.getElementById("btn-back-notes");
  const globalNav = document.getElementById("global-nav");
  const notesCardsContainer = document.getElementById("notes-cards");

  function stripTitlePrefix(title) {
    if (!title || typeof title !== "string") return title;
    return title.replace(/^\[[^\]]+\]\s*/, "");
  }

  function renderNotesCards() {
    if (!notesCardsContainer || typeof window.NOTES_DATA === "undefined") return;
    notesCardsContainer.innerHTML = "";
    window.NOTES_DATA.forEach(function (note) {
      var card = document.createElement("article");
      card.className = "notes-card";
      card.setAttribute("data-note-id", String(note.id));
      if (note.tagIcon || note.tagLabel) {
        var tag = document.createElement("span");
        tag.className = "notes-card-tag";
        if (note.tagColor) tag.classList.add("tag-color-" + note.tagColor);
        tag.textContent = (note.tagIcon ? note.tagIcon + " " : "") + (note.tagLabel || "");
        card.appendChild(tag);
      }
      var h3 = document.createElement("h3");
      h3.textContent = stripTitlePrefix(note.title);
      card.appendChild(h3);
      var summaryP = document.createElement("p");
      summaryP.className = "notes-summary";
      summaryP.textContent = note.abstract || "";
      card.appendChild(summaryP);
      notesCardsContainer.appendChild(card);
    });
  }
  renderNotesCards();

  function showAct(actId) {
    document.querySelectorAll(".act").forEach(function (el) {
      el.classList.add("hidden");
      el.classList.remove("zoom-in", "zoom-out");
    });
    const target = document.getElementById(actId);
    if (target) {
      target.classList.remove("hidden");
      if (actId === "act2") target.classList.add("zoom-in");
    }
    if (actId === "act3-notes") {
      var notesWrap = document.querySelector(".notes-list-wrap");
      if (notesWrap) notesWrap.classList.remove("hidden");
      noteDetail.classList.add("hidden");
      var navBack = document.getElementById("btn-back-notes");
      if (navBack) navBack.classList.add("hidden");
    }
    if (globalNav && (actId === "act2" || actId === "act3-about" || actId === "act3-portfolio" || actId === "act3-notes")) {
      globalNav.classList.remove("hidden");
    }
    document.querySelectorAll(".nav-link[data-nav]").forEach(function (el) {
      el.classList.remove("active");
    });
    var navMap = { "act3-about": "about", "act3-portfolio": "portfolio", "act3-notes": "notes" };
    if (navMap[actId]) {
      var activeLink = document.querySelector(".nav-link[data-nav=\"" + navMap[actId] + "\"]");
      if (activeLink) activeLink.classList.add("active");
    }
  }

  function hideAct(actId) {
    const el = document.getElementById(actId);
    if (el) el.classList.add("hidden");
  }

  btnEnter.addEventListener("click", function () {
    act1.classList.add("zoom-out");
    act2.classList.remove("hidden");
    act2.classList.add("zoom-in");
    if (globalNav) globalNav.classList.remove("hidden");
    setTimeout(function () {
      act1.classList.add("hidden");
    }, 500);
  });

  document.querySelectorAll("[data-goto]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var goto = this.getAttribute("data-goto");
      if (goto === "hub") {
        showAct("act2");
        return;
      }
      if (goto === "about") showAct("act3-about");
      else if (goto === "portfolio") showAct("act3-portfolio");
      else if (goto === "notes") showAct("act3-notes");
    });
  });

  btnTheme.addEventListener("click", function () {
    document.body.classList.toggle("theme-light");
    document.body.classList.toggle("theme-dark");
  });

  function openContact() {
    contactModal.hidden = false;
  }
  function closeContact() {
    contactModal.hidden = true;
  }

  btnContactNav.addEventListener("click", openContact);
  btnContactHub.addEventListener("click", openContact);
  btnContactClose.addEventListener("click", closeContact);
  contactModal.querySelector(".modal-backdrop").addEventListener("click", closeContact);

  document.querySelectorAll(".btn-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = this.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            btn.textContent = "已复制";
            setTimeout(function () {
              btn.textContent = "复制";
            }, 1500);
          },
          function () {
            fallbackCopy(text, btn);
          }
        );
      } else {
        fallbackCopy(text, btn);
      }
    });
  });

  function fallbackCopy(text, btn) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      btn.textContent = "已复制";
      setTimeout(function () {
        btn.textContent = "复制";
      }, 1500);
    } catch (err) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll(".portfolio-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var project = card.getAttribute("data-project");
      document.querySelectorAll(".modal-content-panel").forEach(function (panel) {
        panel.classList.toggle("hidden", panel.getAttribute("data-project") !== project);
      });
      portfolioModal.hidden = false;
    });
  });

  portfolioModal.querySelector(".modal-close").addEventListener("click", function () {
    portfolioModal.hidden = true;
  });
  portfolioModal.querySelector(".modal-backdrop").addEventListener("click", function () {
    portfolioModal.hidden = true;
  });

  if (notesCardsContainer) {
    notesCardsContainer.addEventListener("click", function (e) {
      var card = e.target && e.target.closest && e.target.closest(".notes-card");
      if (!card) return;
      var id = card.getAttribute("data-note-id");
      var notes = typeof window.NOTES_DATA !== "undefined" ? window.NOTES_DATA : [];
      var note = notes.find(function (n) { return String(n.id) === String(id); });
      if (note) {
        var titleEl = noteDetail.querySelector(".note-detail-title");
        var contentEl = noteDetail.querySelector(".note-detail-content");
        if (titleEl) titleEl.textContent = stripTitlePrefix(note.title);
        if (contentEl) {
          var raw = note.content || "";
          contentEl.innerHTML = typeof marked !== "undefined"
            ? (marked.parse ? marked.parse(raw) : marked(raw))
            : raw.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
        }
      }
      var wrap = document.querySelector(".notes-list-wrap");
      if (wrap) wrap.classList.add("hidden");
      noteDetail.classList.remove("hidden");
      var navBack = document.getElementById("btn-back-notes");
      if (navBack) navBack.classList.remove("hidden");
    });
  }

  btnBackNotes.addEventListener("click", function () {
    noteDetail.classList.add("hidden");
    document.querySelector(".notes-list-wrap").classList.remove("hidden");
    btnBackNotes.classList.add("hidden");
  });

  var starsRoot = document.getElementById("stars-layer");
  if (starsRoot) {
    for (var i = 0; i < 80; i++) {
      var star = document.createElement("div");
      star.className = "star-dot";
      star.style.cssText =
        "position:absolute;width:2px;height:2px;background:rgba(255,255,255,0.9);border-radius:50%;" +
        "left:" + Math.random() * 100 + "%;top:" + Math.random() * 100 + "%;" +
        "animation:twinkle " + (1 + Math.random() * 1.2) + "s ease-in-out infinite;animation-delay:" + Math.random() * 1 + "s";
      starsRoot.appendChild(star);
    }
  }

  var meteorContainer = document.getElementById("meteor-container");
  if (meteorContainer) {
    function shootMeteor() {
      var m = document.createElement("div");
      m.className = "meteor";
      var top = Math.random() * 50;
      var left = 70 + Math.random() * 30;
      m.style.left = left + "%";
      m.style.top = top + "%";
      meteorContainer.appendChild(m);
      setTimeout(function () {
        if (m.parentNode) m.parentNode.removeChild(m);
      }, 1300);
    }
    setTimeout(function () { shootMeteor(); }, 500);
    setInterval(shootMeteor, 10000);
  }
})();
