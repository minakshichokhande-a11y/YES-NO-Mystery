import { MysteryLevel } from '../../types/game';

export const CHAPTER_1_LEVELS: MysteryLevel[] = [
  {
    id: 1,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Missing Cake',
    difficulty: 'Very Easy',
    story: 'A cake was placed on the kitchen table. Ten minutes later, it disappeared. Nobody entered the kitchen during those ten minutes.',
    solution: 'The family dog took the cake before the room was empty; the statement that nobody entered does not mean nobody was already inside.',
    hints: [
      'Look under the table.',
      'Think about the family pet.',
      'The dog was already in the kitchen before the timer started.',
    ],
    positiveFacts: [
      'dog', 'pet', 'animal', 'was in kitchen', 'already inside', 'ate the cake', 'took the cake', 'canine', 'under the table'
    ],
    negativeFacts: [
      'human thief', 'ghost', 'wind', 'magic', 'someone entered', 'window open', 'fell on floor and dissolved'
    ],
    irrelevantFacts: [
      'flavor of cake', 'chocolate', 'table color', 'kitchen size', 'time of day', 'brand of cake'
    ],
    suggestedQuestions: [
      'Was there an animal in the kitchen?',
      'Did a human steal the cake?',
      'Was someone or something already inside the room?'
    ],
    solutionKeywords: [
      ['dog', 'pet', 'animal', 'puppy', 'hound'],
      ['already', 'inside', 'ate', 'took', 'kitchen', 'under']
    ]
  },
  {
    id: 2,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Wet Shoes',
    difficulty: 'Very Easy',
    story: 'A boy entered his house with wet shoes, even though he did not walk through rain.',
    solution: 'He walked through a garden sprinkler.',
    hints: [
      'Water does not only come from rain.',
      'Think about a garden or lawn.',
      'A garden sprinkler made his shoes wet.',
    ],
    positiveFacts: [
      'sprinkler', 'garden', 'lawn', 'yard', 'water source on ground', 'hose', 'grass'
    ],
    negativeFacts: [
      'rain', 'river', 'lake', 'swimming pool', 'spilled drink', 'puddle from storm'
    ],
    irrelevantFacts: [
      'shoe brand', 'shoe color', 'boy age', 'boy name', 'day of the week'
    ],
    suggestedQuestions: [
      'Did the water come from the sky?',
      'Was he walking in a garden or yard?',
      'Did a sprinkler spray water onto his shoes?'
    ],
    solutionKeywords: [
      ['sprinkler', 'lawn sprinkler', 'garden sprinkler'],
      ['walk', 'shoes', 'water', 'wet', 'grass', 'garden']
    ]
  },
  {
    id: 3,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Silent Alarm',
    difficulty: 'Very Easy',
    story: 'An alarm clock showed 7:00, but nobody woke up.',
    solution: 'The alarm was switched off.',
    hints: [
      'Look at the clock settings.',
      'Was its alarm active?',
      'It was not set to ring.',
    ],
    positiveFacts: [
      'alarm off', 'turned off', 'switched off', 'disabled', 'not set to ring', 'silent setting'
    ],
    negativeFacts: [
      'broken clock', 'power outage', 'people were deaf', 'people were dead', 'wrong time'
    ],
    irrelevantFacts: [
      'digital or analog', 'clock color', 'bed size', 'weather'
    ],
    suggestedQuestions: [
      'Was the alarm switched on?',
      'Was the clock broken?',
      'Was the alarm disabled or turned off?'
    ],
    solutionKeywords: [
      ['off', 'switched off', 'turned off', 'disabled', 'not set', 'inactive']
    ]
  },
  {
    id: 4,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Unopened Gift',
    difficulty: 'Very Easy',
    story: 'A girl received a gift. She said she loved it without opening the box.',
    solution: 'The gift was a book she had specifically requested, and its title was visible through transparent wrapping.',
    hints: [
      'She could see something without opening it.',
      'Check the package material.',
      'The title was visible through transparent wrapping.',
    ],
    positiveFacts: [
      'transparent', 'clear wrapping', 'visible inside', 'see through', 'she could see it', 'plastic wrap', 'clear box'
    ],
    negativeFacts: [
      'x-ray vision', 'she guessed randomly', 'someone told her', 'she opened it earlier'
    ],
    irrelevantFacts: [
      'her age', 'color of ribbon', 'who gave it', 'price of gift'
    ],
    suggestedQuestions: [
      'Could she see inside the packaging?',
      'Was the wrapping transparent or clear?',
      'Did someone spoil the surprise?'
    ],
    solutionKeywords: [
      ['transparent', 'clear', 'see through', 'visible'],
      ['wrapping', 'package', 'box', 'cover']
    ]
  },
  {
    id: 5,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Missing Key',
    difficulty: 'Very Easy',
    story: 'A person could enter a locked room without using a key.',
    solution: 'The room had another unlocked entrance.',
    hints: [
      'Think about another door.',
      'Was there only one entrance?',
      'A second door was open.',
    ],
    positiveFacts: [
      'second door', 'another door', 'another entrance', 'back door', 'side entrance', 'unlocked door'
    ],
    negativeFacts: [
      'picked the lock', 'broke the door', 'climbed through chimney', 'teleported', 'magic'
    ],
    irrelevantFacts: [
      'room color', 'type of key', 'time of day', 'what was inside room'
    ],
    suggestedQuestions: [
      'Did the person pick the lock?',
      'Was there another door or entrance?',
      'Was a second entrance unlocked?'
    ],
    solutionKeywords: [
      ['another', 'second', 'other', 'different'],
      ['door', 'entrance', 'way in', 'unlocked', 'open']
    ]
  },
  {
    id: 6,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Empty Classroom',
    difficulty: 'Easy',
    story: 'A classroom looked empty, but a teacher said students were still inside.',
    solution: 'Students were hiding behind the large stage curtain.',
    hints: [
      'Look behind something.',
      'The room had a stage.',
      'The students were behind its curtain.',
    ],
    positiveFacts: [
      'hiding', 'behind curtain', 'stage', 'hidden from view', 'behind stage curtain'
    ],
    negativeFacts: [
      'invisible', 'ghosts', 'under floorboards', 'camera glitch', 'teacher hallucinating'
    ],
    irrelevantFacts: [
      'subject being taught', 'number of desks', 'color of curtains', 'grade of students'
    ],
    suggestedQuestions: [
      'Were the students hiding?',
      'Were they behind a curtain or stage?',
      'Were the students physically inside the room?'
    ],
    solutionKeywords: [
      ['hiding', 'hidden', 'behind'],
      ['curtain', 'stage', 'drapes']
    ]
  },
  {
    id: 7,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Broken Window',
    difficulty: 'Easy',
    story: 'A window was broken, but there was no glass on the floor.',
    solution: 'It was a plastic window panel.',
    hints: [
      'Not every window uses glass.',
      'Consider the material.',
      'It was made from clear plastic.',
    ],
    positiveFacts: [
      'plastic', 'acrylic', 'plexiglass', 'not glass', 'synthetic material'
    ],
    negativeFacts: [
      'glass cleaned up', 'magic glass', 'fell outside', 'ghost'
    ],
    irrelevantFacts: [
      'who broke it', 'size of window', 'weather outside', 'frame material'
    ],
    suggestedQuestions: [
      'Was the window made of glass?',
      'Was it made of plastic or plexiglass?',
      'Did someone sweep the floor already?'
    ],
    solutionKeywords: [
      ['plastic', 'plexiglass', 'acrylic', 'not glass']
    ]
  },
  {
    id: 8,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Disappearing Phone',
    difficulty: 'Easy',
    story: 'A phone disappeared from a table, but nobody touched it.',
    solution: 'The table was a moving conveyor surface and carried it away.',
    hints: [
      'The table was unusual.',
      'Think about movement.',
      'It was a moving conveyor table.',
    ],
    positiveFacts: [
      'conveyor', 'moving table', 'moving belt', 'mechanical movement', 'conveyor belt'
    ],
    negativeFacts: [
      'stolen by person', 'fell through a hole', 'magnetism', 'invisible string'
    ],
    irrelevantFacts: [
      'phone model', 'table color', 'restaurant name'
    ],
    suggestedQuestions: [
      'Did a human touch the phone?',
      'Was the table moving?',
      'Was it a conveyor belt table?'
    ],
    solutionKeywords: [
      ['conveyor', 'moving', 'motorized', 'belt'],
      ['table', 'surface']
    ]
  },
  {
    id: 9,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Strange Umbrella',
    difficulty: 'Easy',
    story: 'A man returned home with a dry umbrella after walking through rain.',
    solution: 'He had kept the umbrella closed under his waterproof coat.',
    hints: [
      'Think about how the umbrella was carried.',
      'It was protected from rain.',
      'It remained under his waterproof coat.',
    ],
    positiveFacts: [
      'under coat', 'inside coat', 'closed umbrella', 'covered by jacket', 'protected by raincoat'
    ],
    negativeFacts: [
      'umbrella was magical', 'he walked under shelter whole time', 'rain was fake'
    ],
    irrelevantFacts: [
      'umbrella color', 'brand of coat', 'distance walked'
    ],
    suggestedQuestions: [
      'Was the umbrella opened during the walk?',
      'Was it kept inside or under his coat?',
      'Did the umbrella touch the rain?'
    ],
    solutionKeywords: [
      ['under', 'inside', 'covered', 'closed'],
      ['coat', 'jacket', 'raincoat']
    ]
  },
  {
    id: 10,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Frozen Water',
    difficulty: 'Easy',
    story: 'A glass contained water, but the water did not move when the glass was tilted.',
    solution: 'The water was frozen into ice.',
    hints: [
      'Think about temperature.',
      'Water can change state.',
      'It was solid ice.',
    ],
    positiveFacts: [
      'frozen', 'ice', 'solid', 'freezing temperature', 'turned to ice'
    ],
    negativeFacts: [
      'chemical gel', 'glue', 'glass sealed shut', 'anti gravity'
    ],
    irrelevantFacts: [
      'glass shape', 'drinking water or tap water'
    ],
    suggestedQuestions: [
      'Was the water in a liquid state?',
      'Was the water frozen into ice?',
      'Was the temperature below freezing?'
    ],
    solutionKeywords: [
      ['frozen', 'ice', 'solid']
    ]
  },
  {
    id: 11,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Invisible Guest',
    difficulty: 'Easy',
    story: 'A family heard a guest speaking, but nobody could see the guest in the room.',
    solution: 'The guest was speaking through a video call or speakerphone.',
    hints: [
      'Think about technology.',
      'The voice came from a device.',
      'It was a video call.',
    ],
    positiveFacts: [
      'video call', 'phone call', 'speaker', 'virtual', 'device', 'screen', 'online call', 'zoom'
    ],
    negativeFacts: [
      'ghost', 'hiding under bed', 'ventriloquist', 'wall microphone bug'
    ],
    irrelevantFacts: [
      'guest name', 'app used', 'device brand'
    ],
    suggestedQuestions: [
      'Was the guest physically present in the room?',
      'Was the guest speaking through a phone or video call?',
      'Did the sound come from an electronic speaker?'
    ],
    solutionKeywords: [
      ['video call', 'phone', 'call', 'speaker', 'device', 'virtual', 'zoom', 'online']
    ]
  },
  {
    id: 12,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Open Door',
    difficulty: 'Easy',
    story: 'A person entered a room, closed the door and then found it open again.',
    solution: 'The door had an automatic spring mechanism.',
    hints: [
      'Think about automatic movement.',
      'Nobody needed to open it.',
      'Its spring or mechanical closer reopened it.',
    ],
    positiveFacts: [
      'spring', 'automatic mechanism', 'spring loaded', 'door closer', 'rebounded', 'mechanical recoil'
    ],
    negativeFacts: [
      'another person opened it', 'ghost', 'earthquake', 'wind storm'
    ],
    irrelevantFacts: [
      'door color', 'handle type', 'room purpose'
    ],
    suggestedQuestions: [
      'Did another person open the door?',
      'Did the door have a spring or automatic mechanism?',
      'Was it caused by mechanical spring recoil?'
    ],
    solutionKeywords: [
      ['spring', 'automatic', 'mechanism', 'closer', 'rebound']
    ]
  },
  {
    id: 13,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Wrong Birthday',
    difficulty: 'Easy',
    story: 'Two friends had the same birthday date but were born in different years.',
    solution: 'They shared the same calendar day and month, not the same birth year.',
    hints: [
      'A birthday has more than one date component.',
      'Compare their years.',
      'They were born in different years.',
    ],
    positiveFacts: [
      'same day and month', 'different years', 'calendar date matches', 'different birth year', 'born years apart'
    ],
    negativeFacts: [
      'fake birthday', 'forged documents', 'twins separated at birth', 'time travel'
    ],
    irrelevantFacts: [
      'their names', 'astrology signs', 'where they were born'
    ],
    suggestedQuestions: [
      'Were they born on the same day and month?',
      'Were they born in different years?',
      'Are they twins?'
    ],
    solutionKeywords: [
      ['same day', 'same month', 'calendar date', 'different year', 'years apart', 'not twins']
    ]
  },
  {
    id: 14,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Dark Room',
    difficulty: 'Easy',
    story: 'A room had no electricity, but a person could read a book inside it.',
    solution: 'The person used a battery-powered flashlight.',
    hints: [
      'Think about another light source.',
      'It did not need house electricity.',
      'A flashlight illuminated the book.',
    ],
    positiveFacts: [
      'flashlight', 'torch', 'battery light', 'candle', 'lantern', 'portable light'
    ],
    negativeFacts: [
      'braille book', 'read in the dark with superpowers', 'magic glowing book'
    ],
    irrelevantFacts: [
      'title of book', 'genre of book', 'person age'
    ],
    suggestedQuestions: [
      'Did the person have another light source?',
      'Was it a battery powered flashlight or candle?',
      'Was the book written in braille?'
    ],
    solutionKeywords: [
      ['flashlight', 'torch', 'battery', 'candle', 'lantern', 'portable light']
    ]
  },
  {
    id: 15,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Missing Shadow',
    difficulty: 'Easy',
    story: 'A person stood outside in daylight but had no visible shadow.',
    solution: 'It was a completely overcast moment with diffused light and no distinct visible shadow.',
    hints: [
      'Look at the sky.',
      'Think about cloud cover.',
      'The sunlight was fully diffused.',
    ],
    positiveFacts: [
      'overcast', 'cloudy', 'diffused light', 'heavy clouds', 'no direct sunlight'
    ],
    negativeFacts: [
      'vampire', 'invisibility', 'eclipse', 'night time'
    ],
    irrelevantFacts: [
      'clothing color', 'location', 'temperature'
    ],
    suggestedQuestions: [
      'Was the sun shining directly?',
      'Was it an overcast or heavily cloudy day?',
      'Was the sunlight diffused by clouds?'
    ],
    solutionKeywords: [
      ['overcast', 'cloudy', 'clouds', 'diffused', 'no direct sun']
    ]
  },
  {
    id: 16,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Empty Bottle',
    difficulty: 'Easy',
    story: 'A bottle looked empty but still weighed something.',
    solution: 'It was full of air.',
    hints: [
      'Invisible material.',
      'Empty does not mean a vacuum.',
      'It contained air.',
    ],
    positiveFacts: [
      'air', 'gas', 'atmosphere', 'bottle weight itself plus air', 'filled with air'
    ],
    negativeFacts: [
      'hidden liquid', 'false bottom', 'magnet under scale', 'heavy glass trick'
    ],
    irrelevantFacts: [
      'bottle material', 'bottle shape', 'scale brand'
    ],
    suggestedQuestions: [
      'Did the bottle contain a vacuum?',
      'Was the bottle filled with air?',
      'Was there an invisible gas or air inside?'
    ],
    solutionKeywords: [
      ['air', 'gas', 'oxygen', 'atmosphere']
    ]
  },
  {
    id: 17,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Late Train',
    difficulty: 'Easy',
    story: 'A train arrived at the station on time, but passengers called it late.',
    solution: 'They were using a different time zone\'s timetable.',
    hints: [
      'Compare the clocks.',
      'Time zones matter.',
      'The displayed timetable used another time zone.',
    ],
    positiveFacts: [
      'time zone', 'different time zone', 'clock difference', 'timetable in other time zone'
    ],
    negativeFacts: [
      'train broke down', 'passengers were wrong about train number', 'conductor lied'
    ],
    irrelevantFacts: [
      'train color', 'number of passengers', 'ticket price'
    ],
    suggestedQuestions: [
      'Was the train actually delayed according to local time?',
      'Did this involve a difference in time zones?',
      'Were passengers looking at a different time zone clock?'
    ],
    solutionKeywords: [
      ['time zone', 'timezone', 'different time', 'clock difference']
    ]
  },
  {
    id: 18,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Floating Ball',
    difficulty: 'Easy',
    story: 'A ball floated inside a room without strings.',
    solution: 'It was a helium-filled balloon.',
    hints: [
      'Think about gas.',
      'Some balloons float.',
      'Helium lifted it.',
    ],
    positiveFacts: [
      'helium', 'balloon', 'lighter than air', 'gas filled balloon'
    ],
    negativeFacts: [
      'magnetic levitation', 'giant fan blowing air', 'optical illusion', 'magic'
    ],
    irrelevantFacts: [
      'balloon color', 'room size', 'ceiling height'
    ],
    suggestedQuestions: [
      'Was the ball a balloon?',
      'Was it filled with helium gas?',
      'Was it held up by air or strings?'
    ],
    solutionKeywords: [
      ['helium', 'balloon', 'lighter than air']
    ]
  },
  {
    id: 19,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Silent Phone',
    difficulty: 'Easy',
    story: 'A phone received a call, but it made no sound.',
    solution: 'Its sound was muted or silent mode was enabled.',
    hints: [
      'Check sound settings.',
      'The phone still received the call.',
      'Silent mode was enabled.',
    ],
    positiveFacts: [
      'muted', 'silent mode', 'volume zero', 'do not disturb', 'vibrate only', 'sound turned off'
    ],
    negativeFacts: [
      'speaker was broken', 'airplane mode', 'phone dead', 'call dropped'
    ],
    irrelevantFacts: [
      'caller identity', 'phone model', 'ringtone choice'
    ],
    suggestedQuestions: [
      'Did the phone receive the call successfully?',
      'Was the phone on silent or mute mode?',
      'Was the speaker broken?'
    ],
    solutionKeywords: [
      ['silent', 'muted', 'mute', 'volume off', 'silent mode', 'vibrate']
    ]
  },
  {
    id: 20,
    chapterId: 1,
    chapterName: 'Easy Mysteries',
    title: 'The Locked Diary',
    difficulty: 'Easy',
    story: 'A diary was locked, but its owner read it without unlocking it.',
    solution: 'The owner read a digital backup of the diary.',
    hints: [
      'Think about a second copy.',
      'It was stored electronically.',
      'The owner opened its digital backup.',
    ],
    positiveFacts: [
      'digital backup', 'electronic copy', 'backup', 'phone copy', 'cloud copy', 'computer file'
    ],
    negativeFacts: [
      'cut the lock', 'x-ray scanner', 'memorized whole diary', 'diary was transparent'
    ],
    irrelevantFacts: [
      'diary color', 'what was written inside', 'owner name'
    ],
    suggestedQuestions: [
      'Did the owner read the physical paper book?',
      'Did the owner read a digital backup or electronic copy?',
      'Was the physical lock broken?'
    ],
    solutionKeywords: [
      ['digital', 'backup', 'electronic', 'copy', 'cloud', 'phone', 'computer']
    ]
  }
];
