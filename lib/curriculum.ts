export type Gender = "f" | "m";
export type Spoken = string | { f: string; m: string };
export type Tone = "fit" | "cold" | "near";
export type Mode = "overhear" | "answer" | "notice";
export type TownId = "lecce" | "turin";

export type Choice = {
  text: Spoken;
  tone: Tone;
  feedback: string;
};

export type Stop = {
  id: string;
  short: string;
  place: string;
  who: string;
  mode: Mode;
  scene: string;
  heard?: Spoken;
  heardFrom?: string;
  gloss?: string;
  teach: string;
  prompt: string;
  choices: Choice[];
};

export type Stroll = {
  slug: string;
  number: number;
  town: TownId;
  title: string;
  time: string;
  place: string;
  skill: string;
  promise: string;
  stops: Stop[];
};

export const toneLabel: Record<Tone, string> = {
  fit: "La distanza giusta",
  cold: "Corretta, e fredda",
  near: "Troppo vicina",
};

export const moves: Record<
  Mode,
  { it: string; en: string; text: string }
> = {
  overhear: {
    it: "Ascolta",
    en: "Overhear",
    text: "Qualcuno parla. Decidi cosa voleva dire, anche quello che ha lasciato fuori.",
  },
  answer: {
    it: "Rispondi",
    en: "Answer",
    text: "Devi dire qualcosa. La frase del libro è spesso lì, ed è spesso quella fredda.",
  },
  notice: {
    it: "Leggi",
    en: "Notice",
    text: "Una vetrina, una porta di chiesa, una bacheca. Anche l'italiano scritto ha dei registri.",
  },
};

export const towns: Record<
  TownId,
  { id: TownId; name: string; region: string; kicker: string; blurb: string }
> = {
  lecce: {
    id: "lecce",
    name: "Lecce",
    region: "Salento",
    kicker: "Una sera, sei passeggiate",
    blurb:
      "Sei di Roma. Marta, cresciuta qui, ha detto al cugino di aspettarti. È una sera sola, e non si salta dal pullman alla cena. Si comincia in Piazza Sant'Oronzo e si finisce quando ti accompagnano giù in strada. Il calore è l'abitudine di quella sera: il tempo, il cibo, e il ciao dato presto. Stagli vicino, senza correre più di chi te l'ha offerto.",
  },
  turin: {
    id: "turin",
    name: "Torino",
    region: "Piemonte",
    kicker: "Tre sere, sotto i portici",
    blurb:
      "La prima sera è l'arrivo: via Po sotto la pioggia, un aperitivo con Marco, e la chiave che ti ha lasciato Giulia. Un altro giorno, una scrivania vicino a Piazza San Carlo dice ancora lei. Una sera dopo arriva sua madre da Lecce, e tornate a Porta Nuova. Il tu di Marco è suo, non della città. La cortesia, spesso, è una frase più corta.",
  },
};

export const threshold = {
  kicker: "Il treno della notte, verso nord",
  text: "Da qui la sera comincia prima e le frasi si accorciano. Il calore c'è ancora. Lo offre una persona. La strada no.",
};

export const contrasts: { label: string; lecce: string; turin: string }[] = [
  {
    label: "Il saluto",
    lecce:
      "Più lungo, più presto, più caldo. Il ciao è per chi è dentro la sera, non per l'autista a fine turno.",
    turin:
      "Più corto, e il corto è quello educato. Buonasera può essere tutta la conversazione.",
  },
  {
    label: "Il tu",
    lecce:
      "Spesso arriva la stessa sera, a volte con un motivo: dammi del tu, se no sembriamo in comune.",
    turin:
      "Si tiene finché qualcuno non lo offre. Il tu di Marco non è il tu dell'ufficio. L'ascensore non vota.",
  },
  {
    label: "Il cibo",
    lecce:
      "Un no secco può rifiutare la persona. Si assaggia prima. Il no morbido arriva con un elogio, e una battuta piccola, così l'offerta resta affetto.",
    turin:
      "All'aperitivo il cibo appartiene al bicchiere. Un piatto colmo porta una tavola di Lecce nel rito sbagliato.",
  },
  {
    label: "La frase fredda",
    lecce:
      "Il lei del municipio, dopo che ti hanno chiesto di avvicinarti. Un certificato di lingua, dove doveva esserci una presa in giro.",
    turin:
      "La frase di entusiasmo che nessuno ha chiesto. Una tesi, dove un guanto restituito voleva solo grazie.",
  },
  {
    label: "L'uscita",
    lecce:
      "Ti accompagnano giù. Li lasci fare. In strada il cugino torna al tu, e l'ultima frase è corta perché la passeggiata è stata lunga.",
    turin:
      "Ti lasciano andare dopo buona serata. Restare per sembrare più caldo vuol dire che non hai sentito la fine.",
  },
];

