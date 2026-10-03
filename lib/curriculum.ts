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
  fit: "The right distance",
  cold: "Grammatical, and cold",
  near: "Too close",
};

export const moves: Record<
  Mode,
  { it: string; en: string; text: string }
> = {
  overhear: {
    it: "Ascolta",
    en: "Overhear",
    text: "Someone speaks. You decide what they meant, including what they left unsaid.",
  },
  answer: {
    it: "Rispondi",
    en: "Answer",
    text: "You have to say something. The textbook line is often sitting right there, and it is often the cold one.",
  },
  notice: {
    it: "Leggi",
    en: "Notice",
    text: "A window, a church door, a notice board. Written Italian has registers too.",
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
    kicker: "One evening, six walks",
    blurb:
      "You are from Rome. Marta, who grew up here, has told her cousin to expect you. It is a single evening, and you can't skip from the bus to the dinner. It starts at Piazza Sant'Oronzo and ends when they walk you back down to the street. Warmth is the habit of that evening: time, food, and ciao given early. Match it, and don't outrun the person who offered it.",
  },
  turin: {
    id: "turin",
    name: "Turin",
    region: "Piemonte",
    kicker: "Three nights, under the arcades",
    blurb:
      "The first night is arrival: via Po in the rain, an aperitivo with Marco, and the key Giulia left you. On another day a desk near Piazza San Carlo still says lei. On a later night his mother arrives from Lecce, and you walk back to Porta Nuova. Marco's tu is his, not the city's. Courtesy is often a shorter sentence. The Lecce habit of adding one more is the mistake to watch.",
  },
};

export const threshold = {
  kicker: "The night train north",
  text: "From here the evening starts earlier and the sentences get shorter. Warmth is still available. A person offers it. The street no longer does it for you.",
};

export const contrasts: { label: string; lecce: string; turin: string }[] = [
  {
    label: "Greeting",
    lecce:
      "Longer, sooner, warmer. Ciao belongs to people inside the evening, not to the driver ending his shift.",
    turin:
      "Shorter, and the short version is the polite one. Buonasera can be the whole conversation.",
  },
  {
    label: "Tu",
    lecce:
      "Often given the same night, sometimes with a reason: dammi del tu, se no sembriamo in comune.",
    turin:
      "Held until one person offers it. Marco's tu is not the office's tu. The elevator does not vote.",
  },
  {
    label: "Food",
    lecce:
      "An instant no can refuse the person. Taste first. The soft no comes with praise, and a small joke so the offer is received as affection.",
    turin:
      "Food at aperitivo belongs to the drink. A piled plate imports a Lecce table into the wrong ritual.",
  },
  {
    label: "The cold sentence",
    lecce:
      "Town-hall lei after you were asked to come closer. A language certificate where a tease was supposed to go.",
    turin:
      "The extra sentence of enthusiasm nobody requested. A thesis, where a returned glove only needed grazie.",
  },
  {
    label: "Leaving",
    lecce:
      "They walk you down. You let them. In the street the cousin drops back to tu, and the last line is short because the walk was long.",
    turin:
      "You are released after buona serata. Staying in order to seem warmer means you didn't hear the ending.",
  },
];

