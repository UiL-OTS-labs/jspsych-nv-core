
const PRE_PRACTICE_INSTRUCTION_NL =
    "Beste deelnemer,</br>" +
    "Bedankt voor je deelname aan dit experiment. " +
    "Je gaat nu foto ' s zien van concrete objecten " +
    "op het scherm, de een na de ander." +
    "Voordat elk object wordt gepresenteerd, ziet u " +
    "een Nederlandse of Engelse vlag. " +
    "Wanneer het object wordt gepresenteerd, ziet u " +
    "dezelfde vlag bovenaan het scherm. " +
    "Uw taak is om elk object hardop te benoemen " +
    "in de taal die door de vlag wordt aangegeven, dat wil zeggen, " +
    "in het Nederlands of Engels.</br> " +
    "Probeer zo snel mogelijk te antwoorden. " +
    "Omdat dit experiment bestaat uit het opnemen van je stem, " +
    "zorg ervoor dat uw microfoon is ingeschakeld " +
    "en goed functioneren. U zult ook moeten toestaan " +
    "het gebruik van uw microfoon in de browser. Voor " +
    "u begint, controleer of uw audio duidelijk wordt opgenomen. " +
    "Het experiment bestaat uit drie blokken, met breuken in " +
    "tussen elk blok.</br>" +
    "Eerst doen we een korte oefening.</br> " +
    "Druk op Enter wanneer u klaar bent om te starten."
    ;

const PRE_PRACTICE_INSTRUCTION_EN =
    "Dear participant,</br>" +
    "Thank you for participating in this experiment. " +
    "You are now going to see pictures of concrete objects " +
    "on the screen, one after the other. " +
    "Before each object is presented, you will see " +
    "either a Dutch or English flag. " +
    "When the object is presented, you will see " +
    "the same flag at the top of the screen. " +
    "Your task is to name each object aloud " +
    "in the language indicated by the flag, that is, " +
    "in Dutch or English.</br> " +
    "Try to answer as quickly as possible. " +
    "Since this experiment involves recording your voice, " +
    "please ensure that your microphone is turned on " +
    "and functioning properly. You will also need to allow " +
    "the use of your microphone in the browser. Before " +
    "you begin, check that your audio is being recorded clearly. " +
    "The experiment consists of three blocks, with breaks in " +
    "between each block.</br>" +
    "First we will do a short practice.</br>" +
    "Hit Enter when ready to start."
    ;

const BLOCK1_INSTRUCTION_NL =
    "Einde van het oefengedeelte.</br>" +
    "Blok 1 zal beginnen. Eerst moet je elk een naam geven. " +
    "object in de ene taal en dan in de andere taal. " +
    "Deze procedure wordt tweemaal herhaald. " +
    "Er is een pauze tussen de talen. " +
    "Druk op Enter wanneer u klaar bent om verder te gaan."
    ;
const BLOCK1_INSTRUCTION_EN =
    "End of the practice part.</br>" +
    "Block 1 will start next. First you will have to name each " +
    "object in one language and then in the other language. " +
    "This procedure will be repeated twice. " +
    "There is a pause in between languages. " +
    "Hit Enter when ready to proceed."
    ;

const BLOCK2_INSTRUCTION_NL =
    "Einde van het eerste blok.</br>" +
    "Blok 2 zal beginnen. In dit blok moet je opnieuw " +
    "elk object in het Nederlands of Engels benoemen, maar deze keer " +
    "zijn er geen vlaggen. U bent vrij om te kiezen in welke taal " +
    "(Nederlands of Engels) u elke foto wilt benoemen. " +
    "We raden u aan om te schakelen tussen talen wanneer u maar wilt. " +
    "Gebruik het eerste woord dat in je opkomt." +
    "Druk op Enter wanneer u klaar bent om verder te gaan. "
    ;
const BLOCK2_INSTRUCTION_EN =
    "End of the first block.</br>" +
    "Block 2 will start next. In this block you will again"  +
    "have to name each object in Dutch or English, but this"  +
    "time there are no flags. You are free to choose in which"  +
    "language (either Dutch or English) you want to name " +
    "each picture. We encourage you to switch between " +
    "languages whenever you want. Try to use the first word " +
    "that comes to your mind. " +
    "Hit Enter when ready to proceed."
    ;

const BLOCK3_INSTRUCTION_NL =
    "Einde van het tweede blok.</br>" +
    "Blok 3 begint als volgende. In dit blok moet je opnieuw " +
    "elk object in het Nederlands of Engels benoemen, " +
    "zoals aangegeven door de vlag, maar er is geen " +
    "specifieke volgorde.</br>" +
    "Druk op Enter wanneer u klaar bent om verder te gaan."
    ;
const BLOCK3_INSTRUCTION_EN =
    "End of the second block. " +
    "Block 3 will start next. In this block you will again " +
    "have to name each object in Dutch or English, " +
    "as indicated by the flag, but there is " +
    "no particular order. " +
    "Hit Enter when ready to proceed."

const INSTRUCTION_QUATER_NL = 
    "Schakel nu over naar de andere taal zoals aangegeven door de vlag.";
const INSTRUCTION_QUATER_EN =
    "Now switch to the other language as indicated by the flag";


const FEEDBACK_PREAMBLE = `
    <p>The experiment has now ended. <strong>Do not close the page yet.</strong></p>
    `;

const FEEDBACK_PROMPT = `
     Is there anything you would like to say about the experiment? If not, leave this field blank.
    `;

const DEBRIEF_MESSAGE = `
    <h1>End of the experiment</h1>
    <br>
    <br>
    <h2>Thank you for your participation!</h2>
    `;