const lecce: Stroll[] = [
  {
    slug: "arrivo-in-piazza",
    number: 1,
    town: "lecce",
    title: "Arrivo in piazza",
    time: "19:05",
    place: "Il pullman, in Piazza Sant'Oronzo",
    skill: "Tre distanze di saluto, prima di dire qualcosa di intelligente.",
    promise:
      "La prima sera è solo arrivi. Autista, sconosciuta, bambino, banco. Ognuno è una frase di lunghezza diversa.",
    stops: [
      {
        id: "arrivo-1",
        short: "l'autista",
        place: "L'ultimo gradino del pullman",
        who: "L'autista, a fine turno",
        mode: "answer",
        scene:
          "La pietra è ancora calda e la piazza è già piena. Ha una mano sulla porta. Il giro è finito. Non sta cominciando la tua sera.",
        heard: "Attenzione al gradino.",
        heardFrom: "L'autista",
        gloss: "Attento al gradino. Un fatto, non un benvenuto.",
        teach:
          "Il ciao è per chi è dentro la tua sera. A lui basta un grazie corto e buonasera. Un discorso lo ringrazia di un rapporto che non c'è.",
        prompt: "Cosa dici, scendendo?",
        choices: [
          {
            text: "Grazie, buonasera.",
            tone: "fit",
            feedback:
              "Corto, e finito. Può chiudere la porta. Sei stato educato senza chiedergli di ospitarti.",
          },
          {
            text: "Ciao, grazie mille, sei gentilissimo!",
            tone: "near",
            feedback:
              "Ciao e un complimento lo tirano nella tua sera. È in divisa, a fine corsa. Un calore così, per lui, è lavoro.",
          },
          {
            text: "La ringrazio per il servizio di trasporto.",
            tone: "cold",
            feedback:
              "Grammaticale, e sembra un modulo. Al gradino bastava grazie. Buonasera lo rende umano senza farne un discorso.",
          },
        ],
      },
      {
        id: "arrivo-2",
        short: "la signora col cane",
        place: "Il bordo della piazza",
        who: "Una signora più grande di te, con un cane",
        mode: "answer",
        scene:
          "Sei sceso una fermata prima. Lei non ha fretta, e non è un'amica. Il cane ha già deciso. Lei no.",
        teach:
          "A una sconosciuta più grande di te si dice mi scusi, e una domanda corta. Il ciao, o il nome del posto abbaiato, spende una vicinanza che lei non ha offerto.",
        prompt: "Come chiedi la piazza?",
        choices: [
          {
            text: "Scusa, Sant'Oronzo?",
            tone: "near",
            feedback:
              "Il tu, e mezza frase. Può andare con uno della tua età che sta già parlando con te. Lei non è né l'uno né l'altro.",
          },
          {
            text: "Mi scusi, per Piazza Sant'Oronzo?",
            tone: "fit",
            feedback:
              "Lei dice: «Sempre dritto, cinque minuti. Buona serata.» Tu rispondi «Grazie, gentilissima. Buona serata.» Lo scambio è chiuso. Non aggiungi da dove vieni, come mancia.",
          },
          {
            text: "Buonasera, sarebbe possibile ottenere un'indicazione per la piazza principale?",
            tone: "cold",
            feedback:
              "Corretta, e le chiede di restare in piedi per una piccola cerimonia. Mi scusi e il nome del posto sono la stessa educazione, quella viva.",
          },
        ],
      },
      {
        id: "arrivo-3",
        short: "il bambino",
        place: "La pietra aperta della piazza",
        who: "Un bambino di circa dieci anni",
        mode: "answer",
        scene:
          "Una palla si ferma contro la scarpa. Sta già correndo verso di te, sicuro che gliela ridai, perché in questa piazza si fa così.",
        heard: "Me la tiri?",
        heardFrom: "Il bambino",
        gloss: "Me la lanci? Il tu, da un bambino, è la distanza giusta.",
        teach:
          "Il lei a un bambino non è più educato. Ignora la sua età. Tieni è tutta la risposta. Non lo tieni lì per fare conversazione.",
        prompt: "Cosa dici, mentre gliela lanci?",
        choices: [
          {
            text: "Tenga.",
            tone: "cold",
            feedback:
              "Tenga è quello che un signore a Torino dice quando ti rende un guanto. A un bambino di dieci anni si dice tieni. L'educazione che non guarda chi ha davanti è fredda per conto suo.",
          },
          {
            text: "Un attimo, prima dimmi come ti chiami.",
            tone: "near",
            feedback:
              "Ha chiesto la palla, non uno scambio. Tenere un bambino fermo per esercitarti in italiano è la versione troppo vicina di un momento gentile.",
          },
          {
            text: "Tieni.",
            tone: "fit",
            feedback:
              "Il tu, restituito a un bambino, e nient'altro. Si sta già girando verso il gioco. Quello è il saluto.",
          },
        ],
      },
      {
        id: "arrivo-4",
        short: "il banco",
        place: "Un piccolo albergo, appena fuori dalla piazza",
        who: "L'uomo al banco, sulla sessantina",
        mode: "answer",
        scene:
          "L'ingresso è una lampada e un ventilatore. Marta ha prenotato a nome Elia, il suo cognome. Lui non ha ancora deciso se gli stai simpatico. Per la chiave non serve.",
        teach:
          "Al banco si dice buonasera, il nome della prenotazione, e niente ciao. Sei un ospite con una camera, non un nipote che entra in cucina.",
        prompt: "Come apri?",
        choices: [
          {
            text: "Buonasera. Ho una prenotazione a nome Elia.",
            tone: "fit",
            feedback:
              "Può trovare la prenotazione. Se più tardi passa al tu, quella porta la apre lui. Non cominci già dall'altra parte.",
          },
          {
            text: {
              f: "Ciao! C'è una camera? Sono quella di Marta.",
              m: "Ciao! C'è una camera? Sono quello di Marta.",
            },
            tone: "near",
            feedback:
              "Ciao, e il «sono di Marta», chiedono a uno sconosciuto di trattarti come famiglia prima ancora di trovare la prenotazione. Il cognome era già il calore che Marta ti aveva preparato.",
          },
          {
            text: "Salve. Vorrei effettuare il check-in della prenotazione.",
            tone: "cold",
            feedback:
              "Check-in è l'italiano dell'aeroporto. Un ingresso con una lampada, a Lecce, va a buonasera e cognome. Le stesse informazioni, senza il banco in mezzo.",
          },
        ],
      },
    ],
  },
  {
    slug: "il-primo-caffe",
    number: 2,
    town: "lecce",
    title: "Il primo caffè",
    time: "19:30",
    place: "Un bar, appena fuori da Piazza Sant'Oronzo",
    skill: "Il banco è un saluto, non un tavolo che ospiti tu.",
    promise:
      "Il primo caffè si beve in piedi. L'ordine lungo e educato ti segna come uno che sta fuori dalla stanza.",
    stops: [
      {
        id: "caffe-1",
        short: "banco o tavolo",
        place: "La porta del bar",
        who: "La stanza, e un uomo già al banco",
        mode: "notice",
        scene:
          "Due tavolini alla finestra, tutti e due vuoti. La vita del posto è una fila di gomiti sullo zinco. Stavi per sederti, perché sedersi sembra rispettoso.",
        heard: "Un caffè.",
        heardFrom: "Un uomo al banco",
        gloss: "Un caffè. Niente saluto, niente condizionale, niente discorso. Buonasera lo aggiunge se incrocia gli occhi di qualcuno. L'ordine, da solo, è così corto.",
        teach:
          "Il primo caffè è un saluto detto in piedi. Il tavolo è per chi resta. Sedersi per educazione legge male la stanza.",
        prompt: "Cosa ti sta dicendo la stanza?",
        choices: [
          {
            text: "Ti siedi. Prendere un tavolo mostra che onori il posto, e ordini come si deve quando sei sistemato.",
            tone: "near",
            feedback:
              "Il tavolo è un onore che stai pagando alla tua idea di caffè. L'onore della stanza è sapere dove si sta in piedi per un euro e venti.",
          },
          {
            text: "Te ne vai. Un posto senza menu non è fatto per chi vuole sedersi e imparare.",
            tone: "cold",
            feedback:
              "Hai appena rifiutato l'aula vera. La lezione è il banco. I menu arrivano dopo, nelle stanze che vogliono essere un'altra cosa.",
          },
          {
            text: "Resti al banco. Questo caffè è un saluto, non una seduta. Il tavolo è per quando resti.",
            tone: "fit",
            feedback:
              "Ti avvicini. Quando tocca a te, tutto l'ordine è «Un caffè, per favore.» Vorrei è italiano corretto e, per questa tazza, un po' cerimoniale.",
          },
        ],
      },
      {
        id: "caffe-2",
        short: "di dove sei",
        place: "Il banco",
        who: "Il barista, più o meno della tua età",
        mode: "answer",
        scene:
          "Ha sentito l'accento e l'esitazione, e non è scortese. La macchina è forte. Chiede tra una tazza e l'altra, non come un colloquio.",
        heard: "Tu di dove sei?",
        heardFrom: "Il barista",
        gloss: "Di dove sei? Ha usato il tu. Puoi restituirlo. Non ti ha chiesto il progetto.",
        teach:
          "Il tu può tornare a lui. La biografia no. Una città, il fatto di una prima sera, e una domanda restituita: è la misura di questa pausa.",
        prompt: "Cosa gli dai?",
        choices: [
          {
            text: "Di Roma. Prima sera. Tu sei di qui?",
            tone: "fit",
            feedback:
              "Gli dai un posto, un tempo, e il turno. Probabilmente dirà che è di qui e poi chiamerà il caffè dopo. Avrete avuto una conversazione.",
          },
          {
            text: "Provengo dal Lazio e mi trovo a Lecce per un soggiorno linguistico.",
            tone: "cold",
            feedback:
              "Hai risposto a un bar con una lettera di presentazione. Lui ha usato il tu e una domanda di quattro parole. Il freddo è la distanza tra quelle due misure.",
          },
          {
            text: "Di Roma. Dai, raccontami Lecce, ho tutta la sera.",
            tone: "near",
            feedback:
              "Gli hai dato tutta la tua sera e gli hai preso la sua. Sta lavorando. La curiosità può aspettare che sia fermo, se mai lo sarà.",
          },
        ],
      },
      {
        id: "caffe-3",
        short: "la lavagna",
        place: "La lavagna sopra la macchina",
        who: "La lavagna, e poi tu",
        mode: "answer",
        scene:
          "Sotto i piatti del giorno, di fretta: pasticciotto crema, pasticciotto nutella, caffè in ghiaccio con latte di mandorla. La crema la conosci. Per ordinare non ti serve una lezione.",
        teach:
          "Indicare è fluente. Una domanda vera è fluente. Chiedere la storia di ogni dolce tipico trasforma una voglia in una conferenza che stai facendo a lui.",
        prompt: "Come ordini?",
        choices: [
          {
            text: "Il solito.",
            tone: "near",
            feedback:
              "Il solito è intimità: un'abitudine, guadagnata tornando. La seconda sera finge una storia col bar che non hai.",
          },
          {
            text: "Questo, con la crema. Grazie.",
            tone: "fit",
            feedback:
              "Hai indicato. Se vuoi una domanda vera, è «Il pasticciotto è quello con la crema?» Dirà di sì, o nutella, e tu scegli. Tutto il dizionario è quello.",
          },
          {
            text: "Mi può spiegare la storia e gli ingredienti di ogni dolce?",
            tone: "cold",
            feedback:
              "Può farlo, e alla fine gli piacerà meno la sua città. La lavagna è un'offerta, non un programma. Indica, poi chiedi l'unica cosa che ti serve.",
          },
        ],
      },
      {
        id: "caffe-4",
        short: "il conto",
        place: "Lo stesso banco, tazza vuota",
        who: "Il barista",
        mode: "answer",
        scene:
          "Monete, un piattino, il prossimo già mezzo nel tuo posto. Non ti sta mandando via. Ti sta mettendo nel futuro del paese.",
        heard: "Un euro e venti. A dopo.",
        heardFrom: "Il barista",
        gloss: "Un euro e venti. A dopo. In un paese così, a dopo è un'ipotesi ragionevole, e amichevole.",
        teach:
          "Restituisci l'a dopo. Non lodare il servizio, e non promuoverlo a confidente. Il calore era già nell'idea che tornerai.",
        prompt: "Con cosa te ne vai?",
        choices: [
          {
            text: "A dopo, bellissimo, sei un amore.",
            tone: "near",
            feedback:
              "Ti ha augurato un dopo. Tu hai risposto con un vezzeggiativo. La simpatia era già della misura giusta, e tu l'hai allargata fino a farla strana.",
          },
          {
            text: "Arrivederci e grazie per l'ottimo servizio.",
            tone: "cold",
            feedback:
              "Ottimo servizio è una recensione, non un arrivederci. A dopo era una mano tesa. Arrivederci gliela rimette in divisa.",
          },
          {
            text: "A dopo. Grazie.",
            tone: "fit",
            feedback:
              "Hai accettato l'ipotesi. Domani, se torni, ti sei guadagnato un po' di più del solito. Non stasera.",
          },
        ],
      },
    ],
  },
  {
    slug: "la-vetrina",
    number: 3,
    town: "lecce",
    title: "La vetrina",
    time: "19:55",
    place: "Via Vittorio Emanuele II",
    skill: "Leggere quello che è scritto per i vicini, e rifiutare un vestito senza rifiutare un'amica.",
    promise:
      "I negozi stanno chiudendo a metà. I biglietti in vetrina non sono per i turisti, e i giudizi davanti sono lasciati a metà apposta.",
    stops: [
      {
        id: "vetrina-1",
        short: "il biglietto",
        place: "Una porta di negozio, chiusa",
        who: "Un cartoncino scritto a mano",
        mode: "notice",
        scene:
          "Le luci sono spente e un cartoncino è attaccato al vetro, scritto con una penna che stava finendo. Chi passa capisce subito. Tu stai decidendo se irritarti.",
        heard: "Torno subito. Sono al bar.",
        heardFrom: "Il cartoncino",
        gloss: "Torno subito. Sono al bar. Non è un orario. È il biglietto di una vicina.",
        teach:
          "È chiuso per la durata di un caffè. Non è un contratto con cui puoi ferirti, e non è un invito ad andare a cercare chi l'ha scritto.",
        prompt: "Che scrittura è questa?",
        choices: [
          {
            text: "Un biglietto per i vicini. Il negozio è in pausa, non ti sta offendendo. Torni, o no. Il bar non è un appuntamento che ha fissato con te.",
            tone: "fit",
            feedback:
              "Hai letto la fiducia: ha detto alla via dov'è. È calore sulla carta. Non è comunque una conversazione aperta con uno sconosciuto.",
          },
          {
            text: "Poco professionale. La reazione giusta è il fastidio, e la lezione è che certi negozi non rispettano i clienti.",
            tone: "cold",
            feedback:
              "Hai portato in un negozio di una persona sola la regola di una catena. In stazione quel cartoncino sarebbe freddo. In questa via è il modo in cui funziona la via.",
          },
          {
            text: "Un invito. Dovresti trovarla al bar e continuare la conversazione che ha aperto il cartoncino.",
            tone: "near",
            feedback:
              "Il cartoncino ha aperto una conversazione con chi sa già quale bar. Entrarci da sconosciuto trasforma la sua commissione nella tua scena.",
          },
        ],
      },
      {
        id: "vetrina-2",
        short: "il vestito",
        place: "La vetrina dopo",
        who: "Due donne, una con un vestito di cui non è sicura",
        mode: "overhear",
        scene:
          "Non bisbigliano. E non finiscono le frasi. La senti perché hai smesso di fingere di studiare il manichino.",
        heard: "Mah. Il colore, non lo so.",
        heardFrom: "La donna col vestito, dopo che l'amica ha detto «Secondo me ti sta bene.»",
        gloss: "Mah. Il colore, non lo so. Il mah, più un pensiero lasciato a metà, è il giudizio.",
        teach:
          "Sta rifiutando il vestito senza rifiutare l'amica. Il no sta nel mah e nella frase che non chiude. Un «è brutto» netto sarebbe un'amicizia diversa, e più fredda.",
        prompt: "Cosa sta dicendo?",
        choices: [
          {
            text: "Vuole il vestito e sta arrivando al prezzo.",
            tone: "cold",
            feedback:
              "Hai sentito le parole e hai perso la particella. Il mah è il no. Il colore lasciato a metà è il modo in cui tiene l'amica e lascia il vestito.",
          },
          {
            text: "Sta rifiutando il vestito, e lascia intera l'amica. Il no sta nel mah e in quello che non finisce.",
            tone: "fit",
            feedback:
              "Se più tardi te lo chiede una negoziante, la stessa forma funziona: «Mah, non sono convinta. Il colore, forse.» Non serve un verdetto per essere chiari.",
          },
          {
            text: "L'amica l'ha offesa, e mah è l'inizio di una lite.",
            tone: "near",
            feedback:
              "«Ti sta bene» era un regalo. Il mah lo restituisce senza romperlo. Sentire una lite qui vuol dire che riconosci il disaccordo solo quando è forte.",
          },
        ],
      },
      {
        id: "vetrina-3",
        short: "le pittule",
        place: "La vetrina di una friggitoria, più avanti",
        who: "Una donna accanto a te, e un cartello",
        mode: "answer",
        scene:
          "Il cartello dice solo «Pittule calde solo stasera.» La parola non la sai. Lei ti guarda non saperla, e decide di fare il dizionario. È già un po' contenta.",
        heard: "Sono frittelle. Se non le hai mai prese, prendile.",
        heardFrom: "La donna accanto a te",
        gloss: "Sono frittelle. Se non le hai mai prese, prendile. Le pittule sono la versione del Salento, vendute calde.",
        teach:
          "Non ti stanno esaminando sulla parola. Ti stanno esaminando sul lasciarla fare il dizionario, senza trasformare il consiglio in un debito o in un seminario.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Potrebbe fornirmi una definizione più precisa?",
            tone: "cold",
            feedback:
              "L'aveva già definita, nell'unico modo che serviva al momento: cos'è, e cosa fai. Una definizione più fine la rimanda a un lavoro che aveva già chiuso.",
          },
          {
            text: "Allora sì. Grazie.",
            tone: "fit",
            feedback:
              "Hai preso il consiglio e la traduzione. Se vuoi la parola in bocca, dici pittule quando ordini. Non le fai ripetere la lezione.",
          },
          {
            text: "Solo se me le offri tu.",
            tone: "near",
            feedback:
              "Ti ha offerto una conoscenza, non un giro. Trasformare un consiglio in un debito è il modo in cui una via gentile diventa diffidente con chi arriva.",
          },
        ],
      },
      {
        id: "vetrina-4",
        short: "è tornata",
        place: "Il negozio del cartoncino, dieci minuti dopo",
        who: "La negoziante",
        mode: "answer",
        scene:
          "Sei tornato. Sta aprendo la porta con l'energia di chi sa benissimo che figura fa, e non reciterà un senso di colpa da grande magazzino.",
        heard: "Eh, scusate, ero di là.",
        heardFrom: "La negoziante",
        gloss: "Scusa, ero di là. Scusate, il voi, detto a un cliente solo: un ammorbidimento, non un errore sul numero. E non è un'offerta di tu.",
        teach:
          "Ma figurati la libera. Poi fai la cosa per cui sei venuto. Un reclamo tratta un caffè come un contratto rotto. Un tu improvviso tratta quell'ammorbidimento come intimità.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Ho aspettato. Non è serio.",
            tone: "cold",
            feedback:
              "La serietà, in questo registro, è una stazione. Ha detto alla via dov'era. Sei tornato. Il rapporto è già aggiustato, se lo lasci essere.",
          },
          {
            text: "Tranquilla, tu che fai di bello stasera?",
            tone: "near",
            feedback:
              "Il tu, più un diritto sulla sua sera. Il suo scusate era un ammorbidimento, non una chiave. Sei entrato in una vita che sul cartoncino non c'era.",
          },
          {
            text: "Ma figurati. Posso vedere quella borsa?",
            tone: "fit",
            feedback:
              "Hai cancellato il debito e hai nominato l'oggetto. Può tornare a essere un negozio. Quello è l'esito amichevole.",
          },
        ],
      },
    ],
  },
  {
    slug: "la-porta-della-chiesa",
    number: 4,
    town: "lecce",
    title: "La porta della chiesa",
    time: "20:15",
    place: "Basilica di Santa Croce",
    skill: "Registro solenne. Un mi dispiace corto. Lasciare che l'aiuto resti piccolo.",
    promise:
      "Due fogli sulla stessa porta: una morte e un gatto perso. La sera ti insegna che non chiedono lo stesso comportamento, anche se li sai leggere tutti e due.",
    stops: [
      {
        id: "porta-1",
        short: "l'avviso",
        place: "La porta della chiesa",
        who: "Un avviso funebre stampato",
        mode: "notice",
        scene:
          "Il foglio è fresco, la fotografia è formale, la formula è quella che forse hai visto sul libro sotto «annunci funebri.» Chi passa rallenta e non si ferma. Nessuno lo legge ad alta voce.",
        heard:
          "È mancato all'affetto dei suoi cari il signor Antonio Greco, di anni 84. I funerali si terranno domani alle ore 16 nella Basilica di Santa Croce.",
        heardFrom: "L'avviso",
        gloss: "La formula di sempre: è mancato all'affetto dei suoi, a 84 anni. Il funerale è domani alle quattro, qui.",
        teach:
          "Puoi capirlo e non usarlo. Niente fotografia per la chat, niente chiedere a uno sconosciuto di trasformare una morte nella tua lezione.",
        prompt: "Cosa fai con un testo così?",
        choices: [
          {
            text: "Lo leggi in silenzio, e lo lasci sulla porta. Non è una frase di esempio, e non è il tuo ingresso.",
            tone: "fit",
            feedback:
              "Capire la formula è l'abilità. Estrarla è il fallimento. Se più tardi qualcuno chiede cosa stavi guardando: «Un avviso. Non lo conoscevo.» Poi ti fermi.",
          },
          {
            text: "Lo fotografi. Un italiano formale così pulito è proprio quello che manca nei tuoi appunti.",
            tone: "cold",
            feedback:
              "Hai trasformato l'avviso di una famiglia in materiale didattico. La grammatica resta nel libro, stasera. Il foglio sta facendo un altro lavoro.",
          },
          {
            text: "Entri e fai le condoglianze a chi c'è, così la famiglia si sente accompagnata.",
            tone: "near",
            feedback:
              "Non conosci il morto, e chi è dentro non ha chiesto compagnia a uno sconosciuto. Un'intimità inventata sulla porta di una chiesa non è gentilezza. È una scena.",
          },
        ],
      },
      {
        id: "porta-2",
        short: "il prete",
        place: "I gradini",
        who: "Il prete, di passaggio",
        mode: "answer",
        scene:
          "Fa un cenno, come si fa quando in quest'ora hai già salutato tutta la strada. Non rallenta. La basilica alle sue spalle è famosa. Lo sa.",
        teach:
          "A un prete che non si ferma basta buonasera, e nient'altro. Una domanda sull'edificio lo trasforma in una guida che non si era offerto di essere.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Ciao padre, bellissima questa chiesa. Da quando è qui?",
            tone: "near",
            feedback:
              "Ciao, un complimento, e una domanda biografica, tutto per un uomo a metà passo. Gli hai chiesto di ospitare il monumento e se stesso.",
          },
          {
            text: "Buonasera.",
            tone: "fit",
            feedback:
              "Risponde «Buonasera» e continua. Lo scambio è il cenno, detto ad alta voce. Lasci che la chiesa sia una chiesa, non un esercizio.",
          },
          {
            text: "Salve, potrebbe illustrarmi la storia della basilica?",
            tone: "cold",
            feedback:
              "Una domanda giusta per un banco che esiste per rispondere. Lui stava camminando. Il condizionale di cortesia non crea una visita che nessuno ha offerto.",
          },
        ],
      },
      {
        id: "porta-3",
        short: "il gatto",
        place: "La stessa porta, più in basso",
        who: "Un biglietto a mano",
        mode: "notice",
        scene:
          "Sotto il foglio del funerale, attaccato un po' storto: un'altra penna, un'altra posta. Si sente che questo può essere caldo, e che leggerli con la stessa voce sarebbe un errore.",
        heard:
          "È scomparsa Nina, gatta tigrata, zona Sant'Oronzo. Chi la vede lascia detto al bar di Mimmo.",
        heardFrom: "Il biglietto",
        gloss: "Nina, gatta tigrata, è scomparsa intorno a Sant'Oronzo. Se la vedi, lascia detto al bar di Mimmo.",
        teach:
          "Stessa porta, distanza diversa. Del gatto si può parlare con calore. Del funerale no. Se avessi visto Nina, la fermata dopo è il bar, non il prete.",
        prompt: "Cosa cambia tra i due fogli?",
        choices: [
          {
            text: "Niente. Sono tutte e due cose private, quindi il gesto gentile è ignorare anche il gatto.",
            tone: "cold",
            feedback:
              "Hai schiacciato due registri in una regola sola. Il biglietto del gatto chiede aiuto alla via. L'avviso funebre non ti sta chiedendo niente.",
          },
          {
            text: "Il gatto può essere caldo e pratico. Il funerale resta quieto. Stessa porta, comportamento diverso. Nina, se l'hai vista, va al bar.",
            tone: "fit",
            feedback:
              "Hai lasciato che il foglio ti dicesse la distanza. È tutta l'abilità di Leggi: l'italiano non ha una temperatura sola.",
          },
          {
            text: "Sono tutte e due colore locale. Leggerle ad alta voce è un buon esercizio, se resti rispettoso.",
            tone: "near",
            feedback:
              "Estrarre con rispetto è ancora estrarre. Uno di questi fogli chiedeva un testimone. L'altro chiedeva di essere lasciato a voce bassa. Ad alta voce non servi né l'uno né l'altro.",
          },
        ],
      },
      {
        id: "porta-4",
        short: "mi dispiace",
        place: "Accanto all'avviso",
        who: "Una donna che ti ha visto esitare sulla formula",
        mode: "answer",
        scene:
          "Parla più piano della piazza. Non piange. Sta decidendo, in fretta, se sei una persona a cui si può dire una cosa vera e piccola.",
        heard: "È il papà di un'amica mia. Ieri.",
        heardFrom: "La donna",
        gloss: "È il padre di un'amica. Ieri. Un'amica mia: il possessivo dopo il nome, un ritmo del sud. Con te resta sul lei, anche quando continua.",
        teach:
          "Mi dispiace, e poi spazio. Un'offerta lunga di sostegno, da uno sconosciuto, è un discorso sulla tua gentilezza. Non ti ha consegnato la famiglia.",
        prompt: "Cosa rispondi?",
        choices: [
          {
            text: "Mi dispiace tanto. Se ha bisogno di qualsiasi cosa, io ci sono.",
            tone: "cold",
            feedback:
              "La grammatica dell'empatia, a una lunghezza che la obbliga a gestire te. Non lo conoscevi. «Io ci sono» ti arruola in un ruolo che non ti ha offerto.",
          },
          {
            text: "Mi dispiace.",
            tone: "fit",
            feedback:
              "Poi ti fermi. Proprio per questo può aggiungere, ancora sul lei: «Lei non è di qui. Domenica, la messa delle sette è cantata, se vuole.» La risposta giusta è «Grazie. Forse domenica.» Non passi al tu. La sua gentilezza non era quell'invito.",
          },
          {
            text: "Oh no. Ma che è successo? Era malato? Posso venire al funerale?",
            tone: "near",
            feedback:
              "Tre domande e un autoinvito. Hai trasformato una frase sola in un'intervista e in un posto per te. Il funerale non è una stanza in cui si entra perché si è commossi.",
          },
        ],
      },
    ],
  },
  {
    slug: "il-cugino",
    number: 5,
    town: "lecce",
    title: "Il cugino",
    time: "20:45",
    place: "Una scala, vicino a Porta Napoli",
    skill: "Il registro segue chi è nella scena, non chi sei tu.",
    promise:
      "Il cugino di Marta ti dà del tu sulla porta. Sul pianerottolo compare una vicina e il suo italiano si raddrizza. Devi andare con lui, e tornare quando lei se ne va.",
    stops: [
      {
        id: "cugino-1",
        short: "la porta",
        place: "La sua porta",
        who: "Il cugino di Marta, della tua età",
        mode: "answer",
        scene:
          "Sta già sorridendo come chi sa che esisti. L'appartamento dietro di lui sa di una cena che dava per scontato che restavi. Non fa un saluto formale. Ti avverte di non farlo.",
        heard:
          "Ehi, finalmente. Entra, non fare complimenti. E dammi del tu, eh. Marta ha detto che un po' parli.",
        heardFrom: "Il cugino",
        gloss: "Finalmente. Entra, non fare complimenti, e dammi del tu. Marta ha detto che parli un po'. Non fare complimenti vuol dire: non recitare l'ospite.",
        teach:
          "Ha detto la distanza ad alta voce. Il lei, adesso, non è rispetto. Rifiuta un regalo che ti ha appena messo in mano. Stargli dietro non è la stessa cosa che essere disinvolti.",
        prompt: "Cosa dici sulla soglia?",
        choices: [
          {
            text: "Buonasera. Piacere di conoscerla. La ringrazio dell'invito.",
            tone: "cold",
            feedback:
              "Riderà, senza cattiveria, e si ripeterà: dammi del tu. Hai risposto alla persona che ti aspettavi, non a quella sulla porta.",
          },
          {
            text: {
              f: "Ciao. Un po' sì. Grazie di avermi aspettata.",
              m: "Ciao. Un po' sì. Grazie di avermi aspettato.",
            },
            tone: "fit",
            feedback:
              "Il tu, una verità piccola, un grazie. Niente scuse per esistere, e niente inventario della grammatica. Può farti entrare.",
          },
          {
            text: "Apri, muoio di fame. Marta non mi ha detto niente.",
            tone: "near",
            feedback:
              "Il tu era offerto. Un reclamo e un diritto sul frigo no. Troppo vicino salta il passo in cui arrivi davvero.",
          },
        ],
      },
      {
        id: "cugino-2",
        short: "le scale",
        place: "Mezza rampa più sotto",
        who: "La signora Lina, settant'anni, con una borsa",
        mode: "answer",
        scene:
          "Compare dal piano di sotto e tutta la sua frase cambia temperatura. Lo senti in bocca prima di capirlo. Non è diventato un altro. Nella scena è entrata una persona.",
        heard: {
          f: "Buonasera, signora Lina. Le do una mano? Le presento l'amica di Marta.",
          m: "Buonasera, signora Lina. Le do una mano? Le presento l'amico di Marta.",
        },
        heardFrom: "Il cugino",
        gloss: "Buonasera. La aiuto? Questo è l'ospite di Marta. Con lei sta sul lei, e presenta te dentro la stessa distanza.",
        teach:
          "Il calore della soglia non si trasferisce. A lei toccano buonasera e piacere. Ciao più il suo nome spende il rapporto di lui come se fosse tuo.",
        prompt: "Ti guarda. Cosa dici?",
        choices: [
          {
            text: "Resti un passo indietro e non dici niente. Ci pensa lui.",
            tone: "cold",
            feedback:
              "Ti ha incluso. Il silenzio ti fa bagaglio, e lascia che lei saluti un'assenza. Un buonasera ti mette nella scena, alla sua distanza.",
          },
          {
            text: "Buonasera. Piacere.",
            tone: "fit",
            feedback:
              "Dice «Piacere» e rifiuta l'aiuto: «No, caro, ce la faccio.» Caro è suo per lui, guadagnato in anni. Non è un modello da copiare stasera.",
          },
          {
            text: "Ciao Lina! Finalmente qualcuno, questo portone è un labirinto.",
            tone: "near",
            feedback:
              "Hai preso il tu del cugino e l'hai puntato su di lei, poi ci hai messo un reclamo sul palazzo. Lui dovrà rammendare uno strappo che tu non hai sentito.",
          },
        ],
      },
      {
        id: "cugino-3",
        short: "il pianerottolo",
        place: "Dopo che lei se n'è andata",
        who: "Il cugino, di nuovo tu",
        mode: "answer",
        scene:
          "La porta di lei si chiude due piani sotto. Lui espira, senza cattiveria, e l'italiano si allenta di nuovo, quello della soglia. Ti mette dentro la regola, perché hai sentito il cambio e lui ha visto che l'hai sentito.",
        heard: "È d'oro. Però se le dai del tu, ti sistema lei.",
        heardFrom: "Il cugino",
        gloss: "È un oro. Ma se le dai del tu, ti sistema lei. Le è il lei formale. Lei in fondo è lei, la persona.",
        teach:
          "Puoi far vedere che hai capito senza analizzarlo. Una battuta che tiene il buonasera è la misura giusta. Un commento linguistico trasforma la vicina in un caso.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Allora il buonasera me lo tengo.",
            tone: "fit",
            feedback:
              "Sei entrato nella battuta e hai accettato la regola. Non deve diventare il tuo insegnante. Lo è già stato, per una rampa di scale.",
          },
          {
            text: "Interessante. Hai cambiato registro appena è arrivata una persona più distante.",
            tone: "cold",
            feedback:
              "Vero, e l'hai detto come una nota a piè di pagina sulla sua vita. Ti ha offerto un avvertimento, non un fenomeno. Il freddo è farne un testo.",
          },
          {
            text: {
              f: "Dai, la prossima volta le dico ciao, così vede che sono simpatica.",
              m: "Dai, la prossima volta le dico ciao, così vede che sono simpatico.",
            },
            tone: "near",
            feedback:
              "Hai sentito la regola e ti sei offerto di romperla per simpatia. Simpatica non è l'obiettivo sul suo pianerottolo. Sopravvivere alla correzione non è un aneddoto carino.",
          },
        ],
      },
      {
        id: "cugino-4",
        short: "l'acqua",
        place: "La porta della sua cucina",
        who: "Il cugino",
        mode: "answer",
        scene:
          "Comincia una frase che non prendi. Salentino, veloce, rivolto al frigo. Si accorge di averti perso, si ferma, e fa la cosa gentile senza farne una lezione.",
        heard:
          "Aspetta, in italiano, se no non ci capiamo. Vuoi l'acqua o già un goccio di vino?",
        heardFrom: "Il cugino",
        gloss: "Aspetta, in italiano, se no non ci capiamo. Acqua, o già un goccio di vino? Si è tradotto da solo. Un goccio è un versare piccolo, e affettuoso.",
        teach:
          "Non ti stanno esaminando sul dialetto. La cortesia l'ha già fatta lui, ed era passare all'italiano. La prima frase, se la vuoi ancora, la chiedi dopo, a tavola, non come prezzo di un bicchiere.",
        prompt: "Cosa rispondi?",
        choices: [
          {
            text: "Puoi ripetere la prima parte e tradurla parola per parola?",
            tone: "cold",
            feedback:
              "Hai trasformato un bicchiere di vino in una scheda, sulla soglia, mentre lui stava attento. Dopo, se conta ancora: «Prima, cos'è che hai detto?» Quella è curiosità col tempo giusto.",
          },
          {
            text: "No, solo dialetto tutta la cena, se no non vale.",
            tone: "near",
            feedback:
              "Gli hai chiesto di recitare la sua terra per te. Si era appena spostato perché tu non restassi fuori dalla stanza.",
          },
          {
            text: "Un goccio. Grazie.",
            tone: "fit",
            feedback:
              "Hai risposto alla domanda che ti ha fatto davvero. Il dialetto è ancora in casa. Non deve essere la tua attività.",
          },
        ],
      },
    ],
  },
  {
    slug: "la-cena",
    number: 6,
    town: "lecce",
    title: "La cena che non finisce",
    time: "21:40",
    place: "La tavola del cugino, poi la strada",
    skill: "Il rifiuto, la presa in giro, e un arrivederci che può prendersi tempo.",
    promise:
      "Sua madre ha deciso che mangi. La mossa fredda è un no perfetto, detto troppo presto, o un lei che lei ha già messo in pensione.",
    stops: [
      {
        id: "cena-1",
        short: "il primo piatto",
        place: "La tavola",
        who: "Sua madre",
        mode: "answer",
        scene:
          "Il piatto è già davanti a te. Non ti sta chiedendo se mangi. Ti sta dicendo la distanza che vuole, e ti dà il motivo così non fai il coraggioso formale.",
        heard: "Mangia, su. E dammi del tu, se no sembriamo in comune.",
        heardFrom: "Sua madre",
        gloss: "Mangia. E dammi del tu, se no sembriamo in comune.",
        teach:
          "Ha messo in pensione il lei ad alta voce. Tenerlo non è più rispetto. Il tu di ritorno resta morbido: il grazie, e il cibo, senza una battuta sulle porzioni.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "La ringrazio, signora. Sono a posto così.",
            tone: "cold",
            feedback:
              "Il lei, un titolo, e un no prima di aver assaggiato. Hai rifiutato il piatto e la distanza in un fiato. Sono a posto può essere giusto dopo. Non è giusto al secondo zero, e non sul lei dopo questa frase.",
          },
          {
            text: "Va bene, tu però calma con le porzioni.",
            tone: "near",
            feedback:
              "Il tu era l'invito. Gestire la sua cucina no. Hai suonato come un pari che corregge chi ospita, e quella è un'altra stanza da quella che ha aperto lei.",
          },
          {
            text: "Allora grazie. È buonissimo.",
            tone: "fit",
            feedback:
              "Hai preso il tu e il piatto. Quando offre ancora, il no morbido può arrivare: «Davvero, è ottimo, ma sono a posto. Un altro po' e non mi alzo più.» La battuta fa vedere che hai ricevuto l'offerta come affetto.",
          },
        ],
      },
      {
        id: "cena-2",
        short: "lo zio",
        place: "La stessa tavola",
        who: "Uno zio, già divertito",
        mode: "answer",
        scene:
          "Aspettava un bersaglio innocuo e tu, comodamente, sei della capitale. La tavola è dalla tua parte. Vuole uno scambio, non una resa e non un diploma.",
        heard: "E l'italiano com'è? A Roma vi fanno studiare solo i libri?",
        heardFrom: "Lo zio",
        gloss: "L'italiano com'è? A Roma vi fanno studiare solo i libri?",
        teach:
          "Ha aperto una porta perché tu potessi prendere in giro il divario. Un certificato la sbatte. Incoronare la sua città come «l'Italia vera» trasforma la casa in una cartolina.",
        prompt: "Cosa gli dai?",
        choices: [
          {
            text: "I libri sì. Le cene no.",
            tone: "fit",
            feedback:
              "Gli hai dato la vittoria e hai detto la verità. Il divario è il punto. Può versarti altro vino. Nessuno deve essere un simbolo.",
          },
          {
            text: "Ho un livello intermedio certificato.",
            tone: "cold",
            feedback:
              "Hai risposto a una presa in giro con un titolo. La tavola entra per un attimo nel comune che sua madre ha appena vietato. Non ti stava chiedendo cosa sai dimostrare.",
          },
          {
            text: "Eh, per fortuna. Qui almeno si parla davvero.",
            tone: "near",
            feedback:
              "Hai lusingato la stanza appiattendola, e hai insultato la tua città per comprarti sicurezza. Ti ha preso in giro perché potessi essere una persona, non un visitatore che assegna autenticità.",
          },
        ],
      },
      {
        id: "cena-3",
        short: "la frase persa",
        place: "La tavola, nel rumore",
        who: "Sua madre, di nuovo",
        mode: "answer",
        scene:
          "Una sedia stride. Prendi quanto e poi niente. Ti guarda, e aspetta una risposta che non hai. Annuire sarebbe una bugia col sorriso.",
        teach:
          "Le chiedi di ripetere, sul tu, perché il comune l'ha già chiuso lei. Mi scusi, può ripetere era giusto un'ora fa, e adesso è la frase fredda. Eh? non è la versione ridotta. È un calo.",
        prompt: "Cosa dici, quando hai perso la frase?",
        choices: [
          {
            text: "Scusami, non l'ho presa. Me la ridici più piano?",
            tone: "fit",
            feedback:
              "La stessa educazione di mi scusi, tagliata sulla distanza che ha chiesto lei. Non l'ho presa è onesto. Piano le dà un modo di aiutare senza fare una scena.",
          },
          {
            text: "Mi scusi, può ripetere per favore?",
            tone: "cold",
            feedback:
              "Perfetto in piazza, e qui un piccolo rovescio. Hai rimesso il lei in tavola dopo che ti ha detto che vi faceva sembrare un ufficio. Può pensare di averti spinto in una cosa che non volevi.",
          },
          {
            text: "Eh?",
            tone: "near",
            feedback:
              "Secco, e in pubblico. Il rumore non era colpa sua, e Eh? lo fa sembrare tale. Anche la vicinanza ha un bordo morbido.",
          },
        ],
      },
      {
        id: "cena-4",
        short: "le scale, giù",
        place: "La porta, poi la strada",
        who: "Tutti loro, che ti accompagnano",
        mode: "answer",
        scene:
          "Hai la borsa. Loro hanno le scarpe. Nessuno tratta la porta come una fine. In questo appartamento l'arrivederci comprende la scala, e rifiutare la scala rifiuta la cena.",
        heard: "Ti accompagniamo giù.",
        heardFrom: "Il cugino",
        gloss: "Ti accompagniamo giù. Il tu. Non è una domanda, e non è facoltativo nel senso in cui lo pensa un libro.",
        teach:
          "Lasciati accompagnare. Il grazie nomina il cibo e promette un ritorno senza dichiarare una famiglia. Un arrivederci di un colpo è efficiente e, qui, freddo. Amarli ad alta voce la prima sera è l'altro errore.",
        prompt: "Cosa dici, scendendo?",
        choices: [
          {
            text: "Grazie. Arrivederci.",
            tone: "cold",
            feedback:
              "Giusto per un banco. Si sono messi le scarpe per te. Un finale aziendale corto gli dice che la scala non serviva.",
          },
          {
            text: "Vi voglio bene. Siete la mia famiglia.",
            tone: "near",
            feedback:
              "Hai speso un sentimento che la sera non si era guadagnato, e gliel'hai fatto portare. Stavano già facendo i familiari. Annunciarlo trasforma la loro ospitalità nella tua rivelazione.",
          },
          {
            text: "Grazie di tutto. Era tutto buonissimo. Torno, eh.",
            tone: "fit",
            feedback:
              "In strada torna a un tu più quieto: «Ci sentiamo. E alla signora Lina, buonasera e basta.» Tu rispondi «Promesso. Notte.» Il saluto lungo era la camminata. L'ultima riga può essere corta.",
          },
        ],
      },
    ],
  },
];

