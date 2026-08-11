import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Plus,
  Route,
  Send,
  ShipWheel,
  UsersRound,
  Waves,
} from "lucide-react";

const PRICE_PER_PERSON = 120;
const DEPOSIT_RATE = 0.5;
const MIN_PAID_PASSENGERS = 8;
const VAN_CAPACITY = 15;

const seller = {
  name: "Antonio Teixeira",
  whatsapp: "(73) 99907-2178",
  link: "https://wa.me/5573999072178",
};

const vehicle = {
  number: "15",
  model: "Sprinter",
  driver: "Anderson",
  whatsapp: "(73) 99974-3707",
  link: "https://wa.me/5573999743707",
  plate: "OZC-9663",
};

const route = "Maion -> Tunait -> Recanto";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type Reservation = {
  id: number;
  client: string;
  saleType: "Pessoa" | "Casal" | "Familia";
  date: string;
  pickup: string;
  adults: number;
  childrenPaid: number;
  childrenFree: number;
  status: "Aguardando sinal" | "Confirmada";
};

const initialReservations: Reservation[] = [
  {
    id: 1,
    client: "Familia Costa",
    saleType: "Familia",
    date: "2026-08-12",
    pickup: "Hotel Orla Norte",
    adults: 2,
    childrenPaid: 1,
    childrenFree: 1,
    status: "Aguardando sinal",
  },
  {
    id: 2,
    client: "Casal Monteiro",
    saleType: "Casal",
    date: "2026-08-13",
    pickup: "Praia de Taperapua",
    adults: 2,
    childrenPaid: 0,
    childrenFree: 0,
    status: "Confirmada",
  },
];

function paidPassengers(reservation: Reservation) {
  return reservation.adults + reservation.childrenPaid;
}

function totalPassengers(reservation: Reservation) {
  return paidPassengers(reservation) + reservation.childrenFree;
}

function totalValue(reservation: Reservation) {
  return paidPassengers(reservation) * PRICE_PER_PERSON;
}

function depositValue(reservation: Reservation) {
  return totalValue(reservation) * DEPOSIT_RATE;
}

function formatDate(value: string) {
  if (!value) return "A combinar";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(value));
}

