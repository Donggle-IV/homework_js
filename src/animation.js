document.addEventListener("DOMContentLoaded", () => {
  const words = ["Asset", "Place", "Moment"];
  let currentWordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let animationTimeout;

  const wordsContainer = document.querySelector(".words-container");
  if (!wordsContainer) return;

  let typingText = document.createElement("span");
  typingText.className = "typing-text";
  wordsContainer.innerHTML = "";
  wordsContainer.appendChild(typingText);

  function startTypingAnimation() {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      charIndex--;
      typingText.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      typingText.textContent = currentWord.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }

    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(startTypingAnimation, typeSpeed);
  }

  charIndex = 0;
  isDeleting = false;
  typingText.textContent = "";
  startTypingAnimation();
});
