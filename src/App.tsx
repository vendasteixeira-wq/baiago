import {
  Bus,
  CalendarDays,
  Car,
  Clock3,
  Download,
  Facebook,
  Hash,
  Instagram,
  Hotel,
  MapPin,
  MessageCircle,
  Plane,
  Plus,
  RadioTower,
  Search,
  ShipWheel,
  Sparkles,
  UsersRound,
  Waves,
} from "lucide-react";

type ArrivalMode = "Aerea" | "Rodoviaria" | "Carro" | "Van";
type TouristStatus = "Confirmado" | "Aguardando" | "Hospedado";
type SocialSource =
  | "WhatsApp Stories"
  | "Instagram"
  | "X"
  | "Facebook"
  | "Snapchat"
  | "Kwai/Kway"
  | "TikTok"
  | "Influencers"
  | "Threads";

type TouristArrival = {
  id: number;
  name: string;
  origin: string;
  mode: ArrivalMode;
  arrival: string;
  status: TouristStatus;
  groupSize: number;
  hotel: string;
};

type SocialSignal = {
  id: number;
  source: SocialSource;
  profile: string;
  location: string;
  term: string;
  reach: number;
  sentiment: "Alta intencao" | "Oportunidade" | "Acompanhar";
  postedAt: string;
};

const arrivals: TouristArrival[] = [
  {
    id: 1,
    name: "Familia Costa",
    origin: "Belo Horizonte, MG",
    mode: "Aerea",
    arrival: "10:20",
    status: "Hospedado",
    groupSize: 4,
    hotel: "Orla Norte",
  },
  {
    id: 2,
    name: "Grupo Bahia Azul",
    origin: "Salvador, BA",
    mode: "Van",
    arrival: "11:10",
    status: "Confirmado",
    groupSize: 12,
    hotel: "Centro Historico",
  },
  {
    id: 3,
    name: "Mariana Reis",
    origin: "Sao Paulo, SP",
    mode: "Carro",
    arrival: "12:30",
    status: "Aguardando",
    groupSize: 2,
    hotel: "Praia de Taperapua",
  },
  {
    id: 4,
    name: "Excursao Descobrimento",
    origin: "Vitoria, ES",
    mode: "Rodoviaria",
    arrival: "13:45",
    status: "Confirmado",
    groupSize: 18,
    hotel: "Arraial d'Ajuda",
  },
  {
    id: 5,
    name: "Casal Monteiro",
    origin: "Brasilia, DF",
    mode: "Aerea",
    arrival: "15:05",
    status: "Aguardando",
    groupSize: 2,
    hotel: "Mutari",
  },
];

const monitoredTerms = [
  "check in hotel em porto seguro",
  "check in arraial dajuda",
  "check in caraiva",
  "check in praia do espelho",
  "#PortoSeguro",
  "#ArraialDAjuda",
  "#Caraiva",
  "#PraiaDoEspelho",
  "#CostaDoDescobrimento",
  "#FeriasNaBahia",
];

const socialSources = [
  { name: "WhatsApp Stories", mentions: 41, icon: MessageCircle, active: true },
  { name: "Instagram", mentions: 96, icon: Instagram, active: true },
  { name: "X", mentions: 18, icon: Hash, active: true },
  { name: "Facebook", mentions: 33, icon: Facebook, active: true },
  { name: "Snapchat", mentions: 9, icon: Sparkles, active: false },
  { name: "Kwai/Kway", mentions: 12, icon: RadioTower, active: false },
  { name: "TikTok", mentions: 74, icon: RadioTower, active: true },
  { name: "Influencers", mentions: 21, icon: UsersRound, active: true },
  { name: "Threads", mentions: 16, icon: Hash, active: true },
] satisfies Array<{ name: SocialSource; mentions: number; icon: typeof Instagram; active: boolean }>;

const socialSignals: SocialSignal[] = [
  {
    id: 1,
    source: "Instagram",
    profile: "@viajandocomana",
    location: "Porto Seguro",
    term: "check in hotel em porto seguro",
    reach: 18400,
    sentiment: "Alta intencao",
    postedAt: "ha 8 min",
  },
  {
    id: 2,
    source: "TikTok",
    profile: "@rotadabahia",
    location: "Arraial d'Ajuda",
    term: "check in arraial dajuda",
    reach: 32100,
    sentiment: "Alta intencao",
    postedAt: "ha 16 min",
  },
  {
    id: 3,
    source: "WhatsApp Stories",
    profile: "Grupo receptivo sul",
    location: "Caraiva",
    term: "check in caraiva",
    reach: 740,
    sentiment: "Acompanhar",
    postedAt: "ha 22 min",
  },
  {
    id: 4,
    source: "Influencers",
    profile: "@nordestevip",
    location: "Praia do Espelho",
    term: "check in praia do espelho",
    reach: 52800,
    sentiment: "Oportunidade",
    postedAt: "ha 41 min",
  },
];

