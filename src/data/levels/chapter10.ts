import { MysteryLevel } from '../../types/game';

export const CHAPTER_10_LEVELS: MysteryLevel[] = [
  {
    id: 181,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Clock That Never Moved',
    difficulty: 'Expert',
    story: 'A precision wall clock kept perfect time 24 hours a day, yet its physical hands never moved by a single millimeter.',
    solution: 'It was a digital LED/LCD clock with an electronic display that had no physical moving hands at all.',
    hints: ['Think about clock types.', 'It did not have physical mechanical hands.', 'It was an electronic digital clock.'],
    positiveFacts: ['digital clock', 'no physical hands', 'electronic display', 'lcd / led clock', 'digital numerals'],
    negativeFacts: ['broken gears', 'optical illusion painted clock', 'clock frozen in time dilation'],
    irrelevantFacts: ['bezel material', 'battery type', 'wall height'],
    suggestedQuestions: ['Did the clock have mechanical gears and physical hands?', 'Was it an electronic digital clock with a screen display?', 'Did the clock have zero moving parts?'],
    solutionKeywords: [['digital', 'electronic', 'no hands', 'lcd', 'led', 'screen']]
  },
  {
    id: 182,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Room Without an Exit',
    difficulty: 'Expert',
    story: 'A man walked freely out of a room that architectural records certified had "Zero Designated Exits".',
    solution: 'He exited through the doorway designated as the entrance; the entrance and exit were the same door.',
    hints: ['Think about semantic wording.', 'One opening serves both entering and leaving.', 'The entrance was also used to exit.'],
    positiveFacts: ['entrance is exit', 'same door', 'left through entrance', 'way in was way out', 'single doorway'],
    negativeFacts: ['teleportation', 'climbed through air duct', 'knocked down drywall'],
    irrelevantFacts: ['door lock type', 'room purpose', 'man age'],
    suggestedQuestions: ['Did the room have an entrance doorway?', 'Did the man leave through the exact same door he entered through?', 'Was the entrance also the exit?'],
    solutionKeywords: [['entrance', 'same door', 'entered', 'way in', 'door']]
  },
  {
    id: 183,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Impossible Message',
    difficulty: 'Expert',
    story: 'A recipient read a confidential email alert at 10:00 AM, yet the sender did not hit Send until 10:05 AM.',
    solution: 'The email system sent an automated scheduled calendar reminder notification before the draft was sent.',
    hints: ['Think about automated scheduling.', 'It was a notification alert.', 'A scheduled draft reminder was delivered automatically.'],
    positiveFacts: ['scheduled notification', 'automated reminder', 'calendar draft alert', 'scheduled alert', 'system notification'],
    negativeFacts: ['time travel server', 'sender clock was 5 minutes fast', 'hacker intercepted draft'],
    irrelevantFacts: ['email client', 'subject line', 'internet speed'],
    suggestedQuestions: ['Was the message sent manually at 10:00 AM?', 'Was it an automated scheduled reminder notification delivered before the final message?', 'Was it a scheduled notification?'],
    solutionKeywords: [['scheduled', 'notification', 'reminder', 'automated', 'draft']]
  },
  {
    id: 184,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Empty Planet',
    difficulty: 'Expert',
    story: 'Astronomers looked at a celestial planet that appeared completely devoid of life, yet held billions of manufactured structures.',
    solution: 'It was an intricate tabletop scale globe model of Earth crafted with miniature architectural cities.',
    hints: ['Think about miniature models.', 'It was not a real celestial body in outer space.', 'It was a miniature tabletop globe model.'],
    positiveFacts: ['model globe', 'miniature model', 'tabletop planet', 'scale model', 'not a real planet'],
    negativeFacts: ['extinct alien civilization', 'nanobots on Mars', 'holographic planetarium projection'],
    irrelevantFacts: ['globe stand material', 'diameter in inches', 'astronomer telescope brand'],
    suggestedQuestions: ['Was this an actual planet orbiting in outer space?', 'Was it a miniature scale model or architectural globe?', 'Was it a tabletop model of a planet?'],
    solutionKeywords: [['model', 'globe', 'miniature', 'scale model', 'tabletop', 'not real']]
  },
  {
    id: 185,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Last Photograph',
    difficulty: 'Expert',
    story: 'A portrait of an empty chair was captured precisely ten seconds after the sole photographer stepped out of the room.',
    solution: 'The photographer engaged the camera\'s ten-second automatic self-timer before walking out.',
    hints: ['Think about camera self-timers.', 'The camera shutter triggered automatically.', 'The ten-second countdown timer triggered the exposure.'],
    positiveFacts: ['self timer', 'camera timer', 'timer countdown', 'timed shutter', 'automatic timer'],
    negativeFacts: ['remote trigger in pocket', 'motion sensor tripwire', 'accomplice hiding behind curtain'],
    irrelevantFacts: ['lens focal length', 'shutter speed', 'door wood'],
    suggestedQuestions: ['Was someone else operating the shutter?', 'Did the photographer set the camera\'s self-timer countdown before leaving?', 'Did an automated self-timer take the photo?'],
    solutionKeywords: [['timer', 'self timer', 'self-timer', 'countdown', 'timed']]
  },
  {
    id: 186,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Secret Number',
    difficulty: 'Expert',
    story: 'Two rival players independently guessed the exact same 8-digit secret pin without speaking or communicating.',
    solution: 'The secret pin was a fixed default number printed directly in the game\'s instruction rulebook.',
    hints: ['Look at the rulebook instructions.', 'Both participants followed identical rules.', 'The number was printed in the rules manual.'],
    positiveFacts: ['printed in rules', 'default pin in manual', 'rulebook instruction', 'rule manual', 'fixed in instructions'],
    negativeFacts: ['psychic mind reading', 'cheated using micro-radio', 'coincidental 1 in 100,000,000 odds'],
    irrelevantFacts: ['font of rulebook', 'player ages', 'table color'],
    suggestedQuestions: ['Did the players communicate secretly?', 'Was the number explicitly printed in the game rules or instruction manual?', 'Did both players read it in the instructions?'],
    solutionKeywords: [['rulebook', 'rules', 'instructions', 'manual', 'printed in rules', 'default']]
  },
  {
    id: 187,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Invisible Door',
    difficulty: 'Expert',
    story: 'A guest walked through an open entryway but bumped their forehead hard against a door nobody in the room could see.',
    solution: 'The door was made of seamless, perfectly spotless transparent tempered glass.',
    hints: ['Think about optical transparency.', 'Clean glass is virtually invisible.', 'It was a spotless transparent glass door.'],
    positiveFacts: ['transparent glass', 'glass door', 'clean glass', 'invisible glass', 'clear tempered glass'],
    negativeFacts: ['forcefield generator', 'mime trick', 'optical cloaking device'],
    irrelevantFacts: ['door frame color', 'lighting brightness', 'guest height'],
    suggestedQuestions: ['Was there an electronic forcefield?', 'Was it a completely clean transparent glass door?', 'Did spotless clear glass cause the collision?'],
    solutionKeywords: [['glass', 'transparent', 'glass door', 'clear glass', 'clean glass']]
  },
  {
    id: 188,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Endless Question',
    difficulty: 'Expert',
    story: 'A detective claimed that a single inquiry received YES, NO, and NOT RELEVANT, all three answers being 100% verified truths.',
    solution: 'They were three distinct questions regarding three separate case facts, rather than one single question.',
    hints: ['Compare the questions asked.', 'They were not one single question.', 'The detective asked three different questions about three separate facts.'],
    positiveFacts: ['three different questions', 'three separate questions', 'not one question', 'multiple questions', 'three questions'],
    negativeFacts: ['quantum paradox question', 'riddle with multiple choice', 'judge changed mind'],
    irrelevantFacts: ['case name', 'detective badge number', 'time of inquiry'],
    suggestedQuestions: ['Was only one single question asked?', 'Were there three completely separate questions about different facts?', 'Did three questions yield the three answers?'],
    solutionKeywords: [['three', 'different questions', 'separate questions', 'not one', 'multiple questions']]
  },
  {
    id: 189,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Final Key',
    difficulty: 'Expert',
    story: 'A master key unlocked a steel vault door from three feet away without ever touching the keyhole.',
    solution: 'It was a wireless electronic RFID / Bluetooth smart proximity digital key.',
    hints: ['Think about wireless smart locks.', 'Physical contact is unnecessary with radio frequencies.', 'It was a wireless RFID proximity digital smart key.'],
    positiveFacts: ['rfid key', 'wireless key', 'smart lock', 'proximity key', 'bluetooth key', 'electronic fob'],
    negativeFacts: ['telekinetic metal key', 'sonic screwdriver', 'magnet pulled cylinder'],
    irrelevantFacts: ['fob battery type', 'door weight', 'vault manufacturer'],
    suggestedQuestions: ['Was it a traditional mechanical serrated brass key?', 'Was it a wireless electronic RFID or smart proximity digital key?', 'Did wireless radio frequencies trigger the unlock?'],
    solutionKeywords: [['rfid', 'wireless', 'smart key', 'proximity', 'bluetooth', 'electronic key', 'digital key']]
  },
  {
    id: 190,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Missing World',
    difficulty: 'Expert',
    story: 'An explorer mapped out endless continents, weather systems, and mountains within an 8-inch flat glass screen.',
    solution: 'The entire world was a procedural digital simulation in an open-world video game.',
    hints: ['Think about computers and gaming.', 'The world was not physical reality.', 'It was an open-world procedural digital simulation video game.'],
    positiveFacts: ['video game', 'digital simulation', 'procedural world', 'computer game', 'virtual simulation'],
    negativeFacts: ['microscopic universe in petri dish', 'parallel dimension portal in glass', 'holographic alien message'],
    irrelevantFacts: ['screen refresh rate', 'game genre', 'tablet brand'],
    suggestedQuestions: ['Was this a physical terrestrial exploration?', 'Was it an open-world digital simulation or video game running on a tablet?', 'Was the world a computer simulation?'],
    solutionKeywords: [['video game', 'game', 'simulation', 'digital', 'virtual', 'computer']]
  },
  {
    id: 191,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Two Endings',
    difficulty: 'Expert',
    story: 'A mystery narrative had two completely contradictory endings, yet literary scholars proved both were 100% correct.',
    solution: 'The narrative was intentionally written with an ambiguous, branching choice where both paths were canon.',
    hints: ['Look for deliberate ambiguity.', 'There were two valid canonical outcomes.', 'The story was intentionally authored with two alternative branching endings.'],
    positiveFacts: ['branching endings', 'alternative endings', 'intentionally ambiguous', 'both canon', 'choose your own adventure'],
    negativeFacts: ['publisher printed wrong draft', 'multiverse collision', 'translator error'],
    irrelevantFacts: ['book author', 'page count', 'publication year'],
    suggestedQuestions: ['Did one ending contradict the author\'s canonical intent?', 'Was the narrative intentionally structured with multiple branching endings?', 'Were both outcomes deliberately valid?'],
    solutionKeywords: [['branching', 'alternative endings', 'both canon', 'ambiguous', 'two endings', 'choice']]
  },
  {
    id: 192,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Unanswered Question',
    difficulty: 'Expert',
    story: 'A detective asked a crystal-clear, factual question, but the rules engine refused to answer YES or NO.',
    solution: 'The question asked for a quantity or numerical value rather than a boolean YES/NO proposition.',
    hints: ['Check the grammar and question type.', 'Not all queries can be answered with YES or NO.', 'The query asked "How many?" or for a number instead of a yes/no fact.'],
    positiveFacts: ['numerical question', 'not a yes/no question', 'asked for a number', 'open-ended question', 'how many question'],
    negativeFacts: ['rules engine crashed', 'detective used profanity', 'question was a paradox like this statement is false'],
    irrelevantFacts: ['detective name', 'microphone brand', 'timestamp'],
    suggestedQuestions: ['Was the question framed as a yes-or-no inquiry?', 'Did the question ask for a number or quantity rather than a YES or NO answer?', 'Was it an open-ended numerical question?'],
    solutionKeywords: [['number', 'numerical', 'not yes no', 'not yes/no', 'how many', 'open ended', 'quantity']]
  },
  {
    id: 193,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Hidden Truth',
    difficulty: 'Expert',
    story: 'The statement "The Safe is Empty" was proven to be 100% true and 100% false on the very same Tuesday.',
    solution: 'The statement evaluated two different points in time (before the deposit at 9 AM and after it at 3 PM).',
    hints: ['Check the chronological timeline.', 'Conditions change throughout the day.', 'The safe was empty in the morning and filled in the afternoon.'],
    positiveFacts: ['different times of day', 'before and after deposit', 'timeline difference', 'morning and afternoon', 'time changed'],
    negativeFacts: ['safe was half empty / half full metaphor', 'optical quantum superposition safe', 'two different safes'],
    irrelevantFacts: ['safe model', 'amount deposited', 'security guard name'],
    suggestedQuestions: ['Did the state of the safe change during the day?', 'Did the two evaluations occur at different times of day (before and after deposit)?', 'Was it true at one hour and false at another?'],
    solutionKeywords: [['time', 'different times', 'morning and afternoon', 'before and after', 'timeline', 'different hours']]
  },
  {
    id: 194,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Mystery Without Clues',
    difficulty: 'Expert',
    story: 'A complex locked-room case was solved within five seconds without finding or inspecting a single forensic clue.',
    solution: 'The mystery prompt\'s concluding sentence explicitly stated the complete explanation in plain text.',
    hints: ['Read the complete text carefully.', 'The solution was already right in front of the detective.', 'The final sentence of the text explicitly gave the answer away.'],
    positiveFacts: ['solution in the text', 'stated in final sentence', 'written in prompt', 'already revealed in text', 'answer in text'],
    negativeFacts: ['psychic intuition', 'cheating hacker', 'solved by pure random guessing'],
    irrelevantFacts: ['font color', 'paper size', 'detective glasses'],
    suggestedQuestions: ['Did the detective need to collect forensic evidence?', 'Was the full solution already printed in the final sentence of the story text?', 'Was the answer written right in the text?'],
    solutionKeywords: [['in the text', 'final sentence', 'written in story', 'stated', 'in the story', 'given in text']]
  },
  {
    id: 195,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Final Witness',
    difficulty: 'Expert',
    story: 'A key witness verified every step of a midnight burglary with 100% accuracy, but was asleep five miles away when it took place.',
    solution: 'They reviewed the high-definition security camera video footage recording the following morning.',
    hints: ['Think about recorded evidence.', 'They observed the events after the fact.', 'They watched the security camera video recording.'],
    positiveFacts: ['watched video recording', 'cctv footage', 'security camera recording', 'reviewed footage', 'video replay'],
    negativeFacts: ['astral projection dream', 'hypnotic telepathy', 'witness was lying'],
    irrelevantFacts: ['cctv brand', 'burglary location', 'witness pajamas'],
    suggestedQuestions: ['Was the witness physically present at midnight?', 'Did the witness review the events by watching the CCTV security camera recording?', 'Did they watch a video replay?'],
    solutionKeywords: [['cctv', 'video', 'recording', 'footage', 'security camera', 'watched video']]
  },
  {
    id: 196,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Perfect Copy',
    difficulty: 'Expert',
    story: 'A forged letter was microscopically identical in stroke and ink to the original, but was not a printed or digital photocopy.',
    solution: 'It was a meticulously hand-crafted physical calligraphic master reproduction traced with genuine period ink.',
    hints: ['Think about hand craftsmanship.', 'It was not an electronic print.', 'A skilled calligrapher manually traced a physical master copy by hand.'],
    positiveFacts: ['hand traced', 'manual calligraphy', 'drawn by hand', 'hand crafted copy', 'manual tracing'],
    negativeFacts: ['xerox photocopier', 'laser 3d scanner printer', 'carbon paper'],
    irrelevantFacts: ['ink formulation', 'magnifying glass power', 'paper rag content'],
    suggestedQuestions: ['Was the duplicate produced by a machine or photocopier?', 'Was it drawn and traced completely by hand by a master calligrapher?', 'Was it a hand-crafted physical copy?'],
    solutionKeywords: [['by hand', 'hand traced', 'manual', 'calligraphy', 'hand crafted', 'traced by hand']]
  },
  {
    id: 197,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Last Door',
    difficulty: 'Expert',
    story: 'A person unlocked and swung wide open the door to the final room, but never entered the room at all.',
    solution: 'They simply peeked their head in to look around, then pulled the door closed and walked away.',
    hints: ['Opening a door does not require crossing the threshold.', 'Think about the physical boundary.', 'They opened the door to look inside and closed it without stepping in.'],
    positiveFacts: ['looked inside', 'only looked', 'did not cross threshold', 'peeked inside', 'closed without entering'],
    negativeFacts: ['scared by monster', 'room had no floor', 'person paralyzed'],
    irrelevantFacts: ['door handle finish', 'room wallpaper', 'person shoe type'],
    suggestedQuestions: ['Did the person cross the threshold into the room?', 'Did they only look inside the doorway before closing it?', 'Did they peek in without stepping inside?'],
    solutionKeywords: [['looked inside', 'peeked', 'only looked', 'did not enter', 'closed it', 'stepped in']]
  },
  {
    id: 198,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Forgotten Answer',
    difficulty: 'Expert',
    story: 'A detective completely forgot the vital deduction that cracked the case, yet easily recited it word-for-word in court.',
    solution: 'The detective had written down the complete deduction in their pocket investigation case notebook.',
    hints: ['Check the detective\'s investigative notes.', 'Written records preserve memory.', 'The deduction was recorded in the detective\'s investigation notebook.'],
    positiveFacts: ['notebook', 'wrote in notes', 'case notebook', 'written records', 'pocket notebook'],
    negativeFacts: ['hypnotized in court', 'fed answers through earpiece', 'bribed judge'],
    irrelevantFacts: ['notebook cover leather', 'pen brand', 'detective badge'],
    suggestedQuestions: ['Did the detective rely purely on human memory?', 'Did the detective read the solution from their written investigation notebook?', 'Was it recorded in their notes?'],
    solutionKeywords: [['notebook', 'notes', 'wrote', 'written down', 'case notebook', 'recorded']]
  },
  {
    id: 199,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'The Ultimate Puzzle',
    difficulty: 'Expert',
    story: 'An enigmatic crime case presented 10 intricate forensic clues, yet a master detective only needed one clue to solve it.',
    solution: 'One decisive smoking-gun clue directly proved the culprit, while the remaining nine were merely supporting context.',
    hints: ['Not all clues carry equal evidentiary weight.', 'Look for the decisive smoking gun.', 'One decisive smoking-gun clue directly established the complete solution.'],
    positiveFacts: ['decisive clue', 'smoking gun', 'one critical clue', 'supporting clues', 'one decisive fact', 'smoking-gun'],
    negativeFacts: ['other 9 clues were planted by aliens', 'detective solved by guessing', 'case was dropped'],
    irrelevantFacts: ['case file thickness', 'crime location', 'court date'],
    suggestedQuestions: ['Did every clue hold equal value?', 'Did one single decisive smoking-gun clue directly prove the case?', 'Was there one decisive fact while the others were secondary?'],
    solutionKeywords: [['decisive', 'smoking gun', 'smoking-gun', 'critical clue', 'one clue', 'key clue']]
  },
  {
    id: 200,
    chapterId: 10,
    chapterName: 'The Final Mystery',
    title: 'THE FINAL MYSTERY: WHO IS THE MASTER DETECTIVE?',
    difficulty: 'Expert',
    story: `Detective Alex enters a mysterious investigation room. Inside the room are:
- A glowing golden trophy.
- A leather-bound mysterious case book.
- A large antique grandfather clock.
- A locked heavy vault box.
- A final golden question written on the wall.

The question reads:
"Who solved all 200 mysteries?"

The player must reflect upon the entire journey across all 10 chapters.`,
    solution: 'The player is the Master Detective because they personally investigated and solved all 200 mysteries.',
    hints: [
      'Think about the journey from Level 1 to Level 200.',
      'Who completed every chapter and investigated every case?',
      'You are the Master Detective. You solved all 200 mysteries.',
    ],
    positiveFacts: [
      'the player', 'you', 'me', 'the user', 'i am the detective', 'the player solved them',
      'player is master detective', 'player solved all 200', 'detective player', 'i solved all 200', 'myself'
    ],
    negativeFacts: [
      'detective alex solved them alone', 'sherlock holmes', 'a computer program', 'nobody', 'the culprit'
    ],
    irrelevantFacts: [
      'trophy weight', 'clock manufacturer', 'box metal', 'wall paint color'
    ],
    suggestedQuestions: [
      'Did Detective Alex solve all 200 mysteries alone?',
      'Is the player who investigated each case the Master Detective?',
      'Does the answer refer to you, the player?'
    ],
    solutionKeywords: [
      ['player', 'me', 'i am', 'you', 'myself', 'the user', 'detective you', 'the player']
    ]
  }
];
