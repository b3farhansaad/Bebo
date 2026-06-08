import { useMemo, useState } from 'react'
import './App.css'

const plans = [
  { id: 'starter', title: 'Starter', price: 35, description: 'استضافة اقتصادية للمواقع الصغيرة' },
  { id: 'business', title: 'Business', price: 75, description: 'خطط مرنة لتطبيقات الأعمال المتوسطة' },
  { id: 'ultimate', title: 'Ultimate', price: 160, description: 'استضافة قوية للسيرفرات والتطبيقات الضخمة' }
]

const languages = ['PHP', 'Node.js', 'Python', 'React', 'WordPress', 'Laravel']

function App() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1].id)
  const [language, setLanguage] = useState(languages[3])
  const [domain, setDomain] = useState('my-site.example.com')
  const [cpu, setCpu] = useState(4)
  const [ram, setRam] = useState(8)
  const [storage, setStorage] = useState(120)
  const [bandwidth, setBandwidth] = useState(2000)

  const plan = plans.find((item) => item.id === selectedPlan) || plans[0]

  const totalPrice = useMemo(() => {
    const resourcePrice = cpu * 10 + ram * 4 + storage * 0.18 + bandwidth * 0.02
    return Math.round(plan.price + resourcePrice)
  }, [cpu, ram, storage, bandwidth, plan.price])

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="label">استضافات اسطورية</p>
          <h1>بناء خطة الاستضافة الخاصة بك باحتراف</h1>
          <p>اختر الموارد، اللغة، والدومين بنفسك مع واجهة عربية سريعة وسلسة.</p>
          <div className="hero-actions">
            <button className="btn-primary">ابدأ الآن</button>
            <button className="btn-secondary">شاهد الخطط</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-top">
            <span>مركز التحكم</span>
            <strong>{domain}</strong>
          </div>
          <div className="hero-card-row">
            <span>الخطة</span>
            <strong>{plan.title}</strong>
          </div>
          <div className="hero-card-row">
            <span>اللغة</span>
            <strong>{language}</strong>
          </div>
          <div className="hero-card-row total">
            <span>السعر الشهري</span>
            <strong>${totalPrice}</strong>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="cards-grid">
          {plans.map((planItem) => (
            <article
              key={planItem.id}
              className={`plan-card ${selectedPlan === planItem.id ? 'active' : ''}`}
              onClick={() => setSelectedPlan(planItem.id)}
            >
              <h3>{planItem.title}</h3>
              <p>{planItem.description}</p>
              <strong>${planItem.price}/شهر</strong>
            </article>
          ))}
        </section>

        <section className="config-panel">
          <div className="section-header">
            <h2>خصص موارد الاستضافة</h2>
            <p>تحكم في موارد السيرفر بسهولة وسرعة.</p>
          </div>

          <div className="selectors">
            <div className="field">
              <label>اللغة أو التقنية</label>
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {languages.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>الدومين</label>
              <input value={domain} onChange={(event) => setDomain(event.target.value)} />
            </div>
          </div>

          <div className="resource-grid">
            <div className="resource-card">
              <h4>CPU</h4>
              <p>{cpu} أنوية</p>
              <input
                type="range"
                min="1"
                max="16"
                value={cpu}
                onChange={(event) => setCpu(Number(event.target.value))}
              />
            </div>
            <div className="resource-card">
              <h4>RAM</h4>
              <p>{ram} جيجابايت</p>
              <input
                type="range"
                min="2"
                max="64"
                value={ram}
                onChange={(event) => setRam(Number(event.target.value))}
              />
            </div>
            <div className="resource-card">
              <h4>التخزين</h4>
              <p>{storage} جيجابايت</p>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={storage}
                onChange={(event) => setStorage(Number(event.target.value))}
              />
            </div>
            <div className="resource-card">
              <h4>النطاق</h4>
              <p>{bandwidth} جيجابايت</p>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={bandwidth}
                onChange={(event) => setBandwidth(Number(event.target.value))}
              />
            </div>
          </div>

          <div className="summary-card">
            <div>
              <span>الخطة المختارة</span>
              <strong>{plan.title}</strong>
            </div>
            <div>
              <span>الموارد</span>
              <strong>{cpu} CPU · {ram}GB RAM · {storage}GB تخزين · {bandwidth}GB نطاق</strong>
            </div>
            <div>
              <span>اللغة</span>
              <strong>{language}</strong>
            </div>
            <div className="summary-total">
              <span>المجموع الشهري</span>
              <strong>${totalPrice}</strong>
            </div>
            <button className="btn-primary">احجز استضافتك الآن</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
