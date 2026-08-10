(() => {
  const hero = document.getElementById('home-profile')
  if (!hero) return

  const storageKey = 'weblog-home-intro-seen-v1'
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let hasSeenIntro = reduceMotion

  try {
    hasSeenIntro = hasSeenIntro || sessionStorage.getItem(storageKey) === 'true'
  } catch (_) {
    // The animation still works when storage is unavailable.
  }

  const finishIntro = () => {
    hero.classList.add('home-profile--intro-seen')
    try {
      sessionStorage.setItem(storageKey, 'true')
    } catch (_) {}
  }

  if (hasSeenIntro) {
    hero.classList.add('home-profile--intro-seen')
  } else {
    window.setTimeout(finishIntro, 2350)
  }

  hero.querySelector('.home-intro__skip')?.addEventListener('click', finishIntro)

  hero.querySelector('.home-profile__down')?.addEventListener('click', (event) => {
    const articleList = document.getElementById('recent-posts')
    if (!articleList) return
    event.preventDefault()
    articleList.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  })
})()