const turin: Stroll[] = [
  {
    slug: "sotto-i-portici",
    number: 7,
    town: "turin",
    title: "Sotto i portici",
    time: "19:40",
    place: "I portici di via Po",
    skill: "La cortesia è la brevità. Il condizionale è per quando qualcuno deve fare una cosa.",
    promise:
      "È già notte, e piove. Il portiere, uno sconosciuto, una farmacista, una porta tenuta aperta. Quasi nessuno di loro vuole una seconda frase.",
    stops: [
      {
        id: "portici-1",
        short: "il portiere",
        place: "Un portone su via Po",
        who: "Il portiere",
        mode: "answer",
        scene:
          "Il palazzo di Giulia. Ha visto cento ospiti e non colleziona provenienze. La pioggia batte sul portico, appena dietro di te. È lui che sa qual è la scala B.",
        teach:
          "Buonasera, da chi vai, che piano, perché hai una chiave. Poi ti fermi. L'abitudine di Lecce, aggiungere il tempo e i programmi, gli mette un lavoro emotivo sopra la porta.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Buonasera. Salgo dai Rossi, terzo piano. Mi hanno lasciato le chiavi.",
            tone: "fit",
            feedback:
              "Dice: «Scala B, a destra. Buonasera.» Il secondo buonasera è la fine. Se avessi chiesto della pioggia, forse avrebbe risposto «Spesso,» e guardato la porta finché non lo sentivi.",
          },
          {
            text: "Buonasera, che bel palazzo. Piove sempre così? Io resto qualche settimana.",
            tone: "near",
            feedback:
              "Un complimento, il tempo, il tuo itinerario. Hai importato la lunghezza di una scala di Lecce in un lavoro che sta cercando di chiudere. La bellezza del palazzo non era una domanda che ti ha fatto.",
          },
          {
            text: "Salve. Devo accedere all'unità abitativa Rossi. Dispongo delle chiavi.",
            tone: "cold",
            feedback:
              "Hai parlato come un avviso attaccato alla sua scrivania. È una persona, e la versione umana è più corta, non più lunga: buonasera, Rossi, terzo piano, chiavi.",
          },
        ],
      },
      {
        id: "portici-2",
        short: "l'indicazione",
        place: "Sotto il portico",
        who: "Un uomo della tua età, che viene incontro",
        mode: "answer",
        scene:
          "La gola è già stanca del treno. Ti serve una farmacia, non un rapporto. Ha le cuffie al collo e la faccia di chi aiuta e continua a camminare.",
        teach:
          "Mi scusi più una domanda al presente. Vorrei è per quando l'altro deve fare qualcosa. Un'indicazione gli costa una frase. Non farlo restare in piedi per una cerimonia al condizionale, e non chiamarlo bello.",
        prompt: "Come chiedi?",
        choices: [
          {
            text: "Vorrei sapere se esiste una farmacia nelle immediate vicinanze.",
            tone: "cold",
            feedback:
              "Esiste, immediata vicinanza: un frasario che sta attento. A lui bastavano farmacia e qui vicino. Il condizionale non ti ha comprato calore. Ti ha comprato distanza.",
          },
          {
            text: "Scusa bello, una farmacia?",
            tone: "near",
            feedback:
              "Il tu e bello, per uno sconosciuto sotto i portici. Essere corti non è la stessa cosa che afferrare. Mi scusi è la parte che rende educata la domanda corta.",
          },
          {
            text: "Mi scusi, c'è una farmacia qui vicino?",
            tone: "fit",
            feedback:
              "Dice: «Sì. In fondo al portico, a sinistra.» Tu dici: «Grazie. Buona serata.» Quattro parole di ritorno. Il favore è pagato.",
          },
        ],
      },
      {
        id: "portici-3",
        short: "la farmacista",
        place: "La farmacia in fondo al portico",
        who: "La farmacista",
        mode: "answer",
        scene:
          "È il posto per cui tenevi da parte il condizionale. Lei è già sul lei. Può rifiutarti, consigliarti, o venderti la cosa sbagliata se reciti invece di chiedere.",
        heard: "Mi dica.",
        heardFrom: "La farmacista",
        gloss: "Prego. Il lei. Un invito a dire il bisogno, non a raccontare il viaggio.",
        teach:
          "Vorrei più il bisogno. Chiederà «Ha febbre?» e «No, solo la gola» è tutta la risposta. Ciao e dammi sono un altro negozio. Il tuo percorso di studio non è un sintomo.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Buonasera. Vorrei qualcosa per il mal di gola.",
            tone: "fit",
            feedback:
              "Bisogno, condizionale, finito. Non le correggi il lei e non le spieghi il clima del Piemonte. È brava con le gole. Non è il tuo diario.",
          },
          {
            text: "Ciao, dammi una cosa per la gola.",
            tone: "near",
            feedback:
              "Il tu e un imperativo, a una professionista che ha aperto sul lei. Dammi è quello che dici per un bicchiere d'acqua in cucina dal cugino. Questo banco non l'ha offerto.",
          },
          {
            text: "Buonasera. Il clima piemontese mi ha provocato una lieve infiammazione.",
            tone: "cold",
            feedback:
              "Le hai dato un tema. Lieve infiammazione nasconde la parola utile, gola, dentro una prova di vocabolario. Vorrei qualcosa per il mal di gola è più chiaro, e più caldo.",
          },
        ],
      },
      {
        id: "portici-4",
        short: "la porta",
        place: "Di nuovo al portone",
        who: "Una signora, che esce mentre tu entri",
        mode: "overhear",
        scene:
          "Tieni la porta perché il chiudiporta è pesante. Passa così vicina che il cappotto sfiora la maniglia. A questo momento deve una parola, e la paga esatta.",
        heard: "Grazie.",
        heardFrom: "La donna",
        gloss: "Grazie. Non è un'apertura. È una ricevuta.",
        teach:
          "A Lecce una porta tenuta aperta spesso apre una frase. Qui la cortesia era il tenerla. Prego, buonasera la chiude. Un grazie più lungo, da parte sua, avrebbe voluto dire un'altra cosa, e non è arrivato.",
        prompt: "Il suo grazie a cosa ti obbliga?",
        choices: [
          {
            text: "Chiudi. «Prego, buonasera.» Il favore era la porta. Lei ha già finito di pagarlo.",
            tone: "fit",
            feedback:
              "Hai lasciato che una gentilezza piccola restasse piccola. Quello non è freddo. Freddo sarebbe un discorso sul gesto, o un silenzio che finge che lei non abbia parlato.",
          },
          {
            text: "Continua. Un grazie di passaggio è solo il primo passo. Aspetta il tuo nome e quanto resti.",
            tone: "near",
            feedback:
              "È la porta di Lecce, ricordata troppo alla lettera. Ha usato il grazie più corto della lingua. Allungarlo è parlare a una città che su questo gradino non c'è.",
          },
          {
            text: "Ti scusi. Grazie qui vuol dire che le eri d'intralcio, e devi spiegarti finché non è a suo agio.",
            tone: "cold",
            feedback:
              "Hai sentito una parola chiusa come un reclamo. Era precisa, non ferita. Una sequenza di scuse la rende responsabile di consolarti.",
          },
        ],
      },
    ],
  },
  {
    slug: "l-aperitivo",
    number: 8,
    town: "turin",
    title: "L'aperitivo",
    time: "19:55",
    place: "Un bar in Piazza Vittorio Veneto",
    skill: "Il tu offerto da una persona. Un piatto piccolo. Una frase che restituisce un giro.",
    promise:
      "Marco ha un tavolo. Parte sul tu. Del resto la città non è cambiata: il buffet, il conto e l'elogio hanno ancora la misura di Torino.",
    stops: [
      {
        id: "aperitivo-1",
        short: "l'offerta del tu",
        place: "Il tavolo che ti ha tenuto",
        who: "Marco, della tua età",
        mode: "answer",
        scene:
          "Si alza appena, per segnare che sei la persona che aspettava, e non una cerimonia. Fuori la piazza è piena di tram. Qui dentro la distanza l'ha già decisa.",
        heard: "Ho preso un tavolo in fondo. Ti va un aperitivo?",
        heardFrom: "Marco",
        gloss: "Ho un tavolo in fondo. Ti va un aperitivo? Ti: ti ha dato del tu usandolo, senza un discorso sul dartelo.",
        teach:
          "Questo tu puoi restituirlo. È suo, non del portiere e non dell'ufficio in cui non sei ancora entrato. Volentieri è tutto il sì. Non ringraziarlo come se fosse un'istituzione.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Buonasera. La ringrazio per la disponibilità.",
            tone: "cold",
            feedback:
              "Il lei, e disponibilità, che è una parola da appuntamenti. Ti ha dato il ti e un tavolo. Tu gli hai dato un banco.",
          },
          {
            text: "Sì, volentieri.",
            tone: "fit",
            feedback:
              "Il tu restituito col non contraddirlo, e un sì della misura della domanda. Puoi sederti. Adesso nella sera c'è una persona.",
          },
          {
            text: "Certo. E dopo usciamo, dopo ti racconto tutta la vita.",
            tone: "near",
            feedback:
              "Hai accettato il tu e poi hai speso le prossime tre ore della sua sera senza chiedere. Volentieri gli lascia spazio. La tua biografia no.",
          },
        ],
      },
      {
        id: "aperitivo-2",
        short: "il buffet",
        place: "Il tavolo, con i bicchieri già posati",
        who: "Marco, che spiega il cibo",
        mode: "notice",
        scene:
          "Lungo il banco c'è un assortimento che hai letto come un menu di cena. Lui lo indica come si indica una cosa ovvia, e capisci che stavi per sbagliarla in uno dei due sensi.",
        heard: "Puoi prendere da mangiare, è compreso.",
        heardFrom: "Marco",
        gloss: "Puoi prendere da mangiare, è compreso. Non: ti prego, mangia tanto, la mia ospitalità dipende da questo.",
        teach:
          "Un piatto modesto. Il cibo appartiene al bicchiere. Lecce dice che un piatto vuoto rifiuta una persona. Questo rito dice che un piatto colmo legge uno spuntino come un banchetto che ti è dovuto, o che devi a lui.",
        prompt: "Compreso cosa chiede al tuo piatto?",
        choices: [
          {
            text: "Lo riempi. Ti ha indicato il cibo, e lasciare l'abbondanza intatta è scortese. L'hai imparato alla tavola del cugino.",
            tone: "near",
            feedback:
              "Quella regola era vera la settimana scorsa, in una cucina, detta da una madre. Qui il cibo è una frase dentro un bicchiere. Importare il piatto pieno fa sembrare che la sua città abbia fallito nell'ospitare.",
          },
          {
            text: "Un piatto piccolo. Viene col bicchiere. Non ti ha chiesto di fare un pasto, e non ti ha chiesto di rifiutarlo.",
            tone: "fit",
            feedback:
              "Puoi dire «Non lo sapevo. Allora prendo poco.» Quella frase fa vedere che hai imparato il rito senza farne un contratto.",
          },
          {
            text: "Non mangi niente. Toccare il cibo compreso sembra ingordo, e sei ospite in una città riservata.",
            tone: "cold",
            feedback:
              "Hai corretto troppo, fino al digiuno. Ti ha detto che il cibo fa parte di quello che ha offerto. Rifiutare tutto il banco fa sembrare l'offerta una trappola in cui eri troppo attento per entrare.",
          },
        ],
      },
      {
        id: "aperitivo-3",
        short: "il giro",
        place: "Il tavolo, quando arriva il conto",
        who: "Marco",
        mode: "answer",
        scene:
          "Non mette in scena il pagare. Lo fa e basta, con la leggerezza di una decisione presa prima che tu potessi cominciare la lite italiana sul conto italiano.",
        heard: "Faccio io.",
        heardFrom: "Marco",
        gloss: "Offro io. Due parole. Il calore sta nella decisione, non in un discorso sulla decisione.",
        teach:
          "Non lotti con lui per cinque minuti, e non lasci sparire il giro. Il prossimo, nominato, è tutto il ritorno. Grazie da solo tiene il favore. Insisto lo recita.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "No, insisto, pago io, non si discute.",
            tone: "near",
            feedback:
              "La lotta è una recita di generosità. La domanda l'aveva già chiusa. Riaprirla gli dice che non ti fidi di una gentilezza corta.",
          },
          {
            text: "Perfetto, grazie.",
            tone: "cold",
            feedback:
              "Preciso, e chiuso troppo presto. Hai accettato un giro come si accetta uno scontrino. La metà che manca è il ritorno: il prossimo ha il tuo nome.",
          },
          {
            text: "Grazie. Il prossimo lo offro io.",
            tone: "fit",
            feedback:
              "Un grazie, una promessa, niente lotta. Può dire «Va bene» e pensarlo. Quella frase è il calore. Non ci aggiungi anche un elogio del carattere.",
          },
        ],
      },
      {
        id: "aperitivo-4",
        short: "l'elogio",
        place: "Il tavolo, verso la fine",
        who: "Marco, e la stanza che ti piace davvero",
        mode: "answer",
        scene:
          "Ti piace più della frase che stai per concederti. La piazza, l'ora, il fatto di un tavolo. A Lecce l'avresti detto a voce piena. Lui guarda la piazza, non te, e quella è una forma di contentezza.",
        teach:
          "Un grado sotto quello che senti. Bello, e la voglia di tornare. Fantastico più un complimento al suo gusto gli chiede di ospitare il tuo entusiasmo. Gradevole è un depliant.",
        prompt: "Cosa ti lasci uscire?",
        choices: [
          {
            text: "È incredibile, adoro questo posto, sei un genio per averlo scelto.",
            tone: "near",
            feedback:
              "Tre misure troppo grande, e l'ultima frase lo rende responsabile dei tuoi sentimenti. Ha scelto un bar, non una rivelazione. Un elogio a quel calore è lavoro.",
          },
          {
            text: "Il locale è gradevole.",
            tone: "cold",
            feedback:
              "Ti sei ritirato in una recensione. Gradevole è quello che direbbe un avviso, se gli avvisi bevessero. Non può rispondere. Non c'è un appiglio.",
          },
          {
            text: "Bello qui. Ci torno volentieri.",
            tone: "fit",
            feedback:
              "Dice: «Sì, è tranquillo.» Sta d'accordo con te. Tranquillo non è meno di bello. È lo stesso sentimento, al volume del posto.",
          },
        ],
      },
    ],
  },
  {
    slug: "la-scala-b",
    number: 9,
    town: "turin",
    title: "La scala B",
    time: "21:05",
    place: "Il palazzo di Giulia, fuori da via Po",
    skill: "Il freddo di un avviso non è il freddo di una persona. Una chiave inceppata non è un'amicizia.",
    promise:
      "Nomi su un citofono, il silenzio di un vicino, un avviso sul riscaldamento, e un messaggio della donna che ti ha lasciato il latte. Quattro distanze scritte, o scritte a metà.",
    stops: [
      {
        id: "scala-1",
        short: "il citofono",
        place: "Il pannello dei nomi",
        who: "Una voce che non è Giulia",
        mode: "answer",
        scene:
          "Tre Rossi. Il messaggio diceva Rossi G., scala B, interno 8, e anche che stasera è fuori. Premi comunque il nome giusto, per riflesso. Qualcuno risponde al secondo squillo. Gli hai già preso un pezzo di sera.",
        heard: "Sì?",
        heardFrom: "Una voce, infastidita solo dall'ora",
        gloss: "Sì? Tutto il benvenuto che riceve un citofono sbagliato.",
        teach:
          "Ti scusi e li liberi in un fiato. Non cerchi nel nome un legame con Giulia, e non spieghi la tua sistemazione attraverso un citofono.",
        prompt: "Cosa dici nel citofono?",
        choices: [
          {
            text: "Mi scusi, ho sbagliato. Buonasera.",
            tone: "fit",
            feedback:
              "Si riprendono la cucina. La chiave ce l'hai ancora. Il citofono era un riflesso, non un complotto. Chiuderlo è la cortesia.",
          },
          {
            text: "Ciao! Sei un Rossi anche tu? Conosci Giulia? Io dormo da lei.",
            tone: "near",
            feedback:
              "Il tu, una caccia al legame, e dove dormi, trasmessi nell'ingresso di uno sconosciuto. Il pannello non è una piazza. Non sono venuti alla porta di loro volontà.",
          },
          {
            text: "Buonasera. Sono l'ospite dell'interno 8 e sto verificando la corrispondenza dei cognomi.",
            tone: "cold",
            feedback:
              "Verificare la corrispondenza: hai parlato come la bacheca un piano sopra. Avevano solo bisogno di essere liberati. Mi scusi, ho sbagliato lo fa senza un verbale.",
          },
        ],
      },
      {
        id: "scala-2",
        short: "la chiave inceppata",
        place: "Il portone",
        who: "Una vicina, che sta uscendo",
        mode: "answer",
        scene:
          "La chiave non gira. Sta uscendo, vede il problema, e tiene la porta con l'efficienza di chi l'ha fatto per altri ospiti e non vuole un capitolo.",
        teach:
          "Grazie, buona serata. La biografia della chiave non è un regalo per lei. Una domanda su da quant'è che abita qui spende il favore per comprare una conversazione. Il silenzio la spende in un altro modo: la cancella.",
        prompt: "Cosa dici, prendendo la porta?",
        choices: [
          {
            text: "Grazie, lei da quant'è che vive qui? Questa chiave mi odia.",
            tone: "near",
            feedback:
              "Un reclamo e una domanda personale, come pagamento di tre secondi della sua mano. Può rispondere, perché è educata, e detestare la risposta che si è sentita obbligata a dare.",
          },
          {
            text: "Prendi la porta e passi. Dire qualcosa la farebbe aspettare.",
            tone: "cold",
            feedback:
              "Le hai protetto il tempo così a fondo da cancellarla. Grazie costa meno della storia, e più di niente. Niente è quello che si dice a una porta, non a una persona che la tiene.",
          },
          {
            text: "Grazie. Buona serata.",
            tone: "fit",
            feedback:
              "Annuisce. Finito. La chiave resta un problema tuo, da risolvere col messaggio di Giulia, non con la sera di una vicina.",
          },
        ],
      },
      {
        id: "scala-3",
        short: "l'avviso",
        place: "La bacheca nel cortile",
        who: "L'amministratore, sulla carta",
        mode: "notice",
        scene:
          "Un foglio in una busta di plastica, stampato, col tono di una regola che si aspetta di essere obbedita e non di essere amata. Ti senti accusato, e poi riguardi.",
        heard:
          "Si avvisano i condomini che l'impianto di riscaldamento sarà avviato il 15 ottobre. Si prega di non appoggiare oggetti sulle scale. L'amministratore.",
        heardFrom: "L'avviso",
        gloss: "Si informano i condomini che il riscaldamento parte il 15 ottobre. Si prega di non lasciare oggetti sulle scale. Firmato, l'amministratore.",
        teach:
          "Questo freddo appartiene al genere. L'amministratore non è arrabbiato con te, e a cena non rispondi con quella voce. E non senti si prega come una persona che supplica. Se ti serve il fatto, lo chiedi in una riga umana: «Il riscaldamento parte il 15, giusto?»",
        prompt: "Che freddo è questo?",
        choices: [
          {
            text: "Un palazzo ostile. Devi rispondere nello stesso tono legale, così capiscono che non sei uno da spingere.",
            tone: "cold",
            feedback:
              "Hai lasciato che un genere ti occupasse la bocca. Gli avvisi sono freddi perché una persona non debba esserlo. Rispondere in italiano da busta di plastica ti fa diventare l'avviso.",
          },
          {
            text: "Il freddo ordinario della carta. Non è un umore. Non lo imiti, non te lo prendi, e la data la puoi ancora chiedere a un vicino, a voce.",
            tone: "fit",
            feedback:
              "Il genere è una distanza che puoi nominare. Quando sai nominarla, smetti di sentire ogni frase formale come una persona che si allontana da te.",
          },
          {
            text: "Si prega vuol dire che qualcuno supplica. Devi rassicurare il palazzo che non lasceresti mai niente sulle scale.",
            tone: "near",
            feedback:
              "Si prega è una formula, non un sentimento. Una risposta emotiva a un avviso sul riscaldamento è la lettura troppo vicina: hai offerto conforto a una busta di plastica.",
          },
        ],
      },
      {
        id: "scala-4",
        short: "the milk",
        place: "Un biglietto sul frigo, poi il telefono",
        who: "Giulia, che non è in casa",
        mode: "answer",
        scene:
          "La scrittura è ordinaria. Nel frigo ci sono latte, uova, e niente di romantico. Con te dà già del tu, perché un tuo amico ti ci ha messo prima che arrivassi. Il calore è il latte, non uno stile.",
        heard: "Se ti serve qualcosa, scrivimi. Il latte è nel frigo. Buona permanenza, Giulia.",
        heardFrom: "Il biglietto",
        gloss: "Se ti serve qualcosa, scrivimi. Il latte è in frigo. Buon soggiorno. Il tu, pratico, finito.",
        teach:
          "La risposta resta pratica e sul tu. Il lei più una cerimonia di gratitudine le dice che qualcosa non va. Un'ondata d'affetto le dice che il latte era un rapporto più grande di quello che ha scritto.",
        prompt: "Cosa le scrivi?",
        choices: [
          {
            text: "Cara Giulia, desidero esprimerle la mia più sentita gratitudine per l'ospitalità.",
            tone: "cold",
            feedback:
              "Il lei, sentita gratitudine, una lettera a un'istituzione. Ha scritto ti e ha nominato il latte. Il tuo registro le dice che le chiavi sono andate all'ospite sbagliato, o che hai paura.",
          },
          {
            text: "Grazie. Ho visto il latte. Tutto a posto. A presto.",
            tone: "fit",
            feedback:
              "Hai dimostrato di aver letto il biglietto, hai usato il suo tu, e l'hai liberata. Il calore pratico ha avuto risposta della stessa misura. Non deve ospitare un sentimento.",
          },
          {
            text: "Giulia sei la migliore del mondo, ti devo la vita, latte apprezzatissimo.",
            tone: "near",
            feedback:
              "Ha lasciato del latte, non un salvataggio. Ti devo la vita gonfia un favore finché deve gestire la tua gratitudine. La misura giusta era quella del latte.",
          },
        ],
      },
    ],
  },
  {
    slug: "il-collega",
    number: 10,
    town: "turin",
    title: "Il collega",
    time: "18:45",
    place: "Un ufficio vicino a Piazza San Carlo",
    skill: "Il tu lo offre una persona. Una battuta secca si risponde allo stesso volume.",
    promise:
      "La dottoressa Ferrero usa il lei da due settimane. Il nome, Laura, sta sull'elenco. Tu non ce l'hai ancora. Stasera l'ascensore, un file, una stampante, e poi, alla fine, la sua decisione.",
    stops: [
      {
        id: "collega-1",
        short: "l'ascensore",
        place: "L'ascensore",
        who: "La dottoressa Ferrero",
        mode: "overhear",
        scene:
          "Il cognome lo sai perché è quello che usano tutti con lei. Laura l'hai visto su una lista. In bocca non te l'ha mai messo lei. Le porte si chiudono. Sono quattro piani.",
        heard: "Buonasera.",
        heardFrom: "La dottoressa Ferrero, che poi guarda le porte",
        gloss: "Buonasera. E poi le porte, che sono il resto della conversazione.",
        teach:
          "Il saluto è completo. Un'altra frase spende una vicinanza che non ha offerto. Riempire il silenzio non è la stessa cosa che essere umani. L'elenco non è un permesso.",
        prompt: "Il silenzio cosa ti chiede?",
        choices: [
          {
            text: "Nient'altro. Buonasera di rimando, e le porte. Il saluto c'è già stato.",
            tone: "fit",
            feedback:
              "Fai quattro piani senza trasformarla in un'ospite. Quando le porte si aprono può ancora avere piacere di lavorare con te. Non è un esito piccolo.",
          },
          {
            text: "Lo riempi. Il silenzio in ascensore è ostile, quindi offri il weekend, l'italiano, l'impressione della città.",
            tone: "near",
            feedback:
              "Hai trattato il silenzio come un problema da risolvere con l'autobiografia. Ha scelto le porte. Aggiungere il fine settimana le dice che la sua scelta era un errore che stai correggendo.",
          },
          {
            text: "Ti ripresenti, col tuo livello di lingua, nel caso si sia dimenticata chi sei.",
            tone: "cold",
            feedback:
              "Un rapporto di stato, non richiesto, in una scatola. Sa chi sei. Il livello del tuo italiano non è il saluto che le mancava.",
          },
        ],
      },
      {
        id: "collega-2",
        short: "il fascicolo",
        place: "La porta del suo ufficio",
        who: "La dottoressa Ferrero",
        mode: "answer",
        scene:
          "Si sta già girando verso lo schermo. La richiesta è piccola e a tempo. Il tu di Marco, in piazza, te lo hai ancora nell'orecchio da ieri sera. Questa stanza a quell'aperitivo non c'era.",
        heard: "Può mandarmi quel file prima delle sei?",
        heardFrom: "Dottoressa Ferrero",
        gloss: "Mi può mandare quel file entro le sei? Può: il lei. Tutta la richiesta è una riga, e quella è la sua cortesia.",
        teach:
          "Glielo mando tiene il suo lei e nomina il fare. Te lo mando spende il tu di Marco in una stanza che non l'ha offerto. Un certamente, dottoressa cerimoniale è l'altro errore: più inchino di quanto abbia chiesto.",
        prompt: "Cosa rispondi?",
        choices: [
          {
            text: "Sì, te lo mando subito.",
            tone: "near",
            feedback:
              "Te è di Marco, o del cugino. Lei ha detto può. Prendere in prestito il tu da una stanza più amica non è efficienza. È una porta aperta dal lato sbagliato.",
          },
          {
            text: "Certamente, dottoressa. Sarà mia cura provvedere.",
            tone: "cold",
            feedback:
              "Hai risposto a una richiesta chiara con un piccolo giuramento. Provvedere appartiene agli avvisi. Voleva il file, non un impegno. Il titolo a ogni frase è una distanza che in realtà non sta chiedendo.",
          },
          {
            text: "Sì, glielo mando.",
            tone: "fit",
            feedback:
              "Glielo: a lei, il file. Il lei intatto, niente inchino in più, niente tu importato. Può tornare allo schermo. Quella era la gentilezza che aveva disegnato.",
          },
        ],
      },
      {
        id: "collega-3",
        short: "la stampante",
        place: "Il corridoio",
        who: "La dottoressa Ferrero, quasi tra sé",
        mode: "answer",
        scene:
          "La stampante si è fermata di nuovo. È venerdì. Non ti guarda mentre lo dice, ed è così che sai che puoi rispondere e che non devi risolverle la vita.",
        heard: "Ha deciso di non lavorare il venerdì.",
        heardFrom: "Dottoressa Ferrero",
        gloss: "Ha deciso di non funzionare il venerdì. La stampante, con una volontà. Secco, e un grado sotto il divertente.",
        teach:
          "Rispondi al suo volume, una volta. Una storia sulla stampante di Roma allarga la battuta finché deve ospitarla. Offrirti di chiamare l'assistenza risponde a una persona come se avesse aperto un ticket.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "Aspetta, la stampante di Roma ci mette cinque minuti a raccontarla.",
            tone: "near",
            feedback:
              "Aspetta dà già per scontato il tu e un pubblico. Ti ha dato una riga secca, non un palco. La storia probabilmente è buona. Non è di questo corridoio.",
          },
          {
            text: "Ha i suoi principi.",
            tone: "fit",
            feedback:
              "Hai continuato la finzione alla stessa misura e poi ti sei fermato. Può sorridere senza mettere in agenda il tuo aneddoto. Stare al volume è l'umorismo.",
          },
          {
            text: "Vuole che contatti l'assistenza?",
            tone: "cold",
            feedback:
              "Hai sentito una battuta come un ordine di lavoro. Assistenza è la parola giusta in un altro minuto, se la chiede lei. Come risposta a ha deciso, la corregge perché stava giocando.",
          },
        ],
      },
      {
        id: "collega-4",
        short: "ormai",
        place: "L'ascensore, a fine giornata",
        who: "La dottoressa Ferrero",
        mode: "answer",
        scene:
          "Due settimane di lei. Il momento lo sceglie lei, ed è tutto il contenuto dell'offerta: è suo, è a tempo, e non è la confessione che il lei fosse un peso che odiavate tutti e due.",
        heard: "Può darmi del tu. Ormai.",
        heardFrom: "Dottoressa Ferrero",
        gloss: "Puoi darmi del tu. Ormai. Ormai vuol dire che il lei ha fatto il suo lavoro ed è finito. Non dice Laura. Non dice finalmente.",
        teach:
          "Prendi il tu. Non prendere il nome, che nella frase non c'era, e non insultare le due settimane che ha usato per rendere facile l'offerta. Rifiutare, per restare professionali, punisce il suo tempo.",
        prompt: "Cosa rispondi?",
        choices: [
          {
            text: "Volentieri. Buona serata.",
            tone: "fit",
            feedback:
              "Hai accettato, e hai lasciato finire la sera. La prossima volta, il tu. Il nome Laura aspetta un'altra porta, se mai la apre. La porta di stasera era il pronome.",
          },
          {
            text: "Finalmente. Ciao Laura, il lei era pesantissimo.",
            tone: "near",
            feedback:
              "Finalmente insulta il tempo. Laura prende un nome che non ha dato. Pesantissimo le dice che la cura che ha avuto ti è sembrata un peso da sopportare. Tre errori, un fiato.",
          },
          {
            text: "La ringrazio, ma preferisco mantenere il lei.",
            tone: "cold",
            feedback:
              "Hai trasformato la sua offerta in una politica. Non la farà due volte. Professionale era il lei che ti stava già dando. Questa frase era il momento in cui smetteva di essere la scelta attenta.",
          },
        ],
      },
    ],
  },
  {
    slug: "la-nonna",
    number: 11,
    town: "turin",
    title: "La nonna in visita",
    time: "20:35",
    place: "L'appartamento di Marco, sopra i portici",
    skill: "Due distanze nello stesso corridoio. La sua, poi la sua di lui, senza tradire nessuna delle due.",
    promise:
      "Sua madre è arrivata stamattina da Lecce. La stanza del sud sta per comparire dentro l'appartamento torinese. Sei la persona che ha camminato tutte e due.",
    stops: [
      {
        id: "nonna-1",
        short: "l'avvertimento",
        place: "La sua porta",
        who: "Marco",
        mode: "overhear",
        scene:
          "Lo dice prima che tu tolga il cappotto, piano, con l'affetto di un figlio che conosce i prossimi dieci minuti. Non sta proprio scherzando. Ti sta ridimensionando, così la sorpresa non ti fa sbagliare.",
        heard: "Entra. C'è mia madre, arrivata stamattina da Lecce. Parla con tutti.",
        heardFrom: "Marco",
        gloss: "Entra. C'è mia madre, è arrivata stamattina da Lecce. Parla con tutti. Un fatto, un avvertimento, e non proprio un reclamo.",
        teach:
          "Non ti sta arruolando contro di lei, e non ti sta chiedendo di metterla in fresco. Puoi essere caldo al volume di lei e quieto al suo. L'avvertimento serve perché il cambio non ti sbilanci.",
        prompt: "Cosa ti sta chiedendo?",
        choices: [
          {
            text: "Niente contro di lei. Ti sta cambiando le attese, non ti sta arruolando. Caldo con lei, alla sua misura. Quieto con lui, alla sua.",
            tone: "fit",
            feedback:
              "Entri capace di tenere tutte e due. La frase che non dici, dopo, in cucina dove può sentire, è qualsiasi versione di «è un po' troppo.»",
          },
          {
            text: "Tenere l'appartamento a una temperatura sola. Devi essere riservato con lei, così Torino non si rompe.",
            tone: "cold",
            feedback:
              "Metteresti in fresco un'ospite che stamattina ha attraversato l'Italia, per proteggere un umore. Lui vive con la sua voce. Ti ha chiesto elasticità, non un alleato nel freddo.",
          },
          {
            text: "Aiutarlo a correggerla. Sta per essere troppo, e una correzione gentile del suo italiano sarebbe un favore.",
            tone: "near",
            feedback:
              "Correggere sua madre non è il favore. È un'invasione stupefacente. Parla con tutti è un'informazione, non una diagnosi che hai licenza di curare.",
          },
        ],
      },
      {
        id: "nonna-2",
        short: "le orecchiette",
        place: "La sua cucina",
        who: "La madre di Marco",
        mode: "answer",
        scene:
          "Diventa Lecce nel momento in cui vede una faccia nuova. La pentola è già una decisione. Marco è ancora sulla porta, col cappotto, e tiene in corpo il rito di prima, l'aperitivo.",
        heard:
          "Meno male, una faccia nuova. Hai mangiato? Ti ho fatto le orecchiette. Marco non le fa mai.",
        heardFrom: "Sua madre",
        gloss: "Finalmente una faccia nuova. Hai mangiato? Ti ho fatto le orecchiette. Marco non le fa mai. Il tu, immediato, del sud, permesso. Il reclamo su di lui è suo.",
        teach:
          "Accetti una porzione piccola, e lasci che l'aperitivo esista così la sua sera resta vera. Un no immediato ripete l'errore più freddo di Lecce. Unirti al reclamo su di lui è quello troppo vicino: è un diritto suo, non tuo.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: "No, grazie, sono a posto.",
            tone: "cold",
            feedback:
              "Il no immediato, prima che esista un piatto. Nella sua cucina a Lecce questo rifiutava la persona. Fa lo stesso dentro l'appartamento di lui. La città è cambiata. Questa offerta no.",
          },
          {
            text: "Hai ragione. Che figlio.",
            tone: "near",
            feedback:
              "Ti sei unito all'accusa mentre lui aveva ancora il cappotto. Lei può lamentarsi di lui. Tu no. Sarà ancora suo figlio dopo che te ne vai, e si ricorderà la sedia che hai scelto.",
          },
          {
            text: "Grazie. Ne prendo un po'. L'aperitivo c'è stato, queste no.",
            tone: "fit",
            feedback:
              "Cibo accettato, porzione modesta, il suo rito ancora visibile. Hai onorato la pentola e l'ora di prima. Lei può essere contenta. Lui può respirare.",
          },
        ],
      },
      {
        id: "nonna-3",
        short: "tre domande",
        place: "La cucina, ancora in piedi",
        who: "Sua madre",
        mode: "answer",
        scene:
          "Le impila come la tavola del cugino impilava i piatti, con affetto e senza pausa per il tuo programma. Una delle domande prende in giro il figlio. La trappola la senti perché ti hanno voluto bene così, più a sud.",
        heard: {
          f: "Ma tu da quanto sei qui? Ti trovi? E Marco ti porta in giro, o ti lascia sola come fa con me?",
          m: "Ma tu da quanto sei qui? Ti trovi? E Marco ti porta in giro, o ti lascia solo come fa con me?",
        },
        heardFrom: "Sua madre",
        gloss: "Da quanto sei qui? Ti piace? E Marco ti porta in giro, o ti lascia solo come fa con me?",
        teach:
          "Rispondi alla domanda umana, corta, e non accusarlo. «Stasera mi ha portato qui» le dà la rassicurazione senza l'alleanza. Un programma non risponde a niente di quello che ha chiesto.",
        prompt: "Cosa rispondi?",
        choices: [
          {
            text: "Sto cercando di migliorare il mio italiano in contesto.",
            tone: "cold",
            feedback:
              "Una dichiarazione di intenti, e uno scansare il figlio. Ha chiesto dei tuoi giorni e di lui. In contesto è il comune, trasferito su una pentola di orecchiette.",
          },
          {
            text: {
              f: "Mi lascia sola, sì. Meno male che ci sei tu.",
              m: "Mi lascia solo, sì. Meno male che ci sei tu.",
            },
            tone: "near",
            feedback:
              "Hai accettato l'alleanza. Le farà piacere per un minuto e lascerà lui solo con quella. L'ha preso in giro perché tu potessi rassicurarla, non perché firmassi.",
          },
          {
            text: {
              f: "Da due settimane. Mi ci trovo. Stasera mi ha portata qui, quindi qualcosa fa.",
              m: "Da due settimane. Mi ci trovo. Stasera mi ha portato qui, quindi qualcosa fa.",
            },
            tone: "fit",
            feedback:
              "Il tempo, un sentimento vero, e una difesa di lui che le lascia ancora la presa in giro. Qualcosa fa è la battuta della misura giusta: non è perfetto, e non è assente.",
          },
        ],
      },
      {
        id: "nonna-4",
        short: "l'ingresso",
        place: "L'ingresso, mentre lei torna alla pentola",
        who: "Marco, a bassa voce",
        mode: "answer",
        scene:
          "Dieci passi di piastrelle. Questo palazzo porta la voce. È un po' imbarazzato e un po' leale, e cerca di passarti la regola senza farti scegliere da che parte stare.",
        heard: "Diventa Lecce in dieci minuti. Tu rispondile, se no ci resta male. Scusa.",
        heardFrom: "Marco",
        gloss: "Tra dieci minuti diventa Lecce. Rispondile, se no ci resta male. Scusa. Rispondile: imperativo del tu, lei come oggetto.",
        teach:
          "Corto, dal lato suo del volume, fedele a lei. Non tramare un'uscita per dopo, e non promettergli un registro differenziato come un promemoria. È a dieci passi.",
        prompt: "Cosa dici?",
        choices: [
          {
            text: {
              f: "È un po' tanto. Dopo le dico che sono stanca.",
              m: "È un po' tanto. Dopo le dico che sono stanco.",
            },
            tone: "near",
            feedback:
              "Un complotto, in un corridoio che rimbomba, contro una donna che cucina per te. Anche se le sfuggono le parole può cogliere la postura. Ti ha chiesto di risponderle, non di scappare da lei.",
          },
          {
            text: "Ma figurati. È a posto così.",
            tone: "fit",
            feedback:
              "L'hai liberato dalla scusa e hai tenuto fede a lei. Poi rientri al volume di lei, non a questo sussurro. Due distanze, e non ne hai lasciata cadere nessuna.",
          },
          {
            text: "Ricevuto. Differenzierò i registri.",
            tone: "cold",
            feedback:
              "Hai confermato una tattica. Stava facendo il figlio, non il comandante. Differenzierò è la versione da bacheca di un sentimento che ti ha appena affidato.",
          },
        ],
      },
    ],
  },
  {
    slug: "il-ritorno",
    number: 12,
    town: "turin",
    title: "La passeggiata di ritorno",
    time: "22:15",
    place: "Via Po, verso Porta Nuova",
    skill: "La frase che non è mai cambiata, e il vocale che non è una tesi.",
    promise:
      "Gli stessi tipi di persone della prima sera a Lecce. Una misura diversa in bocca. Poi Marta, che ha cominciato tutto questo, riceve la sera e non il tema.",
    stops: [
      {
        id: "ritorno-1",
        short: "l'autista, di nuovo",
        place: "Il gradino di un pullman",
        who: "Un autista, a fine corsa",
        mode: "answer",
        scene:
          "Porta Nuova è avanti e sei sceso una fermata prima, di nuovo, perché le città ti fanno questo apposta. Ha la stessa mano sullo stesso tipo di porta. Hai dodici sere in tasca e una gran voglia di spenderle.",
        heard: "Attenzione al gradino.",
        heardFrom: "L'autista",
        gloss: "Attenzione al gradino. L'hai sentito a Lecce. Non è diventato più complicato.",
        teach:
          "Grazie, buonasera. È la riga che non andava ridimensionata. Quasi tutto il resto sì. L'autobiografia delle due città non è la sua corsa.",
        prompt: "Lo stesso gradino, un'altra città. Cosa dici?",
        choices: [
          {
            text: "Grazie! Di dove è? Ho fatto Lecce e adesso Torino.",
            tone: "near",
            feedback:
              "L'hai pagato col programma. Ti ha avvertito di un gradino. Il confronto tra due Italie è vero, e non è una conversazione che ha aperto lui.",
          },
          {
            text: "Scendi guardando il telefono e non dici niente.",
            tone: "cold",
            feedback:
              "Essere corti non è mai stato il silenzio. Hai imparato una riga corta e poi hai saltato anche quella, ed è così che una lezione diventa una posa. Ha detto comunque qualcosa. Ha comunque una risposta.",
          },
          {
            text: "Grazie, buonasera.",
            tone: "fit",
            feedback:
              "Nota com'è piccola. La mappa riguardava tutto quello che sta intorno a questa frase. La frase è sopravvissuta alle due città uguale, ed è per questo che puoi fidarti.",
          },
        ],
      },
      {
        id: "ritorno-2",
        short: "il guanto",
        place: "Sotto il portico",
        who: "Un uomo che ha raccolto quello che ti è caduto",
        mode: "answer",
        scene:
          "Il guanto è nella sua mano prima che tu ti giri. Te lo sta già porgendo. Nel gesto c'è una distanza formale minima, ed è voluta, ed è gentile.",
        heard: "Tenga.",
        heardFrom: "L'uomo",
        gloss: "Tenga. Imperativo del lei di tenere. La stessa parola che era sbagliata per un bambino in piazza è giusta per uno sconosciuto sotto i portici.",
        teach:
          "Grazie mille, buonasera. Non lo arruoli verso Porta Nuova, e non gonfi un guanto in squisita cortesia. Tenga ti ha già detto la distanza. Tu la restituisci.",
        prompt: "Cosa dici, mentre lo prendi?",
        choices: [
          {
            text: "Grazie, ma se vai verso Porta Nuova ti racconto una cosa.",
            tone: "near",
            feedback:
              "Ha detto tenga, che è lei, e tu hai risposto col tu e un diritto sulla sua camminata. Il guanto non era una presentazione. A Lecce forse diventava una via. Ti ha detto che qui no.",
          },
          {
            text: "La ringrazio infinitamente per il suo gesto di squisita cortesia.",
            tone: "cold",
            feedback:
              "Hai costruito un podio per un guanto. Infinitamente e squisita cortesia lo fanno restare lì mentre reciti la gratitudine. Voleva indietro la mano.",
          },
          {
            text: "Grazie mille. Buonasera.",
            tone: "fit",
            feedback:
              "La gentilezza è completa. Non ispezioni il guanto in cerca di un dramma e non cominci una camminata. Finito è la versione educata.",
          },
        ],
      },
      {
        id: "ritorno-3",
        short: "il bar rumoroso",
        place: "Un bar che esce su via Po",
        who: "Una stanza che suona come il sud",
        mode: "overhear",
        scene:
          "Un gol, un boato, accenti che potrebbero essere la scala del cugino. Più caldo del portico di qualche grado. Potresti entrare. Il mestiere è sapere cosa è cambiato, e cosa no.",
        teach:
          "La stanza è cambiata, quindi puoi scaldarti con la stanza. La via in cui rientrerai no. E nessuno qui ti ha offerto la soglia di un cugino. Un caffè, grazie è ancora tutto il saluto.",
        prompt: "Cosa è appena diventato possibile?",
        choices: [
          {
            text: "Puoi stare al volume di questa stanza, perché questa stanza è più forte. Non te lo porti sotto i portici, e non saluti gli sconosciuti come se ti avessero cucinato la cena.",
            tone: "fit",
            feedback:
              "Se entri: «Un caffè, grazie.» Se qualcuno chiede di dove sei, una città e un numero di settimane, poi, se la stanza è davvero calda, puoi chiedere se sono di qui o del sud. Lo chiedi perché li hai sentiti. È la versione avanzata. Non è ancora la soglia.",
          },
          {
            text: "Questa è l'Italia vera, e la strada quieta era un fallimento. Devi restare e dirlo.",
            tone: "near",
            feedback:
              "Hai appena cancellato Torino perché non era Lecce. La stanza rumorosa è vera. Il portico è vero. Chiamarne uno un fallimento è il modo in cui chi viaggia smette di ascoltare.",
          },
          {
            text: "Il volume è sbagliato in questa città. Ordini sottovoce, e te ne vai se qualcuno ride.",
            tone: "cold",
            feedback:
              "Hai imparato la brevità e l'hai applicata come una legge contro la gioia. Il portico ha un volume. Questo bar ne ha un altro. Il registro segue la stanza in cui sei davvero.",
          },
        ],
      },
      {
        id: "ritorno-4",
        short: "il vocale",
        place: "Sotto i portici, prima della stazione",
        who: "Marta, che lo sentirà dopo",
        mode: "answer",
        scene:
          "Il telefono è in mano. È lei il motivo per cui a Lecce c'era una porta. La teoria non le serve. Lo sapeva lei, prima che tu avessi le parole.",
        teach:
          "Tre frasi: dove sei, cos'è successo, e una cosa vera sul volume della città. La tesi resta in tasca. Anche il verdetto contro Torino. Lei vuole la sera.",
        prompt: "Cosa le mandi?",
        choices: [
          {
            text: "Ti aggiorno: ho confrontato il registro salentino e quello torinese in diversi contesti.",
            tone: "cold",
            feedback:
              "Vero, e inutile per lei. Confrontare i registri è quello che questa mappa ha fatto a te. Dirlo così la mette in platea a un tema. È un'amica.",
          },
          {
            text: "Sono sotto i portici, piove un po'. La mamma di Marco mi ha fatto le orecchiette. Ti racconto domani, che qui di sera si parla più piano.",
            tone: "fit",
            feedback:
              "Un posto, un piatto, una promessa, e tutto il tema in una frase: si parla più piano. Non hai dichiarato un vincitore. Hai suonato come una persona che ha camminato.",
          },
          {
            text: "Torino è morta, non parla nessuno. Salvami. Lecce è l'unica Italia vera.",
            tone: "near",
            feedback:
              "Hai tradito il portico per far piacere al sud, e le hai chiesto di salvarti da una città che è stata attenta con te. Troppo vicino a Lecce è ancora troppo vicino. Guarda solo dall'altra parte.",
          },
        ],
      },
    ],
  },
];