export function App() {
  const [reservations, setReservations] = useState(initialReservations);
  const [form, setForm] = useState({
    client: "",
    saleType: "Casal" as Reservation["saleType"],
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    pickup: "",
    adults: 2,
    childrenPaid: 0,
    childrenFree: 0,
  });

  const draft = useMemo<Reservation>(
    () => ({
      id: Date.now(),
      client: form.client || "Cliente",
      saleType: form.saleType,
      date: form.date,
      pickup: form.pickup || "Embarque a combinar",
      adults: Number(form.adults) || 0,
      childrenPaid: Number(form.childrenPaid) || 0,
      childrenFree: Number(form.childrenFree) || 0,
      status: "Aguardando sinal",
    }),
    [form],
  );

  const totalRevenue = reservations.reduce((sum, reservation) => sum + totalValue(reservation), 0);
  const pendingDeposit = reservations
    .filter((reservation) => reservation.status === "Aguardando sinal")
    .reduce((sum, reservation) => sum + depositValue(reservation), 0);
  const passengers = reservations.reduce((sum, reservation) => sum + totalPassengers(reservation), 0);
  const seatsAvailable = Math.max(0, VAN_CAPACITY - passengers);
  const confirmed = reservations.filter((reservation) => reservation.status === "Confirmada").length;
  const draftBelowMinimum = paidPassengers(draft) < MIN_PAID_PASSENGERS;
  const draftExceedsCapacity = totalPassengers(draft) > VAN_CAPACITY;

  const proposal = [
    `Ola, ${draft.client}!`,
    "",
    "Segue sua proposta para o passeio Praia do Espelho:",
    `Venda: ${draft.saleType}`,
    `Data: ${formatDate(draft.date)}`,
    `Embarque: ${draft.pickup}`,
    `Passageiros: ${totalPassengers(draft)}`,
    `Pagantes: ${paidPassengers(draft)} (adultos e criancas a partir de 6 anos)`,
    `Criancas abaixo de 6 anos: ${draft.childrenFree} gratis`,
    `Minimo para fechar a saida: ${MIN_PAID_PASSENGERS} pagantes`,
    `Capacidade da Van ${vehicle.number}: ${VAN_CAPACITY} lugares`,
    `Valor total: ${currency.format(totalValue(draft))}`,
    `Sinal de 50% para confirmar: ${currency.format(depositValue(draft))}`,
    `Saldo restante: ${currency.format(totalValue(draft) - depositValue(draft))}`,
    "",
    `Vendedor: ${seller.name} - ${seller.whatsapp}`,
    `Operacao: Van ${vehicle.number} ${vehicle.model}, ${VAN_CAPACITY} lugares, motorista ${vehicle.driver}, placa ${vehicle.plate}`,
  ].join("\n");

  function updateNumber(field: "adults" | "childrenPaid" | "childrenFree", value: string) {
    setForm((current) => ({ ...current, [field]: Math.max(0, Number(value) || 0) }));
  }

  function addReservation() {
    if (!form.client.trim() || draftBelowMinimum || draftExceedsCapacity) return;
    setReservations((current) => [{ ...draft, id: Date.now() }, ...current]);
    setForm((current) => ({ ...current, client: "", pickup: "", saleType: "Casal", adults: 2, childrenPaid: 0, childrenFree: 0 }));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Baiago">
          <Waves aria-hidden="true" />
          <span>Baiago</span>
        </a>
        <nav className="topnav" aria-label="Navegacao principal">
          <a href="#passeio">Passeio</a>
          <a href="#reserva">Reserva</a>
          <a href="#operacao">Operacao</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Agencia de passeios online</p>
          <h1>Passeio Praia do Espelho saindo de Porto Seguro e Trancoso.</h1>
          <p>
            Reserve online com a Baiago: venda para grupos de 8 a 15 pagantes, sinal de 50%,
            rota Maion, Tunait e Recanto, e transporte organizado com a Van 15.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#reserva">
              <Plus size={18} aria-hidden="true" />
              Nova reserva
            </a>
            <a className="secondary-button" href={seller.link} target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              Falar com Antonio
            </a>
          </div>
        </div>
      </section>

      <section className="metric-grid" aria-label="Indicadores da agencia">
        <article className="metric-card">
          <span>Reservas</span>
          <strong>{reservations.length}</strong>
          <small>{confirmed} confirmadas</small>
        </article>
        <article className="metric-card">
          <span>Passageiros</span>
          <strong>{passengers}</strong>
          <small>{seatsAvailable} vagas livres na Van 15</small>
        </article>
        <article className="metric-card">
          <span>Vendas</span>
          <strong>{currency.format(totalRevenue)}</strong>
          <small>R$ 120 por pessoa pagante</small>
        </article>
        <article className="metric-card">
          <span>Sinal pendente</span>
          <strong>{currency.format(pendingDeposit)}</strong>
          <small>50% confirma reserva</small>
        </article>
      </section>

      <section className="tour-section" id="passeio">
        <div className="section-heading">
          <p className="eyebrow">Produto piloto</p>
          <h2>Passeio Praia do Espelho, Bahia</h2>
          <p>
            Roteiro para turistas em Porto Seguro, Trancoso e Costa do Descobrimento: cliente
            {" -> "} Antonio {" -> "} reserva {" -> "} passeio {" -> "} Van 15 {" -> "} Anderson.
          </p>
        </div>
        <div className="tour-grid">
          <article className="tour-card">
            <div className="tour-image" />
            <div>
              <h3>Praia do Espelho</h3>
              <p>
                Experiencia com rota Maion, Tunait e Recanto, pronta para reserva por WhatsApp e
                ideal para turistas procurando passeio de praia na Bahia.
              </p>
            </div>
          </article>
          <article className="rule-card">
            <h3>Regra comercial</h3>
            <p>
              A saida da Van 15 fecha com minimo de {MIN_PAID_PASSENGERS} passageiros pagantes e
              capacidade maxima de {VAN_CAPACITY} lugares. O preco final continua por pessoa
              pagante: adultos e criancas a partir de 6 anos pagam {currency.format(PRICE_PER_PERSON)}.
              Criancas abaixo de 6 anos nao pagam, mas ocupam lugar na van. O sinal de 50% confirma
              a reserva.
            </p>
            <div className="check-list">
              <span>
                <CheckCircle2 size={17} /> {currency.format(PRICE_PER_PERSON)} por pagante
              </span>
              <span>
                <CheckCircle2 size={17} /> Saida com minimo de {MIN_PAID_PASSENGERS} pagantes
              </span>
              <span>
                <CheckCircle2 size={17} /> Abaixo de 6 anos gratis
              </span>
              <span>
                <CheckCircle2 size={17} /> 50% de sinal
              </span>
              <span>
                <CheckCircle2 size={17} /> Venda de grupos ate {VAN_CAPACITY} passageiros
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="content-grid" id="reserva">
        <form className="panel reservation-form">
          <div className="panel-heading">
            <div>
              <h2>Nova reserva</h2>
              <p>Calculo automatico do total, sinal e saldo.</p>
            </div>
            <CalendarDays size={20} aria-hidden="true" />
          </div>

          <label>
            Nome do cliente
            <input value={form.client} onChange={(event) => setForm((current) => ({ ...current, client: event.target.value }))} />
          </label>
          <div className="sale-type-group" aria-label="Tipo de venda">
            {(["Pessoa", "Casal", "Familia"] as Reservation["saleType"][]).map((type) => (
              <button
                className={form.saleType === type ? "sale-type active" : "sale-type"}
                key={type}
                type="button"
                onClick={() => setForm((current) => ({ ...current, saleType: type }))}
              >
                {type}
              </button>
            ))}
          </div>
          <label>
            Data do passeio
            <input type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
          </label>
          <label>
            Hospedagem ou ponto de embarque
            <input value={form.pickup} onChange={(event) => setForm((current) => ({ ...current, pickup: event.target.value }))} />
          </label>
          <div className="number-grid">
            <label>
              Adultos
              <input type="number" min={0} value={form.adults} onChange={(event) => updateNumber("adults", event.target.value)} />
            </label>
            <label>
              Criancas 6+
              <input type="number" min={0} value={form.childrenPaid} onChange={(event) => updateNumber("childrenPaid", event.target.value)} />
            </label>
            <label>
              Criancas &lt;6
              <input type="number" min={0} value={form.childrenFree} onChange={(event) => updateNumber("childrenFree", event.target.value)} />
            </label>
          </div>
          {draftExceedsCapacity && (
            <p className="capacity-alert">Essa reserva passa dos {VAN_CAPACITY} lugares da Van 15.</p>
          )}
          {draftBelowMinimum && (
            <p className="capacity-alert">A saida precisa de pelo menos {MIN_PAID_PASSENGERS} passageiros pagantes.</p>
          )}
          <button
            className="primary-button full"
            type="button"
            onClick={addReservation}
            disabled={draftBelowMinimum || draftExceedsCapacity}
          >
            <Plus size={18} aria-hidden="true" />
            Salvar reserva
          </button>
        </form>

        <aside className="panel summary-panel">
          <div className="panel-heading">
            <div>
              <h2>Resumo</h2>
              <p>Proposta pronta para enviar.</p>
            </div>
            <Send size={20} aria-hidden="true" />
          </div>
          <div className="summary-grid">
            <div>
              <span>Tipo</span>
              <strong>{draft.saleType}</strong>
            </div>
            <div>
              <span>Pagantes</span>
              <strong>{paidPassengers(draft)}</strong>
              <small>minimo {MIN_PAID_PASSENGERS}</small>
            </div>
            <div>
              <span>Total</span>
              <strong>{currency.format(totalValue(draft))}</strong>
            </div>
            <div>
              <span>Sinal</span>
              <strong>{currency.format(depositValue(draft))}</strong>
            </div>
            <div>
              <span>Saldo</span>
              <strong>{currency.format(totalValue(draft) - depositValue(draft))}</strong>
            </div>
            <div>
              <span>Van 15</span>
              <strong>
                {totalPassengers(draft)}/{VAN_CAPACITY}
              </strong>
            </div>
          </div>
          <a className="secondary-button full" href={`${seller.link}?text=${encodeURIComponent(proposal)}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Enviar pelo WhatsApp
          </a>
        </aside>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h2>Reservas recentes</h2>
              <p>Lista operacional ligada ao vendedor e ao transporte.</p>
            </div>
            <UsersRound size={20} aria-hidden="true" />
          </div>
          <div className="reservation-list">
            {reservations.map((reservation) => (
              <article className="reservation-row" key={reservation.id}>
                <div>
                  <strong>{reservation.client}</strong>
                  <span>
                    {reservation.saleType} - {formatDate(reservation.date)} - {reservation.pickup}
                  </span>
                </div>
                <div>
                  <strong>{totalPassengers(reservation)} passageiros</strong>
                  <span>
                    {currency.format(totalValue(reservation))} - sinal {currency.format(depositValue(reservation))}
                  </span>
                </div>
                <small className={reservation.status === "Confirmada" ? "status-confirmed" : "status-waiting"}>
                  {reservation.status}
                </small>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel operation-panel" id="operacao">
          <div className="panel-heading">
            <div>
              <h2>Operacao</h2>
              <p>Primeiro fluxo fixo da agencia.</p>
            </div>
            <ShipWheel size={20} aria-hidden="true" />
          </div>
          <div className="operation-list">
            <div>
              <MessageCircle size={20} aria-hidden="true" />
              <span>Vendedor</span>
              <strong>{seller.name}</strong>
              <a href={seller.link} target="_blank" rel="noreferrer">
                {seller.whatsapp}
              </a>
            </div>
            <div>
              <ShipWheel size={20} aria-hidden="true" />
              <span>Van 15</span>
              <strong>
                {vehicle.model} - {vehicle.plate} - {VAN_CAPACITY} lugares
              </strong>
              <a href={vehicle.link} target="_blank" rel="noreferrer">
                {vehicle.driver} - {vehicle.whatsapp}
              </a>
            </div>
            <div>
              <Route size={20} aria-hidden="true" />
              <span>Rota</span>
              <strong>{route}</strong>
              <small>Praia do Espelho</small>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