const modeConfig = {
  Aerea: {
    label: "Via Aerea",
    icon: Plane,
    color: "#0e8ac8",
    background: "#e9f6fc",
  },
  Rodoviaria: {
    label: "Via Rodoviaria",
    icon: Bus,
    color: "#eb6b2e",
    background: "#fff0e7",
  },
  Carro: {
    label: "Carro Particular",
    icon: Car,
    color: "#23a35a",
    background: "#eaf8ef",
  },
  Van: {
    label: "Van/Transfer",
    icon: ShipWheel,
    color: "#bd8a15",
    background: "#fff6dd",
  },
} satisfies Record<ArrivalMode, { label: string; icon: typeof Plane; color: string; background: string }>;

const statusConfig = {
  Confirmado: "status status-confirmed",
  Aguardando: "status status-waiting",
  Hospedado: "status status-hosted",
} satisfies Record<TouristStatus, string>;

function totalByMode(mode: ArrivalMode) {
  return arrivals
    .filter((arrival) => arrival.mode === mode)
    .reduce((total, arrival) => total + arrival.groupSize, 0);
}

function percent(value: number, total: number) {
  return `${Math.round((value / total) * 100)}%`;
}

export function App() {
  const totalTourists = arrivals.reduce((total, arrival) => total + arrival.groupSize, 0);
  const waiting = arrivals
    .filter((arrival) => arrival.status === "Aguardando")
    .reduce((total, arrival) => total + arrival.groupSize, 0);
  const totalSocialMentions = socialSources.reduce((total, source) => total + source.mentions, 0);
  const activeSources = socialSources.filter((source) => source.active).length;

  const cards = [
    {
      title: "Total de Turistas",
      value: totalTourists,
      helper: `${arrivals.length} registros ativos`,
      icon: UsersRound,
      color: "#0e9f9a",
      background: "#e7f6f5",
    },
    ...(["Aerea", "Rodoviaria", "Carro", "Van"] as ArrivalMode[]).map((mode) => {
      const value = totalByMode(mode);
      return {
        title: modeConfig[mode].label,
        value,
        helper: percent(value, totalTourists),
        icon: modeConfig[mode].icon,
        color: modeConfig[mode].color,
        background: modeConfig[mode].background,
      };
    }),
    {
      title: "Aguardando Transporte",
      value: waiting,
      helper: `${waiting} pessoas em espera`,
      icon: Clock3,
      color: "#e23e57",
      background: "#ffecee",
    },
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <Waves aria-hidden="true" />
          <span>Porto Seguro</span>
        </div>
        <nav className="topnav" aria-label="Navegacao principal">
          <a href="#painel">Painel</a>
          <a href="#chegadas">Chegadas</a>
          <a href="#radar-social">Radar Social</a>
          <a href="#operacao">Operacao</a>
        </nav>
      </header>

      <section className="hero" id="painel">
        <div>
          <p className="eyebrow">Costa do Descobrimento</p>
          <h1>Painel de Turismo</h1>
          <p>Monitoramento operacional de chegadas, transporte e hospedagem em tempo real.</p>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" type="button">
            <Download size={18} aria-hidden="true" />
            Exportar
          </button>
          <button className="primary-button" type="button">
            <Plus size={18} aria-hidden="true" />
            Registrar Chegada
          </button>
        </div>
      </section>

      <section className="toolbar" aria-label="Filtros do painel">
        <label>
          Periodo
          <select defaultValue="hoje">
            <option value="hoje">Hoje</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
          </select>
        </label>
        <label>
          Origem
          <select defaultValue="todas">
            <option value="todas">Todas as origens</option>
            <option value="sp">Sao Paulo</option>
            <option value="ba">Bahia</option>
            <option value="mg">Minas Gerais</option>
          </select>
        </label>
        <label>
          Status
          <select defaultValue="todos">
            <option value="todos">Todos</option>
            <option value="confirmado">Confirmado</option>
            <option value="aguardando">Aguardando</option>
            <option value="hospedado">Hospedado</option>
          </select>
        </label>
      </section>

      <section className="metric-grid" aria-label="Indicadores do turismo">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="metric-card" key={card.title}>
              <div>
                <span>{card.title}</span>
                <strong>{card.value}</strong>
                <small>{card.helper}</small>
              </div>
              <div className="metric-icon" style={{ background: card.background, color: card.color }}>
                <Icon size={24} aria-hidden="true" />
              </div>
            </article>
          );
        })}
      </section>

      <section className="content-grid">
        <div className="panel" id="chegadas">
          <div className="panel-heading">
            <div>
              <h2>Chegadas de hoje</h2>
              <p>Fila priorizada por horario e status.</p>
            </div>
            <CalendarDays size={20} aria-hidden="true" />
          </div>
          <div className="arrival-list">
            {arrivals.map((arrival) => (
              <article className="arrival-row" key={arrival.id}>
                <div className="arrival-time">{arrival.arrival}</div>
                <div className="arrival-main">
                  <strong>{arrival.name}</strong>
                  <span>
                    <MapPin size={14} aria-hidden="true" />
                    {arrival.origin}
                  </span>
                </div>
                <div className="arrival-meta">
                  <span>{modeConfig[arrival.mode].label}</span>
                  <span>{arrival.groupSize} pessoas</span>
                </div>
                <span className={statusConfig[arrival.status]}>{arrival.status}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel" id="operacao">
          <div className="panel-heading">
            <div>
              <h2>Operacao</h2>
              <p>Resumo de capacidade e distribuicao.</p>
            </div>
            <Hotel size={20} aria-hidden="true" />
          </div>
          <div className="progress-stack">
            {(["Aerea", "Rodoviaria", "Carro", "Van"] as ArrivalMode[]).map((mode) => {
              const value = totalByMode(mode);
              return (
                <div className="progress-item" key={mode}>
                  <div>
                    <span>{modeConfig[mode].label}</span>
                    <strong>{value}</strong>
                  </div>
                  <div className="progress-track">
                    <span
                      style={{
                        width: percent(value, totalTourists),
                        background: modeConfig[mode].color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <form className="quick-form">
            <h3>Novo registro rapido</h3>
            <input aria-label="Nome do grupo" placeholder="Nome do grupo" />
            <input aria-label="Origem" placeholder="Origem" />
            <select aria-label="Meio de chegada" defaultValue="">
              <option value="" disabled>
                Meio de chegada
              </option>
              <option>Via Aerea</option>
              <option>Via Rodoviaria</option>
              <option>Carro Particular</option>
              <option>Van/Transfer</option>
            </select>
            <button className="primary-button full" type="button">
              <Plus size={18} aria-hidden="true" />
              Adicionar
            </button>
          </form>
        </aside>
      </section>

      <section className="social-radar" id="radar-social">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Busca ativa</p>
            <h2>Radar de postagens e check-ins</h2>
            <p>
              Monitoramento de sinais publicos e parceiros para captar demanda em redes sociais,
              stories e perfis de influencia.
            </p>
          </div>
          <div className="radar-summary" aria-label="Resumo do radar social">
            <strong>{totalSocialMentions}</strong>
            <span>mencoes rastreadas</span>
            <small>{activeSources} fontes ativas</small>
          </div>
        </div>

        <div className="social-layout">
          <article className="panel search-panel">
            <div className="panel-heading">
              <div>
                <h2>Termos monitorados</h2>
                <p>Consultas prioritarias por destino, hotel e hashtag.</p>
              </div>
              <Search size={20} aria-hidden="true" />
            </div>
            <div className="term-cloud">
              {monitoredTerms.map((term) => (
                <button type="button" key={term}>
                  {term.startsWith("#") ? <Hash size={14} aria-hidden="true" /> : <Search size={14} aria-hidden="true" />}
                  {term}
                </button>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <h2>Fontes sociais</h2>
                <p>Status de captura por canal.</p>
              </div>
              <RadioTower size={20} aria-hidden="true" />
            </div>
            <div className="source-grid">
              {socialSources.map((source) => {
                const Icon = source.icon;
                return (
                  <div className="source-card" key={source.name}>
                    <div className="source-icon">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>{source.name}</strong>
                      <span>{source.mentions} sinais</span>
                    </div>
                    <small className={source.active ? "live-dot" : "pending-dot"}>
                      {source.active ? "Ativo" : "Pendente"}
                    </small>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="panel social-feed">
            <div className="panel-heading">
              <div>
                <h2>Sinais recentes</h2>
                <p>Possiveis turistas e oportunidades para abordagem.</p>
              </div>
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div className="signal-list">
              {socialSignals.map((signal) => (
                <div className="signal-row" key={signal.id}>
                  <div>
                    <strong>{signal.profile}</strong>
                    <span>
                      {signal.source} · {signal.location} · {signal.postedAt}
                    </span>
                    <p>{signal.term}</p>
                  </div>
                  <div className="signal-score">
                    <strong>{Intl.NumberFormat("pt-BR").format(signal.reach)}</strong>
                    <span>{signal.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
