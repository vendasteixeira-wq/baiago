import { useMemo, useState } from "react";
import { CalendarDays, MapPin, MessageCircle, Ship, UsersRound } from "lucide-react";

const seller = {
  name: "Antonio Teixeira",
  whatsapp: "(73) 99907-2178",
  link: "https://wa.me/5573999072178",
};

type Experience = {
  category: string;
  title: string;
  description: string;
  options?: string[];
  icon: string;
};

const experiences: Experience[] = [
  {
    category: "Praias e barracas",
    title: "Orla Norte e Coroa Vermelha",
    description: "Escolha sua experiência de praia e aproveite o dia com transporte organizado.",
    options: ["Beat Beach", "Barramares — Orla Norte", "Sun Beach — Coroa Vermelha"],
    icon: "🏖️",
  },
  {
    category: "Costa do Descobrimento",
    title: "Caraíva de van",
    description: "Passeio de van até um dos destinos mais desejados do litoral sul da Bahia.",
    icon: "🚐",
  },
  {
    category: "Praia paradisíaca",
    title: "Praia do Espelho",
    description: "Dia de praia com três opções de apoio para você escolher.",
    options: ["Maion", "Tunaít", "Recanto do Espelho"],
    icon: "🌊",
  },
  {
    category: "História e cultura",
    title: "Porto Seguro histórico",
    description: "Conheça a história, a cultura e as origens da Costa do Descobrimento.",
    options: ["Cidade Histórica", "Museu do Descobrimento", "Reserva da Jaqueira"],
    icon: "🏛️",
  },
  {
    category: "Passeio marítimo",
    title: "Escuna",
    description: "Navegue pelas águas da região e descubra paisagens inesquecíveis.",
    options: ["Recife de Fora", "Coroa Alta"],
    icon: "⛵",
  },
  {
    category: "Experiência privativa",
    title: "Passeio de lancha",
    description: "Consulte rotas, horários e disponibilidade para uma experiência sob medida.",
    icon: "🚤",
  },
];

export function App() {
  const [form, setForm] = useState({
    experience: experiences[0].title,
    date: "",
    people: "2",
    pickup: "",
    name: "",
  });

  const message = useMemo(() => {
    const date = form.date
      ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(form.date))
      : "a combinar";
    return [
      "Olá, Antonio! Vim pelo site da Bahiago Trip.",
      `Tenho interesse em: ${form.experience}`,
      `Data: ${date}`,
      `Quantidade de pessoas: ${form.people || "a confirmar"}`,
      `Local de embarque: ${form.pickup || "a combinar"}`,
      `Nome: ${form.name || "não informado"}`,
      "Pode me enviar preço, disponibilidade e detalhes?",
    ].join("\n");
  }, [form]);

  const whatsappLink = `${seller.link}?text=${encodeURIComponent(message)}`;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Bahiago Trip">
          <img src="/logo-baiago-instagram.svg" alt="" />
          <span>Bahiago Trip</span>
        </a>
        <nav className="topnav" aria-label="Navegação principal">
          <a href="#passeios">Passeios</a>
          <a href="#orcamento">Orçamento</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Experiências em Porto Seguro e região</p>
          <h1>Seu passeio começa aqui.</h1>
          <p>
            Praias, história, cultura e mar em experiências selecionadas para você conhecer o
            melhor da Costa do Descobrimento.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#passeios">Ver passeios</a>
            <a className="secondary-button" href={seller.link} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="benefits" aria-label="Diferenciais">
        <span><MapPin size={20} /> Experiências locais</span>
        <span><UsersRound size={20} /> Individual, casal, família ou grupo</span>
        <span><CalendarDays size={20} /> Datas sob consulta</span>
        <span><Ship size={20} /> Passeios terrestres e marítimos</span>
      </section>

      <section className="catalog" id="passeios">
        <div className="section-heading">
          <p className="eyebrow">Escolha sua experiência</p>
          <h2>Passeios para todos os estilos</h2>
          <p>Valores, horários, condições e disponibilidade são confirmados no atendimento.</p>
        </div>
        <div className="card-grid">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.title}>
              <div className="experience-icon" aria-hidden="true">{experience.icon}</div>
              <p className="card-category">{experience.category}</p>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              {experience.options && (
                <ul>{experience.options.map((option) => <li key={option}>{option}</li>)}</ul>
              )}
              <button
                type="button"
                onClick={() => {
                  setForm((current) => ({ ...current, experience: experience.title }));
                  document.querySelector("#orcamento")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Consultar este passeio
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section" id="orcamento">
        <div className="quote-copy">
          <p className="eyebrow">Atendimento pelo WhatsApp</p>
          <h2>Monte sua consulta</h2>
          <p>
            Informe os dados básicos. O pedido será enviado ao Antonio para confirmar preço,
            vagas, roteiro e condições antes da reserva.
          </p>
        </div>
        <form className="quote-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Passeio
            <select
              value={form.experience}
              onChange={(event) => setForm({ ...form, experience: event.target.value })}
            >
              {experiences.map((item) => <option key={item.title}>{item.title}</option>)}
            </select>
          </label>
          <div className="form-row">
            <label>
              Data desejada
              <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            </label>
            <label>
              Pessoas
              <input type="number" min="1" value={form.people} onChange={(event) => setForm({ ...form, people: event.target.value })} />
            </label>
          </div>
          <label>
            Seu nome
            <input value={form.name} placeholder="Como podemos chamar você?" onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </label>
          <label>
            Local de embarque
            <input value={form.pickup} placeholder="Hotel, pousada ou bairro" onChange={(event) => setForm({ ...form, pickup: event.target.value })} />
          </label>
          <a className="whatsapp-button" href={whatsappLink} target="_blank" rel="noreferrer">
            <MessageCircle size={20} /> Enviar consulta pelo WhatsApp
          </a>
          <small>Nenhuma reserva é confirmada automaticamente. Aguarde a confirmação do atendimento.</small>
        </form>
      </section>

      <footer>
        <img src="/logo-baiago-instagram.svg" alt="" />
        <div>
          <strong>Bahiago Trip</strong>
          <span>Porto Seguro e Costa do Descobrimento — Bahia</span>
        </div>
        <a href={seller.link} target="_blank" rel="noreferrer">{seller.whatsapp}</a>
      </footer>
    </main>
  );
}