export const strolls: Stroll[] = [...lecce, ...turin];

export function say(line: Spoken, gender: Gender): string {
  return typeof line === "string" ? line : line[gender];
}

export function getStroll(slug: string): Stroll | undefined {
  return strolls.find((stroll) => stroll.slug === slug);
}

export function nightLabel(n: number): string {
  return String(n).padStart(2, "0");
}

export function walkedThrough(finished: readonly string[]): string[] {
  const out: string[] = [];
  for (const stroll of strolls) {
    if (!finished.includes(stroll.slug)) break;
    out.push(stroll.slug);
  }
  return out;
}

export function tonightOf(finished: readonly string[]): Stroll | null {
  const done = new Set(walkedThrough(finished));
  return strolls.find((stroll) => !done.has(stroll.slug)) ?? null;
}

export function neighborStroll(slug: string, step: -1 | 1): Stroll | null {
  const index = strolls.findIndex((stroll) => stroll.slug === slug);
  if (index < 0) return null;
  return strolls[index + step] ?? null;
}

function assertSpoken(value: Spoken | undefined, where: string) {
  if (value == null || typeof value === "string") return;
  if (!value.f || !value.m) {
    throw new Error(`Missing agreement at ${where}`);
  }
}

function assertCurriculum() {
  const slugs = new Set<string>();
  if (strolls.length !== 12) {
    throw new Error(`Expected 12 strolls, found ${strolls.length}`);
  }
  strolls.forEach((stroll, index) => {
    if (stroll.number !== index + 1) {
      throw new Error(`Number mismatch at ${stroll.slug}`);
    }
    if (slugs.has(stroll.slug)) throw new Error(`Duplicate ${stroll.slug}`);
    slugs.add(stroll.slug);
    const expectedTown = index < 6 ? "lecce" : "turin";
    if (stroll.town !== expectedTown) {
      throw new Error(`Town mismatch at ${stroll.slug}`);
    }
    if (stroll.stops.length !== 4) {
      throw new Error(`Expected 4 stops at ${stroll.slug}`);
    }
    stroll.stops.forEach((stop) => {
      assertSpoken(stop.heard, stop.id);
      if (stop.choices.length !== 3) {
        throw new Error(`Expected 3 choices at ${stop.id}`);
      }
      const fits = stop.choices.filter((choice) => choice.tone === "fit");
      if (fits.length !== 1) throw new Error(`Expected one fit at ${stop.id}`);
      stop.choices.forEach((choice) => assertSpoken(choice.text, stop.id));
    });
  });
}

assertCurriculum();
