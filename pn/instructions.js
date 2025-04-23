
const PRE_PRACTICE_INSTRUCTION_NL =
    "Instructions in English are provided on the next page.</br> " +
	"Beste deelnemer,</br> " +
	"Bedankt voor uw deelname aan dit experiment.</br> " +
	"De experimentele sessie betrekt het verzamelen " +
	"van uw gegevens en deze te uploaden naar een server, " +
	"die een aanzienlijke hoeveelheid data kan verbruiken. " +
	"Daarom raden we u aan om een computer te gebruiken " +
	"die aangesloten is op een WiFi-netwerk, " +
	"in plaats van te vertrouwen op mobiel internet.</br> " +
	"Aangezien dit experiment bestaat uit het opnemen van uw stem, " +
	"moet u ervoor zorgen dat uw microfoon aan staat en goed werkt. " +
	"U moet ook het gebruik van uw microfoon in de browser toestaan. " +
	"Gebruik geen koptelefoon tijdens het experiment. " +
	"Voordat u begint, vragen wij u om te bevestigen dat " +
	"uw audio duidelijk wordt opgenomen.</br> " +
	"U gaat nu plaatjes zien van concrete objecten op het scherm, " +
	"één plaatje tegelijk. Voordat elk object verschijnt, " +
	"ziet u een Nederlands of een Engels vlaggetje. " +
	"Wanneer het object verschijnt, ziet u hetzelfde vlaggetje " +
	"bovenaan het scherm. Uw taak is om elk object hardop te benoemen " +
	"in de taal die door de vlag wordt aangegeven, dat wil zeggen, " +
	"in het Nederlands of Engels. Probeer zo snel mogelijk te antwoorden.</br> " +
	"Het experiment bestaat uit drie blokken, met pauzes tussen elk blok.</br> " +
	"Voordat het experiment begint, krijgt u de mogelijkheid om " +
	"een keer te oefenen.</br> " +
	"Druk op Enter wanneer u klaar bent om te starten."
	;

const PRE_PRACTICE_INSTRUCTION_EN =
    "Dear participant,</br>" +
    "Thank you for participating in this experiment.</br> " +
	"The experimental session involves collecting your data " +
	"and uploading it to a data server, which can consume " +
	"a significant amount of internet data. Therefore, we ask that " +
	"you use a personal computer connected to a WiFi network, " +
	"rather than relying on mobile internet.</br> " +
	"Since this experiment involves recording your voice, " +
	"please ensure that your microphone is turned on " +
	"and functioning properly. You will also need to allow " +
	"the use of your microphone in the browser. " +
	"Please do not use headphones during the experiment. " +
	"Before you begin, we ask you to check that your audio " +
	"is being recorded clearly.</br> " +
    "You are now going to see pictures of concrete objects " +
    "on the screen, one after the other. " +
    "Before each object is presented, you will see " +
    "either a Dutch or English flag. " +
    "When the object is presented, you will see " +
    "the same flag at the top of the screen. " +
    "Your task is to name each object aloud " +
    "in the language indicated by the flag, that is, " +
    "in Dutch or English.</br> " +
    "Try to answer as quickly as possible.</br> " +
    "The experiment consists of three blocks, with breaks in " +
    "between each block.</br> " +
    "First we will do a short practice.</br> " +
    "Hit Enter when ready to start."
    ;

const BLOCK1_INSTRUCTION_NL =
    "Instructions in English are provided on the next page.</br> " +
    "Einde van het oefengedeelte.</br> " +
    "Blok 1 begint nu. Eerst moet u elk object in de ene taal " +
	"benoemen en daarna in de andere taal. " +
    "Deze procedure wordt tweemaal herhaald. " +
    "Er is een pauze tussen de talen.</br> " +
    "Druk op Enter wanneer u klaar bent om verder te gaan."
    ;

const BLOCK1_INSTRUCTION_EN =
    "End of the practice part.</br> " +
    "Block 1 will start next. First you will have to name each " +
    "object in one language and then in the other language. " +
    "This procedure will be repeated twice. " +
    "There is a pause in between languages.</br> " +
    "Hit Enter when ready to proceed."
    ;

const BLOCK2_INSTRUCTION_NL =
    "Instructions in English are provided on the next page.</br> " +
    "Einde van het eerste blok.</br> " +
    "Blok 2 begint nu. In dit blok moet u opnieuw " +
    "elk object in het Nederlands of Engels benoemen, maar deze keer " +
    "zijn er geen vlaggetjes. U bent vrij om te kiezen in welke taal " +
    "u elke foto wilt benoemen, Nederlands of Engels. " +
    "We moedigen u aan om te schakelen tussen talen wanneer u maar wilt. " +
    "Gebruik het eerste woord dat in u opkomt.</br> " +
    "Druk op Enter wanneer u klaar bent om verder te gaan. "
    ;

const BLOCK2_INSTRUCTION_EN =
    "End of the first block.</br> " +
    "Block 2 will start next. In this block you will again"  +
    "have to name each object in Dutch or English, but this"  +
    "time there are no flags. You are free to choose in which"  +
    "language (either Dutch or English) you want to name " +
    "each picture. We encourage you to switch between " +
    "languages whenever you want. Try to use the first word " +
    "that comes to your mind.</br> " +
    "Hit Enter when ready to proceed."
;

const BLOCK3_INSTRUCTION_NL =
    "Instructions in English are provided on the next page.</br> " +
    "Einde van het tweede blok.</br> " +
    "Blok 3 begint nu. In dit blok moet u opnieuw " +
    "elk object in het Nederlands of Engels benoemen, " +
    "zoals aangegeven door de vlag, maar deze keer is er geen " +
    "specifieke volgorde.</br> " +
    "Druk op Enter wanneer u klaar bent om verder te gaan."
    ;

const BLOCK3_INSTRUCTION_EN =
    "End of the second block.</br> " +
    "Block 3 will start next. In this block you will again " +
    "have to name each object in Dutch or English, " +
    "as indicated by the flag, but there is " +
    "no particular order.</br> " +
    "Hit Enter when ready to proceed." 
    ;

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
