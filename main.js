const PortfolioApp = {
  projects: [],
  filteredProjects: [],
  currentFilter: "all",
  lastFocusedElement: null,

  init() {
    const hasProjects = Array.isArray(window.projects);
    this.projects = hasProjects ? window.projects : [];
    this.filteredProjects = [...this.projects];

    const hasProjectList = document.getElementById("project-list");
    if (!hasProjectList) return;

    this.updateFilterCounts();
    this.renderProjects();
    this.attachFilterEvents();
    this.attachModalEvents();
  },

  renderProjects() {
    const projectListElement = document.getElementById("project-list");
    if (!projectListElement) {
      console.warn("project-list element not found");
      return;
    }

    projectListElement.innerHTML = "";

    if (!this.filteredProjects.length) {
      const empty = document.createElement("p");
      empty.textContent = "No projects match this filter.";
      projectListElement.appendChild(empty);
      return;
    }

    this.filteredProjects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "work-card";

      const link = document.createElement("a");
      link.href = project.detailLink || "#";

      const image = document.createElement("img");
      image.className = "thumb project-image";
      image.src = `images/work-${project.id}.png`;
      image.alt = project.title;
      image.loading = "lazy";

      image.addEventListener("mouseenter", () => {
        image.classList.add("zoomed");
      });
      image.addEventListener("mouseleave", () => {
        image.classList.remove("zoomed");
      });

      link.appendChild(image);
      card.appendChild(link);

      const role = document.createElement("p");
      role.className = "meta";
      role.textContent = project.role;

      const title = document.createElement("h3");
      title.textContent = project.title;

      const desc = document.createElement("p");
      desc.className = "small muted";
      desc.textContent = project.shortDescription;

      const tags = document.createElement("div");
      tags.className = "tags";
      const hasTags = Array.isArray(project.tags) && project.tags.length;
      if (hasTags) {
        project.tags.forEach((tag) => {
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.textContent = tag;
          tags.appendChild(chip);
        });
      } else {
        const noTag = document.createElement("span");
        noTag.className = "chip";
        noTag.textContent = "No tags";
        tags.appendChild(noTag);
      }

      const viewBtn = document.createElement("button");
      viewBtn.className = "project-more btn";
      viewBtn.type = "button";
      viewBtn.textContent = "View details";
      viewBtn.addEventListener("click", () => this.openModal(project.id));

      card.appendChild(role);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(tags);
      card.appendChild(viewBtn);

      projectListElement.appendChild(card);
    });
  },

  attachFilterEvents() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (!filterButtons.length) {
      console.warn("filter buttons not found");
      return;
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.dataset.filter || "all";
        this.currentFilter = filterValue;
        this.applyFilter();
        this.updateActiveFilterButton(filterValue);
      });
    });
  },

  applyFilter() {
    if (this.currentFilter === "all") {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        (project) => project.category === this.currentFilter
      );
    }
    this.renderProjects();
  },

  updateActiveFilterButton(filterValue) {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (!filterButtons.length) return;
    filterButtons.forEach((btn) => {
      if (btn.dataset.filter === filterValue) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },

  openModal(projectId) {
    const modal = document.getElementById("project-modal");
    const titleEl = document.getElementById("modal-title");
    const roleEl = document.getElementById("modal-role");
    const descEl = document.getElementById("modal-description");
    const linkEl = document.getElementById("modal-link");
    const tagsEl = document.getElementById("modal-tags");
    const closeBtn = document.getElementById("modal-close");

    if (!modal || !titleEl || !roleEl || !descEl || !linkEl) return;

    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return;

    titleEl.textContent = project.title;
    roleEl.textContent = project.role;
    descEl.textContent = project.shortDescription;
    linkEl.href = project.detailLink || "#";
    if (tagsEl) {
      tagsEl.innerHTML = "";
      const hasTags = Array.isArray(project.tags) && project.tags.length;
      if (hasTags) {
        project.tags.forEach((tag) => {
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.textContent = tag;
          tagsEl.appendChild(chip);
        });
      } else {
        const noTag = document.createElement("span");
        noTag.className = "chip";
        noTag.textContent = "No tags";
        tagsEl.appendChild(noTag);
      }
    }

    this.lastFocusedElement = document.activeElement;
    modal.classList.remove("hidden");
    if (closeBtn) {
      closeBtn.focus();
    }
  },

  attachModalEvents() {
    const modal = document.getElementById("project-modal");
    const closeBtn = document.getElementById("modal-close");
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener("click", () => this.closeModal());
    modal.addEventListener("click", (event) => {
      if (event.target === modal) this.closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.closeModal();
    });
  },

  closeModal() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === "function") {
      this.lastFocusedElement.focus();
    }
  },

  updateFilterCounts() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (!filterButtons.length) return;
    const counts = {
      all: this.projects.length,
      web: this.projects.filter((p) => p.category === "web").length,
      branding: this.projects.filter((p) => p.category === "branding").length,
      ai: this.projects.filter((p) => p.category === "ai").length
    };
    filterButtons.forEach((btn) => {
      const value = btn.dataset.filter || "all";
      const count = value in counts ? counts[value] : 0;
      const baseLabel = btn.textContent.split("(")[0].trim();
      btn.textContent = `${baseLabel} (${count})`;
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  PortfolioApp.init();

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const applyTheme = (isDark) => {
      document.body.classList.toggle("dark-theme", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.checked = isDark;
    };

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") applyTheme(true);
    else applyTheme(false);

    themeToggle.addEventListener("change", (event) => {
      const isDark = event.target.checked;
      applyTheme(isDark);
    });
  }

  const contactForm = document.querySelector(".contact-form");
  const toast = document.getElementById("toast");
  const toastClose = toast ? toast.querySelector(".toast-close") : null;
  if (contactForm && toast) {
    const showToast = () => {
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 2500);
    };
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast();
      contactForm.reset();
    });
    if (toastClose) {
      toastClose.addEventListener("click", () => toast.classList.add("hidden"));
    }
  }
});
