let plans = [
  { id: 'starter', title: 'Starter', price: 35, description: 'استضافة اقتصادية للمواقع الصغيرة' },
  { id: 'business', title: 'Business', price: 75, description: 'خطط مرنة لتطبيقات الأعمال المتوسطة' },
  { id: 'ultimate', title: 'Ultimate', price: 160, description: 'استضافة قوية للسيرفرات والتطبيقات الضخمة' }
]

let languages = ['PHP', 'Node.js', 'Python', 'React', 'WordPress', 'Laravel']

let jexactylConfig = {
  panelUrl: '#',
  description: 'يمكن ربط هذه الصفحة بلوحة jExactyl لعرض بيانات سيرفرات الاستضافة الحقيقية.'
}

const state = {
  selectedPlan: 'business',
  language: 'React',
  domain: 'my-site.example.com',
  cpu: 4,
  ram: 8,
  storage: 120,
  bandwidth: 2000
}

const planList = document.querySelector('#plan-list')
const languageSelect = document.querySelector('#language-select')
const domainInput = document.querySelector('#domain-input')
const cpuRange = document.querySelector('#cpu-range')
const ramRange = document.querySelector('#ram-range')
const storageRange = document.querySelector('#storage-range')
const bandwidthRange = document.querySelector('#bandwidth-range')
const summaryItems = {
  plan: document.querySelector('#summary-plan'),
  resources: document.querySelector('#summary-resources'),
  language: document.querySelector('#summary-language'),
  total: document.querySelector('#summary-total')
}

function formatResources() {
  return `${state.cpu} CPU · ${state.ram}GB RAM · ${state.storage}GB تخزين · ${state.bandwidth}GB نطاق`
}

function calculateTotal() {
  const basePrice = plans.find((plan) => plan.id === state.selectedPlan).price
  const resourceCost = state.cpu * 10 + state.ram * 4 + state.storage * 0.18 + state.bandwidth * 0.02
  return Math.round(basePrice + resourceCost)
}

function renderPlans() {
  planList.innerHTML = plans
    .map(
      (plan) => `
      <div class="plan-card ${plan.id === state.selectedPlan ? 'active' : ''}" data-plan="${plan.id}">
        <h3>${plan.title}</h3>
        <p>${plan.description}</p>
        <strong>$${plan.price}/شهر</strong>
      </div>
    `
    )
    .join('')
  document.querySelectorAll('.plan-card').forEach((card) => {
    card.addEventListener('click', () => {
      state.selectedPlan = card.dataset.plan
      renderPlans()
      renderSummary()
      renderHeroCard()
    })
  })
}

function renderHeroCard() {
  document.querySelector('#hero-plan').textContent = plans.find((plan) => plan.id === state.selectedPlan).title
  document.querySelector('#hero-language').textContent = state.language
  document.querySelector('#hero-domain').textContent = state.domain
  document.querySelector('#hero-price').textContent = `$${calculateTotal()}`
}

function renderSummary() {
  summaryItems.plan.textContent = plans.find((plan) => plan.id === state.selectedPlan).title
  summaryItems.resources.textContent = formatResources()
  summaryItems.language.textContent = state.language
  summaryItems.total.textContent = `$${calculateTotal()}`
}

function setupSelectors() {
  languages.forEach((language) => {
    const option = document.createElement('option')
    option.value = language
    option.textContent = language
    if (language === state.language) option.selected = true
    languageSelect.appendChild(option)
  })

  domainInput.value = state.domain
  cpuRange.value = state.cpu
  ramRange.value = state.ram
  storageRange.value = state.storage
  bandwidthRange.value = state.bandwidth

  languageSelect.addEventListener('change', (event) => {
    state.language = event.target.value
    renderSummary()
    renderHeroCard()
  })

  domainInput.addEventListener('input', (event) => {
    state.domain = event.target.value
    renderHeroCard()
  })

  cpuRange.addEventListener('input', (event) => {
    state.cpu = Number(event.target.value)
    document.querySelector('#cpu-value').textContent = `${state.cpu} أنوية`
    renderSummary()
  })

  ramRange.addEventListener('input', (event) => {
    state.ram = Number(event.target.value)
    document.querySelector('#ram-value').textContent = `${state.ram} جيجابايت`
    renderSummary()
  })

  storageRange.addEventListener('input', (event) => {
    state.storage = Number(event.target.value)
    document.querySelector('#storage-value').textContent = `${state.storage} جيجابايت`
    renderSummary()
  })

  bandwidthRange.addEventListener('input', (event) => {
    state.bandwidth = Number(event.target.value)
    document.querySelector('#bandwidth-value').textContent = `${state.bandwidth} جيجابايت`
    renderSummary()
  })
}

async function loadResources() {
  try {
    const response = await fetch('/resources.json')
    if (!response.ok) throw new Error('Resource load failed')
    const data = await response.json()
    if (data.plans) plans = data.plans
    if (data.languages) languages = data.languages
    if (data.jexactyl) jexactylConfig = data.jexactyl
  } catch (error) {
    console.warn('Unable to load resources.json, using defaults.', error)
  }
}

function renderJexactylInfo() {
  document.querySelector('#jexactyl-description').textContent = jexactylConfig.description
  const link = document.querySelector('#jexactyl-url')
  link.href = jexactylConfig.panelUrl
  link.textContent = jexactylConfig.panelUrl
}

async function init() {
  await loadResources()
  renderPlans()
  setupSelectors()
  renderSummary()
  renderHeroCard()
  renderJexactylInfo()
}

init()
