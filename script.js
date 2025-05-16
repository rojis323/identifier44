// script.js

window.onload = () => {
    setTimeout(() => {
      document.getElementById("logo-screen").style.display = "none";
      document.getElementById("questionnaire").style.display = "block";
    }, 4000);
  };
  
  function nextStep(step) {
    document.querySelector(`#step${step - 1}`).style.display = "none";
    document.querySelector(`#step${step}`).style.display = "block";
  }
  
  function calculateScore(formData) {
    let total = 0;
    for (let pair of formData.entries()) {
      total += parseInt(pair[1]);
    }
    return total;
  }
  
  function getAdvice(score, maxScore) {
    const percentage = (score / maxScore) * 100;
    if (percentage < 30) return "✅ You seem to be managing stress well. Maintain a healthy balance.";
    if (percentage < 60) return "⚠️ Moderate stress detected. Consider self-care strategies and breaks.";
    return "🚨 High stress level. Please prioritize rest, talk to someone, and seek help if needed.";
  }
  
  document.getElementById("stressForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const score = calculateScore(formData);
    const maxScore = 79; // 18 questions (4-point scale) + self rating (0–25)
  
    document.getElementById("score").innerText = `Score: ${score} / ${maxScore}`;
    document.getElementById("advice").innerText = getAdvice(score, maxScore);
  
    // Detailed section
    let breakdown = "";
    const keys = Array.from(formData.keys());
  
    breakdown += "\n• Lifestyle & Routine: " + keys.slice(0, 6).map(k => formData.get(k)).reduce((a, b) => a * 1 + b * 1, 0);
    breakdown += "\n• Emotional & Mental State: " + keys.slice(6, 12).map(k => formData.get(k)).reduce((a, b) => a * 1 + b * 1, 0);
    breakdown += "\n• Social & Behavioral: " + keys.slice(12, 18).map(k => formData.get(k)).reduce((a, b) => a * 1 + b * 1, 0);
    breakdown += "\n• Self Rating: " + formData.get("selfRating");
  
    document.getElementById("details").innerText = breakdown;
  
    document.getElementById("questionnaire").style.display = "none";
    document.getElementById("result").style.display = "block";
  });