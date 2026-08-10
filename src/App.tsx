import {
  Bus,
  CalendarDays,
  Car,
  Clock3,
  Download,
  Hotel,
  MapPin,
  Plane,
  Plus,
  ShipWheel,
  UsersRound,
  Waves,
} from "lucide-react";

type ArrivalMode = "Aerea" | "Rodoviaria" | "Carro" | "Van";
type TouristStatus = "Confirmado" | "Aguardando" | "Hospedado";

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
    </main>
  );
}