const lecce: Stroll[] = [
  {
    slug: "arrivo-in-piazza",
    number: 1,
    town: "lecce",
    title: "Arrivo in piazza",
    time: "19:05",
    place: "The bus into Piazza Sant'Oronzo",
    skill: "Three distances of greeting, before you have said anything clever.",
    promise:
      "The first night is only arrivals. Driver, stranger, child, desk. Each one is a different length of sentence.",
    stops: [
      {
        id: "arrivo-1",
        short: "the driver",
        place: "The last step of the bus",
        who: "The driver, end of a shift",
        mode: "answer",
        scene:
          "The stone is still warm and the piazza is already full. He has one hand on the door. He is finished with the route. He is not beginning your evening.",
        heard: "Attenzione al gradino.",
        heardFrom: "The driver",
        gloss: "Watch the step. A fact, not a welcome.",
        teach:
          "Ciao is for people inside your evening. He gets a short thanks and buonasera. A speech thanks him for a relationship you don't have.",
        prompt: "What do you say as you step down?",
        choices: [
          {
            text: "Grazie, buonasera.",
            tone: "fit",
            feedback:
              "Short, and finished. He can close the door. You have been polite without asking him to host you.",
          },
          {
            text: "Ciao, grazie mille, sei gentilissimo!",
            tone: "near",
            feedback:
              "Ciao and a compliment pull him into your night. He is in uniform, at the end of the route. Warmth this size is work for him.",
          },
          {
            text: "La ringrazio per il servizio di trasporto.",
            tone: "cold",
            feedback:
              "Grammatical, and it sounds like a form. The step only needed grazie. Buonasera is what makes it human without making it a speech.",
          },
        ],
      },
      {
        id: "arrivo-2",
        short: "the woman with the dog",
        place: "The edge of the piazza",
        who: "A woman older than you, walking a dog",
        mode: "answer",
        scene:
          "You got off one stop early. She is not in a hurry, and she is not your friend. The dog has already decided about you. She hasn't.",
        teach:
          "A stranger older than you gets mi scusi and a short question. Ciao, or a barked place-name, spends a closeness she didn't offer.",
        prompt: "How do you ask for the piazza?",
        choices: [
          {
            text: "Scusa, Sant'Oronzo?",
            tone: "near",
            feedback:
              "Tu, and half a sentence. It can be fine with someone your age who is already talking to you. She is neither.",
          },
          {
            text: "Mi scusi, per Piazza Sant'Oronzo?",
            tone: "fit",
            feedback:
              "She says: «Sempre dritto, cinque minuti. Buona serata.» You answer «Grazie, gentilissima. Buona serata.» The exchange is complete. You don't add your origin story as a tip.",
          },
          {
            text: "Buonasera, sarebbe possibile ottenere un'indicazione per la piazza principale?",
            tone: "cold",
            feedback:
              "Correct, and it asks her to stand through a small ceremony. Mi scusi plus the name of the place is the living version of the same politeness.",
          },
        ],
      },
      {
        id: "arrivo-3",
        short: "the boy",
        place: "The open stone of the piazza",
        who: "A boy of about ten",
        mode: "answer",
        scene:
          "A ball stops against your shoe. He is already jogging over, sure you will give it back, because in this piazza people do.",
        heard: "Me la tiri?",
        heardFrom: "The boy",
        gloss: "Will you throw it to me? Tu, from a child, which is the right distance.",
        teach:
          "Lei aimed at a child is not extra polite. It ignores his age. Tieni is the whole reply. You don't keep him for a conversation.",
        prompt: "What do you say as you throw it?",
        choices: [
          {
            text: "Tenga.",
            tone: "cold",
            feedback:
              "Tenga is what a man in Turin will say when he hands you a dropped glove. A ten-year-old gets tieni. Politeness that ignores who is in front of you is its own coldness.",
          },
          {
            text: "Un attimo, prima dimmi come ti chiami.",
            tone: "near",
            feedback:
              "He asked for the ball, not for an exchange. Holding a child in your Italian practice is the too-close version of a kind moment.",
          },
          {
            text: "Tieni.",
            tone: "fit",
            feedback:
              "Tu back to a child, and nothing added. He is already turning toward his game. That is the goodbye.",
          },
        ],
      },
      {
        id: "arrivo-4",
        short: "the desk",
        place: "A small hotel just off the piazza",
        who: "The man at the desk, in his sixties",
        mode: "answer",
        scene:
          "The lobby is one lamp and a fan. Marta booked the room under her surname, Elia. He has not decided to like you yet. Liking you is not required for the key.",
        teach:
          "A desk gets buonasera, the name on the booking, and no ciao. You are a guest with a reservation, not a nephew walking into a kitchen.",
        prompt: "How do you open?",
        choices: [
          {
            text: "Buonasera. Ho una prenotazione a nome Elia.",
            tone: "fit",
            feedback:
              "He can find the reservation. If he moves to tu later, that is his door to open. You don't start on the other side of it.",
          },
          {
            text: {
              f: "Ciao! C'è una camera? Sono quella di Marta.",
              m: "Ciao! C'è una camera? Sono quello di Marta.",
            },
            tone: "near",
            feedback:
              "Ciao, plus being «Marta's person,» asks a stranger to treat you as family before he has even found the booking. The surname was the warm thing Marta already did for you.",
          },
          {
            text: "Salve. Vorrei effettuare il check-in della prenotazione.",
            tone: "cold",
            feedback:
              "Check-in is airport Italian. A one-lamp lobby in Lecce runs on buonasera and a surname. Same information, none of the counter between you.",
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
    place: "A bar just off Piazza Sant'Oronzo",
    skill: "The counter is a greeting, not a table you host.",
    promise:
      "Your first coffee is standing up. The long version of a polite order marks you as outside the room.",
    stops: [
      {
        id: "caffe-1",
        short: "counter or table",
        place: "The doorway of the bar",
        who: "The room, and a man already at the counter",
        mode: "notice",
        scene:
          "Two small tables by the window, both empty. The life of the place is a line of elbows at the zinc. You were about to sit, because sitting looks respectful.",
        heard: "Un caffè.",
        heardFrom: "A man at the counter",
        gloss: "A coffee. No greeting, no conditional, no speech. He will add buonasera if he meets someone's eyes. The order itself is this short.",
        teach:
          "The first coffee is a greeting said standing up. A table is for people who are staying. Sitting down to be polite misreads the room.",
        prompt: "What is the room telling you?",
        choices: [
          {
            text: "Sit. Taking a table shows you honor the place, and you can order properly once you are settled.",
            tone: "near",
            feedback:
              "The table is an honor you are paying to your own idea of a café. The room's honor is knowing where people stand for one euro and twenty.",
          },
          {
            text: "Leave. A place without menus is not set up for someone who wants to sit and learn.",
            tone: "cold",
            feedback:
              "You just declined the actual classroom. The counter is the lesson. Menus come later, in rooms that are trying to be something else.",
          },
          {
            text: "Stand at the counter. This coffee is a greeting, not a sitting. The table is for when you are staying.",
            tone: "fit",
            feedback:
              "You step up. When it is your turn, the whole order is «Un caffè, per favore.» Vorrei is correct Italian and, for this cup, slightly ceremonial.",
          },
        ],
      },
      {
        id: "caffe-2",
        short: "where you're from",
        place: "The counter",
        who: "The barista, about your age",
        mode: "answer",
        scene:
          "He has clocked the accent and the hesitation, and he is not unkind. The machine is loud. He asks between cups, not as an interview.",
        heard: "Tu di dove sei?",
        heardFrom: "The barista",
        gloss: "Where are you from? He used tu. You can return it. He did not ask for your project.",
        teach:
          "Tu can come back to him. Your biography cannot. A city, the fact of a first night, and a question returned: that is the size of this pause.",
        prompt: "What do you give him?",
        choices: [
          {
            text: "Di Roma. Prima sera. Tu sei di qui?",
            tone: "fit",
            feedback:
              "He gets a place, a tense, and the turn. He'll probably say he's from here and then call the next coffee. You will have had a conversation.",
          },
          {
            text: "Provengo dal Lazio e mi trovo a Lecce per un soggiorno linguistico.",
            tone: "cold",
            feedback:
              "You answered a bar with a cover letter. He used tu and a four-word question. The coldness is the distance between those two sizes.",
          },
          {
            text: "Di Roma. Dai, raccontami Lecce, ho tutta la sera.",
            tone: "near",
            feedback:
              "You handed him your whole evening and took his. He is working. Curiosity can wait until he is still, if he ever is.",
          },
        ],
      },
      {
        id: "caffe-3",
        short: "the board",
        place: "The chalkboard over the machine",
        who: "The board, then you",
        mode: "answer",
        scene:
          "Under the specials, in a hurried hand: pasticciotto crema, pasticciotto nutella, caffè in ghiaccio con latte di mandorla. You know crema. You don't need a lecture to order.",
        teach:
          "Pointing is fluent. One real question is fluent. A request for the history of each typical product turns a craving into a presentation you are giving him.",
        prompt: "How do you order?",
        choices: [
          {
            text: "Il solito.",
            tone: "near",
            feedback:
              "Il solito is intimacy: a usual, earned by coming back. On night two it pretends a history with the bar you haven't had.",
          },
          {
            text: "Questo, con la crema. Grazie.",
            tone: "fit",
            feedback:
              "You pointed. If you want one true question, it is «Il pasticciotto è quello con la crema?» He will say yes, or nutella, and you will choose. That is the whole dictionary.",
          },
          {
            text: "Mi può spiegare la storia e gli ingredienti di ogni dolce?",
            tone: "cold",
            feedback:
              "He can, and he will like his city less by the end of it. The board is an offer, not a syllabus. Point, then ask the one thing you actually need.",
          },
        ],
      },
      {
        id: "caffe-4",
        short: "paying",
        place: "The same counter, cup empty",
        who: "The barista",
        mode: "answer",
        scene:
          "Coins, a small saucer, the next person already half in your place. He isn't dismissing you. He is putting you in the town's future.",
        heard: "Un euro e venti. A dopo.",
        heardFrom: "The barista",
        gloss: "One euro twenty. See you later. In a town this size, a dopo is a reasonable assumption, and a friendly one.",
        teach:
          "You return a dopo. You don't praise the service, and you don't promote him to a confidant. The warmth was already in the assumption that you'll be back.",
        prompt: "What do you leave on?",
        choices: [
          {
            text: "A dopo, bellissimo, sei un amore.",
            tone: "near",
            feedback:
              "He wished you a later. You answered with a pet name. The friendliness was already at the right size, and you enlarged it until it got strange.",
          },
          {
            text: "Arrivederci e grazie per l'ottimo servizio.",
            tone: "cold",
            feedback:
              "Ottimo servizio is a review, not a goodbye. A dopo was a hand he held out. Arrivederci puts the hand back in a uniform.",
          },
          {
            text: "A dopo. Grazie.",
            tone: "fit",
            feedback:
              "You accepted the assumption. Tomorrow, if you come back, you have earned a little more of il solito. Not tonight.",
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
    skill: "Reading what was written for neighbors, and refusing a dress without refusing a friend.",
    promise:
      "The shops are half-closing. The notes in the windows are not for tourists, and the judgments in front of them are half-finished on purpose.",
    stops: [
      {
        id: "vetrina-1",
        short: "the note",
        place: "A locked shop door",
        who: "A handwritten card",
        mode: "notice",
        scene:
          "The lights are off and a card is taped inside the glass, written with a pen that was running out. Someone passing will understand it immediately. You are deciding whether to be annoyed.",
        heard: "Torno subito. Sono al bar.",
        heardFrom: "The card",
        gloss: "Back in a minute. I'm at the bar. Not a schedule. A neighbor's note.",
        teach:
          "This is closed for the length of a coffee. It isn't a contract you can be injured by, and it isn't an invitation to go find the speaker.",
        prompt: "What kind of writing is this?",
        choices: [
          {
            text: "A note to neighbors. The shop is paused, not insulting you. Come back, or don't. The bar is not a meeting she scheduled with you.",
            tone: "fit",
            feedback:
              "You read the trust in it: she told the street where she is. That is warmth on paper. It still isn't a conversation she opened with a stranger.",
          },
          {
            text: "Unprofessional. The right feeling is annoyance, and the right lesson is that some businesses don't respect customers.",
            tone: "cold",
            feedback:
              "You imported a chain-store rule into a one-person shop. The card would be cold in a station. On this street it is how the street works.",
          },
          {
            text: "An invitation. You should find her at the bar and continue the conversation the card started.",
            tone: "near",
            feedback:
              "The card started a conversation with people who already know which bar. Joining it as a stranger turns her errand into your scene.",
          },
        ],
      },
      {
        id: "vetrina-2",
        short: "the dress",
        place: "The next window",
        who: "Two women, one of them in a dress she's unsure about",
        mode: "overhear",
        scene:
          "They aren't whispering. They also aren't finishing their sentences. You catch it because you've stopped pretending to study the mannequin.",
        heard: "Mah. Il colore, non lo so.",
        heardFrom: "The woman in the dress, after her friend said «Secondo me ti sta bene.»",
        gloss: "Mah. The color, I don't know. Mah plus an unfinished thought is the judgment.",
        teach:
          "She is refusing the dress without refusing her friend. The no lives in mah and in the sentence she doesn't complete. A clean «è brutto» would be a different, colder friendship.",
        prompt: "What is she saying?",
        choices: [
          {
            text: "She wants the dress and is working up to the price.",
            tone: "cold",
            feedback:
              "You heard the words and missed the particle. Mah is the no. The unfinished color is how she keeps the friend while dropping the dress.",
          },
          {
            text: "She is turning the dress down, and leaving her friend intact. The refusal is in mah and in what she doesn't finish.",
            tone: "fit",
            feedback:
              "If a shopkeeper later asks you, the same shape works: «Mah, non sono convinta. Il colore, forse.» You don't have to produce a verdict to be clear.",
          },
          {
            text: "Her friend has insulted her, and mah is the start of a fight.",
            tone: "near",
            feedback:
              "«Ti sta bene» was a gift. Mah returns the gift without breaking it. Hearing a fight here means you only recognize disagreement when it is loud.",
          },
        ],
      },
      {
        id: "vetrina-3",
        short: "pittule",
        place: "A fryer's window further down",
        who: "A woman next to you, and a sign",
        mode: "answer",
        scene:
          "The sign says only «Pittule calde solo stasera.» You don't know the word. She watches you fail to know it, and decides to be the dictionary. She is already a little pleased.",
        heard: "Sono frittelle. Se non le hai mai prese, prendile.",
        heardFrom: "The woman beside you",
        gloss: "They're fritters. If you've never had them, have them. Pittule are the Salento version, sold hot.",
        teach:
          "You are not tested on the word. You are tested on letting her be the dictionary without turning her advice into a debt or a seminar.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Potrebbe fornirmi una definizione più precisa?",
            tone: "cold",
            feedback:
              "She already defined it, in the only way the moment needed: what it is, and what you should do. A finer definition sends her back to work she had finished.",
          },
          {
            text: "Allora sì. Grazie.",
            tone: "fit",
            feedback:
              "You took the advice and the translation. If you want the word in your mouth, you can say pittule when you order. You don't make her repeat the lesson.",
          },
          {
            text: "Solo se me le offri tu.",
            tone: "near",
            feedback:
              "She offered knowledge, not a round. Turning advice into a debt is how a friendly street gets wary of visitors.",
          },
        ],
      },
      {
        id: "vetrina-4",
        short: "she comes back",
        place: "The shop with the card, ten minutes later",
        who: "The shopkeeper",
        mode: "answer",
        scene:
          "You did come back. She is unlocking the door with the energy of someone who knows exactly how this looks and is not going to perform guilt at the size of a corporation.",
        heard: "Eh, scusate, ero di là.",
        heardFrom: "The shopkeeper",
        gloss: "Sorry, I was over there. Scusate, you-plural, said to one customer: a softener, not a mistake about how many of you there are. It is also not an offer of tu.",
        teach:
          "Ma figurati releases her. Then you do the thing you came for. A complaint treats a coffee as a broken contract. A sudden tu treats her softener as intimacy.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Ho aspettato. Non è serio.",
            tone: "cold",
            feedback:
              "Seriousness, in this register, is a train station. She told the street where she was. You came back. The relationship is already repaired, if you let it be.",
          },
          {
            text: "Tranquilla, tu che fai di bello stasera?",
            tone: "near",
            feedback:
              "Tu, plus a claim on her evening. Her scusate was a softener, not a key. You just walked into a life she didn't put on the card.",
          },
          {
            text: "Ma figurati. Posso vedere quella borsa?",
            tone: "fit",
            feedback:
              "You cancelled the debt and named the object. She can go back to being a shop. That is the friendly outcome.",
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
    skill: "Solemn register. A short mi dispiace. Letting help stay small.",
    promise:
      "Two papers on one door: a death and a lost cat. The evening teaches you they do not ask for the same behavior, even if you can parse both.",
    stops: [
      {
        id: "porta-1",
        short: "the notice",
        place: "The church door",
        who: "A printed funeral notice",
        mode: "notice",
        scene:
          "The paper is fresh, the photograph formal, the formula one you may have met in a textbook under «annunci funebri.» People passing slow down and do not stop. Nobody is reading it aloud.",
        heard:
          "È mancato all'affetto dei suoi cari il signor Antonio Greco, di anni 84. I funerali si terranno domani alle ore 16 nella Basilica di Santa Croce.",
        heardFrom: "The notice",
        gloss: "The standard formula: he has died, loved by his people, at 84. The funeral is tomorrow at four, here.",
        teach:
          "You can understand it and still not use it. No photograph for the group chat, no asking a stranger to turn a death into your lesson.",
        prompt: "What do you do with a text like this?",
        choices: [
          {
            text: "Read it silently, and leave it on the door. It is not a sample sentence, and it is not your entrance.",
            tone: "fit",
            feedback:
              "Understanding the formula is the skill. Extracting it is the failure. If someone later asks what you were looking at: «Un avviso. Non lo conoscevo.» Then stop.",
          },
          {
            text: "Photograph it. Formal Italian this clean is exactly what your notes are missing.",
            tone: "cold",
            feedback:
              "You turned a family's notice into courseware. The grammar will still be in your book tonight. The paper is doing a different job.",
          },
          {
            text: "Go inside and offer condolences to whoever is there, so the family feels accompanied.",
            tone: "near",
            feedback:
              "You don't know the dead, and the people inside haven't asked a stranger for company. Invented intimacy at a church door is not kindness. It is a scene.",
          },
        ],
      },
      {
        id: "porta-2",
        short: "the priest",
        place: "The steps",
        who: "The priest, passing",
        mode: "answer",
        scene:
          "He nods, the way people nod when they have already greeted the whole street once this hour. He is not slowing down. The basilica behind him is famous. He knows.",
        teach:
          "A nod from a priest who isn't stopping gets buonasera and nothing else. A question about the building turns him into a guide he didn't volunteer to be.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Ciao padre, bellissima questa chiesa. Da quando è qui?",
            tone: "near",
            feedback:
              "Ciao, a compliment, and a biographical question, all for a man mid-step. You asked him to host the monument and himself.",
          },
          {
            text: "Buonasera.",
            tone: "fit",
            feedback:
              "He answers «Buonasera» and continues. The exchange is the nod, said aloud. You let the church be a church and not a prompt.",
          },
          {
            text: "Salve, potrebbe illustrarmi la storia della basilica?",
            tone: "cold",
            feedback:
              "A fair question for a desk that exists to answer it. He was walking. The conditional of courtesy doesn't create a tour that wasn't offered.",
          },
        ],
      },
      {
        id: "porta-3",
        short: "the cat",
        place: "The same door, lower down",
        who: "A handwritten note",
        mode: "notice",
        scene:
          "Under the funeral paper, taped a little crooked: different pen, different stakes. You can feel that this one is allowed to be warm, and that reading them in the same voice would be a mistake.",
        heard:
          "È scomparsa Nina, gatta tigrata, zona Sant'Oronzo. Chi la vede lascia detto al bar di Mimmo.",
        heardFrom: "The note",
        gloss: "Nina, a tabby, is missing around Sant'Oronzo. If you see her, leave word at Mimmo's bar.",
        teach:
          "Same door, different distance. The cat can be spoken about warmly. The funeral cannot. If you had seen Nina, the next stop is the bar, not the priest.",
        prompt: "What changes between the two papers?",
        choices: [
          {
            text: "Nothing. Both are private, so the kind move is to ignore the cat as well.",
            tone: "cold",
            feedback:
              "You flattened two registers into one rule. The cat note is asking the street for help. The funeral notice is not asking you for anything.",
          },
          {
            text: "The cat can be warm and practical. The funeral stays quiet. Same door, different behavior. Nina, if you saw her, goes to the bar.",
            tone: "fit",
            feedback:
              "You let the paper tell you the distance. That is the whole skill of Leggi: the Italian is not one temperature.",
          },
          {
            text: "Both are local color. Reading them aloud is good pronunciation practice, as long as you are respectful.",
            tone: "near",
            feedback:
              "Respectful extraction is still extraction. One of these papers asked for a witness. The other asked to be left in a low voice. Aloud serves neither.",
          },
        ],
      },
      {
        id: "porta-4",
        short: "mi dispiace",
        place: "Beside the notice",
        who: "A woman who saw you hesitate on the formula",
        mode: "answer",
        scene:
          "She speaks more quietly than the piazza. She is not crying. She is deciding, quickly, whether you are a person who can be told a small true thing.",
        heard: "È il papà di un'amica mia. Ieri.",
        heardFrom: "The woman",
        gloss: "It's my friend's father. Yesterday. Un'amica mia: the possessive after the noun, a southern rhythm. She stays on lei with you when she goes on.",
        teach:
          "Mi dispiace, and then room. A long offer of support from a stranger is a speech about your own kindness. She did not hand you the family.",
        prompt: "What do you answer?",
        choices: [
          {
            text: "Mi dispiace tanto. Se ha bisogno di qualsiasi cosa, io ci sono.",
            tone: "cold",
            feedback:
              "The grammar of empathy, at a length that makes her manage you. You didn't know him. «Io ci sono» recruits you into a role she didn't offer.",
          },
          {
            text: "Mi dispiace.",
            tone: "fit",
            feedback:
              "Then you stop. Because you did, she may add, still on lei: «Lei non è di qui. Domenica, la messa delle sette è cantata, se vuole.» The fitting reply is «Grazie. Forse domenica.» You do not switch to tu. Her kindness was not that invitation.",
          },
          {
            text: "Oh no. Ma che è successo? Era malato? Posso venire al funerale?",
            tone: "near",
            feedback:
              "Three questions and a self-invitation. You turned her one sentence into an interview and a place for yourself. The funeral is not a room you enter by being moved.",
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
    place: "A stairwell near Porta Napoli",
    skill: "Register follows who is in the scene, not who you are.",
    promise:
      "Marta's cousin gives you tu at the door. On the landing, a neighbor appears and his Italian straightens. You have to go with him, and come back when she leaves.",
    stops: [
      {
        id: "cugino-1",
        short: "the doorway",
        place: "His door",
        who: "Marta's cousin, your age",
        mode: "answer",
        scene:
          "He is already smiling in the way of someone who has been told you exist. The apartment behind him smells like dinner that assumed you were staying. He doesn't do a formal hello. He warns you not to.",
        heard:
          "Ehi, finalmente. Entra, non fare complimenti. E dammi del tu, eh. Marta ha detto che un po' parli.",
        heardFrom: "The cousin",
        gloss: "Finally. Come in, don't stand on ceremony, and use tu with me. Marta said you speak a little. Non fare complimenti means: don't perform the guest.",
        teach:
          "He set the distance out loud. Lei now is not respect. It refuses a gift he just put in your hand. Matching him is not the same as being careless.",
        prompt: "What do you say on the threshold?",
        choices: [
          {
            text: "Buonasera. Piacere di conoscerla. La ringrazio dell'invito.",
            tone: "cold",
            feedback:
              "He will laugh, not unkindly, and repeat himself: dammi del tu. You answered the person you expected, not the person in the door.",
          },
          {
            text: {
              f: "Ciao. Un po' sì. Grazie di avermi aspettata.",
              m: "Ciao. Un po' sì. Grazie di avermi aspettato.",
            },
            tone: "fit",
            feedback:
              "Tu, a small truth, a thanks. You didn't apologize for existing and you didn't inventory your grammar. He can let you in.",
          },
          {
            text: "Apri, muoio di fame. Marta non mi ha detto niente.",
            tone: "near",
            feedback:
              "Tu was offered. A complaint and a claim on the fridge were not. Too close skips the step where you actually arrive.",
          },
        ],
      },
      {
        id: "cugino-2",
        short: "the stairs",
        place: "Half a flight down",
        who: "Signora Lina, seventies, with a bag",
        mode: "answer",
        scene:
          "She appears from the floor below and his whole sentence changes temperature. You feel it in your mouth before you understand it. He has not become a different man. The scene gained a person.",
        heard: {
          f: "Buonasera, signora Lina. Le do una mano? Le presento l'amica di Marta.",
          m: "Buonasera, signora Lina. Le do una mano? Le presento l'amico di Marta.",
        },
        heardFrom: "The cousin",
        gloss: "Good evening. Can I help you with that? This is Marta's friend. He speaks to her on lei, and he presents you inside that same distance.",
        teach:
          "The warmth of the doorway is not transferable. She gets buonasera and piacere. Ciao plus her name spends his relationship as if it were yours.",
        prompt: "She looks at you. What do you say?",
        choices: [
          {
            text: "You stay a step behind and say nothing. He is handling it.",
            tone: "cold",
            feedback:
              "He included you. Silence makes you luggage, and it leaves her greeting an absence. One buonasera puts you in the scene at her distance.",
          },
          {
            text: "Buonasera. Piacere.",
            tone: "fit",
            feedback:
              "She says «Piacere» and refuses his help: «No, caro, ce la faccio.» Caro is hers for him, earned over years. It is not a pattern you copy tonight.",
          },
          {
            text: "Ciao Lina! Finalmente qualcuno, questo portone è un labirinto.",
            tone: "near",
            feedback:
              "You took the cousin's tu and aimed it at her, then added a complaint about her building. He will have to repair a small tear you didn't feel.",
          },
        ],
      },
      {
        id: "cugino-3",
        short: "the landing",
        place: "After she goes",
        who: "The cousin, tu again",
        mode: "answer",
        scene:
          "Her door closes two floors down. He exhales, not unkindly, and the Italian loosens back into the doorway version. He is letting you in on the rule, because you felt the switch and he saw you feel it.",
        heard: "È d'oro. Però se le dai del tu, ti sistema lei.",
        heardFrom: "The cousin",
        gloss: "She's gold. But if you say tu to her, she'll sort you out herself. Le is the formal her. Lei at the end is she.",
        teach:
          "You can show you understood without analyzing him. A joke that keeps the buonasera is the right size. A linguistic comment turns his neighbor into a case.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Allora il buonasera me lo tengo.",
            tone: "fit",
            feedback:
              "You joined the joke and accepted the rule. He doesn't have to become your teacher. He already was, for one flight of stairs.",
          },
          {
            text: "Interessante. Hai cambiato registro appena è arrivata una persona più distante.",
            tone: "cold",
            feedback:
              "True, and you said it like a footnote about his life. He offered you a warning, not a phenomenon. The coldness is making him the text.",
          },
          {
            text: {
              f: "Dai, la prossima volta le dico ciao, così vede che sono simpatica.",
              m: "Dai, la prossima volta le dico ciao, così vede che sono simpatico.",
            },
            tone: "near",
            feedback:
              "You heard the rule and volunteered to break it for charm. Simpatica is not the goal on her landing. Surviving her correction is not a cute story.",
          },
        ],
      },
      {
        id: "cugino-4",
        short: "the water",
        place: "His kitchen doorway",
        who: "The cousin",
        mode: "answer",
        scene:
          "He starts a sentence you don't catch. Salentino, fast, aimed at the fridge. He hears himself miss you, stops, and does the kind thing without making a class of it.",
        heard:
          "Aspetta, in italiano, se no non ci capiamo. Vuoi l'acqua o già un goccio di vino?",
        heardFrom: "The cousin",
        gloss: "Wait, in Italian, otherwise we won't understand each other. Water, or already a drop of wine? He translated himself. A goccio is an affectionate small pour.",
        teach:
          "You are not examined on the dialect. He already did the courtesy, which was switching. Ask for the first sentence later if you still want it, at the table, not as the price of a drink.",
        prompt: "What do you answer?",
        choices: [
          {
            text: "Puoi ripetere la prima parte e tradurla parola per parola?",
            tone: "cold",
            feedback:
              "You turned a glass of wine into a worksheet, in the doorway, while he was being careful. Later, if it still matters: «Prima, cos'è che hai detto?» That is curiosity with timing.",
          },
          {
            text: "No, solo dialetto tutta la cena, se no non vale.",
            tone: "near",
            feedback:
              "You asked him to perform his region for you. He had just gone out of his way so you wouldn't be locked out of the room.",
          },
          {
            text: "Un goccio. Grazie.",
            tone: "fit",
            feedback:
              "You answered the question he actually asked. The dialect is still in the house. It doesn't have to be your activity.",
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
    place: "The cousin's table, then the street",
    skill: "Refusal, teasing, and a goodbye that is allowed to take time.",
    promise:
      "His mother has decided you are eating. The cold move is a perfect no, said too fast, or a lei she has already retired.",
    stops: [
      {
        id: "cena-1",
        short: "the first plate",
        place: "The table",
        who: "His mother",
        mode: "answer",
        scene:
          "The plate is already in front of you. She is not asking whether you eat. She is telling you the distance she wants, and giving you the reason so you won't be brave and formal.",
        heard: "Mangia, su. E dammi del tu, se no sembriamo in comune.",
        heardFrom: "His mother",
        gloss: "Eat. And use tu with me, otherwise we sound like we're at the town hall.",
        teach:
          "She retired lei out loud. Keeping it is not respect anymore. Tu in return stays soft: thanks, and the food, with no joke aimed at her portions.",
        prompt: "What do you say?",
        choices: [
          {
            text: "La ringrazio, signora. Sono a posto così.",
            tone: "cold",
            feedback:
              "Lei, a title, and a no before you've tasted. You declined the dish and the distance in one breath. Sono a posto can be right later. It is not right at second zero, and not on lei after this sentence.",
          },
          {
            text: "Va bene, tu però calma con le porzioni.",
            tone: "near",
            feedback:
              "Tu was the invitation. Managing her cooking was not. You sounded like a peer correcting a host, which is a different room from the one she opened.",
          },
          {
            text: "Allora grazie. È buonissimo.",
            tone: "fit",
            feedback:
              "You took the tu and the plate. When she offers more, the soft no is allowed to arrive: «Davvero, è ottimo, ma sono a posto. Un altro po' e non mi alzo più.» The joke shows you received the offer as affection.",
          },
        ],
      },
      {
        id: "cena-2",
        short: "the uncle",
        place: "The same table",
        who: "An uncle, already amused",
        mode: "answer",
        scene:
          "He has been waiting for a harmless target and you are conveniently from the capital. The table is on your side. He wants a rally, not a surrender and not a diploma.",
        heard: "E l'italiano com'è? A Roma vi fanno studiare solo i libri?",
        heardFrom: "The uncle",
        gloss: "How's the Italian? In Rome do they only make you study books?",
        teach:
          "He opened a door so you could tease the gap. A certificate slams it. Crowning his city as «real Italy» turns his house into a postcard.",
        prompt: "What do you give him?",
        choices: [
          {
            text: "I libri sì. Le cene no.",
            tone: "fit",
            feedback:
              "You gave him the win and told the truth. The gap is the point. He can pour you more wine. Nobody has to be a symbol.",
          },
          {
            text: "Ho un livello intermedio certificato.",
            tone: "cold",
            feedback:
              "You answered a tease with a credential. The table goes briefly into the town hall his mother just banned. He wasn't asking what you can prove.",
          },
          {
            text: "Eh, per fortuna. Qui almeno si parla davvero.",
            tone: "near",
            feedback:
              "You flattered the room by flattening it, and insulted your own city to buy safety. He teased you so you could be a person, not a visitor awarding them authenticity.",
          },
        ],
      },
      {
        id: "cena-3",
        short: "the missed sentence",
        place: "The table, under noise",
        who: "His mother again",
        mode: "answer",
        scene:
          "A chair scrapes. You catch quanto and then nothing. She is looking at you, waiting for an answer you don't have. Nodding would be a lie with a smile on it.",
        teach:
          "You ask her to repeat, on tu, because she already closed the town hall. Mi scusi, può ripetere is the right line for an hour ago and the cold line now. Eh? is not the resized version. It is a drop.",
        prompt: "What do you say when you've lost the sentence?",
        choices: [
          {
            text: "Scusami, non l'ho presa. Me la ridici più piano?",
            tone: "fit",
            feedback:
              "Same politeness as mi scusi, cut to the distance she asked for. Non l'ho presa is honest. Piano gives her a way to help without a scene.",
          },
          {
            text: "Mi scusi, può ripetere per favore?",
            tone: "cold",
            feedback:
              "Perfect in the piazza, and a small reversal here. You put lei back on the table after she told you it made you both sound like an office. She may think she rushed you into something you didn't want.",
          },
          {
            text: "Eh?",
            tone: "near",
            feedback:
              "Sharp, and public. The noise was not her fault, and Eh? makes it sound like it was. Closeness still has a soft edge.",
          },
        ],
      },
      {
        id: "cena-4",
        short: "the stairs down",
        place: "The doorway, then the street",
        who: "All of them, walking you out",
        mode: "answer",
        scene:
          "You have your bag. They have their shoes on. Nobody is treating the door as an ending. In this apartment the goodbye includes the stair, and refusing the stair refuses the dinner.",
        heard: "Ti accompagniamo giù.",
        heardFrom: "The cousin",
        gloss: "We'll walk you down. Tu. It is not a question, and it is not optional in the way a textbook thinks.",
        teach:
          "Let yourself be walked. The thanks names the food and promises a return without declaring a family. A one-beat arrivederci is efficient and, here, cold. Loving them out loud on night one is the other error.",
        prompt: "What do you say on the way down?",
        choices: [
          {
            text: "Grazie. Arrivederci.",
            tone: "cold",
            feedback:
              "Right for a desk. They put their shoes on for you. A short corporate ending tells them the stair was unnecessary.",
          },
          {
            text: "Vi voglio bene. Siete la mia famiglia.",
            tone: "near",
            feedback:
              "You spent a feeling the evening hadn't earned, and you made them carry it. They were already being family-like. Announcing it turns their hospitality into your revelation.",
          },
          {
            text: "Grazie di tutto. Era tutto buonissimo. Torno, eh.",
            tone: "fit",
            feedback:
              "In the street he drops back to a quieter tu: «Ci sentiamo. E alla signora Lina, buonasera e basta.» You answer «Promesso. Notte.» The long goodbye was the walk. The last line is allowed to be short.",
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
    place: "The arcades of via Po",
    skill: "Courtesy as brevity. The conditional is for when someone must do something.",
    promise:
      "It is already night, and raining. The doorman, a stranger, a pharmacist, a door held open. Almost none of them want a second sentence.",
    stops: [
      {
        id: "portici-1",
        short: "the doorman",
        place: "A doorway on via Po",
        who: "The portiere",
        mode: "answer",
        scene:
          "Giulia's building. He has seen a hundred guests and he is not collecting origins. Rain is hitting the arcade just behind you. He is the person who knows which stair is B.",
        teach:
          "Buonasera, who you are going to, which floor, why you have a key. Then you stop. The Lecce habit of adding weather and your plans makes him do emotional labor on top of the door.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Buonasera. Salgo dai Rossi, terzo piano. Mi hanno lasciato le chiavi.",
            tone: "fit",
            feedback:
              "He says: «Scala B, a destra. Buonasera.» The second buonasera is the end. If you had asked about the rain he might have answered «Spesso,» and looked at the door until you heard it.",
          },
          {
            text: "Buonasera, che bel palazzo. Piove sempre così? Io resto qualche settimana.",
            tone: "near",
            feedback:
              "A compliment, the weather, your itinerary. You imported the length of a Lecce stairwell into a job he is trying to finish. Beauty of the building was not a question he asked.",
          },
          {
            text: "Salve. Devo accedere all'unità abitativa Rossi. Dispongo delle chiavi.",
            tone: "cold",
            feedback:
              "You spoke like a notice taped to his desk. He is a person, and the human version is shorter, not longer: buonasera, Rossi, third floor, keys.",
          },
        ],
      },
      {
        id: "portici-2",
        short: "the direction",
        place: "Under the arcade",
        who: "A man your age, walking the other way",
        mode: "answer",
        scene:
          "Your throat is already unhappy from the train. You need a pharmacy, not a relationship. He has earphones around his neck and the face of someone who will help and keep walking.",
        teach:
          "Mi scusi plus a present-tense question. Vorrei is for when the other person has to do something. A direction costs him one sentence. Don't make him stand through a conditional ceremony, and don't call him bello.",
        prompt: "How do you ask?",
        choices: [
          {
            text: "Vorrei sapere se esiste una farmacia nelle immediate vicinanze.",
            tone: "cold",
            feedback:
              "Exists, immediate vicinity: a phrasebook being careful. He only needed farmacia and qui vicino. The conditional didn't buy you any warmth. It bought you distance.",
          },
          {
            text: "Scusa bello, una farmacia?",
            tone: "near",
            feedback:
              "Tu and bello, for a stranger under the arcades. Brevity isn't the same as grabbing. Mi scusi is the part that makes the short question polite.",
          },
          {
            text: "Mi scusi, c'è una farmacia qui vicino?",
            tone: "fit",
            feedback:
              "He says: «Sì. In fondo al portico, a sinistra.» You say: «Grazie. Buona serata.» Four words back. The favor is paid.",
          },
        ],
      },
      {
        id: "portici-3",
        short: "the pharmacist",
        place: "The pharmacy at the end of the arcade",
        who: "The pharmacist",
        mode: "answer",
        scene:
          "This is the place the conditional was saved for. She is already on lei. She can refuse you, advise you, or sell you the wrong thing if you perform instead of asking.",
        heard: "Mi dica.",
        heardFrom: "The pharmacist",
        gloss: "Go ahead. Lei. An invitation to state the need, not to tell the trip.",
        teach:
          "Vorrei plus the need. She will ask «Ha febbre?» and «No, solo la gola» is the whole answer. Ciao and dammi is a different shop. Your learning journey is not a symptom.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Buonasera. Vorrei qualcosa per il mal di gola.",
            tone: "fit",
            feedback:
              "Need, conditional, done. You don't correct her lei and you don't explain the climate of Piemonte. She is good at throats. She is not your diary.",
          },
          {
            text: "Ciao, dammi una cosa per la gola.",
            tone: "near",
            feedback:
              "Tu and an imperative, to a professional who opened on lei. Dammi is what you say for a glass of water in the cousin's kitchen. This counter didn't offer it.",
          },
          {
            text: "Buonasera. Il clima piemontese mi ha provocato una lieve infiammazione.",
            tone: "cold",
            feedback:
              "You gave her a composition. Lieve infiammazione hides the useful word, gola, inside a performance of vocabulary. Vorrei qualcosa per il mal di gola is both clearer and warmer.",
          },
        ],
      },
      {
        id: "portici-4",
        short: "the door",
        place: "Back at the street door",
        who: "An older woman, stepping out as you step in",
        mode: "overhear",
        scene:
          "You hold the door because the closer is heavy. She passes close enough that her coat brushes the handle. What she owes this moment is one word, and she pays it exactly.",
        heard: "Grazie.",
        heardFrom: "The woman",
        gloss: "Thanks. Not an opening. A receipt.",
        teach:
          "In Lecce a held door often starts a sentence. Here the courtesy was the holding. Prego, buonasera closes it. A longer thanks from her would have meant something else, and it didn't arrive.",
        prompt: "What does her grazie oblige you to do?",
        choices: [
          {
            text: "End it. «Prego, buonasera.» The favor was the door. She has finished paying for it.",
            tone: "fit",
            feedback:
              "You let a small kindness stay small. That is not coldness. Coldness would be a speech about the gesture, or a silence that pretends she didn't speak.",
          },
          {
            text: "Continue. A grazie in passing is the first step. She is waiting for your name and how long you are staying.",
            tone: "near",
            feedback:
              "That is the Lecce door, remembered too literally. She used the shortest thanks in the language. Lengthening it is you talking to a city that isn't on this step.",
          },
          {
            text: "Apologize. Grazie here means you were in her way, and you should explain yourself until she is comfortable.",
            tone: "cold",
            feedback:
              "You heard a closed word as a complaint. She was precise, not wounded. An apology sequence makes her responsible for soothing you.",
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
    place: "A bar on Piazza Vittorio Veneto",
    skill: "Tu offered by a person. A small plate. One sentence that returns a round.",
    promise:
      "Marco has a table. He starts on tu. Nothing else about the city has changed: the buffet, the bill, and the praise still have a Turin size.",
    stops: [
      {
        id: "aperitivo-1",
        short: "the offer of tu",
        place: "The table he kept",
        who: "Marco, your age",
        mode: "answer",
        scene:
          "He stands up just enough to mark that you are the person he was waiting for, and not a ceremony. The piazza outside is loud with trams. In here he has already decided the distance.",
        heard: "Ho preso un tavolo in fondo. Ti va un aperitivo?",
        heardFrom: "Marco",
        gloss: "I got a table at the back. Do you want an aperitivo? Ti: he offered tu by using it, without a speech about offering it.",
        teach:
          "You can return this tu. It belongs to him, not to the doorman and not to the office you haven't entered yet. Volentieri is the whole yes. Don't thank him as if he were an institution.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Buonasera. La ringrazio per la disponibilità.",
            tone: "cold",
            feedback:
              "Lei, and disponibilità, which is a word for appointments. He handed you ti and a table. You handed him a front desk.",
          },
          {
            text: "Sì, volentieri.",
            tone: "fit",
            feedback:
              "Tu returned by not contradicting it, and a yes at the size of the question. You can sit. The evening has a person in it now.",
          },
          {
            text: "Certo. E dopo usciamo, dopo ti racconto tutta la vita.",
            tone: "near",
            feedback:
              "You accepted tu and then spent the next three hours of his evening without asking. Volentieri leaves him room. Your life story doesn't.",
          },
        ],
      },
      {
        id: "aperitivo-2",
        short: "the buffet",
        place: "The table, once the drinks are down",
        who: "Marco, explaining the food",
        mode: "notice",
        scene:
          "There is a spread along the counter that you clocked as a dinner menu. He nods toward it the way you nod toward something obvious, and you realize you were about to get it wrong in one of two directions.",
        heard: "Puoi prendere da mangiare, è compreso.",
        heardFrom: "Marco",
        gloss: "You can get food, it's included. Not: please eat a lot, my hospitality depends on it.",
        teach:
          "A modest plate. The food belongs to the drink. Lecce says an empty plate refuses a person. This ritual says a piled plate misreads a snack as a feast you are owed, or that you owe him.",
        prompt: "What does compreso ask of your plate?",
        choices: [
          {
            text: "Fill it. He pointed you to food, and leaving abundance untouched is rude. You learned this at the cousin's table.",
            tone: "near",
            feedback:
              "That rule was true last week, in a kitchen, said by a mother. Here the food is a clause inside a drink. Importing the full plate makes his city look like it failed at hosting.",
          },
          {
            text: "A small plate. It comes with the glass. You weren't asked to make a meal, and you weren't asked to refuse one.",
            tone: "fit",
            feedback:
              "You can say «Non lo sapevo. Allora prendo poco.» That sentence shows you learned the ritual without turning it into a bargain.",
          },
          {
            text: "Eat nothing. Touching included food looks greedy, and you are a guest in a reserved city.",
            tone: "cold",
            feedback:
              "You overcorrected into a fast. He told you the food is part of what he offered. Declining the whole counter makes the offer look like a trap you were too careful to enter.",
          },
        ],
      },
      {
        id: "aperitivo-3",
        short: "the round",
        place: "The table, when the bill appears",
        who: "Marco",
        mode: "answer",
        scene:
          "He doesn't display the paying. He just does it, with the ease of a decision made before you could start the Italian fight about Italian bills.",
        heard: "Faccio io.",
        heardFrom: "Marco",
        gloss: "I'll get this. Two words. The warmth is in the decision, not in a speech about the decision.",
        teach:
          "You don't wrestle him for five minutes, and you don't let the round vanish. The next one, named, is the whole return. Grazie alone keeps the favor. Insisto performs it.",
        prompt: "What do you say?",
        choices: [
          {
            text: "No, insisto, pago io, non si discute.",
            tone: "near",
            feedback:
              "The fight is a performance of generosity. He already closed the question. Reopening it tells him you don't trust a short kindness to be real.",
          },
          {
            text: "Perfetto, grazie.",
            tone: "cold",
            feedback:
              "Accurate, and finished too early. You accepted a round the way you accept a receipt. The missing half is the return: the next one has your name on it.",
          },
          {
            text: "Grazie. Il prossimo lo offro io.",
            tone: "fit",
            feedback:
              "One thanks, one promise, no wrestling. He can say «Va bene» and mean it. That sentence is the warmth. You don't also compliment his character.",
          },
        ],
      },
      {
        id: "aperitivo-4",
        short: "the praise",
        place: "The table, near the end",
        who: "Marco, and the room you actually like",
        mode: "answer",
        scene:
          "You like it more than the sentence you're about to allow yourself. The piazza, the hour, the fact of a table. In Lecce you would have said so at full volume. He is looking at the square, not at you, which is a kind of contentment.",
        teach:
          "One degree under what you feel. Bello, and the wish to come back. Fantastico plus a compliment to his taste asks him to host your enthusiasm. Gradevole is a brochure.",
        prompt: "What do you let out?",
        choices: [
          {
            text: "È incredibile, adoro questo posto, sei un genio per averlo scelto.",
            tone: "near",
            feedback:
              "Three sizes too big, and the last clause makes him responsible for your feelings. He chose a bar, not a revelation. Praise at that heat is work.",
          },
          {
            text: "Il locale è gradevole.",
            tone: "cold",
            feedback:
              "You retreated into a review. Gradevole is what a notice would say if notices had drinks. He can't answer it. There is no handhold.",
          },
          {
            text: "Bello qui. Ci torno volentieri.",
            tone: "fit",
            feedback:
              "He says: «Sì, è tranquillo.» That is him agreeing with you. Tranquillo is not less than bello. It is the same feeling, in the local volume.",
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
    place: "Giulia's building, off via Po",
    skill: "Bureaucratic cold is not a person's cold. A stuck key is not a friendship.",
    promise:
      "Names on a citofono, a neighbor's silence, a notice about the heating, and a text from the woman who left you milk. Four written or half-written distances.",
    stops: [
      {
        id: "scala-1",
        short: "the citofono",
        place: "The panel of names",
        who: "A voice that is not Giulia",
        mode: "answer",
        scene:
          "Three Rossi. Her message said Rossi G., scala B, interno 8, and also that she is out tonight. You press the right name out of reflex anyway. Someone answers on the second buzz. You have used up their evening already.",
        heard: "Sì?",
        heardFrom: "A voice, irritated only by the hour",
        gloss: "Yes? The entire welcome a wrong buzzer gets.",
        teach:
          "You apologize and release them in one breath. You don't search their name for a connection to Giulia, and you don't explain your housing arrangement through a speaker.",
        prompt: "What do you say into the panel?",
        choices: [
          {
            text: "Mi scusi, ho sbagliato. Buonasera.",
            tone: "fit",
            feedback:
              "They get their kitchen back. You still have the key. The citofono was a reflex, not a plot. Ending it is the courtesy.",
          },
          {
            text: "Ciao! Sei un Rossi anche tu? Conosci Giulia? Io dormo da lei.",
            tone: "near",
            feedback:
              "Tu, a hunt for connection, and your sleeping arrangements, broadcast into a stranger's hall. The panel is not a piazza. They did not come to the door of their own will.",
          },
          {
            text: "Buonasera. Sono l'ospite dell'interno 8 e sto verificando la corrispondenza dei cognomi.",
            tone: "cold",
            feedback:
              "Verificare la corrispondenza: you spoke like the notice board one floor up. They only needed to be released. Mi scusi, ho sbagliato does that without a report.",
          },
        ],
      },
      {
        id: "scala-2",
        short: "the stuck key",
        place: "The street door",
        who: "A neighbor, leaving",
        mode: "answer",
        scene:
          "The key doesn't turn. She is on her way out, sees the problem, and holds the door with the efficiency of someone who has done this for other guests and does not want a chapter about it.",
        teach:
          "Grazie, buona serata. The key's biography is not a gift to her. A question about how long she has lived here spends the favor to buy a conversation. Silence spends her differently, by erasing her.",
        prompt: "What do you say as you take the door?",
        choices: [
          {
            text: "Grazie, lei da quant'è che vive qui? Questa chiave mi odia.",
            tone: "near",
            feedback:
              "A complaint and a personal question, as payment for three seconds of her hand. She may answer, because she is polite, and resent the answer she felt obliged to give.",
          },
          {
            text: "You take the door and go through. Saying something would delay her.",
            tone: "cold",
            feedback:
              "You protected her time so thoroughly that you deleted her. Grazie costs less than the story, and more than nothing. Nothing is what you say to a door, not to a person holding one.",
          },
          {
            text: "Grazie. Buona serata.",
            tone: "fit",
            feedback:
              "She nods. Done. The key remains your problem, to be solved with Giulia's message, not with a neighbor's evening.",
          },
        ],
      },
      {
        id: "scala-3",
        short: "the notice",
        place: "The board inside the courtyard",
        who: "The amministratore, on paper",
        mode: "notice",
        scene:
          "A sheet in a plastic sleeve, printed, with the tone of a rule that expects to be obeyed and does not expect to be loved. You feel accused, and then you look again.",
        heard:
          "Si avvisano i condomini che l'impianto di riscaldamento sarà avviato il 15 ottobre. Si prega di non appoggiare oggetti sulle scale. L'amministratore.",
        heardFrom: "The notice",
        gloss: "Residents are informed that the heat starts on 15 October. Please don't leave things on the stairs. Signed, the building manager.",
        teach:
          "This cold belongs to the genre. The amministratore is not angry at you, and you don't answer in that voice at dinner. You also don't hear si prega as a person begging. If you need the fact, you can ask it in a human line: «Il riscaldamento parte il 15, giusto?»",
        prompt: "What kind of cold is this?",
        choices: [
          {
            text: "A hostile building. You should answer in the same legal tone, so they know you are not someone to push.",
            tone: "cold",
            feedback:
              "You let a genre occupy your mouth. Notices are cold so that a person doesn't have to be. Speaking back in sleeve-and-plastic Italian makes you the notice.",
          },
          {
            text: "Ordinary written cold. It isn't a mood. You don't imitate it, you don't take it personally, and you can still ask a neighbor about the date in a human voice.",
            tone: "fit",
            feedback:
              "Genre is a distance you can name. Once you can name it, you stop hearing every formal sentence as a person stepping back from you.",
          },
          {
            text: "Si prega means someone is pleading. You should reassure the building that you would never leave anything on the stairs.",
            tone: "near",
            feedback:
              "Si prega is a formula, not a feeling. An emotional reply to a heating notice is the too-close reading: you offered comfort to a plastic sleeve.",
          },
        ],
      },
      {
        id: "scala-4",
        short: "the milk",
        place: "A note on the fridge, then your phone",
        who: "Giulia, who is not home",
        mode: "answer",
        scene:
          "Her handwriting is ordinary. The fridge has milk, eggs, and nothing romantic about it. She already uses tu with you, because a friend of yours put you on tu before you arrived. The warmth is the milk, not a style.",
        heard: "Se ti serve qualcosa, scrivimi. Il latte è nel frigo. Buona permanenza, Giulia.",
        heardFrom: "The note",
        gloss: "If you need anything, write me. The milk is in the fridge. Enjoy the stay. Tu, practical, done.",
        teach:
          "Your reply stays practical and on tu. Lei plus a ceremony of gratitude tells her something is wrong. A flood of love tells her the milk was a bigger relationship than she wrote down.",
        prompt: "What do you write back?",
        choices: [
          {
            text: "Cara Giulia, desidero esprimerle la mia più sentita gratitudine per l'ospitalità.",
            tone: "cold",
            feedback:
              "Lei, sentita gratitudine, a letter to an institution. She wrote ti and mentioned milk. Your register tells her the keys went to the wrong guest, or that you are frightened.",
          },
          {
            text: "Grazie. Ho visto il latte. Tutto a posto. A presto.",
            tone: "fit",
            feedback:
              "You proved you read the note, you used her tu, and you released her. Practical warmth answered in kind. She doesn't have to host a feeling.",
          },
          {
            text: "Giulia sei la migliore del mondo, ti devo la vita, latte apprezzatissimo.",
            tone: "near",
            feedback:
              "She left dairy, not a rescue. Ti devo la vita inflates a favor until she has to manage your gratitude. The right size was the size of the milk.",
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
    place: "An office near Piazza San Carlo",
    skill: "Tu is a person's offer. A dry joke is answered at its own volume.",
    promise:
      "Dottoressa Ferrero has used lei for two weeks. Her first name, Laura, is on the directory. You still don't have it. Tonight the elevator, a file, a printer, and then, at the end, her decision.",
    stops: [
      {
        id: "collega-1",
        short: "the elevator",
        place: "The elevator",
        who: "Dottoressa Ferrero",
        mode: "overhear",
        scene:
          "You know her surname because that is what everyone uses with her. You have seen Laura on a list. She has never put it in your mouth. The doors close. There are four floors.",
        heard: "Buonasera.",
        heardFrom: "Dottoressa Ferrero, who then looks at the doors",
        gloss: "Good evening. And then the doors, which is the rest of the conversation.",
        teach:
          "The greeting is complete. Another sentence spends a closeness she hasn't offered. Filling silence is not the same as being human. The directory is not permission.",
        prompt: "What is the silence asking of you?",
        choices: [
          {
            text: "Nothing further. Buonasera back, and the doors. The greeting already happened.",
            tone: "fit",
            feedback:
              "You ride four floors without turning her into a host. When the doors open she can still like working with you. That is not a small outcome.",
          },
          {
            text: "Fill it. Silence in an elevator is hostile, so you offer your weekend, your Italian, your impression of the city.",
            tone: "near",
            feedback:
              "You treated quiet as a problem you had to solve with autobiography. She chose the doors. Adding your weekend tells her her choice was a mistake you are correcting.",
          },
          {
            text: "Reintroduce yourself, with your language level, in case she has forgotten who you are.",
            tone: "cold",
            feedback:
              "A status report, unprompted, in a box. She knows who you are. The level of your Italian is not the greeting she was missing.",
          },
        ],
      },
      {
        id: "collega-2",
        short: "the file",
        place: "Her office door",
        who: "Dottoressa Ferrero",
        mode: "answer",
        scene:
          "She is already turning back to her screen. The request is small and timed. Marco's tu from the piazza is still in your ear from last night. This room did not attend that aperitivo.",
        heard: "Può mandarmi quel file prima delle sei?",
        heardFrom: "Dottoressa Ferrero",
        gloss: "Can you send me that file before six? Può: lei. The whole request is one line, which is its courtesy.",
        teach:
          "Glielo mando keeps her lei and names the doing. Te lo mando spends Marco's tu in a room that hasn't offered it. A ceremonial certamente, dottoressa is the other miss: more bow than she asked for.",
        prompt: "What do you answer?",
        choices: [
          {
            text: "Sì, te lo mando subito.",
            tone: "near",
            feedback:
              "Te is Marco's, or the cousin's. She said può. Borrowing tu from a friendlier room is not efficiency. It is a door opened from the wrong side.",
          },
          {
            text: "Certamente, dottoressa. Sarà mia cura provvedere.",
            tone: "cold",
            feedback:
              "You answered a clear request with a little oath. Provvedere belongs to notices. She wanted the file, not a pledge. The title every sentence is a distance she isn't actually demanding.",
          },
          {
            text: "Sì, glielo mando.",
            tone: "fit",
            feedback:
              "Glielo: to her, the file. Lei intact, no extra bow, no imported tu. She can go back to the screen. That was the kindness she designed.",
          },
        ],
      },
      {
        id: "collega-3",
        short: "the printer",
        place: "The corridor",
        who: "Dottoressa Ferrero, almost to herself",
        mode: "answer",
        scene:
          "The printer has stopped again. It is Friday. She doesn't look at you when she says it, which is how you know you are allowed to answer and not required to solve her life.",
        heard: "Ha deciso di non lavorare il venerdì.",
        heardFrom: "Dottoressa Ferrero",
        gloss: "It has decided not to work on Fridays. The printer, given a will. Dry, and one degree under funny.",
        teach:
          "You answer at her volume, once. A story about a printer in Rome enlarges the joke until she has to host it. Offering to call support answers a person as if she had filed a ticket.",
        prompt: "What do you say?",
        choices: [
          {
            text: "Aspetta, la stampante di Roma ci mette cinque minuti a raccontarla.",
            tone: "near",
            feedback:
              "Aspetta already assumes tu and an audience. She gave you one dry line, not a stage. The story is probably good. It is not this corridor's.",
          },
          {
            text: "Ha i suoi principi.",
            tone: "fit",
            feedback:
              "You continued the fiction at the same size and then stopped. She can smile without scheduling your anecdote. Matching volume is the humor.",
          },
          {
            text: "Vuole che contatti l'assistenza?",
            tone: "cold",
            feedback:
              "You heard a joke as a work order. Assistenza is the right word in another minute, if she asks. As a reply to ha deciso, it corrects her for being playful.",
          },
        ],
      },
      {
        id: "collega-4",
        short: "ormai",
        place: "The elevator again, end of the day",
        who: "Dottoressa Ferrero",
        mode: "answer",
        scene:
          "Two weeks of lei. She chooses the moment, which is the whole content of the offer: it is hers, it is timed, and it is not a confession that the lei was a burden you both hated.",
        heard: "Può darmi del tu. Ormai.",
        heardFrom: "Dottoressa Ferrero",
        gloss: "You can use tu with me. By now. Ormai means the lei has done its job and is over. She does not say Laura. She does not say finally.",
        teach:
          "Take the tu. Don't take the name, which wasn't in the sentence, and don't insult the two weeks she used to make the offer easy. Refusing, to stay professional, punishes her timing.",
        prompt: "What do you answer?",
        choices: [
          {
            text: "Volentieri. Buona serata.",
            tone: "fit",
            feedback:
              "You accepted, and you let the evening end. Next time, tu. The name Laura waits for a separate door, if she ever opens it. Tonight's door was the pronoun.",
          },
          {
            text: "Finalmente. Ciao Laura, il lei era pesantissimo.",
            tone: "near",
            feedback:
              "Finalmente insults the timing. Laura takes a name she didn't give. Pesantissimo tells her the care she took felt like a weight you were enduring. Three mistakes, one breath.",
          },
          {
            text: "La ringrazio, ma preferisco mantenere il lei.",
            tone: "cold",
            feedback:
              "You turned her offer into a policy. She will not make it twice. Professional was the lei she was already giving you. This sentence was the moment it stopped being the careful choice.",
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
    place: "Marco's apartment, above the arcades",
    skill: "Two distances in one hallway. Hers, then his, without betraying either.",
    promise:
      "His mother arrived this morning from Lecce. The southern room is going to appear inside his Torinese apartment. You are the person who has walked both.",
    stops: [
      {
        id: "nonna-1",
        short: "the warning",
        place: "His door",
        who: "Marco",
        mode: "overhear",
        scene:
          "He says it before you are out of your coat, quietly, with the fondness of a son who knows the next ten minutes. He is not joking exactly. He is resizing you so you won't be surprised into a mistake.",
        heard: "Entra. C'è mia madre, arrivata stamattina da Lecce. Parla con tutti.",
        heardFrom: "Marco",
        gloss: "Come in. My mother is here, she arrived this morning from Lecce. She talks to everyone. A fact, a warning, and not quite a complaint.",
        teach:
          "He is not recruiting you against her, and he is not asking you to refrigerate her. You can be warm at her volume and quiet at his. The warning is so the switch won't throw you.",
        prompt: "What is he asking?",
        choices: [
          {
            text: "Nothing against her. He is changing your expectations, not recruiting you. Warm with her, at her size. Quiet with him, at his.",
            tone: "fit",
            feedback:
              "You walk in able to hold both. The sentence you don't say, later, in the kitchen where she can hear, is any version of «è un po' troppo.»",
          },
          {
            text: "To keep the apartment at one temperature. You should be reserved with her, so Turin doesn't break.",
            tone: "cold",
            feedback:
              "You would freeze a guest who crossed Italy this morning, to protect a mood. He lives with her voice. He asked for your flexibility, not for an ally in coolness.",
          },
          {
            text: "To help him correct her. She is about to be too much, and a gentle edit of her Italian would be a favor.",
            tone: "near",
            feedback:
              "Editing his mother is not the favor. It is an astonishing trespass. Parla con tutti is information, not a diagnosis you are licensed to treat.",
          },
        ],
      },
      {
        id: "nonna-2",
        short: "the orecchiette",
        place: "His kitchen",
        who: "Marco's mother",
        mode: "answer",
        scene:
          "She becomes Lecce the moment she sees a new face. The pot is already a decision. Marco is still in the doorway in his coat, holding the earlier ritual, the aperitivo, in his body.",
        heard:
          "Meno male, una faccia nuova. Hai mangiato? Ti ho fatto le orecchiette. Marco non le fa mai.",
        heardFrom: "His mother",
        gloss: "Finally, a new face. Have you eaten? I made you orecchiette. Marco never makes them. Tu, immediate, southern, allowed. The complaint about him is hers.",
        teach:
          "You accept a small portion, and you let the aperitivo exist so his evening stays true. An instant no repeats the coldest Lecce mistake. Joining the complaint about him is the too-close one: her right, not yours.",
        prompt: "What do you say?",
        choices: [
          {
            text: "No, grazie, sono a posto.",
            tone: "cold",
            feedback:
              "The instant no, before a plate exists. In her kitchen in Lecce this refused the person. It does the same inside his apartment. The city changed. This particular offer didn't.",
          },
          {
            text: "Hai ragione. Che figlio.",
            tone: "near",
            feedback:
              "You joined her indictment while he was still in his coat. She may complain about him. You don't get to. He will still be her son after you leave, and he will remember the chair you chose.",
          },
          {
            text: "Grazie. Ne prendo un po'. L'aperitivo c'è stato, queste no.",
            tone: "fit",
            feedback:
              "Food accepted, portion modest, his ritual still visible. You honored the pot and the hour before it. She can be pleased. He can breathe.",
          },
        ],
      },
      {
        id: "nonna-3",
        short: "three questions",
        place: "The kitchen, still standing",
        who: "His mother",
        mode: "answer",
        scene:
          "She stacks them the way the cousin's table stacked plates, with affection and no pause for your syllabus. One of the questions is a tease of her son. You can hear the trap because you have been loved this way before, further south.",
        heard: {
          f: "Ma tu da quanto sei qui? Ti trovi? E Marco ti porta in giro, o ti lascia sola come fa con me?",
          m: "Ma tu da quanto sei qui? Ti trovi? E Marco ti porta in giro, o ti lascia solo come fa con me?",
        },
        heardFrom: "His mother",
        gloss: "How long have you been here? Do you like it? And does Marco take you around, or leave you alone the way he does with me?",
        teach:
          "Answer the human question, short, and don't indict him. «Stasera mi ha portata qui» gives her the reassurance without the alliance. A syllabus answers none of what she asked.",
        prompt: "What do you answer?",
        choices: [
          {
            text: "Sto cercando di migliorare il mio italiano in contesto.",
            tone: "cold",
            feedback:
              "A purpose statement, and a dodge of her son. She asked about your days and about him. In contesto is the town hall, relocated to a pot of orecchiette.",
          },
          {
            text: {
              f: "Mi lascia sola, sì. Meno male che ci sei tu.",
              m: "Mi lascia solo, sì. Meno male che ci sei tu.",
            },
            tone: "near",
            feedback:
              "You accepted the alliance. It will please her for a minute and leave him alone with it. She teased him so you could reassure her, not so you would sign up.",
          },
          {
            text: {
              f: "Da due settimane. Mi ci trovo. Stasera mi ha portata qui, quindi qualcosa fa.",
              m: "Da due settimane. Mi ci trovo. Stasera mi ha portato qui, quindi qualcosa fa.",
            },
            tone: "fit",
            feedback:
              "Time, a true feeling, and a defense of him that still lets her tease. Qualcosa fa is the joke at the right size: he is not perfect, and he is not absent.",
          },
        ],
      },
      {
        id: "nonna-4",
        short: "the hallway",
        place: "The hall, while she steps back to the pot",
        who: "Marco, low",
        mode: "answer",
        scene:
          "Ten steps of tile. This building carries sound. He is slightly embarrassed and slightly loyal, and he is trying to hand you the rule without making you choose a side.",
        heard: "Diventa Lecce in dieci minuti. Tu rispondile, se no ci resta male. Scusa.",
        heardFrom: "Marco",
        gloss: "She turns into Lecce in ten minutes. Answer her, otherwise she'll be hurt. Sorry. Rispondile: answer her, tu imperative, her as the object.",
        teach:
          "Short, on his side of the volume, loyal to her. You don't scheme a later exit, and you don't promise him a differentiated register like a strategy memo. She is ten steps away.",
        prompt: "What do you say?",
        choices: [
          {
            text: {
              f: "È un po' tanto. Dopo le dico che sono stanca.",
              m: "È un po' tanto. Dopo le dico che sono stanco.",
            },
            tone: "near",
            feedback:
              "A plot, in a hallway with echoes, against a woman cooking for you. Even if she misses the words she may catch the posture. He asked you to answer her, not to escape her.",
          },
          {
            text: "Ma figurati. È a posto così.",
            tone: "fit",
            feedback:
              "You released him from the apology and kept faith with her. Then you go back in at her volume, not at this whisper. Two distances, and you didn't drop either on the floor.",
          },
          {
            text: "Ricevuto. Differenzierò i registri.",
            tone: "cold",
            feedback:
              "You confirmed a tactic. He was being a son, not a commander. Differenzierò is the notice-board version of a feeling he just trusted you with.",
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
    place: "Via Po, back toward Porta Nuova",
    skill: "The one line that never changed, and the voice note that is not a thesis.",
    promise:
      "Same kinds of people as the first night in Lecce. A different size in your mouth. Then Marta, who started this, gets the evening and not the essay.",
    stops: [
      {
        id: "ritorno-1",
        short: "the driver again",
        place: "The step of a bus",
        who: "A driver, end of a route",
        mode: "answer",
        scene:
          "Porta Nuova is ahead and you are one stop off, again, because cities do this to you on purpose. He has the same hand on the same kind of door. You have twelve nights in your pocket and a strong wish to spend them.",
        heard: "Attenzione al gradino.",
        heardFrom: "The driver",
        gloss: "Watch the step. You heard this in Lecce. It did not become more complicated.",
        teach:
          "Grazie, buonasera. This is the line that did not need resizing. Almost everything else did. The autobiography of your two cities is not his fare.",
        prompt: "Same step, other city. What do you say?",
        choices: [
          {
            text: "Grazie! Di dove è? Ho fatto Lecce e adesso Torino.",
            tone: "near",
            feedback:
              "You paid him with your curriculum. He warned you about a step. The comparison of two Italys is real, and it is not a conversation he opened.",
          },
          {
            text: "You step off looking at your phone and say nothing.",
            tone: "cold",
            feedback:
              "Brevity was never silence. You learned a short line and then skipped even that, which is how a lesson becomes a pose. He still said something. It still has an answer.",
          },
          {
            text: "Grazie, buonasera.",
            tone: "fit",
            feedback:
              "Notice how small it is. The map was about everything around this sentence. The sentence itself survived both towns unchanged, which is why you can trust it.",
          },
        ],
      },
      {
        id: "ritorno-2",
        short: "the glove",
        place: "Under the arcade",
        who: "A man who picked up what you dropped",
        mode: "answer",
        scene:
          "Your glove is in his hand before you have turned around. He is already extending it. There is the smallest formal distance in the gesture, and it is deliberate, and it is kind.",
        heard: "Tenga.",
        heardFrom: "The man",
        gloss: "Here. Lei imperative of tenere. The same word that was wrong for a child in the piazza is right for a stranger under the arcades.",
        teach:
          "Grazie mille, buonasera. You do not recruit him toward Porta Nuova, and you do not inflate a glove into squisita cortesia. Tenga already told you the distance. You return it.",
        prompt: "What do you say as you take it?",
        choices: [
          {
            text: "Grazie, ma se vai verso Porta Nuova ti racconto una cosa.",
            tone: "near",
            feedback:
              "He said tenga, which is lei, and you answered with tu and a claim on his walk. The glove was not an introduction. In Lecce it might have become a street. He has told you it isn't.",
          },
          {
            text: "La ringrazio infinitamente per il suo gesto di squisita cortesia.",
            tone: "cold",
            feedback:
              "You built a podium for a glove. Infinitamente and squisita cortesia make him stand there while you perform gratitude. He wanted his hand back.",
          },
          {
            text: "Grazie mille. Buonasera.",
            tone: "fit",
            feedback:
              "The kindness is complete. You don't inspect the glove for drama and you don't start a walk. Finished is the polite version.",
          },
        ],
      },
      {
        id: "ritorno-3",
        short: "the loud bar",
        place: "A bar spilling into via Po",
        who: "A room that sounds like the south",
        mode: "overhear",
        scene:
          "A goal, a roar, accents that could be the cousin's stairwell. Warmer than the arcade by several degrees. You could go in. The skill is knowing what changed, and what did not.",
        teach:
          "The room changed, so you may warm up with the room. The street you will walk back into has not changed. And nobody here has offered you a cousin's doorway. Un caffè, grazie is still the whole hello.",
        prompt: "What just became possible?",
        choices: [
          {
            text: "You may match this room, because this room is louder. You don't carry it back onto the arcade, and you don't greet strangers as if they had cooked you dinner.",
            tone: "fit",
            feedback:
              "If you step in: «Un caffè, grazie.» If someone asks where you're from, a city and a number of weeks, then, if the room is actually warm, you may ask whether they are from here or from the south. You ask because you heard them. That is the advanced version. It is still not the doorway.",
          },
          {
            text: "This is the real Italy, and the quiet street was a failure. You should stay and say so.",
            tone: "near",
            feedback:
              "You just erased Turin because it wasn't Lecce. The loud room is real. The arcade is real. Calling one of them a failure is how a traveler stops listening.",
          },
          {
            text: "Volume is wrong in this city. You order in a whisper, and you leave if anyone laughs.",
            tone: "cold",
            feedback:
              "You learned brevity and applied it as a law against joy. The arcade has a volume. This bar has another. Register follows the room you are actually in.",
          },
        ],
      },
      {
        id: "ritorno-4",
        short: "the voice note",
        place: "Under the portici, before the station",
        who: "Marta, who will hear this later",
        mode: "answer",
        scene:
          "Your phone is in your hand. She is the reason there was a doorway in Lecce at all. She doesn't need the theory. She was the one who knew it before you had words for it.",
        teach:
          "Three sentences: where you are, what happened, and one true thing about the volume of the city. The thesis stays in your pocket. So does the verdict against Turin. She wants the evening.",
        prompt: "What do you send?",
        choices: [
          {
            text: "Ti aggiorno: ho confrontato il registro salentino e quello torinese in diversi contesti.",
            tone: "cold",
            feedback:
              "True, and useless to her. Confrontare i registri is what this map did to you. Saying it that way puts her in the audience of a paper. She is your friend.",
          },
          {
            text: "Sono sotto i portici, piove un po'. La mamma di Marco mi ha fatto le orecchiette. Ti racconto domani, che qui di sera si parla più piano.",
            tone: "fit",
            feedback:
              "Place, a plate, a promise, and the whole essay in one clause: si parla più piano. You didn't declare a winner. You sounded like a person who had walked.",
          },
          {
            text: "Torino è morta, non parla nessuno. Salvami. Lecce è l'unica Italia vera.",
            tone: "near",
            feedback:
              "You betrayed the arcade to please the south, and you asked her to rescue you from a city that was careful with you. Too close to Lecce is still too close. It just faces the other direction.",
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
