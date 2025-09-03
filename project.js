// project.js

// 1. Spinner hides when page finishes loading
window.addEventListener("load", () => {
  document.getElementById("spinner").style.display = "none";
});

// Modal elements
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalVideo = document.getElementById("modalVideo");

// 2. Movies / Series / Shorts / Trailers data
// NOTE: Using YouTube embed links instead of local .mp4
const movies = {
  cursor1: { title: "Inception", desc: "A mind-bending thriller by Nolan", video: "https://www.youtube.com/embed/YoHD9XEInc0" },
  cursor2: { title: "Avengers", desc: "Earth’s mightiest heroes unite", video: "https://www.youtube.com/embed/eOrNdBpGMv8" },
  cursor3: { title: "Interstellar", desc: "Journey beyond the stars", video: "https://www.youtube.com/embed/zSWdZVtXT7E" },
  cursor4: { title: "Joker", desc: "Origin story of the Joker", video: "https://www.youtube.com/embed/zAGVQLHvwOY" },
  cursor5: { title: "Avatar", desc: "Explore Pandora in 3D", video: "https://www.youtube.com/embed/5PSNL1qE6VY" },

  cursor6: { title: "Stranger Things", desc: "Mystery in Hawkins", video: "https://www.youtube.com/embed/mnd7sFt5c3A" },
  cursor7: { title: "Breaking Bad", desc: "A chemistry teacher turns to crime", video: "https://www.youtube.com/embed/HhesaQXLuRY" },

  cursor11: { title: "Freelance (Short)", desc: "Action-packed short film", video: "https://www.youtube.com/embed/WAvchbP2kXM" },
  cursor12: { title: "Swing to the Moon", desc: "Romantic short movie", video: "https://www.youtube.com/embed/doPV-Shqm7k" },
  cursor13: { title: "The Brightest Star", desc: "Emotional short", video: "https://www.youtube.com/embed/SwOYQLfuEcI" },
  cursor14: { title: "MechWest", desc: "Sci-fi western short", video: "https://www.youtube.com/embed/C4ZP3--XhyU" },
  cursor15: { title: "Rise of the Decayed", desc: "Zombie apocalypse short", video: "https://www.youtube.com/embed/qVqM2NzuwTk" },

  cursor16: { title: "Batman Trailer", desc: "Dark Knight Returns", video: "https://www.youtube.com/embed/mqqft2x_Aa4" },
  cursor17: { title: "Fast X Trailer", desc: "High speed action", video: "https://www.youtube.com/embed/aOb15GVFZxU" },
  cursor18: { title: "Dune 2 Trailer", desc: "Epic sci-fi saga continues", video: "https://www.youtube.com/embed/U2Qp5pL3ovA" }
};

// 3. Function to open modal
function openModal(id) {
  const movie = movies[id];
  if (movie) {
    modalTitle.textContent = movie.title;
    modalDesc.textContent = movie.desc;

    // Replace video tag content with YouTube iframe
    modalVideo.outerHTML = 
      <iframe id="modalVideo" width="100%" height="400" 
        src="${movie.video}" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    ;

    modal.style.display = "block";

    // Add rating stars dynamically
    modalDesc.insertAdjacentHTML("afterend", createRatingStars());
    activateRating();
  }
}

// 4. Attach events to all watch buttons
Object.keys(movies).forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => openModal(id));
  }
});

// 5. Close modal
closeBtn.addEventListener("click", () => closeModal());

// Close when clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal helper (reset video so it stops playing)
function closeModal() {
  modal.style.display = "none";
  const iframe = document.getElementById("modalVideo");
  if (iframe) {
    iframe.src = ""; // stop YouTube playback
  }
}
// 6. Create rating stars
function createRatingStars() {
  return 
    <div class="rating">
      <span data-value="1">&#9733;</span>
      <span data-value="2">&#9733;</span>
      <span data-value="3">&#9733;</span>
      <span data-value="4">&#9733;</span>
      <span data-value="5">&#9733;</span>
    </div>
  ;
}

// 7. Activate rating system
function activateRating() {
  const stars = document.querySelectorAll(".rating span");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      stars.forEach((s) => s.classList.remove("active"));
      star.classList.add("active");
      alert(You rated this ${star.dataset.value} stars!);
    });
  });
}